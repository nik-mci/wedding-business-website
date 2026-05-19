"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoldDivider from "@/components/GoldDivider";
import CornerOrnament from "@/components/CornerOrnament";

gsap.registerPlugin(ScrollTrigger);

const heritageDestinations = [
  {
    id: "H05",
    name: "Leela Palace",
    location: "JAIPUR",
    desc1: "The Leela Palace Jaipur is a majestic tribute to Rajasthan's royal heritage, set against the serene backdrop of the Aravalli hills. This magnificent venue seamlessly blends traditional Rajputana architecture with Mughal-inspired design, featuring gleaming white facades, intricate Thikri mirror work, and sprawling manicured gardens.",
    desc2: "It is a premier choice for both intimate ceremonies and lavish celebrations, offering luxuriously appointed rooms, suites, and villas, many featuring private plunge pools and courtyard views to ensure a truly royal stay for your guests. Choosing this destination promises an unforgettable wedding experience defined by world-class dining, exceptional hospitality, and a fairytale-like atmosphere.",
    img: "royal-and-heritage/leela palace-jaipur.jpg",
    stats: { rooms: "200", guests: "1,500+", space: "50,000+ Sq Ft" }
  },
  {
    id: "H06",
    name: "Hyatt Regency",
    location: "JAIPUR",
    desc1: "Hyatt Regency Jaipur Mansarovar is a palatial architectural marvel that masterfully blends classic Rajasthani flamboyance with contemporary luxury. Designed to evoke the grandeur of a heritage mansion, the property stands out as a premier wedding destination.",
    desc2: "Celebrations can transition from the pillarless Regency Ballroom to the expansive Chauras Bagh lawn against a stunning palatial backdrop. With its specialised regional catering and proximity to the airport, it offers a seamless and regal experience for every couple.",
    img: "royal-and-heritage/hyatt_jaipur.jpg",
    stats: { rooms: "245", guests: "3,000+", space: "50,000+ Sq Ft" }
  },
  {
    id: "H09",
    name: "Alila Fort",
    location: "BISHANGARH",
    desc1: "Perched on a granite hill, Alila Fort Bishangarh is a 236-year-old warrior fortress that offers a truly regal wedding experience with luxury rooms and suites. The property features a collection of distinctive venues, including the Baori, a mystical multi-level step-well space.",
    desc2: "For elevated celebrations, the 6th-floor Nazaara terrace provides sweeping 360-degree Aravalli views. Its secluded location and heritage charm combine to create a private, fairytale-like atmosphere for any celebration.",
    img: "royal-and-heritage/alila_fort.jpg",
    stats: { rooms: "87", guests: "650+", space: "19,100+ Sq Ft" }
  },
  {
    id: "H10",
    name: "Samode Palace",
    location: "JAIPUR · ARAVALLI HILLS",
    desc1: "Samode Palace is a 475-year-old Indo-Saracenic marvel nestled in the Aravalli hills, offering an intimate and secluded alternative to city-based venues. Its grandeur is defined by the legendary Sheesh Mahal, a hall of mirrors, and the Durbar Hall, featuring 250-year-old frescoes and hand-painted floral motifs.",
    desc2: "The palace is an ideal residential wedding destination with luxury rooms and suites, including Royal Suites with private Jacuzzis. For larger celebrations, the nearby Samode Bagh adds expansive Mughal gardens.",
    img: "royal-and-heritage/samode_jaipur.jpg",
    stats: { rooms: "43", guests: "1,000+", venues: "Durbar Hall + Rooftop + Bagh" }
  },
  {
    id: "H20",
    name: "Raffles",
    location: "UDAIPUR · UDAI SAGAR LAKE",
    desc1: "Raffles Udaipur is a majestic private island estate situated in the middle of Udai Sagar Lake. On a private island embraced by the Aravallis, rooms and suites overlook Baroque-inspired gardens and tranquil waters, while Raffles Lakeshore Udaipur offers a bespoke, serene retreat.",
    desc2: "The venue is defined by its vast outdoor spaces including manicured lawns and the stunning Great Hall ballroom. From intimate ceremonies at the Raffles Patisserie to grand celebrations on the Compass Lawn, the island provides a fairytale setting accessible only by a scenic boat ride. With its signature butler service and world-class dining, it offers an exceptionally regal atmosphere for a destination wedding.",
    img: "royal-and-heritage/raffles.jpg",
    stats: { rooms: "137", guests: "500+", space: "40,000+ Sq Ft" }
  },
  {
    id: "H25",
    name: "Fairmont",
    location: "UDAIPUR · ARAVALLI HILLS",
    desc1: "Fairmont Udaipur is a grand palatial resort that captures the royal essence of Rajasthan, nestled amidst the verdant Aravalli Hills. Inspired by traditional Rajputana architecture, the property features ornate marble columns, hand-painted domes, and exquisitely designed rooms and suites.",
    desc2: "It is an exceptional wedding destination offering versatile event spaces including the majestic Jewel Ballroom. For grand outdoor celebrations, the Jashn Palace Garden accommodates guests in open splendour, while the unique Chand Baori provides a mystical stepwell-inspired setting. This hilltop palace blends historic charm with modern luxury, ensuring a fairytale experience for every couple.",
    img: "royal-and-heritage/fairmont.jpg",
    stats: { rooms: "327", guests: "2,000+", space: "100,000+ Sq Ft" }
  },
  {
    id: "H31",
    name: "Ajit Bhawan",
    location: "JODHPUR",
    desc1: "Ajit Bhawan, Jodhpur, stands as India's first heritage hotel, offering an authentic glimpse into Rajputana royalty within its sprawling crimson-sandstone estate. Built in 1927 for Major General Maharajadhiraja Sir Ajit Singhji, the palace exudes an intimate yet grand charm, featuring uniquely designed rooms, suites, and luxury tents.",
    desc2: "It serves as a premier wedding destination, boasting versatile venues like the lush Zenana Garden and the elegant Courtyard for smaller, traditional ceremonies. Couples are drawn to its vintage aesthetics, world-class Rajasthani cuisine, and the unique opportunity to include a fleet of classic vintage cars in their celebration. This historic residence provides a sophisticated, soul-stirring backdrop for a truly timeless desert wedding.",
    img: "royal-and-heritage/ajitbhawan_jodhpur.jpg",
    stats: { rooms: "64", guests: "400+", venues: "Zenana Garden + Courtyard" }
  },
  {
    id: "H32",
    name: "Rawla Narlai",
    location: "ARAVALLI HILLS · NARLAI",
    desc1: "Rawla Narlai is a meticulously restored 17th-century royal hunting lodge located in the Aravalli Hills, halfway between Jodhpur and Udaipur. This boutique heritage destination features individually decorated rooms — including the ornate Grand Heritage rooms — offering an intimate yet grand setting for destination weddings.",
    desc2: "The venue's crown jewel is the Stepwell Dinner at an 11th-century reservoir, where hundreds of lanterns and soulful folk music create a mystical atmosphere for pre-wedding functions. Additional spaces include lush frangipani-scented gardens, traditional courtyards, and the Jharokha Café. Known for its authentic Rajasthani hospitality and living-in-the-past charm, it is a premier choice for couples seeking a secluded, fairytale-like heritage celebration.",
    img: "royal-and-heritage/rawla_narai_royal.png",
    stats: { rooms: "32", setting: "Boutique Heritage", venues: "Stepwell + Gardens + Courtyards" }
  },
  {
    id: "H37",
    name: "Six Senses Fort Barwara",
    location: "RANTHAMBORE",
    desc1: "Six Senses Fort Barwara is a breathtaking 14th-century citadel sensitively restored into a sanctuary of royal grandeur near Ranthambore. This historic fort features magnificent suites, each designed with contemporary Rajasthani aesthetics and sweeping views of the lake and countryside.",
    desc2: "As a premier wedding destination, it offers a dramatic sense of place with curated event spaces. Celebrations unfold within the Zenana Bagh, a lush outdoor venue, or the majestic Barwara Ballroom. Couples are drawn to its unique blend of heritage conservation, world-class wellness, and locally-inspired culinary experiences. This secluded fortress provides a sophisticated, fairytale-like setting for couples seeking an environmentally conscious yet opulently traditional celebration.",
    img: "royal-and-heritage/six senses_ranthambore.jpg",
    stats: { rooms: "48", guests: "400+", space: "30,000+ Sq Ft" }
  },
  {
    id: "H41",
    name: "Suryagarh",
    location: "JAISALMER · THAR DESERT",
    desc1: "Suryagarh Jaisalmer is a golden-sandstone fortress that serves as a gateway to the Thar Desert, masterfully blending ancient architectural traditions with modern luxury. This palatial retreat offers exquisitely crafted rooms and suites, including signature Thar Villas with private courtyards.",
    desc2: "The estate is a premier wedding destination featuring expansive venues like the Celebration Gardens and the mystical Bawdi, a traditional step-well designed for intimate ceremonies. From desert sundowners to grand courtyard feasts accompanied by Manganiyar folk music, Suryagarh provides an unparalleled sense of place. Its commitment to curated experiences like midnight temple trails and nomadic hunts ensures a wedding celebration that is both deeply soulful and magnificently regal.",
    img: "royal-and-heritage/suryagarh_jailasmer.jpg",
    stats: { rooms: "72", guests: "1,200+", venues: "Celebration Gardens + Bawdi Stepwell" }
  }
];

export default function RoyalHeritagePage() {
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
      {/* HERO BANNER */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden m-0 p-0">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/photos/destination/TSR50334.jpg" 
            alt="Royal Heritage Hero"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/45"></div>
        </div>

        <div className="relative z-10 text-center px-6 reveal">
          <CornerOrnament inset={40} size={60} opacity={0.8} />
          <GoldDivider darkBg className="mb-6 mx-auto" />
          <p className="text-gold text-[12px] tracking-[0.6em] uppercase mb-4 font-medium">Bespoke Regal</p>
          <h1 className="font-heading text-surface text-7xl md:text-9xl font-light leading-tight mb-4">
            Royal &<br />
            <em className="italic">Heritage</em>
          </h1>
          <GoldDivider darkBg flip className="mt-6 mx-auto" />
        </div>
      </section>

      {/* DESTINATION CARDS */}
      <section className="p-0 m-0 border-none">
        <div className="flex flex-col gap-0 p-0 m-0">
          {heritageDestinations.map((dest, i) => {
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
          <p className="text-gold text-[12px] tracking-[0.6em] uppercase mb-6 font-medium">Your Royal Sanctuary</p>
          <h2 className="font-heading text-surface text-5xl md:text-6xl font-light mb-12 italic">
            Begin Your Regal <br /> Love Story
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
