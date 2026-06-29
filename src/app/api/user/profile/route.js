import { getSession, setSessionCookie } from "@/lib/session";
import { getUsersContainer } from "@/lib/cosmos";

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { resource } = await getUsersContainer().item(session.sub, session.sub).read();
    if (!resource) return Response.json({ error: "User not found" }, { status: 404 });

    const { id, email, firstName, lastName, partnerName, weddingDate, guestCount, budgetRange, preferredStyle, createdAt } = resource;
    return Response.json({ user: { id, email, firstName, lastName, partnerName, weddingDate, guestCount, budgetRange, preferredStyle, createdAt } });
  } catch (err) {
    console.error("Profile GET error:", err);
    return Response.json({ error: "Failed to load profile" }, { status: 500 });
  }
}

export async function PATCH(req) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  let body;
  try { body = await req.json(); } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const allowed = ["firstName", "lastName", "partnerName", "weddingDate", "guestCount", "budgetRange", "preferredStyle"];
  const ops = allowed
    .filter(key => key in body)
    .map(key => ({ op: "set", path: `/${key}`, value: body[key] }));

  if (!ops.length) return Response.json({ error: "No fields to update" }, { status: 400 });

  try {
    await getUsersContainer().item(session.sub, session.sub).patch(ops);

    if ("firstName" in body || "lastName" in body) {
      await setSessionCookie({
        sub: session.sub,
        email: session.email,
        firstName: "firstName" in body ? body.firstName : (session.firstName ?? ""),
        lastName: "lastName" in body ? body.lastName : (session.lastName ?? ""),
      });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error("Profile PATCH error:", err);
    return Response.json({ error: "Failed to save profile" }, { status: 500 });
  }
}
