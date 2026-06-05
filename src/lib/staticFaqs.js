/**
 * Static FAQ bypass — deterministic answers for high-frequency questions.
 * All multi-item answers use markdown "-" bullets so BotMessage renders them as lists.
 * Called before the LLM — no formatting rules from the system prompt apply here.
 */

const FAQ_TABLE = [

  // ── Minimum budget ───────────────────────────────────────────────────────────
  [
    /\b(min(imum)? budget|minimum cost|minimum (to|for) work|starting budget|start from|how much to start|least (budget|amount)|budget (to|for) (work|start|plan|begin))\b/i,
    "Our planning fee starts at ₹5 Lakhs for Full-Service and Destination Wedding Planning. There's no rigid minimum for the overall wedding budget, but our network of premium vendors and luxury venues works best for comprehensive celebrations starting from ₹50 Lakhs upwards.",
    "Happy to give you a clearer picture once I know your destination and approximate guest count.",
  ],

  // ── International weddings ───────────────────────────────────────────────────
  [
    /\b(international|outside india|abroad|overseas|destination (wedding )?(outside|abroad|internationally)|foreign (country|location|venue))\b/i,
    "Yes — we plan destination weddings worldwide. Backed by our corporate infrastructure and 30 international offices, we handle cross-border vendor curation, guest logistics, ticketing, planning, and on-site execution seamlessly.",
    "Happy to discuss international options once I know the destination you have in mind.",
  ],

  // ── Enquiry to signing timeline ──────────────────────────────────────────────
  [
    /\b(how long|timeline|process|onboarding|how does it work|what happens after|next step|signing|contract)\b.*\b(enquir|start|begin|sign|book)\b|\b(enquir|start|begin).*\b(how long|timeline|process)\b/i,
    "Our onboarding process ideally spans 15–20 days to ensure we are a perfect fit for your vision:\n1. Initial Discovery (Days 1–5): A detailed consultation to understand your scope, aesthetic direction, and venue preferences.\n2. Custom Proposal (Days 6–10): We present a tailored service outline, tentative budget framework, and fee structure.\n3. Alignment & Signing (Days 11–20): Finalising contract clauses, scope details, and processing the retainer to officially secure your dates on our calendar.",
    "I'd love to connect you with our planning team to start this process — would you like to schedule a quick call?",
  ],

  // ── How many weddings / exclusivity ─────────────────────────────────────────
  [
    /\b(how many (weddings|clients|couples)|exclusive|dedicated|full attention|other (weddings|clients)|calendar|capacity|take on)\b/i,
    "We strictly limit our calendar to maintain a boutique standard. We take a maximum of one flagship destination or full-service wedding at a time, and two local weddings in Delhi. This means our principal planners are 100% dedicated to your celebration — no divided attention.",
    "",
  ],

  // ── Non-Hindu / multi-faith ──────────────────────────────────────────────────
  [
    /\b(non.?hindu|other religion|other faith|christian|muslim|sikh|civil|interfaith|inter.?faith|multicultural|cross.?cultural|different religion)\b/i,
    "Absolutely. Our team is experienced across all religions and cultures — Hindu, Muslim, Sikh, Christian, civil, and fusion ceremonies. We research the unique rituals and structural flow of every ceremony we plan, so your personal heritage is honoured with the same care we bring to every wedding.",
    "",
  ],

  // ── Vendor cancellation / backup plan ───────────────────────────────────────
  [
    /\b(vendor cancel|backup|what if.*cancel|last minute|contingency|emergency|backup plan|vendor.*fall through)\b/i,
    "Last-minute vendor cancellations are extremely rare in our network since we work with vetted, elite partners. If an emergency does occur, we take immediate charge — we maintain active backup relationships with top-tier decor houses, caterers, and artists, and secure an equivalent pre-vetted replacement without interrupting your experience or adding unexpected costs.",
    "",
  ],

  // ── Planning fee vs venue costs ──────────────────────────────────────────────
  [
    /\b(planning fee|management fee|your fee|what do you charge|fee (separate|include|cover|include venue)|does (the |your )?fee include)\b/i,
    "Our planning and management fee is completely separate from venue, catering, and vendor costs. We operate on a transparent, fixed fee structure based on your service tier. All payments to venues and third-party vendors are made directly by you — this ensures fully unbiased recommendations and complete budget visibility.",
    "Happy to share the exact fee structure once I know your wedding scope.",
  ],

  // ── Destination-specific moodboards ─────────────────────────────────────────
  [
    /moodboard.{0,30}(goa|beach)|goa.{0,30}moodboard|(beach|coastal).{0,20}(theme|mood|aesthetic|look)/i,
    "For a Goa beach wedding, these moodboards work beautifully:\n\nMehendi:\n- Tropical Rhapsody — tropical blooms, vibrant greens, exotic and colorful — perfect for beachside\n- Tangerine Tales — tangerine hues, lush greens, sun-drenched and bohemian\n\nHaldi:\n- Citrus Bloom — citrus tones, marigolds, joyful daytime energy\n\nSangeet:\n- Disco Shimmer — glittering mirrors, dance floor energy, great for indoor ballrooms\n\nWedding:\n- Painted Gardens — pastel florals, daytime garden feel\n- Royal Indian — gold and deep reds if you want grandeur even by the beach\n[MOODBOARDS_LINK]",
    "Which function are you most focused on styling first?",
  ],
  [
    /moodboard.{0,30}(rajasthan|palace|royal|heritage)|rajasthan.{0,30}moodboard|(palace|royal|heritage).{0,20}(theme|mood|aesthetic|look)/i,
    "For a Rajasthan palace wedding, these moodboards are a natural fit:\n\nWedding:\n- Royal Indian — palatial grandeur, maroon and gold, made for heritage venues\n- Haveli Nights — candlelit romance, jewel tones, glowing lanterns and arches\n\nHaldi:\n- Rangon Ki Rasleela — vibrant and festive, gulal colors and marigolds\n- Royal Boho — terracotta and amber, relaxed yet opulent\n\nSangeet:\n- Crimson Soiree — Moulin Rouge-inspired drama, perfect for a Rajasthani fort at night\n[MOODBOARDS_LINK]",
    "Which function are you most focused on styling first?",
  ],
  [
    /moodboard.{0,30}(kerala|backwater)|(kerala|backwater).{0,30}moodboard|(tropical|lush|intimate).{0,20}(theme|mood|aesthetic)/i,
    "For a Kerala wedding, these moodboards work well:\n\nMehendi:\n- Tropical Rhapsody — tropical blooms, vibrant greens, exotic — mirrors Kerala's lush landscape\n- Tangerine Tales — warm citrus hues, perfect for a daytime mehendi by the backwaters\n\nWedding:\n- Emerald Eden — deep greens, organic and intimate, perfect for backwater and hillside settings\n- Painted Gardens — soft pastels and florals for a daytime ceremony\n[MOODBOARDS_LINK]",
    "Which function are you most focused on styling first?",
  ],
  [
    /moodboard.{0,30}(hill|mountain|forest|jungle)|(hill|mountain|forest).{0,30}moodboard/i,
    "For a hills wedding, these moodboards complement the setting:\n\nWedding:\n- Emerald Eden — deep greens, forest tones, organic and intimate — built for hill stations\n- Haveli Nights — jewel tones and warm candlelight work beautifully in mountain evenings\n\nHaldi:\n- Royal Boho — terracotta and sage, relaxed outdoor feel\n\nSangeet:\n- Disco Shimmer — high energy for an indoor ballroom evening\n[MOODBOARDS_LINK]",
    "Which function are you most focused on styling first?",
  ],

  // ── What's included in planning ──────────────────────────────────────────────
  [
    /\b(what.?s included|what (is|does).{0,20}include|what.*planning (cover|include|involve)|planning.*inclusions?|planning.*package.*include)\b/i,
    "Our planning service covers:\n- Venue sourcing and selection\n- All vendor negotiations\n- Contract management\n- Detailed design conceptualisation\n- Guest management support\n- Multiple planning meetings\n- Site visits\n- Post-wedding vendor settlements\n\nFor Luxury / Destination Planning, the inclusions stay the same — what changes is the scale of execution, level of personalisation, and the staff-to-guest ratio.",
    "I'd love to connect you with our planning team to walk you through this in detail — would you like to schedule a quick call?",
  ],

  // ── Wedding themes / moodboards ─────────────────────────────────────────────
  [
    /moodboard|mood board|wedding themes?|what themes|decor themes?|decor style|wedding style|what (styles?|look)|theme option/i,
    "We have curated moodboards across all wedding functions:\n\nHaldi:\n- Citrus Bloom — citrus tones, marigolds, joyful daytime energy\n- Royal Boho — terracotta, macramé, relaxed bohemian luxe\n- Rangon Ki Rasleela — vibrant gulal colors, festive and playful\n\nMehendi:\n- Tangerine Tales — tangerine hues, lush greens, sun-drenched\n- Tropical Rhapsody — tropical blooms, exotic and colorful\n\nSangeet:\n- Disco Shimmer — glittering mirrors, dance floor energy, indoor ballrooms\n- Crimson Soiree — Moulin Rouge-inspired, crimson velvets, nighttime glamour\n\nWedding:\n- Royal Indian — palatial grandeur, maroon and gold, heritage venues\n- Painted Gardens — pastel floral canopies, daytime garden ceremony\n- Haveli Nights — candlelit haveli romance, jewel tones, evening receptions\n- Emerald Eden — deep greens, organic and intimate, perfect for hill stations\n[MOODBOARDS_LINK]",
    "",
  ],

  // ── Sample itinerary / show me a wedding ────────────────────────────────────
  [
    /\b(sample|show me|what does|walk me|take me|give me).{0,30}(itinerary|wedding look|day look|plan|schedule)\b|plan a (goa|rajasthan|kerala|beach|palace|hill)/i,
    "We have three signature itineraries — each is a starting point and every detail is flexible:\n\n- The Big Fat Indian Wedding — Rajasthan, 4 days. Garland welcome, Sagan, Mehndi & Sangeet, then the grand finale with elephant procession, fireworks and lavish buffet.\n- Exotic Beachside Wedding — Goa, 4 days. Beach arrival, bridal spa rituals, sand ceremony with a live choir, and a champagne villa brunch.\n- Celestial Kerala Union — Kerala, 3 days. Mehndi by the backwaters, elephant-entrance ceremony under a floral pandal, and a farewell feast on banana leaves.\n\nWhich setting speaks to you most?",
    "",
  ],

  // ── Goa / beach itinerary ────────────────────────────────────────────────────
  [
    /\b(what does|what.s|tell me about|describe|walk).{0,20}(goa|beach).{0,20}(wedding look|wedding like|itinerary|day|plan)\b/i,
    "Our Goa itinerary is a 4-day beachside celebration:\n\n- Day 1 — Sunkissed Arrival: Transfer to your resort and settle in at leisure.\n- Day 2 — Bridal Rituals: Traditional anointing with scented oils, then a couples' spa at Aguada.\n- Day 3 — The Sand Ceremony: Exchange vows beachside with a live choir, followed by a poolside gala dinner and champagne.\n- Day 4 — Blissful Brunch: First morning of marriage celebrated with a champagne brunch in your decorated villa.\n\nEvery detail is flexible — this is your starting point, not your script.",
    "Want to see the venues we love for this, or explore the moodboards for a Goa beach wedding?",
  ],

  // ── Rajasthan / palace itinerary ─────────────────────────────────────────────
  [
    /\b(what does|what.s|tell me about|describe|walk).{0,20}(rajasthan|palace|big fat).{0,20}(wedding look|wedding like|itinerary|day|plan)\b|big fat indian wedding/i,
    "Our Rajasthan itinerary is a 4-day grand celebration:\n\n- Day 1 — Royal Welcome: Traditional garland arrival, city tour, and Bachelor's Party in a floral canopy.\n- Day 2 — The Engagement: Sagan function with ring exchange and live Shehnai and Flute music.\n- Day 3 — Mehndi & Sangeet: Celebrity performance, vibrant henna artistry at a theme-decorated venue.\n- Day 4 — The Grand Finale: Haldi and Chura rituals, majestic elephant procession, fireworks, and a lavish buffet dinner.\n\nThis is a template — we can adjust any ceremony, add functions, or change the sequence.",
    "Want to see palace venues for this, or explore the Royal Indian moodboard?",
  ],

  // ── Kerala itinerary ──────────────────────────────────────────────────────────
  [
    /\b(what does|what.s|tell me about|describe|walk).{0,20}(kerala|backwater).{0,20}(wedding look|wedding like|itinerary|day|plan)\b/i,
    "Our Kerala itinerary is a 3-day intimate celebration:\n\n- Day 1 — Backwater Greeting: Arrival at a tropical resort, traditional Mehndi ceremony with South Indian classical music.\n- Day 2 — The Nuptial Chain: Grand entrance on decorated elephants, rituals under a floral pandal with sacred mantras, feast on banana leaves.\n- Day 3 — Tropical Reflection: Relaxation by the backwaters, farewell dinner under the palms.\n\nKerala weddings carry deep cultural beauty — every ritual is arranged with care.",
    "Want to see the venues we use in Kerala, or explore moodboards that suit this setting?",
  ],

  // ── Customise itinerary ───────────────────────────────────────────────────────
  [
    /\b(customis|customiz|tailor|personalise|personalize|modify|change|adjust|flexible|adapt).{0,20}(itinerary|plan|package|wedding)\b/i,
    "Absolutely — our itineraries are starting points, not fixed packages. Every detail is flexible: the sequence of ceremonies, the venue, the number of functions, the decor theme, and the duration can all be shaped around your vision.\n\nOnce you tell me which itinerary feels closest to what you have in mind, I can walk you through what we'd typically change and connect you with the team to build the actual plan.",
    "",
  ],

  // ── Ceremony-specific questions ───────────────────────────────────────────────
  [
    /\b(haldi|chura|sagan|sangeet|mehndi|mehendi|nuptial chain|sand ceremony|bidaai|varmala|baraat)\b/i,
    "Yes — we handle all pre-wedding and wedding ceremonies as part of the planning process. This includes Haldi, Chura, Sagan, Mehndi, Sangeet, Baraat, Varmala, and the main wedding rituals. Each is styled and coordinated by our team, and all ceremonies can be designed individually or combined into a multi-day itinerary.\n\nFor Haldi specifically, we also have dedicated moodboards — Citrus Bloom, Royal Boho, and Rangon Ki Rasleela — to help you visualise the look and feel.\n[MOODBOARDS_LINK]",
    "",
  ],

  // ── Help choose destination ───────────────────────────────────────────────────
  [
    /\b(help (me )?choose|can.t decide|not sure|which (destination|place|city|location)|compare (destination|goa|rajasthan|kerala|hills))\b/i,
    "A few questions help us match you quickly. The three things that matter most are the atmosphere you want (grand royal, relaxed beach, lush tropical, or dramatic hills), your approximate guest count, and whether you want a single-venue buyout or a more open setup.\n\nThinking about atmosphere first — which feels most you: a palace in the desert, beachside in Goa, the backwaters of Kerala, or a Himalayan valley?",
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
    /\b(what (services|do you (offer|provide|do|cover|include))|full.?service|end.?to.?end|manage everything|all services|list.*services)\b/i,
    "We cover every aspect of your wedding across 9 core services:\n- Venues & Destinations — every setting handpicked globally\n- Planning — every detail considered, every moment orchestrated\n- Design & Decor — immersive environments crafted to your story\n- Film & Photography — cinematic storytelling, raw emotion, editorial craft\n- Entertainment — concert-grade production, curated talent\n- Hospitality — white-glove guest management from arrival to departure\n- Vendor Management — India's elite artisan network, fully managed\n- Travel & Logistics — seamless transport and guest transit\n- Food & Beverage — bespoke menus and world-class bar curation\n\nAdd-ons: 3-D Models, SFX & Fireworks, E-Invites, Home Decor, Wedding Website, Trousseau Shopping, Gifting & Favours, Honeymoon Planning, Marriage Registration, Visa Assistance.",
    "Which of these would you like to explore first?",
  ],

  // ── Entertainment ────────────────────────────────────────────────────────────
  [
    /\b(entertainment|performers?|artists?|celebrity|live (music|performances?|band|act)|sangeet (performances?|show|artists?)|dj|choreograph|show)\b/i,
    "Our Entertainment service delivers concert-grade production with curated talent:\n- Live performances and celebrity artist bookings\n- Sangeet choreography programming\n- DJ and music direction\n- Custom sound and lighting production\n- Fully programmed entertainment experiences from entry to finale",
    "Let me know the vibe you're going for — high-energy Bollywood, soulful classical, or something entirely different.",
  ],

  // ── Hospitality ──────────────────────────────────────────────────────────────
  [
    /\b(hospitality|guest (management|handling|experience|care|arrival|transfer)|airport (transfer|pickup|drop)|welcome (guest|experience)|vip (arrival|guest))\b/i,
    "Our Hospitality service provides white-glove guest management from arrival to departure:\n- Airport and venue transfers\n- VIP arrivals and guest escort coordination\n- Accommodation management\n- Guest welcome kits and on-ground concierge\n- Ensuring every guest feels completely looked after throughout",
    "How many guests are you expecting? That helps us plan the right hospitality scale.",
  ],

  // ── Vendor Management ────────────────────────────────────────────────────────
  [
    /\b(vendor (management|network|negotiat|select|sourcing|coordination)|which vendors|your vendors|vendor partner)\b/i,
    "Our Vendor Management service gives you access to India's curated network of elite artisans and suppliers. We handle everything:\n- Vendor curation and vetting\n- Negotiation and contract management\n- Ongoing coordination and quality control\n- Pre-vetted backup vendors for any emergency",
    "Is there a specific vendor category — decor, catering, entertainment — you'd like to know more about?",
  ],

  // ── Travel & Logistics ───────────────────────────────────────────────────────
  [
    /\b(travel|logistics|transport|fleet|guest (shuttle|transit|movement)|ticketing|guest travel)\b.*\b(wedding|event|guest|plan)\b|\b(how do guests get|getting (guests|everyone) to)\b/i,
    "Our Travel & Logistics service manages every movement seamlessly:\n- Efficient fleet coordination and guest shuttles\n- Ticketing and travel booking\n- VIP arrivals and airport transfers\n- Complete guest transit planning so every journey is calm and perfectly timed",
    "Where are your guests travelling from? That helps us suggest the right setup.",
  ],

  // ── Food & Beverage ──────────────────────────────────────────────────────────
  [
    /\b(food|beverage|catering|menu|bar|cuisine|dining|chef|cocktail|drinks|meal)\b.*\b(wedding|event|service|plan)\b|\b(what (food|catering|menu))\b/i,
    "Our Food & Beverage service delivers a complete culinary experience:\n- Bespoke menu design tailored to your vision and guest preferences\n- Chef and catering team coordination\n- World-class bar curation and cocktail programming\n- Dietary and regional cuisine accommodation\n- Live counters and experiential dining setups",
    "Do you have a cuisine preference or specific dietary requirements in mind?",
  ],

  // ── Add-ons ──────────────────────────────────────────────────────────────────
  [
    /\b(add.on|3d (model|visual|render)|sfx|fireworks?|e.?invites?|digital invitation|home decor|wedding website|trousseau|gifting|favou?rs?|honeymoon|marriage registr|visa assist)/i,
    "We offer 10 add-on services:\n- 3-D Models — photorealistic venue visualisation before setup\n- SFX & Fireworks — pyrotechnics and atmospheric effects for grand entries\n- E-Invites — custom digital invitations with RSVP tracking\n- Home Decor — floral and lighting for residential pre-wedding functions\n- Wedding Website — guest hub with RSVPs, gallery, and travel itineraries\n- Trousseau Shopping — designer previews and bridal wardrobe styling\n- Gifting & Favours — custom hampers and artisanal welcome gifts\n- Honeymoon Planning — tailored luxury itineraries globally\n- Marriage Registration — paperwork, slot booking, and registry guidance\n- Visa Assistance — guest visa processing and embassy appointment support",
    "Which of these interests you?",
  ],

  // ── Decor / design ──────────────────────────────────────────────────────────
  [
    /\b(decor|decoration|design service|floral service|mandap|lighting service|decor package|about decor|decor option)\b/i,
    "Our Design & Decor team builds immersive environments from scratch:\n- Bespoke conceptualising & moodboards\n- Immersive floral artistry\n- Custom scenography & production\n- Strategic lighting & soundscaping\n- Fine table styling & finer details\n\nEvery environment is crafted to reflect your unique story.",
    "Happy to discuss a theme or share moodboards — what style are you drawn to?",
  ],

  // ── Photography / film ──────────────────────────────────────────────────────
  [
    /\b(photos?|photographs?|photography|film|video|cinemat|camera|capture|reel|memories)\b/i,
    "Our Film & Photography service pairs you with India's finest wedding photographers and cinematographers:\n- Editorial & cinematic photographer matchmaking\n- Creative briefing & art direction\n- Comprehensive shot listing & logistics\n- BTS & real-time content creation\n- Post-production & archive management",
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
