import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getSession } from "@/lib/session";
import { getSavedIdeasContainer } from "@/lib/cosmos";
import { getBlurProps } from "@/lib/blurDataUrls";

export const metadata = { title: "Saved Ideas — Vows & Vedas" };

async function getSavedIdeas(userId) {
  const { resources } = await getSavedIdeasContainer().items
    .query({
      query: "SELECT * FROM c WHERE c.userId = @userId ORDER BY c.savedAt DESC",
      parameters: [{ name: "@userId", value: userId }],
    })
    .fetchAll();
  return resources;
}

export default async function SavedIdeasPage() {
  const session = await getSession();
  if (!session) redirect("/");

  const saved = await getSavedIdeas(session.sub);

  return (
    <div className="pt-[104px] min-h-screen bg-[#FDFAF5]">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-12 py-16">
        {/* Header */}
        <div className="mb-12 border-b border-[#EDE8DC] pb-8">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A234] mb-3 font-medium">My Account</p>
          <h1 className="font-heading text-4xl font-light text-[#1A1408]">Saved Ideas</h1>
          {saved.length > 0 && (
            <p className="text-[13px] text-[#9A8F7E] mt-2">{saved.length} idea{saved.length !== 1 ? "s" : ""} saved</p>
          )}
        </div>

        {saved.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-heading text-2xl font-light text-[#1A1408] mb-4">No saved images yet</p>
            <p className="text-[14px] text-[#9A8F7E] mb-8">Browse our mood boards and click the heart on any image to save it here.</p>
            <Link
              href="/moodboards"
              className="inline-flex items-center text-[10px] uppercase tracking-[0.3em] font-medium px-6 py-3 bg-[#C9A234] text-white hover:opacity-90 transition-opacity"
            >
              Browse Mood Boards
            </Link>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-3">
            {saved.map((item) => (
              <div key={item.id} className="break-inside-avoid mb-3 relative group overflow-hidden shadow-[0_0_0_2px_#C9A234]">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={`/assets/photos/${item.ideaImg}`}
                    alt={item.ideaTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    {...getBlurProps(`/assets/photos/${item.ideaImg}`)}
                    className="object-cover brightness-75 group-hover:brightness-90 transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
                    <p className="font-heading text-white text-lg font-normal">{item.ideaTitle}</p>
                  </div>
                  <span className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-[#C9A234] text-white text-sm">
                    ♥
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-[#EDE8DC]">
          <Link href="/moodboards" className="text-[11px] uppercase tracking-[0.25em] text-[#C9A234] hover:opacity-70 transition-opacity">
            ← Back to Mood Boards
          </Link>
        </div>
      </div>
    </div>
  );
}
