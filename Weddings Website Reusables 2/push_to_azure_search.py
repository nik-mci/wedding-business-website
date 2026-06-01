# ═══════════════════════════════════════════════════════════════════════════════
# REUSABLE FOR: Vows & Vedas wedding chatbot   |   SAFE COPY (no secrets)
# SOURCE: MCI-GeTS-Chatbot/data_pipeline/push_to_azure_search.py
#
# WHAT IT DOES: embeds content chunks and uploads them to an AZURE AI SEARCH index.
#   This is the Azure-aligned ingestion path — use THIS, not the legacy ingestor.py.
#
# ⚠️ EMBEDDING-MODEL MISMATCH: this embeds with sentence-transformers bge-small-en-v1.5
#   (384-dim), but the live query side uses Azure text-embedding-3-small (1536-dim).
#   Ingest + query MUST match. TODO(wedding): switch get_embedder() to Azure
#   text-embedding-3-small (same as retrieval.py) and match the index vector dimension.
#
# HOW TO REUSE: keep the batch loop + document/metadata shape.
#   TODO(wedding): INDEX_NAME -> a NEW wedding index; PACKAGES_FILE/WEBSITE_FILE -> your
#   wedding content chunk files (venues / services / FAQ / guides); load_env() -> wedding
#   env / Key Vault (it currently reads the repo .env directly — do NOT ship that).
# ═══════════════════════════════════════════════════════════════════════════════
import hashlib, json, os, sys
from pathlib import Path

PACKAGES_FILE = Path(__file__).parent / "packages_chunks.json"
WEBSITE_FILE  = Path(__file__).parent / "website_chunks.json"
INDEX_NAME    = "gets-travel-vectors"  # TODO(wedding): -> a NEW, separate wedding index (e.g. "vows-vedas-vectors")
BATCH_SIZE    = 50

def load_env():
    env_path = Path(__file__).parent.parent / ".env"
    if not env_path.exists():
        return
    with open(env_path, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, _, v = line.partition("=")
            os.environ.setdefault(k.strip(), v.strip().strip('"').strip("'"))

def get_embedder():
    try:
        from sentence_transformers import SentenceTransformer
        model = SentenceTransformer("BAAI/bge-small-en-v1.5")
        print("Using sentence-transformers")
        return lambda texts: model.encode(texts, convert_to_numpy=True).tolist()
    except ImportError:
        pass
    print("[error] sentence-transformers not found. Run: pip install sentence-transformers")
    sys.exit(1)

def load_chunks(path):
    if not path.exists():
        print(f"  [skip] {path.name} not found")
        return []
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    print(f"  Loaded {len(data)} chunks from {path.name}")
    return data

def clean(s):
    return s.replace("\x00", "")

def main():
    load_env()
    endpoint = os.environ.get("AZURE_AI_SEARCH_ENDPOINT", "").rstrip("/")
    key      = os.environ.get("AZURE_AI_SEARCH_KEY", "")
    if not endpoint or not key:
        print("[error] AZURE_AI_SEARCH_ENDPOINT or AZURE_AI_SEARCH_KEY not set.")
        sys.exit(1)
    from azure.core.credentials import AzureKeyCredential
    from azure.search.documents import SearchClient
    client = SearchClient(endpoint=endpoint, index_name=INDEX_NAME, credential=AzureKeyCredential(key))
    embed = get_embedder()
    all_chunks = []
    all_chunks.extend(load_chunks(PACKAGES_FILE))
    all_chunks.extend(load_chunks(WEBSITE_FILE))
    print(f"\nTotal chunks: {len(all_chunks)}")
    total = 0
    batches = [all_chunks[i:i+BATCH_SIZE] for i in range(0, len(all_chunks), BATCH_SIZE)]
    for i, batch in enumerate(batches, 1):
        texts = [clean(c["text"]) for c in batch]
        embeddings = embed(texts)
        documents = []
        for chunk, emb, text in zip(batch, embeddings, texts):
            doc_id = hashlib.sha256(text.encode("utf-8")).hexdigest()
            meta = {
                "text": text,
                "package_name": clean(chunk.get("package_name", "")),
                "primary_destination": clean(chunk.get("primary_destination", "")),
                "chunk_type": chunk.get("chunk_type", ""),
                "tags": chunk.get("tags", "package"),
                "source_url": chunk.get("source_url", ""),
                "confidence": "HIGH",
            }
            if chunk.get("day_number") is not None:
                meta["day_number"] = chunk["day_number"]
            if chunk.get("location"):
                meta["location"] = clean(chunk["location"])
            documents.append({
                "id": doc_id,
                "text": text,
                "embedding": emb if isinstance(emb, list) else emb.tolist(),
                "metadata_json": json.dumps(meta, ensure_ascii=False),
            })
        client.upload_documents(documents=documents)
        total += len(batch)
        pct = i / len(batches) * 100
        print(f"  Batch {i:>3}/{len(batches)}  ({pct:5.1f}%)  -- {total} chunks uploaded")
    print(f"\nDone. {total} chunks pushed to Azure AI Search index '{INDEX_NAME}'")

if __name__ == "__main__":
    main()
