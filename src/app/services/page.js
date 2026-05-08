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
      reverse: false
    },
    {
      num: "02",
      title: "Full Planning",
      desc: "From your initial vision to breathtaking reality, our dedicated team of professionals pays meticulous attention to every detail, orchestrating a flawless journey so you can simply celebrate.",
      checklist: [
        "Venue selection across Rajasthan, Goa & Kerala",
        "Themed weddings — royal, fairytale, or colour-specific",
        "Wedding calendar & itinerary management",
        "Bridal trousseau coordination with professional designers"
      ],
      img: "couple-shots/TSR53067.jpg",
      reverse: true
    },
    {
      num: "03",
      title: "Décor & Florals",
      desc: "We use exquisite fresh florals and artistic lighting to elevate every element of décor, transforming your venue into an immersive, bespoke environment that tells your unique story.",
      checklist: [
        "Fresh roses, orchids, marigolds & gerberas",
        "Mandap floral decoration around Havankund",
        "Artistic lighting design for each theme",
        "Customised décor for indoor and outdoor venues"
      ],
      img: "services/decoration/haldi_flowers_decor.jpg",
      reverse: false
    },
    {
      num: "04",
      title: "Film & Photography",
      desc: "Our professional photographers and videographers are appointed to beautifully capture every propitious moment, preserving your milestones with raw emotion and cinematic precision.",
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
      desc: "Song and dance are seamlessly woven into every celebration. From traditional performances to modern acts, we fill your milestones with energy, soul, and unforgettable moments.",
      checklist: [
        "Native & folk dancers",
        "Live shenai & traditional music",
        "Cultural programme curation",
        "DJ & contemporary entertainment"
      ],
      img: "services/entertainment/performances.jpg",
      reverse: false
    },
    {
      num: "06",
      title: "Fireworks & SFX",
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
      reverse: true
    },
    {
      num: "07",
      title: "Hospitality & Guest Management",
      desc: "We provide seamless, white-glove hospitality from airport arrival to departure, ensuring that every guest experiences unparalleled comfort and is treated like royalty.",
      checklist: [
        "Airport transfers & city representatives",
        "Accommodation from 5-star palaces to boutique stays",
        "Limousine with floral decoration for grand entrances",
        "On-ground coordinators at every destination"
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


      `}</style>
    </div>
  );
}
