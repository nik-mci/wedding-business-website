import { getSession } from "@/lib/session";
import { getSavedIdeasContainer } from "@/lib/cosmos";

function safeId(ideaId) {
  return String(ideaId).replace(/[/\\#?]/g, "_");
}

export async function DELETE(request, { params }) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { ideaId } = await params;
  const docId = `${session.sub}_${safeId(ideaId)}`;

  try {
    await getSavedIdeasContainer().item(docId, session.sub).delete();
  } catch (err) {
    if (err.code === 404) return Response.json({ ok: true });
    throw err;
  }

  return Response.json({ ok: true });
}
