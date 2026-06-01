/**
 * Static FAQ bypass — returns a deterministic answer for high-frequency questions
 * without hitting the LLM or vector DB. Called first in the chat pipeline.
 *
 * Ported from GeTS travel chatbot (static_faqs.py) with wedding-specific Q&A.
 *
 * Usage:
 *   import { matchStaticFaq } from "@/lib/staticFaqs";
 *   const hit = matchStaticFaq(query, leadCaptured);
 *   if (hit) return hit; // stream directly, skip retrieval
 */

// Each entry: [regex, factualBody, softHandoff]
// softHandoff is appended only when leadCaptured=false — keep declarative, not imperative.
const FAQ_TABLE = [

  // ── What makes V&V different ────────────────────────────────────────────────
  [
    /\b(different|unique|special|stand out|why (choose|pick|select|you))\b/i,
    "Vows & Vedas combines deep cultural knowledge with an international design sensibility. Every wedding is treated as a one-of-a-kind story — every detail intentional, every vendor trusted, and every couple genuinely cared for from the first call to the final farewell.",
    "Happy to walk you through how we'd approach your specific wedding.",
  ],

  // ── How early to book ───────────────────────────────────────────────────────
  [
    /\b(how (early|far|soon|long)|when (should|do) (i|we)|advance|book(ing)?|lead time)\b.*\b(book|plan|start|reserve)\b/i,
    "For destination weddings we recommend booking 12–18 months in advance to secure your ideal venue and dates. For local weddings, 6–12 months is usually enough. We occasionally accommodate shorter timelines too — reach out and we'll see what's possible.",
    "If you have a rough date in mind, I can check what's realistic for the venues you're interested in.",
  ],

  // ── Only Indian weddings ─────────────────────────────────────────────────────
  [
    /\b(only indian|non.?indian|other (religion|culture|faith)|christian|muslim|sikh|interfaith|inter.?faith|multicultural|western|fusion)\b.*\b(wedding|ceremony|celebrat)/i,
    "Not at all — while our roots are in South Asian traditions, we plan multicultural, fusion, and inter-faith weddings of all kinds. We've celebrated Hindu, Muslim, Sikh, Christian, civil, and bespoke secular ceremonies across the world.",
    "Happy to share examples of similar weddings we've planned.",
  ],

  // ── Single point of contact ──────────────────────────────────────────────────
  [
    /\b(single|one|dedicated|same).{0,20}\b(point of contact|person|manager|coordinator|planner)\b|\bwho (will|do) (i|we) (deal|work|speak|talk|coordinate) with\b/i,
    "Yes — every couple is assigned a dedicated wedding manager who becomes your single point of contact throughout the entire journey, from initial vision call to post-wedding wrap-up. You'll never feel passed around.",
    "I'd be happy to introduce you to the team when you're ready.",
  ],

  // ── Budget / pricing ────────────────────────────────────────────────────────
  [
    /\b(budget|cost|price|pricing|how much|charges|fees|package|rate)\b.*\b(wedding|event|destination|plan)/i,
    "Destination wedding costs vary widely based on city, venue, guest count, and services chosen. As a rough guide: intimate celebrations start around ₹8–15 Lacs, mid-scale weddings run ₹15–30 Lacs, and grand multi-day palace events can range from ₹30 Lacs to ₹1 Cr+. We'll map a realistic budget once we understand your vision.",
    "Happy to give you a clearer range once I know your preferred city and rough guest count.",
  ],

  // ── Guest count ──────────────────────────────────────────────────────────────
  [
    /\b(how many (guests|people|pax)|guest (count|list|capacity)|minimum|maximum)\b/i,
    "We plan weddings of all sizes — from intimate 20-person ceremonies to grand celebrations with 1,000+ guests. The venue and city choices we make together will depend largely on your guest count.",
    "Once you share a rough headcount, I can suggest venues that fit beautifully.",
  ],

  // ── Services offered ────────────────────────────────────────────────────────
  [
    /\b(what (services|do you (offer|provide|do|cover|include))|full.?service|end.?to.?end|manage everything)\b/i,
    "We offer end-to-end wedding management: Venues & Destinations, Planning, Design & Decor, Film & Photography, Entertainment, Hospitality, Vendor Management, Travel & Logistics, and Food & Beverage. We also offer add-ons including 3D venue modelling, SFX & fireworks, e-invites, trousseau shopping, honeymoon planning, and marriage registration.",
    "I can go deeper on any of these — which service are you most curious about?",
  ],

  // ── Decor / design ──────────────────────────────────────────────────────────
  [
    /\b(decor|decoration|design|flowers|floral|mandap|lighting|theme|aesthetic)\b/i,
    "Our design team builds immersive environments from the ground up — every mandap, centerpiece, and lighting rig is designed to reflect your story. Services include bespoke conceptualising & mood boards, immersive floral artistry, custom scenography, strategic lighting & soundscaping, and fine table styling.",
    "Happy to share some of our past design work or discuss a theme you have in mind.",
  ],

  // ── Photography / film ──────────────────────────────────────────────────────
  [
    /\b(photo|photograph|film|video|cinemat|camera|capture|reel|memories)\b/i,
    "We work with India's finest wedding photographers and cinematographers. Our film & photography service covers editorial & cinematic matchmaking, creative briefing & art direction, comprehensive shot listing, BTS & real-time content, and post-production & archive management.",
    "Happy to share portfolios of photographers who match your preferred style.",
  ],

  // ── Rajasthan / palace weddings ─────────────────────────────────────────────
  [
    /\b(rajasthan|palace|fort|heritage|royal|udaipur|jaipur|jodhpur|jaisalmer)\b.*\b(wedding|venue|celebrat)/i,
    "Rajasthan is our most sought-after destination. Key cities include Udaipur (Oberoi Udai Vilas, Taj Lake Palace, Jag Mandir), Jaipur (Rambagh Palace, Jai Mahal Palace), and Jodhpur (Umaid Bhavan Palace). Most palace venues in Rajasthan have a buyout cost ranging from ₹1.5 Cr to ₹5 Cr+ depending on size and prestige.",
    "I can pull up detailed specs and pricing for any specific palace you're considering.",
  ],

  // ── Goa / beach weddings ────────────────────────────────────────────────────
  [
    /\b(goa|beach|coastal|sea|ocean|sand)\b.*\b(wedding|venue|celebrat)/i,
    "For beach weddings, Goa offers world-class venues including ITC Grand Goa (1,000+ guests, ₹1.5–3 Cr buyout), St. Regis Goa (500+ guests, ₹2.5–3 Cr), Grand Hyatt Goa (1,200+ guests, ₹3.5–5.5 Cr), Taj Exotica (450+ guests), and Caravela Beach Resort. Kerala's Taj Green Cove and The Leela Kovalam are beautiful alternatives.",
    "Happy to compare venues side by side once I know your guest count and rough budget.",
  ],

  // ── Kerala weddings ─────────────────────────────────────────────────────────
  [
    /\b(kerala|backwater|kovalam|cochin|kochi|tropical)\b.*\b(wedding|venue|celebrat)/i,
    "Kerala offers stunning backwater and clifftop venues. Top picks: Taj Green Cove Kovalam (Balinese-inspired hillside, 59 rooms, ₹80L–1.5 Cr buyout) and The Leela Kovalam (India's only clifftop beach resort, 188 rooms, ₹2.8–4.5 Cr buyout). Kerala weddings feature traditional elephant entrances, banana-leaf feasts, and Panchavadyam music.",
    "I can walk you through a sample Kerala wedding itinerary if you'd like.",
  ],

  // ── Hills / mountain weddings ───────────────────────────────────────────────
  [
    /\b(hill|mountain|himalaya|rishikesh|mussoorie|shimla|manali|valley|nature|forest|jungle)\b.*\b(wedding|venue|celebrat)/i,
    "For hills weddings, we work with venues including The Westin Rishikesh (Himalayan views, ₹2.5–3.5 Cr buyout), Hyatt Regency Dehradun (foothills of Himalayas, ₹2.2–3.8 Cr), The Lalit Grand Palace Srinagar (Dal Lake views, heritage palace), and Taj Corbett (jungle riverside setting).",
    "Happy to suggest the right hills destination based on your preferred vibe — dramatic Himalayan, lush forest, or lakeside heritage.",
  ],

  // ── Contact / reach out ─────────────────────────────────────────────────────
  [
    /\b(contact|reach|speak|call|whatsapp|email|phone|get in touch|talk to (someone|a (person|human|planner)))\b/i,
    "You can reach us on WhatsApp at +91 9654277656 or email us at arunima.sethi@getsholidays.com. You can also fill in our enquiry form on the Contact page and we'll get back to you within 24 hours.",
    "",
  ],

];

/**
 * Returns a static answer string if the query matches a known pattern, otherwise null.
 * @param {string} query
 * @param {boolean} leadCaptured - when true, omits the soft handoff line
 */
export function matchStaticFaq(query, leadCaptured = false) {
  if (!query || query.trim().length < 4) return null;
  for (const [pattern, body, handoff] of FAQ_TABLE) {
    if (pattern.test(query)) {
      if (leadCaptured || !handoff) return body;
      return `${body} ${handoff}`;
    }
  }
  return null;
}
