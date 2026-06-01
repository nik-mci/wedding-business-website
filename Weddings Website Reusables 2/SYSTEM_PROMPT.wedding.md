# SYSTEM_PROMPT scaffolding — wedding adaptation guide

**SOURCE:** `MCI-GeTS-Chatbot/rag_api/services/generation.py` → `SYSTEM_PROMPT` (starts at line 518).
**For:** the next Claude agent building the Vows & Vedas chatbot prompt.

The GeTS prompt is several hundred lines. Roughly **30–40% is domain-agnostic conversational
scaffolding you should KEEP**, and **~60% is travel content you REWRITE**. Below is the
section-by-section verdict. Lift the `[KEEP]` rules almost verbatim; rebuild the `[REWRITE]`
bodies for weddings.

> The single most valuable thing here is the *behavioural discipline* (one question at a time,
> never seek permission before acting, earn the contact ask). That's what makes the GeTS bot
> feel like a consultant instead of a form. Keep it.

| GeTS section | Verdict | Wedding notes |
|---|---|---|
| Persona ("You are Nik, a warm travel consultant…") | `[REWRITE]` | New persona/name; "warm, knowledgeable wedding concierge for Vows & Vedas". Keep the *tone* (refined, editorial — matches the brand). |
| **ABSOLUTE CONSTRAINTS** (ONE QUESTION ONLY, NO LISTS-IN-QUESTION, **NO PERMISSION-SEEKING**, NO REF IDs) | `[KEEP]` | These are gold and domain-neutral. Keep verbatim — they prevent survey-feel and "Would you like me to…?" hedging. |
| CHECKLIST FOR NIK (re-read before responding) | `[KEEP]` | Rename; keep the self-check structure. |
| PRIME OBJECTIVE ("be the most helpful… earn the contact ask") | `[KEEP]` | Swap "travel advisor" → "wedding planner". |
| BEST-SELLING RECOMMENDATIONS (10 tours) | `[REWRITE]` | → signature venues / package tiers (₹8–15L / 15–30L / 30–60L / 60L+ from the FAQ), or "most-loved palaces / beach resorts". |
| CONVERSATION SEQUENCE (destination → cards → itinerary → timing → group → contact) | `[REWRITE structure]` | Wedding flow: **city/venue interest → show venue or package cards → date & guest count → budget tier → contact**. Keep the "never ask for X before delivering value" principle. |
| COMPOUND / MULTI-REGION REQUESTS | `[DROP]` | Travel-route quirk; no wedding analogue. |
| QUESTION SEQUENCING + QUESTION VARIETY | `[KEEP]` | Rotate curiosity/practical/open question types; never stack two questions. Domain-neutral. |
| TRUST FACTS ("38 years, 200k guests, TripAdvisor…") | `[REWRITE]` | Swap for Vows & Vedas credentials (events delivered, cities covered, signature venues, press). **Do not invent numbers** — keep that guard rule. |
| WHEN TO USE QUOTES / guest quotes | `[REWRITE]` | Use real **wedding testimonials** (the site already has a Testimonials section). Keep the dedupe rule (one quote per guest per chat). |
| PRE-CARD INSIGHT (one specific sentence before cards) | `[KEEP]` | Reframe "route span/pacing" → "venue capacity / setting / multi-event suitability". |
| CONTACT TRIGGERS + **CTA TIMING** (CTA only after a full card shown) | `[KEEP]` | The "no CTA until real value delivered" gate transfers exactly. Replace the spec-CTA string with a wedding one (e.g. *"Would you like a tailored proposal on WhatsApp or email?"*). |
| NUDGE DECAY (don't repeat the CTA; re-nudge with value on msg 3) | `[KEEP]` | Domain-neutral persistence pattern. |
| **DATA PRIVACY — DPDP ACT 2023** (don't accept contact details typed in chat) | `[KEEP verbatim]` | Wedding leads are Indian PII too. Keep the exact behaviour + the privacy line. |
| AGENT UNAVAILABILITY / LIVE AGENT REDIRECT | `[KEEP]` | Reword for the wedding team; logic identical. |
| QUICK REPLIES / FRAGMENT formats / BLOG FILTER | `[REWRITE]` | If you build cards, define your own fragment markers; the blog→content filter pattern still helps keep SEO pages out of cards. |

**Wedding qualifying questions that replace the travel ones** (the only "facts that affect the quote"):
`wedding_date (month/season) → city / venue_type → guest_count → budget_tier → function_type (mehndi/haldi/sangeet/reception)`.

**To actually build it:** open the GeTS `SYSTEM_PROMPT` at `generation.py:518`, copy the `[KEEP]`
sections verbatim, and rewrite the `[REWRITE]` bodies using the mapping above. Pair it with the
force-hint mechanism described in `DESIGN-PATTERNS.md`.
