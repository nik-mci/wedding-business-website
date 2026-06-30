/**
 * Static FAQ bypass — deterministic answers for high-frequency questions.
 * All multi-item answers use markdown "-" bullets so BotMessage renders them as lists.
 * Called before the LLM — no formatting rules from the system prompt apply here.
 */

const FAQ_TABLE = [

  // ── All venues / venue listing ───────────────────────────────────────────────
  [
    /\b(all venues?|list.{0,15}venues?|what.{0,20}venues?.{0,20}(have|offer|got|available)|show.{0,15}venues?|venues?.{0,20}(list|all|available|have|offer)|which venues?|every venue|what properties|all properties)\b/i,
    "Here's an overview of the venues we feature across our destinations:\n\n**Goa** — ITC Grand Goa, St. Regis Goa, Grand Hyatt Goa, Taj Exotica Goa, Taj Cidade de Goa, Caravela Beach Resort\n\n**Rajasthan** — Leela Palace Jaipur, Hyatt Regency Jaipur, Fairmont Jaipur, Alila Fort Bishangarh, Samode Palace, Raffles Udaipur, Ajit Bhawan Jodhpur, Six Senses Fort Barwara, Suryagarh Jaisalmer, ITC Grand Bharat\n\n**Kerala** — Taj Green Cove Kovalam, The Leela Kovalam\n\n**Hill Stations** — Westin Himalayas Rishikesh, Taj Corbett, Hyatt Regency Dehradun, Lalit Grand Palace Srinagar\n\n**Delhi** — Leela Palace Delhi, ITC Maurya, Fairmont Sahar\n\n**Mumbai** — Taj Lands End, Grand Hyatt BKC\n\n**Bangalore** — ITC Gardenia, Taj West End, Prestige Golfshire, Kings Meadow, Angsana Oasis\n\nBeyond these, we plan weddings at any destination worldwide — just tell us where you have in mind and we'll curate the right options.",
    "Which destination or style interests you most?",
  ],

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
    /\b(how long|timeline|process|onboarding|how does it work|what happens after|next step|signing|contract)\b.*\b(enquir|start(ed|ing)?|begin|sign|book|work with)\b|\b(enquir|start|begin|get started)\b.*\b(how long|timeline|process)\b|\bhow long.{0,30}(get started|to start|to begin|take to start|to work)\b/i,
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

  // ── Planning packages / tiers ───────────────────────────────────────────────
  [
    /\b(discover|explore|tell me about|what are|show me|about|explain).{0,20}\b(planning packages?|packages?|planning tiers?|service tiers?|planning options?)\b|\b(planning packages?|packages? (you offer|available|do you have)|what packages)\b/i,
    "We offer three planning tiers:\n\n**Full Planning — ₹3–8 Lacs**\nComplete end-to-end planning from scratch — venue sourcing, all vendor negotiations, contract management, design conceptualisation, guest management, site visits, and post-wedding settlements. Best for couples starting fresh.\n\n**Destination / Luxury Planning — ₹8–15 Lacs**\nSame full-service scope, elevated for large-scale destination weddings — higher staff-to-guest ratio, more intensive on-ground presence, and elevated detailing.\n\n**Partial Planning**\nYou've already secured a venue or some vendors — we step in, fill the gaps, and take full ownership of coordination and execution. Fee depends on scope.\n\nAll planning fees are separate from venue, catering, decor, and vendor costs.",
    "Which tier sounds closest to what you need?",
  ],

  // ── Partial / venue-only planning ───────────────────────────────────────────
  [
    /\b(partial planning|partial (service|package)|venue.only|venue only|coordination only|day.of coordination|already (booked|have) (a )?venue|have a venue|booked venue|just coordination|just (need|want) (coordination|coordinator|execution|on.ground))\b|\bhow does partial\b/i,
    "Partial planning is for couples who have already secured a venue or booked some vendors and need Vows & Vedas to step in, fill the gaps, and take ownership of execution:\n- We audit what's already in place and identify what's missing\n- Source and negotiate any remaining vendors\n- Manage all contracts and coordination going forward\n- Handle complete on-ground execution across every function\n- Ensure the vision stays consistent even when you've mixed vendors\n\nIt's ideal if you've done some groundwork but want a professional team to bring it all together flawlessly.",
    "The fee for partial planning depends on how much is already in place and what we need to take over. I'd love to connect you with our planning team for a precise scope — shall I arrange that?",
  ],

  // ── Full planning vs partial comparison ─────────────────────────────────────
  [
    /\b(difference|compare|vs\.?|versus|which (is|should|do)|what('s| is) (better|right|best)|full (vs|or) partial|partial (vs|or) full)\b.{0,40}\b(planning|service|package)\b|\bfull.?service (vs|or) partial\b/i,
    "Here's how our planning tiers work:\n\n**Full Planning (₹3–8 Lacs)** — We handle everything from scratch: venue sourcing, all vendor negotiations, contract management, design, guest management, site visits, and post-wedding settlements. Best if you're starting fresh.\n\n**Destination / Luxury Planning (₹8–15 Lacs)** — Same full-service scope, elevated for large-scale destination weddings with a higher staff-to-guest ratio and more intensive on-ground presence.\n\n**Partial Planning** — You've already booked a venue or some vendors; we step in, fill the gaps, coordinate everything, and take complete ownership of execution. Fee depends on scope.\n\n**Venue-Only Sourcing** — If you just need us to find and secure the right venue, we can do that too.",
    "Which tier feels closest to what you need? I can connect you with the planning team to confirm the right fit.",
  ],

  // ── What's included in planning ──────────────────────────────────────────────
  [
    /\b(what.?s included|what (is|does).{0,20}include|what.*planning (cover|include|involve)|planning.*inclusions?|planning.*package.*include)\b/i,
    "Our planning service covers:\n- Venue sourcing and selection\n- All vendor negotiations\n- Contract management\n- Detailed design conceptualisation\n- Guest management support\n- Multiple planning meetings\n- Site visits\n- Post-wedding vendor settlements\n\nFor Luxury / Destination Planning, the inclusions stay the same — what changes is the scale of execution, level of personalisation, and the staff-to-guest ratio.",
    "I'd love to connect you with our planning team to walk you through this in detail — would you like to schedule a quick call?",
  ],

  // ── Individual moodboard by name — MUST come before general moodboard entry ──
  [
    /\bhaveli nights?\b/i,
    "Haveli Nights is a Wedding moodboard drawing inspiration from the romance and grandeur of old Indian havelis. Rich drapery, glowing lanterns, intricate arches, regal florals, and warm candlelight — the palette blends deep jewel tones, antique golds, and earthy neutrals. Intimate, opulent, and timeless. Perfect for evening receptions in palace courtyards, heritage venues, or candlelit fort settings.\n[MOODBOARDS_LINK]",
    "Want to see Rajasthan venues that complement this mood?",
  ],
  [
    /\broyal indian\b/i,
    "Royal Indian is a Wedding moodboard celebrating India's regal heritage — majestic architecture, ornate detailing, luxurious fabrics, and statement décor. Inspired by palace soirées and royal courts, deep reds, warm golds, glowing ambers, and jewel tones create an atmosphere that feels grand, immersive, and unapologetically luxurious. Ideal for large receptions at historic palaces.\n[MOODBOARDS_LINK]",
    "Want to see palace venues that complement this look?",
  ],
  [
    /\bemerald eden\b/i,
    "Emerald Eden is a Wedding moodboard rooted in deep greens and quiet moss — a celebration that feels grown, not made. Organic, intimate, and deeply connected to nature. Deep teal, forest green, sage, mint, and champagne make it perfect for small groups, eco-conscious couples, and hill station weddings.\n[MOODBOARDS_LINK]",
    "Want to see hill station venues that suit this theme?",
  ],
  [
    /\bpainted gardens?\b/i,
    "Painted Gardens is a Wedding moodboard — a breathtaking immersion into a pastel wonderland. Vivid floral artistry, delicate pastel fabrics, and the timeless romance of an enchanted garden setting. Blush pink, leaf green, pale yellow, light pink, and dark olive — perfect for daytime weddings and garden venues.\n[MOODBOARDS_LINK]",
    "Want to see outdoor venues that complement this theme?",
  ],
  [
    /\bcitrus bloom\b/i,
    "Citrus Bloom is a Haldi moodboard — a vibrant fusion of citrus tones and sunshine yellows. Fresh marigolds, zesty accents, and warm joyful energy. The palette is orange, olive green, coral, golden yellow, and cream. Perfect for outdoor daytime Haldi celebrations, vibrant themes, and tropical settings.\n[MOODBOARDS_LINK]",
    "Want to explore the other Haldi moodboards — Royal Boho or Rangon Ki Rasleela?",
  ],
  [
    /\broyal boho\b/i,
    "Royal Boho is a Haldi moodboard — a free-spirited blend of regal textures and bohemian charm. Terracotta accents, macramé details, and a relaxed yet opulent atmosphere. Amber, sage, terracotta, sand, and dark brown — ideal for outdoor sunset Haldi ceremonies and intimate gatherings.\n[MOODBOARDS_LINK]",
    "Want to explore Citrus Bloom or Rangon Ki Rasleela — the other Haldi moodboards?",
  ],
  [
    /\brangon ki rasleela\b/i,
    "Rangon Ki Rasleela is a Haldi moodboard — vibrant, playful, and full of energy. Inspired by gulal, marigolds, sunshine hues, and festive Indian textures. Gulal red, marigold yellow, turmeric, coral, and bright pink create an atmosphere that is festive, youthful, and deeply celebratory.\n[MOODBOARDS_LINK]",
    "Want to explore Citrus Bloom or Royal Boho — the other Haldi moodboards?",
  ],
  [
    /\btangerine tales\b/i,
    "Tangerine Tales is a Mehendi moodboard — a zesty celebration of colour and tradition. Tangerine hues meet lush greens, creating a spirited and sun-drenched experience. Tangerine, orange, golden, olive, and salmon — perfect for daytime celebrations, vibrant outdoors, and poolside parties.\n[MOODBOARDS_LINK]",
    "Want to explore Tropical Rhapsody — the other Mehendi moodboard?",
  ],
  [
    /\btropical rhapsody\b/i,
    "Tropical Rhapsody is a Mehendi moodboard — a lush, exotic escape filled with vibrant tropical blooms and emerald greens. Emerald green, yellow, coral orange, hot pink, and teal work beautifully for beachside venues, summer celebrations, and lush garden settings.\n[MOODBOARDS_LINK]",
    "Want to explore Tangerine Tales — the other Mehendi moodboard?",
  ],
  [
    /\bdisco shimmer\b/i,
    "Disco Shimmer is a Sangeet moodboard — glittering mirrors, pulsing lights, and an energy that doesn't quit. Designed for the dance floor. Black, silver, indigo, amber, and white create a high-energy atmosphere perfect for large parties, indoor ballrooms, and cocktail nights.\n[MOODBOARDS_LINK]",
    "Want to explore Crimson Soiree — the other Sangeet moodboard?",
  ],
  [
    /\bcrimson soirée?|\bcrimson soiree\b/i,
    "Crimson Soiree is a Sangeet moodboard — a seductive fusion of Parisian cabaret and Indian tradition. Crimson velvets, dramatic feathers, and a Moulin Rouge-inspired glamour. Crimson, dark maroon, gold, rose gold, and black — perfect for themed Sangeets, bold personalities, and nighttime glamour.\n[MOODBOARDS_LINK]",
    "Want to explore Disco Shimmer — the other Sangeet moodboard?",
  ],

  // ── Function-specific moodboards (before general entry) ──────────────────────
  [
    /\bhaldi.{0,30}(moodboards?|themes?|looks?|moods?|styles?|options?|ideas?)|\b(moodboards?|themes?|looks?|moods?|styles?|options?|ideas?).{0,30}haldi/i,
    "We have three moodboards for the Haldi ceremony:\n- Citrus Bloom — citrus tones, marigolds, sunshine yellows, joyful daytime energy\n- Royal Boho — terracotta accents, macramé details, relaxed bohemian luxe\n- Rangon Ki Rasleela — vibrant gulal colours, marigolds, festive and playful\n[MOODBOARDS_LINK]",
    "Which of these feels right for your Haldi?",
  ],
  [
    /\b(mehndi|mehendi).{0,30}(moodboards?|themes?|looks?|moods?|styles?|options?|ideas?)|\b(moodboards?|themes?|looks?|moods?|styles?|options?|ideas?).{0,30}(mehndi|mehendi)/i,
    "We have two moodboards for the Mehendi ceremony:\n- Tangerine Tales — tangerine hues, lush greens, sun-drenched and bohemian\n- Tropical Rhapsody — vibrant tropical blooms, emerald greens, exotic and colourful\n[MOODBOARDS_LINK]",
    "Which of these feels right for your Mehendi?",
  ],
  [
    /\bsangeet.{0,30}(moodboards?|themes?|looks?|moods?|styles?|options?|ideas?)|\b(moodboards?|themes?|looks?|moods?|styles?|options?|ideas?).{0,30}sangeet/i,
    "We have two moodboards for the Sangeet:\n- Disco Shimmer — glittering mirrors, pulsing lights, built for the dance floor\n- Crimson Soiree — Moulin Rouge-inspired drama, crimson velvets, nighttime glamour\n[MOODBOARDS_LINK]",
    "Which of these suits your Sangeet vibe?",
  ],
  [
    /\b(wedding ceremony|reception).{0,30}(moodboards?|themes?|looks?|moods?|styles?|options?|ideas?)|\b(moodboards?|themes?|looks?|moods?|styles?|options?|ideas?).{0,30}(wedding ceremony|reception)/i,
    "We have four moodboards for the Wedding ceremony:\n- Royal Indian — palatial grandeur, maroon and gold, made for heritage venues\n- Haveli Nights — candlelit haveli romance, jewel tones, glowing lanterns\n- Painted Gardens — pastel floral canopies, daytime garden ceremony\n- Emerald Eden — deep greens, organic and intimate, perfect for hill stations\n[MOODBOARDS_LINK]",
    "Which of these speaks to your wedding vision?",
  ],

  // ── General moodboards (all functions) ───────────────────────────────────────
  [
    /moodboard|mood board|wedding themes?|what themes|decor themes?|decor style|wedding style|what (styles?|look)|theme option/i,
    "We have curated moodboards across all wedding functions:\n\nHaldi:\n- Citrus Bloom — citrus tones, marigolds, joyful daytime energy\n- Royal Boho — terracotta, macramé, relaxed bohemian luxe\n- Rangon Ki Rasleela — vibrant gulal colors, festive and playful\n\nMehendi:\n- Tangerine Tales — tangerine hues, lush greens, sun-drenched\n- Tropical Rhapsody — tropical blooms, exotic and colorful\n\nSangeet:\n- Disco Shimmer — glittering mirrors, dance floor energy, indoor ballrooms\n- Crimson Soiree — Moulin Rouge-inspired, crimson velvets, nighttime glamour\n\nWedding:\n- Royal Indian — palatial grandeur, maroon and gold, heritage venues\n- Painted Gardens — pastel floral canopies, daytime garden ceremony\n- Haveli Nights — candlelit haveli romance, jewel tones, evening receptions\n- Emerald Eden — deep greens, organic and intimate, perfect for hill stations\n[MOODBOARDS_LINK]",
    "",
  ],

  // ── Itinerary / wedding flow ─────────────────────────────────────────────────
  [
    /\b(sample|show me|what does|walk me|take me|give me|show the|tell me about|describe|what.s).{0,30}(itinerary|wedding (flow|look|day|plan|schedule)|how.*wedding.*structured|functions?)\b|plan a (goa|rajasthan|kerala|beach|palace|hill)|big fat indian wedding|exotic beachside|celestial kerala/i,
    "Our standard wedding structure is the 2-Day, 4-Function Flow — a proven blueprint designed to build anticipation, honour tradition, and culminate in a breathtaking ceremony:\n\nFunction 1 — Day 1 · Afternoon\nWelcome Lunch & Vibrant Mehendi\nHenna artistry, live music, and an atmosphere of joyful anticipation.\n\nFunction 2 — Day 1 · Evening\nHigh-Energy Sangeet & Afterparty\nChoreographed performances, live artists, and a celebratory afterparty.\n\nFunction 3 — Day 2 · Morning\nIntimate Haldi & Choorah Ceremony\nTurmeric blessings, family traditions, and quiet moments of connection.\n\nFunction 4 — Day 2 · Sunset\nMain Pheras & Formal Reception\nSacred vows, followed by a world-class reception dinner.\n\nEvery detail is flexible — this is your starting point, not your script.",
    "Which function would you like to explore further, or shall I show you venues?",
  ],

  // ── Customise itinerary ───────────────────────────────────────────────────────
  [
    /\b(customis|customiz|tailor|personalise|personalize|modify|change|adjust|flexible|adapt).{0,20}(itinerary|plan|package|wedding|function)\b/i,
    "Absolutely — the 2-Day 4-Function Flow is a starting point, not a fixed script. We can adjust the sequence of functions, add ceremonies, change the timing, expand to 3 days, or restructure entirely around your vision.\n\nTell me what feels most important to you and we'll shape it from there.",
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

  // ── Something different / unconventional ─────────────────────────────────────
  [
    /\b(something (different|unique|unconventional|unusual|non.?traditional|out of the (ordinary|box))|want.{0,15}different|not (traditional|typical|conventional|standard)|break.{0,10}(mould|mold|convention|tradition)|unusual wedding|unique wedding|different kind)\b/i,
    "We love couples who want to break the mould. \"Different\" can mean a lot of things — a sand ceremony in Goa with no traditional rituals, an intimate elopement in the Himalayas for 20 people, a fusion Hindu-Christian ceremony, or a destination wedding in Europe.\n\nWhat does \"different\" look like in your vision?",
    "",
  ],

  // ── What makes V&V different ────────────────────────────────────────────────
  [
    /\b(why (choose|pick|select|use|go with) (you|vows|v&v)|what (makes|sets) you (apart|different|special|unique)|stand out|what.s special about you)\b/i,
    "A few things set us apart:\n- Deep cultural knowledge paired with an international design sensibility\n- Every couple gets a dedicated wedding manager — one person, start to finish\n- Backed by GeTSHolidays — 37+ years of event expertise, 150+ professionals (figures as of our latest update)\n- 300+ weddings crafted across India and abroad",
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
    /\b(entertainment|performers?|celebrity|live (music|performances?|band|act)|sangeet (performances?|show|artists?)|dj|choreograph)\b/i,
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
  // City-specific queries (Udaipur, Jaipur, Jodhpur, Jaisalmer) are intentionally
  // excluded from this pattern — they fall through to the LLM for city-scoped responses.
  [
    /\b(rajasthan|palace|fort|heritage|royal)\b.*\b(wedding|venue|celebrat)/i,
    "Rajasthan is our most sought-after destination for palace and heritage weddings. Our confirmed venues across the region:\n- Jaipur — Leela Palace Jaipur, Hyatt Regency Jaipur, Fairmont Jaipur\n- Near Jaipur — Alila Fort Bishangarh (~45 km), Samode Palace\n- Udaipur — Raffles Udaipur\n- Jodhpur — Ajit Bhawan\n- Jaisalmer — Suryagarh Jaisalmer\n- Ranthambore area — Six Senses Fort Barwara, ITC Grand Bharat",
    "Which city or style interests you most?",
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
    "Kerala is beautiful for intimate destination weddings. Our confirmed venues:\n- Taj Green Cove, Kovalam — Balinese-inspired hillside retreat where backwaters meet the sea\n- The Leela Kovalam — India's only clifftop beach resort with panoramic Arabian Sea views",
    "Which setting appeals to you?",
  ],

  // ── Hills / mountain weddings ───────────────────────────────────────────────
  [
    /\b(hill station|hill wedding|hills? venue|hills? option|mountain wedding|himalaya|rishikesh|dehradun|srinagar|corbett)\b|\b(hill|mountain|nature|forest|jungle)\b.*\b(wedding|venue|celebrat|option|suggest|any|show)/i,
    "Our hill station wedding venues — all confirmed:\n- **Taj Corbett** (Uttarakhand) — Jungle riverside retreat, our most intimate and affordable hill option. Buyout ₹80 Lacs–1 Cr\n- **Lalit Grand Palace, Srinagar** (Kashmir) — 1910 royal palace overlooking Dal Lake. Buyout ₹1.6–2.8 Cr\n- **Hyatt Regency Dehradun** — At the foothills of the Himalayas with valley views. Buyout ₹2.2–3.8 Cr\n- **Westin Himalayas, Rishikesh** — Panoramic Himalayan valley, riverside setting. Buyout ₹2.5–3.5 Cr",
    "Would you like detailed pricing for any of these?",
  ],

  // ── Book / schedule a discovery call ────────────────────────────────────────
  [
    /\b(book|schedule|arrange|set up|fix).{0,20}(discovery call|call|consultation|meeting|appointment)|\bdiscovery call\b/i,
    "To book a discovery call with our planning team, you can:\n- **WhatsApp / Call** — +91 96542 77656\n- **Email** — info@vowsandvedas.com\n- **Enquiry form** — tap 'Speak to a Planner' below\n\nOur team usually responds within 24 hours to schedule a time that works for you.",
    "",
  ],

  // ── Sample itinerary ─────────────────────────────────────────────────────────
  [
    /\b(sample|example|show me|view|see).{0,15}(itinerary|schedule|timeline|day.by.day|wedding flow|wedding programme)|\b(wedding itinerary|itinerary for|what.*itinerary)\b/i,
    "Here's a sample **2-Day, 4-Function** destination wedding flow:\n\n**Day 1**\n- Morning: Haldi ceremony (outdoor, intimate)\n- Afternoon: Mehendi with live music and décor\n- Evening: Sangeet — performances, dance, dinner\n\n**Day 2**\n- Morning: Pre-wedding rituals\n- Afternoon/Evening: Wedding ceremony and grand reception\n\nEach function has its own décor theme, guest experience arc, and F&B programme. For a 3-day or 5-day itinerary, or a single-function event, the structure adapts fully to your preference.",
    "Would you like to explore décor themes for any of these functions?",
  ],

  // ── Budget / cheap / affordable venues ──────────────────────────────────────
  [
    /\b(cheap|budget|affordable|low.cost|economical|inexpensive|value.for.money|pocket.friendly|cost.effective).{0,30}(venue|wedding|option|place|property|resort|hotel)|\b(suggest|show|list|recommend).{0,20}(cheap|budget|affordable|low.cost|economical).{0,20}venue/i,
    "Here are our most budget-friendly venues by region — all with confirmed pricing:\n\n**Rajasthan (Heritage)**\n- Ajit Bhawan, Jodhpur — ₹45–75 Lacs buyout (most affordable palace property)\n- Samode Palace — ₹70 Lacs–1.2 Cr buyout\n\n**Bangalore**\n- Kings Meadow — ₹45–70 Lacs buyout\n- Angsana Oasis — ₹50–85 Lacs buyout\n\n**Hills**\n- Taj Corbett, Uttarakhand — ₹80 Lacs–1 Cr buyout\n\n**Kerala**\n- Taj Green Cove, Kovalam — ₹80 Lacs–1.5 Cr buyout\n\nAll buyout figures are venue-hire only — F&B, decor, and planning fees are separate.",
    "Which destination or setting appeals to you most?",
  ],

  // ── Contact / reach out ─────────────────────────────────────────────────────
  [
    /\b(contact|reach out|speak|call|whatsapp|email|phone|get in touch|talk to|connect with|how (do i|to|can i) (contact|reach|connect|speak|talk|get in touch))\b/i,
    "You can reach the Vows & Vedas team directly:\n- **Email** — info@vowsandvedas.com\n- **WhatsApp / Call** — +91 96542 77656\n- **Enquiry form** — tap 'Speak to a Planner' below or visit our contact page\n\nWe usually respond within 24 hours.",
    "",
  ],

];

// If the query names a specific venue, skip all static FAQs and let the LLM
// handle it — static answers can't do per-venue pricing or city-scoped details.
const VENUE_KEYWORDS = [
  'itc grand goa', 'st. regis', 'st regis', 'grand hyatt goa', 'taj exotica',
  'taj cidade', 'caravela', 'alila', 'samode', 'raffles udaipur',
  'fairmont jaipur', 'fairmont sahar', 'ajit bhawan', 'six senses', 'suryagarh',
  'itc grand bharat', 'westin rishikesh', 'westin himalayas', 'taj corbett',
  'hyatt regency dehradun', 'hyatt regency jaipur', 'lalit grand palace',
  'taj green cove', 'leela kovalam', 'leela palace', 'itc maurya',
  'taj lands end', 'grand hyatt bkc', 'itc gardenia', 'taj west end',
  'prestige golfshire', 'kings meadow', 'angsana oasis',
];

/**
 * Returns a static answer string if the query matches, otherwise null.
 * @param {string} query
 * @param {boolean} leadCaptured
 */
export function matchStaticFaq(query, leadCaptured = false) {
  if (!query || query.trim().length < 4) return null;

  // Venue-specific queries must go to the LLM — static responses can't price or scope correctly
  const lq = query.toLowerCase();
  if (VENUE_KEYWORDS.some(name => lq.includes(name))) return null;

  for (const [pattern, body, handoff] of FAQ_TABLE) {
    if (pattern.test(query)) {
      if (leadCaptured || !handoff) return body;
      return `${body}\n\n${handoff}`;
    }
  }
  return null;
}
