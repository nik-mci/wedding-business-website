/**
 * Intent extraction — structured entity parsing via Azure OpenAI JSON mode.
 *
 * Ported from GeTS travel chatbot (intent.py) with wedding-specific entities.
 * The rewritten_query output is what gets embedded and sent to Azure AI Search.
 */

import { AzureOpenAI } from "openai";

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

/** @typedef {Object} IntentExtraction
 * @property {string[]} cities              - e.g. ["Udaipur", "Goa"]
 * @property {string}   venue_type          - e.g. "palace" | "beach" | "hills" | ""
 * @property {string}   wedding_date        - e.g. "March 2026" | ""
 * @property {string}   guest_count         - e.g. "150" | "Couple" | ""
 * @property {string}   wedding_style       - e.g. "traditional" | "contemporary" | ""
 * @property {string}   budget_tier         - "₹8-15L" | "₹15-30L" | "₹30-60L" | "₹60L+" | ""
 * @property {string}   function_type       - "mehndi" | "haldi" | "sangeet" | "reception" | "full wedding" | ""
 * @property {string[]} services_needed     - e.g. ["decor", "photography"]
 * @property {string[]} venues_viewed       - names of venues already shown this session
 * @property {string}   selected_venue      - venue explicitly picked by user
 * @property {string}   intent              - "venue_info" | "pricing" | "enquiry" | "general"
 * @property {string}   stage               - "discovery" | "value" | "conversion" | "handoff"
 * @property {string}   intent_level        - "low" | "medium" | "high"
 * @property {string}   user_language       - e.g. "English" | "Hindi"
 * @property {string}   rewritten_query     - dense search string for the vector DB
 */

const SYSTEM_PROMPT = `You are an intelligent query parser for a luxury wedding planning chatbot.
Extract the following entities from the user's message (use conversation history for context).

Entities to extract:
- cities (array of strings): Indian cities/regions the user is interested in for their wedding.
  e.g. ["Udaipur", "Goa", "Kerala", "Rajasthan", "Jaipur"]
  ONLY extract when user EXPLICITLY mentions a city for their wedding. Do NOT extract from comparison or general questions.
- venue_type (string): "palace" | "beach" | "hills" | "heritage" | "jungle" | "backwaters" | "city" | ""
- wedding_date (string): e.g. "March 2026", "next winter", "December" — or ""
- guest_count (string): normalize to a short label — e.g. "50", "150", "500+", "Intimate (under 50)" — or ""
- wedding_style (string): e.g. "traditional", "contemporary", "fusion", "boho", "grand", "intimate" — or ""
- budget_tier (string): one of "₹8-15L" | "₹15-30L" | "₹30-60L" | "₹60L+" — map user's budget to nearest tier, or ""
- function_type (string): "mehndi" | "haldi" | "sangeet" | "reception" | "full wedding" | "" — what ceremony they're asking about
- services_needed (array): subset of ["planning", "decor", "photography", "entertainment", "hospitality", "catering", "logistics"]
- selected_venue (string): EXACT venue name if user explicitly selects or asks for details about one specific venue
- intent (string): "venue_info" | "pricing" | "enquiry" | "general"
- stage (string): "discovery" (exploring) | "value" (comparing options) | "conversion" (ready to enquire) | "handoff" (asked to speak to a human)
- intent_level (string): "low" (browsing) | "medium" (interested, gathering info) | "high" (ready to book/enquire)
- user_language (string): language of the CURRENT message if clearly NOT English — else omit / return "English"
- rewritten_query (string) **MANDATORY**: A clean, dense, search-optimised string for querying the wedding knowledge base.
  Rules for rewritten_query:
  1. Always include the core topic (venue name / city / service) even if sparse in original query.
  2. Weave in any city/venue_type from conversation history if not in current message.
  3. Expand abbreviations and fix typos.
  4. For greetings / fillers ("hi", "thanks", "ok"), set to "" and intent to "general".
  5. Examples:
     "tell me about itc grand" → "ITC Grand Goa beach wedding venue rooms capacity pricing buyout"
     "how much does a palace wedding cost" → "palace wedding venue pricing buyout cost Rajasthan Udaipur Jaipur"
     "what do you do for decor" → "Design & Decor services wedding mandap floral centerpiece lighting scenography"

Return ONLY valid JSON matching the schema. You MUST include rewritten_query in every response.`;

/** Neutral fallback intent returned when extraction fails. */
function fallbackIntent(query) {
  return {
    cities: [],
    venue_type: "",
    wedding_date: "",
    guest_count: "",
    wedding_style: "",
    budget_tier: "",
    function_type: "",
    services_needed: [],
    venues_viewed: [],
    selected_venue: "",
    intent: "general",
    stage: "discovery",
    intent_level: "low",
    user_language: "English",
    rewritten_query: query || "",
  };
}

/**
 * Extract structured wedding intent from the user query + conversation history.
 * @param {string} query
 * @param {Array<{role:string, content:string}>} history
 * @param {Object} accumulatedIntent - carry-forward from previous turns
 * @returns {Promise<IntentExtraction>}
 */
export async function extractIntent(query, history = [], accumulatedIntent = {}) {
  if (!query?.trim()) return fallbackIntent(query);

  const historyStr = history
    .slice(-6)  // last 3 turns (6 messages) is enough context
    .map(m => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n");

  const userPrompt = [
    historyStr ? `Conversation History:\n${historyStr}` : "",
    `Latest User Query: ${query}`,
    accumulatedIntent.cities?.length
      ? `Known context: cities=${JSON.stringify(accumulatedIntent.cities)}, stage=${accumulatedIntent.stage || "discovery"}`
      : "",
  ].filter(Boolean).join("\n\n");

  try {
    const response = await getClient().chat.completions.create({
      model: process.env.AZURE_OPENAI_DEPLOYMENT || "gpt-4-1-mini",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user",   content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0,
      max_tokens: 400,
    });

    const raw = JSON.parse(response.choices[0].message.content);

    // Merge with accumulated intent — don't lose previously extracted context
    return {
      ...fallbackIntent(query),
      ...accumulatedIntent,
      ...raw,
      // Arrays: union with accumulated (deduplicated)
      cities: [...new Set([...(accumulatedIntent.cities || []), ...(raw.cities || [])])],
      services_needed: [...new Set([...(accumulatedIntent.services_needed || []), ...(raw.services_needed || [])])],
      venues_viewed: [...new Set([...(accumulatedIntent.venues_viewed || []), ...(raw.venues_viewed || [])])],
    };
  } catch (err) {
    console.error("[intentExtraction] failed:", err.message);
    return { ...fallbackIntent(query), ...accumulatedIntent };
  }
}
