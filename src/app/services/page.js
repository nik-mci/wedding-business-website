"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
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
    img: "couple-shots/TSR53067.jpg",
    photographer: "Stories by Joseph Radhik"
  },
  {
    id: "design-decor",
    number: "03",
    name: "Design & Decor",
    tagline: "Environments crafted to reflect your story",
    description: "Every mandap, every centerpiece, every lighting rig is designed to reflect you. We build immersive environments, not just decorations.",
    includes: ["Bespoke Conceptualizing & Mood Boards", "Immersive Floral Artistry", "Custom Scenography & Production", "Strategic Lighting & Soundscaping", "Finer Details & Table Scaping"],
    img: "services/decoration/haldi_flowers_decor.jpg",
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
    img: "services/hospitality_service.png",
    photographer: "Palace Hospitality"
  },
  {
    id: "vendor-management",
    number: "07",
    name: "Vendor Management",
    tagline: "Curated network of India's elite artisans",
    description: "We bring you access to the most exclusive wedding partners — from bespoke couturiers and award-winning caterers to artisanal invitation designers.",
    includes: ["Elite Network Access", "Comprehensive Contract & Rate Negotiation", "Centralized Communication Hub", "Integrated Timeline & Delivery Schedule", "Financial Tracking & Payment Milestones"],
    img: "couple-shots/hospitality1.jpg",
    photographer: "Vows & Vedas Artisan Network"
  },
  {
    id: "travel-logistics",
    number: "08",
    name: "Travel & Logistics",
    tagline: "Seamless fleet management and guest transit",
    description: "We handle the complex movement of hundreds of guests across venues and cities with precision, from luxury airport transfers to venue shuttles.",
    includes: ["Guest travel & ticket coordination", "Luxury car fleet & coach management", "On-site transport concierge desk", "Real-time transit tracking & communication", "Venue-to-hotel shuttle coordination"],
    img: "services/transport-logistics.jpg",
    photographer: "Logistics Excellence"
  },
  {
    id: "food-beverages",
    number: "09",
    name: "Food & Beverage",
    tagline: "Bespoke menus and world-class bar curation",
    description: "We curate culinary journeys that span continents, from traditional regional feasts to avant-garde international fine dining and specialty bar experiences.",
    includes: ["Bespoke Menu Engineering", "Signature Mixology & Craft Bar Concept", "Immersive Live Stations & Food Theatre", "Thematic Styling & Presentation Design", "Meticulous Dietary & Allergens Planning", "Flawless Banquet & Service Logistics"],
    img: "services/decoration/059A4328.jpg",
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

  useEffect(() => {
    // Initial check for hash
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const service = services.find(s => s.id === hash);
      if (service) setSelectedService(service);
    }

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
    
    return () => ctx.revert();
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
    <div className="pt-20 bg-[#FDFAF5]">
      {/* PAGE HERO (EXISTING) */}
      <div className="page-hero">
        <div
          className="page-hero-bg"
          style={{ backgroundImage: "url('/assets/photos/destination/pool_venue.jpg')", backgroundPosition: "center top" }}
        ></div>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <GoldDivider darkBg className="mb-4" />
          <p className="page-hero-eyebrow">What We Offer</p>
          <h1 className="page-hero-title">Our <em className="italic">Services</em></h1>
          <GoldDivider darkBg flip className="mt-4" />
        </div>
      </div>

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
                  
                  <div className="mt-5 px-5 py-2 rounded-full bg-[#C9A234]/15 border border-[#C9A234]/40 backdrop-blur-sm transition-all duration-300 group-hover:bg-[#C9A234] group-hover:text-[#1A1408]">
                    <span className="text-[11px] font-body uppercase tracking-[0.3em] text-[#C9A234] group-hover:text-[#1A1408]">Explore Service →</span>
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
      <section id="addons" className="bg-[#1A1408] py-24 px-6 md:px-12">
        <div className="flex flex-col items-center text-center">
          <GoldDivider darkBg className="mb-4" />
          <p className="text-[10px] font-body uppercase text-[#C9A234] tracking-[0.5em] mb-4">Elevate Further</p>
          <h2 className="text-[48px] font-heading text-white leading-tight mb-2">Add-<em className="italic">Ons</em></h2>
          <GoldDivider darkBg flip className="mt-2" />
        </div>
        <div className="flex overflow-x-auto gap-4 mt-16 max-w-[1280px] mx-auto pb-8 custom-scrollbar scroll-smooth">
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
              img: "services/decoration/e-invites and stationary.JPG",
              name: "E-Invites", 
              tagline: "Animated Digital Invitations", 
              description: "Custom digital wedding invitations with RSVP tracking and animated reveals." 
            },
            { 
              img: "services/decoration/haldi_flowers_decor.jpg",
              name: "Home Decor", 
              tagline: "Pre & Post Wedding Styling", 
              description: "Bringing the celebration home with elegant floral and lighting designs for your residence." 
            },
            { 
              img: "services/website-addson.png",
              name: "Website Creation", 
              tagline: "Bespoke Guest Hubs", 
              description: "A bespoke digital hub for your guests with RSVPs, gallery, and travel itineraries." 
            }
          ].map((addon, i) => (
            <AddOnCard key={i} addon={addon} />
          ))}
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
