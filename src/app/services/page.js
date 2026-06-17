"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import blurDataUrls, { getBlurProps } from "@/lib/blurDataUrls";
import GoldDivider from "@/components/GoldDivider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "venues-destinations",
    number: "01",
    name: "Venues & Destinations",
    tagline: "Global footprint, local expertise — every setting handpicked",
    description: "From an intimate hilltop ceremony to coordinating guests across three days at a palace — we scout, negotiate and plan every spatial detail so you never have to.",
    includes: ["Global Footprint & Local Expertise", "Location Scouting", "Contracting & Negotiation", "Feasibility & Spatial Planning"],
    img: "services/destinations-service.JPG",
    photographer: "The Wedding Filmer"
  },
  {
    id: "planning",
    number: "02",
    name: "Planning",
    tagline: "Every detail considered. Every moment orchestrated.",
    description: "Our dedicated team pays meticulous attention to every detail, orchestrating a flawless journey from the first consultation to the final dance.",
    includes: ["End to End Timeline Mapping", "Budget Architecture & Allocation", "Curated Vendor Matchmaking", "Multi Day Itinerary Design", "On Site Command & Execution", "Post Wedding Wrap & Vendor Settlement"],
    img: "services/planning-service.jpg",
    photographer: "Stories by Joseph Radhik"
  },
  {
    id: "design-decor",
    number: "03",
    name: "Design & Decor",
    tagline: "Environments crafted to reflect your story",
    description: "Every mandap, every centerpiece, every lighting rig is designed to reflect you. We build immersive environments, not just decorations.",
    includes: ["Bespoke Conceptualizing & Mood Boards", "Immersive Floral Artistry", "Custom Scenography & Production", "Strategic Lighting & Soundscaping", "Finer Details & Table Scaping"],
    img: "services/Designa nd decor 1.jpg",
    photographer: "Vows & Vedas Design Lab"
  },
  {
    id: "film-photography",
    number: "04",
    name: "Film & Photography",
    tagline: "Cinematic storytelling — raw emotion, editorial craft",
    description: "We work with India's finest wedding photographers and cinematographers to capture your story the way it deserves to be told.",
    includes: ["Editorial & Cinematic Matchmaking", "Creative Briefing & Art Direction", "Comprehensive Logistics & Shot Listing Planning", "Seamless Prod. Integration", "BTS & Real Time Content", "Post Prod. & Archive Management"],
    img: "couple-shots/TSR53178.jpg",
    photographer: "Badal Raja Company"
  },
  {
    id: "entertainment",
    number: "05",
    name: "Entertainment",
    tagline: "Concert-grade production, curated talent, unforgettable moments",
    description: "From classical Rajasthani folk performers to Bollywood DJs — we curate entertainment that fills every moment with energy and meaning.",
    includes: ["Curated Artist & Talent Sourcing", "Immersive Guest Experiences", "End to End Artist Logistics", "Sangeet Choreography & Show Direction", "Concert Grade Tech & Sound Design"],
    img: "services/entertainment/performances.jpg",
    photographer: "Eventila Cast"
  },
  {
    id: "hospitality",
    number: "06",
    name: "Hospitality",
    tagline: "White-glove guest management from arrival to departure",
    description: "Every guest at your wedding is our responsibility. From airport transfers to room upgrades — we ensure everyone feels taken care of.",
    includes: ["Dedicated RSVP Team", "Bespoke Welcome Experiences", "Comprehensive Ground Travel & Logistics", "24/7 Concierge & Helpdesk Support", "Shadow & VVIP Management", "Vendor Management"],
    img: "services/hospitality_service.jpeg",
    photographer: "Palace Hospitality"
  },
  {
    id: "vendor-management",
    number: "07",
    name: "Vendor Management",
    tagline: "Curated network of India's elite artisans",
    description: "We bring you access to the most exclusive wedding partners — from photographers, makeup artists, dj etc, bespoke couturiers and caterers to artisanal invitation designers.",
    includes: ["Elite Network Access", "Comprehensive Contract & Rate Negotiation", "Centralized Communication Hub", "Integrated Timeline & Delivery Schedule", "Financial Tracking & Payment Milestones"],
    img: "couple-shots/hospitality1.jpg",
    photographer: "Vows & Vedas Artisan Network"
  },
  {
    id: "travel-logistics",
    number: "08",
    name: "Travel & Logistics",
    tagline: "Seamless transport management and guest transit",
    description: "We handle the complex movement of hundreds of guests across venues and cities with precision, from luxury airport transfers to venue shuttles, while also orchestrating bespoke trousseau shopping, gifting, honeymoon planning, marriage registration, and visa assistance.",
    includes: ["Guest travel & ticket coordination", "Luxury car transport & coach management", "On-site transport concierge desk", "Real-time transit tracking & communication", "Venue-to-hotel shuttle coordination"],
    img: "services/Travel and transport.jpeg",
    photographer: "Logistics Excellence"
  },
  {
    id: "food-beverages",
    number: "09",
    name: "Food & Beverage",
    tagline: "Bespoke menus and world-class bar curation",
    description: "We curate culinary journeys that span continents, from traditional regional feasts to avant-garde international fine dining and specialty bar experiences.",
    includes: ["Bespoke Menu Engineering", "Signature Mixology & Craft Bar Concept", "Immersive Live Stations & Food Theatre", "Thematic Styling & Presentation Design", "Meticulous Dietary & Allergens Planning", "Flawless Banquet & Service Logistics"],
    img: "services/F&B.jpg",
    photographer: "Culinary Arts by V&V"
  }
];

function AddOnCard({ addon }) {
  const [flipped, setFlipped] = useState(false);
  
  return (
    <div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      className="relative cursor-pointer w-[280px] md:w-[320px] shrink-0"
      style={{ perspective: "1000px", height: "260px" }}
    >
      <div
        className="relative w-full h-full transition-transform duration-[800ms]"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          transitionTimingFunction: "cubic-bezier(0.23, 1, 0.32, 1)"
        }}
      >
        {/* FRONT FACE (With Image) */}
        <div
          className="absolute inset-0 rounded-xl flex flex-col justify-end bg-[#252220] border border-[#C9A234]/15 overflow-hidden"
          style={{ 
            backfaceVisibility: "hidden", 
            WebkitBackfaceVisibility: "hidden",
            transform: "translateZ(1px)" 
          }}
        >
          <Image 
            src={`/assets/photos/${addon.img}`} 
            alt={addon.name} 
            fill 
            sizes="(max-width: 768px) 50vw, 20vw" 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1408]/90 via-[#1A1408]/20 to-transparent"></div>
          <div className="relative z-10 w-full p-6">
            <p className="font-heading text-[22px] text-white leading-tight">{addon.name}</p>
          </div>
        </div>

        {/* BACK FACE (Corrected) */}
        <div
          className="absolute inset-0 rounded-xl p-7 bg-[#C9A234] flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg) translateZ(1px)"
          }}
        >
          <div>
            <h3 className="font-heading text-[#1A1408] text-2xl mb-3 leading-tight">
              {addon.name}
            </h3>
            <div className="w-8 h-px bg-[#1A1408] opacity-30 mb-4" />
            <p className="text-[#1A1408] text-[13px] leading-relaxed font-body font-medium">
              {addon.description}
            </p>
          </div>
          <Link 
            href="/contact" 
            className="text-[#1A1408] text-[10px] uppercase tracking-[0.2em] font-body font-bold border-b border-[#1A1408] border-opacity-40 pb-1 self-start hover:border-opacity-100 transition-all"
          >
            Enquire Now →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const lightboxRef = useRef(null);
  const panelRef = useRef(null);
  const addonsScrollRef = useRef(null);

  const scrollAddons = (dir) => {
    if (addonsScrollRef.current) {
      addonsScrollRef.current.scrollBy({ left: dir * 340, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Initial check for hash
    const openFromHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        const service = services.find(s => s.id === hash);
        if (service) setSelectedService(service);
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);

    let ctx = gsap.context(() => {
      // Entrance animation for grid cards
      const cards = gsap.utils.toArray(".service-card-entrance");
      if (cards.length > 0) {
        gsap.fromTo(cards, 
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".services-grid-container",
              start: "top 85%",
              once: true
            }
          }
        );
      }
    });
    
    return () => {
      ctx.revert();
      window.removeEventListener("hashchange", openFromHash);
    };
  }, []);

  useEffect(() => {
    const nav = document.querySelector('nav');
    if (selectedService) {
      window.history.pushState(null, null, `#${selectedService.id}`);
      
      if (nav) nav.classList.add("overlay-open");

      // Lightbox open animation
      const tl = gsap.timeline();
      tl.to(lightboxRef.current, { opacity: 1, duration: 0.25, display: "flex" })
        .fromTo(panelRef.current, 
          { scale: 0.96, opacity: 0, y: 15 }, 
          { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: "power3.out" }
        );
      
      // Staggered includes animation
      gsap.fromTo(".include-item", 
        { opacity: 0, x: -10 }, 
        { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: "power2.out", delay: 0.3 }
      );

      document.body.style.overflow = "hidden";
      document.documentElement.classList.add("lenis-stopped");
    } else {
      window.history.pushState(null, null, window.location.pathname);
      if (nav) nav.classList.remove("overlay-open");
      document.body.style.overflow = "auto";
      document.documentElement.classList.remove("lenis-stopped");
    }
  }, [selectedService]);

  const closeLightbox = () => {
    gsap.to(panelRef.current, { scale: 0.96, opacity: 0, y: 15, duration: 0.25, ease: "power2.in" });
    gsap.to(lightboxRef.current, { opacity: 0, duration: 0.25, onComplete: () => setSelectedService(null) });
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="bg-[#FDFAF5]">
      {/* PAGE HERO */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/photos/destination/pool_venue.jpg"
          alt="Services Hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/35 to-ink/65" />
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <GoldDivider darkBg className="mb-4" />
          <p className="font-body uppercase text-gold tracking-[0.5em] text-[10px] mb-4">What We Offer</p>
          <h1 className="font-heading font-light text-white leading-[1.05]" style={{ fontSize: "clamp(48px, 7vw, 88px)" }}>Our <em className="italic">Services</em></h1>
          <GoldDivider darkBg flip className="mt-4" />
        </div>
      </section>

      {/* NEW SERVICES GRID SECTION */}
      <section className="services-grid-container pt-12 pb-24 px-6 md:px-12 overflow-hidden">
        <div className="max-w-[1280px] mx-auto">
          {/* Descriptive Tagline */}
          <div className="flex flex-col items-center text-center">
            <p className="text-[15px] font-body text-[#9A8F7E] max-w-[480px] leading-relaxed italic">
              "Every detail considered. Every moment orchestrated."
            </p>
            
            {/* New SVG Swirl Ornament */}
            <div className="flex items-center justify-center gap-4 mt-6 mb-10">
              
              {/* Left corner ornament - same SVG style as hero */}
              <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="0" y1="12" x2="85" y2="12" stroke="#C9A234" strokeWidth="0.75" strokeOpacity="0.6"/>
                <circle cx="88" cy="12" r="1.5" fill="#C9A234" fillOpacity="0.8"/>
                <path d="M95 12 Q100 6 105 12 Q100 18 95 12Z" fill="none" stroke="#C9A234" strokeWidth="0.75"/>
                <circle cx="112" cy="12" r="1.5" fill="#C9A234" fillOpacity="0.8"/>
                <line x1="115" y1="12" x2="120" y2="12" stroke="#C9A234" strokeWidth="0.75" strokeOpacity="0.6"/>
              </svg>

              {/* Center star */}
              <span
                className="font-heading text-[#C9A234]"
                style={{ fontSize: "22px", lineHeight: 1 }}
              >
                ✦
              </span>

              {/* Right corner ornament - mirrored */}
              <svg width="120" height="24" viewBox="0 0 120 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: "scaleX(-1)" }}>
                <line x1="0" y1="12" x2="85" y2="12" stroke="#C9A234" strokeWidth="0.75" strokeOpacity="0.6"/>
                <circle cx="88" cy="12" r="1.5" fill="#C9A234" fillOpacity="0.8"/>
                <path d="M95 12 Q100 6 105 12 Q100 18 95 12Z" fill="none" stroke="#C9A234" strokeWidth="0.75"/>
                <circle cx="112" cy="12" r="1.5" fill="#C9A234" fillOpacity="0.8"/>
                <line x1="115" y1="12" x2="120" y2="12" stroke="#C9A234" strokeWidth="0.75" strokeOpacity="0.6"/>
              </svg>

            </div>
          </div>
 
          {/* 3-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((svc) => (
              <div 
                key={svc.id}
                className="service-card-entrance relative h-[420px] rounded-xl overflow-hidden cursor-pointer group bg-[#1A1408] transition-all duration-500"
                onMouseEnter={() => setHoveredCard(svc.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => setSelectedService(svc)}
                style={{
                  transform: hoveredCard === svc.id ? 'translateY(-10px)' : 'translateY(0)',
                  boxShadow: hoveredCard === svc.id ? '0 30px 60px rgba(0,0,0,0.25)' : 'none',
                }}
              >
                {/* Layer 1: Image */}
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={`/assets/photos/${svc.img}`}
                    alt={svc.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    {...getBlurProps(`/assets/photos/${svc.img}`)}
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.1]"
                    priority
                  />
                </div>
                
                {/* Layer 2: Default Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent z-10"></div>

                {/* Layer 3: Dimming Overlay (for non-hovered cards) */}
                <div className={`absolute inset-0 bg-black/40 transition-opacity duration-500 z-20 pointer-events-none ${hoveredCard && hoveredCard !== svc.id ? 'opacity-100' : 'opacity-0'}`}></div>

                {/* Layer 4: Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col items-start z-30 transition-transform duration-500 group-hover:-translate-y-2">
                  <span className="text-[#C9A234] text-[12px] mb-2.5">✦</span>
                  <p className="text-[10px] font-body uppercase text-[#C9A234] tracking-[0.5em]">{svc.number}</p>
                  <h3 className="text-[34px] font-heading text-white leading-[1.1] mt-1.5">{svc.name}</h3>
                  <p className="text-[13px] font-body text-white/60 mt-2 line-clamp-1">{svc.tagline}</p>
                  
                  <div className="mt-5 inline-flex min-h-[42px] max-w-full items-center justify-center gap-2 rounded-full bg-[#C9A234]/15 border border-[#C9A234]/40 px-5 py-2.5 backdrop-blur-sm transition-all duration-300 group-hover:bg-[#C9A234] group-hover:text-[#1A1408]">
                    <span className="whitespace-nowrap text-[10px] sm:text-[11px] font-body uppercase tracking-[0.22em] sm:tracking-[0.3em] text-[#C9A234] group-hover:text-[#1A1408]">Explore Service</span>
                    <span className="shrink-0 text-[14px] leading-none text-[#C9A234] group-hover:text-[#1A1408]">→</span>
                  </div>
                </div>

                {/* Hover Gold Border */}
                <div className="absolute inset-0 border-2 border-[#C9A234] rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none z-40"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DECORATIVE DIVIDER */}
      <div className="w-full flex items-center justify-center py-12 px-6">
        <div className="flex-grow h-[1px] bg-[#EDE8DC]"></div>
        <div className="px-6 flex items-center gap-3">
          <span className="h-[1px] w-8 bg-[#EDE8DC] hidden md:block"></span>
          <span className="font-heading text-2xl text-[#C9A234]">✦</span>
          <span className="h-[1px] w-8 bg-[#EDE8DC] hidden md:block"></span>
        </div>
        <div className="flex-grow h-[1px] bg-[#EDE8DC]"></div>
      </div>

      {/* ADD-ONS SECTION */}
      <section id="addons" className="bg-[#1A1408] pt-24 pb-10 px-6 md:px-12">
        <div className="flex flex-col items-center text-center">
          <GoldDivider darkBg className="mb-4" />
          <p className="text-[10px] font-body uppercase text-[#C9A234] tracking-[0.5em] mb-4">Elevate Further</p>
          <h2 className="text-[48px] font-heading text-white leading-tight mb-2">Add-<em className="italic">Ons</em></h2>
          <GoldDivider darkBg flip className="mt-2" />
        </div>
        <div className="relative mt-16 max-w-[1280px] mx-auto">
          {/* Left arrow */}
          <button
            onClick={() => scrollAddons(-1)}
            aria-label="Scroll left"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center border border-[#C9A234]/40 text-[#C9A234] hover:bg-[#C9A234]/10 transition-colors duration-200 -translate-x-1/2 bg-[#1A1408]/80 backdrop-blur-sm"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Right arrow */}
          <button
            onClick={() => scrollAddons(1)}
            aria-label="Scroll right"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center border border-[#C9A234]/40 text-[#C9A234] hover:bg-[#C9A234]/10 transition-colors duration-200 translate-x-1/2 bg-[#1A1408]/80 backdrop-blur-sm"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div ref={addonsScrollRef} className="flex overflow-x-auto gap-4 pb-8 custom-scrollbar scroll-smooth px-2">
          {[
            { 
              img: "services/3-d modelling.png",
              name: "3-D Models", 
              tagline: "Virtual Venue Pre-visualization", 
              description: "Visualize your mandap and ballroom in photorealistic 3D before a single flower is placed." 
            },
            { 
              img: "services/sfx-and-fireworks.jpg",
              name: "SFX & Fireworks", 
              tagline: "Atmospheric Spectacles", 
              description: "Breathtaking pyrotechnics and cinematic atmospheric effects to elevate your grand entry and celebration moments." 
            },
            { 
              img: "services/E-INvites.webp",
              name: "E-Invites", 
              tagline: "Animated Digital Invitations", 
              description: "Custom digital wedding invitations with RSVP tracking and animated reveals." 
            },
            { 
              img: "services/Home decor 1.jpeg",
              name: "Home Decor", 
              tagline: "Pre & Post Wedding Styling", 
              description: "Bringing the celebration home with elegant floral and lighting designs for your residence." 
            },
            { 
              img: "services/website-addson.png",
              name: "Website Creation", 
              tagline: "Bespoke Guest Hubs", 
              description: "A bespoke digital hub for your guests with RSVPs, gallery, and travel itineraries." 
            },
            { 
              img: "services/trousseau shppoing.jpg",
              name: "Trousseau Shopping", 
              tagline: "Designer Curation & Wardrobe Styling", 
              description: "Access exclusive designer previews, personalized shopping trials, and bridal wardrobe styling assistance." 
            },
            { 
              img: "services/gifting.jpg",
              name: "Gifting & Favours", 
              tagline: "Bespoke Curated Memorabilia", 
              description: "Thoughtfully designed hampers, local artisanal souvenirs, and custom welcome favors for your guests." 
            },
            { 
              img: "services/honemoon-planning.jpg",
              name: "Honeymoon Planning", 
              tagline: "Luxury Romantic Escapes", 
              description: "Tailored itineraries, luxury couples' retreats, and private experience curation across global destinations." 
            },
            { 
              img: "services/marriage-registrtion.jpg",
              name: "Marriage Registration", 
              tagline: "Official Registry Assistance", 
              description: "Laying down smooth paperwork, slot booking, and local registry guidance to officially certify your union." 
            },
            { 
              img: "services/visa.jpg",
              name: "Visa Assistance", 
              tagline: "Seamless Global Travel Prep", 
              description: "Dedicated assistance for guest visa processing, documentation support, and embassy appointments." 
            }
          ].map((addon, i) => (
            <AddOnCard key={i} addon={addon} />
          ))}
          </div>
        </div>
      </section>

      {/* PACKAGE RANGES SECTION */}
      <section className="bg-ink pt-10 pb-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center text-center mb-12">
            <p className="text-[9px] tracking-[0.45em] uppercase font-medium mb-3" style={{ color: 'var(--color-gold)' }}>Investment</p>
            <h2 className="font-heading text-surface text-3xl md:text-4xl font-light">Package <em className="italic">Ranges</em></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Planning */}
            <div className="border border-[#C9A234]/30 rounded-2xl p-8 md:p-10 flex flex-col gap-4 hover:border-[#C9A234]/60 transition-colors duration-300">
              <p className="text-[9px] tracking-[0.4em] uppercase font-medium" style={{ color: 'var(--color-gold)' }}>Full Planning</p>
              <h3 className="font-heading text-surface text-2xl md:text-3xl font-light leading-tight">Complete Wedding<br /><em className="italic">Planning</em></h3>
              <div className="h-px bg-[#C9A234]/20 my-2" />
              <p className="font-heading text-[#C9A234] text-3xl md:text-4xl font-light tracking-tight">₹3 – 8 Lakhs</p>
              <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(253,250,245,0.55)' }}>End-to-end planning, vendor management, and on-ground coordination for your perfect wedding day.</p>
            </div>
            {/* Full Luxury / Destination Planning */}
            <div className="border border-[#C9A234]/30 rounded-2xl p-8 md:p-10 flex flex-col gap-4 hover:border-[#C9A234]/60 transition-colors duration-300" style={{ background: 'linear-gradient(135deg, rgba(201,162,52,0.06) 0%, transparent 60%)' }}>
              <p className="text-[9px] tracking-[0.4em] uppercase font-medium" style={{ color: 'var(--color-gold)' }}>Full Luxury / Destination</p>
              <h3 className="font-heading text-surface text-2xl md:text-3xl font-light leading-tight">Luxury &amp; Destination<br /><em className="italic">Planning</em></h3>
              <div className="h-px bg-[#C9A234]/20 my-2" />
              <p className="font-heading text-[#C9A234] text-3xl md:text-4xl font-light tracking-tight">₹8 – 15 Lakhs</p>
              <p className="text-[13px] font-light leading-relaxed" style={{ color: 'rgba(253,250,245,0.55)' }}>Bespoke luxury experiences at India's finest venues and international destinations, crafted with uncompromising attention to detail.</p>
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <a
              href="/faq#package-inclusions"
              className="inline-flex items-center gap-2 border border-[#C9A234]/40 rounded-full px-6 py-2.5 text-[11px] tracking-[0.25em] uppercase font-medium text-[#C9A234] hover:bg-[#C9A234]/10 hover:border-[#C9A234]/70 transition-all duration-300"
            >
              <span>Learn about inclusions</span>
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
          <p className="text-center text-[11px] font-light mt-4" style={{ color: 'rgba(253,250,245,0.35)' }}>Packages are indicative ranges. Final investment is tailored to your specific requirements.</p>
        </div>
      </section>

      {/* LIGHTBOX OVERLAY */}
      {selectedService && (
        <div 
          ref={lightboxRef}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-[rgba(13,13,8,0.85)] backdrop-blur-[6px] opacity-0"
          onClick={(e) => {
            if (e.target === lightboxRef.current) closeLightbox();
          }}
        >
          <div 
            ref={panelRef}
            className="relative w-[90vw] h-[88vh] max-w-[1200px] bg-white rounded-[16px] overflow-hidden shadow-2xl flex flex-col opacity-0 mobile-bottom-sheet z-[9999]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="w-full h-[52px] flex-shrink-0 flex items-center justify-between px-7 border-b border-[#EDE8DC] bg-[#FDFAF5] z-30">
              <div className="flex items-center gap-2">
                <span className="text-[#C9A234] text-[12px]">✦</span>
                <span className="text-[11px] font-body text-[#9A8F7E] uppercase tracking-wider">Services → {selectedService.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="w-8 h-8 flex items-center justify-center text-[#9A8F7E] hover:text-[#1A1408] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                </button>
                <button 
                  onClick={closeLightbox}
                  className="w-8 h-8 flex items-center justify-center text-[#9A8F7E] hover:text-[#1A1408] transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
              </div>
            </div>

            {/* Columns Row */}
            <div className="flex-1 flex flex-col md:flex-row min-h-0 overflow-hidden">
              {/* Mobile Hero Image (Top on Mobile) */}
              <div className="md:hidden w-full h-[240px] relative flex-shrink-0">
                <Image
                  src={`/assets/photos/${selectedService.img}`}
                  alt={selectedService.name}
                  fill
                  sizes="100vw"
                  {...getBlurProps(`/assets/photos/${selectedService.img}`)}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(26,20,8,0.4)] to-transparent"></div>
              </div>

              {/* Left Column (Content) */}
              <div 
                className="w-full md:w-[42%] h-full bg-[#FDFAF5] border-r border-[#EDE8DC] flex flex-col overflow-y-auto"
                data-lenis-prevent
              >
                <div className="p-8 md:p-[32px] flex flex-col items-start">
                  <p className="text-[10px] font-body uppercase text-[#E87B3A] tracking-[0.5em] mb-0">{selectedService.number}</p>
                  <h2 className="text-[36px] md:text-[48px] font-heading text-[#1A1408] leading-[1.05] mt-[8px] mb-0">{selectedService.name}</h2>
                  <div className="h-[1px] w-14 bg-[#C9A234] mt-[12px] mb-0"></div>
                  
                  <p className="text-[14px] md:text-[15px] font-body text-[#9A8F7E] leading-relaxed max-w-[340px] mt-[16px] mb-0">
                    {selectedService.description}
                  </p>

                  <p className="text-[10px] font-body uppercase text-[#9A8F7E] tracking-[0.3em] mt-[24px] mb-0">What's Included</p>
                  <div className="flex flex-col gap-[12px] mt-[12px] mb-0">
                    {selectedService.includes.map((item, idx) => (
                      <div key={idx} className="include-item flex items-center gap-3.5 opacity-0">
                        <span className="text-[#C9A234] text-xs">✓</span>
                        <span className="text-[13px] font-body text-[#1A1408] leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-[32px] w-full flex flex-col items-center">
                    <div className="flex flex-col gap-3 w-full">
                      <Link href="/contact" className="w-full h-[50px] bg-[#C9A234] rounded-md flex items-center justify-center text-white text-[11px] font-body uppercase tracking-[0.3em] hover:brightness-110 transition-all text-center">
                        Enquire About This Service
                      </Link>
                      <button 
                        onClick={closeLightbox}
                        className="w-full h-[50px] border border-[#C9A234] rounded-md flex items-center justify-center text-[#C9A234] text-[11px] font-body uppercase tracking-[0.3em] hover:bg-[#C9A234]/5 transition-all"
                      >
                        View All Services
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (Image - Desktop Only) */}
              <div className="hidden md:block md:w-[58%] h-full relative overflow-hidden group/img">
                <Image
                  src={`/assets/photos/${selectedService.img}`}
                  alt={selectedService.name}
                  fill
                  sizes="58vw"
                  {...getBlurProps(`/assets/photos/${selectedService.img}`)}
                  className="object-cover ken-burns"
                />
                {/* Soft Edge Gradient */}
                <div className="absolute inset-y-0 left-0 w-[30%] bg-gradient-to-r from-[rgba(249,246,245,0.15)] to-transparent pointer-events-none"></div>
                
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        
        .custom-scrollbar::-webkit-scrollbar { height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(201, 162, 52, 0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(201, 162, 52, 0.2); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(201, 162, 52, 0.4); }
        
        @keyframes kenBurns {
          0% { transform: scale(1); }
          100% { transform: scale(1.08); }
        }
        .ken-burns {
          animation: kenBurns 8s ease-in-out infinite alternate;
        }

        :global(.overlay-open) {
          pointer-events: none !important;
          z-index: 50 !important;
        }

        @media (max-width: 768px) {
          .mobile-bottom-sheet {
            width: 100vw !important;
            height: 95vh !important;
            border-radius: 20px 20px 0 0 !important;
            position: fixed !important;
            bottom: 0 !important;
            max-width: none !important;
          }
        }
      `}</style>
    </div>
  );
}
