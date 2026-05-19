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

const cityDestinations = [
  // DELHI VENUES
  {
    id: "C01",
    name: "Zora",
    location: "NEW DELHI · LODHI ROAD",
    desc1: "Designed by award-winning architect Walid Baz, The Zora is a nature-inspired masterpiece featuring soaring 45-foot ceilings and state-of-the-art 3D mapping — a masterclass in logistical efficiency and elite sophistication.",
    desc2: "From the Grand Ballroom to the fully customisable Open Canvas outdoor space, it offers unmatched versatility for celebrations of every scale.",
    img: "citiy luxe/zora-delhi.jpg",
    stats: { "Ballroom": "45,000 Sq Ft", "Guests": "3,000+", "Outdoor Space": "1.25 Lakh Sq Ft" }
  },
  {
    id: "C02",
    name: "Morebagh",
    location: "NEW DELHI · CHATTARPUR",
    desc1: "An exquisite farmhouse estate renowned for its lush Mediterranean-inspired landscapes and stunning white villa — a serene escape from the city that feels entirely world apart.",
    desc2: "Morebagh is particularly prized for its versatility, moving seamlessly between sun-drenched outdoor brunches and opulent starlit receptions.",
    img: "citiy luxe/morbagh-delhi.jpg",
    stats: { "Guests": "1,000+", "Setting": "Luxury Farmhouse", "Location": "Chattarpur" }
  },
  {
    id: "C03",
    name: "ITC Grand Bharat",
    location: "GURGAON · ARAVALLI RANGE",
    desc1: "A LEED Platinum-certified 300-acre all-suite estate paying homage to India's diverse architectural heritage — each of its suites and Presidential Villas inspired by legendary Indian dynasties.",
    desc2: "From poolside haldi ceremonies to the mystical Ghats of Yamuna evening rituals, it offers regal backdrops unlike any urban property.",
    img: "citiy luxe/ITC-grand-bharat-delhi.png",
    stats: { "Rooms": "104", "Guests": "1,300+", "Space": "50,000+ Sq Ft" }
  },
  {
    id: "C04",
    name: "Leela Palace",
    location: "NEW DELHI · DIPLOMATIC ENCLAVE",
    desc1: "A modern architectural masterpiece inspired by the grandeur of the Lutyens era, located in the prestigious Diplomatic Enclave.",
    desc2: "The magnificent Grand Ballroom, intimate terraces, and lush inner courtyards offer a sophisticated blend of royal Indian charm and contemporary luxury.",
    img: "citiy luxe/The-Leela-Palace-New-Delhi.jpg",
    stats: { "Rooms": "254", "Guests": "400+", "Setting": "Diplomatic Enclave" }
  },
  {
    id: "C05",
    name: "ITC Maurya",
    location: "NEW DELHI · DIPLOMATIC ENCLAVE",
    desc1: "A landmark of Mauryan-inspired architecture and elite hospitality at the heart of New Delhi's Diplomatic Enclave.",
    desc2: "Its crown jewel, the pillar-less Kamal Mahal ballroom, is complemented by legendary culinary heritage — including the iconic Bukhara and Dum Pukht — for an unparalleled gastronomic wedding experience.",
    img: "citiy luxe/itc-maurya-delhi.png",
    stats: { "Rooms": "437", "Guests": "600+", "Venue": "Kamal Mahal Ballroom" }
  },
  // MUMBAI VENUES
  {
    id: "C06",
    name: "Taj Lands End",
    location: "MUMBAI · BANDRA WEST",
    desc1: "Perched atop Bandra West with breathtaking panoramic views of the Arabian Sea and the iconic Bandra-Worli Sea Link, Taj Lands End is a pinnacle of seaside luxury.",
    desc2: "From the majestic Ballroom to the stunning Poolside Lawns, it blends contemporary urban grandeur with renowned Taj hospitality.",
    img: "citiy luxe/taj-mumbai.jpg",
    stats: { "Rooms": "496", "Guests": "1,000+", "Space": "55,000+ Sq Ft" }
  },
  {
    id: "C07",
    name: "Grand Hyatt BKC",
    location: "MUMBAI · BANDRA KURLA COMPLEX",
    desc1: "A sprawling 12-acre luxury landmark in Bandra Kurla Complex, Grand Hyatt Mumbai redefines urban grandeur with its world-class culinary repertoire and stunning contemporary art collection.",
    desc2: "The pillar-less Grand Ballroom is one of Mumbai's largest, complemented by a serene art-filled outdoor courtyard for alfresco celebrations.",
    img: "citiy luxe/hyatt-mumbai.jpg",
    stats: { "Rooms": "548", "Guests": "1,500+", "Space": "30,000+ Sq Ft" }
  },
  {
    id: "C08",
    name: "Fairmont Sahar",
    location: "MUMBAI · SAHAR",
    desc1: "A sophisticated urban palace near the international airport, Fairmont Sahar reflects a modern palace aesthetic with its hallmark Grandest of Spirits service.",
    desc2: "The pillar-less Grand Ballroom and beautifully landscaped Terrace Gardens make it an elite choice for seamless, high-profile celebrations.",
    img: "citiy luxe/fairmont-mumbai.jpg",
    stats: { "Rooms": "325", "Guests": "1,000+", "Ballroom": "11,000+ Sq Ft" }
  },
  // BANGALORE VENUES

  {
    id: "C10",
    name: "ITC Gardenia",
    location: "BENGALURU · CITY CENTRE",
    desc1: "An architectural tribute to Bengaluru's Garden City identity — LEED Platinum-certified with vertical gardens and open-air spaces that weave sustainability into luxury.",
    desc2: "The pillar-less Mysore Hall and lush Botanic Garden lawns offer a majestic, environmentally conscious stage for sophisticated celebrations.",
    img: "citiy luxe/itc-banglore.jpg",
    stats: { "Guests": "600+", "Venue": "Mysore Hall + Botanic Garden", "Setting": "Vertical Garden Hotel" }
  },
  {
    id: "C11",
    name: "Taj West End",
    location: "BENGALURU · CITY CENTRE",
    desc1: "A legendary 20-acre sanctuary blending Victorian-era charm with over 130 years of heritage — its colonial-style rooms and suites nestled amid lush century-old tropical gardens.",
    desc2: "The iconic Prince of Wales Lawns and the famous 150-year-old Rain Tree provide an unparalleled fairytale backdrop for outdoor ceremonies.",
    img: "citiy luxe/taj-westend-banglore.jpg",
    stats: { "Space": "20,000+ Sq Ft", "Venues": "Grand Ballroom + Prince of Wales Lawns", "Setting": "Heritage Estate" }
  },
  {
    id: "C12",
    name: "Prestige Golfshire",
    location: "BENGALURU · NANDI HILLS",
    desc1: "Set against the scenic Nandi Hills backdrop, Prestige Golfshire is an ultra-luxury retreat housing the JW Marriott Bengaluru Resort & Spa.",
    desc2: "A world-class 18-hole golf course, serene lake views, and sprawling manicured lawns make it a stunningly modern destination for large-scale celebrations away from the city.",
    img: "citiy luxe/prestigegolfshire-banglore.jpg",
    stats: { "Rooms": "301", "Guests": "1,000+", "Space": "66,000+ Sq Ft" }
  },
  {
    id: "C13",
    name: "Kings Meadow",
    location: "BENGALURU · NORTH BANGALORE",
    desc1: "A purpose-built luxury wedding destination offering a seamless blend of contemporary architecture and manicured natural beauty.",
    desc2: "Its logistical excellence — ample parking, dedicated bridal suites, and flexible vendor policies — makes it a premier open-canvas environment for grand personalised celebrations.",
    img: "citiy luxe/kings-meadows-banglore.jpg",
    stats: { "Guests": "1,500+", "Parking": "500+ Vehicles", "Setting": "Purpose-Built Venue" }
  },
  {
    id: "C14",
    name: "Angsana Oasis",
    location: "BENGALURU · NORTH BANGALORE",
    desc1: "A tranquil Mediterranean-inspired sanctuary offering an intimate yet grand boutique wedding experience surrounded by lush greenery.",
    desc2: "World-class Ayurvedic spa facilities, Thai-inspired architecture, and sprawling open-air courtyards capture the city's pleasant climate for a harmonious, wellness-forward celebration.",
    img: "citiy luxe/angsana-banglore.jpg",
    stats: { "Rooms": "79", "Guests": "1,000+", "Venues": "Main Lawn + Hibiscus + Marigold Halls" }
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
    <div className="flex-grow bg-[#F9F5EF] p-[1.5rem] md:p-[2.5rem] flex flex-col justify-center relative border-l-2 border-[rgba(200,168,75,0.4)] h-full">
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
