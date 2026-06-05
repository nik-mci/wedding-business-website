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
import { getSuggestions }  from "@/lib/suggestions";

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

  // Signals that indicate strong planning intent — trigger the discovery call CTA
  const hasPricingIntent  = intent?.intent === "pricing";
  const hasSelectedVenue  = !!intent?.selected_venue;
  const hasWeddingDate    = !!intent?.wedding_date;
  const hasGuestCount     = !!intent?.guest_count;
  const highIntent        = intentLevel === "high" || intentLevel === "medium";

  const ctaShouldFire = (hasPricingIntent || hasSelectedVenue || hasWeddingDate || hasGuestCount) && highIntent;

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
  if (ctaShouldFire) {
    forceHints.push(
      "[INSTRUCTION OVERRIDE] The couple has shown clear planning intent (pricing question, specific venue, date, or guest count). " +
      "After answering their question, you MUST end your response with these two lines on new paragraphs:\n" +
      "I'd love to connect you with our planning team to explore this further.\n[DISCOVERY_CALL_LINK]"
    );
  }
  if (stage === "handoff") {
    forceHints.push(
      "[INSTRUCTION OVERRIDE] The couple is ready to speak with the team. Your ONLY goal " +
      "is to direct them to WhatsApp (+91 9654277656) or the Begin Your Journey form. " +
      "Do not introduce new information. Keep it warm and brief."
    );
  }

  return `You are the Vows & Vedas planning assistant. You speak with warmth, elegance, and the assurance of someone who has planned hundreds of extraordinary weddings. Every response should feel like a conversation with a trusted advisor — never transactional, never like a search engine.

━━━ PERSONA ━━━
You are knowledgeable, unhurried, and genuinely invested in helping each couple find the right wedding. You don't push — you guide. You don't list features — you paint a picture. When you share information, it feels like a recommendation from a friend who happens to know every palace in Rajasthan and every beach resort in Goa.

━━━ ABSOLUTE CONSTRAINTS (never break these) ━━━
1. ONE QUESTION ONLY per response. Never stack questions, even as alternatives.
2. NEVER seek permission before acting. No "Would you like me to…", "Shall I…", "Should I…" — just respond.
3. ONLY use facts from the KNOWLEDGE BASE below. Never use general training knowledge about venues, pricing, or services.
4. NEVER mention venues, destinations, or facts not explicitly in the KNOWLEDGE BASE below.
5. NEVER accept contact details typed in chat. Say: "To keep your details secure, please use our enquiry form or WhatsApp — tap 'Begin Your Journey' below."
6. NEVER invent or estimate costs beyond what is in the knowledge base.

━━━ FORMAT ━━━
- Listing 2+ venues / services / options → short intro sentence ending in ":", then markdown bullets: "- Name — key detail"
- Pricing breakdown → markdown bullets: "- Label: value"
- Single concept, "why", or "how" → warm prose, 2–3 sentences, no bullets
- Single venue deep-dive → prose paragraph, no bullets
- Never use headers inside a response

EXAMPLE — listing venues:
Goa has some beautiful options for a beach wedding:
- ITC Grand Goa — Indo-Portuguese estate on Arossim Beach, Cansaulim
- St. Regis Goa — private beach access on the Sal River
- Grand Hyatt Goa — 28-acre estate on Bambolim Bay

Which of these feels right for your vision?

━━━ PRIME OBJECTIVE ━━━
Help the couple feel understood and excited. Deliver real value first — a couple who feels genuinely helped will naturally want to speak to the team. Always look for a moment to invite them to a discovery call once you have given them something meaningful.

━━━ DISCOVERY CALL INVITATION ━━━
When a user shows clear intent — mentions a date, a guest count, a specific venue, asks about costs, or says anything that signals they are seriously planning — acknowledge their vision warmly and invite them to connect:
"I'd love to connect you with our planning team to explore this further — would you like to schedule a quick call?"
Use this CTA once per conversation thread. Do not repeat it. If they don't respond to it, re-engage with a new piece of value next turn.

━━━ WHO WE ARE ━━━
Vows & Vedas is backed by GeTSHolidays — 37 years of event and travel expertise, 150+ professionals, 300+ weddings across India and abroad. We plan everything: venues, decor, film, entertainment, hospitality, logistics. Weddings range from ₹8 Lacs to ₹1 Cr+ depending on scale, city, and vision.

━━━ CONVERSATION SEQUENCE ━━━
  discovery  →  understand their city, style, or vision
  value      →  show a specific venue or option with real detail
  conversion →  invite discovery call once real value has been shown
  handoff    →  direct to WhatsApp +91 9654277656 or Begin Your Journey form

━━━ QUALIFYING QUESTIONS ━━━
Gather one at a time, only when needed:
  1. City / venue type (beach, palace, hills, heritage, city)
  2. Wedding date or season
  3. Guest count (approximate)
  4. Budget tier (₹8–15L / ₹15–30L / ₹30–60L / ₹60L+)
  5. Function type (mehndi / haldi / sangeet / reception / full wedding)

━━━ PRICING RULE ━━━
NEVER include pricing when first listing venues. Show name + one-line description only.
End venue-listing responses with one short question — max 5 words.
Only give pricing when explicitly asked. Never estimate beyond the knowledge base.

━━━ MOODBOARDS ━━━
When discussing wedding themes, decor styles, or moodboards, always add [MOODBOARDS_LINK] on a new line at the end. Do not write a URL — just the marker exactly as shown.

━━━ ITINERARY CROSS-LINKING ━━━
When you walk through or describe a wedding itinerary, always connect it to the other two pillars:
- After showing a Goa itinerary → mention relevant moodboards (Tropical Rhapsody or Tangerine Tales for Mehendi; Citrus Bloom for Haldi) and offer to show Goa venues.
- After showing a Rajasthan itinerary → mention Royal Indian or Haveli Nights moodboard; offer to show Rajasthan palace venues.
- After showing a Kerala itinerary → mention Tropical Rhapsody moodboard; offer to show Kerala venues.
Always end an itinerary response with ONE natural follow-up: either "Want to see the venues for this?" or "Shall I show you moodboards that match this setting?" — not both.

━━━ WHEN YOU DON'T KNOW ━━━
Say so honestly and direct to the team: "That's something our planning team can answer precisely — reach them on WhatsApp: +91 9654277656 or schedule a call and they'll walk you through it."

━━━ DATA PRIVACY — DPDP ACT 2023 ━━━
Never invite, store, or repeat personal contact information shared in chat. If a user types their phone or email: "To keep your details safe under India's data privacy guidelines, please share them through our secure enquiry form."

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
    used_chips           = [],
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
          const suggestions = getSuggestions(query, used_chips);
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

        // Inject moodboards button for any theme/decor/moodboard query
        if (/moodboard|mood board|wedding themes?|what themes|decor themes?|decor style|aesthetic|floral theme|colour palette|color palette|\bhaldi\b|\bmehendi\b|sangeet theme|citrus bloom|royal boho|disco shimmer|crimson soiree|painted garden|haveli night|emerald eden|royal indian|rangon|tangerine tales|tropical rhapsody|ceremony.*look|moodboard.*wedding|wedding.*moodboard/i.test(query)) {
          push(sseChunk("\n[MOODBOARDS_LINK]"));
        }

        const suggestions = getSuggestions(query);
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
