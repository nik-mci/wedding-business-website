# ═══════════════════════════════════════════════════════════════════════════════
# REUSABLE FOR: Vows & Vedas wedding chatbot   |   SAFE COPY (no secrets)
# SOURCE: MCI-GeTS-Chatbot/rag_api/services/geo.py
#
# HOW TO REUSE (notes for the next Claude agent):
#   Near drop-in — header-based country/currency/language detection, zero latency,
#   no external API calls, nothing travel-specific. Still useful for a wedding bot:
#   NRI clients planning Indian weddings arrive from the US / UK / UAE / etc., so the
#   currency + language maps below let you greet and quote in their context. Keep
#   as-is; trim countries you don't serve. No secrets, nothing to genericise.
# ═══════════════════════════════════════════════════════════════════════════════
"""
geo.py — Lightweight geo detection from HTTP headers.

Checks Cloudflare, proxy, and Accept-Language headers to infer country
and currency. Falls back to INR. No external API calls — zero latency.
Do NOT expose the detected location in responses.
"""

from typing import Optional

# ISO 3166-1 alpha-2 country code → currency code
_COUNTRY_CURRENCY: dict[str, str] = {
    # South Asia (default INR)
    "IN": "INR", "NP": "NPR", "LK": "LKR", "BD": "BDT", "PK": "PKR",
    # GBP
    "GB": "GBP",
    # EUR
    "DE": "EUR", "FR": "EUR", "IT": "EUR", "ES": "EUR", "NL": "EUR",
    "BE": "EUR", "AT": "EUR", "CH": "CHF", "SE": "SEK", "NO": "NOK",
    "DK": "DKK", "FI": "EUR", "PT": "EUR", "IE": "EUR", "GR": "EUR",
    # USD
    "US": "USD", "CA": "CAD",
    # AUD / NZD
    "AU": "AUD", "NZ": "NZD",
    # Middle East
    "AE": "AED", "SA": "SAR", "QA": "QAR", "KW": "KWD", "BH": "BHD",
    # Singapore / Malaysia
    "SG": "SGD", "MY": "MYR",
}

# Accept-Language primary tag → ISO country code (rough approximation)
_LANG_COUNTRY: dict[str, str] = {
    "en-gb":  "GB", "en-au": "AU", "en-nz": "NZ", "en-ca": "CA",
    "en-us":  "US", "en-in": "IN",
    "de":     "DE", "fr":    "FR", "it":    "IT", "es":    "ES",
    "nl":     "NL", "pt":    "PT", "sv":    "SE", "no":    "NO",
    "da":     "DK", "fi":    "FI",
    "ar":     "AE",  # rough — catches Gulf region
    "zh":     "SG",  # rough — Singapore default for Chinese locale
    "ms":     "MY",
}

# Accept-Language primary language tag → human-readable language name
_LANG_NAME: dict[str, str] = {
    "ar": "Arabic",
    "de": "German",
    "fr": "French",
    "es": "Spanish",
    "it": "Italian",
    "nl": "Dutch",
    "pt": "Portuguese",
    "ru": "Russian",
    "zh": "Chinese",
    "ja": "Japanese",
    "ko": "Korean",
    "hi": "Hindi",
    "ms": "Malay",
    "sv": "Swedish",
    "no": "Norwegian",
    "da": "Danish",
    "fi": "Finnish",
    "tr": "Turkish",
    "he": "Hebrew",
    "pl": "Polish",
    "cs": "Czech",
    "uk": "Ukrainian",
    "th": "Thai",
    "vi": "Vietnamese",
    "id": "Indonesian",
    "ro": "Romanian",
    "hu": "Hungarian",
    "el": "Greek",
}


# Country → toll-free phone number for that market
# Default (fallback) is the primary Indian mobile
_DEFAULT_PHONE = "+919910903434"
_COUNTRY_PHONE: dict[str, str] = {
    "AU": "1800707145",      # Australia
    "BR": "8008870176",      # Brazil
    "FR": "0805220699",      # France
    "DE": "8001815707",      # Germany
    "HU": "0680088 394",     # Hungary
    "IT": "800137225",       # Italy
    "MX": "18001614871",     # Mexico
    "PT": "800181757",       # Portugal
    "ES": "900948777",       # Spain
    "GB": "8081890800",      # United Kingdom
    "US": "18884507235",     # United States
}

# Landing-page URL substring → toll-free number.
# Order matters — most specific patterns first; first match wins. The landing
# page determines the market regardless of visitor IP, because the marketing
# team pins each page to a specific toll-free.
_URL_PHONE: list[tuple[str, str]] = [
    # ── packages.getsholidays.com (Unbounce V2 / V3) ──────────────────────────
    # Mexico-MXN must precede bare Mexico
    ("incredible-india-tours-mexico-local-currency-mxn", "18001614871"),
    ("incredible-india-tours-mexico",                    "18001614871"),
    ("incredible-india-tours-kerala-india-tour",         "18884507235"),
    ("incredible-india-tours-spanish",                   "900948777"),
    ("incredible-india-tours-brazil",                    "8008870176"),  # covers -v3
    ("incredible-india-tours-french",                    "0805220699"),
    ("incredible-india-tours-hungary",                   "0680088 394"),
    ("incredible-india-tours-germany",                   "8001815707"),
    ("incredible-india-tours-italy",                     "800137225"),   # covers -v3
    # Portuguese-v3 must precede Portugal so the more specific slug wins,
    # though both map to the same number.
    ("incredible-india-tours-portuguese",                "800181757"),
    ("incredible-india-tours-portugal",                  "800181757"),
    ("incredible-india-tours-usa",                       "18884507235"), # covers -v2/-v3
    ("incredible-india-tours-uk",                        "18884507235"), # covers -2/-v3
    ("incredible-india-tours-australia",                 "18884507235"), # V2
    ("incredible-india-tours-au-v3",                     "18884507235"), # V3 short slug

    # ── tour.getsholidays.com (custom .asp landing pages) ─────────────────────
    # /br/pt/ must precede /br/
    ("tour.getsholidays.com/br/pt/",                     "800181757"),
    ("tour.getsholidays.com/br/",                        "8008870176"),
    ("tour.getsholidays.com/spain/",                     "900948777"),
    ("tour.getsholidays.com/mexico/",                    "18001614871"),
    ("tour.getsholidays.com/german/",                    "8001815707"),
    ("tour.getsholidays.com/hungarian/",                 "0680088 394"),
    ("tour.getsholidays.com/italy/",                     "800137225"),
    ("tour.getsholidays.com/uk/",                        "8081890800"),
    ("tour.getsholidays.com/au/",                        "1800707145"),
    ("tour.getsholidays.com/india-tour-packages/",       "18884507235"),
    ("tour.getsholidays.com/rajasthan-tour/",            "18884507235"),
    ("tour.getsholidays.com/luxury/",                    "18884507235"),
    # Kerala custom page: /package/index.asp?...&tour=kerala-india-tour
    ("tour=kerala-india-tour",                           "18884507235"),

    # ── getsholidays.fr (French standalone domain) ────────────────────────────
    ("getsholidays.fr",                                  "0805220699"),
]


def detect_phone_from_url(source_url: Optional[str]) -> Optional[str]:
    """
    Return the toll-free number bound to a known landing-page URL, or None.
    Match is a case-insensitive substring scan over _URL_PHONE in declared order.
    """
    if not source_url:
        return None
    url = source_url.lower()
    for needle, phone in _URL_PHONE:
        if needle in url:
            return phone
    return None


# Landing-page URL substring → user language name.
# Mirrors _URL_PHONE: every Unbounce / tour.getsholidays.com / standalone-domain
# slug that targets a non-English market gets a language pin here. Used when the
# query text is Latin-script (so unicode detection returns English) AND the
# frontend hasn't yet propagated user_language via accumulated_intent (race
# between page load and the first chip click). T1-10 smoke pass: ES locale
# trip-type clicks were canonicalised to English ("family trip in india") and
# the backend dropped to English on detection, ignoring the /spain/ context.
_URL_LANGUAGE: list[tuple[str, str]] = [
    # Spanish markets
    ("incredible-india-tours-mexico-local-currency-mxn", "Spanish"),
    ("incredible-india-tours-mexico",                    "Spanish"),
    ("incredible-india-tours-spanish",                   "Spanish"),
    ("tour.getsholidays.com/spain/",                     "Spanish"),
    ("tour.getsholidays.com/mexico/",                    "Spanish"),
    # Portuguese markets (must precede generic Portugal substring matches)
    ("tour.getsholidays.com/br/pt/",                     "Portuguese"),
    ("incredible-india-tours-portuguese",                "Portuguese"),
    ("incredible-india-tours-portugal",                  "Portuguese"),
    ("incredible-india-tours-brazil",                    "Portuguese"),
    ("tour.getsholidays.com/br/",                        "Portuguese"),
    # French markets
    ("incredible-india-tours-french",                    "French"),
    ("getsholidays.fr",                                  "French"),
    # German market
    ("incredible-india-tours-germany",                   "German"),
    ("tour.getsholidays.com/german/",                    "German"),
    # Hungarian market
    ("incredible-india-tours-hungary",                   "Hungarian"),
    ("tour.getsholidays.com/hungarian/",                 "Hungarian"),
    # Italian market
    ("incredible-india-tours-italy",                     "Italian"),
    ("tour.getsholidays.com/italy/",                     "Italian"),
]


# ?lang=XX query-param → language name. Used by widget.js when it injects the
# iframe URL for a localized landing page, and present directly when a user
# (or auditor) hits the widget URL with ?lang=XX. The audit reproduces the
# T4 LLM-locale regression on the direct widget URL, where _URL_LANGUAGE's
# host/path-based patterns don't fire.
_QUERY_LANG_MAP: dict[str, str] = {
    "es": "Spanish",
    "pt": "Portuguese",
    "fr": "French",
    "de": "German",
    "hu": "Hungarian",
    "it": "Italian",
    # 'en' intentionally omitted — English is the default and we don't want to
    # pin a session that just happens to have ?lang=en in the URL.
}


def detect_language_from_url(source_url: Optional[str]) -> Optional[str]:
    """
    Return the language name bound to a source_url, or None.

    Resolution order:
      1. ?lang=XX query parameter (set by widget.js for every localized landing
         page and present on direct widget URL hits).
      2. Host/path substring match against _URL_LANGUAGE (landing-page slugs
         like /spain/, getsholidays.fr, incredible-india-tours-portuguese, …).

    First match wins.
    """
    if not source_url:
        return None
    # 1. ?lang=XX query param — parse robustly via urllib so we tolerate
    #    URL-encoded source_url values (e.g. when the parent_url itself
    #    encoded its own query string).
    try:
        from urllib.parse import urlparse, parse_qs, unquote
        # source_url may itself be URL-encoded (when frontend passed
        # parent_url=<encoded>); decode once before parsing to be safe.
        candidate = unquote(source_url) if "%" in source_url else source_url
        parsed = urlparse(candidate)
        if parsed.query:
            params = parse_qs(parsed.query)
            lang_vals = params.get("lang") or params.get("Lang")
            if lang_vals:
                code = lang_vals[0].strip().lower()
                if code in _QUERY_LANG_MAP:
                    return _QUERY_LANG_MAP[code]
    except Exception:
        # Malformed URL — fall through to substring matching.
        pass
    # 2. Host/path substring match.
    url = source_url.lower()
    for needle, lang in _URL_LANGUAGE:
        if needle in url:
            return lang
    return None


def detect_phone(headers: dict, source_url: Optional[str] = None) -> str:
    """
    Resolve the toll-free number to surface in the chat UI.
    Priority: landing-page URL (strongest market signal) → geo-IP country →
    default Indian mobile.
    Toll-free numbers are returned without + prefix (dialled locally);
    the default Indian mobile keeps its + prefix for international dialling.
    """
    url_phone = detect_phone_from_url(source_url)
    if url_phone:
        return url_phone
    country = detect_country(headers)
    if country and country in _COUNTRY_PHONE:
        return _COUNTRY_PHONE[country]
    return _DEFAULT_PHONE


def detect_language(headers: dict, query: str = "") -> str:
    """
    Return the user's preferred language name (e.g. 'Arabic', 'French').
    Primary signal: Unicode script ranges in the query text (catches users
    whose browser locale doesn't match their actual language).
    Fallback: Accept-Language header. Default: 'English'.
    Used to instruct the LLM to respond in that language.
    """
    # ── 1. Unicode script detection from query text ───────────────────────────
    if query:
        for ch in query:
            cp = ord(ch)
            # Arabic / Persian / Urdu
            if 0x0600 <= cp <= 0x06FF:
                return "Arabic"
            # Devanagari (Hindi / Marathi / Sanskrit)
            if 0x0900 <= cp <= 0x097F:
                return "Hindi"
            # Cyrillic (Russian / Ukrainian / Bulgarian …)
            if 0x0400 <= cp <= 0x04FF:
                return "Russian"
            # CJK Unified Ideographs (Chinese / Japanese kanji)
            if 0x4E00 <= cp <= 0x9FFF:
                return "Chinese"
            # Katakana / Hiragana (Japanese-specific)
            if (0x3040 <= cp <= 0x309F) or (0x30A0 <= cp <= 0x30FF):
                return "Japanese"
            # Hangul (Korean)
            if 0xAC00 <= cp <= 0xD7AF:
                return "Korean"
            # Hebrew
            if 0x0590 <= cp <= 0x05FF:
                return "Hebrew"
            # Thai
            if 0x0E00 <= cp <= 0x0E7F:
                return "Thai"
            # Greek
            if 0x0370 <= cp <= 0x03FF:
                return "Greek"

    # ── 2. Accept-Language header fallback ────────────────────────────────────
    al = headers.get("accept-language") or headers.get("Accept-Language") or ""
    if not al:
        return "English"
    primary = al.split(",")[0].strip().lower().split(";")[0]
    lang = primary.split("-")[0]
    if lang == "en":
        return "English"
    return _LANG_NAME.get(lang, "English")


def detect_country(headers: dict) -> Optional[str]:
    """
    Return an ISO 3166-1 alpha-2 country code or None.
    Checks headers in priority order:
      1. CF-IPCountry (Cloudflare)
      2. X-Country-Code (some reverse proxies)
      3. Accept-Language primary tag
    """
    # 1. Cloudflare
    cf = headers.get("cf-ipcountry") or headers.get("CF-IPCountry")
    if cf and len(cf) == 2 and cf != "XX":
        return cf.upper()

    # 2. Generic proxy header
    xcc = headers.get("x-country-code") or headers.get("X-Country-Code")
    if xcc and len(xcc) == 2:
        return xcc.upper()

    # 3. Accept-Language
    al = headers.get("accept-language") or headers.get("Accept-Language") or ""
    if al:
        primary = al.split(",")[0].strip().lower().split(";")[0]
        if primary in _LANG_COUNTRY:
            return _LANG_COUNTRY[primary]
        # Try bare language code (e.g. "de-DE" → "de" → "DE")
        lang = primary.split("-")[0]
        if lang in _LANG_COUNTRY:
            return _LANG_COUNTRY[lang]
        if lang == "en":
            return "US"  # safe default for generic English

    return None


def detect_currency(headers: dict) -> str:
    """
    Return the appropriate currency code for the detected country.
    Defaults to USD (neutral international) when no geo signal is available.
    INR is returned only when the country is positively identified as India.
    In production with Cloudflare, the CF-IPCountry header always provides a country.
    """
    country = detect_country(headers)
    if country:
        return _COUNTRY_CURRENCY.get(country, "USD")
    return "USD"  # neutral fallback — avoids INR for unidentified international users


def currency_symbol(currency: str) -> str:
    _SYMBOLS = {
        "INR": "₹", "USD": "$", "GBP": "£", "EUR": "€",
        "AUD": "A$", "CAD": "C$", "NZD": "NZ$", "AED": "AED",
        "SGD": "S$", "CHF": "CHF",
    }
    return _SYMBOLS.get(currency, currency)
