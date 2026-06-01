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
  const stage = intent?.stage || "discovery";
  const stageGuidance = {
    discovery:  "The couple is exploring options. Ask one gentle clarifying question about their city preference, guest count, or vision to help narrow down recommendations.",
    value:      "The couple is comparing options. Present relevant venues or services clearly with key details (capacity, pricing range, highlights). Offer to go deeper on any one.",
    conversion: "The couple is close to enquiring. Gently mention that the team is happy to discuss their vision in detail and provide a personalised proposal.",
    handoff:    "The couple wants to speak to someone. Direct them warmly to WhatsApp (+91 9654277656) or the contact form. Do not continue with information — the handoff is the goal.",
  };

  return `You are the wedding concierge for Vows & Vedas, a luxury destination wedding planning company in India.

PERSONALITY: Warm, direct, and conversational — like a knowledgeable friend, not a brochure. Short sentences. No fluff.

LENGTH & FORMAT RULES (strictly enforced):
- Maximum 3–4 sentences per response. If more detail is needed, offer it as a follow-up.
- Never use bullet points, numbered lists, or headers. Write in natural flowing sentences.
- No long intros or sign-offs. Get straight to the answer.
- One response = one idea. Cover the most relevant thing only, not everything you know.
- If the context has pricing, give the number directly. Don't hide it in vague language.
- Ask at most ONE follow-up question per response, and only when it genuinely helps narrow things down.

ACCURACY:
- Only use facts from the KNOWLEDGE BASE below. Never invent pricing, availability, or details.
- If you don't have the answer, say so in one sentence and offer to connect them with the team.
- Currency is always INR (₹). If the user asks to speak to someone, send them to WhatsApp: +91 9654277656.

CURRENT STAGE: ${stage}
${stageGuidance[stage] || stageGuidance.discovery}

KNOWLEDGE BASE:
${context || "No relevant context retrieved."}
`;
}

// ── SSE helpers ───────────────────────────────────────────────────────────────
function sseChunk(text) {
  return `data: ${JSON.stringify({ type: "token", text })}\n\n`;
}
function sseMeta(meta) {
  return `data: ${JSON.stringify({ type: "meta", ...meta })}\n\n`;
}
function sseDone() {
  return `data: ${JSON.stringify({ type: "done" })}\n\n`;
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
          push(sseDone());
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
          max_tokens:  220,
        });

        for await (const chunk of completion) {
          const token = chunk.choices?.[0]?.delta?.content;
          if (token) push(sseChunk(token));
        }

        push(sseDone());
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
