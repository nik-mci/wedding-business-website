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
  const containerRef = useRef(null);

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

    // Count-up animation for stats in MCI Legacy
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
  }, []);

  return (
    <div ref={containerRef} className="pt-0">
      {/* SPLIT HERO */}
      <section id="about-hero" className="grid grid-cols-1 md:grid-cols-2 min-h-screen p-0">
        <div className="hero-left bg-bg flex flex-col justify-end items-center text-center p-16 pt-[140px] relative w-full">
          <CornerOrnament size={44} inset={16} opacity={0.4} />

          {/* Decorative vertical motif */}
          <div className="absolute top-[18%] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none" style={{ opacity: 0.2, color: '#C9A234' }}>
            <div className="w-px h-20 bg-current"></div>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M11 1 L21 11 L11 21 L1 11 Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              <path d="M11 5 L17 11 L11 17 L5 11 Z" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.6"/>
              <circle cx="11" cy="11" r="1.5" fill="currentColor"/>
            </svg>
            <div className="w-px h-10 bg-current"></div>
          </div>

          <div className="flex flex-col items-center w-full" style={{ textAlign: 'center' }}>
            <GoldDivider className="mb-5" />
            <p className="hero-left-eyebrow opacity-0 translate-y-6 text-[10px] tracking-[0.5em] uppercase font-medium mb-4" style={{ color: 'var(--color-gold)' }}>Our Story</p>
            <h1 className="hero-left-title opacity-0 translate-y-6 font-heading text-ink text-7xl font-light leading-[1.05]">Where <em className="italic">Vision</em><br />Meets <em className="italic">Devotion</em></h1>
            <GoldDivider flip className="mt-5" />
          </div>
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

      {/* SECTION 1 — BRAND INTRO */}
      <section className="bg-[#FDFAF5] py-12 md:py-16 px-12 relative border-l-4 border-gold/40">
        <div className="max-w-[900px] mx-auto reveal">
          <div className="flex items-center gap-4 mb-10 opacity-30">
            <div className="h-[0.5px] bg-[#C8A84B] w-12"></div>
            <div className="w-1.5 h-1.5 bg-[#C8A84B] rotate-45 shrink-0"></div>
          </div>
          <p className="text-[22px] md:text-[26px] leading-[1.8] text-ink font-light font-heading italic">
            'Some love stories deserve more than just a wedding. They deserve an experience — one that is as timeless as the vows exchanged and as sacred as the rituals that bind two souls together. At Vows & Vedas, we craft weddings that go beyond the ordinary. Every celebration we design is deeply personal, meticulously planned, and flawlessly executed — because we believe your wedding day should feel exactly the way you always imagined it.'
          </p>
        </div>
      </section>

      {/* SECTION 2 — TWO COLUMN SPLIT */}
      <section className="bg-[#FDFAF5] grid grid-cols-1 md:grid-cols-2 p-0 border-t border-ink/5 relative">
        {/* Vertical Divider Ornament */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[70%] w-px bg-[#C8A84B]/20 hidden md:flex flex-col items-center justify-center">
          <div className="w-1.5 h-1.5 bg-[#C8A84B]/40 rotate-45"></div>
        </div>

        <div className="p-12 md:p-16 border-b md:border-b-0 flex flex-col justify-center reveal">
          <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4 font-medium">Our Story</p>
          <h2 className="font-heading text-ink text-5xl md:text-6xl mb-4 leading-[1.1]">Born in 2015.<br /><em className="italic">Built on love.</em></h2>
          <p className="text-muted text-[14px] leading-[1.8] font-light max-w-[460px]">
            Vows & Vedas was born from a singular passion — to redefine the Indian wedding experience. What began as a dream to create deeply meaningful celebrations has grown into one of India's most trusted names in luxury wedding planning. Our journey has been built on love — for detail, for culture, for storytelling, and above all, for the couples who place their trust in us.
          </p>
        </div>
        <div className="p-12 md:p-16 flex flex-col justify-center reveal stagger-1">
          <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4 font-medium">What Makes Us Different</p>
          <h2 className="font-heading text-ink text-5xl md:text-6xl mb-4 leading-[1.1] italic">We don't plan weddings.<br /><em className="not-italic font-light">We build worlds.</em></h2>
          <p className="text-muted text-[14px] leading-[1.8] font-light max-w-[460px]">
            Every Vows & Vedas wedding is shaped by your story, your family, your culture, and your vision — from intimate shores of Goa to royal palaces of Jaipur to clifftops of Santorini. We bring it to life with precision and poetry.
          </p>
        </div>
      </section>

      {/* SECTION 3 — MCI LEGACY */}
      <section className="bg-[#1a1200] py-12 md:py-14 px-12 relative overflow-hidden">
        <CornerOrnament size={60} inset={20} opacity={0.3} strokeWidth={1.5} />
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-center">
          <div className="reveal">
            <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4 font-medium">The MCI Legacy</p>
            <h2 className="font-heading text-surface text-5xl md:text-6xl leading-[1.1]">37 Years of<br /><em className="italic">Industry Excellence</em></h2>
          </div>
          <div className="reveal stagger-1 flex flex-col justify-center">
            <div className="flex flex-col gap-4 mb-8">
              <p className="text-surface/70 text-[14px] md:text-[15px] leading-[1.7] font-light">
                We are proud to be part of the MCI family — a 37-year-old powerhouse in the events and experiences industry, with a team of over 150 dedicated professionals across specialised divisions.
              </p>
              <p className="text-surface/70 text-[14px] md:text-[15px] leading-[1.7] font-light">
                This heritage gives Vows & Vedas an unmatched foundation — the agility of a boutique wedding house backed by the muscle and expertise of an industry leader. From logistics to creative direction, every team that works behind the scenes is best in class.
              </p>
            </div>
            <div className="flex flex-wrap gap-10 pt-0">
              <div className="stat-item reveal stagger-1" data-count="150">
                <p className="font-heading italic text-gold text-3xl md:text-4xl mb-1">0<span>+</span></p>
                <p className="text-[9px] tracking-[0.2em] uppercase text-surface/40 font-medium">Professionals</p>
              </div>
              <div className="stat-item reveal stagger-2" data-count="37">
                <p className="font-heading italic text-gold text-3xl md:text-4xl mb-1">0</p>
                <p className="text-[9px] tracking-[0.2em] uppercase text-surface/40 font-medium">Years of Legacy</p>
              </div>
              <div className="stat-item reveal stagger-3" data-count="300">
                <p className="font-heading italic text-gold text-4xl mb-1">0<span>+</span></p>
                <p className="text-[9px] tracking-[0.2em] uppercase text-surface/40 font-medium">Weddings Crafted</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIVIDER — EMBEDDED IN DARK THEME */}
      <div className="bg-[#1a1200] py-4 flex items-center justify-center relative z-10">
        <GoldDivider variant="section" darkBg className="opacity-100" />
      </div>

      {/* SECTION 4 — VALUES */}
      <section id="values" className="bg-ink py-16 md:py-20 px-12 border-none">
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

      {/* SECTION 5 — TEAM */}
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

      {/* SECTION 6 — OUR PROMISE */}
      <section className="bg-[#1a1200] py-32 px-12 relative overflow-hidden flex flex-col items-center text-center">
        <CornerOrnament size={80} inset={30} opacity={0.1} />
        <div className="max-w-[800px] reveal flex flex-col items-center">
          <p className="text-gold text-[10px] tracking-[0.6em] uppercase mb-8 font-medium">Our Promise</p>
          <GoldDivider darkBg className="mb-10" />
          <h2 className="font-heading text-[#FDFAF5] text-[28px] md:text-[34px] leading-[1.7] italic font-light mb-10">
            'When you choose Vows & Vedas, you are not just hiring a wedding planner. You are gaining a partner — one who will hold your vision with the same care and emotion as you do, from the first conversation to the last dance.'
          </h2>
          <p className="text-gold/50 text-[11px] tracking-[0.25em] uppercase font-light mb-12">
            Because it is not just your wedding. It is your story. And we are here to make sure it is told beautifully.
          </p>
          <Link 
            href="/contact" 
            className="btn-gold"
          >
            Begin Your Journey
          </Link>
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
      `}</style>
    </div>
  );
}
