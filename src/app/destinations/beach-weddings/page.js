"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoldDivider from "@/components/GoldDivider";
import CornerOrnament from "@/components/CornerOrnament";
import TiltedCard from "@/components/TiltedCard";
import FloatingSidebar from "@/components/FloatingSidebar";

gsap.registerPlugin(ScrollTrigger);

const beachDestinations = [
  {
    id: "01",
    name: "ITC Grand Goa",
    location: "GOA · CANSAULIM",
    desc1: "45 acres of lagoon-meets-sea luxury. Portuguese grandeur, lush gardens, and space for the grandest of celebrations.",
    desc2: "Arrosim Beach unfolds at its doorstep — choose between candlelit seaside lawns, a magical forest setting, or a grand marquee ballroom for 1,000+ guests. A venue that commands every sense.",
    img: "destination/ITC-grand/goilc-exterior-5185-hor-clsc.webp",
    stats: {
      rooms: "252",
      guests: "1,000+",
      space: "45,000+ Sq. Ft.",
      acres: "45"
    }
  },
  {
    id: "02",
    name: "St. Regis Goa Resort",
    location: "GOA · SAL RIVER",
    desc1: "A breathtaking 49-acre sanctuary poised between the Sal River and the Arabian Sea, blending Goan heritage with modern luxury across elegantly appointed rooms, suites, and private villas.",
    desc2: "The iconic St. Regis Butler Service, private beach access, and a signature golf course make it one of the coast's most distinguished wedding destinations.",
    img: "beach-wedding/st regis goa.jpeg",
    stats: { rooms: "206", guests: "500+", space: "32,000+ Sq Ft" }
  },
  {
    id: "03",
    name: "Grand Hyatt, Goa",
    location: "GOA · BAMBOLIM BAY",
    desc1: "A magnificent 17th-century Indo-Portuguese inspired estate sprawling across 28 acres of lush tropical gardens along Bambolim Bay — one of Goa's grandest residential wedding properties.",
    desc2: "The pillar-less Grand Ballroom, picturesque Palace Lawns, and seaside verandas with Arabian Sea views make it an elite choice for large-scale coastal celebrations.",
    img: "beach-wedding/grand-hyatt-goa.jpg",
    stats: { rooms: "312", guests: "1,200+", space: "40,000+ Sq Ft" }
  },
  {
    id: "04",
    name: "Taj Exotica, Goa",
    location: "GOA · BENAULIM BEACH",
    desc1: "A Mediterranean-inspired oasis across 56 acres of manicured gardens along pristine Benaulim Beach — intimate yet grand, with sun-drenched architecture and private beachfront access.",
    desc2: "The majestic Sala Gran Ballroom and Sea-View Lawns, backed by Taj's award-winning culinary excellence, offer a timeless setting for a quintessential Goan celebration.",
    img: "beach-wedding/taj-exortica-goa.jpg",
    stats: { rooms: "140", guests: "450+", space: "11,000+ Sq Ft" }
  },
  {
    id: "05",
    name: "Taj Cidade de Goa",
    location: "GOA · VAINGUINIM BEACH",
    desc1: "A stunning hillside tribute to Portuguese-inspired architecture — arched corridors, red-tiled roofs, and hand-painted murals frame every celebration with old-world charm and coastal romance.",
    desc2: "The iconic Sunset Lawns with panoramic Arabian Sea views and private beach access make it a picturesque and culturally rich destination.",
    img: "beach-wedding/taj-cidade-goa.jpg",
    stats: { rooms: "207", guests: "450+", venues: "Sala de Banquete + Sunset Lawns" }
  },
  {
    id: "06",
    name: "Caravela Beach Resort, Goa",
    location: "GOA · VARCA BEACH",
    desc1: "A sprawling 24-acre beachfront estate on the pristine white sands of Varca Beach, blending Indo-Portuguese heritage with refined tropical luxury.",
    desc2: "The Poolside Lawns, expansive beachfront sunset backdrop, and a unique 9-hole golf course make it a sophisticated and serene choice for a fairytale coastal celebration.",
    img: "beach-wedding/caravela-beachresort.jpg",
    stats: { rooms: "199", guests: "600+", setting: "Varca Beachfront" }
  },
  {
    id: "07",
    name: "Taj Green Cove, Kovalam",
    location: "KERALA · KOVALAM",
    desc1: "A breathtaking 10-acre Balinese-inspired retreat on a lush hillside where the backwaters meet the Arabian Sea — secluded, intimate, and entirely distinctive.",
    desc2: "Unique boat-entry experiences, the world-renowned J Wellness Circle, and Seaside Lawns for sunset ceremonies make it a fairytale destination for those seeking tranquil coastal opulence.",
    img: "beach-wedding/taj-green-cove-kerala.jpg",
    stats: { rooms: "59", guests: "500+", setting: "Hillside Backwater" }
  },
  {
    id: "08",
    name: "The Leela, Kovalam",
    location: "KERALA · KOVALAM",
    desc1: "India's only clifftop beach resort — a breathtaking architectural marvel merging panoramic Arabian Sea views with traditional Kerala heritage across exclusive clifftop accommodations.",
    desc2: "From the grand Pandal Convention Center to the intimate private beach for sunset vows, it offers a regal and ethereal setting unlike any other coastal property.",
    img: "beach-wedding/The-Leela-Palace-Trail-kovalam.jpg",
    stats: { rooms: "188", guests: "900+", setting: "Clifftop Beach Resort" }
  }
];

const itcSlides = [
  { label: "Exterior View", desc: "Classic Portuguese-inspired architecture across 45 acres of lush landscape.", img: "/assets/photos/destination/ITC-grand/goilc-exterior-5185-hor-clsc.webp" },
  { label: "Magical Forest", desc: "A tropical sanctuary for intimate woodland ceremonies and celebrations.", img: "/assets/photos/destination/ITC-grand/goilc-magicalforest-8768-hor-clsc.webp" },
  { label: "Seaside Sunset", desc: "Breathtaking Arabian Sea vistas from the property during the golden hour.", img: "/assets/photos/destination/ITC-grand/goilc-evening-sunset-8771-hor-clsc.jpg" },
  { label: "Grand Lobby", desc: "Opulent arrival experience featuring heritage Goan charm and grandeur.", img: "/assets/photos/destination/ITC-grand/lc-goilc-lobby-11425_Classic-Hor.jpeg" },
  { label: "Kayakalp Spa", desc: "Award-winning wellness sanctuary perfect for pre-wedding relaxation.", img: "/assets/photos/destination/ITC-grand/goilc-kayakalp-spa-8761_Classic-Hor.jpeg" },
  { label: "Lap Pool Suite", desc: "Ultra-luxury accommodations featuring private pool access and premium comfort.", img: "/assets/photos/destination/ITC-grand/lc-goilc-lap-pool-suite-41870_Classic-Hor.jpeg" },
];

export default function BeachWeddingsPage() {
  const containerRef = useRef(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

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

      // Parallax for card images
      const images = document.querySelectorAll(".parallax-img");
      images.forEach((img) => {
        gsap.to(img, {
          yPercent: 15,
          ease: "none",
          scrollTrigger: {
            trigger: img.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Overlay unmount delay and body scroll lock
  useEffect(() => {
    let timer;
    if (isOverlayOpen) {
      setShowOverlay(true);
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.documentElement.classList.add("lenis-stopped");
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
      document.documentElement.classList.remove("lenis-stopped");
      timer = setTimeout(() => setShowOverlay(false), 250);
    }

    return () => {
      if (timer) clearTimeout(timer);
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [isOverlayOpen]);

  // Keyboard navigation for overlay
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOverlayOpen) return;
      if (e.key === "Escape") setIsOverlayOpen(false);
      if (e.key === "ArrowLeft") setCurrentSlide((prev) => (prev > 0 ? prev - 1 : itcSlides.length - 1));
      if (e.key === "ArrowRight") setCurrentSlide((prev) => (prev < itcSlides.length - 1 ? prev + 1 : 0));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOverlayOpen]);

  const ImagePanel = ({ dest, isFeatured }) => (
    <div className={`w-full md:w-[360px] relative flex-shrink-0 p-4 md:p-6 flex items-center justify-center bg-bg h-full group/img`}>
      <div className={`relative w-full h-full max-w-[320px] md:max-w-none flex flex-col`}>
        {/* L-SHAPE ACCENTS */}
        <div className="absolute top-[-12px] left-[-12px] w-12 h-12 border-t border-l border-[#C8A84B] z-10 pointer-events-none opacity-60 transition-transform duration-700 group-hover/img:scale-110"></div>
        <div className="absolute bottom-[-12px] right-[-12px] w-12 h-12 border-b border-r border-[#C8A84B] z-10 pointer-events-none opacity-60 transition-transform duration-700 group-hover/img:scale-110"></div>
        
        <div className="relative w-full flex-grow overflow-hidden shadow-sm min-h-[450px] md:min-h-0 md:h-full">
          {isFeatured ? (
            <div className="absolute inset-0">
              <TiltedCard
                imageSrc={`/assets/photos/${dest.img}`}
                altText={dest.name}
                captionText={dest.name}
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                rotateAmplitude={12}
                scaleOnHover={1.05}
                showMobileWarning={false}
                showTooltip={true}
              />
            </div>
          ) : (
            <div className="absolute inset-0 scale-110 transition-transform duration-[2s] ease-out group-hover/img:scale-[1.2]">
              <Image 
                src={`/assets/photos/${dest.img}`} 
                alt={dest.name}
                fill
                className="object-cover parallax-img"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const ContentPanel = ({ dest, isFeatured }) => (
    <div className="flex-grow bg-[#F9F5EF] p-[1.5rem] md:p-[2.5rem] flex flex-col justify-center relative border-l-2 border-[rgba(200,168,75,0.4)] h-full w-full">
      <h2 className="font-heading text-ink text-4xl md:text-5xl font-light mb-1">
        {dest.name}
      </h2>
      <p className="text-[#C8A84B] text-[11px] tracking-[3px] uppercase font-medium mb-4">
        {dest.location}
      </p>
      
      <p className="text-muted text-[15px] leading-[1.7] font-light mb-4 w-full">
        {dest.desc1}
      </p>
      <p className="text-muted text-[15px] leading-[1.7] font-light mb-8 w-full">
        {dest.desc2}
      </p>

      {/* STATS PILLS */}
      {dest.stats && (
        <div className="flex flex-wrap gap-3 mb-8">
          {Object.entries(dest.stats).map(([key, value]) => (
            <div key={key} className="px-4 py-1.5 bg-white border border-[#C8A84B]/20 rounded-full flex items-center gap-2 shadow-sm transition-transform hover:scale-105">
              <span className="text-[#C8A84B] text-[9px] font-bold uppercase tracking-[1px]">{key}:</span>
              <span className="text-ink text-[11px] font-medium">{value}</span>
            </div>
          ))}
        </div>
      )}

      {isFeatured ? (
        <button 
          onClick={() => setIsOverlayOpen(true)}
          className="inline-block bg-[#C8A84B] text-[#1a1200] px-[2rem] py-[0.8rem] text-[11px] tracking-[3px] uppercase font-bold transition-all duration-500 self-start border-none hover:bg-[#A8892F] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,137,47,0.25)]"
        >
          Explore More About This Venue
        </button>
      ) : (
        <Link 
          href="/contact" 
          className="inline-block bg-[#C8A84B] text-[#1a1200] px-[2rem] py-[0.8rem] text-[11px] tracking-[3px] uppercase font-bold transition-all duration-500 self-start border-none hover:bg-[#A8892F] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,137,47,0.25)]"
        >
          Explore More About This Venue
        </Link>
      )}
    </div>
  );

  return (
    <div ref={containerRef} className="bg-bg overflow-x-hidden flex flex-col gap-0 p-0 m-0">
      <FloatingSidebar />
      {/* HERO BANNER */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden m-0 p-0">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/photos/destination/beach-wedding-img.jpg" 
            alt="Beach Wedding Hero"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45"></div>
        </div>

        <div className="relative z-10 text-center px-6 reveal">
          <CornerOrnament inset={40} size={60} opacity={0.8} />
          <GoldDivider darkBg className="mb-6 mx-auto" />
          <p className="text-gold text-[12px] tracking-[0.6em] uppercase mb-4 font-medium">Bespoke Coastal</p>
          <h1 className="font-heading text-surface text-7xl md:text-9xl font-light leading-tight mb-4">
            Beach<br />
            <em className="italic">Weddings</em>
          </h1>
          <GoldDivider darkBg flip className="mt-6 mx-auto" />
        </div>
      </section>

      {/* DESTINATION CARDS */}
      <section className="p-0 m-0 border-none">
        <div className="flex flex-col gap-0 p-0 m-0">
          {beachDestinations.map((dest, i) => {
            const isEven = i % 2 === 0;
            const isFeatured = dest.id === "01";
            
            return (
              <div 
                key={dest.id} 
                className="flex flex-col md:grid items-stretch reveal p-0 m-0"
                style={{ gridTemplateColumns: isEven ? '360px 1fr' : '1fr 360px' }}
              >
                {isEven ? (
                  <>
                    <ImagePanel dest={dest} isFeatured={isFeatured} />
                    <ContentPanel dest={dest} isFeatured={isFeatured} />
                  </>
                ) : (
                  <>
                    <ContentPanel dest={dest} isFeatured={isFeatured} />
                    <ImagePanel dest={dest} isFeatured={isFeatured} />
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ENQUIRY STRIP */}
      <section className="bg-[#1a1200] py-20 px-12 text-center relative overflow-hidden m-0">
        <div className="absolute inset-0 opacity-[0.15]">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#C9A234_1px,transparent_1px)] [background-size:40px_40px]"></div>
        </div>
        
        <div className="relative z-10 reveal">
          <p className="text-gold text-[12px] tracking-[0.6em] uppercase mb-6 font-medium">Your Sanctuary Awaits</p>
          <h2 className="font-heading text-surface text-5xl md:text-6xl font-light mb-12 italic">
            Begin Your Coastal <br /> Love Story
          </h2>
          <Link 
            href="/contact" 
            className="btn-gold"
          >
            Start Planning
          </Link>
        </div>
      </section>

      {/* LIGHTBOX OVERLAY */}
      {showOverlay && (
        <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-0 md:p-4">
          {/* Backdrop */}
          <div 
            className={`absolute inset-0 z-[9998] bg-[rgba(13,13,8,0.80)] backdrop-blur-[4px] transition-opacity duration-${isOverlayOpen ? '200' : '250'} ease-in ${isOverlayOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setIsOverlayOpen(false)}
          ></div>
          
          {/* Panel */}
          <div 
            className={`relative z-[9999] w-full h-[95vh] md:w-[90vw] md:max-w-[1200px] md:h-[88vh] bg-[#FFFFFF] rounded-t-[16px] md:rounded-b-[16px] overflow-hidden flex flex-col transition-all origin-center shadow-2xl ${isOverlayOpen ? "scale-100 opacity-100" : "md:scale-[0.95] translate-y-8 md:translate-y-0 opacity-0"}`}
            style={{ 
              transitionDuration: isOverlayOpen ? "420ms" : "250ms", 
              transitionTimingFunction: isOverlayOpen ? "cubic-bezier(0.16,1,0.3,1)" : "ease-in" 
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* TOP BAR */}
            <div className="h-[52px] border-b border-[#EDE8DC] px-[28px] flex justify-between items-center bg-[#FDFAF5] shrink-0">
              <div className="flex items-center gap-[8px]">
                <span className="text-[#C9A234]">✦</span>
                <span className="font-sans text-[11px] text-[#9A8F7E] tracking-wider">Beach Weddings → ITC Grand Goa</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-[#9A8F7E] hover:text-[#1A1408] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                </button>
                <button 
                  onClick={() => setIsOverlayOpen(false)}
                  className="w-[32px] h-[32px] flex items-center justify-center text-[#9A8F7E] hover:text-[#1A1408] transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            </div>

            {/* TWO COLUMNS */}
            <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
              {/* IMAGE CAROUSEL (Top on Mobile, Right on Desktop) */}
              <div className="w-full h-[45%] md:w-[58%] md:h-full flex flex-col order-1 md:order-2 shrink-0">
                <div className="relative w-full h-[75%] overflow-hidden bg-[#1A1408]">
                  {itcSlides.map((slide, i) => (
                    <div 
                      key={i}
                      className={`absolute inset-0 transition-opacity duration-[400ms] ease-in-out ${i === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                    >
                      <div className="w-full h-full transform scale-[1.0] animate-kenBurns origin-center">
                        <Image 
                          src={slide.img} 
                          alt={slide.label}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="h-[25%] bg-[#1A1408] px-[28px] py-[20px] flex flex-col justify-center shrink-0 z-20 relative">
                  <div className="flex flex-col gap-[12px]">
                    {/* Dots Row */}
                    <div className="flex justify-center items-center gap-[6px]">
                      {itcSlides.map((_, i) => (
                        <button 
                          key={i}
                          onClick={() => setCurrentSlide(i)}
                          className={`h-[6px] rounded-[100px] transition-all duration-300 ${i === currentSlide ? "w-[18px] bg-[#C9A234]" : "w-[6px] bg-[rgba(255,255,255,0.3)]"}`}
                        />
                      ))}
                    </div>

                    {/* Controls Row */}
                    <div className="flex justify-between items-center">
                      <button 
                        onClick={() => setCurrentSlide(prev => prev > 0 ? prev - 1 : itcSlides.length - 1)}
                        className="w-[36px] h-[36px] rounded-full border border-white/20 bg-[rgba(255,255,255,0.08)] flex items-center justify-center hover:bg-[rgba(201,162,52,0.2)] transition-colors group z-10"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform"><polyline points="15 18 9 12 15 6"></polyline></svg>
                      </button>

                      <div className="font-heading text-[16px] text-[#C9A234] z-10">
                        {(currentSlide + 1).toString().padStart(2, '0')} / {itcSlides.length.toString().padStart(2, '0')}
                      </div>

                      <button 
                        onClick={() => setCurrentSlide(prev => prev < itcSlides.length - 1 ? prev + 1 : 0)}
                        className="w-[36px] h-[36px] rounded-full border border-white/20 bg-[rgba(255,255,255,0.08)] flex items-center justify-center hover:bg-[rgba(201,162,52,0.2)] transition-colors group z-10"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* CONTENT AREA (Bottom on Mobile, Left on Desktop) */}
              <div 
                className="w-full h-[55%] md:w-[42%] md:h-full bg-[#FDFAF5] border-t md:border-t-0 md:border-r border-[#EDE8DC] p-[24px] md:p-[40px] overflow-y-auto order-2 md:order-1 relative"
                data-lenis-prevent
              >
                <div className="flex flex-col min-h-full">
                  <div className="flex items-center justify-center opacity-40">
                    <div className="h-[1px] w-12 bg-[#C9A234]"></div>
                    <span className="mx-3 text-[#C9A234] text-[10px]">✦</span>
                    <div className="h-[1px] w-12 bg-[#C9A234]"></div>
                  </div>

                  <div className="font-sans text-[10px] uppercase text-[#E87B3A] tracking-[5px] mt-[16px] text-center md:text-left">
                    Goa · Canasaulim
                  </div>

                  <h3 className="font-heading text-[44px] text-[#1A1408] leading-[1.05] mt-[8px] text-center md:text-left">
                    ITC Grand Goa
                  </h3>

                  <div className="w-[56px] h-[1px] bg-[#C9A234] mt-[14px] mx-auto md:mx-0"></div>

                  <p className="font-sans text-[14px] text-[#9A8F7E] leading-[1.75] mt-[18px] text-center md:text-left">
                    45 acres of lagoon-meets-sea luxury. Portuguese grandeur, lush gardens, and Arrosim Beach at its doorstep — a venue that commands every sense.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-[20px] justify-center md:justify-start">
                    <div className="px-3 py-1 bg-white border border-[#C8A84B]/20 rounded-full flex items-center gap-2 shadow-sm">
                      <span className="text-[#C8A84B] text-[9px] font-bold uppercase tracking-[1px]">Rooms:</span>
                      <span className="text-[#1A1408] text-[11px] font-medium">252</span>
                    </div>
                    <div className="px-3 py-1 bg-white border border-[#C8A84B]/20 rounded-full flex items-center gap-2 shadow-sm">
                      <span className="text-[#C8A84B] text-[9px] font-bold uppercase tracking-[1px]">Guests:</span>
                      <span className="text-[#1A1408] text-[11px] font-medium">1,000+</span>
                    </div>
                    <div className="px-3 py-1 bg-white border border-[#C8A84B]/20 rounded-full flex items-center gap-2 shadow-sm">
                      <span className="text-[#C8A84B] text-[9px] font-bold uppercase tracking-[1px]">Space:</span>
                      <span className="text-[#1A1408] text-[11px] font-medium">45,000+ Sq. Ft.</span>
                    </div>
                    <div className="px-3 py-1 bg-white border border-[#C8A84B]/20 rounded-full flex items-center gap-2 shadow-sm">
                      <span className="text-[#C8A84B] text-[9px] font-bold uppercase tracking-[1px]">Acres:</span>
                      <span className="text-[#1A1408] text-[11px] font-medium">45</span>
                    </div>
                  </div>

                  <div className="mt-[28px]">
                    <div className="font-sans text-[10px] uppercase text-[#9A8F7E] tracking-[3px] mb-3">Indoor Venues</div>
                    <ul className="space-y-3">
                      {[
                        { name: "Salcete Ballroom (divisible into 3)", size: "4,000 Sq Ft" },
                        { name: "Palm Court Prefunction", size: "1,776 Sq Ft" },
                        { name: "Colva-Loutolim (divisible into 2)", size: "1,200 Sq Ft" },
                        { name: "Benaulim Storage/Control", size: "585 Sq Ft" },
                        { name: "Cansaulim Lounge", size: "780 Sq Ft" }
                      ].map((item, i) => (
                        <li key={i} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-[#C9A234] text-lg leading-none mt-[-2px]">·</span>
                            <span className="font-sans text-[13px] text-[#1A1408]">{item.name}</span>
                          </div>
                          <span className="font-sans text-[11px] text-[#9A8F7E] text-right ml-2 shrink-0">{item.size}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="h-[1px] bg-[#EDE8DC] w-full mt-[20px]"></div>

                  <div className="mt-[20px]">
                    <div className="font-sans text-[10px] uppercase text-[#9A8F7E] tracking-[3px] mb-3">Outdoor Venues</div>
                    <ul className="space-y-3">
                      {[
                        { name: "Magical Forest", size: "14,300 Sq Ft" },
                        { name: "Seaside Lawns", size: "21,600 Sq Ft" },
                        { name: "Dunes Lawns", size: "15,750 Sq Ft" },
                        { name: "Grand Marquee Salcete", size: "9,000 Sq Ft" }
                      ].map((item, i) => (
                        <li key={i} className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-[#C9A234] text-lg leading-none mt-[-2px]">·</span>
                            <span className="font-sans text-[13px] text-[#1A1408]">{item.name}</span>
                          </div>
                          <span className="font-sans text-[11px] text-[#9A8F7E] text-right ml-2 shrink-0">{item.size}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="font-sans text-[11px] text-[#9A8F7E] italic mt-4 leading-relaxed">
                      Music permitted on outdoor venues till 22:00 hrs. Arrosim Beach access available from Seaside and Dunes Lawns.
                    </p>
                  </div>

                  <div className="h-[1px] bg-[#EDE8DC] w-full mt-[20px]"></div>

                  <div className="mt-[20px]">
                    <div className="font-sans text-[10px] uppercase text-[#9A8F7E] tracking-[3px] mb-2">Licenses Available</div>
                    <p className="font-sans text-[12px] text-[#9A8F7E] leading-[1.6]">
                      Novex, PPL, IPRS, RMPL, Sound NOC, CRZ Lawn & Beach, Panchayat NOC, Tourism, FSSAI, Excise, Fire — all subject to event requirements.
                    </p>
                  </div>

                  <div className="mt-auto pt-[32px] text-center w-full">
                    <div className="text-[#C9A234] opacity-30 tracking-[4px] mb-[20px] text-xs">✦ ✦ ✦</div>
                    <Link 
                      href="/contact"
                      className="flex items-center justify-center w-full h-[50px] bg-[#C9A234] rounded-[6px] font-sans text-[11px] uppercase tracking-[3px] text-white hover:bg-[#A8892F] hover:-translate-y-0.5 transition-all shadow-[0_10px_20px_rgba(201,162,52,0.2)]"
                    >
                      Enquire For This Venue
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .reveal { opacity: 0; transform: translateY(30px); transition: all 1s var(--ease-custom); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        @keyframes kenBurns {
          0% { transform: scale(1.0); }
          100% { transform: scale(1.04); }
        }
        .animate-kenBurns {
          animation: kenBurns 5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
