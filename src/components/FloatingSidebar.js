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
      { label: "Wedding Ideas & Moods", id: "ideas-moods", num: "04" }
    ]
  },
  {
    title: "Tools",
    links: [
      { label: "Hashtag Generator", id: "hashtag-generator", num: "05" }
    ]
  },
  {
    title: "Social Proof",
    links: [
      { label: "What Our Couples Say", id: "couples-say", num: "06" }
    ]
  },
  {
    title: "Connect",
    links: [
      { label: "Begin Your Journey", id: "final-cta", num: "07" }
    ]
  }
];

export default function FloatingSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");

  // Single container ref — layers live INSIDE this
  const wrapperRef = useRef(null);
  const layer0Ref = useRef(null);
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const panelRef = useRef(null);
  const timelineRef = useRef(null);
  const busyRef = useRef(false);
  const openRef = useRef(false);

  // Active section detection
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
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    });

    return () => observer.disconnect();
  }, []);

  // GSAP setup — all refs inside one gsap.context
  useLayoutEffect(() => {
    let gsap;
    let ctx;

    // Dynamically import gsap to avoid SSR issues
    import("gsap").then((mod) => {
      gsap = mod.gsap || mod.default;

      const layers = [layer0Ref.current, layer1Ref.current, layer2Ref.current].filter(Boolean);
      const panel = panelRef.current;

      if (!panel || layers.length === 0) return;

      ctx = gsap.context(() => {
        // ── Initial hidden state ──────────────────────────────────────────
        gsap.set(wrapperRef.current, { visibility: "hidden" });
        gsap.set(layers, { xPercent: -100 });
        gsap.set(panel, { xPercent: -100 });
        gsap.set(".nav-item", {
          y: 80,
          rotationZ: 6,
          opacity: 0,
          transformOrigin: "left center",
        });
        gsap.set(".sidebar-header", { opacity: 0, y: -20 });

        // ── Build timeline ────────────────────────────────────────────────
        const tl = gsap.timeline({
          paused: true,
          defaults: { ease: "power4.out" },
          onStart: () => { busyRef.current = true; },
          onComplete: () => { busyRef.current = false; },
          onReverseComplete: () => {
            busyRef.current = false;
            gsap.set(wrapperRef.current, { visibility: "hidden" });
          },
        });

        tl
          // Make wrapper visible before anything moves
          .set(wrapperRef.current, { visibility: "visible" })

          // Layers slide in with stagger — all in SAME container so they stack correctly
          .to(layers, {
            xPercent: 0,
            duration: 0.7,
            stagger: 0.18,
            ease: "power3.out",
          })

          // Main panel enters slightly after last layer
          .to(
            panel,
            { xPercent: 0, duration: 0.75, ease: "power4.inOut" },
            "-=0.15"
          )

          // Header fades in
          .to(
            ".sidebar-header",
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.45"
          )

          // Nav items stagger up
          .to(
            ".nav-item",
            {
              y: 0,
              rotationZ: 0,
              opacity: 1,
              duration: 0.9,
              stagger: 0.07,
              ease: "expo.out",
            },
            "-=0.3"
          );

        timelineRef.current = tl;
      });
    });

    return () => ctx?.revert();
  }, []);

  // Play / reverse based on isOpen
  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;

    if (isOpen) {
      // Reset timeScale in case a previous close sped it up
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

  // Smooth scroll with easing
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
      {/* ── Trigger Button ─────────────────────────────────────────────── */}
      <button
        onClick={openSidebar}
        className="fixed top-[20px] left-[48px] z-[9999] hidden md:flex flex-col items-center justify-center gap-[4px] w-[32px] h-[32px] bg-[#1A1408] border border-[rgba(200,168,75,0.5)] cursor-pointer group hover:shadow-[0_0_15px_rgba(200,168,75,0.3)] transition-shadow duration-300"
        aria-label="Open navigation"
      >
        <span className="w-[14px] h-[1px] bg-[#C8A84B]" />
        <span className="w-[14px] h-[1px] bg-[#C8A84B]" />
        <span className="w-[14px] h-[1px] bg-[#C8A84B]" />
      </button>

      {/* ── Backdrop ───────────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] transition-opacity duration-700 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeSidebar}
      />

      {/* ── Single wrapper — layers + panel all live inside ────────────── */}
      {/*    This is the KEY FIX: one container, GSAP animates everything   */}
      {/*    inside the same coordinate space.                               */}
      <div
        ref={wrapperRef}
        className="fixed top-0 left-0 h-full w-[320px] z-[10001]"
        style={{ visibility: "hidden" }}
      >
        {/* Background layer 0 — darkest */}
        <div
          ref={layer0Ref}
          className="absolute inset-0 bg-[#0D0A04] shadow-[10px_0_30px_rgba(0,0,0,0.5)]"
        />
        {/* Background layer 1 */}
        <div
          ref={layer1Ref}
          className="absolute inset-0 bg-[#C9A234] shadow-[10px_0_30px_rgba(0,0,0,0.4)]"
        />
        {/* Background layer 2 */}
        <div
          ref={layer2Ref}
          className="absolute inset-0 bg-[#EDE8DC] shadow-[10px_0_30px_rgba(0,0,0,0.3)]"
        />

        {/* ── Main Panel — sits on top of layers ───────────────────────── */}
        <div
          ref={panelRef}
          className="absolute inset-0 bg-[#1A1408] border-r border-[#C8A84B]/10 flex flex-col overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="sidebar-header flex justify-between items-center px-10 pt-12 pb-8 sticky top-0 bg-[#1A1408] z-10">
            <p className="text-[#C8A84B] uppercase text-[12px] tracking-[0.3em] m-0 leading-none"
               style={{ fontFamily: "Georgia, serif" }}>
              Vows &amp; Vedas
            </p>
            <button
              onClick={closeSidebar}
              className="text-[#C8A84B] text-[24px] bg-transparent border-none cursor-pointer p-0 m-0 leading-none transition-all duration-500 hover:rotate-90 hover:text-white"
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
                    <div className="h-[0.5px] bg-[#C8A84B] flex-grow" />
                    <div className="w-1 h-1 bg-[#C8A84B] rotate-45 shrink-0" />
                    <p className="text-[#C8A84B] text-[9px] tracking-[0.25em] uppercase font-medium whitespace-nowrap">
                      {group.title}
                    </p>
                    <div className="w-1 h-1 bg-[#C8A84B] rotate-45 shrink-0" />
                    <div className="h-[0.5px] bg-[#C8A84B] flex-grow" />
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  {group.links.map(({ label, id, num }) => {
                    const isActive = activeId === id;
                    const isOverview = num === "00";
                    return (
                      <button
                        key={id}
                        onClick={() => handleScroll(id)}
                        className={`nav-item group relative flex items-center gap-5 text-left w-full bg-transparent border-none cursor-pointer m-0 py-0.5 transition-all duration-300 ${
                          isOverview ? "opacity-70" : ""
                        }`}
                      >
                        {/* Active dot */}
                        <span
                          className={`absolute left-[-18px] w-1 h-1 rounded-full bg-[#C8A84B] transition-all duration-500 ease-out ${
                            isActive
                              ? "opacity-100 scale-100"
                              : "opacity-0 scale-0 group-hover:opacity-40 group-hover:scale-75"
                          }`}
                        />

                        {/* Number */}
                        <span
                          className={`italic text-[11px] w-5 shrink-0 transition-colors duration-300 ${
                            isActive
                              ? "text-[#C8A84B]"
                              : "text-[#C8A84B]/60 group-hover:text-[#C8A84B]"
                          }`}
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {num}
                        </span>

                        {/* Label */}
                        <span
                          className={`text-[14px] leading-tight tracking-wide transition-all duration-500 ease-out ${
                            isActive
                              ? "text-[#C8A84B]"
                              : "text-[#F5EDD6]/80 group-hover:text-[#C8A84B] group-hover:translate-x-2"
                          } ${isOverview ? "text-[13px]" : ""}`}
                          style={{ fontFamily: "Georgia, serif" }}
                        >
                          {label}
                        </span>

                        {/* Hover glow */}
                        <span className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,_rgba(200,168,75,0.08)_0%,_transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
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
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(200,168,75,0.1); }
      `}</style>
    </>
  );
}
