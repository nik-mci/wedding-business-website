# ═══════════════════════════════════════════════════════════════════════════════
# REUSABLE FOR: Vows & Vedas wedding chatbot   |   SAFE COPY
# SOURCE: MCI-GeTS-Chatbot/rag_api/config.py
#
# WHAT IT IS: the central Settings object (pydantic-settings). All real secrets are
#   read from env (os.getenv) — none are stored in this file.
#
# HOW TO REUSE (notes for the next Claude agent):
#   - Keep the structure. Point AZURE_* at the WEDDING app's OWN resources (EUR region
#     per MCI governance) via env / Key Vault — do not reuse the GeTS endpoints.
#   - SAFE EDITS APPLIED: SALES_TEAM_EMAIL / SALES_CC_EMAILS genericised; CRON_SECRET
#     default neutralised. TODO(wedding): set real wedding recipients via env.
#   - TODO(wedding): KNOWN_DESTINATIONS is a TRAVEL list — replace with wedding cities +
#     venue types (Udaipur, Jaipur, Jodhpur, Goa… + palace / beach / heritage / banquet).
#   - TODO(wedding): TRAVEL_KEYWORDS -> wedding keywords (wedding, venue, mehndi, sangeet,
#     haldi, reception, decor, catering, guests, budget…). Used as a topical-relevance gate.
#   - REUSE AS-IS: BAD_PATTERNS / LEAD_CAPTURE_PATTERNS / *_PATTERNS are generic response
#     filters — review the wording, but the mechanism transfers unchanged.
# ═══════════════════════════════════════════════════════════════════════════════
import os
from pydantic_settings import BaseSettings

_env_file = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".env")

class Settings(BaseSettings):
    EMBEDDING_PROVIDER: str = os.getenv("EMBEDDING_PROVIDER", "azure")
    FASTEMBED_MODEL: str = os.getenv("FASTEMBED_MODEL", "BAAI/bge-small-en-v1.5")
    JINA_API_KEY: str = os.getenv("JINA_API_KEY", "")
    JINA_MODEL: str = os.getenv("JINA_MODEL", "jina-embeddings-v3")

    # Azure OpenAI Support
    AZURE_OPENAI_API_KEY: str = os.getenv("AZURE_OPENAI_API_KEY", "")
    AZURE_OPENAI_ENDPOINT: str = os.getenv("AZURE_OPENAI_ENDPOINT", "")
    AZURE_OPENAI_CHAT_DEPLOYMENT_NAME: str = os.getenv("AZURE_OPENAI_CHAT_DEPLOYMENT_NAME", "gpt-4o")
    AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME: str = os.getenv("AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME", "text-embedding-3-small")
    AZURE_OPENAI_API_VERSION: str = os.getenv("AZURE_OPENAI_API_VERSION", "2024-02-15-preview")
    AZURE_OPENAI_CHAT_MINI_DEPLOYMENT_NAME: str = os.getenv("AZURE_OPENAI_CHAT_MINI_DEPLOYMENT_NAME", "gpt-4o-mini")

    # Azure AI Search Support
    AZURE_AI_SEARCH_ENDPOINT: str = os.getenv("AZURE_AI_SEARCH_ENDPOINT", "")
    AZURE_AI_SEARCH_KEY: str = os.getenv("AZURE_AI_SEARCH_KEY", "")

    FAISS_INDEX_PATH: str = "faiss_index"
    QA_PAIRS_PATH: str = "../output/qa_pairs.json"
    SCRAPED_PAGES_PATH: str = "../data/raw/scraped_pages.json"
    ITINERARY_DOCS_PATH: str = "../GeTS Itineraries"

    AZURE_POSTGRES_CONNECTION_STRING: str = os.getenv("AZURE_POSTGRES_CONNECTION_STRING", "")

    # Vector DB Support (Transitioning to Azure AI Search)
    VECTOR_DB_PROVIDER: str = os.getenv("VECTOR_DB_PROVIDER", "azure_search")
    
    # Application Insights
    APPLICATIONINSIGHTS_CONNECTION_STRING: str = os.getenv("APPLICATIONINSIGHTS_CONNECTION_STRING", "")

    # Destination Images (Azure Blob Storage)
    AZURE_STORAGE_ACCOUNT_NAME: str = os.getenv("AZURE_STORAGE_ACCOUNT_NAME", "")
    AZURE_STORAGE_ACCOUNT_KEY: str = os.getenv("AZURE_STORAGE_ACCOUNT_KEY", "")
    AZURE_STORAGE_CONTAINER_NAME: str = os.getenv("AZURE_STORAGE_CONTAINER_NAME", "destination-images")

    # Email Support (Azure Communication Services)
    AZURE_COMMUNICATION_CONNECTION_STRING: str = os.getenv("AZURE_COMMUNICATION_CONNECTION_STRING", "")
    EMAIL_SENDER_ADDRESS: str = os.getenv("EMAIL_SENDER_ADDRESS", "")
    SALES_TEAM_EMAIL: str = os.getenv("SALES_TEAM_EMAIL", "sales@example.com")
    # TODO(wedding): set the wedding enquiry recipients (TO + CC) via env / Key Vault.
    # The GeTS list (real internal addresses) was removed for this SAFE copy.
    SALES_CC_EMAILS: list = [
        # "wedding-team@example.com",
    ]
    CRON_SECRET: str = os.getenv("CRON_SECRET", "change-me-via-env")  # TODO(wedding): set via env/Key Vault, never hardcode
    model_config = {
        "env_file": _env_file,
        "extra": "ignore"
    }

    # Data Quality
    KNOWN_DESTINATIONS: list = [
        # Indian Regions & States (verified from getsholidays.com)
        "kerala", "rajasthan", "goa", "kashmir", "ladakh", "himachal", "himachal pradesh",
        "uttarakhand", "assam", "meghalaya", "arunachal", "arunachal pradesh",
        "karnataka", "tamil nadu", "gujarat", "maharashtra", "odisha",
        "punjab", "haryana", "madhya pradesh", "andaman",
        "north india", "south india", "northeast", "north east",

        # Cities & Key Landmarks (verified from getsholidays.com)
        "delhi", "agra", "jaipur", "jodhpur", "udaipur", "jaisalmer", "pushkar",
        "ranthambore", "varanasi", "haridwar", "rishikesh", "amritsar",
        "manali", "leh", "nubra valley", "pangong", "dharamshala",
        "mumbai", "goa", "kochi", "munnar", "rameshwaram", "madurai",
        "bangalore", "chennai", "orchha", "khajuraho", "hampi", "kaziranga",
        "golden triangle",

        # International (verified from getsholidays.com — India, Nepal, Bhutan, Sri Lanka only)
        "bhutan", "nepal", "sri lanka",
    ]
    
    BAD_PATTERNS: list = [
        r"connect you to",
        r"share your (details|contact)",
        r"no one is available",
        r"leave your message",
        r"we will get back",
        r"our team will contact",
        r"please provide (name|email|phone)",
        r"awesome! in this tour, discover",
        r"may i have your name please",
        r"how many adults will be joining",
        r"gets holidays helps you explore more",
        r"if you want india tour i can help",
        r"you want (.*) tour from (.*)\? right",
        r"^Will you depart from .*\?$",
        r"^Please enter your departure city \| Departure City:"
    ]
    
    LEAD_CAPTURE_PATTERNS: list = [
        r"contact you",
        r"share (your|his|her) details",
        r"provide (your|his|her) (number|phone|email)",
        r"callback",
        r"reach out to you"
    ]
    
    CONVERSATION_FILLER_PATTERNS: list = [
        r"great!",
        r"thanks",
        r"ok",
        r"noted",
        r"which package would you like",
        r"let me check"
    ]
    
    GENERIC_MARKETING_PATTERNS: list = [
        r"we can customize",
        r"we offer",
        r"best experience",
        r"tailored for you",
        r"dream holiday",
        r"expert team"
    ]
    
    TRAVEL_KEYWORDS: list = [
        "package", "itinerary", "days", "nights",
        "price", "cost", "inclusion", "exclusion",
        "hotel", "flight", "transfer", "stay",
        "destination", "tour", "trip", "budget",
        "visa", "guide", "activities", "resort", "villa"
    ]
    
    MIN_TRAVEL_SIGNAL: int = 1

settings = Settings()
