"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import GoldDivider from "@/components/GoldDivider";
import gsap from "gsap";

export default function PortfolioPage() {
  const [filter, setFilter] = useState("all");
  const [selectedWedding, setSelectedWedding] = useState(null);

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
  }, [filter]);

  const weddings = [
    { id: 1, name: "Aanya & Rohan", loc: "Udaipur, India", cat: "india palace", story: "A three-day palace celebration overlooking Lake Pichola. Marigold archways, mirror-work chandeliers, and a lakeside pheras ceremony that left no eye dry.", img: "destination/TSR50973.jpg" },
    { id: 2, name: "Meera & Kabir", loc: "Santorini, Greece", cat: "international beach", story: "Against the white-washed backdrop of Oia, this sunset ceremony felt like a painting. From the flower-strewn aisle to the Aegean-blue horizon — pure magic.", img: "destination/TSR50501.jpg" },
    { id: 3, name: "Priya & Arjun", loc: "Corbett, India", cat: "india garden", story: "Nestled in the foothills of the Himalayas, this intimate garden ceremony blended rustic elegance with forest magic.", img: "destination/TSR50995.jpg" },
    { id: 4, name: "Rhea & Dev", loc: "Jaisalmer, India", cat: "india palace", story: "A desert wedding beneath ancient sandstone walls. Dunes, firelight, and folk music carried the night.", img: "destination/059A3564.jpg" },
    { id: 5, name: "Simran & Rishi", loc: "Tuscany, Italy", cat: "international garden", story: "Rolling vineyard hills, terracotta urns, and the warm Tuscan sun — a dreamy Indo-Italian fusion celebration.", img: "destination/TSR50355.jpg" },
    { id: 6, name: "Kavya & Vivaan", loc: "Goa, India", cat: "india beach", story: "A beachside evening ceremony with lanterns, jasmine garlands, and waves as the soundtrack.", img: "couple-shots/0G4A2282.jpg" },
    { id: 7, name: "Nisha & Karan", loc: "Bali, Indonesia", cat: "international palace", story: "A cliff-edge ceremony overlooking the Indian Ocean — where every moment felt suspended in time.", img: "couple-shots/TSR53127.jpg" },
    { id: 8, name: "Tara & Ishaan", loc: "Rishikesh, India", cat: "india garden", story: "A soulful riverside ceremony surrounded by the Himalayas — a wedding that breathed as deeply as the landscape.", img: "destination/TSR50967.jpg" },
    { id: 9, name: "Ananya & Sid", loc: "Maldives", cat: "international beach", story: "An overwater ceremony at golden hour — the lagoon shimmering below, infinity above.", img: "couple-shots/0G4A4625.jpg" }
  ];

  const filteredWeddings = filter === "all" ? weddings : weddings.filter(w => w.cat.includes(filter));

  return (
    <div className="pt-20 bg-bg min-h-screen">
      {/* PAGE HERO */}
      <div className="page-hero">
        <div 
          className="page-hero-bg" 
          style={{ backgroundImage: "url('/assets/photos/destination/0G4A1341.jpg')", backgroundPosition: "center 20%" }}
        ></div>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <GoldDivider darkBg className="mb-4" />
          <p className="page-hero-eyebrow">Memory Space</p>
          <h1 className="page-hero-title">Captured <em className="italic">Celebrations</em></h1>
          <GoldDivider darkBg flip className="mt-4" />
        </div>
      </div>

      <section style={{ paddingTop: '64px' }}>
        <div className="filter-bar reveal mb-12 flex gap-3 flex-wrap">
          {["all", "india", "international", "palace", "beach", "garden"].map((f) => (
            <button 
              key={f}
              className={`filter-pill ${filter === f ? 'active' : ''}`} 
              onClick={() => setFilter(f)}
            >
              <span>{f.charAt(0).toUpperCase() + f.slice(1)}</span>
            </button>
          ))}
        </div>

        <div className="wedding-grid">
          {filteredWeddings.map((wedding, i) => (
            <div 
              key={wedding.id} 
              className="wedding-item reveal cursor-none mb-2" 
              onClick={() => setSelectedWedding(wedding)}
            >
              <div className="wedding-item-inner relative overflow-hidden group">
                <Image 
                  src={`/assets/photos/${wedding.img}`} 
                  alt={wedding.name} 
                  width={600}
                  height={800}
                  className="wed-photo w-full transition-all duration-500 group-hover:scale-105 group-hover:saturate-100 filter saturate-0 brightness-[0.85] group-hover:brightness-100"
                />
                <div className="wed-overlay absolute inset-0 bg-gradient-to-t from-black/85 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6">
                  <div className="wed-info">
                    <p className="text-[9px] tracking-[0.4em] uppercase text-gold mb-1">{wedding.loc}</p>
                    <h4 className="font-heading text-surface text-2xl font-normal">{wedding.name}</h4>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {selectedWedding && (
        <div className="fixed inset-0 z-[5000] flex">
          <div 
            className="absolute inset-0 bg-black/75 transition-opacity duration-400" 
            onClick={() => setSelectedWedding(null)}
          ></div>
          <div className="absolute right-0 top-0 bottom-0 width-[min(700px,90vw)] bg-bg transform translate-x-0 transition-transform duration-500 overflow-y-auto z-[5001]">
            <button 
              className="absolute top-6 right-6 w-11 h-11 bg-surface text-ink flex items-center justify-center text-xl hover:bg-gold hover:text-surface transition-colors cursor-none" 
              onClick={() => setSelectedWedding(null)}
            >✕</button>
            <div className="modal-hero h-[50vh] relative overflow-hidden">
              <Image 
                src={`/assets/photos/${selectedWedding.img}`} 
                alt={selectedWedding.name} 
                fill 
                className="modal-hero-img object-cover animate-kenBurns"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
              <div className="absolute bottom-8 left-10 right-10">
                <p className="text-[10px] tracking-[0.4em] text-gold mb-2 uppercase">{selectedWedding.loc}</p>
                <h2 className="font-heading text-surface text-4xl font-light">{selectedWedding.name}</h2>
              </div>
            </div>
            <div className="modal-body p-12">
              <p className="text-[13px] leading-[2] text-muted font-light mb-6">{selectedWedding.story}</p>
              <Link href="/contact" className="btn-gold">Plan Your Wedding Like This</Link>
              <div className="modal-gallery flex gap-2 overflow-x-auto mt-8 pb-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <div key={n} className="flex-shrink-0 w-[120px] h-[90px] bg-ink/10 relative">
                    <Image src={`/assets/photos/${selectedWedding.img}`} alt="gallery" fill sizes="120px" className="object-cover opacity-50" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .wedding-grid { columns: 3; column-gap: 8px; padding: 0 48px; }
        .filter-pill { padding: 10px 24px; border: 1px solid rgba(0,0,0,0.15); font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; font-weight: 500; cursor: none; background: transparent; color: var(--color-muted); transition: all .35s cubic-bezier(0.25, 0.46, 0.45, 0.94); position: relative; overflow: hidden; }
        .filter-pill::before { content:''; position:absolute; inset:0; background:var(--color-gold); transform:scaleX(0); transform-origin:left; transition:transform .35s cubic-bezier(0.25, 0.46, 0.45, 0.94); z-index:0; }
        .filter-pill span { position: relative; z-index: 1; }
        .filter-pill.active, .filter-pill:hover { color: var(--color-surface); border-color: var(--color-gold); }
        .filter-pill.active::before, .filter-pill:hover::before { transform: scaleX(1); }
        
        @keyframes kenBurns { 0%{transform:scale(1.08)} 100%{transform:scale(1)} }
        .animate-kenBurns { animation: kenBurns 8s ease-in-out infinite alternate; }

        @media (max-width: 1024px) {
          .wedding-grid { columns: 2; }
        }
        @media (max-width: 640px) {
          .wedding-grid { columns: 1; }
        }
      `}</style>
    </div>
  );
}
