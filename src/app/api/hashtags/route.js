import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";

const _credential = new DefaultAzureCredential();
const apiVersion = process.env.AZURE_OPENAI_API_VERSION || "2024-10-21";
const deployment  = process.env.AZURE_OPENAI_DEPLOYMENT  || "gpt-4-1-mini";

let client;
function getClient() {
  if (!client) {
    client = new AzureOpenAI({
      endpoint:             process.env.AZURE_OPENAI_ENDPOINT,
      azureADTokenProvider: getBearerTokenProvider(_credential, "https://cognitiveservices.azure.com/.default"),
      apiVersion,
      deployment,
    });
  }
  return client;
}

export async function POST(request) {
  if (!process.env.AZURE_OPENAI_ENDPOINT) {
    return Response.json({ error: "Server is not configured" }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { bride, groom, vibe, loveWord } = body ?? {};
  if (!bride || !groom || !vibe || !loveWord)
    return Response.json({ error: "Missing required fields: bride, groom, vibe, loveWord." }, { status: 400 });
  if (typeof bride !== "string" || typeof groom !== "string" || typeof vibe !== "string" || typeof loveWord !== "string")
    return Response.json({ error: "All fields must be strings." }, { status: 400 });
  if (bride.trim().length > 50 || groom.trim().length > 50)
    return Response.json({ error: "bride and groom must be under 50 characters." }, { status: 400 });
  if (vibe.trim().length > 100 || loveWord.trim().length > 50)
    return Response.json({ error: "vibe must be under 100 characters, loveWord under 50." }, { status: 400 });

  const prompt = `Generate 9 unique creative wedding hashtags for a couple.
Bride: ${bride}
Groom: ${groom}
Vibe: ${vibe}
Word describing their love: ${loveWord}

Rules:
- Mix of combined names, wordplay, emotion
- Some English, 1-2 Hinglish
- CamelCase format #LikeThis
- Clever not generic
- Return ONLY a valid JSON array of 9 strings, no explanation, no markdown.`;

  try {
    const completion = await getClient().chat.completions.create({
      model: deployment,
      temperature: 0.9,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            'You return ONLY valid JSON. Respond with an object shaped like {"hashtags": ["#Tag1", ...]} containing exactly 9 strings.',
        },
        { role: "user", content: prompt },
      ],
    });

    const text = completion.choices[0].message.content;
    const parsed = JSON.parse(text);
    const hashtags = Array.isArray(parsed) ? parsed : parsed.hashtags;

    if (!Array.isArray(hashtags) || hashtags.length === 0) {
      return Response.json({ error: "Unexpected model response" }, { status: 502 });
    }

    return Response.json({ hashtags });
  } catch (err) {
    console.error("Hashtag generation failed:", err);
    return Response.json({ error: "Generation failed" }, { status: 500 });
  }
}
