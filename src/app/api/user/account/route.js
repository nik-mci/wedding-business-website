import { getSession, clearSessionCookie } from "@/lib/session";
import { getUsersContainer, getSavedIdeasContainer, getEnquiriesContainer } from "@/lib/cosmos";

async function deleteAll(container, userId) {
  const { resources } = await container.items
    .query({
      query: "SELECT c.id, c.userId FROM c WHERE c.userId = @userId",
      parameters: [{ name: "@userId", value: userId }],
    })
    .fetchAll();

  await Promise.allSettled(
    resources.map((doc) => container.item(doc.id, doc.userId).delete())
  );
}

export async function DELETE() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await Promise.allSettled([
      deleteAll(getSavedIdeasContainer(), session.sub),
      deleteAll(getEnquiriesContainer(), session.sub),
    ]);

    try {
      await getUsersContainer().item(session.sub, session.sub).delete();
    } catch (err) {
      if (err.code !== 404) throw err;
    }

    await clearSessionCookie();
    return Response.json({ success: true });
  } catch (err) {
    console.error("Delete account error:", err);
    return Response.json({ error: "Failed to delete account." }, { status: 500 });
  }
}
