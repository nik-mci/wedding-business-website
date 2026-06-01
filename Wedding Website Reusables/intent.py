"""
Intent-extraction harness — SAFE COPY for the Vows & Vedas wedding chatbot.

SOURCE  : MCI-GeTS-Chatbot/rag_api/services/intent.py   (GeTS travel chatbot)
SAFE    : no secrets in this file. The Azure client reads its key/endpoint from
          `settings` (which read os.getenv). Copy config.py alongside and supply
          the wedding app's own Azure OpenAI credentials via env / Key Vault.
DEPENDS : models/schemas.py (IntentExtraction), config.py (settings),
          services/ingestion.py (extract_destinations fallback — see TODO below).

═══════════════════════════════════════════════════════════════════════════════
 HOW TO REUSE THIS FOR THE WEDDING BOT   (notes for the next Claude agent)
═══════════════════════════════════════════════════════════════════════════════
 This is the structured-extraction MACHINERY. Keep all of it:
   - async Azure OpenAI client (never blocks the event loop)
   - JSON mode (response_format={"type":"json_object"}) + temperature=0
   - Pydantic validation into IntentExtraction
   - graceful fallback to a neutral intent on failure

 ONLY TWO THINGS CHANGE for weddings:
   1. The `system_prompt` entity list — swap travel entities for wedding ones:
        destination     -> cities[] / venue_type
        duration        -> (drop)
        travel_date     -> wedding_date
        group_size      -> guest_count
        theme           -> wedding_style
        budget          -> budget_tier (₹8-15L / 15-30L / 30-60L / 60L+)
        + add: function_type (mehndi/haldi/sangeet/reception), services_needed[]
      Keep the `rewritten_query` instruction verbatim — it's what powers retrieval.
   2. The deterministic fallback (`extract_destinations`) — point it at a wedding
      city/venue extractor instead of the travel destination list.

 If you port to Node instead of Python: this file is the SPEC. Reproduce the same
 system prompt + JSON-mode call + schema validation with the OpenAI SDK's Azure
 client in TypeScript.
═══════════════════════════════════════════════════════════════════════════════
"""
from openai import AsyncAzureOpenAI
import json
import logging
from config import settings

logger = logging.getLogger(__name__)

# Initialize Azure OpenAI Client (async — never blocks the event loop).
# SAFE: api_key comes from settings (env-backed), never hardcoded.
azure_client = AsyncAzureOpenAI(
    api_key=settings.AZURE_OPENAI_API_KEY,
    api_version=settings.AZURE_OPENAI_API_VERSION,
    azure_endpoint=settings.AZURE_OPENAI_ENDPOINT
) if settings.AZURE_OPENAI_API_KEY else None

from models.schemas import IntentExtraction


async def extract_intent_and_entities(query: str, history: list = None) -> IntentExtraction:
    """Extract structured entities and rebuild a dense vector-optimized search string.

    NOTE: the original docstring said 'Uses Gemini' — that's stale; it runs on
    Azure OpenAI now. (Left here so you don't trust the comment over the code.)
    """

    # Format history for the prompt
    history_str = ""
    if history:
        for msg in history:
            role = "User" if msg.get("role") == "user" else "Assistant"
            content = msg.get("content", "")
            history_str += f"{role}: {content}\n"

    # TODO(wedding): rewrite this system prompt for wedding entities (see header).
    #   Keep the rewritten_query instruction and the JSON-only requirement intact.
    system_prompt = f"""
    You are an intelligent query parser for a travel company chatbot retrieval engine.
    Extract the following entities if present in the user query:
    - destination (array of strings, e.g. ["Delhi", "Agra"])
    - budget (string, e.g. "$5000", "cheap")
    - duration (string, e.g. "5 days", "1 week")
    - travel_date (string, e.g. "Next month", "December 2026")
    - intent (enum: pricing, booking, itinerary, general)
    - selected_package (string, optional: extract the EXACT package name if the user selects one, e.g. from 'Tell me more about [Package]')
    - theme (string, optional: e.g. "Beach", "Honeymoon", "Adventure")
    - group_size (string, optional: normalise to a short label — e.g. "Solo", "Couple", "Family of 4", "Group of 8".)
    - user_language (string, optional): The language name of the user's CURRENT message if it is clearly NOT English.
      Detect from the message TEXT itself, not from history or context.
      Return null (omit) if the message is in English or if language is ambiguous.
    - rewritten_query (string) **MANDATORY**: A clean, dense, search-optimized representation of the user's intent to query the vector database.

    DESTINATION EXTRACTION — CRITICAL RULES:
    Only add a place to the `destination` array when the user EXPLICITLY INTENDS TO VISIT that place on their current trip.
    Do NOT extract destinations from visa/logistics/comparison/origin questions.

    CRITICAL INSTRUCTION - REWRITTEN QUERY & THEMES:
    1. If a user asks for a theme without a destination, weave any destination from history into the rewritten query.
    2. Expand sparse terms and fix abbreviations to maximize search accuracy.
    3. If the query is a greeting / filler / lacks intent ("hi", "thanks", "ok"), set `rewritten_query` to "" and `intent` to "general".

    Return ONLY valid, parsable JSON matching the schema precisely. You MUST include `rewritten_query` in every response.
    """
    # ^ TODO(wedding): the abbreviated prompt above mirrors the GeTS original.
    #   See rag_api/services/intent.py for the full travel prompt with all the
    #   WRONG/CORRECT examples — replicate that level of detail for wedding fields.

    try:
        prompt = f"Conversation History:\n{history_str}\n\nLatest User Query: {query}"

        # --- Use Azure OpenAI ---
        try:
            if not azure_client:
                raise RuntimeError("Azure OpenAI client not initialized.")

            logger.info("🧠 [INTENT] Extracting intent with Azure OpenAI...")

            response = await azure_client.chat.completions.create(
                model=settings.AZURE_OPENAI_CHAT_DEPLOYMENT_NAME,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": prompt}
                ],
                response_format={"type": "json_object"},  # Force JSON mode
                temperature=0,
            )

            data = json.loads(response.choices[0].message.content)
            logger.info("✅ [INTENT] Azure OpenAI extraction success.")

        except Exception as azure_err:
            logger.error(f"❌ [INTENT] Azure OpenAI extraction failed: {azure_err}")
            raise azure_err

        # Ensure it matches our IntentExtraction model
        extracted_intent = IntentExtraction(**data)

        # Fallback: Deterministic Destination Extraction if LLM misses it.
        # TODO(wedding): swap extract_destinations() for a wedding city/venue
        #   extractor (e.g. match against your venue/city list).
        if not extracted_intent.destination:
            from services.ingestion import extract_destinations
            extracted_intent.destination = extract_destinations(query)
            if extracted_intent.destination:
                logger.info(f"Fallback destination detection found: {extracted_intent.destination}")

        return extracted_intent

    except Exception as e:
        logger.error(f"❌ [INTENT] All extraction attempts failed: {e}")
        # Return fallback neutral intent and raw query if extraction fails entirely
        return IntentExtraction(intent="general", rewritten_query=query, destination=[], theme=None)
