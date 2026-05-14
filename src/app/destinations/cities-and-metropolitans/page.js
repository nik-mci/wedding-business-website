"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoldDivider from "@/components/GoldDivider";
import CornerOrnament from "@/components/CornerOrnament";

gsap.registerPlugin(ScrollTrigger);

const cityDestinations = [
  // DELHI & NCR
  {
    id: "C01",
    name: "Zora",
    location: "DELHI",
    desc: "A boutique sanctuary in the heart of the capital, offering a perfect blend of modern sophistication and intimate luxury for the discerning urban couple.",
    img: "destination/cities-wedding.jpg",
  },
  {
    id: "C02",
    name: "A Dot",
    location: "GURUGRAM",
    desc: "A monumental event space in Gurugram, known for its grand scale, contemporary architecture, and world-class facilities designed for massive celebrations.",
    img: "destination/059A3486.jpg",
  },
  {
    id: "C03",
    name: "Morbagh",
    location: "CHATTARPUR",
    desc: "A lush, sprawling estate in Chattarpur that offers a serene garden setting for elegant farmhouse-style weddings with a touch of rustic charm and absolute privacy.",
    img: "destination/pool_venue.jpg",
  },
  {
    id: "C04",
    name: "Leela Palace",
    location: "DELHI",
    desc: "A flagship of luxury in the diplomatic enclave. Opulent interiors, legendary service, and grand ballrooms that define the absolute pinnacle of city weddings.",
    img: "destination/TSR50334.jpg",
  },
  {
    id: "C05",
    name: "ITC Maurya",
    location: "DELHI",
    desc: "An iconic landmark hosting world leaders and grand celebrations. Its storied architecture and culinary excellence make it a legendary venue for high-profile weddings.",
    img: "destination/0G4A1341.jpg",
  },
  // MUMBAI
  {
    id: "C06",
    name: "Fairmont",
    location: "MUMBAI",
    desc: "A grand presence in the city of dreams. Offering sophisticated ballrooms and polished international hospitality for elegant urban celebrations of every scale.",
    img: "destination/TSR50995.jpg",
  },
  {
    id: "C07",
    name: "Taj Lands End",
    location: "MUMBAI",
    desc: "Perched on the Bandra seafront with stunning views of the Arabian Sea. A premier choice for luxury city weddings that crave the sound of waves and a cool ocean breeze.",
    img: "destination/beach-wedding-img.jpg",
  },
  {
    id: "C08",
    name: "Hyatt BKC",
    location: "MUMBAI",
    desc: "Located in the heart of Mumbai's business district. Modern, chic, and perfectly equipped for large-scale contemporary wedding celebrations that pulse with the city's energy.",
    img: "destination/TSR50355.jpg",
  },
  {
    id: "C09",
    name: "JWCC",
    location: "MUMBAI",
    desc: "The JW Marriott Hotel & Convention Centre. A powerhouse for grand weddings with massive pillarless ballrooms and world-class international service standards.",
    img: "destination/059A3564.jpg",
  },
  // BANGALORE
  {
    id: "C10",
    name: "Sheraton Grand Whitefield",
    location: "BANGALORE",
    desc: "A premier destination in the tech hub. Boasting expansive indoor and outdoor venues designed for seamless multi-day wedding programmes and effortless guest flow.",
    img: "destination/059A3486.jpg",
  },
  {
    id: "C11",
    name: "Leela Palace",
    location: "BANGALORE",
    desc: "Inspired by the Royal Palace of Mysore. A breathtaking garden estate in the city with ornate carvings, lush greenery, and unparalleled palatial luxury.",
    img: "destination/TSR50967.jpg",
  },
  {
    id: "C12",
    name: "Taj Westend",
    location: "BANGALORE",
    desc: "A century-old sanctuary amidst 20 acres of flora and fauna. Iconic colonial architecture and sprawling lawns for a soulful heritage wedding in the heart of the city.",
    img: "destination/hills-image.jpg",
  },
  {
    id: "C13",
    name: "Tamarind Tree",
    location: "BANGALORE",
    desc: "A magical venue where heritage meets nature. Featuring antique doorways, open-air courtyards, and a truly unique, earthy aesthetic for intimate celebrations.",
    img: "destination/pool_venue.jpg",
  },
  {
    id: "C14",
    name: "Aura by Area 83",
    location: "BANGALORE",
    desc: "A hidden gem on the outskirts of the city. Modern, eco-conscious, and offering a serene lakeside setting for a refreshing urban escape wedding experience.",
    img: "destination/backwaterandlakes.jpg",
  },
  {
    id: "C15",
    name: "Palace Ground",
    location: "BANGALORE",
    desc: "The legendary grounds of the Bangalore Palace. Massive, historic, and capable of hosting the city's most grand and elaborate royal-scale wedding spectacles.",
    img: "destination/TSR50334.jpg",
  }
];

export default function CitiesMetropolitansPage() {
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

  const ImagePanel = ({ dest }) => (
    <div className="w-full md:w-[420px] relative flex-shrink-0 p-4 md:p-6 flex items-center justify-center bg-bg h-full group/img">
      <div className="relative w-full h-full max-w-[360px] md:max-w-none flex flex-col">
        {/* L-SHAPE ACCENTS */}
        <div className="absolute top-[-12px] left-[-12px] w-12 h-12 border-t border-l border-[#C8A84B] z-10 pointer-events-none opacity-60 transition-transform duration-700 group-hover/img:scale-110"></div>
        <div className="absolute bottom-[-12px] right-[-12px] w-12 h-12 border-b border-r border-[#C8A84B] z-10 pointer-events-none opacity-60 transition-transform duration-700 group-hover/img:scale-110"></div>
        
        <div className="relative w-full flex-grow overflow-hidden shadow-sm min-h-[450px] md:min-h-0 md:h-full">
          <div className="absolute inset-0 scale-110 transition-transform duration-[2s] ease-out group-hover/img:scale-[1.2]">
            <Image 
              src={`/assets/photos/${dest.img}`} 
              alt={dest.name}
              fill
              className="object-cover parallax-img"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const ContentPanel = ({ dest }) => (
    <div className="flex-grow bg-[#F9F5EF] p-[1.5rem] md:p-[2.5rem] flex flex-col justify-center relative border-l-2 border-[rgba(200,168,75,0.4)] h-full">
      <h2 className="font-heading text-ink text-4xl md:text-5xl font-light mb-1">
        {dest.name}
      </h2>
      <p className="text-[#C8A84B] text-[11px] tracking-[3px] uppercase font-medium mb-4">
        {dest.location}
      </p>
      <p className="text-muted text-[14px] leading-[1.6] font-light mb-6 max-w-[500px]">
        {dest.desc}
      </p>

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
            src="/assets/photos/destination/cities-wedding.jpg" 
            alt="City Wedding Hero"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45"></div>
        </div>

        <div className="relative z-10 text-center px-6 reveal">
          <CornerOrnament inset={40} size={60} opacity={0.8} />
          <GoldDivider darkBg className="mb-6 mx-auto" />
          <p className="text-gold text-[12px] tracking-[0.6em] uppercase mb-4 font-medium">Bespoke Urban</p>
          <h1 className="font-heading text-surface text-7xl md:text-9xl font-light leading-tight mb-4">
            Cities &<br />
            <em className="italic">Metropolitans</em>
          </h1>
          <GoldDivider darkBg flip className="mt-6 mx-auto" />
        </div>
      </section>

      {/* DESTINATION CARDS */}
      <section className="p-0 m-0 border-none">
        <div className="flex flex-col gap-0 p-0 m-0">
          {cityDestinations.map((dest, i) => {
            const isEven = i % 2 === 0;

            return (
              <div 
                key={dest.id} 
                className="flex flex-col md:grid items-stretch reveal p-0 m-0"
                style={{ gridTemplateColumns: isEven ? '420px 1fr' : '1fr 420px' }}
              >
                {isEven ? (
                  <>
                    <ImagePanel dest={dest} />
                    <ContentPanel dest={dest} />
                  </>
                ) : (
                  <>
                    <ContentPanel dest={dest} />
                    <ImagePanel dest={dest} />
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
          <p className="text-gold text-[12px] tracking-[0.6em] uppercase mb-6 font-medium">Your Urban Sanctuary</p>
          <h2 className="font-heading text-surface text-5xl md:text-6xl font-light mb-12 italic">
            Begin Your Cosmopolitan <br /> Love Story
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
