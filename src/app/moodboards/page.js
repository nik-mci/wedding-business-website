"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingSidebar from "@/components/FloatingSidebar";

gsap.registerPlugin(ScrollTrigger);

const moodBoards = [
  { 
    id: "royal-grandeur", 
    number: "01", 
    category: "Grand & Palatial", 
    name: "Royal Grandeur", 
    count: 24, 
    colors: ["#8B0000","#C9A234","#F5E6C8","#2C1810","#D4AF37"], 
    tags: ["Palace Venues","Marigold Florals","Evening Ceremony"], 
    perfectFor: ["Multi-day Weddings","300+ Guests","Destination"], 
    description: "Deep jewel tones meet palatial grandeur. Marigold cascades, candlelit corridors, and regal settings that feel timeless.",
    images: ["destination/TSR50334.jpg", "destination/TSR50973.jpg", "services/decoration/haldi_decor1.jpg", "couple-shots/0G4A1624.jpg"]
  },
  { 
    id: "modern-minimalist", 
    number: "02", 
    category: "Clean & Contemporary", 
    name: "Modern Minimalist", 
    count: 18, 
    colors: ["#FFFFFF","#F5F0E8","#C9A234","#1A1408","#E8E0D0"], 
    tags: ["Architectural Florals","Ivory Palette","Indoor Venues"], 
    perfectFor: ["Intimate Weddings","Under 150 Guests","Urban"], 
    description: "Restraint as luxury. Architectural florals, clean ivory tones, and spaces where every detail earns its place.",
    images: ["services/decoration/059A4328.jpg", "destination/0G4A1341.jpg", "couple-shots/TSR53127.jpg", "services/decoration/pool_venue2.jpg"]
  },
  { 
    id: "garden-romance", 
    number: "03", 
    category: "Soft & Romantic", 
    name: "Garden Romance", 
    count: 22, 
    colors: ["#F2C4CE","#90B890","#FFFFFF","#E8D5C0","#C9A234"], 
    tags: ["Outdoor Ceremony","Blush Tones","Natural Light"], 
    perfectFor: ["Daytime Weddings","All Guest Sizes","Garden Venues"], 
    description: "Blush petals, dappled sunlight, and the quiet magic of an outdoor ceremony surrounded by natural beauty.",
    images: ["services/decoration/haldi_flowers_decor.jpg", "services/decoration/mandap_decor.jpg", "couple-shots/0G4A5379.jpg", "destination/pool_venue.jpg"]
  },
  { 
    id: "desert-royale", 
    number: "04", 
    category: "Earthy & Warm", 
    name: "Desert Royale", 
    count: 20, 
    colors: ["#C4722A","#E8C49A","#8B6355","#F5E6C8","#2C1810"], 
    tags: ["Rajasthani Influence","Terracotta Palette","Sunset Tones"], 
    perfectFor: ["Destination Weddings","Multi-day Events","Heritage Venues"], 
    description: "Terracotta and gold under an infinite sky. Rajasthani soul with a contemporary edit — raw, warm, unforgettable.",
    images: ["destination/TSR50967.jpg", "destination/TSR50995.jpg", "services/decoration/sangeet_decoration.jpg", "couple-shots/059A3486.jpg"]
  },
  { 
    id: "coastal-celebration", 
    number: "05", 
    category: "Breezy & Light", 
    name: "Coastal Celebration", 
    count: 16, 
    colors: ["#4A90B8","#FFFFFF","#F5E6C8","#90B890","#C9A234"], 
    tags: ["Beach Venues","Aqua Palette","Daytime Events"], 
    perfectFor: ["Goa Weddings","Casual Luxury","100-200 Guests"], 
    description: "Salt air and golden light. Aqua, white, and the effortless elegance of a celebration by the water.",
    images: ["services/decoration/pool_venue2.jpg", "destination/TSR50355.jpg", "couple-shots/0G4A2282.jpg", "services/entertainment/entertainment_band.jpg"]
  },
  { 
    id: "old-world-glamour", 
    number: "06", 
    category: "Moody & Opulent", 
    name: "Old World Glamour", 
    count: 26, 
    colors: ["#1A1408","#C9A234","#8B0000","#D4AF37","#2C2010"], 
    tags: ["Candlelit Settings","Indoor Venues","Evening Events"], 
    perfectFor: ["Reception Celebrations","200+ Guests","Grand Scale"], 
    description: "Candlelight on gold. Moody interiors, vintage opulence, and an atmosphere that feels like a dream you don't want to leave.",
    images: ["services/decoration/sangeet_decoration.jpg", "destination/TSR50334.jpg", "couple-shots/0G4A1624.jpg", "services/decoration/059A4328.jpg"]
  },
  { 
    id: "forest-whimsy", 
    number: "07", 
    category: "Natural & Earthy", 
    name: "Forest Whimsy", 
    count: 14, 
    colors: ["#2D5016","#8B6355","#F5E6C8","#90B890","#C9A234"], 
    tags: ["Rustic Textures","Wildflowers","Outdoor Settings"], 
    perfectFor: ["Intimate Weddings","Under 100 Guests","Unique Venues"], 
    description: "Deep greens, wildflowers, and the romance of a celebration held in nature's embrace.",
    images: ["services/decoration/haldi_flowers_decor.jpg", "destination/pool_venue.jpg", "services/decoration/haldi_decor1.jpg", "couple-shots/0G4A5379.jpg"]
  },
  { 
    id: "sacred-traditions", 
    number: "08", 
    category: "Classical & Ceremonial", 
    name: "Sacred Traditions", 
    count: 28, 
    colors: ["#8B0000","#C9A234","#FF6B35","#F5E6C8","#2C1810"], 
    tags: ["Temple Ceremonies","Classical Indian","Red & Gold Palette"], 
    perfectFor: ["Traditional Weddings","All Guest Sizes","Religious Ceremonies"], 
    description: "Red and gold, sacred rituals, and the timeless beauty of classical Indian wedding traditions honoured in full.",
    images: ["services/decoration/mandap_decor.jpg", "couple-shots/TSR53127.jpg", "destination/TSR50973.jpg", "services/decoration/haldi_decor1.jpg"]
  }
];

export default function MoodBoardsPage() {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [copied, setCopied] = useState(false);
  const gridRef = useRef(null);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    // Check for hash on load
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const board = moodBoards.find(b => b.id === hash);
      if (board) {
        setSelectedBoard(board);
        setShowOverlay(true);
      }
    }

    // Grid entrance animation
    const cards = gridRef.current.querySelectorAll(".mood-card");
    gsap.fromTo(cards, 
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    if (showOverlay) {
      document.body.style.overflow = "hidden";
      if (selectedBoard) window.location.hash = selectedBoard.id;
      
      // Overlay animation
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.2 });
      gsap.fromTo(panelRef.current, 
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "cubic-bezier(0.16,1,0.3,1)" }
      );
    } else {
      document.body.style.overflow = "auto";
      window.location.hash = "";
    }
  }, [showOverlay, selectedBoard]);

  const closeOverlay = () => {
    gsap.to(panelRef.current, { scale: 0.94, opacity: 0, duration: 0.25, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, onComplete: () => setShowOverlay(false) });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const MoodBoardCard = ({ board, index }) => {
    const isTall = (index % 2 === 0); // Alternate heights
    return (
      <div 
        onClick={() => { setSelectedBoard(board); setShowOverlay(true); }}
        className={`mood-card group relative bg-[#1A1408] rounded-[12px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_24px_48px_rgba(0,0,0,0.15)] hover:ring-2 hover:ring-[#C9A234] ${isTall ? 'h-[480px]' : 'h-[360px]'}`}
      >
        {/* 2x2 Image Grid */}
        <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
          {board.images.map((img, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image 
                src={`/assets/photos/${img}`} 
                alt={board.name} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
          ))}
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1408]/75 via-transparent to-transparent pointer-events-none"></div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-left">
          <p className="font-body text-[#C9A234] text-[10px] uppercase tracking-[0.4em] mb-1">{board.category}</p>
          <h3 className="font-heading text-white text-[28px] leading-tight mb-1">{board.name}</h3>
          <p className="font-body text-white/55 text-[11px] tracking-wider">{board.count} ideas</p>
        </div>

        {/* Plus Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-white/12 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white text-2xl font-light">
            +
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#FDFAF5] min-h-screen">
      <FloatingSidebar />
      
      {/* HERO SECTION */}
      <header className="pt-20 pb-12 px-6 text-center">
        <p className="font-body text-[#E87B3A] text-[11px] uppercase tracking-[0.4em] mb-3">Explore & Inspire</p>
        <h1 className="font-heading text-[#1A1408] text-5xl md:text-[56px] leading-tight mb-3">Wedding Mood Boards</h1>
        <p className="font-body text-[#9A8F7E] text-[15px] max-w-[600px] mx-auto mb-6">Eight curated aesthetics to spark your imagination.</p>
        <div className="w-12 h-[1px] bg-[#C9A234] mx-auto"></div>
      </header>

      {/* MASONRY GRID */}
      <main className="max-w-[1280px] mx-auto px-6 md:px-20 pb-24">
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {moodBoards.map((board, i) => (
            <MoodBoardCard key={board.id} board={board} index={i} />
          ))}
        </div>
      </main>

      {/* LIGHTBOX OVERLAY */}
      {showOverlay && selectedBoard && (
        <div 
          ref={overlayRef}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 opacity-0"
        >
          {/* Backdrop */}
          <div 
            onClick={closeOverlay}
            className="absolute inset-0 bg-[#0d0d08]/78 backdrop-blur-[4px]"
          />
          
          {/* Panel */}
          <div 
            ref={panelRef}
            className="relative w-[95vw] md:w-[90vw] h-[90vh] max-w-[1200px] bg-white rounded-[16px] overflow-hidden flex flex-col md:flex-row shadow-2xl"
          >
            {/* LEFT COLUMN */}
            <div className="w-full md:w-[38%] bg-[#FDFAF5] border-r border-[#EDE8DC] p-10 overflow-y-auto custom-scrollbar md:sticky md:top-0 h-full flex flex-col">
              <p className="font-body text-[#E87B3A] text-[10px] uppercase tracking-[0.4em] mb-2">{selectedBoard.category}</p>
              <h2 className="font-heading text-[#1A1408] text-[44px] leading-[1.1] mb-4">{selectedBoard.name}</h2>
              <div className="w-12 h-[1px] bg-[#C9A234] mb-5"></div>
              <p className="font-body text-[#9A8F7E] text-[14px] leading-[1.75] mb-7 max-w-[320px] font-light">
                {selectedBoard.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedBoard.tags.map((tag, i) => (
                  <span key={i} className="border border-[#EDE8DC] rounded-full px-[14px] py-[6px] text-[#9A8F7E] text-[11px] font-body">{tag}</span>
                ))}
              </div>

              {/* Color Palette */}
              <div className="mb-8">
                <p className="font-body text-[#9A8F7E] text-[10px] uppercase tracking-[0.3em] mb-3">Colour Palette</p>
                <div className="flex gap-2">
                  {selectedBoard.colors.map((color, i) => (
                    <div key={i} className="w-[28px] h-[28px] rounded-full shadow-sm" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>

              {/* Perfect For */}
              <div className="mb-10">
                <p className="font-body text-[#9A8F7E] text-[10px] uppercase tracking-[0.3em] mb-3">Perfect For</p>
                <div className="flex flex-wrap gap-2">
                  {selectedBoard.perfectFor.map((item, i) => (
                    <span key={i} className="border border-[#EDE8DC] rounded-full px-[14px] py-[6px] text-[#9A8F7E] text-[11px] font-body">{item}</span>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-auto pt-8 flex flex-col gap-3">
                <Link 
                  href="/contact" 
                  className="w-full bg-[#C9A234] text-white flex items-center justify-center h-[48px] rounded-[6px] text-[11px] uppercase tracking-[0.3em] font-body hover:bg-[#A8892F] transition-colors"
                >
                  Talk To A Planner
                </Link>
                <button className="w-full border border-[#C9A234] text-[#C9A234] flex items-center justify-center h-[48px] rounded-[6px] text-[11px] uppercase tracking-[0.3em] font-body hover:bg-[#C9A234]/5 transition-colors">
                  Save This Board
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN AREA */}
            <div className="w-full md:w-[62%] flex flex-col h-full bg-white">
              {/* TOP BAR */}
              <div className="h-14 border-bottom border-[#EDE8DC] px-6 flex items-center justify-between shrink-0">
                <div className="text-[#9A8F7E] text-[11px] font-body">
                  Mood Boards &nbsp;→&nbsp; <span className="text-[#1A1408]">{selectedBoard.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleShare}
                    className="relative group p-2 text-[#9A8F7E] hover:text-[#1A1408] transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                    {copied && (
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1A1408] text-white text-[10px] px-2 py-1 rounded">Copied!</span>
                    )}
                  </button>
                  <button 
                    onClick={closeOverlay}
                    className="p-2 text-[#9A8F7E] hover:text-[#1A1408] transition-colors text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* SCROLLABLE GRID */}
              <div className="flex-grow overflow-y-auto p-7 custom-scrollbar">
                <div className="columns-2 gap-3 space-y-3">
                  {[...selectedBoard.images, ...selectedBoard.images].map((img, i) => (
                    <div key={i} className="relative group rounded-[8px] overflow-hidden break-inside-avoid">
                      <Image 
                        src={`/assets/photos/${img}`} 
                        alt="Mood board detail" 
                        width={400} 
                        height={i % 2 === 0 ? 500 : 300} 
                        className="w-full object-cover rounded-[8px] transition-all duration-500 blur-none hover:ring-1 hover:ring-[#C9A234]"
                      />
                      <div className="absolute top-3 right-3 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 translate-y-1 group-hover:translate-y-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A234" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                      </div>
                    </div>
                  ))}
                </div>

                {/* YOU MIGHT ALSO LIKE */}
                <div className="mt-12 pt-8 border-t border-[#EDE8DC]">
                  <p className="font-body text-[#9A8F7E] text-[10px] uppercase tracking-[0.3em] mb-5">You Might Also Like</p>
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {moodBoards.filter(b => b.id !== selectedBoard.id).slice(0, 4).map(board => (
                      <div 
                        key={board.id} 
                        onClick={() => setSelectedBoard(board)}
                        className="relative w-[180px] h-[120px] rounded-[8px] overflow-hidden shrink-0 cursor-pointer group"
                      >
                        <Image src={`/assets/photos/${board.images[0]}`} alt={board.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                        <p className="absolute bottom-3 left-3 font-heading text-white text-[16px] leading-tight">{board.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #FDFAF5; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #EDE8DC; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #C9A234/40; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
