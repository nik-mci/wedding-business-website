"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

export default function BlogPage() {
  const [activeCat, setActiveCat] = useState("all");
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef([]);

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

    // Reading progress bar
    const handleScroll = () => {
      const p = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      const prog = document.getElementById('reading-progress');
      if (prog) prog.style.width = p + '%';
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Position indicator
    const activeIndex = ["all", "destinations", "styling", "planning", "real-weddings"].indexOf(activeCat);
    const activeTab = tabsRef.current[activeIndex];
    if (activeTab) {
      setIndicatorStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth
      });
    }
  }, [activeCat]);

  const posts = [
    { id: 1, cat: "destinations", title: "Why Santorini is the Ultimate Destination for Indian Couples Abroad", excerpt: "The azure domes, cliff-edge terraces, and golden-hour light make Santorini a canvas unlike any other.", date: "March 18, 2025", read: "6 min read" },
    { id: 2, cat: "styling", title: "The Art of the Modern Mehendi: Traditions Reimagined", excerpt: "From minimalist Arabic patterns to full bridal storytelling sleeves — how contemporary brides are approaching mehendi design.", date: "February 28, 2025", read: "5 min read" },
    { id: 3, cat: "planning", title: "How to Budget for a Luxury Destination Wedding Abroad", excerpt: "A transparent breakdown of where couples typically spend — and where you can save without sacrificing magic.", date: "January 22, 2025", read: "7 min read" },
    { id: 4, cat: "real-weddings", title: "Aanya & Rohan's Udaipur Palace Wedding: A Full Recap", excerpt: "Three days, 400 guests, and a ceremony on the banks of Lake Pichola — every detail of this unforgettable celebration.", date: "December 12, 2024", read: "10 min read" },
    { id: 5, cat: "styling", title: "2025 Mandap Design Trends: Nature, Grandeur & Minimalism", excerpt: "This year's mandap aesthetics are moving toward organic textures, cascading florals, and structural restraint.", date: "November 5, 2024", read: "4 min read" },
    { id: 6, cat: "destinations", title: "Bali vs Maldives: Which Is Right for Your Destination Wedding?", excerpt: "We compare two of Southeast Asia's most sought-after destinations across venue, budget, and guest experience.", date: "October 18, 2024", read: "6 min read" }
  ];

  const filteredPosts = activeCat === "all" ? posts : posts.filter(p => p.cat === activeCat);

  return (
    <div className="pt-20 bg-surface min-h-screen">
      <div id="reading-progress" className="fixed top-[2px] left-0 h-[2px] bg-gold w-0 z-[9999] transition-[width] duration-100"></div>

      {/* FEATURED POST */}
      <div className="pt-10">
        <div className="featured-post grid grid-cols-1 md:grid-cols-2 min-h-[520px] mb-0.5">
          <div className="feat-image relative overflow-hidden group">
            <div className="feat-img-inner absolute inset-0 transition-transform duration-600 group-hover:scale-105">
              <Image 
                src="/assets/photos/destination/TSR50973.jpg" 
                alt="Featured post" 
                fill 
                className="object-cover"
              />
              <div className="feat-img-overlay absolute inset-0 bg-ink/20"></div>
            </div>
          </div>
          <div className="feat-content bg-surface p-16 flex flex-col justify-center border-l border-ink/5">
            <p className="feat-label text-[9px] tracking-[0.5em] uppercase text-gold mb-4 font-medium">Featured Story</p>
            <h2 className="feat-title font-heading text-ink text-5xl font-light leading-tight mb-5">Top 10 Destination Wedding Venues in India for 2025</h2>
            <p className="feat-meta text-[10px] tracking-[0.15em] text-ink/35 mb-8 uppercase font-medium">April 10, 2025 &nbsp;·&nbsp; Destinations &nbsp;·&nbsp; 8 min read</p>
            <p className="feat-excerpt text-[13px] leading-[2] text-muted font-light mb-9">From the mirror-work palaces of Udaipur to the misty haveli gardens of Jodhpur — we've curated the most extraordinary venues for your celebration this year.</p>
            <Link href="#" className="btn-gold self-start">Read Story</Link>
          </div>
        </div>
      </div>

      {/* ALL POSTS */}
      <section className="py-24 px-12">
        <div className="blog-tabs-wrapper relative mb-14 border-b border-ink/10">
          <div className="blog-tabs flex gap-0 relative">
            {["all", "destinations", "styling", "planning", "real-weddings"].map((cat, i) => (
              <button 
                key={cat}
                ref={el => tabsRef.current[i] = el}
                className={`blog-tab px-7 py-3.5 text-[11px] tracking-[0.18em] uppercase font-medium cursor-none transition-colors duration-300 ${activeCat === cat ? 'text-ink' : 'text-muted'}`} 
                onClick={() => setActiveCat(cat)}
              >
                {cat.replace('-', ' ')}
              </button>
            ))}
            <div 
              className="blog-tab-indicator absolute bottom-[-1px] h-[2px] bg-gold transition-all duration-400 ease-custom"
              style={indicatorStyle}
            ></div>
          </div>
        </div>

        <div className="blog-grid grid grid-cols-1 md:grid-cols-3 gap-0.5 bg-ink/5">
          {filteredPosts.map((post, i) => (
            <div 
              key={post.id} 
              className={`blog-card reveal stagger-${(i % 3) + 1} group cursor-none bg-surface`}
            >
              <div className="blog-img-wrap overflow-hidden aspect-[4/3] bg-ink/10">
                <div className="blog-img-inner relative w-full h-full transition-transform duration-600 group-hover:scale-105 flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-ink/10 to-ink/20"></div>
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(191,164,106,0.05)_20px,rgba(191,164,106,0.05)_21px)]"></div>
                  <span className="relative text-[9px] tracking-[0.3em] text-gold/40 uppercase font-medium">Blog Image</span>
                </div>
              </div>
              <div className="blog-body p-8 pt-7 pb-9">
                <p className="blog-cat text-[9px] tracking-[0.4em] uppercase text-gold mb-3 font-medium">{post.cat.replace('-', ' ')}</p>
                <Link href="#" className="blog-title font-heading text-ink text-2xl leading-snug mb-3 block relative group-hover:text-gold transition-colors duration-300 after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-400 group-hover:after:w-full">
                  {post.title}
                </Link>
                <p className="blog-excerpt text-[12px] leading-[1.8] text-muted font-light mb-5">{post.excerpt}</p>
                <div className="blog-meta text-[10px] text-ink/35 tracking-[0.1em] flex gap-4 uppercase font-medium">
                  <span>{post.date}</span>
                  <span>{post.read}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .blog-tab-indicator { transition: left .4s cubic-bezier(0.25, 0.46, 0.45, 0.94), width .4s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
      `}</style>
    </div>
  );
}
