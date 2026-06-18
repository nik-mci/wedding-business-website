import { getSession } from "@/lib/session";
import { getSavedIdeasContainer } from "@/lib/cosmos";

// Cosmos DB ids cannot contain / \ # ? — sanitize image paths used as ideaIds
function safeId(ideaId) {
  return String(ideaId).replace(/[/\\#?]/g, "_");
}

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { resources } = await getSavedIdeasContainer().items
    .query({
      query: "SELECT * FROM c WHERE c.userId = @userId ORDER BY c.savedAt DESC",
      parameters: [{ name: "@userId", value: session.sub }],
    })
    .fetchAll();

  return Response.json({ savedIdeas: resources });
}

export async function POST(req) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  let body;
  try { body = await req.json(); } catch {
    return Response.json({ error: "Invalid body." }, { status: 400 });
  }

  const { ideaId, ideaTitle, ideaTag, ideaImg } = body ?? {};
  if (!ideaId) return Response.json({ error: "ideaId required." }, { status: 400 });

  const doc = {
    id: `${session.sub}_${safeId(ideaId)}`,
    userId: session.sub,
    ideaId,
    ideaTitle: ideaTitle ?? "",
    ideaTag: ideaTag ?? "",
    ideaImg: ideaImg ?? "",
    savedAt: new Date().toISOString(),
  };

  await getSavedIdeasContainer().items.upsert(doc);
  return Response.json({ ok: true });
}

export async function DELETE(req) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const ideaId = new URL(req.url).searchParams.get("ideaId");
  if (!ideaId) return Response.json({ error: "ideaId required." }, { status: 400 });

  const docId = `${session.sub}_${safeId(ideaId)}`;
  try {
    await getSavedIdeasContainer().item(docId, session.sub).delete();
  } catch (err) {
    if (err.code === 404) return Response.json({ ok: true });
    throw err;
  }
  return Response.json({ ok: true });
}
