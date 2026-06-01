/**
 * One-time indexing script: chunks knowledge-base.md → embeds → upserts into Azure AI Search.
 *
 * Run:  node scripts/index-knowledge-base.mjs
 * Re-run any time the knowledge base is updated — it upserts (no duplicates).
 *
 * Requires in .env.local:
 *   AZURE_OPENAI_ENDPOINT
 *   AZURE_OPENAI_API_KEY
 *   AZURE_OPENAI_EMBEDDING_DEPLOYMENT   (e.g. text-embedding-3-small)
 *   AZURE_OPENAI_API_VERSION
 *   AZURE_SEARCH_ENDPOINT               (e.g. https://xxx.search.windows.net)
 *   AZURE_SEARCH_API_KEY
 *   AZURE_SEARCH_INDEX_NAME             (e.g. vows-vedas-chatbot)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createHash } from "crypto";
import { AzureOpenAI } from "openai";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Load env from .env.local ──────────────────────────────────────────────────
function loadEnv() {
  const envPath = path.join(__dirname, "..", ".env.local");
  if (!fs.existsSync(envPath)) throw new Error(".env.local not found");
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
}
loadEnv();

const {
  AZURE_OPENAI_ENDPOINT,
  AZURE_OPENAI_API_KEY,
  AZURE_OPENAI_EMBEDDING_DEPLOYMENT = "text-embedding-3-small",
  AZURE_OPENAI_API_VERSION = "2024-10-21",
  AZURE_SEARCH_ENDPOINT,
  AZURE_SEARCH_API_KEY,
  AZURE_SEARCH_INDEX_NAME = "vows-vedas-chatbot",
} = process.env;

for (const [k, v] of Object.entries({
  AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_API_KEY,
  AZURE_SEARCH_ENDPOINT, AZURE_SEARCH_API_KEY,
})) {
  if (!v) { console.error(`❌  Missing env var: ${k}`); process.exit(1); }
}

// ── Azure clients ─────────────────────────────────────────────────────────────
const openai = new AzureOpenAI({
  endpoint: AZURE_OPENAI_ENDPOINT,
  apiKey: AZURE_OPENAI_API_KEY,
  apiVersion: AZURE_OPENAI_API_VERSION,
  deployment: AZURE_OPENAI_EMBEDDING_DEPLOYMENT,
});

// Azure AI Search REST helpers (no extra SDK needed — pure fetch)
const SEARCH_BASE = `${AZURE_SEARCH_ENDPOINT}/indexes/${AZURE_SEARCH_INDEX_NAME}`;
const SEARCH_HEADERS = {
  "Content-Type": "application/json",
  "api-key": AZURE_SEARCH_API_KEY,
};

async function ensureIndex() {
  const indexDef = {
    name: AZURE_SEARCH_INDEX_NAME,
    fields: [
      { name: "id",         type: "Edm.String",                    key: true,  searchable: false, filterable: true },
      { name: "content",    type: "Edm.String",                    key: false, searchable: true,  filterable: false, analyzer: "en.microsoft" },
      { name: "heading",    type: "Edm.String",                    key: false, searchable: true,  filterable: true  },
      { name: "section",    type: "Edm.String",                    key: false, searchable: false, filterable: true  },
      { name: "city",       type: "Edm.String",                    key: false, searchable: true,  filterable: true  },
      { name: "venue_name", type: "Edm.String",                    key: false, searchable: true,  filterable: true  },
      { name: "source",     type: "Edm.String",                    key: false, searchable: false, filterable: true  },
      { name: "url",        type: "Edm.String",                    key: false, searchable: false, filterable: false },
      {
        name: "embedding",
        type: "Collection(Edm.Single)",
        searchable: true,
        filterable: false,
        dimensions: 1536,
        vectorSearchProfile: "default-profile",
      },
    ],
    vectorSearch: {
      algorithms: [{ name: "hnsw-algo", kind: "hnsw", hnswParameters: { m: 4, efConstruction: 400, efSearch: 500, metric: "cosine" } }],
      profiles: [{ name: "default-profile", algorithm: "hnsw-algo" }],
    },
    semantic: {
      configurations: [{
        name: "semantic-config",
        prioritizedFields: {
          titleField: { fieldName: "heading" },
          prioritizedContentFields: [{ fieldName: "content" }],
          prioritizedKeywordsFields: [{ fieldName: "section" }, { fieldName: "city" }],
        },
      }],
    },
  };

  const res = await fetch(`${AZURE_SEARCH_ENDPOINT}/indexes/${AZURE_SEARCH_INDEX_NAME}?api-version=2024-07-01`, {
    method: "PUT",
    headers: SEARCH_HEADERS,
    body: JSON.stringify(indexDef),
  });

  if (!res.ok && res.status !== 201 && res.status !== 200) {
    const err = await res.text();
    throw new Error(`Index create/update failed (${res.status}): ${err}`);
  }
  console.log(`✅  Index "${AZURE_SEARCH_INDEX_NAME}" ready`);
}

// ── Chunking ──────────────────────────────────────────────────────────────────
const WORDS_PER_CHUNK = 160;
const WORDS_OVERLAP   = 20;

/**
 * Parse the knowledge-base.md into structured chunks.
 * Each chunk carries: content, heading, section (## heading), city, venue_name, source, url.
 */
function parseKnowledgeBase(mdText) {
  const chunks = [];

  let currentH1 = "";   // # heading  → source
  let currentH2 = "";   // ## heading → section
  let currentH3 = "";   // ### heading → venue_name / sub-section
  let buffer    = [];
  let currentUrl = "";

  const CITY_NAMES = [
    "goa", "udaipur", "jaipur", "jodhpur", "jaisalmer", "kerala", "kovalam",
    "rajasthan", "mumbai", "delhi", "rishikesh", "auli", "himalayas",
    "khajuraho", "corbett", "kashmir", "srinagar", "dehradun", "mussoorie",
    "shimla", "manali", "coorg", "bangalore", "chennai", "hyderabad",
  ];

  function inferCity(text) {
    const lower = text.toLowerCase();
    return CITY_NAMES.find(c => lower.includes(c)) || "";
  }

  function flushBuffer(forceHeading = "") {
    if (buffer.length < 8) return; // skip tiny fragments
    const heading = forceHeading || currentH3 || currentH2 || currentH1;
    const contentText = buffer.join(" ").trim();
    const city = inferCity(heading + " " + contentText);
    const venueName = currentH3 || "";

    // Sliding window for long buffers
    let start = 0;
    while (start < buffer.length) {
      const slice = buffer.slice(start, start + WORDS_PER_CHUNK);
      if (slice.length < 8) break;
      const text = slice.join(" ").trim();
      const id = createHash("md5").update(`${currentH2}::${heading}::${start}::${text.slice(0, 60)}`).digest("hex");
      chunks.push({ id, content: text, heading, section: currentH2, city, venue_name: venueName, source: currentH1, url: currentUrl });
      start += WORDS_PER_CHUNK - WORDS_OVERLAP;
    }
    buffer = [];
  }

  for (const line of mdText.split("\n")) {
    const h1 = line.match(/^# (.+)/);
    const h2 = line.match(/^## (.+)/);
    const h3 = line.match(/^### (.+)/);
    const urlMatch = line.match(/\*\*URL:\*\* (https?:\/\/\S+)/);
    const boldKV = line.match(/^\*\*([^*]+):\*\* (.+)/);

    if (h1) {
      flushBuffer();
      currentH1 = h1[1].trim();
      currentH2 = ""; currentH3 = ""; currentUrl = "";
      continue;
    }
    if (h2) {
      flushBuffer();
      currentH2 = h2[1].trim();
      currentH3 = ""; currentUrl = "";
      continue;
    }
    if (h3) {
      flushBuffer();
      currentH3 = h3[1].trim();
      continue;
    }
    if (urlMatch) {
      currentUrl = urlMatch[1];
      continue;
    }

    // Structured key:value lines (from source extraction) — treat as content
    if (boldKV) {
      const [, key, val] = boldKV;
      const skipKeys = ["Source", "URL", "Heading", "Chunk ID"];
      if (!skipKeys.includes(key.trim())) {
        buffer.push(...`${key}: ${val}`.split(/\s+/));
        if (buffer.length >= WORDS_PER_CHUNK) flushBuffer();
      }
      continue;
    }

    // Plain paragraph text
    const words = line.trim().split(/\s+/).filter(Boolean);
    if (words.length > 0) {
      buffer.push(...words);
      if (buffer.length >= WORDS_PER_CHUNK) flushBuffer();
    }
  }
  flushBuffer();
  return chunks;
}

// ── Embedding ─────────────────────────────────────────────────────────────────
const EMBED_BATCH = 16; // Azure OpenAI rate-limit friendly

async function embedBatch(texts) {
  const res = await openai.embeddings.create({
    model: AZURE_OPENAI_EMBEDDING_DEPLOYMENT,
    input: texts,
  });
  return res.data.map(d => d.embedding);
}

// ── Upload to Azure AI Search ─────────────────────────────────────────────────
const UPLOAD_BATCH = 100;

async function uploadBatch(docs) {
  const res = await fetch(
    `${SEARCH_BASE}/docs/index?api-version=2024-07-01`,
    { method: "POST", headers: SEARCH_HEADERS, body: JSON.stringify({ value: docs }) }
  );
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Upload failed (${res.status}): ${err}`);
  }
  const json = await res.json();
  const failed = json.value?.filter(v => !v.status);
  if (failed?.length) console.warn(`  ⚠️  ${failed.length} docs failed to index`);
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const kbPath = path.join(__dirname, "..", "old-site", "knowledge-base.md");
  if (!fs.existsSync(kbPath)) throw new Error(`knowledge-base.md not found at ${kbPath}`);

  console.log("📖  Reading knowledge-base.md...");
  const md = fs.readFileSync(kbPath, "utf8");

  console.log("✂️   Chunking...");
  const chunks = parseKnowledgeBase(md);
  console.log(`    → ${chunks.length} chunks`);

  await ensureIndex();

  console.log("🔢  Embedding + uploading...");
  let done = 0;

  for (let i = 0; i < chunks.length; i += EMBED_BATCH) {
    const batch = chunks.slice(i, i + EMBED_BATCH);
    const embeddings = await embedBatch(batch.map(c => c.content));

    // Build upload docs
    const docs = batch.map((chunk, j) => ({
      "@search.action": "mergeOrUpload",
      ...chunk,
      embedding: embeddings[j],
    }));

    // Upload in sub-batches
    for (let u = 0; u < docs.length; u += UPLOAD_BATCH) {
      await uploadBatch(docs.slice(u, u + UPLOAD_BATCH));
    }

    done += batch.length;
    process.stdout.write(`\r    → ${done}/${chunks.length} embedded & indexed`);

    // Polite delay to avoid throttling
    if (i + EMBED_BATCH < chunks.length) await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\n\n✅  Done. ${chunks.length} chunks indexed into "${AZURE_SEARCH_INDEX_NAME}".`);
  console.log(`    Preview: node -e "console.log(${JSON.stringify(chunks.slice(0,2).map(c => c.heading))})"`)
}

main().catch(e => { console.error("❌", e.message); process.exit(1); });
