"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoldDivider from "@/components/GoldDivider";
import CornerOrnament from "@/components/CornerOrnament";
import FloatingSidebar from "@/components/FloatingSidebar";

gsap.registerPlugin(ScrollTrigger);

const hillDestinations = [
  // UTTARAKHAND VENUES
  {
    id: "H01",
    name: "The Westin Himalayas, Rishikesh",
    location: "UTTARAKHAND · RISHIKESH",
    desc1: "A magnificent mountain sanctuary perched on a hillside near Rishikesh, offering breathtaking panoramic views of forested valleys and the holy Ganges River.",
    desc2: "The grand pillar-less Grand Ballroom and spectacular Outdoor Terrace Lawns, paired with signature wellness philosophies and world-class culinary innovation, create an ethereal Himalayan backdrop for a fairytale celebration.",
    img: "hill-weddings/The Westin Himalayas Spa and resort, Uttarakhand.jpeg",
    stats: { "Rooms": "141", "Guests": "400+", "Space": "10,000+ Sq Ft" }
  },
  {
    id: "H02",
    name: "Taj Corbett, Uttarakhand",
    location: "UTTARAKHAND · JIM CORBETT",
    desc1: "A magnificent 61-acre wilderness sanctuary on the banks of the Kosi River, surrounded by the majestic forests of Jim Corbett National Park — rustic yet thoroughly opulent.",
    desc2: "Riverside outdoor lawns under a canopy of old-growth trees, bespoke outdoor dining, and unique jungle-safari charm make it a sophisticated nature-inspired wedding destination unlike any other.",
    img: "hill-weddings/Taj Corbett Spa and Resort, Uttarakhand .jpg",
    stats: { "Rooms": "61", "Guests": "400+", "Setting": "Kosi Riverside" }
  },
  // DEHRADUN VENUES
  {
    id: "H03",
    name: "Hyatt Regency, Dehradun",
    location: "DEHRADUN · HIMALAYAN FOOTHILLS",
    desc1: "A magnificent sanctuary at the foothills of the Himalayas, flanked by the serene Malsi Reserved Forest — a perfect blend of urban luxury and scenic mountain tranquility.",
    desc2: "The majestic Regency Ballroom with its 20-foot ceiling and the sprawling Regency Lawns against a breathtaking mountain backdrop make it an elite, picturesque haven for an unforgettable destination wedding.",
    img: "hill-weddings/hyatt-dehradun.jpeg",
    stats: { "Rooms": "263", "Guests": "1,000+", "Space": "33,500+ Sq Ft" }
  },
  // SRINAGAR VENUES
  {
    id: "H04",
    name: "The Lalit Grand Palace, Srinagar",
    location: "SRINAGAR · DAL LAKE",
    desc1: "Originally built in 1910 as a royal residence for Maharaja Pratap Singh, The Lalit Grand Palace overlooks the serene Dal Lake and stands as a majestic masterpiece of Himalayan heritage.",
    desc2: "Sprawling historic lawns under century-old Chinar trees, the elegant Darbar Hall, and breathtaking valley views combine to offer an extraordinarily grand and romantic stage for a heritage wedding celebration.",
    img: "hill-weddings/srinagar-the-lalit.png",
    stats: { "Rooms": "123", "Guests": "800+", "Venues": "Darbar Hall + Historic Lawns" }
  }
];

export default function HillsWeddingsPage() {
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
    <div className="w-full md:w-[360px] relative flex-shrink-0 p-4 md:p-6 flex items-center justify-center bg-bg h-full group/img">
      <div className="relative w-full h-full max-w-[320px] md:max-w-none flex flex-col">
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

      <Link 
        href="/contact" 
        className="inline-block bg-[#C8A84B] text-[#1a1200] px-[2rem] py-[0.8rem] text-[11px] tracking-[3px] uppercase font-bold transition-all duration-500 self-start border-none hover:bg-[#A8892F] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,137,47,0.25)]"
      >
        Explore More About This Venue
      </Link>
    </div>
  );

  return (
    <div ref={containerRef} className="bg-bg overflow-x-hidden flex flex-col gap-0 p-0 m-0">
      <FloatingSidebar />
      {/* HERO BANNER */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden m-0 p-0">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/photos/destination/hills-image.jpg" 
            alt="Hill Wedding Hero"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45"></div>
        </div>

        <div className="relative z-10 text-center px-6 reveal">
          <CornerOrnament inset={40} size={60} opacity={0.8} />
          <GoldDivider darkBg className="mb-6 mx-auto" />
          <p className="text-gold text-[12px] tracking-[0.6em] uppercase mb-4 font-medium">Bespoke Alpine</p>
          <h1 className="font-heading text-surface text-7xl md:text-9xl font-light leading-tight mb-4">
            Hills<br />
            <em className="italic">Weddings</em>
          </h1>
          <GoldDivider darkBg flip className="mt-6 mx-auto" />
        </div>
      </section>

      {/* DESTINATION CARDS */}
      <section className="p-0 m-0 border-none">
        <div className="flex flex-col gap-0 p-0 m-0">
          {hillDestinations.map((dest, i) => {
            const isEven = i % 2 === 0;

            return (
              <div 
                key={dest.id} 
                className="flex flex-col md:grid items-stretch reveal p-0 m-0"
                style={{ gridTemplateColumns: isEven ? '360px 1fr' : '1fr 360px' }}
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
          <p className="text-gold text-[12px] tracking-[0.6em] uppercase mb-6 font-medium">Your Summit Sanctuary</p>
          <h2 className="font-heading text-surface text-5xl md:text-6xl font-light mb-12 italic">
            Begin Your Highland <br /> Love Story
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
