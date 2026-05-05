"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import GoldDivider from "@/components/GoldDivider";
import CornerOrnament from "@/components/CornerOrnament";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const storyRef = useRef(null);

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

    // Story line fill animation
    gsap.to("#story-line-fill", {
      height: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: "#brand-story",
        start: "top center",
        end: "bottom center",
        scrub: true,
      }
    });

    // Story paragraphs reveal
    const paras = document.querySelectorAll(".story-para");
    paras.forEach((p, i) => {
      gsap.to(p, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: i * 0.15,
        scrollTrigger: {
          trigger: p,
          start: "top 85%",
        }
      });
    });

    // Count-up animation for stats
    const stats = document.querySelectorAll("[data-count]");
    stats.forEach((stat) => {
      const target = parseInt(stat.getAttribute("data-count"));
      const obj = { value: 0 };
      const span = stat.querySelector("span");
      const suffix = span ? span.textContent : "";
      
      gsap.to(obj, {
        value: target,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: stat,
          start: "top 90%",
        },
        onUpdate: () => {
          stat.innerHTML = Math.round(obj.value) + `<span>${suffix}</span>`;
        }
      });
    });

    // Parallax on about hero right
    gsap.to("#hero-right-bg", {
      yPercent: 15,
      ease: "none",
      scrollTrigger: {
        trigger: "#about-hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      }
    });
  }, []);

  return (
    <div className="pt-0">
      {/* SPLIT HERO */}
      <section id="about-hero" className="grid grid-cols-1 md:grid-cols-2 min-h-screen p-0">
        <div className="hero-left bg-bg flex flex-col justify-end items-center text-center p-16 pt-[140px] relative">
          <CornerOrnament size={44} inset={16} opacity={0.4} />

          {/* Decorative vertical motif in upper empty area */}
          <div className="absolute top-[18%] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none" style={{ opacity: 0.2, color: '#C9A234' }}>
            <div className="w-px h-20 bg-current"></div>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 1 L21 11 L11 21 L1 11 Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              <path d="M11 5 L17 11 L11 17 L5 11 Z" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.6"/>
              <circle cx="11" cy="11" r="1.5" fill="currentColor"/>
            </svg>
            <div className="w-px h-10 bg-current"></div>
          </div>

          <GoldDivider className="mb-5" />
          <p className="hero-left-eyebrow opacity-0 translate-y-6 text-[10px] tracking-[0.5em] uppercase font-medium mb-4" style={{ color: 'var(--color-gold)' }}>Our Story</p>
          <h1 className="hero-left-title opacity-0 translate-y-6 font-heading text-ink text-7xl font-light leading-[1.05]">Where <em className="italic">Vision</em><br />Meets <em className="italic">Devotion</em></h1>
          <GoldDivider flip className="mt-5" />
        </div>
        <div className="hero-right relative overflow-hidden hidden md:block">
          <div 
            id="hero-right-bg" 
            className="absolute inset-[-10%] bg-cover bg-center"
            style={{ backgroundImage: "url('/assets/photos/couple-shots/TSR53127.jpg')" }}
          ></div>
          <div className="absolute inset-0 bg-ink/20"></div>
        </div>
      </section>

      {/* BRAND STORY */}
      <GoldDivider variant="section" />
      <section className="py-16 px-12">
        <div className="flex flex-col items-center text-center mb-12">
          <GoldDivider className="mb-4 reveal" />
          <p className="section-label reveal">Our Journey</p>
        </div>
        <div id="brand-story" className="grid grid-cols-[60px_1fr] gap-12 max-w-[900px] mx-auto">
          <div className="story-line-wrap relative flex justify-center">
            <div className="story-line w-[1px] bg-ink/10 relative">
              <div id="story-line-fill" className="absolute top-0 left-0 w-[1px] bg-gold h-0 transition-all duration-100 linear"></div>
            </div>
          </div>
          <div className="story-paragraphs flex flex-col gap-10">
            <p className="story-para opacity-0 translate-y-4 transition-all duration-800 text-[17px] leading-[2] text-muted font-light">
              <strong className="text-ink font-medium font-heading text-[20px] italic">Founded on love itself,</strong> Vows & Vedas was born from a simple belief: that your wedding day should feel as extraordinary as the love that led you here.
            </p>
            <p className="story-para opacity-0 translate-y-4 transition-all duration-800 text-[17px] leading-[2] text-muted font-light">
              We began in 2015, with a small team and a single palace wedding in Udaipur. What started as a dream became a calling — and today we've crafted over 300 weddings across 40+ destinations worldwide.
            </p>
            <p className="story-para opacity-0 translate-y-4 transition-all duration-800 text-[17px] leading-[2] text-muted font-light">
              Our approach is deeply personal. We don't believe in templates. Every couple is a new story, every venue a new canvas. We listen before we plan, and we dream before we design.
            </p>
            <p className="story-para opacity-0 translate-y-4 transition-all duration-800 text-[17px] leading-[2] text-muted font-light">
              <strong className="text-ink font-medium font-heading text-[20px] italic">From the Himalayas to the Mediterranean,</strong> from intimate gardens to 1,000-guest palaces — we bring the same attention, creativity and care to every celebration we touch.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <GoldDivider variant="section" />
      <section id="values" className="bg-ink py-24 px-12">
        <div className="flex flex-col items-center text-center">
          <GoldDivider darkBg className="mb-4 reveal" />
          <p className="section-label reveal">What Drives Us</p>
          <h2 className="section-title reveal text-surface">Our <em className="italic">Values</em></h2>
          <GoldDivider darkBg flip className="mt-2 reveal" />
        </div>
        <div className="values-grid mt-16 grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {[
            { num: "01", name: "Intention", desc: "Every decision we make is purposeful. From the colour of the marigolds to the sequencing of the evening — nothing is accidental." },
            { num: "02", name: "Craft", desc: "We treat wedding design as an art form. Our team brings mastery, imagination and years of experience to every celebration." },
            { num: "03", name: "Devotion", desc: "We fall a little in love with every couple we work with. Your joy is our purpose — and it shows in everything we do." }
          ].map((val, i) => (
            <div key={i} className={`value-card reveal stagger-${i + 1}`}>
              <p className="value-num">{val.num}</p>
              <h3 className="value-name font-heading text-surface text-3xl mb-1 relative inline-block after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-gold after:transition-all after:duration-400 group-hover:after:w-full">{val.name}</h3>
              <p className="value-desc text-[12px] leading-[1.9] text-surface/50 font-light mt-5">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <GoldDivider variant="section" />
      <section id="stats" className="bg-bg py-24 px-12">
        <div className="flex flex-col items-center text-center mb-12">
          <GoldDivider className="mb-4 reveal" />
          <p className="section-label reveal">In Numbers</p>
          <h2 className="section-title reveal">A Decade of <em className="italic">Love Stories</em></h2>
          <GoldDivider flip className="mt-2 reveal" />
        </div>
        <div className="stats-row mt-4 grid grid-cols-2 md:grid-cols-4 gap-0.5">
          <div className="stat-item reveal stagger-1 bg-surface p-12 text-center relative"><CornerOrnament size={36} inset={10} opacity={0.4} /><p className="stat-num font-heading text-7xl font-light text-ink" data-count="300">0<span>+</span></p><p className="stat-label text-[10px] tracking-[0.3em] uppercase text-muted mt-3 font-medium">Weddings Crafted</p></div>
          <div className="stat-item reveal stagger-2 bg-surface p-12 text-center relative"><CornerOrnament size={36} inset={10} opacity={0.4} /><p className="stat-num font-heading text-7xl font-light text-ink" data-count="40">0<span>+</span></p><p className="stat-label text-[10px] tracking-[0.3em] uppercase text-muted mt-3 font-medium">Destinations</p></div>
          <div className="stat-item reveal stagger-3 bg-surface p-12 text-center relative"><CornerOrnament size={36} inset={10} opacity={0.4} /><p className="stat-num font-heading text-7xl font-light text-ink" data-count="10">0<span>+</span></p><p className="stat-label text-[10px] tracking-[0.3em] uppercase text-muted mt-3 font-medium">Years of Excellence</p></div>
          <div className="stat-item reveal stagger-4 bg-surface p-12 text-center relative"><CornerOrnament size={36} inset={10} opacity={0.4} /><p className="stat-num font-heading text-7xl font-light text-ink" data-count="98">0<span>%</span></p><p className="stat-label text-[10px] tracking-[0.3em] uppercase text-muted mt-3 font-medium">Couple Satisfaction</p></div>
        </div>
      </section>

      {/* TEAM */}
      <GoldDivider variant="section" />
      <section id="team" className="bg-bg py-24 px-12">
        <div className="flex flex-col items-center text-center">
          <GoldDivider className="mb-4 reveal" />
          <p className="section-label reveal">The People Behind The Magic</p>
          <h2 className="section-title reveal">Meet Our <em className="italic">Team</em></h2>
          <GoldDivider flip className="mt-2 reveal" />
        </div>
        <div className="team-grid mt-16 grid grid-cols-1 md:grid-cols-3 gap-0.5">
          {[
            { name: "Ananya Sharma", role: "Founder & Creative Director", vibe: "Every wedding is a love letter to the future.", color: "linear-gradient(135deg, #2a2518 0%, #1a1608 100%)" },
            { name: "Rahul Mehta", role: "Décor & Design Lead", vibe: "Beauty is in the details no one else notices.", color: "linear-gradient(135deg, #1e2018 0%, #0e1008 100%)" },
            { name: "Priya Nair", role: "Destination Specialist", vibe: "The world is full of perfect wedding venues — let me find yours.", color: "linear-gradient(135deg, #2a1a20 0%, #1a0a10 100%)" }
          ].map((member, i) => (
            <div key={i} className={`team-card reveal stagger-${i + 1} group cursor-none`}>
              <div className="team-photo aspect-[3/4] relative overflow-hidden transition-all duration-400 group-hover:brightness-110" style={{ background: member.color }}>
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(191,164,106,0.05)_20px,rgba(191,164,106,0.05)_21px)]"></div>
                <div className="team-overlay absolute inset-0 bg-gradient-to-t from-black/85 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-8">
                  <div className="team-info translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                    <p className="team-name font-heading text-surface text-3xl">{member.name}</p>
                    <p className="team-role text-[10px] tracking-[0.3em] text-gold mt-1 uppercase">{member.role}</p>
                    <p className="team-vibe text-[11px] text-surface/60 mt-2 font-light italic">"{member.vibe}"</p>
                  </div>
                </div>
              </div>
              <div className="team-static py-6 pb-2">
                <h4 className="font-heading text-ink text-2xl">{member.name}</h4>
                <p className="text-[10px] tracking-[0.25em] uppercase text-gold mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style jsx>{`
        .hero-left-eyebrow { animation: fadeUp .8s .3s both; }
        .hero-left-title { animation: fadeUp .9s .5s both; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        
        .value-card { background: #252220; padding: 56px 40px; border-bottom: 2px solid transparent; transition: border-color .3s, transform .3s; }
        .value-card:hover { border-color: var(--color-gold); transform: translateY(-4px); }
        .value-num { font-family: var(--font-heading); font-size: 64px; color: rgba(191,164,106,0.15); font-weight: 300; line-height: 1; margin-bottom: 24px; }
        .value-name::after { content:''; position:absolute; bottom:-4px; left:0; width:0; height:1px; background:var(--color-gold); transition:width .4s var(--ease-custom); }
        .value-card:hover .value-name::after { width: 100%; }
        
        .stat-num span { color: var(--color-gold); }
      `}</style>
    </div>
  );
}
