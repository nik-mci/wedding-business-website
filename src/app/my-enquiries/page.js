import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { getEnquiriesContainer } from "@/lib/cosmos";

export const metadata = { title: "My Enquiries — Vows & Vedas" };

async function getEnquiries(userId) {
  const { resources } = await getEnquiriesContainer().items
    .query({
      query: "SELECT * FROM c WHERE c.userId = @userId ORDER BY c.submittedAt DESC",
      parameters: [{ name: "@userId", value: userId }],
    })
    .fetchAll();
  return resources;
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });
}

export default async function MyEnquiriesPage() {
  const session = await getSession();
  if (!session) redirect("/");

  const enquiries = await getEnquiries(session.sub);

  return (
    <div className="pt-[104px] min-h-screen bg-[#FDFAF5]">
      <div className="max-w-[800px] mx-auto px-6 lg:px-12 py-16">
        {/* Header */}
        <div className="mb-12 border-b border-[#EDE8DC] pb-8">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A234] mb-3 font-medium">My Account</p>
          <h1 className="font-heading text-4xl font-light text-[#1A1408]">My Enquiries</h1>
          {enquiries.length > 0 && (
            <p className="text-[13px] text-[#9A8F7E] mt-2">{enquiries.length} enquir{enquiries.length !== 1 ? "ies" : "y"}</p>
          )}
        </div>

        {enquiries.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-heading text-2xl font-light text-[#1A1408] mb-4">No enquiries yet</p>
            <p className="text-[14px] text-[#9A8F7E] mb-8">
              When you reach out to us, your enquiries will appear here so you can track them.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center text-[10px] uppercase tracking-[0.3em] font-medium px-6 py-3 bg-[#C9A234] text-white hover:opacity-90 transition-opacity"
            >
              Start Planning
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {enquiries.map((enq) => (
              <div key={enq.id} className="border border-[#EDE8DC] bg-white p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    {enq.destination && (
                      <p className="text-[10px] tracking-[0.3em] uppercase text-[#C9A234] font-medium mb-1">
                        {enq.destination}
                      </p>
                    )}
                    <p className="font-heading text-xl font-light text-[#1A1408]">
                      {enq.firstName} {enq.lastName}
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px] uppercase tracking-[0.2em] text-[#9A8F7E] bg-[#FDFAF5] border border-[#EDE8DC] px-3 py-1">
                    Submitted
                  </span>
                </div>

                <table className="w-full text-[13px] border-collapse">
                  {enq.weddingDate && (
                    <tr className="border-t border-[#EDE8DC]">
                      <td className="py-2.5 pr-6 text-[#9A8F7E] text-[11px] uppercase tracking-[0.15em] w-[130px]">Wedding Date</td>
                      <td className="py-2.5 text-[#1A1408]">{enq.weddingDate}</td>
                    </tr>
                  )}
                  <tr className="border-t border-[#EDE8DC]">
                    <td className="py-2.5 pr-6 text-[#9A8F7E] text-[11px] uppercase tracking-[0.15em]">Submitted</td>
                    <td className="py-2.5 text-[#1A1408]">{formatDate(enq.submittedAt)}</td>
                  </tr>
                  {enq.message && (
                    <tr className="border-t border-[#EDE8DC]">
                      <td className="py-2.5 pr-6 text-[#9A8F7E] text-[11px] uppercase tracking-[0.15em] align-top">Vision</td>
                      <td className="py-2.5 text-[#1A1408] leading-relaxed line-clamp-3">{enq.message}</td>
                    </tr>
                  )}
                </table>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-[#EDE8DC]">
          <Link href="/contact" className="text-[11px] uppercase tracking-[0.25em] text-[#C9A234] hover:opacity-70 transition-opacity">
            Submit a New Enquiry →
          </Link>
        </div>
      </div>
    </div>
  );
}
