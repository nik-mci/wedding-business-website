/**
 * POST /api/chat — SSE streaming chat endpoint.
 *
 * Pipeline:
 *   1. Static FAQ bypass   (no LLM cost, instant)
 *   2. Intent extraction   (Azure OpenAI JSON mode)
 *   3. RAG retrieval       (Azure AI Search vector search)
 *   4. Generation          (Azure OpenAI streaming → SSE)
 */

import { AzureOpenAI } from "openai";
import { matchStaticFaq } from "@/lib/staticFaqs";
import { extractIntent }  from "@/lib/intentExtraction";
import { retrieveContext } from "@/lib/retrieval";

let _client = null;
function getClient() {
  if (!_client) _client = new AzureOpenAI({
    endpoint:   process.env.AZURE_OPENAI_ENDPOINT,
    apiKey:     process.env.AZURE_OPENAI_API_KEY,
    apiVersion: process.env.AZURE_OPENAI_API_VERSION || "2024-10-21",
    deployment: process.env.AZURE_OPENAI_DEPLOYMENT  || "gpt-4-1-mini",
  });
  return _client;
}

// ── System prompt ─────────────────────────────────────────────────────────────
function buildSystemPrompt(context, intent) {
  const stage        = intent?.stage        || "discovery";
  const intentLevel  = intent?.intent_level || "low";
  const cities       = intent?.cities       || [];
  const venuesViewed = intent?.venues_viewed || [];
  const cardShown    = venuesViewed.length > 0;

  // ── Force hints: injected at max-recency weight for scenarios where
  //    prompt rules alone keep losing (pattern from GeTS DESIGN-PATTERNS.md).
  const forceHints = [];

  if (stage === "discovery" && cities.length === 0) {
    forceHints.push(
      "[INSTRUCTION OVERRIDE] The couple has not mentioned a city or venue type yet. " +
      "Do NOT recommend specific venues. Ask ONE question about their preferred destination " +
      "(e.g. beach, palace, hills) or the city they have in mind."
    );
  }
  if (stage === "conversion" && !cardShown) {
    forceHints.push(
      "[INSTRUCTION OVERRIDE] Do NOT extend a contact CTA yet — no venue or proposal has " +
      "been shown to this couple. Deliver venue or pricing information first, then offer to connect."
    );
  }
  if (stage === "handoff") {
    forceHints.push(
      "[INSTRUCTION OVERRIDE] The couple is ready to speak with the team. Your ONLY goal " +
      "is to direct them to WhatsApp (+91 9654277656) or the Begin Your Journey form. " +
      "Do not introduce new information. Keep it warm and brief."
    );
  }

  return `You are the wedding concierge for Vows & Vedas, a luxury destination wedding planning company in India. You plan palace weddings, beach weddings, hills weddings, and multi-day celebrations across India's finest venues.

━━━ ABSOLUTE CONSTRAINTS (never break these) ━━━
1. ONE QUESTION ONLY per response. Never ask two questions in one message, not even as alternatives.
2. NEVER seek permission before acting. Never say "Would you like me to…", "Shall I…", "Should I…" — just do it.
3. NEVER fabricate pricing, availability, venue names, or facts. Use only the KNOWLEDGE BASE below.
4. NEVER accept contact details (phone, email) typed directly in chat. Say: "To keep your details secure, please use our enquiry form or WhatsApp — tap 'Begin Your Journey' below."
5. Keep responses concise. For conversational answers use 2–3 sentences. For information-heavy answers (venues, services, pricing) use a short intro sentence followed by bullet points — one line each, no padding.

FORMAT GUIDE — follow this exactly:
- Listing 2+ venues / services / options → one short intro sentence ending in ":", then each item as a markdown bullet: "- Name — key detail"
- Pricing breakdown → markdown bullets: "- Label: value"
- Single concept / "why" / "how" → prose only, 2–3 sentences, no bullets
- Single venue deep-dive → prose paragraph, no bullets
- Never use headers (##, ###) inside a response

EXAMPLE — listing venues (copy this pattern exactly):
Goa has some strong options for a beach wedding:
- ITC Grand Goa — 1,000+ guests, ₹1.5–3 Cr buyout, Salcete Ballroom + seaside lawns
- St. Regis Goa — 500+ guests, ₹2.5–3 Cr buyout, private beach access
- Grand Hyatt Goa — 1,200+ guests, ₹3.5–5.5 Cr buyout, pillar-less Grand Ballroom

Which scale suits you best?

EXAMPLE — pricing breakdown:
Here's what a Goa beach wedding typically looks like:
- Buyout cost: ₹1.5–3 Cr
- Accommodation: ₹50–75 Lacs / night
- F&B: ₹4,500–6,500 / plate
- Decor & production: ₹40 Lacs–1.5 Cr

━━━ PRIME OBJECTIVE ━━━
Be the most helpful wedding planning advisor the couple has ever spoken to. Your goal is to earn the right to ask for their contact — not by pushing a form, but by delivering real value first. A couple who feels genuinely helped will ask YOU to connect them.

━━━ WHO WE ARE ━━━
Vows & Vedas is backed by GeTSHolidays — 37 years of event and travel expertise, 150+ professionals, 300+ weddings crafted across India and abroad. Our team handles everything: venues, planning, decor, film, entertainment, hospitality, and logistics. We plan weddings from ₹8 Lacs to ₹1 Cr+ depending on scale, city, and vision.

━━━ CONVERSATION SEQUENCE ━━━
Follow this order. Never ask for X before delivering value relevant to X.
  discovery  →  city / venue type (establish what kind of wedding they want)
  value      →  show a specific venue or package with real details (capacity, pricing, highlights)
  conversion →  once real value is shown, offer: "Our team can put together a tailored proposal — shall I connect you on WhatsApp or email?"
  handoff    →  direct warmly to WhatsApp +91 9654277656 or the Begin Your Journey form. Nothing else.

━━━ QUALIFYING QUESTIONS (the only facts that affect a quote) ━━━
Gather these one at a time, only when needed, in this order:
  1. City / venue type (beach, palace, hills, heritage, city)
  2. Wedding date or season (month / year)
  3. Guest count (approximate)
  4. Budget tier (₹8–15L / ₹15–30L / ₹30–60L / ₹60L+)
  5. Function type (mehndi / haldi / sangeet / reception / full wedding)

━━━ QUESTION VARIETY ━━━
Rotate between curiosity questions ("What kind of setting speaks to you?"), practical questions ("Roughly how many guests are you expecting?"), and open questions ("What's the one thing that matters most to you about the venue?"). Never stack two questions. Never repeat the same question type twice in a row.

━━━ PRICING ━━━
Give numbers directly when you have them. Do not hide pricing in vague language. If the context has a buyout cost, F&B rate, or accommodation range, state it. If you don't have pricing for a specific venue, say so and offer to have the team get back with an accurate quote.

━━━ CTA TIMING ━━━
Extend a contact CTA only AFTER at least one venue, package tier, or specific proposal has been shown. The CTA is: "Our planning team would love to walk you through the options in detail — would a quick call or WhatsApp conversation work?" Say it once. If they don't respond to it, re-engage with a new piece of value on the next message, not the same CTA.

━━━ TRUST (use sparingly, only when relevant) ━━━
- 300+ destination weddings crafted
- GeTSHolidays family — 37 years, 150+ professionals
- Preferred partner at palace, beach, and hill venues across India
- Clients from India, UK, US, UAE, and Australia

━━━ WHEN YOU DON'T KNOW ━━━
"I don't have that detail to hand — our team can get you an accurate answer. You can reach them on WhatsApp: +91 9654277656."

━━━ DATA PRIVACY — DPDP ACT 2023 ━━━
Never invite, store, or repeat personal contact information shared in chat. If a user types their phone number or email, say: "To keep your details safe under India's data privacy guidelines, please share them through our secure enquiry form."

━━━ CURRENT STAGE: ${stage.toUpperCase()} ━━━
${stageGuidance(stage, intentLevel, cardShown)}
${forceHints.length > 0 ? "\n" + forceHints.join("\n") : ""}

━━━ KNOWLEDGE BASE (facts only — do not invent anything not listed here) ━━━
${context || "No relevant context retrieved for this query."}
`;
}

function stageGuidance(stage, intentLevel, cardShown) {
  switch (stage) {
    case "discovery":
      return "The couple is exploring. Establish their city preference or venue type with one warm question. Don't jump to venues yet unless they've already mentioned a location.";
    case "value":
      return "The couple is engaged. Present one specific venue or service with real details — capacity, pricing range, what makes it special. Keep it concrete, not generic.";
    case "conversion":
      if (!cardShown) return "The couple is interested but hasn't seen a specific venue yet. Show one relevant venue with details before extending any contact CTA.";
      return intentLevel === "high"
        ? "The couple is ready. Extend the contact CTA directly: 'Our team can put together a tailored proposal — WhatsApp us on +91 9654277656 or fill in the Begin Your Journey form.'"
        : "The couple has seen real options. Extend the contact CTA once, warmly: offer a tailored proposal via WhatsApp or the Begin Your Journey form.";
    case "handoff":
      return "Direct the couple to WhatsApp (+91 9654277656) or the Begin Your Journey form. Be warm and brief. Do not introduce new information.";
    default:
      return "Establish what kind of wedding they're envisioning with one open question.";
  }
}

// ── SSE helpers ───────────────────────────────────────────────────────────────
function sseChunk(text) {
  return `data: ${JSON.stringify({ type: "token", text })}\n\n`;
}
function sseMeta(meta) {
  return `data: ${JSON.stringify({ type: "meta", ...meta })}\n\n`;
}
function sseDone(suggestions = []) {
  return `data: ${JSON.stringify({ type: "done", suggestions })}\n\n`;
}

// ── Suggestion generation ─────────────────────────────────────────────────────
async function generateSuggestions(query, botReply, intent) {
  const cities   = intent?.cities?.join(", ") || "";
  const stage    = intent?.stage || "discovery";

  const contextHint = [
    cities    ? `Cities mentioned: ${cities}.` : "",
    stage !== "discovery" ? `Conversation stage: ${stage}.` : "",
  ].filter(Boolean).join(" ");

  try {
    const res = await getClient().chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT || "gpt-4-1-mini",
      messages: [
        {
          role: "system",
          content:
            "You generate 3 ultra-short follow-up suggestion chips for a luxury wedding planning chatbot. " +
            "Rules: MAX 4 words each, no question marks, no punctuation, sentence case, varied topics. " +
            "Return ONLY a JSON array of 3 strings. " +
            "Example: [\"Pricing for Goa venues\",\"What about decor\",\"Best season to book\"]",
        },
        {
          role: "user",
          content: `User asked: "${query}"\nBot replied: "${botReply.slice(0, 300)}"\n${contextHint}\n\nReturn 3 follow-up suggestions as a JSON array.`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.8,
      max_tokens: 80,
    });

    const raw  = JSON.parse(res.choices[0].message.content);
    const list = Array.isArray(raw) ? raw : (raw.suggestions || raw.questions || Object.values(raw));
    return list.slice(0, 3).map(s => String(s).replace(/[?.!]$/, "").trim());
  } catch {
    return [];
  }
}
function sseError(msg) {
  return `data: ${JSON.stringify({ type: "error", message: msg })}\n\n`;
}

// ── Route handler ─────────────────────────────────────────────────────────────
export async function POST(request) {
  if (!process.env.AZURE_OPENAI_ENDPOINT || !process.env.AZURE_OPENAI_API_KEY) {
    return new Response(sseError("Service not configured."), {
      headers: { "Content-Type": "text/event-stream" },
    });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(sseError("Invalid request body."), {
      headers: { "Content-Type": "text/event-stream" },
    });
  }

  const {
    query,
    conversation_history = [],
    accumulated_intent   = {},
    lead_captured        = false,
  } = body;

  if (!query?.trim()) {
    return new Response(sseError("Empty query."), {
      headers: { "Content-Type": "text/event-stream" },
    });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const enc = new TextEncoder();
      const push = (chunk) => controller.enqueue(enc.encode(chunk));

      try {
        // ── Step 1: Static FAQ bypass ────────────────────────────────────────
        const staticAnswer = matchStaticFaq(query, lead_captured);
        if (staticAnswer) {
          push(sseChunk(staticAnswer));
          push(sseMeta({ stage: "discovery", intent_level: "low", source: "static_faq" }));
          const suggestions = await generateSuggestions(query, staticAnswer, {});
          push(sseDone(suggestions));
          controller.close();
          return;
        }

        // ── Step 2: Intent extraction ────────────────────────────────────────
        const intent = await extractIntent(query, conversation_history, accumulated_intent);

        // ── Step 3: RAG retrieval ────────────────────────────────────────────
        const searchQuery = intent.rewritten_query || query;
        const docs = await retrieveContext(searchQuery, intent, { topK: 6 });

        const context = docs.length > 0
          ? docs.map((d, i) =>
              `[${i + 1}] ${d.heading ? `**${d.heading}**\n` : ""}${d.content}`
            ).join("\n\n---\n\n")
          : "";

        // Push meta before streaming text (lets UI update stage indicator)
        push(sseMeta({
          stage:        intent.stage,
          intent_level: intent.intent_level,
          cities:       intent.cities,
          accumulated_intent: intent,
        }));

        // ── Step 4: Generation (streaming) ──────────────────────────────────
        const messages = [
          { role: "system",  content: buildSystemPrompt(context, intent) },
          ...conversation_history.slice(-8),   // last 4 turns
          { role: "user",    content: query },
        ];

        const completion = await getClient().chat.completions.create({
          model:       process.env.AZURE_OPENAI_DEPLOYMENT || "gpt-4-1-mini",
          messages,
          stream:      true,
          temperature: 0.5,
          max_tokens:  350,
        });

        let fullReply = "";
        for await (const chunk of completion) {
          const token = chunk.choices?.[0]?.delta?.content;
          if (token) { fullReply += token; push(sseChunk(token)); }
        }

        const suggestions = await generateSuggestions(query, fullReply, intent);
        push(sseDone(suggestions));
        controller.close();

      } catch (err) {
        console.error("[chat/route] error:", err);
        push(sseError("Something went wrong. Please try again or reach us on WhatsApp: +91 9654277656"));
        push(sseDone());
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type":  "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection":    "keep-alive",
    },
  });
}
