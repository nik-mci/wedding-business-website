"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoldDivider from "@/components/GoldDivider";
import CornerOrnament from "@/components/CornerOrnament";
import TiltedCard from "@/components/TiltedCard";

gsap.registerPlugin(ScrollTrigger);

const beachDestinations = [
  {
    id: "01",
    name: "ITC Grand Goa",
    location: "Canasaulim",
    desc: "45 acres of lagoon-meets-sea luxury. Portugese grandeur, lush gardens, and space for the grandest of celebrations.",
    img: "destination/059A3564.jpg",
    stats: {
      rooms: "252",
      guests: "1,000+",
      space: "45,000+ Sq. Ft.",
      acres: "45"
    }
  },
  {
    id: "02",
    name: "St. Regis Goa",
    location: "Cavelossim",
    desc: "South Goa's most refined address. Colonial elegance, ocean-front lawns, and white-glove service for the discerning couple.",
    img: "destination/TSR50334.jpg",
  },
  {
    id: "03",
    name: "W Goa",
    location: "Vagator",
    desc: "Clifftop, contemporary, and unapologetically bold. The most stylish wedding backdrop on the Arabian Sea.",
    img: "couple-shots/0G4A4625.jpg",
  },
  {
    id: "04",
    name: "Alila Diwa",
    location: "Majorda",
    desc: "Paddy fields, coconut groves, and quiet boutique elegance. For couples who want intimacy over grandeur.",
    img: "destination/TSR50995.jpg",
  },
  {
    id: "05",
    name: "JW Marriott Goa",
    location: "Vagator",
    desc: "Direct beach access, expansive event lawns, and seamless multi-day celebrations for large guest lists.",
    img: "couple-shots/TSR53127.jpg",
  },
  {
    id: "06",
    name: "Taj Exotica",
    location: "Calangute",
    desc: "56 acres of heritage hospitality stretching to the shore. Goa's most iconic wedding address, and for good reason.",
    img: "destination/059A3564.jpg",
  },
  {
    id: "07",
    name: "Park Hyatt Goa",
    location: "Arossim",
    desc: "Portuguese village architecture, reflecting pools, and 45 beachfront acres in the quieter, more soulful south of Goa.",
    img: "destination/TSR50334.jpg",
  },
  {
    id: "08",
    name: "Caravela Beach Resort",
    location: "Colva",
    desc: "Old-world Goan charm with direct beach access. Warm, effortless, and built for big family celebrations.",
    img: "couple-shots/0G4A4625.jpg",
  },
  {
    id: "09",
    name: "Taj Green Cove",
    location: "Kovalam",
    desc: "Clifftop terraces, a lighthouse in the frame, and the Arabian Sea below. Kerala's most dramatic ceremony setting.",
    img: "destination/TSR50995.jpg",
  },
  {
    id: "10",
    name: "The Leela",
    location: "Kovalam",
    desc: "Traditional Kerala architecture meets private beach access. The finest luxury wedding address on the Malabar coast.",
    img: "couple-shots/TSR53127.jpg",
  },
  {
    id: "11",
    name: "Niramaya",
    location: "Kovalam",
    desc: "Intimate cliff-top villas and open ocean views. Perfect for small, private ceremonies where every detail is personal.",
    img: "destination/059A3564.jpg",
  },
  {
    id: "12",
    name: "Marari Beach Resort",
    location: "Marari",
    desc: "A secluded fishing village shore, coconut groves, and barefoot luxury. Entirely off the beaten path.",
    img: "destination/TSR50334.jpg",
  },
  {
    id: "13",
    name: "The Lalit Resort",
    location: "Bekal",
    desc: "Ancient Bekal Fort as your backdrop, backwater views at your feet. Where history and luxury meet on Kerala's northern coast.",
    img: "couple-shots/0G4A4625.jpg",
  }
];

export default function BeachWeddingsPage() {
  const containerRef = useRef(null);

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

  const ImagePanel = ({ dest, isFeatured }) => (
    <div className={`w-full ${isFeatured ? 'md:w-[360px]' : 'md:w-[420px]'} relative flex-shrink-0 p-4 md:p-6 flex items-center justify-center bg-bg h-full group/img`}>
      <div className={`relative w-full h-full ${isFeatured ? 'max-w-[320px]' : 'max-w-[360px]'} md:max-w-none flex flex-col`}>
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
    <div className="flex-grow bg-[#F9F5EF] p-[1.5rem] md:p-[2.5rem] flex flex-col justify-center relative border-l-2 border-[rgba(200,168,75,0.4)] h-full">
      <h2 className="font-heading text-ink text-4xl md:text-5xl font-light mb-1">
        {dest.name}
      </h2>
      <p className="text-[#C8A84B] text-[11px] tracking-[3px] uppercase font-medium mb-4">
        {dest.location}
      </p>
      <p className={`text-muted text-[14px] leading-[1.6] font-light mb-6 ${isFeatured ? 'w-full' : 'max-w-[500px]'}`}>
        {dest.desc}
      </p>

      {/* STATS PILLS */}
      {dest.stats && (
        <div className="flex flex-wrap gap-3 mb-8">
          {dest.stats.rooms && (
            <div className="px-4 py-1.5 bg-white border border-[#C8A84B]/20 rounded-full flex items-center gap-2 shadow-sm transition-transform hover:scale-105">
              <span className="text-[#C8A84B] text-[9px] font-bold uppercase tracking-[1px]">Rooms:</span>
              <span className="text-ink text-[11px] font-medium">{dest.stats.rooms}</span>
            </div>
          )}
          {dest.stats.guests && (
            <div className="px-4 py-1.5 bg-white border border-[#C8A84B]/20 rounded-full flex items-center gap-2 shadow-sm transition-transform hover:scale-105">
              <span className="text-[#C8A84B] text-[9px] font-bold uppercase tracking-[1px]">Guests:</span>
              <span className="text-ink text-[11px] font-medium">{dest.stats.guests}</span>
            </div>
          )}
          {dest.stats.space && (
            <div className="px-4 py-1.5 bg-white border border-[#C8A84B]/20 rounded-full flex items-center gap-2 shadow-sm transition-transform hover:scale-105">
              <span className="text-[#C8A84B] text-[9px] font-bold uppercase tracking-[1px]">Space:</span>
              <span className="text-ink text-[11px] font-medium">{dest.stats.space}</span>
            </div>
          )}
          {dest.stats.acres && (
            <div className="px-4 py-1.5 bg-white border border-[#C8A84B]/20 rounded-full flex items-center gap-2 shadow-sm transition-transform hover:scale-105">
              <span className="text-[#C8A84B] text-[9px] font-bold uppercase tracking-[1px]">Acres:</span>
              <span className="text-ink text-[11px] font-medium">{dest.stats.acres}</span>
            </div>
          )}
        </div>
      )}

      <Link 
        href="/contact" 
        className="inline-block bg-[#C8A84B] text-[#1a1200] px-[2rem] py-[0.8rem] text-[11px] tracking-[3px] uppercase font-bold transition-all duration-500 self-start border-none hover:bg-[#A8892F] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,137,47,0.25)]"
      >
        Enquire for This Venue
      </Link>
    </div>
  );

  return (
    <div ref={containerRef} className="bg-bg overflow-x-hidden flex flex-col gap-0 p-0 m-0">
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
            const imgWidth = isFeatured ? '360px' : '420px';
            
            return (
              <div 
                key={dest.id} 
                className="flex flex-col md:grid items-stretch reveal p-0 m-0"
                style={{ gridTemplateColumns: isEven ? `${imgWidth} 1fr` : `1fr ${imgWidth}` }}
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

      <style jsx>{`
        .reveal { opacity: 0; transform: translateY(30px); transition: all 1s var(--ease-custom); }
        .reveal.visible { opacity: 1; transform: translateY(0); }
      `}</style>
    </div>
  );
}
