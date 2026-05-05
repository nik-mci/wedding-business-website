"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import GoldDivider from "@/components/GoldDivider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ServicesPage() {
  useEffect(() => {
    let ctx = gsap.context(() => {
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

      // Checklist animations
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
          scrollTrigger: {
            trigger: list,
            start: "top 85%",
          }
        });
      });
    });
    
    return () => ctx.revert();
  }, []);

  const services = [
    {
      num: "01",
      title: "Destination Weddings",
      desc: "From Rajasthan palace gardens to Greek clifftops — we craft extraordinary ceremonies in the world's most breathtaking locations.",
      checklist: [
        "Venue scouting & negotiation worldwide",
        "Guest travel & logistics management",
        "Local vendor network in 40+ destinations",
        "Legal ceremony documentation"
      ],
      img: "destination/TSR50501.jpg",
      reverse: false
    },
    {
      num: "02",
      title: "Full Planning",
      desc: "End-to-end curation of your entire wedding journey — from the first vision call to the final farewell. You celebrate; we handle everything.",
      checklist: [
        "12-month planning timeline & milestones",
        "Budget management & vendor coordination",
        "Day-of coordination & on-site team",
        "Dedicated wedding manager"
      ],
      img: "couple-shots/TSR53067.jpg",
      reverse: true
    },
    {
      num: "03",
      title: "Décor & Florals",
      desc: "Immersive environments built from flowers, fabric, light and texture — every table, mandap, and aisle tells your story.",
      checklist: [
        "Custom mandap & stage design",
        "Floral art & installation",
        "Table centrepiece & linen styling",
        "Lighting design & draping"
      ],
      img: "services/decoration/haldi_flowers_decor.jpg",
      reverse: false
    },
    {
      num: "04",
      title: "Film & Photography",
      desc: "Cinematic storytelling by India's finest photographers and filmmakers — capturing raw emotion with editorial precision.",
      checklist: [
        "Pre-wedding & engagement shoots",
        "Multi-camera ceremony & reception coverage",
        "Feature film & same-day edit",
        "Aerial & drone cinematography"
      ],
      img: "couple-shots/TSR53178.jpg",
      reverse: true
    },
    {
      num: "05",
      title: "Entertainment & DJ",
      desc: "From sangeet choreography to curated playlists and live acts — we fill your celebrations with energy, soul, and unforgettable moments.",
      checklist: [
        "Live musicians & dhol players",
        "DJ & sound system setup",
        "Sangeet choreography coordination",
        "Celebrity performance management"
      ],
      img: "services/entertainment/performances.jpg",
      reverse: false
    },
    {
      num: "06",
      title: "Fireworks & SFX",
      desc: "Dazzling sky shows, cold pyrotechnics, and stunning visual effects to add an explosive touch of magic to your milestones.",
      checklist: [
        "Customized aerial firework displays",
        "Cold pyro for entry and first dance",
        "Confetti cannons & special effects",
        "Venue safety & permit clearance"
      ],
      img: "destination/hospitality2.jpg",
      reverse: true
    },
    {
      num: "07",
      title: "Hospitality & Guest Management",
      desc: "White-glove concierge service ensuring every guest is treated like royalty from their arrival to their departure.",
      checklist: [
        "Airport transfers & fleet management",
        "Welcome hampers & room allocations",
        "24/7 hospitality desk & RSVP tracking",
        "Personalized guest itineraries"
      ],
      img: "couple-shots/0G4A2084.jpg",
      reverse: false
    }
  ];

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

      {/* SERVICE SECTIONS */}
      {services.map((svc, i) => (
        <div 
          key={i} 
          className={`service-section ${svc.reverse ? 'reverse' : ''}`} 
          style={{ background: svc.reverse ? 'var(--color-bg)' : 'transparent' }}
        >
          <div className="svc-image reveal group overflow-hidden">
            <div className="relative w-full h-full">
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
            <p className="svc-number">{svc.num}</p>
            <h2 className="svc-title">
              {svc.title.split(' ')[0]}<br />
              {svc.title.substring(svc.title.indexOf(' ') + 1)}
            </h2>
            <p className="svc-desc">{svc.desc}</p>
            <ul className="svc-checklist" data-checklist>
              {svc.checklist.map((item, j) => (
                <li key={j} className="flex items-center gap-3">
                  <span className="check-icon flex-shrink-0 w-[18px] h-[18px] border border-gold rounded-full flex items-center justify-center after:content-[''] after:w-[6px] after:h-[3px] after:border-l after:border-b after:border-gold after:-rotate-45 after:-translate-y-[1px]"></span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href="/contact" className="btn-gold self-start mt-6">Enquire Now</Link>
          </div>
        </div>
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
          {[
            { img: "services/decoration/printables2.jpg", name: "E-Invites", desc: "Custom digital wedding invitations with RSVP tracking and animated reveals." },
            { img: "services/decoration/059A4328.jpg", name: "Vendor Management", desc: "End-to-end coordination with our curated network of top-tier partners and artisans." },
            { img: "services/mehendi.jpg", name: "Mehendi & Styling", desc: "Intricate bridal henna and comprehensive head-to-toe styling for you and your guests." },
            { img: "couple-shots/0G4A4811.jpg", name: "Logistics & Transport", desc: "Seamless guest transportation, luxury fleet management, and venue logistics." }
          ].map((addon, i) => (
            <div key={i} className={`addon-card reveal stagger-${i + 1}`}>
              <div className="addon-inner">
                <div className="addon-front overflow-hidden border border-gold/15">
                  <Image src={`/assets/photos/${addon.img}`} alt={addon.name} fill sizes="(max-width: 768px) 50vw, 33vw" className="object-cover" />
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
      </section>

      {/* PACKAGES */}
      <section id="packages" className="bg-bg py-24 px-12 text-center">
        <p className="section-label reveal">Choose Your Path</p>
        <h2 className="section-title reveal">Our <em className="italic">Packages</em></h2>
        <div className="packages-grid mt-16">
          <div className="pkg-card reveal stagger-1">
            <p className="pkg-label">Essentials</p>
            <h3 className="pkg-name">Pearl</h3>
            <p className="pkg-price">Starting from ₹8,00,000</p>
            <ul className="pkg-features">
              <li>1 day ceremony</li>
              <li>Basic décor & florals</li>
              <li>Photography coverage</li>
              <li>Coordination support</li>
            </ul>
            <Link href="/contact" className="btn-ghost">Get Started</Link>
          </div>
          <div className="pkg-card featured reveal stagger-2">
            <p className="pkg-label">Most Popular</p>
            <h3 className="pkg-name">Gold</h3>
            <p className="pkg-price">Starting from ₹18,00,000</p>
            <ul className="pkg-features">
              <li>3-day multi-event wedding</li>
              <li>Full décor, florals & lighting</li>
              <li>Photography + cinematic film</li>
              <li>Dedicated wedding manager</li>
              <li>Mehendi & styling</li>
            </ul>
            <Link href="/contact" className="btn-gold">Begin Planning</Link>
          </div>
          <div className="pkg-card reveal stagger-3">
            <p className="pkg-label">Bespoke</p>
            <h3 className="pkg-name">Prestige</h3>
            <p className="pkg-price">Fully tailored</p>
            <ul className="pkg-features">
              <li>5+ day destination wedding</li>
              <li>All services included</li>
              <li>International venues</li>
              <li>Concierge guest management</li>
              <li>White-glove experience</li>
            </ul>
            <Link href="/contact" className="btn-ghost">Enquire</Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .service-section { display: grid; grid-template-columns: 1fr 1fr; min-height: 600px; overflow: hidden; }
        .service-section.reverse { direction: rtl; }
        .service-section.reverse > * { direction: ltr; }
        .svc-image { position: relative; overflow: hidden; min-height: 500px; }
        .svc-content { padding: 72px 64px; display: flex; flex-direction: column; justify-content: center; }
        .svc-number { font-size: 10px; letter-spacing: 0.5em; color: var(--color-gold); margin-bottom: 12px; font-weight: 500; }
        .svc-title { font-family: var(--font-heading); font-size: clamp(36px,4vw,56px); font-weight: 300; line-height: 1.1; margin-bottom: 24px; color: var(--color-ink); }
        .svc-desc { font-size: 13px; line-height: 2; color: var(--color-muted); font-weight: 300; margin-bottom: 32px; }
        .svc-checklist { list-style: none; margin-bottom: 40px; display: flex; flex-direction: column; gap: 12px; }

        .addons-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 64px; }
        .addon-card { height: 220px; perspective: 800px; }
        .addon-inner { position: relative; width: 100%; height: 100%; transition: transform .6s cubic-bezier(0.25, 0.46, 0.45, 0.94); transform-style: preserve-3d; }
        .addon-card:hover .addon-inner { transform: rotateY(180deg); }
        .addon-front, .addon-back { position: absolute; inset: 0; -webkit-backface-visibility: hidden; backface-visibility: hidden; display: flex; flex-direction: column; justify-content: flex-end; }
        .addon-front { background: #252220; transform: translateZ(1px); }
        .addon-back { background: var(--color-gold); transform: rotateY(180deg) translateZ(1px); justify-content: center; align-items: flex-start; gap: 12px; padding: 24px; }
        .addon-name { font-family: var(--font-heading); font-size: 22px; color: var(--color-surface); }
        .addon-desc { font-size: 11px; line-height: 1.7; color: rgba(255,255,255,0.9); font-weight: 300; }
        .addon-back-cta { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-surface); font-weight: 500; border-bottom: 1px solid rgba(255,255,255,0.4); padding-bottom: 2px; }

        .packages-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2px; margin-top: 64px; }
        .pkg-card { background: var(--color-surface); padding: 56px 40px; border-bottom: 3px solid transparent; transition: border-color .3s, transform .3s; }
        .pkg-card:hover { border-color: var(--color-gold); transform: translateY(-4px); }
        .pkg-card.featured { background: var(--color-ink); color: var(--color-surface); border-color: var(--color-gold); }
        .pkg-label { font-size: 9px; letter-spacing: 0.5em; text-transform: uppercase; color: var(--color-gold); margin-bottom: 16px; font-weight: 500; }
        .pkg-name { font-family: var(--font-heading); font-size: 40px; font-weight: 300; margin-bottom: 8px; }
        .pkg-price { font-size: 13px; letter-spacing: 0.1em; color: var(--color-muted); margin-bottom: 32px; font-weight: 300; }
        .pkg-card.featured .pkg-price { color: rgba(255,255,255,0.6); }
        .pkg-features { list-style: none; display: flex; flex-direction: column; gap: 12px; margin-bottom: 40px; text-align: left; }
        .pkg-features li { font-size: 12px; color: var(--color-muted); padding-left: 16px; position: relative; font-weight: 300; line-height: 1.6; }
        .pkg-card.featured .pkg-features li { color: rgba(255,255,255,0.7); }
        .pkg-features li::before { content: '—'; position: absolute; left: 0; color: var(--color-gold); }
      `}</style>
    </div>
  );
}
