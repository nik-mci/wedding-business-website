# Design patterns to reuse (distilled from GeTS `HANDOFF.md`)

**For:** the next Claude agent. These are the load-bearing patterns behind the GeTS bot's
reliability — language-agnostic, so they apply whether you build the wedding bot in Python or
Node. None of this is travel-specific; it's *how to make an LLM lead-gen bot behave*.

---

## 1. Three layers of control (most important idea)

The GeTS bot doesn't trust the LLM alone. Behaviour is enforced at three escalating layers:

1. **System prompt** — the rules (probabilistic; the LLM mostly follows them).
2. **Force hints** — conditional `[INSTRUCTION OVERRIDE]` blocks injected at the *end* of the
   prompt (max recency weight) for specific scenarios where prompt rules keep losing. They turn
   "usually" into "almost always".
3. **Data-plane filter** — deterministic code that strips/blocks output regardless of what the
   LLM emitted. The guarantee layer.

> **Guiding principle:** *Prompts are probabilistic; code is guaranteed.* When a binary outcome
> must hold no matter what, enforce it in code (layer 3), not by adding more prompt language.

**Wedding takeaway:** start with layer 1. When a rule keeps failing across tests (e.g. the bot
asks for the guest count before showing any venue), add a force hint (layer 2). If something must
*never* happen (e.g. never show a contact form before a venue/proposal is shown), add a
data-plane guard (layer 3).

## 2. The 4-stage conversation state machine

`discovery → value → conversion → handoff`. Stage is detected from conversation history and
gates behaviour (e.g. the contact CTA only fires at `conversion`). **Reuse the machine; rename
nothing.** Wedding stages map cleanly: browsing venues → engaging with a proposal → ready to
talk → lead captured.

## 3. Explicit-consent lead funnel

The form opens **only** on (a) an explicit CTA button click, or (b) a rare imperative phrase from
the bot. Question-form CTAs ("Would you like a proposal on WhatsApp/email?") show as *text* — the
user must click to proceed. This avoids premature/aggressive form pop-ups and is the difference
between a helpful bot and a pushy one. **Reuse exactly.**

## 4. `suppress_cards` — the data-plane guarantee, by example

GeTS needed a hard rule: "after an itinerary is shown, never show a card for a *different*
destination." Four rounds of prompt-only enforcement failed. The fix was a flag that makes the
stream transformer silently drop card fragments when the condition holds — so even if the LLM
emits a card, the user never sees it. **Pattern to copy** whenever you need a binary "this must
never render" guarantee.

## 5. The marker-strip lesson (subtle bug to avoid)

The frontend rewrote `<<<ITINERARY_CARD>>>` blocks in history into annotations like
`[Showed ITINERARY CARD …]` before sending to the backend. Stage detection only looked for the
raw marker → it never saw the card → the bot got stuck in `value` forever. **Lesson:** when the
backend parses data that passed through the frontend, detect *all* shapes a marker can take, or
keep it intact end-to-end. (Carry a `card_shown` boolean as a fallback.)

## 6. "Check the trigger before adding enforcement"

Several GeTS rounds layered force hints + filters that *correctly* implemented a fix but never
fired — because the *trigger condition* was wrong (gated on `card_shown` when the test seed only
set `packages_viewed`). **Lesson:** when a rule "doesn't work", log the trigger evaluation first.
Most "doesn't fire" bugs are trigger-detection bugs, not enforcement bugs.

## 7. Content filter (was: blog filter)

GeTS's DB mixed real packages with SEO blog articles; a 3-layer filter (ranking penalty +
name-cleaner + hard gate) kept blog titles from rendering as cards. **Wedding analogue:** keep
marketing/SEO pages and non-bookable content out of venue/package cards the same way.

---

**Where to read the originals:** `MCI-GeTS-Chatbot/HANDOFF.md` (the full maintainer's handoff,
~15 min read) and the force-hint implementations in `rag_api/services/generation.py`
(`_build_prompt`, `_transform_stream`).
