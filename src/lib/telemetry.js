// Thin wrapper around the Application Insights REST ingestion API.
// No npm package needed — uses native fetch (Node 18+).
// Set APPLICATIONINSIGHTS_CONNECTION_STRING in env; if absent, all calls are silent no-ops.

function parseConnStr(connStr) {
  if (!connStr) return null;
  const map = {};
  for (const segment of connStr.split(";")) {
    const idx = segment.indexOf("=");
    if (idx > 0) map[segment.slice(0, idx)] = segment.slice(idx + 1);
  }
  if (!map["InstrumentationKey"]) return null;
  return {
    iKey: map["InstrumentationKey"],
    endpoint: (map["IngestionEndpoint"] || "https://dc.applicationinsights.azure.com").replace(/\/$/, ""),
  };
}

// All property values must be strings for Application Insights custom dimensions.
function stringifyProps(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj)) {
    out[k] = Array.isArray(v) ? v.join(", ") : String(v ?? "");
  }
  return out;
}

export async function trackEvent(name, properties = {}) {
  const config = parseConnStr(process.env.APPLICATIONINSIGHTS_CONNECTION_STRING);
  if (!config) return;

  const envelope = {
    name: "Microsoft.ApplicationInsights.Event",
    time: new Date().toISOString(),
    iKey: config.iKey,
    data: {
      baseType: "EventData",
      baseData: {
        ver: 2,
        name,
        properties: stringifyProps(properties),
      },
    },
  };

  try {
    await fetch(`${config.endpoint}/v2/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([envelope]),
    });
  } catch {
    // Telemetry failures must never break the main request
  }
}
