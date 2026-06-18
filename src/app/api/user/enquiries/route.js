import { getSession } from "@/lib/session";
import { getEnquiriesContainer } from "@/lib/cosmos";

export async function GET() {
  const session = await getSession();
  if (!session) return Response.json({ error: "Unauthorized" }, { status: 401 });

  const { resources } = await getEnquiriesContainer().items
    .query({
      query: "SELECT * FROM c WHERE c.userId = @userId ORDER BY c.submittedAt DESC",
      parameters: [{ name: "@userId", value: session.sub }],
    })
    .fetchAll();

  return Response.json({ enquiries: resources });
}
