/**
 * RAG retrieval — embeds query → Azure AI Search vector search → metadata filter → re-rank.
 *
 * Ported from GeTS travel chatbot (retrieval.py) with wedding-specific metadata and chip expansion.
 */

import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { SearchClient, AzureKeyCredential } from "@azure/search-documents";

const _credential = new DefaultAzureCredential();

let _openai = null;
function getOpenAI() {
  if (!_openai) {
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    _openai = new AzureOpenAI({
      endpoint:   process.env.AZURE_OPENAI_ENDPOINT,
      apiVersion: process.env.AZURE_OPENAI_API_VERSION || "2024-10-21",
      deployment: process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT || "text-embedding-3-small",
      ...(apiKey
        ? { apiKey }
        : { azureADTokenProvider: getBearerTokenProvider(_credential, "https://cognitiveservices.azure.com/.default") }),
    });
  }
  return _openai;
}

const SEARCH_ENDPOINT = process.env.AZURE_SEARCH_ENDPOINT;
const INDEX_NAME      = process.env.AZURE_SEARCH_INDEX_NAME || "vows-vedas-chatbot";

let _searchClient = null;
function getSearchClient() {
  if (!_searchClient) {
    const searchKey = process.env.AZURE_SEARCH_API_KEY;
    const credential = searchKey ? new AzureKeyCredential(searchKey) : _credential;
    _searchClient = new SearchClient(SEARCH_ENDPOINT, INDEX_NAME, credential);
  }
  return _searchClient;
}

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

// ── Category → section label map ─────────────────────────────────────────────
// Maps intent.category to the section values used in the Azure AI Search index.
const CATEGORY_SECTION_MAP = {
  "venue-pricing":  ["venue-pricing", "venues", "venue"],
  "moodboard":      ["moodboard", "moodboards"],
  "service":        ["service", "services"],
  "itinerary":      ["itinerary", "itineraries"],
  "faq":            ["faq", "faqs"],
  "package":        ["package", "packages", "planning-packages"],
  "about":          ["about", "team", "company"],
};

const DESTINATION_CITY_MAP = {
  "beach":          ["Goa"],
  "royal-heritage": ["Jaipur", "Udaipur", "Jodhpur", "Jaisalmer", "Rajasthan"],
  "hills":          ["Rishikesh", "Dehradun", "Srinagar", "Corbett"],
  "kerala":         ["Kovalam", "Kochi", "Kerala"],
  "city":           ["Delhi", "Mumbai", "Bangalore"],
};

// Build OData filter string from intent
function buildFilter(intent) {
  const filters = [];

  // Section / category filter
  const sections = CATEGORY_SECTION_MAP[intent.category];
  if (sections?.length) {
    const clause = sections.map(s => `section eq '${s}'`).join(" or ");
    filters.push(`(${clause})`);
  }

  // City filter from destination_type
  const destCities = DESTINATION_CITY_MAP[intent.destination_type];
  if (destCities?.length && !intent.selected_venue) {
    const clause = destCities.map(c => `city eq '${c}'`).join(" or ");
    filters.push(`(${clause})`);
  }

  // Specific city filter (overrides destination_type)
  if (intent.cities?.length === 1 && !intent.selected_venue) {
    filters.push(`city eq '${intent.cities[0]}'`);
  }

  return filters.length ? filters.join(" and ") : null;
}

// Dynamic topK based on query complexity
function resolveTopK(intent, defaultK = 6) {
  switch (intent.query_type) {
    case "comparison":   return 10;
    case "budget-match": return 8;
    case "list":         return 8;
    case "specific-item": return 4;
    default:             return defaultK;
  }
}

// ── Azure AI Search vector query ──────────────────────────────────────────────
async function vectorSearch(embedding, topK = 30, filter = null) {
  if (!SEARCH_ENDPOINT) {
    console.warn("[retrieval] Azure AI Search not configured — returning empty");
    return [];
  }

  try {
    const searchResults = await getSearchClient().search("*", {
      vectorSearchOptions: {
        queries: [{
          kind:                  "vector",
          vector:                embedding,
          fields:                ["embedding"],
          kNearestNeighborsCount: topK,
        }],
      },
      select: ["id", "content", "heading", "section", "city", "venue_name", "source", "url"],
      top:    topK,
      ...(filter ? { filter } : {}),
    });

    const docs = [];
    for await (const result of searchResults.results) {
      docs.push({
        content:    result.document.content    ?? "",
        heading:    result.document.heading    ?? "",
        section:    result.document.section    ?? "",
        city:       result.document.city       ?? "",
        venue_name: result.document.venue_name ?? "",
        source:     result.document.source     ?? "",
        url:        result.document.url        ?? "",
        score:      result.score               ?? 0.1,
      });
    }
    return docs;
  } catch (err) {
    console.error("[retrieval] search failed:", err.message);
    return [];
  }
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

  // Step 3: resolve dynamic topK + build category filter
  const resolvedK = resolveTopK(intent, topK);
  const fetchK    = intent.selected_venue ? 50 : Math.max(resolvedK * 5, 30);
  const filter    = buildFilter(intent);

  if (filter) console.log(`[retrieval] applying filter: ${filter}`);

  // Step 4: vector search with filter — fall back to unfiltered if no results
  let rawDocs = await vectorSearch(embedding, fetchK, filter);
  if (rawDocs.length === 0 && filter) {
    console.log("[retrieval] filter returned 0 results — retrying without filter");
    rawDocs = await vectorSearch(embedding, fetchK, null);
  }

  // Step 5: score adjust
  const scored = adjustScores(rawDocs, intent);

  // Step 6: deduplicate by venue/heading
  const unique = deduplicate(scored);

  // Step 7: sort + cap at resolved topK
  return unique.sort((a, b) => b.score - a.score).slice(0, resolvedK);
}
