"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import GoldDivider from "@/components/GoldDivider";

const moodBoards = [
  {
    id: "royal-heritage",
    title: "Royal Heritage",
    subtitle: "Udaipur, Rajasthan",
    image: "destination/TSR50334.jpg",
    gallery: ["destination/TSR50334.jpg", "couple-shots/TSR53127.jpg", "destination/059A3564.jpg", "couple-shots/0G4A4625.jpg"],
    tags: ["Heritage", "Palace", "Royal", "Gold"],
    colors: ["#C9A234", "#1A1408", "#EDE8DC", "#9A8F7E"]
  },
  {
    id: "coastal-serenity",
    title: "Coastal Serenity",
    subtitle: "Goa, India",
    image: "destination/059A3564.jpg",
    gallery: ["destination/059A3564.jpg", "couple-shots/0G4A4625.jpg", "destination/TSR50334.jpg", "couple-shots/TSR53127.jpg"],
    tags: ["Beach", "Tropical", "Sunset", "Teal"],
    colors: ["#E87B3A", "#FDFAF5", "#C9A234", "#1A1408"]
  },
  {
    id: "modern-minimalist",
    title: "Modern Minimalist",
    subtitle: "Mumbai, Maharashtra",
    image: "couple-shots/0G4A4625.jpg",
    gallery: ["couple-shots/0G4A4625.jpg", "destination/TSR50995.jpg", "destination/TSR50334.jpg", "couple-shots/TSR53127.jpg"],
    tags: ["Sleek", "Contemporary", "White", "Glass"],
    colors: ["#FFFFFF", "#F9F9F9", "#1A1408", "#9A8F7E"]
  },
  {
    id: "ethereal-garden",
    title: "Ethereal Garden",
    subtitle: "Coorg, Karnataka",
    image: "destination/TSR50995.jpg",
    gallery: ["destination/TSR50995.jpg", "couple-shots/TSR53127.jpg", "destination/059A3564.jpg", "couple-shots/0G4A4625.jpg"],
    tags: ["Floral", "Greenery", "Boho", "Pastel"],
    colors: ["#6B8E23", "#FFFDD0", "#E87B3A", "#FDFAF5"]
  }
];

export default function MoodBoardsPage() {
  const [selectedBoard, setSelectedBoard] = useState(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const board = moodBoards.find(b => b.id === hash);
        if (board) setSelectedBoard(board);
      } else {
        setSelectedBoard(null);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const closeOverlay = () => {
    window.location.hash = "";
    setSelectedBoard(null);
  };

  return (
    <main className="min-h-screen bg-[#FDFAF5] pt-32 pb-24">
      {/* HERO SECTION */}
      <div className="max-w-[1280px] mx-auto px-10 text-center mb-20">
        <p className="font-sans text-[11px] uppercase tracking-[0.4em] text-[#E87B3A] mb-4">Explore & Inspire</p>
        <h1 className="font-heading text-5xl md:text-6xl text-[#1A1408] mb-6">Wedding Mood Boards</h1>
        <p className="font-sans text-[15px] text-[#9A8F7E] max-w-[600px] mx-auto">
          Eight curated aesthetics to spark your imagination. Explore textures, palettes, and atmospheres for your dream celebration.
        </p>
        <div className="w-12 h-[1px] bg-[#C9A234] mx-auto mt-8"></div>
      </div>

      {/* GRID SECTION */}
      <div className="max-w-[1280px] mx-auto px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {moodBoards.map((board, i) => (
          <Link 
            key={board.id} 
            href={`#${board.id}`}
            className={`group relative overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-700 ${
              i % 2 === 0 ? 'aspect-[3/4]' : 'aspect-[4/5]'
            }`}
          >
            <Image 
              src={`/assets/photos/${board.image}`} 
              alt={board.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-8 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <p className="text-[10px] uppercase tracking-[0.2em] opacity-80 mb-2">{board.subtitle}</p>
              <h3 className="font-heading text-2xl mb-4">{board.title}</h3>
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                {board.tags.slice(0, 2).map(tag => (
                  <span key={tag} className="text-[9px] px-2 py-1 border border-white/30 rounded-full">{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* LIGHTBOX OVERLAY */}
      {selectedBoard && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-10">
          <div 
            className="absolute inset-0 bg-white/95 backdrop-blur-md"
            onClick={closeOverlay}
          ></div>
          
          <div className="relative w-full max-w-[1400px] h-full bg-white shadow-2xl overflow-y-auto custom-scrollbar flex flex-col md:flex-row animate-in fade-in zoom-in duration-500">
            {/* Close Button */}
            <button 
              onClick={closeOverlay}
              className="absolute top-8 right-8 z-50 text-3xl font-light hover:rotate-90 transition-transform duration-500"
            >
              &times;
            </button>

            {/* Left Content: Narrative & Info */}
            <div className="w-full md:w-[450px] p-12 md:p-20 border-r border-[#EDE8DC] flex flex-col justify-center">
              <p className="text-[11px] uppercase tracking-[0.4em] text-[#E87B3A] mb-4">{selectedBoard.subtitle}</p>
              <h2 className="font-heading text-5xl md:text-6xl text-[#1A1408] mb-8">{selectedBoard.title}</h2>
              <p className="text-[#9A8F7E] text-[15px] leading-relaxed mb-10">
                A curation of textures and tones inspired by the {selectedBoard.title} aesthetic. This mood board captures the essence of {selectedBoard.tags.join(", ").toLowerCase()} with a focus on sophisticated storytelling and timeless elegance.
              </p>

              {/* Color Palette */}
              <div className="mb-10">
                <p className="text-[10px] uppercase tracking-[0.2em] text-[#1A1408] mb-4">Color Palette</p>
                <div className="flex gap-3">
                  {selectedBoard.colors.map(color => (
                    <div key={color} className="group relative">
                      <div 
                        className="w-10 h-10 rounded-full border border-black/5 shadow-sm hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      ></div>
                      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{color}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {selectedBoard.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-4 py-1.5 bg-[#FDFAF5] border border-[#EDE8DC] rounded-full text-[#1A1408] tracking-wider uppercase font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Content: Immersive Gallery */}
            <div className="flex-grow p-8 md:p-16 grid grid-cols-2 gap-4 h-full overflow-y-auto">
              {selectedBoard.gallery.map((img, i) => (
                <div 
                  key={i} 
                  className={`relative overflow-hidden ${
                    i === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'
                  }`}
                >
                  <Image 
                    src={`/assets/photos/${img}`} 
                    alt="Gallery item"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-1000"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #EDE8DC; }
      `}</style>
    </main>
  );
}
