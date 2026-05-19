"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import GoldDivider from "@/components/GoldDivider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function DestinationsPage() {
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

    // SVG path drawing animation
    const paths = document.querySelectorAll(".draw-path");
    paths.forEach((path) => {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: path,
          start: "top 90%",
        }
      });
    });
  }, []);

  const destinations = [
    { region: "India", name: "Beach and Backwater Weddings", count: "Goa, Kovalam, Varkala, Alleppey, Andaman Islands", img: "destination/beach-wedding-img.jpg", slug: "beach-weddings" },
    { region: "India", name: "Royal and Heritage", count: "Udaipur, Jaipur, Jodhpur, Jaisalmer, Neemrana, Ranthambore", img: "destination/TSR50334.jpg", slug: "royal-and-heritage" },
    { region: "India", name: "Hills Weddings", count: "Mussoorie, Shimla, Manali, Nainital, Coorg, Darjeeling", img: "destination/hills-image.jpg", slug: "hills-weddings" },
    { region: "India", name: "Cities and Metropolitans", count: "Mumbai, Delhi, Bangalore, Hyderabad, Kolkata", img: "destination/cities-wedding.jpg", slug: "cities-and-metropolitans" }
  ];

  return (
    <div>
      {/* PAGE HERO */}
      <div className="page-hero">
        <div 
          className="page-hero-bg" 
          style={{ backgroundImage: "url('/assets/photos/destination/TSR50334.jpg')", backgroundPosition: "center 35%" }}
        ></div>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <GoldDivider darkBg className="mb-4" />
          <p className="page-hero-eyebrow">Around the World</p>
          <h1 className="page-hero-title">Our <em className="italic">Destinations</em></h1>
          <GoldDivider darkBg flip className="mt-4" />
        </div>
      </div>

      {/* DESTINATIONS GRID */}
      <section className="py-24 px-12">
        <p className="section-label reveal">Where We Work</p>
        <h2 className="section-title reveal">Extraordinary <em className="italic">Locations</em></h2>
        <div className="dest-grid mt-16 grid grid-cols-1 md:grid-cols-2 gap-[12px] max-w-[1400px] mx-auto">
          {destinations.map((dest, i) => (
            <div key={i} className={`dest-card reveal stagger-${(i % 2) + 1} relative overflow-hidden h-[400px] md:h-[520px] rounded-[12px] group cursor-none`}>
              <div className="dest-bg absolute inset-0 bg-cover bg-center transition-transform duration-600 group-hover:scale-105" style={{ backgroundImage: `url('/assets/photos/${dest.img}')` }}></div>
              <div className="dest-overlay absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent transition-all duration-400 group-hover:bg-black/20"></div>
              <div className="dest-info absolute bottom-0 left-0 right-0 p-8 pb-10 translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                <p className="dest-region text-[9px] tracking-[0.5em] uppercase text-gold mb-2 font-medium">{dest.region}</p>
                <h3 className="dest-name font-heading text-surface text-4xl font-light mb-2">{dest.name}</h3>
                <p className="dest-count text-[10px] text-surface/50 tracking-[0.1em]">{dest.count}</p>
                <Link href={`/destinations/${dest.slug}`} className="dest-cta inline-block mt-4 px-6 py-2.5 border border-surface/50 text-surface text-[10px] tracking-[0.2em] uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-100 hover:bg-gold hover:border-gold">Explore →</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SCROLLING STRIP */}
      <div className="dest-strip bg-bg py-16 px-12 overflow-hidden border-y border-ink/5">
        <p className="strip-title text-[10px] tracking-[0.4em] uppercase text-gold mb-6 font-medium text-center">And many more</p>
        <div className="strip-track-wrapper overflow-hidden whitespace-nowrap">
          <div className="strip-track inline-block animate-scrollStrip hover:[animation-play-state:paused]">
            {[
              "Udaipur", "Santorini", "Tuscany", "Bali", "Goa", "Paris", "Maldives", "Mussoorie", "Sri Lanka", "Rishikesh",
              "Udaipur", "Santorini", "Tuscany", "Bali", "Goa", "Paris", "Maldives", "Mussoorie", "Sri Lanka", "Rishikesh"
            ].map((city, i) => (
              <span key={i} className="strip-item font-heading text-3xl font-light text-muted mx-6 inline-flex items-center gap-6 after:content-['✦'] after:text-gold after:text-[14px]">
                {city}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* WHY US */}
      <section id="why-us" className="bg-ink py-24 px-12">
        <p className="section-label reveal">Why Choose Us</p>
        <h2 className="section-title reveal text-surface">Experts in <em className="italic">Every Corner</em><br />of the World</h2>
        <div className="why-grid mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="why-item reveal stagger-1 text-center">
            <div className="why-icon w-[72px] h-[72px] mx-auto mb-7 relative">
              <svg viewBox="0 0 72 72" fill="none" className="w-full h-full">
                <circle cx="36" cy="36" r="35" stroke="#C9A234" strokeWidth="1" />
                <path d="M20 36 L36 20 L52 36 L36 52 Z" stroke="#C9A234" strokeWidth="1" fill="none" className="draw-path" />
              </svg>
            </div>
            <h3 className="why-title font-heading text-surface text-3xl mb-4">Global Network</h3>
            <p className="why-desc text-[12px] leading-[1.9] text-surface/50 font-light">Trusted vendor partnerships in 40+ destinations mean better rates, reliable quality, and local expertise wherever you choose to celebrate.</p>
          </div>
          <div className="why-item reveal stagger-2 text-center">
            <div className="why-icon w-[72px] h-[72px] mx-auto mb-7 relative">
              <svg viewBox="0 0 72 72" fill="none" className="w-full h-full">
                <circle cx="36" cy="36" r="35" stroke="#C9A234" strokeWidth="1" />
                <path d="M24 44 L30 38 L36 42 L44 28" stroke="#C9A234" strokeWidth="1.5" strokeLinecap="round" className="draw-path" />
              </svg>
            </div>
            <h3 className="why-title font-heading text-surface text-3xl mb-4">Local Expertise</h3>
            <p className="why-desc text-[12px] leading-[1.9] text-surface/50 font-light">We've celebrated in each destination we offer — understanding its seasons, suppliers, legal requirements, and hidden gem venues intimately.</p>
          </div>
          <div className="why-item reveal stagger-3 text-center">
            <div className="why-icon w-[72px] h-[72px] mx-auto mb-7 relative">
              <svg viewBox="0 0 72 72" fill="none" className="w-full h-full">
                <circle cx="36" cy="36" r="35" stroke="#C9A234" strokeWidth="1" />
                <circle cx="36" cy="36" r="12" stroke="#C9A234" strokeWidth="1" className="draw-path" />
                <path d="M36 24 L36 12 M36 48 L36 60 M24 36 L12 36 M48 36 L60 36" stroke="#C9A234" strokeWidth="1" className="draw-path" />
              </svg>
            </div>
            <h3 className="why-title font-heading text-surface text-3xl mb-4">End-to-End Care</h3>
            <p className="why-desc text-[12px] leading-[1.9] text-surface/50 font-light">From visa guidance to guest logistics, welcome hampers to departure transfers — we manage every detail so you can be fully present.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-bg py-24 px-12 text-center">
        <p className="section-label reveal">Your Destination Awaits</p>
        <h2 className="section-title reveal">Can't Decide?<br /><em className="italic">We'll Help You Choose.</em></h2>
        <p className="reveal text-[13px] text-muted font-light mb-10 max-w-[480px] mx-auto leading-[2]">Tell us your vibe, your guest count, your season — and we'll curate the perfect destination for your story.</p>
        <Link href="/contact" className="btn-gold reveal">Start the Conversation</Link>
      </section>

      <style jsx>{`
        @keyframes scrollStrip { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .animate-scrollStrip { animation: scrollStrip 30s linear infinite; display: inline-flex; width: max-content; }
      `}</style>
    </div>
  );
}
