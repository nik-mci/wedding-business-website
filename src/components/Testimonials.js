"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const featured = [
  {
    author: "Sanja & Alexander",
    location: "Goa, India",
    image: "/assets/photos/sanja and alexder testimonial.jpg",
    preview:
      "The wedding was a special and one of a kind event. Like a dream or a fairytale. We both remember it with love.",
    full: "The wedding was a special and one of a kind event. Like a dream or a fairytale. We both remember it with love. My funny anecdote regarding the wedding: I am so happy I do not have to wear shoes at my wedding.\n\nWe were generally very happy to have such a special event so carefully planned with every little detail in place, without much fuss or time-consuming preparations. Your agency did a wonderful job, planned everything in consultation with us, you have really made our dream come true.",
  },
  {
    author: "Manya & Siddhant",
    location: "Alila Fort Bishangarh, India",
    image: "/assets/photos/couple shots/0G4A5379.jpg",
    preview:
      "Choosing this team to plan our wedding was hands-down the best decision we made. We had a gorgeous two-day celebration at Alila Fort Bishangarh, spanning four events.",
    full: "Choosing this team to plan our wedding was hands-down the best decision we made. We had a gorgeous two-day celebration at Alila Fort Bishangarh, spanning four events—from a vibrant Mehendi and high-energy Sangeet to an intimate Haldi and our dream Wedding.\n\nWhat truly set them apart was their incredible resilience and professionalism. When sudden rain threatened to disrupt our outdoor plans on both days, the team didn't miss a beat. They executed backup plans flawlessly, managing the logistics so seamlessly that our guests never even noticed the hiccups. Siddhant and I were able to completely immerse ourselves in our celebrations, knowing we were in the safest hands. If you want a team that can handle any curveball with grace and deliver perfection, look no further!",
  },
];

const quotes = [
  {
    quote: "Vows & Vedas turned our dream of a Rajasthan palace wedding into a breathtaking reality. Everything you have done for us is more like what we expect a family member to do.",
    author: "Zara & Samar",
    loc: "Udaipur Palace, India",
  },
  {
    quote: "Our wedding at the Devi Garh was an unforgettable experience. The hotel was absolutely stunning and the level of service was outstanding.",
    author: "Sonia & Manlio",
    loc: "Devi Garh, Rajasthan",
  },
  {
    quote: "The entire wedding and organization was truly amazing! Our dream is to go back to Symphony Beach once again. We will recommend you everywhere we can.",
    author: "Tivadar & Orsi",
    loc: "Symphony Beach, Goa",
  },
  {
    quote: "The wedding was spectacular and everything I dreamed and more. Thank you and your team from the bottom of my heart for making my renewal of vows so magical and special.",
    author: "Cheryl & Sanjay",
    loc: "Rajasthan",
  },
  {
    quote: "We were really impressed that we managed to organize the entire three-day ceremony from so far away, in such detail. From the painstaking planning to the wonderful memories, the wedding was exceptional.",
    author: "Emma & James",
    loc: "Goa, India",
  },
];

function Overlay({ t, onClose }) {
  useEffect(() => {
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 backdrop-blur-sm overflow-hidden"
      style={{ animation: "fadeIn 0.25s ease" }}
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        className="relative flex w-[92vw] max-w-5xl h-[85vh] overflow-hidden shadow-2xl"
        style={{ background: "#1a1408" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-5 z-10 text-white/50 hover:text-[#c9a234] transition-colors text-3xl leading-none"
        >
          ×
        </button>

        {/* Left — full text */}
        <div
          className="flex-1 min-h-0 overflow-y-auto p-10 md:p-14 flex flex-col justify-start"
          style={{ overscrollBehavior: "contain" }}
          onWheel={(e) => e.stopPropagation()}
        >
          <div className="testi-stars mb-6">★★★★★</div>
          <p className="font-heading text-xl md:text-2xl italic font-light leading-relaxed text-[#f5f0e8] mb-10 whitespace-pre-line">
            "{t.full}"
          </p>
          <p
            className="text-[11px] uppercase font-bold text-white mb-1"
            style={{ fontFamily: "var(--font-body, 'DM Sans')", letterSpacing: "0.18em" }}
          >
            {t.author}
          </p>
          <p className="text-[10px] text-[#c9a234]" style={{ fontFamily: "var(--font-body, 'DM Sans')" }}>
            {t.location}
          </p>
        </div>

        {/* Right — image */}
        <div className="hidden md:block w-[42%] flex-shrink-0 relative">
          <Image src={t.image} alt={t.author} fill className="object-cover" sizes="42vw" />
        </div>
      </div>
    </div>
  );
}

export default function FeaturedTestimonials() {
  const [active, setActive] = useState(null);
  const [showGrid, setShowGrid] = useState(false);

  return (
    <>
      {active !== null && (
        <Overlay t={featured[active]} onClose={() => setActive(null)} />
      )}

      {/* PART 1 — Featured couple cards */}
      <div className="flex flex-col md:flex-row justify-center gap-4 px-4 sm:px-8">
        {featured.map((t, i) => (
          <div
            key={i}
            className="relative w-full md:w-[480px] flex-shrink-0 overflow-hidden transition-transform duration-500 hover:scale-[1.02]"
            style={{ height: "420px" }}
          >
            {/* Full-bleed background photo */}
            <Image
              src={t.image}
              alt={t.author}
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 480px"
            />

            {/* Gradient overlay — transparent top, dark bottom 65% */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 35%, rgba(26, 20, 8, 0.88) 100%)",
              }}
            />

            {/* Text — bottom-left */}
            <div className="absolute bottom-0 left-0 right-0 p-7">
              <div
                className="text-[#c9a234] mb-2"
                style={{ fontSize: "13px", letterSpacing: "4px" }}
              >
                ★★★★★
              </div>
              <p className="font-heading italic font-light text-[17px] leading-relaxed text-[#f5f0e8] line-clamp-4 mb-3">
                "{t.preview}"
              </p>
              <button
                onClick={() => setActive(i)}
                className="text-[9px] tracking-[0.22em] uppercase text-[#c9a234] font-semibold hover:underline underline-offset-4 mb-3 block"
                style={{ fontFamily: "var(--font-body, 'DM Sans')" }}
              >
                Read Full Story →
              </button>
              <p
                className="text-[11px] uppercase font-bold text-white mb-0.5"
                style={{ fontFamily: "var(--font-body, 'DM Sans')", letterSpacing: "0.18em" }}
              >
                {t.author}
              </p>
              <p
                className="text-[10px] text-[#c9a234]"
                style={{ fontFamily: "var(--font-body, 'DM Sans')" }}
              >
                {t.location}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Divider — expand trigger */}
      <div className="flex flex-col items-center mt-10 mb-0">
        <hr
          className="border-none mb-5"
          style={{ width: "200px", height: "1px", background: "rgba(201, 162, 52, 0.3)" }}
        />
        <button
          onClick={() => setShowGrid((v) => !v)}
          className="group flex flex-col items-center gap-3 cursor-pointer"
        >
          <span
            className="text-[11px] uppercase text-[#c9a234] font-semibold tracking-[0.32em] group-hover:tracking-[0.42em] transition-all duration-500"
            style={{ fontFamily: "var(--font-body, 'DM Sans')" }}
          >
            {showGrid ? "Close" : "More Love Stories"}
          </span>
          <span
            className="flex items-center justify-center w-9 h-9 rounded-full border border-[rgba(201,162,52,0.4)] text-[#c9a234] text-sm group-hover:border-[#c9a234] group-hover:bg-[rgba(201,162,52,0.08)] transition-all duration-300"
            style={{ transform: showGrid ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.4s ease, border-color 0.3s, background 0.3s" }}
          >
            ↓
          </span>
        </button>
      </div>

      {/* PART 2 — Masonry quote grid, revealed on click */}
      <div
        style={{
          maxHeight: showGrid ? "1200px" : "0px",
          opacity: showGrid ? 1 : 0,
          overflow: "hidden",
          transition: "max-height 0.7s ease, opacity 0.5s ease",
          marginTop: showGrid ? "36px" : "0px",
          marginBottom: showGrid ? "0px" : "0px",
        }}
      >
      {/* Mobile — horizontal scroll */}
      <div className="md:hidden flex gap-4 overflow-x-auto px-4 pb-4" style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
        {quotes.map((q, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[78vw] rounded-[4px] p-6 border transition-colors duration-300"
            style={{ background: "#1a1408", borderColor: "rgba(201, 162, 52, 0.25)", scrollSnapAlign: "start" }}
          >
            <div className="font-heading text-[52px] leading-none mb-2" style={{ color: "rgba(201, 162, 52, 0.3)" }}>"</div>
            <div className="text-[#c9a234] mb-3" style={{ fontSize: "12px", letterSpacing: "4px" }}>★★★★★</div>
            <p className="font-heading italic text-[16px] text-[#e8e0d0] leading-[1.7]">{q.quote}</p>
            <hr className="border-none my-4" style={{ height: "1px", background: "rgba(201, 162, 52, 0.2)" }} />
            <p className="text-[10px] uppercase font-bold text-white mb-0.5" style={{ fontFamily: "var(--font-body, 'DM Sans')", letterSpacing: "0.18em" }}>{q.author}</p>
            <p className="text-[10px] text-[#c9a234]" style={{ fontFamily: "var(--font-body, 'DM Sans')" }}>{q.loc}</p>
          </div>
        ))}
      </div>

      {/* Desktop/tablet — masonry grid */}
      <div className="hidden md:grid md:grid-cols-6 gap-4 px-4 sm:px-8">
        {quotes.map((q, i) => {
          const colClass =
            i === 3
              ? "md:col-span-3 lg:col-span-2 lg:col-start-2"
              : "md:col-span-3 lg:col-span-2";

          return (
            <div
              key={i}
              className={`${colClass} rounded-[4px] p-8 border transition-colors duration-300`}
              style={{ background: "#1a1408", borderColor: "rgba(201, 162, 52, 0.25)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(201, 162, 52, 0.6)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(201, 162, 52, 0.25)")}
            >
              <div className="font-heading text-[52px] leading-none mb-2" style={{ color: "rgba(201, 162, 52, 0.3)" }}>"</div>
              <div className="text-[#c9a234] mb-3" style={{ fontSize: "12px", letterSpacing: "4px" }}>★★★★★</div>
              <p className="font-heading italic text-[16px] text-[#e8e0d0] leading-[1.7]">{q.quote}</p>
              <hr className="border-none my-4" style={{ height: "1px", background: "rgba(201, 162, 52, 0.2)" }} />
              <p className="text-[10px] uppercase font-bold text-white mb-0.5" style={{ fontFamily: "var(--font-body, 'DM Sans')", letterSpacing: "0.18em" }}>{q.author}</p>
              <p className="text-[10px] text-[#c9a234]" style={{ fontFamily: "var(--font-body, 'DM Sans')" }}>{q.loc}</p>
            </div>
          );
        })}
      </div>
      </div>
    </>
  );
}
