"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoldDivider from "@/components/GoldDivider";
import CornerOrnament from "@/components/CornerOrnament";

gsap.registerPlugin(ScrollTrigger);

const beachDestinations = [
  {
    id: "01",
    name: "Goa",
    tag: "The Emerald Coast",
    desc: "From the bohemian charm of Mandrem to the white-sand luxury of South Goa, we curate celebrations that blend Susegad spirit with high-end elegance. Imagine exchange vows against a crimson sunset, followed by a barefoot banquet under the stars.",
    img: "destination/059A3564.jpg",
    pills: ["South & North Goa", "Sunset Mandaps", "Luxury Resorts"]
  },
  {
    id: "02",
    name: "Kovalam",
    tag: "Kerala's Crescent",
    desc: "Famous for its iconic lighthouse and crescent-shaped beaches, Kovalam offers a dramatic backdrop of silver sands and azure waters. Our celebrations here are framed by swaying palms and the soulful rhythm of the Arabian Sea.",
    img: "destination/TSR50334.jpg",
    pills: ["Lighthouse Views", "Cliffside Luxury", "Pristine Sands"]
  },
  {
    id: "03",
    name: "Varkala",
    tag: "The Cliffside Haven",
    desc: "Where unique red cliffs meet the ocean. Varkala is for those seeking a ceremony that feels both raw and spiritual. We specialize in intimate, high-vibe celebrations perched atop the heights or nestled in hidden coves.",
    img: "couple-shots/0G4A4625.jpg",
    pills: ["Red Cliffs", "Hidden Coves", "Spiritual Vibe"]
  },
  {
    id: "04",
    name: "Alleppey",
    tag: "Backwater Coastal",
    desc: "A destination like no other. We bring the tranquility of the backwaters to the energy of the coast. Arrive at your wedding by traditional houseboat to a coconut-fringed beach altar for a truly ethereal experience.",
    img: "destination/TSR50995.jpg",
    pills: ["Houseboat Arrival", "Backwater Fusion", "Village Charm"]
  },
  {
    id: "05",
    name: "Andaman Islands",
    tag: "Exotic Havelock",
    desc: "India's own Maldives. With turquoise waters and white silica sands, the Andamans offer a private island experience. We curate exclusive celebrations in Havelock and Neil, where nature is the greatest guest.",
    img: "couple-shots/TSR53127.jpg",
    pills: ["Turquoise Water", "White Sand", "Private Island"]
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
          <div className="absolute top-6 left-6 z-10">
            <div className="bg-[rgba(200,168,75,0.08)] border border-[#C8A84B] text-[#A8892F] px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-medium rounded-[30px] shadow-lg transition-all duration-300 hover:bg-[#C8A84B] hover:text-white cursor-default">
              {dest.tag}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ContentPanel = ({ dest }) => (
    <div className="flex-grow bg-[#F9F5EF] p-[1.5rem] md:p-[2.5rem] flex flex-col justify-center relative border-l-2 border-[rgba(200,168,75,0.4)] h-full">
      <p className="text-gold font-heading text-4xl mb-2 opacity-30">{dest.id}</p>
      <h2 className="font-heading text-ink text-4xl md:text-5xl font-light mb-4">
        {dest.name}
      </h2>
      <p className="text-muted text-[14px] leading-[1.6] font-light mb-4 max-w-[500px]">
        {dest.desc}
      </p>

      {/* SVG ORNAMENT */}
      <div className="w-[120px] h-[20px] flex items-center justify-center mb-4">
        <div className="h-[0.5px] bg-[#C8A84B] flex-grow"></div>
        <div className="w-2 h-2 bg-[#C8A84B] rotate-45 mx-2"></div>
        <div className="h-[0.5px] bg-[#C8A84B] flex-grow"></div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {dest.pills.map((pill, idx) => (
          <span 
            key={idx} 
            className="border border-gold/40 px-4 py-1.5 text-[8px] tracking-[0.15em] uppercase text-ink/70 rounded-full"
          >
            {pill}
          </span>
        ))}
      </div>

      <Link 
        href="/contact" 
        className="inline-block bg-[#C8A84B] text-[#1a1200] px-[2rem] py-[0.8rem] text-[11px] tracking-[3px] uppercase font-bold transition-all duration-500 self-start border-none hover:bg-[#A8892F] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,137,47,0.25)]"
      >
        Top 5 Venues
      </Link>
    </div>
  );

  return (
    <div ref={containerRef} className="bg-bg overflow-x-hidden flex flex-col gap-0 p-0 m-0">
      {/* HERO BANNER */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden m-0 p-0">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/photos/destination/TSR50334.jpg" 
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
