import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";

const _credential = new DefaultAzureCredential();
let _client = null;
function getClient() {
  if (!_client) {
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    _client = new AzureOpenAI({
      endpoint:   process.env.AZURE_OPENAI_ENDPOINT,
      apiVersion: process.env.AZURE_OPENAI_API_VERSION || "2024-10-21",
      deployment: process.env.AZURE_OPENAI_DEPLOYMENT  || "gpt-4-1-mini",
      ...(apiKey
        ? { apiKey }
        : { azureADTokenProvider: getBearerTokenProvider(_credential, "https://cognitiveservices.azure.com/.default") }),
    });
  }
  return _client;
}

export async function GET() {
  const start = Date.now();
  try {
    await getClient().chat.completions.create({
      model:      process.env.AZURE_OPENAI_DEPLOYMENT || "gpt-4-1-mini",
      messages:   [{ role: "user", content: "hi" }],
      max_tokens: 1,
      temperature: 0,
    });
    return Response.json({ ok: true, ms: Date.now() - start });
  } catch (err) {
    return Response.json({ ok: false, error: err.message, ms: Date.now() - start }, { status: 500 });
  }
}
