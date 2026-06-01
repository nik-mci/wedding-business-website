# Weddings Website Reusables 2

Batch 2 of safe, annotated reuse material for the **Vows & Vedas** wedding chatbot, copied
from the GeTS Holidays travel chatbot in this repo. Companion to the sibling folder
**`Wedding Website Reusables`** (batch 1: `schemas.py`, `static_faqs.py`, `intent.py`,
`retrieval.py`).

> **Naming note:** this folder is `Weddings Website Reusables 2` (plural "Weddings" + "2") as
> requested; batch 1 is `Wedding Website Reusables` (singular). Say the word if you'd like them
> aligned/merged into one folder.

> **Status:** staging / reference. Nothing here is wired up. The live GeTS chatbot is untouched.

---

## SAFE conventions applied

- **No live secrets.** These files read credentials from env (`os.getenv` / `settings`); no keys
  or connection strings were copied.
- **PII genericised.** Hardcoded internal recipient emails were replaced with placeholders:
  - `email_service.py`: `nikhil.arora@wearemci.com` → `internal-cc-1@example.com`,
    `shruti.sharma@getsholidays.com` → `internal-cc-2@example.com`
  - `config.py`: the 5-address `SALES_CC_EMAILS` list + `SALES_TEAM_EMAIL` default → placeholders;
    `CRON_SECRET` default neutralised.
- **Provenance + reuse comments.** Every file has a top `REUSABLE FOR / SOURCE / HOW TO REUSE`
  block and inline `TODO(wedding):` markers.

---

## ⚠️ Read before you ingest anything — embedding-model mismatch

The two ingestion scripts here embed with **bge-small-en-v1.5 (384-dim)**, but the live GeTS
**query** side (`intent.py`/`retrieval.py`) uses **Azure text-embedding-3-small (1536-dim)**.
**Ingest and query must use the same model**, or retrieval returns garbage (the vector
dimensions don't even match). Pick ONE model for both — recommended: Azure text-embedding-3-small.

---

## Contents

| File | Source (GeTS) | Reuse type | SAFE edits |
|---|---|---|---|
| `geo.py` | `rag_api/services/geo.py` | Near drop-in — country/currency/language detection (useful for NRI clients) | none needed |
| `email_service.py` | `rag_api/services/email_service.py` | ACS lead-notification + daily-summary emails | 2 emails genericised |
| `config.py` | `rag_api/config.py` | Central Settings object | emails + cron default genericised |
| `push_to_azure_search.py` | `data_pipeline/push_to_azure_search.py` | **Azure** AI Search ingestion (use this one) | INDEX_NAME marked |
| `ingestor.py` | `data_pipeline/ingestor.py` | ⚠️ **legacy Supabase** ingestion (reference only) | — |
| `make_website_chunks.py` | `data_pipeline/make_website_chunks.py` | Content → overlapping chunks (chunking logic reusable as-is) | DEST list marked |
| `SYSTEM_PROMPT.wedding.md` | `generation.py` → `SYSTEM_PROMPT` | Prompt-scaffolding adaptation guide (KEEP/REWRITE per section) | authored doc |
| `DESIGN-PATTERNS.md` | `HANDOFF.md` | The reliability patterns (force hints, suppress_cards, 4-stage machine, explicit-consent funnel) | authored doc |

---

## Suggested next steps (not done yet)

1. Decide the backend form (Python copy vs Node/TS port — see batch-1 README).
2. Extract the wedding site's hardcoded venues/services/FAQ (React components) to JSON, then run
   it through `make_website_chunks.py` → `push_to_azure_search.py` into a **new** wedding index.
3. Build the wedding `SYSTEM_PROMPT` from `SYSTEM_PROMPT.wedding.md`.
4. Re-field `schemas.py` (batch 1) to wedding intents.
5. When ready, move both folders into the `wedding-business-website` repo (they're staged here
   only because that's where you asked for them).
