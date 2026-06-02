/**
 * Curated suggestion chips — always based on the CURRENT query topic.
 * Uses the current query text as primary signal, NOT accumulated conversation history.
 */

// ── Topic detection ────────────────────────────────────────────────────────────

const TOPIC_PATTERNS = [
  { topic: "moodboard", re: /\b(moodboard|mood board|haldi|mehendi|sangeet theme|decor theme|wedding theme|aesthetic|floral theme|palette|citrus bloom|royal boho|disco shimmer|crimson soiree|painted garden|haveli night|emerald eden|royal indian|rangon|tangerine tales|tropical rhapsody)\b/i },
  { topic: "goa",       re: /\bgoa\b|beach\s*wed/i },
  { topic: "rajasthan", re: /\b(rajasthan|udaipur|jaipur|jodhpur|jaisalmer|palace|fort|heritage|royal)\b/i },
  { topic: "kerala",    re: /\b(kerala|kovalam|backwater|kochi|cochin)\b/i },
  { topic: "hills",     re: /\b(hill|mountain|himalaya|rishikesh|dehradun|srinagar|corbett|jungle)\b/i },
  { topic: "services",  re: /\b(service|offer|provide|do you|cover|include|end.to.end|full.service)\b/i },
  { topic: "decor",     re: /\b(decor|design|flower|floral|mandap|lighting|theme)\b/i },
  { topic: "photo",     re: /\b(photo|film|video|camera|cinemat|reel)\b/i },
  { topic: "planning",  re: /\b(plan|coordinator|timeline|budget|itinerary)\b/i },
  { topic: "pricing",   re: /\b(price|cost|budget|how much|pricing|fees|charges)\b/i },
  { topic: "booking",   re: /\b(book|advance|early|when|lead time)\b/i },
  { topic: "team",      re: /\b(team|who|contact|speak|manmeet|arunima|rukmini)\b/i },
];

function detectTopic(query = "") {
  for (const { topic, re } of TOPIC_PATTERNS) {
    if (re.test(query)) return topic;
  }
  return "general";
}

// ── Chip pool by topic ────────────────────────────────────────────────────────

const CONTACT_CHIP = "Speak to the team";

const CHIPS_BY_TOPIC = {
  moodboard: [
    "Sangeet theme for indoor venue",
    "Haldi theme ideas",
    "Floral garden wedding theme",
    "Theme for a palace wedding",
    "Beach wedding theme",
    "Decor services explained",
  ],
  goa: [
    "Pricing for ITC Grand Goa",
    "Pricing for St Regis Goa",
    "Pricing for Grand Hyatt Goa",
    "Best venue for 500+ guests",
    "Goa vs Kerala beach wedding",
    "Show Rajasthan venues",
    "Beach wedding itinerary",
  ],
  rajasthan: [
    "Pricing for Rambagh Palace",
    "Pricing for Oberoi Udai Vilas",
    "Pricing for Umaid Bhawan",
    "Best palace for 200 guests",
    "Udaipur vs Jaipur for weddings",
    "Show Goa beach venues",
    "Palace wedding itinerary",
  ],
  kerala: [
    "Pricing for Taj Green Cove",
    "Pricing for The Leela Kovalam",
    "Kerala wedding itinerary",
    "Goa vs Kerala for destination wedding",
    "Show Rajasthan venues",
    "How many guests does Leela host",
  ],
  hills: [
    "Pricing for Westin Rishikesh",
    "Pricing for Lalit Grand Srinagar",
    "Best hills venue for 300 guests",
    "Rishikesh vs Srinagar wedding",
    "Show Goa beach venues",
    "Hills wedding itinerary",
  ],
  services: [
    "Planning package pricing",
    "Show Goa venues",
    "Show Rajasthan venues",
    "How early to book",
    "Budget tiers explained",
  ],
  decor: [
    "Show Rajasthan venues",
    "Show Goa beach venues",
    "Film and photography options",
    "What services do you offer",
    "Budget tiers explained",
  ],
  photo: [
    "Show Goa venues",
    "Show Rajasthan venues",
    "What services do you offer",
    "Budget tiers explained",
    "How early to book",
  ],
  planning: [
    "How early to book",
    "Budget tiers explained",
    "Show Goa venues",
    "Show Rajasthan venues",
    "Show Kerala venues",
  ],
  pricing: [
    "Budget tiers explained",
    "Pricing for Goa venues",
    "Pricing for Rajasthan venues",
    "What affects the total cost",
    "Show Goa venues",
  ],
  booking: [
    "How early to book",
    "Best wedding season",
    "Show Goa venues",
    "Show Rajasthan venues",
    "Budget tiers explained",
  ],
  team: [
    "What services do you offer",
    "Show Goa venues",
    "Show Rajasthan venues",
    "How early to book",
  ],
  general: [
    "Show Goa beach venues",
    "Show Rajasthan palace venues",
    "Show Kerala venues",
    "What services do you offer",
    "Budget tiers explained",
    "How early to book",
  ],
};

/**
 * Returns 3 chips based on the CURRENT query topic.
 * @param {string} currentQuery - the user's message this turn
 */
export function getSuggestions(currentQuery = "") {
  const topic = detectTopic(currentQuery);
  const pool  = CHIPS_BY_TOPIC[topic] || CHIPS_BY_TOPIC.general;

  const seen = new Set();
  const picked = [];
  for (const chip of pool) {
    if (!seen.has(chip)) {
      seen.add(chip);
      picked.push(chip);
    }
    if (picked.length === 3) break;
  }

  // If fewer than 3 relevant chips, fill with "Speak to the team" rather than unrelated ones
  if (picked.length < 3) {
    picked.push(CONTACT_CHIP);
  }

  return picked.slice(0, 3);
}
