"""Static FAQ fallbacks — bypass retrieval entirely for high-frequency, low-variance
questions whose answers don't change.

SOURCE  : MCI-GeTS-Chatbot/rag_api/services/static_faqs.py   (GeTS travel chatbot)
SAFE    : no secrets — pure regex + strings.
DEPENDS : nothing (stdlib only).

═══════════════════════════════════════════════════════════════════════════════
 HOW TO REUSE THIS FOR THE WEDDING BOT   (notes for the next Claude agent)
═══════════════════════════════════════════════════════════════════════════════
 THIS IS THE SINGLE EASIEST, HIGHEST-VALUE REUSE.

 The wedding site ALREADY ships 24 hardcoded FAQ pairs (in the wedding repo at
 src/app/faq/page.js — general / planning / destinations / pricing tabs). This
 file is the mechanism that turns those into instant, LLM-free, deterministic
 answers: a regex table that the chat endpoint checks BEFORE calling retrieval
 or the model. On a hit, you yield the answer straight to the stream and return.

 TO PORT:
   1. Delete the travel entries in _FAQ_TABLE below.
   2. For each of the 24 wedding FAQs, add ONE entry:
          (compiled_regex, factual_body, soft_handoff)
      - factual_body : the FAQ answer, always returned.
      - soft_handoff : a *declarative* nudge appended only when lead_captured=False.
                       Keep it declarative ("happy to help you shortlist venues…"),
                       NOT imperative ("fill in the form") — imperatives would trip
                       the frontend's auto-form-open path. Lead capture must stay on
                       the explicit-consent (button-click) flow.
   3. Call it from the chat endpoint exactly like the original:
          answer = match_static_faq(query, lead_captured=request.lead_captured)
          if answer is not None:
              yield f"data: {answer}\\n\\n"
              return

 WEDDING EXAMPLE ENTRY (follow this shape for all 24):
   (
       re.compile(r"\\b(budget|cost|price|how much|pricing)\\b.*\\b(wedding|destination wedding)\\b",
                  re.IGNORECASE | re.DOTALL),
       "Destination weddings with us typically range from ₹8–15L for an intimate "
       "celebration up to ₹60L+ for a multi-day palace event, depending on city, "
       "venue, guest count, and the services you choose.",
       "Happy to map a realistic budget once I know your city and rough guest count.",
   ),
═══════════════════════════════════════════════════════════════════════════════

USAGE (unchanged from source):
    from static_faqs import match_static_faq
    answer = match_static_faq(query, lead_captured=request.lead_captured)
    if answer is not None:
        yield f"data: {answer}\\n\\n"
        return

When lead_captured=True, the FAQ skips the soft handoff line entirely — no contact-
collection language anywhere in the response. Returns the static answer string if the
query matches a known pattern, else None.
"""

import re
from typing import List, Optional, Tuple


# Each entry: (compiled_regex, factual_body, soft_handoff)
# TODO(wedding): replace the travel entries below with the 24 wedding FAQ pairs.
#   The entries kept here are the GeTS originals, left in only as worked examples
#   of the (regex, body, soft-handoff) shape — see the WEDDING EXAMPLE in the
#   docstring above for the wedding version.
_FAQ_TABLE: List[Tuple[re.Pattern[str], str, str]] = [
    # ── Weather / best-time questions (most frequent class) ─────────────────────
    # TODO(wedding): the closest wedding analogue is "best season for an outdoor
    #   <city> wedding" — you can keep weather logic, just reframe the handoff.
    (
        re.compile(r"\b(weather|temperature|climate|best time|peak season|when (to|should i) (go|visit))\b.*\brajasthan\b", re.IGNORECASE | re.DOTALL),
        "Rajasthan in October marks the start of the peak season — pleasant 22-28°C days, "
        "cool nights, low humidity, perfect for forts, palaces, and desert evenings. Peak "
        "window runs October to March; April-June is hot, July-September is monsoon.",
        "October is one of the best months for Rajasthan — let me know if you want to map "
        "out a route for those dates.",
    ),
    (
        re.compile(r"\b(weather|temperature|climate|best time|peak season|when (to|should i) (go|visit))\b.*\bkerala\b", re.IGNORECASE | re.DOTALL),
        "Kerala in October is the end of the monsoon — lush, green, and just opening up "
        "for the peak season (October through March). Days are warm and humid, evenings "
        "comfortable, and the backwaters and tea hills look their best.",
        "October-March is prime Kerala season — happy to suggest a route across backwaters "
        "and the hills if that's the window you're thinking about.",
    ),
    # ── Visa / documentation ────────────────────────────────────────────────────
    # TODO(wedding): DROP visa/currency entries — not relevant to a wedding planner.
    #   Replace with wedding-specific high-frequency FAQs instead, e.g.:
    #     - "do you handle decor / catering / photography?"  (services_needed)
    #     - "how far in advance should we book?"             (planning timeline)
    #     - "can you do a multi-day event (mehndi+sangeet+reception)?"
    (
        re.compile(r"\b(visa|e-?visa|tourist visa|do i need a visa)\b.*\b(india|indian)\b", re.IGNORECASE | re.DOTALL),
        "Most travellers need a tourist visa for India — the e-Visa is the simplest route "
        "for stays up to 30/60/90 days depending on length. Apply through the official "
        "Indian e-Visa portal a few weeks before travel.",
        "If you have travel dates in mind, I can sketch an itinerary that fits the e-Visa "
        "window and the destinations you're after.",
    ),
]


def match_static_faq(query: str, lead_captured: bool = False) -> Optional[str]:
    """Return the static answer if the query matches a known FAQ pattern, else None.

    REUSE THIS FUNCTION AS-IS. It is fully domain-agnostic — all wedding-specific
    content lives in _FAQ_TABLE above.

    When lead_captured=True the soft handoff line is omitted entirely so post-submission
    answers contain no contact-collection or follow-up nudge language.

    Match is case-insensitive and substring-friendly. The caller should bypass
    retrieval + LLM on a hit and yield the answer directly to the SSE stream.
    """
    if not query or len(query.strip()) < 5:
        return None
    for pattern, body, handoff in _FAQ_TABLE:
        if pattern.search(query):
            if lead_captured:
                return body
            return f"{body} {handoff}"
    return None
