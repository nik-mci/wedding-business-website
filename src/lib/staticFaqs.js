/**
 * Static FAQ bypass — deterministic answers for high-frequency questions.
 * All multi-item answers use markdown "-" bullets so BotMessage renders them as lists.
 * Called before the LLM — no formatting rules from the system prompt apply here.
 */

const FAQ_TABLE = [

  // ── Wedding themes / moodboards ─────────────────────────────────────────────
  [
    /\b(what (wedding |decor |ceremony )?themes?|moodboard|mood board|decor style|wedding style|theme option|what (styles?|look))\b/i,
    "We have curated moodboards across all wedding functions:\n\nHaldi:\n- Citrus Bloom — citrus tones, marigolds, joyful daytime energy\n- Royal Boho — terracotta, macramé, relaxed bohemian luxe\n- Rangon Ki Rasleela — vibrant gulal colors, festive and playful\n\nMehendi:\n- Tangerine Tales — tangerine hues, lush greens, sun-drenched\n- Tropical Rhapsody — tropical blooms, exotic and colorful\n\nSangeet:\n- Disco Shimmer — glittering mirrors, dance floor energy, indoor ballrooms\n- Crimson Soiree — Moulin Rouge-inspired, crimson velvets, nighttime glamour\n\nWedding:\n- Royal Indian — palatial grandeur, maroon and gold, heritage venues\n- Painted Gardens — pastel floral canopies, daytime garden ceremony\n- Haveli Nights — candlelit haveli romance, jewel tones, evening receptions\n- Emerald Eden — deep greens, organic and intimate, perfect for hill stations\n[MOODBOARDS_LINK]",
    "",
  ],

  // ── What makes V&V different ────────────────────────────────────────────────
  [
    /\b(different|unique|special|stand out|why (choose|pick|select|you))\b/i,
    "A few things set us apart:\n- Deep cultural knowledge paired with an international design sensibility\n- Every couple gets a dedicated wedding manager — one person, start to finish\n- Backed by GeTSHolidays — 37 years of event expertise, 150+ professionals\n- 300+ weddings crafted across India and abroad",
    "Happy to walk you through how we'd approach your specific wedding.",
  ],

  // ── How early to book ───────────────────────────────────────────────────────
  [
    /\b(how (early|far|soon|long)|when (should|do) (i|we)|advance|book(ing)?|lead time)\b.*\b(book|plan|start|reserve)\b/i,
    "It depends on the scale:\n- Destination weddings — 12–18 months ahead to lock in the venue\n- Local weddings — 6–12 months is usually enough\n- Shorter timelines — we occasionally accommodate these, reach out and we'll see what's possible",
    "If you have a rough date in mind, I can check what's realistic for the venues you're interested in.",
  ],

  // ── Only Indian weddings ─────────────────────────────────────────────────────
  [
    /\b(only indian|non.?indian|other (religion|culture|faith)|christian|muslim|sikh|interfaith|inter.?faith|multicultural|western|fusion)\b.*\b(wedding|ceremony|celebrat)/i,
    "Not at all. We plan weddings across faiths and cultures:\n- Hindu, Muslim, Sikh, Christian, and civil ceremonies\n- Inter-faith and fusion celebrations\n- Fully bespoke secular ceremonies\nOur roots are in South Asian traditions but we've worked across the world.",
    "Happy to share examples of similar weddings we've planned.",
  ],

  // ── Single point of contact ──────────────────────────────────────────────────
  [
    /\b(single|one|dedicated|same).{0,20}\b(point of contact|person|manager|coordinator|planner)\b|\bwho (will|do) (i|we) (deal|work|speak|talk|coordinate) with\b/i,
    "Yes — every couple gets a dedicated wedding manager who stays with you from the first call to the final farewell. You'll never be passed around or have to repeat yourself.",
    "I'd be happy to introduce you to the team when you're ready.",
  ],

  // ── Budget / pricing ────────────────────────────────────────────────────────
  [
    /\b(budget|cost|price|pricing|how much|charges|fees|package|rate)\b.*\b(wedding|event|destination|plan)/i,
    "Our planning packages:\n- Full Planning — ₹3–8 Lacs — complete planning from scratch (venue sourcing, vendor negotiations, contract management, design, guest management, site visits, post-wedding settlements)\n- Full Luxury / Destination Planning — ₹8–15 Lacs — same inclusions, elevated for destination weddings with higher scale of execution, detailing, and staff-to-guest ratio\n\nThese are planning fees only — venue costs, decor, catering, and vendors are separate.",
    "Share your city and rough guest count and I can give you a clearer overall estimate.",
  ],

  // ── Guest count ──────────────────────────────────────────────────────────────
  [
    /\b(how many (guests|people|pax)|guest (count|list|capacity)|minimum|maximum)\b/i,
    "We plan weddings of all sizes — from intimate 20-person ceremonies to grand celebrations with 1,000+ guests. The venue we suggest will depend largely on your headcount.",
    "Once you share a rough number, I can suggest venues that fit beautifully.",
  ],

  // ── Services offered ────────────────────────────────────────────────────────
  [
    /\b(what (services|do you (offer|provide|do|cover|include))|full.?service|end.?to.?end|manage everything)\b/i,
    "We handle everything end-to-end:\n- Venues & Destinations\n- Planning & coordination\n- Design & Decor\n- Film & Photography\n- Entertainment\n- Hospitality & guest management\n- Vendor Management\n- Travel & Logistics\n- Food & Beverage\n\nAdd-ons include 3D venue modelling, SFX & fireworks, e-invites, trousseau shopping, honeymoon planning, and marriage registration.",
    "Which of these would you like to explore first?",
  ],

  // ── Decor / design ──────────────────────────────────────────────────────────
  [
    /\b(decor|decoration|design service|floral service|mandap|lighting service|decor package|about decor|decor option)\b/i,
    "Our design team builds immersive environments from scratch. What's included:\n- Bespoke conceptualising & mood boards\n- Immersive floral artistry\n- Custom scenography & production\n- Strategic lighting & soundscaping\n- Fine table styling & finer details",
    "Happy to discuss a theme or share past work — what style are you drawn to?",
  ],

  // ── Photography / film ──────────────────────────────────────────────────────
  [
    /\b(photo|photograph|film|video|cinemat|camera|capture|reel|memories)\b/i,
    "We work with India's finest wedding photographers and cinematographers. The service covers:\n- Editorial & cinematic photographer matchmaking\n- Creative briefing & art direction\n- Comprehensive shot listing & logistics\n- BTS & real-time content\n- Post-production & archive management",
    "Happy to share portfolios of photographers who match your preferred style.",
  ],

  // ── Rajasthan / palace weddings ─────────────────────────────────────────────
  [
    /\b(rajasthan|palace|fort|heritage|royal|udaipur|jaipur|jodhpur|jaisalmer)\b.*\b(wedding|venue|celebrat)/i,
    "Rajasthan is our most sought-after destination. Top venues by city:\n- Udaipur — Oberoi Udai Vilas, Taj Lake Palace, Jag Mandir, Shiv Niwas Palace\n- Jaipur — Rambagh Palace, Jai Mahal Palace, Oberoi Raj Vilas\n- Jodhpur — Umaid Bhavan Palace, Ajit Bhawan, Taj Hari Mahal\n- Jaisalmer — Gorbandh Palace, Narain Niwas Fort",
    "Which city or venue interests you?",
  ],

  // ── Goa / beach weddings ────────────────────────────────────────────────────
  [
    /\b(goa|beach|coastal|sea|ocean|sand)\b.*\b(wedding|venue|celebrat)/i,
    "Goa has some of our finest beach wedding venues:\n- ITC Grand Goa — Indo-Portuguese estate on Arossim Beach, Cansaulim\n- St. Regis Goa — 49-acre sanctuary on the Sal River with private beach access\n- Grand Hyatt Goa — 28-acre Indo-Portuguese estate on Bambolim Bay\n- Taj Exotica Goa — Mediterranean-inspired retreat on Benaulim Beach\n- Taj Cidade de Goa — Hillside heritage property on Vainguinim Beach\n- Caravela Beach Resort — Sprawling beachfront estate on Varca Beach",
    "Which one interests you?",
  ],

  // ── Kerala weddings ─────────────────────────────────────────────────────────
  [
    /\b(kerala|backwater|kovalam|cochin|kochi|tropical)\b.*\b(wedding|venue|celebrat)/i,
    "Kerala is beautiful for intimate destination weddings. Our top venues:\n- Taj Green Cove, Kovalam — Balinese-inspired hillside retreat where backwaters meet the sea\n- The Leela Kovalam — India's only clifftop beach resort with panoramic Arabian Sea views\n- Kumarakom — Serene backwater destination with houseboat arrivals and lush greenery\n- Kochi — Colonial heritage setting with Fort Kochi as a backdrop",
    "Which setting appeals to you?",
  ],

  // ── Hills / mountain weddings ───────────────────────────────────────────────
  [
    /\b(hill|mountain|himalaya|rishikesh|mussoorie|shimla|manali|valley|nature|forest|jungle)\b.*\b(wedding|venue|celebrat)/i,
    "Our hills wedding venues:\n- The Westin Rishikesh — Panoramic Himalayan valley views, riverside setting\n- Hyatt Regency Dehradun — Nestled at the foothills of the Himalayas\n- The Lalit Grand Palace, Srinagar — 1910 royal palace overlooking Dal Lake\n- Taj Corbett — Jungle riverside retreat in the forests of Uttarakhand",
    "Which venue or vibe suits you?",
  ],

  // ── Contact / reach out ─────────────────────────────────────────────────────
  [
    /\b(contact|reach|speak|call|whatsapp|email|phone|get in touch|talk to (someone|a (person|human|planner)))\b/i,
    "You can reach the team here:\n- WhatsApp: +91 9654277656\n- Email: arunima.sethi@getsholidays.com\n- Enquiry form: tap 'Begin Your Journey' below\n\nWe usually respond within 24 hours.",
    "",
  ],

];

/**
 * Returns a static answer string if the query matches, otherwise null.
 * @param {string} query
 * @param {boolean} leadCaptured
 */
export function matchStaticFaq(query, leadCaptured = false) {
  if (!query || query.trim().length < 4) return null;
  for (const [pattern, body, handoff] of FAQ_TABLE) {
    if (pattern.test(query)) {
      if (leadCaptured || !handoff) return body;
      return `${body}\n\n${handoff}`;
    }
  }
  return null;
}
