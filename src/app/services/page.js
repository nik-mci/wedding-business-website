"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GoldDivider from "@/components/GoldDivider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    num: "01",
    title: "Destination Weddings",
    shortLabel: "Destinations",
    category: "Signature Offering",
    desc: "From the palace gardens of Rajasthan to the cliffsides of Santorini and the pristine beaches of Goa, we craft extraordinary ceremonies in the world's most breathtaking locations.",
    checklist: [
      "Venue scouting & negotiation worldwide",
      "Guest travel & logistics management",
      "Local vendor network in 40+ destinations",
      "Legal ceremony documentation",
      "Royal procession with elephants, horses & drum players",
      "Devigarh Palace & Taj Exotica as signature venues"
    ],
    img: "destination/TSR50501.jpg",
    reverse: false,
    anchor: "destination-weddings"
  },
  {
    num: "02",
    title: "Full Planning",
    shortLabel: "Full Planning",
    category: "Planning · Logistics",
    desc: "From your initial vision to breathtaking reality, our dedicated team of professionals pays meticulous attention to every detail, orchestrating a flawless journey so you can simply celebrate.",
    checklist: [
      "Venue selection across Rajasthan, Goa & Kerala",
      "Themed weddings — royal, fairytale, or colour-specific",
      "Wedding calendar & itinerary management",
      "Bridal trousseau coordination with professional designers"
    ],
    img: "couple-shots/TSR53067.jpg",
    reverse: true,
    anchor: "full-planning"
  },
  {
    num: "03",
    title: "Décor & Florals",
    shortLabel: "Décor",
    category: "Design · Florals",
    desc: "We use exquisite fresh florals and artistic lighting to elevate every element of décor, transforming your venue into an immersive, bespoke environment that tells your unique story.",
    checklist: [
      "Fresh roses, orchids, marigolds & gerberas",
      "Mandap floral decoration around Havankund",
      "Artistic lighting design for each theme",
      "Customised décor for indoor and outdoor venues"
    ],
    img: "services/decoration/haldi_flowers_decor.jpg",
    reverse: false,
    anchor: "decor-florals"
  },
  {
    num: "04",
    title: "Film & Photography",
    shortLabel: "Film & Photo",
    category: "Storytelling",
    desc: "Our professional photographers and videographers are appointed to beautifully capture every propitious moment, preserving your milestones with raw emotion and cinematic precision.",
    checklist: [
      "Pre-wedding & engagement shoots",
      "Multi-camera ceremony & reception coverage",
      "Feature film & same-day edit",
      "Aerial & drone cinematography"
    ],
    img: "couple-shots/TSR53178.jpg",
    reverse: true,
    anchor: "film-photography"
  },
  {
    num: "05",
    title: "Entertainment & DJ",
    shortLabel: "Entertainment",
    category: "Performance · Music",
    desc: "Song and dance are seamlessly woven into every celebration. From traditional performances to modern acts, we fill your milestones with energy, soul, and unforgettable moments.",
    checklist: [
      "Native & folk dancers",
      "Live shenai & traditional music",
      "Cultural programme curation",
      "DJ & contemporary entertainment"
    ],
    img: "services/entertainment/performances.jpg",
    reverse: false,
    anchor: "entertainment-dj"
  },
  {
    num: "06",
    title: "Fireworks & SFX",
    shortLabel: "Fireworks",
    category: "Spectacle",
    desc: "A spectacular firework display that illuminates the night sky, adding an explosive touch of magic and ensuring your occasion remains truly unforgettable.",
    checklist: [
      "Customized aerial firework displays",
      "Cold pyro for entry and first dance",
      "Confetti cannons & special effects",
      "Timed to ceremony moments",
      "Indoor-safe sparkler options",
      "Coordinated with photography team"
    ],
    img: "destination/hospitality2.jpg",
    reverse: true,
    anchor: "fireworks-sfx"
  },
  {
    num: "07",
    title: "Hospitality & Guest Management",
    shortLabel: "Hospitality",
    category: "Guest Experience",
    desc: "We provide seamless, white-glove hospitality from airport arrival to departure, ensuring that every guest experiences unparalleled comfort and is treated like royalty.",
    checklist: [
      "Airport transfers & city representatives",
      "Accommodation from 5-star palaces to boutique stays",
      "Limousine with floral decoration for grand entrances",
      "On-ground coordinators at every destination"
    ],
    img: "couple-shots/0G4A2084.jpg",
    reverse: false,
    anchor: "hospitality"
  }
];

const addons = [
  { img: "services/decoration/printables2.jpg", name: "E-Invites", desc: "Custom digital wedding invitations with RSVP tracking and animated reveals." },
  { img: "services/decoration/059A4328.jpg", name: "Vendor Management", desc: "End-to-end coordination with our curated network of top-tier partners and artisans." },
  { img: "services/mehendi.jpg", name: "Mehendi & Styling", desc: "Intricate bridal henna and comprehensive head-to-toe styling for you and your guests." },
  { img: "couple-shots/0G4A4811.jpg", name: "Logistics & Transport", desc: "Seamless guest transportation, luxury fleet management, and venue logistics." }
];

export default function ServicesPage() {
  const [activeAnchor, setActiveAnchor] = useState(services[0].anchor);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reveals = document.querySelectorAll(".reveal");
      reveals.forEach((el) => {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            onEnter: () => el.classList.add("visible")
          }
        });
      });

      const checklists = document.querySelectorAll("[data-checklist]");
      checklists.forEach((list) => {
        const items = list.querySelectorAll("li");
        gsap.set(items, { opacity: 0, x: -15 });
        gsap.to(items, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: { trigger: list, start: "top 85%" }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
        setShowBackToTop(window.scrollY > 600);
        raf = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-svc-anchor]");
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveAnchor(entry.target.dataset.svcAnchor);
          }
        });
      },
      { threshold: 0, rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollToAnchor = (e, anchor) => {
    e.preventDefault();
    const el = document.getElementById(anchor);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="pt-20">
      {/* PAGE HERO */}
      <div className="page-hero">
        <div
          className="page-hero-bg"
          style={{ backgroundImage: "url('/assets/photos/destination/TSR50995.jpg')", backgroundPosition: "center 30%" }}
        ></div>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <GoldDivider darkBg className="mb-4" />
          <p className="page-hero-eyebrow">What We Offer</p>
          <h1 className="page-hero-title">Our <em className="italic">Services</em></h1>
          <GoldDivider darkBg flip className="mt-4" />
        </div>
      </div>

      {/* STICKY JUMP NAV */}
      <nav aria-label="Services jump navigation" className="svc-jumpnav">
        <ul className="svc-jumpnav-list">
          {services.map((svc) => (
            <li key={svc.anchor}>
              <a
                href={`#${svc.anchor}`}
                onClick={(e) => scrollToAnchor(e, svc.anchor)}
                className="svc-pill"
                data-active={activeAnchor === svc.anchor || undefined}
              >
                {svc.shortLabel}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* SERVICE SECTIONS */}
      {services.map((svc) => (
        <section
          key={svc.anchor}
          id={svc.anchor}
          data-svc-anchor={svc.anchor}
          className={`service-section ${svc.reverse ? "reverse" : ""}`}
          style={{ background: svc.reverse ? "var(--color-bg)" : "transparent" }}
        >
          <div className="svc-image reveal group">
            <div className="svc-image-inner">
              <Image
                src={`/assets/photos/${svc.img}`}
                alt={svc.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>
          <div className="svc-content reveal stagger-2">
            <span className="svc-number-watermark" aria-hidden>{svc.num}</span>
            <p className="svc-category">{svc.category}</p>
            <p className="svc-number">{svc.num}</p>
            <h2 className="svc-title">{svc.title}</h2>
            <p className="svc-desc">{svc.desc}</p>
            <Link href="/contact" className="btn-ghost-gold svc-inline-cta">Explore This Service →</Link>
            <ul className="svc-checklist" data-checklist>
              {svc.checklist.map((item, j) => (
                <li key={j} className="flex items-start gap-3">
                  <span className="check-icon flex-shrink-0 w-[18px] h-[18px] border border-gold rounded-full flex items-center justify-center after:content-[''] after:w-[6px] after:h-[3px] after:border-l after:border-b after:border-gold after:-rotate-45 after:-translate-y-[1px] mt-[5px]"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn-gold self-start mt-2">Enquire Now</Link>
          </div>
        </section>
      ))}

      {/* ADD-ONS */}
      <GoldDivider variant="section" />
      <section id="addons" className="bg-ink py-24 px-12">
        <div className="flex flex-col items-center text-center">
          <GoldDivider darkBg className="mb-4 reveal" />
          <p className="section-label reveal">Elevate Further</p>
          <h2 className="section-title reveal text-surface">Add-<em className="italic">Ons</em></h2>
          <GoldDivider darkBg flip className="mt-2 reveal" />
        </div>
        <div className="addons-grid">
          {addons.map((addon, i) => (
            <div key={i} className={`addon-card reveal stagger-${i + 1}`}>
              <div className="addon-inner">
                <div className="addon-front overflow-hidden border border-gold/15">
                  <Image src={`/assets/photos/${addon.img}`} alt={addon.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent"></div>
                  <div className="relative z-10 w-full flex flex-col justify-end h-full p-6">
                    <p className="addon-name">{addon.name}</p>
                  </div>
                </div>
                <div className="addon-back">
                  <p className="addon-desc">{addon.desc}</p>
                  <Link href="/contact" className="addon-back-cta">Learn more →</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="addons-footer reveal">
          <Link href="/contact" className="btn-gold">Build Your Package</Link>
        </div>
      </section>

      {/* SCROLL PROGRESS BAR */}
      <div
        className="svc-progress"
        aria-hidden
        style={{ transform: `scaleY(${scrollProgress})` }}
      ></div>

      {/* BACK TO TOP */}
      <button
        type="button"
        aria-label="Back to top"
        className="svc-back-top"
        data-visible={showBackToTop || undefined}
        onClick={scrollToTop}
      >
        <span aria-hidden>↑</span>
      </button>

      <style jsx>{`
        /* Sticky jump nav */
        .svc-jumpnav {
          position: sticky;
          top: 64px;
          z-index: 40;
          background: rgba(253, 250, 245, 0.94);
          backdrop-filter: blur(14px);
          border-bottom: 1px solid rgba(201, 162, 52, 0.22);
          padding: 14px 24px;
        }
        .svc-jumpnav-list {
          list-style: none;
          display: flex;
          gap: 10px;
          max-width: 1400px;
          margin: 0 auto;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 0;
          justify-content: center;
        }
        .svc-jumpnav-list::-webkit-scrollbar { display: none; }
        .svc-pill {
          display: inline-block;
          padding: 8px 18px;
          border: 1px solid var(--color-gold);
          color: var(--color-gold);
          background: transparent;
          font-family: var(--font-body);
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          font-weight: 500;
          white-space: nowrap;
          border-radius: 999px;
          transition: background-color 0.3s var(--ease-custom), color 0.3s var(--ease-custom);
        }
        .svc-pill:hover { background: rgba(201, 162, 52, 0.12); }
        .svc-pill[data-active] {
          background: var(--color-gold);
          color: var(--color-surface);
        }

        /* Service sections */
        .service-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: start;
          overflow: hidden;
          scroll-margin-top: 120px;
        }
        .service-section.reverse { direction: rtl; }
        .service-section.reverse > * { direction: ltr; }

        .svc-image {
          position: sticky;
          top: 120px;
          height: 70vh;
          min-height: 440px;
          max-height: 680px;
          overflow: hidden;
        }
        .svc-image-inner {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .svc-content {
          position: relative;
          padding: 96px 64px;
          display: flex;
          flex-direction: column;
          border-left: 2px solid var(--color-gold);
        }
        .service-section.reverse .svc-content {
          border-left: none;
          border-right: 2px solid var(--color-gold);
        }

        .svc-number-watermark {
          position: absolute;
          top: 32px;
          left: 40px;
          font-family: var(--font-heading);
          font-weight: 300;
          font-size: clamp(140px, 14vw, 220px);
          line-height: 0.85;
          color: var(--color-gold);
          opacity: 0.07;
          pointer-events: none;
          user-select: none;
          z-index: 0;
        }
        .service-section.reverse .svc-number-watermark {
          left: auto;
          right: 40px;
        }

        .svc-category {
          position: relative;
          z-index: 1;
          font-family: var(--font-body);
          font-weight: 500;
          text-transform: uppercase;
          color: var(--color-gold);
          font-size: 10px;
          letter-spacing: 0.4em;
          margin-bottom: 10px;
        }
        .svc-number {
          position: relative;
          z-index: 1;
          font-size: 10px;
          letter-spacing: 0.5em;
          color: var(--color-gold);
          margin-bottom: 12px;
          font-weight: 500;
          opacity: 0.65;
        }
        .svc-title {
          position: relative;
          z-index: 1;
          font-family: var(--font-heading);
          font-size: clamp(32px, 3.6vw, 50px);
          font-weight: 300;
          line-height: 1.1;
          margin-bottom: 24px;
          color: var(--color-ink);
          text-wrap: balance;
        }
        .svc-desc {
          position: relative;
          z-index: 1;
          font-size: 14px;
          line-height: 1.85;
          color: #3D3020;
          font-weight: 300;
          margin-bottom: 24px;
        }
        .svc-inline-cta {
          position: relative;
          z-index: 1;
          align-self: flex-start;
          margin-bottom: 28px;
        }
        .svc-checklist {
          position: relative;
          z-index: 1;
          list-style: none;
          margin-bottom: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          color: #3D3020;
          font-size: 13px;
          line-height: 1.55;
        }

        /* Add-ons */
        .addons-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin-top: 64px;
        }
        .addon-card {
          aspect-ratio: 4 / 3;
          min-height: 240px;
          perspective: 1000px;
        }
        .addon-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform .6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          transform-style: preserve-3d;
        }
        .addon-card:hover .addon-inner { transform: rotateY(180deg); }
        .addon-front, .addon-back {
          position: absolute;
          inset: 0;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
        }
        .addon-front { background: #252220; transform: translateZ(1px); }
        .addon-back {
          background: var(--color-gold);
          transform: rotateY(180deg) translateZ(1px);
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          padding: 28px 26px;
        }
        .addon-name { font-family: var(--font-heading); font-size: 22px; color: var(--color-surface); }
        .addon-desc {
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255,255,255,0.95);
          font-weight: 300;
        }
        .addon-back-cta {
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--color-surface);
          font-weight: 500;
          padding-top: 14px;
          border-top: 1px solid rgba(255,255,255,0.35);
          width: 100%;
        }
        .addons-footer {
          display: flex;
          justify-content: center;
          margin-top: 56px;
        }

        /* Scroll progress bar */
        .svc-progress {
          position: fixed;
          top: 0;
          right: 0;
          width: 3px;
          height: 100vh;
          background: var(--color-gold);
          transform-origin: top;
          transform: scaleY(0);
          z-index: 60;
          pointer-events: none;
          transition: transform 0.1s linear;
        }

        /* Back to top button */
        .svc-back-top {
          position: fixed;
          left: 24px;
          bottom: 24px;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--color-gold);
          color: var(--color-surface);
          border: none;
          cursor: pointer;
          z-index: 55;
          font-size: 20px;
          line-height: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 18px rgba(26,20,8,0.25);
          opacity: 0;
          transform: translateY(12px);
          pointer-events: none;
          transition: opacity 0.4s var(--ease-custom), transform 0.4s var(--ease-custom), background-color 0.3s var(--ease-custom);
        }
        .svc-back-top[data-visible] {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }
        .svc-back-top:hover { background: #B8860B; }

        /* Tablet */
        @media (min-width: 769px) and (max-width: 1024px) {
          .addons-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* Mobile */
        @media (max-width: 768px) {
          .svc-jumpnav { top: 60px; padding: 12px 16px; }
          .svc-jumpnav-list { justify-content: flex-start; }
          .svc-pill { padding: 7px 14px; font-size: 9px; }

          .service-section {
            grid-template-columns: 1fr;
            min-height: auto;
            scroll-margin-top: 110px;
          }
          .service-section.reverse { direction: ltr; }

          .svc-image {
            position: relative;
            top: auto;
            height: 55vw;
            min-height: 260px;
          }
          .svc-content {
            padding: 48px 24px;
            border-left: none;
            border-top: 2px solid var(--color-gold);
            min-height: auto;
          }
          .service-section.reverse .svc-content {
            border-right: none;
            border-top: 2px solid var(--color-gold);
          }
          .svc-number-watermark {
            font-size: 100px;
            top: 16px;
            left: 16px;
          }
          .service-section.reverse .svc-number-watermark {
            right: 16px;
            left: auto;
          }
          .svc-checklist { padding: 0 4px; }

          .addons-grid { grid-template-columns: 1fr; }
          .addon-card { aspect-ratio: 16 / 10; min-height: 220px; }

          .svc-back-top { left: 16px; bottom: 16px; width: 42px; height: 42px; }
        }
      `}</style>
    </div>
  );
}
