/**
 * RAG retrieval — embeds query → Azure AI Search vector search → metadata filter → re-rank.
 *
 * Ported from GeTS travel chatbot (retrieval.py) with wedding-specific metadata and chip expansion.
 */

import { AzureOpenAI } from "openai";

let _openai = null;
function getOpenAI() {
  if (!_openai) _openai = new AzureOpenAI({
    endpoint:   process.env.AZURE_OPENAI_ENDPOINT,
    apiKey:     process.env.AZURE_OPENAI_API_KEY,
    apiVersion: process.env.AZURE_OPENAI_API_VERSION || "2024-10-21",
    deployment: process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT || "text-embedding-3-small",
  });
  return _openai;
}

const SEARCH_ENDPOINT  = process.env.AZURE_SEARCH_ENDPOINT;
const SEARCH_KEY       = process.env.AZURE_SEARCH_API_KEY;
const INDEX_NAME       = process.env.AZURE_SEARCH_INDEX_NAME || "vows-vedas-chatbot";

// ── Chip-label → expanded retrieval query ────────────────────────────────────
// Bare chip labels have too little keyword overlap with the index — expand them.
const CHIP_EXPANSION = {
  "beach wedding":     "beach destination wedding venues Goa Kerala resorts sea-facing lawns coastal",
  "royal wedding":     "palace heritage wedding venues Udaipur Jaipur Jodhpur Rajasthan forts royal",
  "hill wedding":      "hills mountain wedding venues Rishikesh Dehradun Himalayas valley nature",
  "intimate wedding":  "intimate small wedding 50 guests boutique venue private ceremony",
  "grand wedding":     "grand large wedding 500+ guests ballroom palace estate multi-day celebration",
  "jungle wedding":    "jungle forest adventure wedding Corbett Bandhavgarh national park nature",
  "kerala wedding":    "Kerala backwaters tropical wedding Kovalam beach resort cultural rituals",
  "destination wedding": "destination wedding India venue planning services luxury resorts",
};

function expandChipQuery(text) {
  if (!text) return text;
  const key = text.trim().toLowerCase();
  return CHIP_EXPANSION[key] ?? text;
}

function normaliseText(text) {
  return (text || "").replace(/[^\w\s,\-]/g, " ").replace(/\s+/, " ").trim();
}

// ── Embedding ─────────────────────────────────────────────────────────────────
async function embedQuery(text) {
  const res = await getOpenAI().embeddings.create({
    model: process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT || "text-embedding-3-small",
    input: [text],
  });
  return res.data[0].embedding;
}

// ── Azure AI Search vector query ──────────────────────────────────────────────
async function vectorSearch(embedding, topK = 30) {
  if (!SEARCH_ENDPOINT || !SEARCH_KEY) {
    console.warn("[retrieval] Azure AI Search not configured — returning empty");
    return [];
  }

  const body = {
    vectorQueries: [{
      kind:   "vector",
      vector: embedding,
      fields: "embedding",
      k:      topK,
    }],
    select: "id,content,heading,section,city,venue_name,source,url",
    top:    topK,
  };

  const res = await fetch(
    `${SEARCH_ENDPOINT}/indexes/${INDEX_NAME}/docs/search?api-version=2024-07-01`,
    {
      method:  "POST",
      headers: { "Content-Type": "application/json", "api-key": SEARCH_KEY },
      body:    JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error("[retrieval] search failed:", res.status, err);
    return [];
  }

  const json = await res.json();
  return (json.value || []).map(doc => ({
    content:    doc.content,
    heading:    doc.heading || "",
    section:    doc.section || "",
    city:       doc.city    || "",
    venue_name: doc.venue_name || "",
    source:     doc.source  || "",
    url:        doc.url     || "",
    score:      doc["@search.score"] ?? 0.1,
  }));
}

// ── Metadata-based score adjustment ──────────────────────────────────────────
function adjustScores(docs, intent) {
  const queryCities  = new Set((intent.cities || []).map(c => c.toLowerCase().replace(" india", "").trim()));
  const selectedVenue = (intent.selected_venue || "").toLowerCase();

  return docs.map(doc => {
    let score = doc.score;

    // City match boost
    if (queryCities.size > 0) {
      const docCity = (doc.city || "").toLowerCase().replace(" india", "").trim();
      if (docCity && queryCities.has(docCity)) {
        score *= 2.5;
      } else if (docCity) {
        score *= 0.7;
      }
    }

    // Selected venue boost
    if (selectedVenue && doc.venue_name) {
      const docVenue = doc.venue_name.toLowerCase();
      if (docVenue.includes(selectedVenue) || selectedVenue.includes(docVenue)) {
        score *= 4.0;
      }
    }

    // Intent-based boosts
    if (intent.intent === "pricing" && /buyout|₹|lacs|crore|cost|price|accommodation|f&b/i.test(doc.content)) {
      score *= 1.8;
    }
    if (intent.intent === "venue_info" && /about:|writeup:|spaces/i.test(doc.content)) {
      score *= 1.5;
    }

    return { ...doc, score };
  });
}

// ── Deduplication by venue/heading ───────────────────────────────────────────
function deduplicate(docs) {
  const seen = new Set();
  return docs.filter(doc => {
    const key = (doc.venue_name || doc.heading || "").trim().toLowerCase();
    if (!key) return true;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

/**
 * Retrieve the most relevant chunks for a given query + intent.
 * @param {string} query - rewritten_query from intentExtraction (or raw user query)
 * @param {Object} intent - IntentExtraction object
 * @param {Object} opts
 * @param {number} opts.topK - how many docs to return (default 6)
 * @returns {Promise<Array>} ranked docs with { content, heading, section, city, venue_name, score }
 */
export async function retrieveContext(query, intent = {}, { topK = 6 } = {}) {
  if (!query?.trim()) return [];

  // Step 1: normalise + chip expand
  let searchStr = normaliseText(query);
  const expanded = expandChipQuery(searchStr);
  if (expanded !== searchStr) {
    console.log(`[retrieval] chip expanded: "${searchStr}" → "${expanded}"`);
    searchStr = expanded;
  }

  // Step 2: embed
  let embedding;
  try {
    embedding = await embedQuery(searchStr);
  } catch (err) {
    console.error("[retrieval] embedding failed:", err.message);
    return [];
  }

  // Step 3: vector search (fetch more than needed for filtering headroom)
  const fetchK  = intent.selected_venue ? 50 : 30;
  const rawDocs = await vectorSearch(embedding, fetchK);

  // Step 4: score adjust
  const scored = adjustScores(rawDocs, intent);

  // Step 5: deduplicate by venue/heading
  const unique = deduplicate(scored);

  // Step 6: sort + cap
  return unique.sort((a, b) => b.score - a.score).slice(0, topK);
}
