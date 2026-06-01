"""
RAG retrieval skeleton — SAFE COPY for the Vows & Vedas wedding chatbot.

SOURCE  : MCI-GeTS-Chatbot/rag_api/services/retrieval.py   (GeTS travel chatbot)
SAFE    : no secrets. The vector DB handle is built by utils/vector_db.get_vector_db(),
          which reads Azure AI Search endpoint/key from env-backed settings.
DEPENDS : utils/vector_db.py (get_vector_db), models/schemas.py (IntentExtraction),
          config.py (settings: BAD_PATTERNS, LEAD_CAPTURE_PATTERNS).

═══════════════════════════════════════════════════════════════════════════════
 HOW TO REUSE THIS FOR THE WEDDING BOT   (notes for the next Claude agent)
═══════════════════════════════════════════════════════════════════════════════
 This is the RAG pattern, and the *shape* is exactly what the wedding bot needs:

     similarity_search(k)  ->  metadata filter + score-adjust  ->  title-dedupe
     ->  re-rank  ->  cap

 Keep that pipeline. The wedding changes are all about WHAT the metadata means:

   - get_vector_db()        : point at the WEDDING Azure AI Search index (venues,
                              services, FAQ, destination guides) — a NEW index,
                              separate from the travel one. Same SDK wrapper.
   - filter_by_metadata()   : re-field the scoring keys —
                                meta['destination']   -> meta['city'] / meta['venue']
                                meta['package_name']  -> meta['venue_name'] / service
                                intent_data.selected_package -> selected_venue
   - _CHIP_QUERY_EXPANSION  : replace the travel chips with wedding ones, e.g.
                                "beach wedding" -> "beach destination wedding venues Goa
                                 Kerala resorts sea-facing lawns"
                                "royal wedding" -> "palace heritage wedding venues Udaipur
                                 Jaipur Jodhpur forts"
   - "Golden Triangle" penalty (Step D) : DELETE — it's a travel-route quirk with
                              no wedding analogue.
   - BAD_PATTERNS / LEAD_CAPTURE_PATTERNS (from config) : keep the mechanism; review
                              the patterns for wedding phrasing.

 NOTE on the embedding model: keep text-embedding-3-small (same as GeTS). The
 wedding index must be embedded with the SAME model used at query time.
═══════════════════════════════════════════════════════════════════════════════
"""
from utils.vector_db import get_vector_db
from models.schemas import IntentExtraction
from typing import List, Dict, Any
from config import settings
import logging
import re

logger = logging.getLogger(__name__)

_db = None


def _normalize_search_text(text: str) -> str:
    """Strip emojis/symbol noise so chip labels map cleanly to indexed terms.
    REUSE as-is — domain-agnostic."""
    cleaned = re.sub(r"[^\w\s,\-]", " ", text or "", flags=re.UNICODE)
    return re.sub(r"\s+", " ", cleaned).strip()


# Chip-label → expanded retrieval query. Bare chip labels ("Family trip" / "With
# friends") return too few docs because they lack concrete index overlap; expand them.
# TODO(wedding): replace this entire map with wedding chips (style + city), e.g.
#   "beach wedding", "royal/heritage wedding", "intimate wedding", "grand wedding".
_CHIP_QUERY_EXPANSION = {
    "family trip": "family tour packages India Rajasthan Kerala Goa with kids friendly hotels",
    "romantic trip": "romantic honeymoon tour packages India Kerala Rajasthan Goa luxury heritage",
    "with friends": "friends group tour packages India Rajasthan Goa Kerala adventure culture",
    "solo trip": "solo travel tour packages India Rajasthan Kerala safe single traveller",
    "group tour": "group tour packages India Rajasthan Kerala Goa multi-city heritage",
    "not sure": "popular tour packages India Golden Triangle Kerala Rajasthan first-time visitors",
}


def _expand_chip_query(text: str) -> str:
    """If the normalized text exactly matches a known chip label, return the expanded
    retrieval query that has stronger keyword overlap with the index. REUSE as-is."""
    if not text:
        return text
    key = text.strip().lower()
    return _CHIP_QUERY_EXPANSION.get(key, text)


def _get_db():
    global _db
    if _db is None:
        try:
            _db = get_vector_db()
        except Exception as e:
            logger.error(f"❌ [RETRIEVAL] Vector DB init failed: {e}")
    return _db


def filter_by_metadata(items: List[Any], intent_data: IntentExtraction) -> List[Any]:
    """Filters and dynamically adjusts scores based on extracted intents and metadata.

    REUSE the structure. TODO(wedding): re-field the metadata keys (destination->city,
    package_name->venue_name) and adjust the boost weights to taste."""
    filtered = []
    for item in items:
        # Handle both Langchain Document objects and raw dictionaries
        is_doc = hasattr(item, 'metadata')
        meta = item.metadata if is_doc else item
        page_content = item.page_content if is_doc else item.get('text', '')

        if 'score' not in meta:
            meta['score'] = 0.1

        # 1. Destination Match/Mismatch Scoring
        # TODO(wedding): destination -> city/venue. Same intersection logic applies.
        if intent_data.destination:
            raw_dest = meta.get('destination', [])
            if isinstance(raw_dest, str):
                doc_dests = set(d.strip().lower() for d in raw_dest.split(','))
            else:
                doc_dests = set(str(d).lower() for d in raw_dest)

            query_dests = set(d.lower() for d in intent_data.destination)

            def normalize_set(s):
                res = set()
                for i in s:
                    n = str(i).replace(" india", "").replace("india ", "").strip()
                    res.add(n)
                return res

            normalized_query = normalize_set(query_dests)
            normalized_doc = normalize_set(doc_dests)

            if normalized_query.intersection(normalized_doc):
                meta['score'] *= 2.5
                meta['confidence'] = 'high'
            elif doc_dests:
                meta['score'] *= 0.6

        # 2. Generic Phrase Penalty  (REUSE — patterns come from config.BAD_PATTERNS)
        answer_text = str(meta.get('answer', '') or page_content or '').lower()
        for pattern in settings.BAD_PATTERNS:
            if re.search(pattern, answer_text):
                meta['score'] *= 0.4
                break

        # 3. Selected Package Boost
        # TODO(wedding): selected_package -> selected_venue; package_name -> venue_name.
        if intent_data.selected_package:
            pkg_target = str(intent_data.selected_package).lower()
            doc_pkg = str(meta.get('package_name', '')).lower()
            if pkg_target in doc_pkg or doc_pkg in pkg_target:
                meta['score'] *= 4.0
                meta['confidence'] = 'high'

        # 4. Hard Filter  (REUSE — drops lead-capture-y junk docs)
        hard_bad_patterns = settings.LEAD_CAPTURE_PATTERNS
        is_hard_rejected = False
        for pattern in hard_bad_patterns:
            if re.search(pattern, answer_text):
                is_hard_rejected = True
                break

        if not is_hard_rejected:
            filtered.append(item)

    return filtered


def retrieve_context(query: str, intent_data: IntentExtraction = None) -> List[Dict[str, Any]]:
    """Retrieves context using semantic search and applies business-logic filters.
    REUSE the whole flow; only the metadata semantics change (see header)."""
    db = _get_db()
    if db is None:
        logger.warning("⚠️ [RETRIEVAL] Vector DB unavailable — returning empty results")
        return []

    # Step A: Use Rewritten Query if available for accuracy, else fallback to raw query
    search_string = query
    if intent_data and intent_data.rewritten_query:
        search_string = intent_data.rewritten_query
    search_string = _normalize_search_text(search_string)
    _expanded = _expand_chip_query(search_string)
    if _expanded != search_string:
        logger.info(f"🔍 [RETRIEVAL] Chip-label expanded: \"{search_string}\" -> \"{_expanded}\"")
        search_string = _expanded

    logger.info(f"🔍 [RETRIEVAL] Querying Vector DB with: \"{search_string}\"")

    # Step B: Increase retrieval depth.
    # TODO(wedding): 'itinerary' intent -> your high-resolution intent (e.g. 'venue_detail').
    target_k = 50 if intent_data and intent_data.intent == 'itinerary' else 30
    raw_results = db.similarity_search(search_string, k=target_k)

    # Step C: Filter and score-adjust only if intent_data is provided
    if intent_data:
        adjusted_results = filter_by_metadata(raw_results, intent_data)

        # Step D: Title-based Deduplication & Re-ranking (diversity in suggestions)
        unique_results = []
        seen_titles = set()

        def get_score(x):
            meta = x.metadata if hasattr(x, 'metadata') else x
            return meta.get('score', 0)

        temp_sorted = sorted(adjusted_results, key=get_score, reverse=True)

        for item in temp_sorted:
            meta = item.metadata if hasattr(item, 'metadata') else item
            title = (meta.get('package_name') or meta.get('title') or '').strip().lower()

            if title and title in seen_titles:
                continue

            # TODO(wedding): DELETE this Golden-Triangle penalty — travel-only quirk.
            if intent_data.intent == 'itinerary' and intent_data.destination:
                if len(intent_data.destination) == 1:
                    primary_dest = intent_data.destination[0].lower()
                    if 'golden triangle' in title and primary_dest not in title:
                        meta['score'] *= 0.7

            unique_results.append(item)
            if title:
                seen_titles.add(title)

        sorted_results = sorted(unique_results, key=get_score, reverse=True)

        final_cap = 25 if intent_data.selected_package else 12
        return sorted_results[:final_cap]

    return raw_results[:12]
