# Wedding Website Reusables

A safe, **isolated staging area** for code and assets to be reused in the **Vows & Vedas**
wedding-planning chatbot, derived from the GeTS Holidays travel chatbot in this repo.

> **Status: scaffolding.** Nothing here is wired to anything. This is a reference/staging
> area — files are copied and de-risked here, then adapted and moved into the
> `wedding-business-website` repo. The live GeTS chatbot is **not affected** by anything in
> this folder.

---

## What "SAFE copy" means here (conventions)

1. **Copy, never modify the original.** No file outside this folder is touched. ✅
2. **No live secrets — ever.** No API keys, connection strings, or `.env` values are copied
   here. Secrets are referenced only via `os.getenv(...)` / placeholder env names. `.env` is
   never copied. *(The GeTS service files already read from env, so they're inherently
   secret-free — the risk is only `.env` and `config.py` defaults.)*
3. **Genericised identifiers.** Real internal emails, Azure resource names, and endpoints
   from GeTS are replaced with `<PLACEHOLDER>` values — the wedding app gets its own
   resources in an **EUR region** per MCI governance.
4. **Provenance header** on every copied file, citing its GeTS source path so you can diff
   against the original.
5. **`TODO(wedding):` markers** on every travel-specific assumption (destinations, packages,
   itineraries, India-only scope) so adaptation points are obvious.

---

## Reuse inventory

Each copied file carries a `HOW TO REUSE THIS FOR THE WEDDING BOT` header (written for
the next Claude agent) plus inline `TODO(wedding):` markers.

### Batch 1 — done (copied from files read end-to-end, so faithful)

| File here | Source (GeTS) | What it gives the wedding bot | Status |
|---|---|---|---|
| `schemas.py` | `rag_api/models/schemas.py` | API contracts (`ChatRequest`, `LeadCapture`, …) + travel→wedding field map | ✅ done |
| `static_faqs.py` | `rag_api/services/static_faqs.py` | Regex FAQ-bypass mechanism — your 24 FAQ pairs drop straight in | ✅ done |
| `intent.py` | `rag_api/services/intent.py` | Intent-extraction harness (Azure OpenAI JSON mode + schema + fallback) | ✅ done |
| `retrieval.py` | `rag_api/services/retrieval.py` | RAG retrieve → filter → re-rank skeleton | ✅ done |

### Batch 2 — queued (need source reads before faithful copy)

| Source (GeTS) | What it gives the wedding bot | Reuse type | Status |
|---|---|---|---|
| `rag_api/services/geo.py` | Country / currency / language / phone detection | Near drop-in | ⏳ queued |
| `rag_api/services/email_service.py` | ACS lead-notification + daily summary (genericise recipients) | Integration | ⏳ queued |
| `rag_api/services/generation.py` → `SYSTEM_PROMPT` | Conversation scaffolding (4 stages, one-question, anti-permission-seeking, DPDP) | Prompt template | ⏳ queued |
| `rag_api/data_pipeline/*` | Content → chunk → embed → Azure AI Search ingestion | Pipeline | ⏳ queued |
| `config.py` | Settings shape (genericise `SALES_CC_EMAILS`, swap travel `KNOWN_DESTINATIONS`) | Config template | ⏳ queued |
| `HANDOFF.md` (extract) | Design patterns: force hints, `suppress_cards`, explicit-consent funnel | Pattern doc | ⏳ queued |

---

## Decisions (resolved 2026-06-01)

1. **Form of the copies** → **Python copies** of the existing GeTS code (matches "copies";
   the reuse comments make them portable to a Node/TS port later if chosen).
2. **Adaptation depth** → **verbatim copy + agent-oriented reuse comments + `TODO(wedding):`
   markers** (no pre-adaptation; the next agent adapts deliberately).
3. **SAFE** → no secrets copied; credentials read from env; real emails/resource names →
   placeholders; the live GeTS chatbot is never modified.
