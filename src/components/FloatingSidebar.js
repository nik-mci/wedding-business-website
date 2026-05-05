"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GoldDivider from "@/components/GoldDivider";

const navLinks = [
  { label: "Our Services", id: "our-services" },
  { label: "Our Process", id: "our-process" },
  { label: "Our Memory Space", id: "memory-space" },
  { label: "Wedding Hashtag Generator", id: "hashtag-generator" },
  { label: "Wedding Ideas & Moods", id: "ideas-moods" },
  { label: "What Our Couples Say", id: "couples-say" },
];

export default function FloatingSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  // Handle active section detection
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -80% 0px", // Trigger when section is near top
      }
    );

    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-[1.5rem] left-[1.5rem] z-[9999] hidden md:flex flex-col items-center justify-center gap-[4px] w-[40px] h-[40px] bg-[#1a1200] border border-[rgba(200,168,75,0.5)] cursor-pointer group hover:shadow-[0_0_15px_rgba(200,168,75,0.3)] transition-shadow duration-300"
      >
        <span className="w-[18px] h-[1px] bg-[#C8A84B]"></span>
        <span className="w-[18px] h-[1px] bg-[#C8A84B]"></span>
        <span className="w-[18px] h-[1px] bg-[#C8A84B]"></span>
      </button>

      {/* Overlay backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[9999] transition-opacity duration-400"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Panel */}
      <div 
        className={`fixed top-0 left-0 h-full w-[260px] bg-[#1a1200] border-r border-[#C8A84B]/30 z-[10000] transition-transform duration-400 ease-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* Header content */}
        <div className="flex justify-between items-center px-[1.8rem] pt-[1.5rem] pb-4">
          <p className="text-[#C8A84B] font-heading uppercase text-[11px] tracking-[4px] m-0 leading-none">
            Vows & Vedas
          </p>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-[#C8A84B] text-[20px] bg-transparent border-none cursor-pointer p-0 m-0 leading-none hover:scale-110 transition-transform duration-300"
          >
            &times;
          </button>
        </div>

        {/* Ornament Divider */}
        <div className="w-full h-[20px] flex items-center justify-center mb-[1.5rem] opacity-70 px-[1.8rem]">
          <div className="h-[0.5px] bg-[#C8A84B] flex-grow"></div>
          <div className="w-1.5 h-1.5 bg-[#C8A84B] rotate-45 mx-2"></div>
          <div className="h-[0.5px] bg-[#C8A84B] flex-grow"></div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-[1.2rem] px-[1.8rem] flex-grow mt-4">
          {navLinks.map(({ label, id }, index) => {
            const isActive = activeId === id;
            const itemNum = String(index + 1).padStart(2, "0");
            return (
              <button
                key={id}
                onClick={() => handleScroll(id)}
                className={`group flex items-center gap-[1rem] text-left w-full transition-all duration-300 border-l-[2px] bg-transparent cursor-pointer m-0 ${
                  isActive 
                    ? "text-[#C8A84B] border-[#C8A84B] pl-[0.8rem]" 
                    : "text-[#F5EDD6] border-transparent hover:text-[#C8A84B] hover:border-[#C8A84B] hover:pl-[0.8rem]"
                }`}
              >
                <span className="font-heading italic text-[#C8A84B] text-[13px] opacity-80">
                  {itemNum}
                </span>
                <span className="text-[15px] leading-tight" style={{ fontFamily: "Georgia, serif" }}>
                  {label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}
