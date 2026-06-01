"""
Pydantic API contracts — SAFE COPY for the Vows & Vedas wedding chatbot.

SOURCE  : MCI-GeTS-Chatbot/rag_api/models/schemas.py   (GeTS travel chatbot)
SAFE    : no secrets — pure data shapes.
DEPENDS : nothing (stdlib + pydantic).

═══════════════════════════════════════════════════════════════════════════════
 HOW TO REUSE THIS FOR THE WEDDING BOT   (notes for the next Claude agent)
═══════════════════════════════════════════════════════════════════════════════
 These are the request/response contracts for the entire chatbot API. They are
 ~90% domain-agnostic: the lead funnel (LeadCapture), feedback (FeedbackRequest),
 telemetry (EventRequest), and the chat envelope (ChatRequest/ChatResponse) are
 identical for ANY lead-gen bot — keep them as-is.

 Only the *intent fields* are travel-specific. Re-map them to wedding concepts:

     TRAVEL field          ->  WEDDING field
     ---------------------------------------------------------------
     destinations[]        ->  cities[]  (Udaipur, Jaipur, Goa…)  + venue_type
     duration              ->  (drop)
     travel_date           ->  wedding_date
     group_size            ->  guest_count
     theme                 ->  wedding_style (traditional / contemporary / boho…)
     budget                ->  budget_tier  (₹8-15L / 15-30L / 30-60L / 60L+)
     packages_viewed[]     ->  venues_viewed[] (and/or package-tier names)
     selected_package      ->  selected_venue / selected_package
     (new)                 ->  function_type (mehndi / haldi / sangeet / reception)
     (new)                 ->  services_needed[] (planning / decor / catering / film…)

 Keep intent_level, stage, user_language, key_questions, user_profile, currency,
 contact_phone exactly as they are — they're reused unchanged.
═══════════════════════════════════════════════════════════════════════════════
"""
from pydantic import BaseModel
from typing import List, Optional, Dict, Any


class AccumulatedIntentPayload(BaseModel):
    # TODO(wedding): re-map the travel fields below per the header mapping table.
    destinations: Optional[List[str]] = []       # TODO(wedding): -> cities[] + venue_type
    duration: Optional[str] = None                # TODO(wedding): drop
    budget: Optional[str] = None                  # TODO(wedding): -> budget_tier
    travel_date: Optional[str] = None             # TODO(wedding): -> wedding_date
    theme: Optional[str] = None                   # TODO(wedding): -> wedding_style
    group_size: Optional[str] = None              # TODO(wedding): -> guest_count
    packages_viewed: Optional[List[str]] = []     # TODO(wedding): -> venues_viewed[]
    reviews_shown: Optional[List[str]] = []       # REUSE: testimonial/proof quotes already shown
    intent_level: Optional[str] = "low"           # REUSE as-is: low | medium | high
    key_questions: Optional[List[str]] = []       # REUSE as-is: topics the user asked about
    user_language: Optional[str] = "English"      # REUSE as-is: persisted across turns
    user_profile: Optional[Dict[str, int]] = {    # REUSE pattern (rename scores if useful)
        "luxury_score": 0,
        "budget_score": 0,
        "exploration_score": 0,
    }


class ChatRequest(BaseModel):
    # REUSE as-is — this envelope is fully domain-agnostic.
    query: str
    user_context: Optional[Dict[str, Any]] = None
    conversation_history: Optional[List[Dict[str, str]]] = []
    card_shown: bool = False
    accumulated_intent: Optional[AccumulatedIntentPayload] = None
    lead_captured: bool = False
    # ── Logging metadata (populated by frontend) ──────────────────────────────
    session_id: Optional[str] = None
    is_quick_reply: bool = False
    quick_replies_shown: Optional[List[str]] = []
    source_url: Optional[str] = None              # landing-page URL + UTM (first turn only)
    is_iframe: bool = False


class IntentExtraction(BaseModel):
    # TODO(wedding): re-field for wedding intents (see header). The structure /
    # extra fields (intent enum, stage, intent_level, user_language) are reused.
    destination: Optional[List[str]] = []         # TODO(wedding): -> cities[] / venue_type
    budget: Optional[str] = None                  # TODO(wedding): -> budget_tier
    duration: Optional[str] = None                # TODO(wedding): drop
    travel_date: Optional[str] = None             # TODO(wedding): -> wedding_date
    intent: str = "general"                       # REUSE pattern: pricing|booking|itinerary|general
                                                  # TODO(wedding): e.g. quote|enquiry|venue_info|general
    selected_package: Optional[str] = None        # TODO(wedding): -> selected_venue
    rewritten_query: str = ""                     # REUSE: dense search string for the vector DB
    theme: Optional[str] = None                   # TODO(wedding): -> wedding_style
    group_size: Optional[str] = None              # TODO(wedding): -> guest_count
    stage: str = "discovery"                      # REUSE as-is: discovery|value|conversion|handoff
    intent_level: str = "low"                     # REUSE as-is
    packages_viewed: List[str] = []               # TODO(wedding): -> venues_viewed
    reviews_shown: List[str] = []                 # REUSE
    user_profile: Optional[Dict[str, int]] = {
        "luxury_score": 0,
        "budget_score": 0,
        "exploration_score": 0,
    }
    currency: str = "INR"                         # REUSE as-is
    contact_phone: str = ""                        # REUSE as-is
    user_language: str = "English"                # REUSE as-is


class SourceDocument(BaseModel):
    # REUSE as-is — generic RAG source wrapper.
    content: str
    metadata: Dict[str, Any]
    score: float


class ChatResponse(BaseModel):
    # REUSE as-is.
    answer: str
    sources: List[SourceDocument]
    confidence: str
    metadata: IntentExtraction


class FeedbackRequest(BaseModel):
    # REUSE as-is — thumbs up/down telemetry is domain-agnostic.
    message_id: str
    session_id: str
    feedback: str                                 # "up" or "down"
    message_text: Optional[str] = ""
    turn_number: Optional[int] = None
    stage: Optional[str] = None
    has_card: Optional[bool] = False


class LeadCapture(BaseModel):
    # REUSE almost entirely — this is the lead handoff to the sales team.
    # Only the structured intent fields (destination/duration/group_size/theme/budget)
    # need the same wedding re-mapping as above.
    name: str
    contact: str
    conversation_summary: Optional[str] = None
    conversation_history: Optional[List[Dict[str, Any]]] = None
    intent_level: Optional[str] = None
    packages_viewed: Optional[List[str]] = []     # TODO(wedding): -> venues_viewed
    key_questions: Optional[List[str]] = []
    destination: Optional[List[str]] = []         # TODO(wedding): -> cities[] / venue
    duration: Optional[str] = None                # TODO(wedding): -> (drop) / add wedding_date
    group_size: Optional[str] = None              # TODO(wedding): -> guest_count
    theme: Optional[str] = None                   # TODO(wedding): -> wedding_style
    budget: Optional[str] = None                  # TODO(wedding): -> budget_tier
    language: Optional[str] = None                # REUSE: routes the lead to the right-language team
    session_id: Optional[str] = None


class EventRequest(BaseModel):
    """Lightweight funnel event — posted by the frontend for key user actions.

    REUSE as-is. Just rename the event values to the wedding funnel, e.g.:
      widget_open | venue_card_view | enquiry_form_open | lead_submit
    """
    session_id: str
    event_name: str
    payload: Optional[Dict[str, Any]] = {}
