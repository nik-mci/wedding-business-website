/**
 * Intent extraction — structured entity parsing via Azure OpenAI JSON mode.
 *
 * Ported from GeTS travel chatbot (intent.py) with wedding-specific entities.
 * The rewritten_query output is what gets embedded and sent to Azure AI Search.
 */

import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";

const _credential = new DefaultAzureCredential();

let _client = null;
function getClient() {
  if (!_client) {
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    _client = new AzureOpenAI({
      endpoint:   process.env.AZURE_OPENAI_ENDPOINT,
      apiVersion: process.env.AZURE_OPENAI_API_VERSION || "2024-10-21",
      deployment: process.env.AZURE_OPENAI_DEPLOYMENT  || "gpt-4-1-mini",
      ...(apiKey
        ? { apiKey }
        : { azureADTokenProvider: getBearerTokenProvider(_credential, "https://cognitiveservices.azure.com/.default") }),
    });
  }
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
 * @property {string}   category            - "venue-pricing" | "moodboard" | "service" | "itinerary" | "faq" | "package" | "about" | "all"
 * @property {string}   destination_type    - "beach" | "royal-heritage" | "hills" | "kerala" | "city" | null
 * @property {string}   query_type          - "specific-item" | "comparison" | "budget-match" | "list" | "general"
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
- category (string): classify the PRIMARY topic of the query:
    "venue-pricing"  → asking about a specific venue's cost, rooms, capacity, buyout, F&B
    "moodboard"      → asking about decor themes, moodboards, Haldi/Mehendi/Sangeet/Wedding aesthetics
    "service"        → asking about what services Vows & Vedas provides (planning, decor, photography, etc.)
    "itinerary"      → asking about wedding day schedules, day-by-day plans
    "faq"            → asking about process, timeline, cancellation, customisation, how it works
    "package"        → asking about planning packages, fees, what's included
    "about"          → asking about the company, team, history
    "all"            → general exploration, not specific to one category
- destination_type (string | null): the destination category relevant to the query:
    "beach"          → Goa, coastal, sea-facing
    "royal-heritage" → Rajasthan, palace, fort, heritage
    "hills"          → Rishikesh, Dehradun, Srinagar, Corbett, Himalayas
    "kerala"         → Kerala, backwaters, Kovalam
    "city"           → Delhi, Mumbai, Bangalore, urban hotel venues
    null             → not destination-specific
- query_type (string): classify the structure of the query:
    "specific-item"  → asking about ONE named venue / moodboard / service
    "comparison"     → comparing two or more options
    "budget-match"   → asking what fits a given budget
    "list"           → asking to list all options in a category
    "general"        → open-ended question or general exploration
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
     "show me Rajasthan itinerary" → "Big Fat Indian Wedding Rajasthan itinerary day-by-day schedule 4 days"
     "Haveli Nights moodboard" → "Haveli Nights wedding moodboard jewel tones candlelit haveli heritage decor"

CLARIFYING ANSWER RESOLUTION — CRITICAL:
When the user's message is a short answer (one word, a name, a number) and the previous bot turn was a clarifying question, resolve BOTH the clarifying answer AND the original pending intent together. Never treat a short clarifying answer as a standalone request.

Examples:
  Bot asked: "Which moodboard are you thinking about?"
  User replied: "citrus bloom"
  → intent: "venue_recommendation"
  → category: "moodboard" (but the underlying need is venue matching)
  → rewritten_query: "venues that suit Citrus Bloom haldi moodboard outdoor daytime tropical vibrant Goa Kerala hills"

  Bot asked: "What city are you considering?"
  User replied: "Udaipur"
  → intent: "venue_info"
  → cities: ["Udaipur"]
  → rewritten_query: "wedding venues Udaipur Rajasthan palace lake"

Always check the previous bot turn to determine what question the user is answering before classifying intent.

Return ONLY valid JSON matching the schema. You MUST include rewritten_query in every response.`;

const GREETING_RE = /^(hi+|hello+|hey+|ok+|okay|thanks?|thank\s*you|great|nice|cool|sure|yes|no|nope|yep|got\s*it|sounds?\s*good|alright|perfect|wonderful|lovely|awesome|amazing)[\s!.?]*$/i;

function tryQuickIntent(query, accumulatedIntent = {}) {
  const q = query.trim();

  if (GREETING_RE.test(q)) {
    return {
      ...fallbackIntent(q),
      ...accumulatedIntent,
      intent:         "general",
      category:       "all",
      rewritten_query: "",
      intent_level:   accumulatedIntent.intent_level || "low",
    };
  }

  return null;
}

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
    category: "all",
    destination_type: null,
    query_type: "general",
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

  const quick = tryQuickIntent(query, accumulatedIntent);
  if (quick) return quick;

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
      max_tokens: 250,
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
