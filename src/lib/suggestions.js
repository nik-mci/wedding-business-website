/**
 * Context-aware suggestion chips.
 *
 * Primary signal: intent.category from the server (LLM-classified, accurate).
 * Secondary signal: intent.cities for destination-specific chips.
 * Fallback: regex topic detection on current query.
 *
 * Rules:
 * - Never suggest what the user just asked about.
 * - Never show destination chips unless a destination is known.
 * - Chips filtered against usedChips to avoid repetition across turns.
 */

// ── Regex fallback — only used when intent.category is missing ─────────────
const TOPIC_PATTERNS = [
  { topic: "itinerary",  re: /itinerary|sample wedding|day.by.day|walk me through|wedding flow/i },
  { topic: "moodboard",  re: /moodboard|mood board|\bhaldi\b|\bmehendi\b|sangeet theme|decor theme|wedding themes?|aesthetic|colour palette|color palette|citrus bloom|royal boho|disco shimmer|crimson soiree|painted garden|haveli night|emerald eden|royal indian|rangon|tangerine tales|tropical rhapsody/i },
  { topic: "goa",        re: /\bgoa\b|beach\s*wed/i },
  { topic: "rajasthan",  re: /\b(rajasthan|udaipur|jaipur|jodhpur|jaisalmer|palace|fort|heritage)\b/i },
  { topic: "kerala",     re: /\b(kerala|kovalam|backwater)\b/i },
  { topic: "hills",      re: /\b(hill|mountain|himalaya|rishikesh|dehradun|srinagar|corbett)\b/i },
  { topic: "services",   re: /\b(service|offer|provide|do you|cover|include|full.service)\b/i },
  { topic: "photo",      re: /\b(photo|film|video|cinemat)\b/i },
  { topic: "pricing",    re: /\b(price|cost|how much|pricing|fees|buyout)\b/i },
  { topic: "planning",   re: /\b(plan|coordinator|what.s included|planning fee)\b/i },
  { topic: "booking",    re: /\b(book|advance|early|lead time|availability)\b/i },
];

// Map server intent.category → internal topic
const CATEGORY_TO_TOPIC = {
  "venue-pricing": "pricing",
  "moodboard":     "moodboard",
  "service":       "services",
  "itinerary":     "itinerary",
  "faq":           "planning",
  "package":       "planning",
  "about":         "about",
  "all":           "general",
};

function detectTopic(query = "", intent = {}) {
  // 1. Use server-classified category as primary signal
  if (intent.category && CATEGORY_TO_TOPIC[intent.category]) {
    const mapped = CATEGORY_TO_TOPIC[intent.category];
    // For venue-pricing, refine to the specific destination if known
    if (mapped === "pricing") {
      const cities = (intent.cities || []).map(c => c.toLowerCase());
      if (cities.some(c => c === "goa"))                                                      return "goa";
      if (cities.some(c => ["rajasthan","jaipur","udaipur","jodhpur","jaisalmer"].includes(c))) return "rajasthan";
      if (cities.some(c => ["kerala","kovalam"].includes(c)))                                  return "kerala";
      if (cities.some(c => ["rishikesh","dehradun","srinagar","corbett"].includes(c)))         return "hills";
      return "pricing"; // known pricing intent but no KB city
    }
    return mapped;
  }

  // 2. Regex fallback on current query
  for (const { topic, re } of TOPIC_PATTERNS) {
    if (re.test(query)) return topic;
  }
  return "general";
}

// ── KB cities (we have venue data for these) ──────────────────────────────
const KB_CITY_KEYS = ["goa", "rajasthan", "jaipur", "udaipur", "jodhpur", "jaisalmer", "kerala", "kovalam", "rishikesh", "dehradun", "srinagar", "corbett", "delhi", "mumbai", "bangalore"];

// ── Chip pools ────────────────────────────────────────────────────────────

const CHIPS = {

  itinerary: [
    "Can this be customised for us",
    "What does a wedding like this cost",
    "Show Goa venues for this",
    "Show Rajasthan palace venues",
    "Show Kerala venues",
    "What moodboards suit a Goa wedding",
    "What moodboards suit a palace wedding",
    "Book a discovery call",
  ],

  moodboard: [
    "Which venues suit this mood",
    "What does a wedding like this cost",
    "Show Rajasthan palace venues",
    "Show Goa beach venues",
    "Show Kerala venues",
    "Book a discovery call",
  ],

  goa: [
    "ITC Grand Goa pricing",
    "St. Regis Goa pricing",
    "Grand Hyatt Goa pricing",
    "Taj Exotica Goa pricing",
    "Taj Cidade de Goa pricing",
    "Caravela Beach Resort pricing",
    "Compare with another Goa venue",
    "What moodboards suit a Goa wedding",
    "Start planning my wedding here",
    "Book a discovery call",
  ],

  rajasthan: [
    "Leela Palace Jaipur pricing",
    "Fairmont Jaipur pricing",
    "Alila Fort Bishangarh pricing",
    "Raffles Udaipur pricing",
    "Six Senses Fort Barwara pricing",
    "Suryagarh Jaisalmer pricing",
    "Ajit Bhawan pricing",
    "Samode Palace pricing",
    "ITC Grand Bharat pricing",
    "Compare with another Rajasthan venue",
    "What moodboards suit a palace wedding",
    "Start planning my wedding here",
    "Book a discovery call",
  ],

  kerala: [
    "Taj Green Cove Kovalam pricing",
    "The Leela Kovalam pricing",
    "Compare with another Kerala venue",
    "What moodboards suit a Kerala wedding",
    "Start planning my wedding here",
    "Book a discovery call",
  ],

  hills: [
    "Westin Rishikesh pricing",
    "Taj Corbett pricing",
    "Hyatt Regency Dehradun pricing",
    "Lalit Grand Palace Srinagar pricing",
    "Compare with another hills venue",
    "Start planning my wedding here",
    "Book a discovery call",
  ],

  // Pricing intent but no KB city known — push them to share destination or connect
  pricing: [
    "Tell me about Goa venues",
    "Tell me about Rajasthan palace venues",
    "What's included in planning",
    "Book a discovery call",
    "Start planning my wedding",
  ],

  services: [
    "What's included in full-service planning",
    "How does partial planning work",
    "Do you handle photography and film",
    "Do you manage guest travel and transfers",
    "Show me a sample wedding itinerary",
    "Book a discovery call",
  ],

  photo: [
    "What's included in film and photography",
    "Show Goa venues",
    "Show Rajasthan venues",
    "What does planning cost",
    "Book a discovery call",
  ],

  planning: [
    "What's included in full-service planning",
    "How does partial planning work",
    "Is the planning fee separate from venue costs",
    "How long does it take to get started",
    "Book a discovery call",
    "Show Goa venues",
    "Show Rajasthan venues",
  ],

  about: [
    "What services do you provide",
    "Show me a sample wedding itinerary",
    "Show Goa venues",
    "Show Rajasthan palace venues",
    "Book a discovery call",
  ],

  booking: [
    "How long does it take to get started",
    "Book a discovery call",
    "Show Goa venues",
    "What does planning cost",
    "Start planning my wedding",
  ],

  // Non-KB destination known — don't push Goa/Rajasthan, push team connection
  nonKbDestination: [
    "Connect me with the team for venue options",
    "What services do you provide",
    "Show me a sample wedding itinerary",
    "Book a discovery call",
  ],

  general: [
    "Show me a sample wedding itinerary",
    "What services do you provide",
    "What does a wedding typically cost",
    "Tell me about Goa beach weddings",
    "Tell me about palace weddings in Rajasthan",
    "Book a discovery call",
  ],
};

// ── Special chips that open /contact ──────────────────────────────────────
export const ACTION_CHIPS = {
  "Book a discovery call":              "/contact",
  "Start planning my wedding":          "/contact",
  "Start planning my wedding here":     "/contact",
  "Speak to the team":                  "/contact",
  "Connect me with the team for venue options": "/contact",
};

/**
 * Returns up to 3 funnel-advancing chips based on current context.
 */
export function getSuggestions(currentQuery = "", usedChips = [], intent = {}) {
  const usedSet = new Set(usedChips);

  // Detect KB vs non-KB cities
  const cities = (intent.cities || []).map(c => c.toLowerCase());
  const hasKbCity    = cities.some(c => KB_CITY_KEYS.includes(c));
  const hasNonKbCity = cities.length > 0 && !hasKbCity;

  // Primary topic
  let topic = detectTopic(currentQuery, intent);

  // Non-KB destination overrides everything except high-intent conversion
  if (hasNonKbCity && !["conversion", "handoff"].includes(intent.stage)) {
    topic = "nonKbDestination";
  }

  // Build venue blocklist — don't reprompt venues already viewed
  const viewedLower = new Set((intent.venues_viewed || []).map(v => v.toLowerCase()));

  const pool = CHIPS[topic] || CHIPS.general;

  const filtered = pool.filter(chip => {
    if (usedSet.has(chip)) return false;

    // Don't re-suggest a venue the user has already seen
    const chipLower = chip.toLowerCase();
    for (const v of viewedLower) {
      const firstName = v.split(" ")[0];
      if (chipLower.includes(firstName) && chipLower.includes("pricing")) return false;
    }

    // Don't suggest destination chips if no destination is known and topic is general
    if (topic === "general" && !hasKbCity && !hasNonKbCity) {
      if (/show (goa|rajasthan|kerala)|tell me about (goa|palace)/i.test(chip)) return false;
    }

    return true;
  });

  const picked = [];
  const seen   = new Set();

  // High intent — lead with the call chip
  const highIntent = intent.stage === "conversion" || intent.stage === "handoff" || intent.intent_level === "high";
  if (highIntent && !usedSet.has("Book a discovery call")) {
    picked.push("Book a discovery call");
    seen.add("Book a discovery call");
  }

  for (const chip of filtered) {
    if (picked.length >= 3) break;
    if (!seen.has(chip)) { seen.add(chip); picked.push(chip); }
  }

  // Fill from general pool if under 3
  if (picked.length < 3) {
    for (const chip of CHIPS.general) {
      if (picked.length >= 3) break;
      if (!usedSet.has(chip) && !seen.has(chip)) { seen.add(chip); picked.push(chip); }
    }
  }

  if (picked.length === 0) picked.push("Book a discovery call");

  return picked.slice(0, 3);
}
