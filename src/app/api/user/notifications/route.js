import { getSession } from "@/lib/session";
import { getUsersContainer } from "@/lib/cosmos";

const DEFAULTS = { inspiration: true, offers: true, enquiryUpdates: true };

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { resource } = await getUsersContainer().item(session.sub, session.sub).read();
    return Response.json({ notifications: resource?.notifications ?? DEFAULTS });
  } catch (err) {
    console.error("Notifications GET error:", err);
    return Response.json({ error: "Failed to load preferences." }, { status: 500 });
  }
}

export async function PATCH(req) {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  let body;
  try { body = await req.json(); } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const allowed = ["inspiration", "offers", "enquiryUpdates"];
  const patch = Object.fromEntries(
    allowed.filter((k) => k in body && typeof body[k] === "boolean").map((k) => [k, body[k]])
  );

  if (!Object.keys(patch).length) {
    return Response.json({ error: "No valid fields to update." }, { status: 400 });
  }

  try {
    const { resource } = await getUsersContainer().item(session.sub, session.sub).read();
    const updated = { ...(resource?.notifications ?? DEFAULTS), ...patch };
    await getUsersContainer().item(session.sub, session.sub).patch([
      { op: "set", path: "/notifications", value: updated },
    ]);
    return Response.json({ success: true, notifications: updated });
  } catch (err) {
    console.error("Notifications PATCH error:", err);
    return Response.json({ error: "Failed to save preferences." }, { status: 500 });
  }
}
