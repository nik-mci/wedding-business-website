import { test, after } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";

const HASHTAGS = ["#PriyaWedsArjun", "#EternallyPriyArjun"];
const upstream = createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");
  if (req.headers["api-key"] !== "test-key") {
    res.writeHead(401).end(JSON.stringify({ error: { code: "401", message: "Access denied" } }));
    return;
  }
  res.end(JSON.stringify({
    id: "chatcmpl-test",
    object: "chat.completion",
    created: 0,
    model: "gpt-4.1-mini",
    choices: [{
      index: 0,
      finish_reason: "stop",
      message: { role: "assistant", content: JSON.stringify({ hashtags: HASHTAGS }) },
    }],
  }));
});
await new Promise((resolve) => upstream.listen(0, "127.0.0.1", resolve));
after(() => { upstream.closeAllConnections(); upstream.close(); });

process.env.AZURE_OPENAI_ENDPOINT = `http://127.0.0.1:${upstream.address().port}`;
// Production sets AZURE_OPENAI_API_KEY as an SWA app setting.
process.env.AZURE_OPENAI_API_KEY = "test-key";
delete process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;

const { POST } = await import("../src/app/api/hashtags/route.js");

test("generates hashtags when AZURE_OPENAI_API_KEY is set, as in production", async () => {
  const res = await POST(new Request("http://localhost/api/hashtags", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bride: "Priya", groom: "Arjun", vibe: "Royal", loveWord: "Eternal" }),
  }));
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { hashtags: HASHTAGS });
});
