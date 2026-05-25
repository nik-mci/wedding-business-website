"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import GoldDivider from "@/components/GoldDivider";
import CornerOrnament from "@/components/CornerOrnament";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef(null);
  const [expandedBio, setExpandedBio] = useState({});
  const [expandedTeam, setExpandedTeam] = useState(null);
  const toggleBio = (i) => setExpandedBio(prev => ({ ...prev, [i]: !prev[i] }));
  const toggleTeam = (i) => setExpandedTeam(prev => (prev === i ? null : i));

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

    // Count-up animation for stats in GeTSHolidays Legacy
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
        <div className="hero-left bg-bg flex flex-col justify-center items-center text-center p-16 pt-[140px] relative w-full">
          <CornerOrnament size={44} inset={16} opacity={0.4} />

          {/* Decorative vertical motif — anchored near top, clear of content */}
          <div className="absolute top-[8%] left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none" style={{ opacity: 0.22, color: '#C9A234' }}>
            <div className="w-px h-12 bg-current"></div>
            <svg width="18" height="18" viewBox="0 0 22 22" fill="none">
              <path d="M11 1 L21 11 L11 21 L1 11 Z" stroke="currentColor" strokeWidth="1.2" fill="none"/>
              <path d="M11 5 L17 11 L11 17 L5 11 Z" stroke="currentColor" strokeWidth="0.7" fill="none" opacity="0.6"/>
              <circle cx="11" cy="11" r="1.5" fill="currentColor"/>
            </svg>
            <div className="w-px h-5 bg-current"></div>
          </div>

          <div className="flex flex-col items-center w-full text-center">
            <GoldDivider className="mb-3" />
            <p className="hero-left-eyebrow opacity-0 translate-y-6 text-[10px] tracking-[0.5em] uppercase font-medium mb-1" style={{ color: 'var(--color-gold)' }}>Our Story</p>
            <h1 className="hero-left-title opacity-0 translate-y-6 font-heading text-ink text-7xl font-light leading-none tracking-[-0.02em]">
              <span className="block">Where <em className="italic">Design</em></span>
              <span className="flex items-center justify-center gap-3 py-[10px]">
                <span className="w-8 h-px bg-[#C9A234] opacity-50"></span>
                <span className="w-[5px] h-[5px] rounded-full bg-[#C9A234] opacity-65 flex-shrink-0"></span>
                <span className="w-8 h-px bg-[#C9A234] opacity-50"></span>
              </span>
              <span className="block">Meets <em className="italic">Detail</em></span>
            </h1>
            <GoldDivider flip className="mt-8" />
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
      <section className="bg-[#FDFAF5] py-8 md:py-10 px-12 relative border-l-4 border-gold/40">
        <div className="max-w-[900px] mx-auto reveal">
          <div className="flex items-center gap-4 mb-10 opacity-30">
            <div className="h-[0.5px] bg-[#C8A84B] w-12"></div>
            <div className="w-1.5 h-1.5 bg-[#C8A84B] rotate-45 shrink-0"></div>
          </div>
          <p className="text-[22px] md:text-[26px] leading-[1.8] text-ink font-light font-heading italic">
            'Some love stories deserve more than just a wedding. They deserve an experience, one that is as timeless as the vows exchanged and as sacred as the rituals that bind two souls together. At Vows & Vedas, we craft weddings that go beyond the ordinary. Every celebration we design is deeply personal, meticulously planned, and flawlessly executed, because we believe your wedding day should feel exactly the way you always imagined it.'
          </p>
        </div>
      </section>

      {/* SECTION 2 — TWO COLUMN SPLIT */}
      <section className="bg-[#FDFAF5] grid grid-cols-1 md:grid-cols-2 p-0 border-t border-ink/5 relative">
        {/* Vertical Divider Ornament */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[70%] w-px bg-[#C8A84B]/20 hidden md:flex flex-col items-center justify-center">
          <div className="w-1.5 h-1.5 bg-[#C8A84B]/40 rotate-45"></div>
        </div>

        <div className="p-8 md:p-11 border-b md:border-b-0 flex flex-col justify-center reveal">
          <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4 font-medium">Our Story</p>
          <h2 className="font-heading text-ink text-5xl md:text-6xl mb-4 leading-[1.1]">Born in 2015.<br /><em className="italic">Built on love.</em></h2>
          <p className="text-muted text-[14px] leading-[1.8] font-light max-w-[460px]">
            Vows & Vedas was born from a singular passion to redefine the Indian wedding experience. What began as a dream to create deeply meaningful celebrations has grown into one of India's most trusted names in luxury wedding planning. Our journey has been built on love for detail, for culture, for storytelling, and above all, for the couples who place their trust in us.
          </p>
        </div>
        <div className="p-8 md:p-11 flex flex-col justify-center reveal stagger-1">
          <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4 font-medium">What Makes Us Different</p>
          <h2 className="font-heading text-ink text-5xl md:text-6xl mb-4 leading-[1.1] italic">We don't just plan weddings.</h2>
          <p className="text-muted text-[14px] leading-[1.8] font-light max-w-[460px]">
            Every Vows & Vedas wedding is shaped by your story, your family, your culture, and your vision, from intimate shores of Goa to royal palaces of Jaipur. We bring it to life with precision and poetry.
          </p>
        </div>
      </section>

      {/* SECTION 3 — GeTSHolidays LEGACY */}
      <section className="bg-[#1a1200] py-8 md:py-10 px-12 relative overflow-hidden">
        <CornerOrnament size={60} inset={20} opacity={0.3} strokeWidth={1.5} />
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-center">
          <div className="reveal">
            <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-4 font-medium">The GeTSHolidays Legacy</p>
            <h2 className="font-heading text-surface text-5xl md:text-6xl leading-[1.1]">37 Years of<br /><em className="italic">Industry Excellence</em></h2>
          </div>
          <div className="reveal stagger-1 flex flex-col justify-center">
            <div className="flex flex-col gap-4 mb-8">
              <p className="text-surface/70 text-[14px] md:text-[15px] leading-[1.7] font-light">
                We are proud to be part of the GeTSHolidays family, a 37-year-old powerhouse in the events, Travel and experiences industry, with a team of over 150 dedicated professionals across specialised divisions.
              </p>
              <p className="text-surface/70 text-[14px] md:text-[15px] leading-[1.7] font-light">
                This heritage gives Vows & Vedas an unmatched foundation: the agility of a boutique wedding house backed by the muscle and expertise of an industry leader. From logistics to creative direction, every team that works behind the scenes is best in class.
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

      {/* SECTION 4+5 — OUR TEAM (unified) */}
      <section id="our-team" className="bg-ink border border-[#C9A234]/30 rounded-2xl mx-6 md:mx-12 my-8 shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden">

        {/* Shared section header */}
        <div className="pt-8 pb-6 px-12 flex flex-col items-center text-center">
          <GoldDivider darkBg className="mb-4 reveal" />
          <p className="section-label reveal">The People Behind Vows &amp; Vedas</p>
          <h2 className="section-title reveal text-surface">Our <em className="italic">Team</em></h2>
          <GoldDivider darkBg flip className="mt-2 reveal" />
        </div>

        {/* TIER 1 — Your Planning Team */}
        <div className="px-12 pb-8">
          <div className="flex flex-col items-center text-center mb-6 reveal">
            <p className="text-[9px] tracking-[0.45em] uppercase font-medium mb-2" style={{ color: 'var(--color-gold)' }}>Who You'll Work With</p>
            <h3 className="font-heading text-surface text-3xl md:text-4xl font-light">Your Planning <em className="italic">Team</em></h3>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-start">
            {[
              {
                name: "Manmeet Soundh",
                role: "Creative Planning",
                vibe: "Where emotion meets elegance, the extraordinary begins.",
                bio: "With over two decades of experience in the experiential and luxury wedding industry, Manmeet Soundh is the creative force behind Vows & Vedas, crafting celebrations that beautifully blend emotion, elegance and the art of curating rare moments.\n\nKnown for transforming concepts into timeless wedding experiences, his signature style reflects contemporary luxury, refined aesthetics and detail-driven storytelling.",
                image: "/assets/photos/about-us/383c1d15-b27d-4b3a-934c-0e9b8db51f7d.JPG",
                imagePosition: "center top"
              },
              {
                name: "Arunima",
                role: "Planning",
                vibe: "Precision behind the scenes, magic in every moment.",
                bio: "A part time side hustle of managing hospitality teams at weddings made her fall in love with bringing couples' dreams to life and making their most special day extra special and stress free. The 7 years of blending corporate precision with on-the-ground execution help her turn complex logistics into effortless, beautiful celebrations.\n\nShe looks at wedding planning through two lenses: impeccable, on-ground hospitality and sharp, strategic organisation. You get the best of both worlds: a beautifully cohesive and a highly personalised experience.",
                image: "/assets/photos/about-us/40c37516-6448-4c5e-929f-27cd4132fe0e.JPG",
                imagePosition: "center top"
              },
              {
                name: "Rukmini",
                role: "Design and Decor",
                vibe: "Every detail tells part of your story.",
                bio: "Rukmini brings a refined eye for design and decor to every celebration, translating mood, culture, and personal style into spaces that feel intentional, luxurious, and unmistakably yours. From floral language to lighting, textures, and tablescapes, she ensures every visual element works in harmony with your wedding narrative.",
                image: "/assets/photos/about-us/7184c718-f5e6-4054-b35b-e56bc79213a5.JPG",
                imagePosition: "center 20%"
              }
            ].map((member, i) => (
              <div key={i} className={`reveal stagger-${i + 1} group`} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '2px' }}>
                <div className="aspect-[1/1] relative overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    style={{ objectPosition: member.imagePosition }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6">
                    <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-400">
                      <p className="font-heading text-surface text-2xl">{member.name}</p>
                      <p className="text-[9px] tracking-[0.3em] text-gold mt-1 uppercase">{member.role}</p>
                      <p className="text-[11px] text-surface/60 mt-2 font-light italic">"{member.vibe}"</p>
                    </div>
                  </div>
                </div>

                <div className="pt-5 px-5 pb-5">
                  <h4 className="font-heading text-surface text-xl leading-tight">{member.name}</h4>
                  <p className="text-[9px] tracking-[0.3em] uppercase text-gold mt-1 font-medium">{member.role}</p>
                  <div className="h-px bg-[#C9A234]/30 mt-3"></div>

                  <div className={`bio-panel overflow-hidden transition-[max-height] duration-500 ease-in-out${expandedBio[i] ? ' bio-open' : ''}`}>
                    <p className="text-[12px] leading-[1.85] text-surface/60 font-light pt-4 pb-6 whitespace-pre-line">{member.bio}</p>
                  </div>

                  <button
                    className="hidden md:block text-[9px] tracking-[0.35em] uppercase font-medium mt-3 bg-transparent border-0 p-0 cursor-pointer bio-toggle"
                    style={{ color: 'var(--color-gold)' }}
                    onClick={() => toggleBio(i)}
                  >
                    {expandedBio[i] ? 'Less' : '+ Read more'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bridging sentence */}
        <div className="py-8 px-12 flex flex-col items-center text-center reveal">
          <div className="h-px w-16 bg-[#C9A234]/30 mb-6"></div>
          <p className="font-heading italic text-surface/50 text-[18px] md:text-[20px] leading-[1.7] max-w-lg">
            Behind every celebration, the specialised teams that bring it all together.
          </p>
          <div className="h-px w-16 bg-[#C9A234]/30 mt-6"></div>
        </div>

        {/* TIER 2 — The Operational Backbone */}
        <div className="px-12 pb-10">
          <div className="flex flex-col items-center text-center mb-6 reveal">
            <p className="text-[9px] tracking-[0.45em] uppercase font-medium mb-2" style={{ color: 'var(--color-gold)' }}>The Operational Backbone</p>
            <h3 className="font-heading text-surface text-3xl md:text-4xl font-light">Behind Every <em className="italic">Wedding</em></h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px">
            {[
              {
                name: "Travel & Transport",
                desc: "Our dedicated logistics team brings efficient fleet management to your wedding day. Managing everything from travel ticketing to VIP arrivals to welcoming to multi-venue guest shuttles, they ensure perfectly timed, stress-free transit.\n\nWe guarantee your guests experience seamless, hospitality-driven travel from arrival to departure.",
                image: "/assets/photos/destination/beach-wedding-img.jpg"
              },
              {
                name: "Hotel & Venue Procurement",
                desc: "Leveraging years of global corporate negotiations, this team secures the finest luxury venues and room blocks at unmatched value. They handle complex contracting, attrition clauses and finer details effortlessly.\n\nThis means elevated insider perks and a completely seamless, legally secure booking experience.",
                image: "/assets/photos/destination/pool_venue.jpg"
              },
              {
                name: "Operations & Event Production",
                desc: "The technical powerhouse, this division converts ambitious creative visions into structurally flawless realities. They manage high-stakes timelines, sound, lighting, and vendor coordination with absolute military precision.\n\nTheir vast experience guarantees your wedding day runs like clockwork, entirely behind the scenes.",
                image: "/assets/photos/services/decoration/sangeet_decoration.jpg"
              }
            ].map((team, i) => (
              <div key={i} className={`ts-card reveal stagger-${i + 1}`}>
                <div className="aspect-video overflow-hidden">
                  <img src={team.image} alt={team.name} className="ts-card-img w-full h-full object-cover" />
                </div>
                <div className="h-px bg-[#C9A234]/35"></div>
                <div className="p-6 md:p-7">
                  <h3 className="font-heading text-surface text-[28px] font-light leading-tight mb-3">{team.name}</h3>
                  {expandedTeam === i && (
                    <p
                      className="text-[13px] leading-[1.75] font-light whitespace-pre-line mb-4"
                      style={{ color: 'rgba(253,250,245,0.55)' }}
                    >
                      {team.desc}
                    </p>
                  )}
                  <button
                    type="button"
                    className="text-[9px] tracking-[0.35em] uppercase font-medium bg-transparent border-0 p-0 cursor-pointer bio-toggle"
                    style={{ color: 'var(--color-gold)' }}
                    onClick={() => toggleTeam(i)}
                    aria-expanded={expandedTeam === i}
                  >
                    {expandedTeam === i ? 'Less' : '+ Read more'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* SECTION 6 — OUR PROMISE */}
      <section className="bg-[#1a1200] py-16 md:py-20 px-12 relative overflow-hidden flex flex-col items-center text-center">
        <CornerOrnament size={80} inset={30} opacity={0.1} />
        <div className="max-w-[800px] reveal flex flex-col items-center">
          <p className="text-gold text-[10px] tracking-[0.6em] uppercase mb-8 font-medium">Our Promise</p>
          <GoldDivider darkBg className="mb-10" />
          <h2 className="font-heading text-[#FDFAF5] text-[28px] md:text-[34px] leading-[1.7] italic font-light mb-10">
            'When you choose Vows & Vedas, you are not just hiring a wedding planner. You are choosing a partner, one who will hold your vision with the same care and emotion as you do, from the first conversation to the last dance.'
          </h2>
          <p className="text-[#FDFAF5]/90 text-[12px] md:text-[13px] tracking-[0.22em] uppercase font-normal mb-12 leading-[1.9]">
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
        
        .ts-card { border: 1px solid rgba(201,162,52,0.28); overflow: hidden; transition: border-color .35s, transform .35s; }
        .ts-card:hover { border-color: rgba(201,162,52,0.6); transform: translateY(-4px); }
        .ts-card-img { transition: transform .7s ease; }
        .ts-card:hover .ts-card-img { transform: scale(1.04); }

        .bio-panel { max-height: 300px; }
        @media (min-width: 768px) { .bio-panel { max-height: 0; } .bio-panel.bio-open { max-height: 300px; } }
        .bio-toggle { opacity: 0.75; transition: opacity .2s; }
        .bio-toggle:hover { opacity: 1; }
      `}</style>
    </div>
  );
}
