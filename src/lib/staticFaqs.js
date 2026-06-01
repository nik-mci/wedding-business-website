/**
 * Static FAQ bypass — deterministic answers for high-frequency questions.
 * All multi-item answers use markdown "-" bullets so BotMessage renders them as lists.
 * Called before the LLM — no formatting rules from the system prompt apply here.
 */

const FAQ_TABLE = [

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
    "Our weddings span a wide range depending on city, venue, and guest count:\n- ₹8–15 Lacs — intimate celebration\n- ₹15–30 Lacs — mid-scale wedding\n- ₹30–60 Lacs — grand multi-day event\n- ₹60 Lacs to ₹1 Cr+ — palace or large destination wedding",
    "Share your rough guest count and preferred city and I can give you a much sharper estimate.",
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
    /\b(decor|decoration|design|flowers|floral|mandap|lighting|theme|aesthetic)\b/i,
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
    "Rajasthan is our most sought-after destination. Top venues by city:\n- Udaipur — Oberoi Udai Vilas, Taj Lake Palace, Jag Mandir\n- Jaipur — Rambagh Palace, Jai Mahal Palace, Oberoi Raj Vilas\n- Jodhpur — Umaid Bhavan Palace, Ajit Bhawan\nBuyout costs typically range from ₹1.5 Cr to ₹5 Cr+ depending on venue and scale.",
    "Which city or venue are you most drawn to?",
  ],

  // ── Goa / beach weddings ────────────────────────────────────────────────────
  [
    /\b(goa|beach|coastal|sea|ocean|sand)\b.*\b(wedding|venue|celebrat)/i,
    "Goa has some of our most popular beach wedding venues:\n- ITC Grand Goa — 1,000+ guests, ₹1.5–3 Cr buyout\n- St. Regis Goa — 500+ guests, ₹2.5–3 Cr buyout\n- Grand Hyatt Goa — 1,200+ guests, ₹3.5–5.5 Cr buyout\n- Taj Exotica — 450+ guests, ₹2–3.5 Cr buyout\n- Caravela Beach Resort — 600+ guests, ₹1.8–3 Cr buyout\n\nKerala (Taj Green Cove, The Leela Kovalam) is a beautiful alternative for a more intimate feel.",
    "What's your rough guest count? That'll help me narrow it down.",
  ],

  // ── Kerala weddings ─────────────────────────────────────────────────────────
  [
    /\b(kerala|backwater|kovalam|cochin|kochi|tropical)\b.*\b(wedding|venue|celebrat)/i,
    "Kerala is stunning for intimate destination weddings. Top picks:\n- Taj Green Cove, Kovalam — 59 rooms, Balinese hillside, ₹80L–1.5 Cr buyout\n- The Leela Kovalam — 188 rooms, India's only clifftop beach resort, ₹2.8–4.5 Cr buyout\n\nKerala weddings typically feature elephant entrances, banana-leaf feasts, and Panchavadyam music.",
    "Would you like a sample itinerary for a Kerala wedding?",
  ],

  // ── Hills / mountain weddings ───────────────────────────────────────────────
  [
    /\b(hill|mountain|himalaya|rishikesh|mussoorie|shimla|manali|valley|nature|forest|jungle)\b.*\b(wedding|venue|celebrat)/i,
    "Great picks for a hills wedding:\n- The Westin Rishikesh — Himalayan valley views, ₹2.5–3.5 Cr buyout\n- Hyatt Regency Dehradun — foothills of the Himalayas, ₹2.2–3.8 Cr buyout\n- The Lalit Grand Palace, Srinagar — Dal Lake, heritage palace setting\n- Taj Corbett — jungle riverside, intimate and nature-immersed",
    "Which vibe suits you — dramatic Himalayan, lush forest, or lakeside heritage?",
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
