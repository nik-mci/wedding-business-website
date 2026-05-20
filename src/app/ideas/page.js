"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import blurDataUrls from "@/lib/blurDataUrls";
import gsap from "gsap";

export default function IdeasPage() {
  const [activeTag, setActiveTag] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIdea, setSelectedIdea] = useState(null);
  const [savedIdeas, setSavedIdeas] = useState(new Set());
  const [placeholderIdx, setPlaceholderIdx] = useState(0);

  const placeholders = ['Search floral decor...', 'Search mandap designs...', 'Search bridal looks...', 'Search destination ideas...', 'Search lighting moods...'];

  useEffect(() => {
    // Reveal animations
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((el) => {
      gsap.to(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          onEnter: () => el.classList.add("visible"),
        }
      });
    });

    // Cycle placeholder
    const interval = setInterval(() => {
      setPlaceholderIdx(prev => (prev + 1) % placeholders.length);
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  const toggleSave = (e, id) => {
    e.stopPropagation();
    setSavedIdeas(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const ideas = [
    { id: 1, tag: "mandap", label: "Mandap Design", title: "Crystal & Orchid Canopy", desc: "A floating canopy of white orchids and crystal pendants over a marble plinth — minimalist grandeur for the modern bride.", img: "destination/TSR50355.jpg" },
    { id: 2, tag: "florals", label: "Florals", title: "Rose Cascade Arch", desc: "An archway entirely clad in cascading blush roses, garden roses and eucalyptus — a living frame for your ceremony.", img: "destination/0G4A1341.jpg" },
    { id: 3, tag: "lighting", label: "Lighting", title: "Fairy Light Canopy", desc: "Thousands of suspended fairy lights above a terrace dining table — a sky recreated indoors.", img: "destination/TSR50501.jpg" },
    { id: 4, tag: "bridal", label: "Bridal Look", title: "Sage Green Bridal", desc: "A sage green lehenga with hand-embroidered floral motifs — contemporary bridal dressing at its finest.", img: "couple-shots/0G4A2282.jpg" },
    { id: 5, tag: "table", label: "Tablescape", title: "Garden Marble Table", desc: "Lush garden centrepieces, linen runners, and gold flatware on raw marble tables — luxurious yet organic.", img: "couple-shots/059A3486.jpg" },
    { id: 6, tag: "outdoor", label: "Outdoor", title: "Clifftop Ceremony", desc: "A clifftop ceremony framed by the sea — simple white chairs, a garland altar, and nature does the rest.", img: "couple-shots/059A4274.jpg" },
    { id: 7, tag: "decor", label: "Décor", title: "Mirror Work Backdrop", desc: "Rajasthani mirror tiles catch the light from a thousand angles — an entrancing backdrop for any reception.", img: "couple-shots/0G4A1624.jpg" },
    { id: 8, tag: "mandap", label: "Mandap", title: "Forest & Moss Mandap", desc: "A mandap woven from living branches and hanging moss — ceremony in nature, ceremony as nature.", img: "couple-shots/0G4A1676.jpg" },
    { id: 9, tag: "florals", label: "Florals", title: "Marigold Petal Aisle", desc: "A petal-strewn aisle of marigolds in every shade — from pale cream to deep amber — a river of colour.", img: "couple-shots/0G4A2084.jpg" },
    { id: 10, tag: "decor", label: "Décor", title: "Desert Dune Setting", desc: "Low lanterns, desert roses and hand-knotted rugs at dusk in the Thar Desert — raw and romantic.", img: "couple-shots/0G4A4577.jpg" },
    { id: 11, tag: "lighting", label: "Lighting", title: "Tapered Candle Forest", desc: "Hundreds of tapered candles at varying heights create a warm, flickering forest of light around the dining space.", img: "couple-shots/0G4A4625.jpg" },
    { id: 12, tag: "bridal", label: "Bridal", title: "Ivory Minimal Bridal", desc: "Ivory silk, a single strand of pearls, hair adorned with mogra blossoms — pure, quiet beauty.", img: "couple-shots/0G4A4811.jpg" }
  ];

  const filteredIdeas = ideas.filter(idea => {
    const matchesTag = activeTag === "all" || idea.tag === activeTag;
    const matchesSearch = !searchQuery || idea.title.toLowerCase().includes(searchQuery.toLowerCase()) || idea.label.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="pt-20 bg-bg min-h-screen">
      <section className="pt-24 text-center px-12">
        <p className="section-label reveal">Get Inspired</p>
        <h1 className="section-title reveal">Wedding <em className="italic">Ideas & Moods</em></h1>

        {/* SEARCH */}
        <div className="ideas-search-wrap reveal relative max-w-[640px] mx-auto mb-14 group">
          <input 
            type="text" 
            className="ideas-search w-full py-5 px-6 border-b-2 border-ink/10 bg-transparent font-heading text-xl font-light text-ink outline-none transition-colors duration-300 focus:border-gold" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {!searchQuery && (
            <span className="search-placeholder absolute left-6 top-1/2 -translate-y-1/2 font-heading text-xl font-light text-ink/30 italic pointer-events-none transition-opacity duration-400">
              {placeholders[placeholderIdx]}
            </span>
          )}
          <span className="search-icon absolute right-4 top-1/2 -translate-y-1/2 text-gold text-xl pointer-events-none">⌕</span>
        </div>

        {/* CHIPS */}
        <div className="chip-row reveal flex gap-2 flex-wrap justify-center mb-14">
          {["all", "mandap", "florals", "decor", "bridal", "lighting", "table", "outdoor"].map((tag) => (
            <button 
              key={tag}
              className={`chip px-5 py-2.5 border border-ink/10 text-[11px] tracking-[0.15em] uppercase font-medium bg-transparent text-muted cursor-none relative overflow-hidden transition-all duration-300 ${activeTag === tag ? 'active border-gold text-surface' : 'hover:border-gold hover:text-surface'}`}
              onClick={() => setActiveTag(tag)}
            >
              <span className="relative z-[1]">{tag === 'all' ? 'All Ideas' : tag}</span>
            </button>
          ))}
        </div>
      </section>

      {/* MASONRY GRID */}
      <section className="px-12 py-0 pb-24">
        <div className="ideas-masonry columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-2">
          {filteredIdeas.map((idea, i) => {
            const isSaved = savedIdeas.has(idea.id);
            return (
              <div 
                key={idea.id} 
                className={`idea-item reveal stagger-${(i % 3) + 1} break-inside-avoid mb-2 relative overflow-hidden cursor-none group ${isSaved ? 'saved' : ''}`}
                onClick={() => setSelectedIdea(idea)}
              >
                <div className="idea-inner relative overflow-hidden transition-all duration-500 group-hover:shadow-[0_0_0_2px_#C9A234]">
                  <div className="idea-bg w-full aspect-[3/4] relative overflow-hidden transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={`/assets/photos/${idea.img}`}
                      alt={idea.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      placeholder="blur"
                      blurDataURL={blurDataUrls[`/assets/photos/${idea.img}`]}
                      className="object-cover brightness-75 group-hover:brightness-90 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-ink/10 group-hover:bg-transparent transition-colors duration-500"></div>
                    <span className="idea-label absolute bottom-5 left-5 z-[1] text-[9px] tracking-[0.3em] uppercase text-gold/90 font-medium bg-ink/40 px-2 py-1 backdrop-blur-sm">{idea.label}</span>
                  </div>
                  <div className="idea-overlay absolute inset-0 bg-gradient-to-t from-black/75 via-transparent opacity-0 transition-opacity duration-400 flex items-end p-5 group-hover:opacity-100">
                    <p className="idea-title font-heading text-surface text-lg font-normal">{idea.title}</p>
                  </div>
                  <button 
                    className={`idea-save absolute top-3 right-3 z-[3] w-8 h-8 flex items-center justify-center rounded-full opacity-0 translate-y-[-4px] scale-[0.8] transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 cursor-none ${isSaved ? 'bg-gold text-surface scale-100 opacity-100 translate-y-0' : 'bg-black/30 text-surface'}`}
                    onClick={(e) => toggleSave(e, idea.id)}
                  >
                    {isSaved ? '♥' : '♡'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="load-more-wrap text-center pt-16 reveal">
          <button className="btn-ghost" disabled>All Ideas Loaded</button>
        </div>
      </section>

      {/* IDEA DRAWER */}
      {selectedIdea && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 z-[2999] transition-opacity duration-400" 
            onClick={() => setSelectedIdea(null)}
          ></div>
          <div className="fixed top-0 right-0 bottom-0 w-[min(480px,100vw)] bg-bg z-[3000] transform translate-x-0 transition-transform duration-500 shadow-[-8px_0_48px_rgba(0,0,0,0.12)] overflow-y-auto">
            <button 
              className="absolute top-5 right-5 w-10 h-10 border border-ink/10 flex items-center justify-center text-ink hover:bg-gold hover:border-gold hover:text-surface transition-colors cursor-none" 
              onClick={() => setSelectedIdea(null)}
            >✕</button>
            <div className="drawer-hero h-[300px] relative overflow-hidden">
              <Image
                src={`/assets/photos/${selectedIdea.img}`}
                alt={selectedIdea.title}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                placeholder="blur"
                blurDataURL={blurDataUrls[`/assets/photos/${selectedIdea.img}`]}
                className="object-cover"
              />
            </div>
            <div className="drawer-content p-8">
              <p className="drawer-cat text-[10px] tracking-[0.4em] uppercase text-gold mb-3 font-medium">{selectedIdea.label}</p>
              <h2 className="drawer-title font-heading text-3xl font-light mb-5 leading-tight">{selectedIdea.title}</h2>
              <p className="drawer-desc text-[13px] leading-[2] text-muted font-light mb-8">{selectedIdea.desc}</p>
              <Link href="/contact" className="btn-gold block text-center">Discuss This Idea</Link>
              <div className="drawer-related mt-10 pt-8 border-t border-ink/10">
                <p className="drawer-related-title text-[10px] tracking-[0.4em] uppercase text-gold mb-5 font-medium">Related Ideas</p>
                <div className="related-strip flex gap-2 overflow-x-auto pb-2">
                  {[1, 2, 3, 4].map(n => (
                    <div key={n} className="flex-shrink-0 w-[100px] h-[80px] bg-ink/10 cursor-none relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-ink/10 to-ink/20"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        .chip::before { content:''; position:absolute; inset:0; background:var(--color-gold); transform:scaleX(0); transform-origin:left; transition:transform .3s var(--ease-custom); z-index:0; }
        .chip.active::before, .chip:hover::before { transform: scaleX(1); }
        .chip.active, .chip:hover { color: var(--color-surface); }
        
        .idea-item.saved .idea-inner { box-shadow: 0 0 0 2px var(--color-gold); }
        .idea-save:hover { background: var(--color-gold); animation: bookmarkBounce .4s var(--ease-custom); }
        @keyframes bookmarkBounce { 0%{transform:scale(1)} 40%{transform:scale(1.3)} 70%{transform:scale(0.9)} 100%{transform:scale(1)} }
      `}</style>
    </div>
  );
}
