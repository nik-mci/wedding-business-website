/**
 * Funnel-aware suggestion chips.
 *
 * Every chip cluster advances the conversation ONE step forward.
 * Rule: never suggest more of the same thing the user just explored.
 *
 * Funnel stages:
 *   discovery   → destinations / itineraries
 *   value       → moodboards / venues
 *   conversion  → pricing / planning
 *   enquiry     → discovery call / team contact
 */

// ── Topic detection ────────────────────────────────────────────────────────────

const TOPIC_PATTERNS = [
  { topic: "itinerary", re: /itinerary|sample wedding|what does.{0,20}wedding look|day.by.day|big fat indian|beachside wedding|celestial kerala|walk me through|plan a (goa|rajasthan|kerala)|customis|tailor.*wedding|sand ceremony|nuptial chain|sagan|chura|baraat|varmala|bidaai|help.*choose.*destination|can.t decide which/i },
  { topic: "moodboard", re: /moodboard|mood board|\bhaldi\b|\bmehendi\b|sangeet theme|decor theme|wedding themes?|what themes|decor styles?|aesthetic|floral theme|colour palette|color palette|citrus bloom|royal boho|disco shimmer|crimson soiree|painted garden|haveli night|emerald eden|royal indian|rangon|tangerine tales|tropical rhapsody|tell me about (royal|painted|disco|haveli|citrus|crimson|emerald|tropical|rangon|tangerine)/i },
  { topic: "goa",       re: /\bgoa\b|beach\s*wed/i },
  { topic: "rajasthan", re: /\b(rajasthan|udaipur|jaipur|jodhpur|jaisalmer|palace|fort|heritage|royal)\b/i },
  { topic: "kerala",    re: /\b(kerala|kovalam|backwater|kochi|cochin)\b/i },
  { topic: "hills",     re: /\b(hill|mountain|himalaya|rishikesh|dehradun|srinagar|corbett|jungle)\b/i },
  { topic: "services",  re: /\b(service|offer|provide|do you|cover|include|end.to.end|full.service)\b/i },
  { topic: "decor",     re: /\b(decor|design|flower|floral|mandap|lighting|theme)\b/i },
  { topic: "photo",     re: /\b(photo|film|video|camera|cinemat|reel)\b/i },
  { topic: "planning",  re: /\b(plan|coordinator|timeline|budget|itinerary)\b/i },
  { topic: "pricing",   re: /\b(price|cost|how much|pricing|fees|charges|buyout|package pricing)\b/i },
  { topic: "booking",   re: /\b(book|advance|early|when|lead time|availability)\b/i },
  { topic: "team",      re: /\b(team|who|contact|speak|manmeet|arunima|rukmini|discovery call)\b/i },
  { topic: "planning",  re: /\b(what.s included|planning (cover|include)|planning fee|fee separate|how long to sign|sign and start|take on.{0,10}wedding|one wedding at a time|international wedding|outside india)\b/i },
];

function detectTopic(query = "") {
  for (const { topic, re } of TOPIC_PATTERNS) {
    if (re.test(query)) return topic;
  }
  return "general";
}

// ── Funnel-advancing chip pools ────────────────────────────────────────────────
// Each pool's chips move the user ONE step forward, never sideways.

const NEXT_STEP = {

  // After itinerary → move to venues + moodboards + customise
  itinerary: [
    "Show Goa venues for this",
    "Show Rajasthan palace venues",
    "What moodboards suit a Goa wedding",
    "What moodboards suit a Rajasthan wedding",
    "Can this be customised",
    "What does this cost",
    "Book a discovery call",
    "Show Kerala venues",
  ],

  // After moodboard → move to matching venues + budget
  moodboard: [
    "Which venues suit this mood",
    "Budget for a wedding like this",
    "Show Rajasthan palace venues",
    "Show Goa beach venues",
    "Show Kerala venues",
    "Book a discovery call",
    "What does planning cost",
  ],

  // After Goa venues → pricing + planning
  goa: [
    "ITC Grand Goa pricing",
    "St. Regis Goa pricing",
    "Grand Hyatt Goa pricing",
    "Taj Exotica Goa pricing",
    "Taj Cidade de Goa pricing",
    "Caravela Beach Resort pricing",
    "Compare with another Goa venue",
    "Start planning my wedding here",
    "What moodboards suit a Goa wedding",
    "Show Rajasthan venues instead",
    "Book a discovery call",
  ],

  // After Rajasthan venues → pricing + planning
  rajasthan: [
    "Alila Fort Bishangarh pricing",
    "Raffles Udaipur pricing",
    "Fairmont Jaipur pricing",
    "Six Senses Fort Barwara pricing",
    "Suryagarh Jaisalmer pricing",
    "Leela Palace Jaipur pricing",
    "Ajit Bhawan pricing",
    "Samode Palace pricing",
    "ITC Grand Bharat pricing",
    "Compare with another Rajasthan venue",
    "Start planning my wedding here",
    "What moodboards suit a palace wedding",
    "Show Goa venues instead",
    "Book a discovery call",
  ],

  // After Kerala venues → pricing + planning
  kerala: [
    "Taj Green Cove Kovalam pricing",
    "The Leela Kovalam pricing",
    "Compare with another Kerala venue",
    "Start planning my wedding here",
    "What moodboards suit a Kerala wedding",
    "Show Goa venues instead",
    "Book a discovery call",
  ],

  // After Hills venues → pricing + planning
  hills: [
    "Westin Rishikesh pricing",
    "Lalit Grand Palace Srinagar pricing",
    "Taj Corbett pricing",
    "Hyatt Regency Dehradun pricing",
    "Compare with another hills venue",
    "Start planning my wedding here",
    "Show Goa venues instead",
    "Show Rajasthan venues instead",
    "Book a discovery call",
  ],

  // After services → move to venues + pricing + conversion
  services: [
    "What's included in planning",
    "Show Goa beach venues",
    "Show Rajasthan palace venues",
    "Is planning fee separate from venue costs",
    "Book a discovery call",
    "How long to sign and start",
    "Show me a sample itinerary",
  ],

  // After decor → venues + itinerary
  decor: [
    "Which venues suit this mood",
    "Show Goa venues",
    "Show Rajasthan venues",
    "Show me a sample itinerary",
    "Book a discovery call",
  ],

  // After photo → venues + planning
  photo: [
    "Show Goa venues",
    "Show Rajasthan venues",
    "What does planning cost",
    "Book a discovery call",
  ],

  // After planning → pricing + call
  planning: [
    "What's included in planning",
    "Is planning fee separate from venue costs",
    "How long to sign and start",
    "Book a discovery call",
    "Show Goa venues",
    "Show Rajasthan venues",
    "Do you plan international weddings",
  ],

  // After pricing → next step is always the call
  pricing: [
    "Book a discovery call",
    "Start planning my wedding",
    "What's included in planning",
    "Is planning fee separate from venue costs",
    "How long to sign and start",
    "Show Goa venues",
    "Show Rajasthan venues",
  ],

  // After booking/availability → call
  booking: [
    "How long to sign and start",
    "Book a discovery call",
    "Show Goa venues",
    "What does planning cost",
    "Do you take on only one wedding at a time",
    "Start planning my wedding",
    "Do you plan international weddings",
  ],

  // After team → nothing to suggest except other entry points
  team: [
    "Show Goa venues",
    "Show Rajasthan venues",
    "Show me a sample itinerary",
    "What does planning cost",
  ],

  // Default
  general: [
    "Show me a sample itinerary",
    "Show Goa beach venues",
    "Show Rajasthan palace venues",
    "What wedding themes do you offer",
    "What does planning cost",
    "Book a discovery call",
  ],
};

// ── Special chips that open /contact ─────────────────────────────────────────
// Handled separately in Chatbot.js render
export const ACTION_CHIPS = {
  "Book a discovery call":   "/contact",
  "Start planning my wedding": "/contact",
  "Speak to the team":       "/contact",
};

/**
 * Returns 3 funnel-advancing chips based on the current query topic.
 * Filters out chips already shown in this session.
 */
export function getSuggestions(currentQuery = "", usedChips = []) {
  const topic   = detectTopic(currentQuery);
  const pool    = NEXT_STEP[topic] || NEXT_STEP.general;
  const usedSet = new Set(usedChips);

  const queryLower = currentQuery.toLowerCase();
  const filtered = pool.filter(chip => {
    if (usedSet.has(chip)) return false;
    // For moodboards: exclude the one just asked about
    if (topic === "moodboard") {
      const name = chip.replace(/^(tell me about|which venues suit|budget for) /i, "").toLowerCase();
      if (queryLower.includes(name)) return false;
    }
    return true;
  });

  const picked = [];
  const seen   = new Set();
  for (const chip of filtered) {
    if (!seen.has(chip)) { seen.add(chip); picked.push(chip); }
    if (picked.length === 3) break;
  }

  // Fill from general pool if needed (also filtered)
  if (picked.length < 3) {
    for (const chip of NEXT_STEP.general) {
      if (picked.length >= 3) break;
      if (!usedSet.has(chip) && !seen.has(chip)) { seen.add(chip); picked.push(chip); }
    }
  }

  // Hard fallback
  if (picked.length < 3) picked.push("Book a discovery call");

  return picked.slice(0, 3);
}
