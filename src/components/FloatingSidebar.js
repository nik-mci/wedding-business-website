"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";

const navGroups = [
  {
    title: "",
    links: [{ label: "Overview", id: "hero", num: "00" }]
  },
  {
    title: "Experience",
    links: [
      { label: "Our Services", id: "our-services", num: "01" },
      { label: "Our Process", id: "our-process", num: "02" }
    ]
  },
  {
    title: "Inspiration",
    links: [
      { label: "Our Memory Space", id: "memory-space", num: "03" },
      { label: "Wedding Ideas & Moods", id: "ideas-moods", num: "04" },
      { label: "Mood Boards", href: "/moodboards", num: "05" }
    ]
  },
  {
    title: "Tools",
    links: [
      { label: "Hashtag Generator", id: "hashtag-generator", num: "06" }
    ]
  },
  {
    title: "Social Proof",
    links: [
      { label: "What Our Couples Say", id: "couples-say", num: "07" }
    ]
  },
  {
    title: "Connect",
    links: [
      { label: "Begin Your Journey", id: "final-cta", num: "08" }
    ]
  }
];

export default function FloatingSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");

  const wrapperRef = useRef(null);
  const layer0Ref = useRef(null);
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const panelRef = useRef(null);
  const timelineRef = useRef(null);
  const busyRef = useRef(false);
  const openRef = useRef(false);

  // Active section detection — only observe items with id
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { root: null, rootMargin: "-20% 0px -80% 0px" }
    );

    navGroups.forEach((group) => {
      group.links.forEach(({ id }) => {
        if (!id) return;
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, []);

  // GSAP setup
  useLayoutEffect(() => {
    let gsapInstance;
    let ctx;

    import("gsap").then((mod) => {
      gsapInstance = mod.gsap || mod.default;

      const layers = [
        layer0Ref.current,
        layer1Ref.current,
        layer2Ref.current,
      ].filter(Boolean);
      const panel = panelRef.current;

      if (!panel || layers.length === 0) return;

      ctx = gsapInstance.context(() => {
        // Initial hidden state
        gsapInstance.set(wrapperRef.current, { visibility: "hidden" });
        gsapInstance.set(layers, { xPercent: -100 });
        gsapInstance.set(panel, { xPercent: -100 });
        gsapInstance.set(".nav-item", { opacity: 0 });
        gsapInstance.set(".sidebar-header", { opacity: 0, y: -20 });

        const tl = gsapInstance.timeline({
          paused: true,
          onStart: () => { busyRef.current = true; },
          onComplete: () => { busyRef.current = false; },
          onReverseComplete: () => {
            busyRef.current = false;
            gsapInstance.set(wrapperRef.current, { visibility: "hidden" });
          },
        });

        tl
          .set(wrapperRef.current, { visibility: "visible" })

          // All 3 layers — same duration as panel
          .to(layers, {
            xPercent: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: "power3.out",
          })

          // Panel starts as last layer is finishing — no gap
          .to(
            panel,
            { xPercent: 0, duration: 0.6, ease: "power3.out" },
            "-=0.24"
          )

          // Header overlaps panel arrival
          .to(
            ".sidebar-header",
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.45"
          )

          // Nav items simple fade — no pop, no movement
          .to(
            ".nav-item",
            {
              opacity: 1,
              duration: 0.5,
              stagger: 0.05,
              ease: "power2.out",
            },
            "-=0.4"
          );

        timelineRef.current = tl;
      });
    });

    return () => ctx?.revert();
  }, []);

  // Sync with open state
  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;
    if (isOpen) {
      tl.timeScale(1).play();
    } else {
      tl.timeScale(1.8).reverse();
    }
  }, [isOpen]);

  const openSidebar = () => {
    if (busyRef.current) return;
    openRef.current = true;
    setIsOpen(true);
  };

  const closeSidebar = () => {
    if (busyRef.current) return;
    openRef.current = false;
    setIsOpen(false);
  };

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const targetPosition = el.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1400;
    let start = null;

    const easeInOutCubic = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t * t + b;
      t -= 2;
      return (c / 2) * (t * t * t + 2) + b;
    };

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));
      if (progress < duration) {
        window.requestAnimationFrame(step);
      } else {
        window.scrollTo(0, targetPosition);
      }
    };

    window.requestAnimationFrame(step);
    closeSidebar();
  };

  return (
    <>
      {/* Trigger Button — Pill Shape on Left Centre */}
      <button
        onClick={openSidebar}
        className="fixed top-1/2 -translate-y-1/2 left-0 z-[9999] hidden md:flex flex-col items-center justify-center gap-[5px] w-[26px] h-[84px] bg-[#1A1408] border border-l-0 border-[#C9A234]/40 rounded-r-full cursor-pointer group hover:bg-[#1D180C] hover:border-[#C9A234]/70 hover:shadow-[5px_0_20px_rgba(201,162,52,0.15)] transition-all duration-400"
        aria-label="Open navigation"
      >
        <span className="w-[11px] h-[1.5px] bg-[#C9A234] opacity-80 group-hover:opacity-100 group-hover:w-[13px] transition-all duration-300" />
        <span className="w-[11px] h-[1.5px] bg-[#C9A234] opacity-80 group-hover:opacity-100 group-hover:w-[13px] transition-all duration-300" />
        <span className="w-[11px] h-[1.5px] bg-[#C9A234] opacity-80 group-hover:opacity-100 group-hover:w-[13px] transition-all duration-300" />
        
        {/* Subtle vertical text label (Optional but adds to the 'pill' look) */}
        <span className="absolute -rotate-90 text-[8px] uppercase tracking-[0.2em] text-[#C9A234]/40 font-medium whitespace-nowrap mt-20 group-hover:text-[#C9A234]/70 transition-colors">
          Menu
        </span>
      </button>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] transition-opacity duration-700 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeSidebar}
      />

      {/* Single wrapper — layers + panel in one coordinate space */}
      <div
        ref={wrapperRef}
        className="fixed top-0 left-0 h-full w-[320px] z-[10001]"
        style={{ visibility: "hidden" }}
      >
        {/* Layer 0 — near black */}
        <div
          ref={layer0Ref}
          className="absolute inset-0 shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
          style={{ background: "#0D0A04" }}
        />
        {/* Layer 1 — gold */}
        <div
          ref={layer1Ref}
          className="absolute inset-0 shadow-[10px_0_30px_rgba(0,0,0,0.4)]"
          style={{ background: "#C9A234" }}
        />
        {/* Layer 2 — cream */}
        <div
          ref={layer2Ref}
          className="absolute inset-0 shadow-[10px_0_30px_rgba(0,0,0,0.3)]"
          style={{ background: "#EDE8DC" }}
        />

        {/* Main panel */}
        <div
          ref={panelRef}
          className="absolute inset-0 border-r border-[#C9A234]/10 flex flex-col overflow-hidden shadow-2xl"
          style={{ background: "#1A1408" }}
        >
          {/* Header */}
          <div
            className="sidebar-header flex justify-between items-center px-10 pt-12 pb-8 sticky top-0 z-10"
            style={{ background: "#1A1408" }}
          >
            <p
              className="text-[#C9A234] uppercase text-[12px] tracking-[0.3em] m-0 leading-none"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Vows &amp; Vedas
            </p>
            <button
              onClick={closeSidebar}
              className="text-[#C9A234] text-[24px] bg-transparent border-none cursor-pointer p-0 m-0 leading-none transition-all duration-500 hover:rotate-90 hover:text-white"
              aria-label="Close navigation"
            >
              &times;
            </button>
          </div>

          {/* Nav */}
          <nav className="flex flex-col px-10 pb-12 flex-grow overflow-y-auto custom-scrollbar">
            {navGroups.map((group, groupIdx) => (
              <div
                key={groupIdx}
                className={`nav-group ${groupIdx === 0 ? "mb-8" : "mb-10"}`}
              >
                {group.title && (
                  <div className="flex items-center gap-4 mb-6 opacity-30">
                    <div className="h-[0.5px] bg-[#C9A234] flex-grow" />
                    <div className="w-1 h-1 bg-[#C9A234] rotate-45 shrink-0" />
                    <p className="text-[#C9A234] text-[9px] tracking-[0.25em] uppercase font-medium whitespace-nowrap">
                      {group.title}
                    </p>
                    <div className="w-1 h-1 bg-[#C9A234] rotate-45 shrink-0" />
                    <div className="h-[0.5px] bg-[#C9A234] flex-grow" />
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  {group.links.map(({ label, id, href, num }) => {
                    const isActive = activeId === id;
                    const isOverview = num === "00";

                    const handleClick = () => {
                      if (href) {
                        window.location.href = href;
                      } else if (id) {
                        handleScroll(id);
                      }
                    };

                    return (
                      <button
                        key={num}
                        onClick={handleClick}
                        className={`nav-item group relative flex items-center gap-5 text-left w-full bg-transparent border-none cursor-pointer m-0 py-0.5 transition-all duration-300 ${
                          isOverview ? "opacity-70" : ""
                        }`}
                      >
                        {/* Active dot */}
                        <span
                          className={`absolute left-[-18px] w-1 h-1 rounded-full bg-[#C9A234] transition-all duration-500 ease-out ${
                            isActive
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-0 group-hover:opacity-40 group-hover:scale-75"
                          }`}
                        />

                        {/* Number */}
                        <span
                          className={`italic text-[11px] w-5 shrink-0 transition-colors duration-300 ${
                            isActive
                              ? "text-[#C9A234]"
                              : "text-[#C9A234]/60 group-hover:text-[#C9A234]"
                          }`}
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {num}
                        </span>

                        {/* Label */}
                        <span
                          className={`text-[14px] leading-tight tracking-wide transition-all duration-500 ease-out ${
                            isActive
                              ? "text-[#C9A234]"
                              : "text-[#F5EDD6]/80 group-hover:text-[#C9A234] group-hover:translate-x-2"
                          } ${isOverview ? "text-[13px]" : ""}`}
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {label}
                        </span>

                        {/* Hover glow */}
                        <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_rgba(201,162,52,0.08)_0%,_transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(201,162,52,0.1); }
      `}</style>
    </>
  );
}
