"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoldDivider from "@/components/GoldDivider";
import CornerOrnament from "@/components/CornerOrnament";

gsap.registerPlugin(ScrollTrigger);

const hillDestinations = [
  // HIMACHAL PRADESH
  { type: 'section', name: 'Himachal Pradesh' },
  {
    id: "01",
    name: "Wildflower Hall",
    location: "Shimla",
    desc: "A former residence of Lord Kitchener at 8,250 feet among cedar forests. Snow-capped peaks, colonial grandeur, and an atmosphere that feels entirely otherworldly.",
    img: "destination/hills-image.jpg",
  },
  {
    id: "02",
    name: "The Oberoi Cecil",
    location: "Shimla",
    desc: "Shimla's most storied heritage hotel since 1884. Victorian elegance, manicured gardens, and a timeless mountain setting straight out of a fairytale.",
    img: "destination/059A3486.jpg",
  },
  {
    id: "03",
    name: "Clarkes Hotel",
    location: "Shimla",
    desc: "The oldest operating hotel in Shimla. Intimate, colonial, and full of character — for couples who love history woven into every detail.",
    img: "destination/TSR50995.jpg",
  },
  {
    id: "04",
    name: "Ashapuri Village",
    location: "Manali",
    desc: "A tucked-away retreat among apple orchards and pine forests. Raw Himalayan beauty with a warm, earthy intimacy that grand resorts simply can't replicate.",
    img: "destination/TSR50501.jpg",
  },
  {
    id: "05",
    name: "Baragarh Resort & Spa",
    location: "Manali",
    desc: "Perched above the Beas River with panoramic valley views. Boutique luxury in the Kullu Valley — serene, stylish, and completely unhurried.",
    img: "destination/TSR50334.jpg",
  },
  {
    id: "06",
    name: "Welcomhotel by ITC — Hamsa",
    location: "Manali",
    desc: "ITC's signature hospitality in the mountains. Generous event spaces and world-class service for celebrations of every scale.",
    img: "destination/059A3564.jpg",
  },
  {
    id: "07",
    name: "Storii by ITC — Urvashi's Retreat",
    location: "Manali",
    desc: "A charming heritage-inspired boutique property on Manali's quieter side. Intimate lawns and old-world character for small, personal ceremonies.",
    img: "destination/pool_venue.jpg",
  },
  // UTTARAKHAND
  { type: 'section', name: 'Uttarakhand' },
  {
    id: "08",
    name: "Westin Resort & Spa",
    location: "Himalayas",
    desc: "A high-altitude sanctuary where Westin's wellness philosophy meets dramatic Himalayan scenery. Expansive event terraces and mountain air for an unforgettable celebration.",
    img: "destination/hills-image.jpg",
  },
  {
    id: "09",
    name: "Fairfield by Marriott",
    location: "Dehradun",
    desc: "A modern, well-appointed property in the gateway city of the Himalayas. Clean, comfortable, and ideal for larger guest lists needing city convenience with mountain proximity.",
    img: "destination/059A3486.jpg",
  },
  {
    id: "10",
    name: "Le Méridien",
    location: "Dehradun",
    desc: "Contemporary luxury at the foothills of the Himalayas. Stylish interiors, generous banquet spaces, and Le Méridien's signature artistic sensibility.",
    img: "destination/TSR50995.jpg",
  },
  {
    id: "11",
    name: "JW Marriott Walnut Grove",
    location: "Mussoorie",
    desc: "Nestled in the walnut groves of Mussoorie with sweeping Doon Valley views. JW's impeccable service paired with one of the most scenic hillstation settings in India.",
    img: "destination/TSR50501.jpg",
  },
  {
    id: "12",
    name: "Jaypee Residency Manor",
    location: "Mussoorie",
    desc: "A classic Mussoorie estate with expansive lawns and misty mountain backdrops. Timeless, generous, and well-suited for large multi-day wedding celebrations.",
    img: "destination/TSR50334.jpg",
  },
  {
    id: "13",
    name: "Taj Corbett Resort & Spa",
    location: "Jim Corbett",
    desc: "Where jungle meets luxury. Ceremony spaces nestled in the Corbett wilderness — for couples who want their wedding to feel like a true wild adventure.",
    img: "destination/059A3564.jpg",
  },
  {
    id: "14",
    name: "Aahana Forest Resort",
    location: "Jim Corbett",
    desc: "An eco-luxury retreat deep in the Corbett buffer zone. Intimate jungle settings, open-air spaces, and a rawness that makes every moment feel cinematic.",
    img: "destination/pool_venue.jpg",
  },
  {
    id: "15",
    name: "Bellmont Caves",
    location: "Jim Corbett",
    desc: "A distinctive boutique property with cave-inspired architecture in the Corbett forest. Unique, dramatic, and unlike any other wedding venue in the hills.",
    img: "destination/hills-image.jpg",
  },
  {
    id: "16",
    name: "Anantum Getaway Resorts",
    location: "Jim Corbett",
    desc: "A peaceful forest retreat with riverside settings and lush green surroundings. Relaxed, nature-immersed, and perfect for intimate gatherings.",
    img: "destination/059A3486.jpg",
  },
  {
    id: "17",
    name: "Taj Rishikesh",
    location: "Rishikesh",
    desc: "Suspended above the Ganges on a forested hillside, Taj Rishikesh is India's most spiritual luxury wedding address. Where vows exchanged feel truly sacred.",
    img: "destination/TSR50995.jpg",
  },
  {
    id: "18",
    name: "Summit by the Ganges",
    location: "Rishikesh",
    desc: "Riverside ceremony spaces with direct Ganges frontage and gentle mountain views. Intimate, soulful, and deeply connected to the energy of Rishikesh.",
    img: "destination/TSR50501.jpg",
  },
  // KASHMIR
  { type: 'section', name: 'Kashmir' },
  {
    id: "19",
    name: "The Lalit",
    location: "Srinagar",
    desc: "A grand property on the banks of Dal Lake blending Kashmiri heritage architecture with contemporary luxury. Shikaras, chinar trees, and mountain reflections on water — Kashmir's most complete wedding experience.",
    img: "destination/TSR50334.jpg",
  },
  {
    id: "20",
    name: "Khyber Himalayan Resort & Spa",
    location: "Gulmarg",
    desc: "At 8,825 feet in the meadows of Gulmarg, Khyber is India's highest luxury resort. Snow-dusted peaks, pine forests, and an otherworldly silence make it one of the most extraordinary wedding destinations in the world.",
    img: "destination/059A3564.jpg",
  },
  {
    id: "21",
    name: "Taj Dal View",
    location: "Srinagar",
    desc: "Perched above the famous Dal Lake with uninterrupted views of the Zabarwan mountains. Taj's legendary hospitality paired with Kashmir's most iconic landscape.",
    img: "destination/pool_venue.jpg",
  },
  {
    id: "22",
    name: "Fortune Resort Heevan",
    location: "Srinagar",
    desc: "Set in a Mughal-style garden by the Dal Lake with traditional Kashmiri architecture and warm hospitality. A beautiful, classic Kashmir wedding setting.",
    img: "destination/hills-image.jpg",
  },
  {
    id: "23",
    name: "Welcomhotel Pine & Peak",
    location: "Pahalgam",
    desc: "Nestled in the valley of Pahalgam by the Lidder River, surrounded by pine forests and meadows. Remote, romantic, and as close to a fairy-tale mountain elopement as it gets.",
    img: "destination/059A3486.jpg",
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
            if (dest.type === 'section') {
              return (
                <div key={dest.name} className="w-full bg-[#1a1200] py-16 px-12 border-y border-gold/10 reveal flex flex-col items-center justify-center">
                  <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-4 opacity-70">Regions</p>
                  <h2 className="text-gold font-heading text-4xl md:text-5xl tracking-[0.15em] uppercase text-center font-light">
                    {dest.name}
                  </h2>
                </div>
              );
            }

            const cardIndex = hillDestinations.filter(d => d.type !== 'section').indexOf(dest);
            const isEven = cardIndex % 2 === 0;

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
