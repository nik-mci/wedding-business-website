# ═══════════════════════════════════════════════════════════════════════════════
# REUSABLE FOR: Vows & Vedas wedding chatbot   |   SAFE COPY (no secrets)
# SOURCE: MCI-GeTS-Chatbot/data_pipeline/ingestor.py
#
# ⚠️ LEGACY PATH. This targets SUPABASE (pgvector via `vecs`) — the vector DB GeTS used
#    BEFORE migrating to Azure AI Search. For the wedding bot on Azure, use
#    push_to_azure_search.py instead; keep this only as reference / an alt embedder.
#
# ⚠️ EMBEDDING-MODEL MISMATCH (read this): this embeds with bge-small-en-v1.5 (384-dim),
#    but the live GeTS *query* side uses Azure text-embedding-3-small (1536-dim). Ingest
#    and query MUST use the SAME model or retrieval returns garbage (dims won't match).
#    TODO(wedding): pick ONE embedding model for both ingest + query (recommended:
#    Azure text-embedding-3-small, matching intent.py/retrieval.py) and set DIMENSION.
#
# HOW TO REUSE: keep the batch/upsert loop + the metadata dict shape; re-field metadata
#    (package_name->venue_name, primary_destination->city). load_env() reads ../.env —
#    TODO(wedding): point at the wedding env / Key Vault, never the GeTS .env.
# ═══════════════════════════════════════════════════════════════════════════════
"""
Stage 4 — Package Chunk Ingestor
----------------------------------
Reads packages_chunks.json, embeds each chunk with FastEmbed (BAAI/bge-small-en-v1.5),
and upserts into the Supabase gets_travel_vectors collection.

Uses the same model + collection as the live RAG API — zero schema changes needed.

Requires:
  pip install fastembed vecs python-dotenv

Run from data_pipeline/:
  python ingestor.py

Env vars needed (reads from ../.env automatically):
  SUPABASE_CONNECTION_STRING
  FASTEMBED_MODEL   (optional, defaults to BAAI/bge-small-en-v1.5)
"""

import hashlib
import json
import os
import sys
from pathlib import Path

# ── CONFIGURE ────────────────────────────────────────────────────────────────
CHUNKS_FILE      = "packages_chunks.json"
COLLECTION_NAME  = "gets_travel_vectors"
DIMENSION        = 384
BATCH_SIZE       = 64     # chunks per upsert — safe for memory and Supabase
FASTEMBED_MODEL  = "BAAI/bge-small-en-v1.5"
# ─────────────────────────────────────────────────────────────────────────────


def load_env():
    """Load .env from the repo root (one level up from data_pipeline/)."""
    env_path = Path(__file__).parent.parent / ".env"
    if not env_path.exists():
        print(f"[warn] No .env found at {env_path} — relying on existing environment variables.")
        return
    try:
        from dotenv import load_dotenv
        load_dotenv(env_path)
        print(f"Loaded env from {env_path}")
    except ImportError:
        # Manual parse — no dotenv library needed
        with open(env_path, encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith('#') or '=' not in line:
                    continue
                k, _, v = line.partition('=')
                os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))
        print(f"Loaded env from {env_path} (manual parse)")


def get_connection_string() -> str:
    conn = os.getenv("SUPABASE_CONNECTION_STRING", "").strip()
    if not conn:
        print("\n[error] SUPABASE_CONNECTION_STRING is not set.")
        print("  Add it to ../.env or export it before running.")
        sys.exit(1)
    return conn


def chunk_batches(lst: list, size: int):
    for i in range(0, len(lst), size):
        yield lst[i : i + size]


def clean_text(s: str) -> str:
    """Strip null bytes and other characters PostgreSQL JSONB rejects."""
    return s.replace('\x00', '').replace('\u0000', '')


def main():
    load_env()

    model_name = os.getenv("FASTEMBED_MODEL", FASTEMBED_MODEL)
    conn_str   = get_connection_string()

    # ── Load chunks ───────────────────────────────────────────────────────────
    with open(CHUNKS_FILE, encoding="utf-8") as f:
        chunks: list[dict] = json.load(f)

    print(f"Loaded {len(chunks)} chunks from {CHUNKS_FILE}")

    # ── Init embedding model (fastembed preferred, sentence-transformers fallback) ──
    embed_fn = None  # callable: list[str] -> list[list[float]]

    try:
        from fastembed import TextEmbedding
        print(f"Loading FastEmbed model: {model_name} …")
        _fe = TextEmbedding(model_name=model_name)
        embed_fn = lambda texts: [e.tolist() for e in _fe.embed(texts)]
        print("FastEmbed model ready.\n")
    except ImportError:
        pass

    if embed_fn is None:
        try:
            from sentence_transformers import SentenceTransformer
            print(f"FastEmbed unavailable — using SentenceTransformer: {model_name} …")
            _st = SentenceTransformer(model_name)
            embed_fn = lambda texts: _st.encode(texts).tolist()
            print("SentenceTransformer model ready.\n")
        except ImportError:
            print("[error] Neither fastembed nor sentence-transformers is installed.")
            print("  Run: pip install sentence-transformers")
            sys.exit(1)

    # ── Connect to Supabase ───────────────────────────────────────────────────
    import vecs
    vx = vecs.create_client(conn_str)
    collection = vx.get_or_create_collection(name=COLLECTION_NAME, dimension=DIMENSION)
    print(f"Connected to collection '{COLLECTION_NAME}' (dim={DIMENSION})\n")

    # ── Upsert in batches ─────────────────────────────────────────────────────
    total_upserted = 0
    total_batches  = (len(chunks) + BATCH_SIZE - 1) // BATCH_SIZE

    for batch_num, batch in enumerate(chunk_batches(chunks, BATCH_SIZE), 1):
        texts = [c["text"] for c in batch]

        # Embed
        embeddings = embed_fn(texts)

        # Build vecs records: (id, vector, metadata)
        records = []
        for chunk, emb in zip(batch, embeddings):
            text = clean_text(chunk["text"])
            vector_id = hashlib.sha256(text.encode("utf-8")).hexdigest()

            meta = {
                "text":                text,
                "package_name":        clean_text(chunk.get("package_name", "")),
                "primary_destination": clean_text(chunk.get("primary_destination", "")),
                "chunk_type":          chunk.get("chunk_type", ""),
                "tags":                "package",
                "source_url":          "",
                "confidence":          "HIGH",
            }
            if chunk.get("day_number") is not None:
                meta["day_number"] = chunk["day_number"]
            if chunk.get("location"):
                meta["location"] = clean_text(chunk["location"])

            records.append((vector_id, emb if isinstance(emb, list) else emb.tolist(), meta))

        try:
            collection.upsert(records=records)
            total_upserted += len(records)
        except Exception as e:
            print(f"\n  [warn] Batch {batch_num} failed ({e}) — retrying one-by-one …")
            for record in records:
                try:
                    collection.upsert(records=[record])
                    total_upserted += 1
                except Exception as e2:
                    print(f"    [skip] chunk '{record[2].get('chunk_type','')}' "
                          f"pkg='{record[2].get('package_name','')}' — {e2}")

        pct = batch_num / total_batches * 100
        print(f"  Batch {batch_num:>3}/{total_batches}  ({pct:5.1f}%)  — {total_upserted} chunks upserted")

    # ── Rebuild index ─────────────────────────────────────────────────────────
    print("\nRebuilding cosine index …")
    try:
        collection.create_index(measure=vecs.IndexMeasure.cosine_distance)
        print("Index rebuilt.")
    except Exception as e:
        print(f"Index note (likely already exists): {e}")

    print(f"\n{'='*55}")
    print(f"  Done.  {total_upserted} chunks upserted into '{COLLECTION_NAME}'")
    print('='*55)


if __name__ == "__main__":
    main()
