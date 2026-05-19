"use client";

import { useEffect, useRef, useState } from "react";
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
    desc1: "The Leela Palace Jaipur is a majestic tribute to Rajasthan's royal heritage, set against the serene backdrop of the Aravalli hills. This magnificent venue seamlessly blends traditional Rajputana architecture with Mughal-inspired design, featuring gleaming white facades, intricate Thikri mirror work, and sprawling manicured gardens...",
    img: "royal-and-heritage/leela palace-jaipur.jpg",
    stats: { rooms: "200", guests: "1,500+" },
    writeup: "The Leela Palace Jaipur is a majestic tribute to Rajasthan's royal heritage, set against the serene backdrop of the Aravalli hills. This magnificent venue seamlessly blends traditional Rajputana architecture with Mughal-inspired design, featuring gleaming white facades, intricate Thikri mirror work, and sprawling manicured gardens. It is a premier choice for both intimate ceremonies and lavish celebrations, offering luxuriously appointed rooms, suites, and villas — many featuring private plunge pools and courtyard views to ensure a truly royal stay for your guests. Choosing this destination promises an unforgettable wedding experience defined by world-class dining, exceptional hospitality, and a fairytale-like atmosphere.",
    glance: [
      { label: "Rooms", value: "200" },
      { label: "Guests", value: "1,500+" },
      { label: "Space", value: "50,000+ Sq. Ft." },
      { label: "Buyout Cost", value: "₹3.2 Cr – ₹4.8 Cr" },
      { label: "Accommodation", value: "₹2.1 – ₹3 Cr / Night" },
      { label: "F&B", value: "₹75 Lacs – ₹1.1 Cr" },
      { label: "Decor & Production", value: "₹35 – ₹70 Lacs" },
    ],
    slides: [
      { label: "Leela Palace Jaipur", desc: "A majestic tribute to Rajasthan's royal heritage.", img: "/assets/photos/royal-and-heritage/leela palace-jaipur.jpg" },
    ],
  },
  {
    id: "H06",
    name: "Hyatt Regency",
    location: "JAIPUR",
    desc1: "Hyatt Regency Jaipur Mansarovar is a palatial architectural marvel that masterfully blends classic Rajasthani flamboyance with contemporary luxury. Designed to evoke the grandeur of a heritage mansion, it stands out as a premier wedding destination with vast indoor and outdoor event spaces...",
    img: "royal-and-heritage/hyatt_jaipur.jpg",
    stats: { rooms: "245", guests: "3,000+" },
    writeup: "Hyatt Regency Jaipur Mansarovar is a palatial architectural marvel that masterfully blends classic Rajasthani flamboyance with contemporary luxury. Designed to evoke the grandeur of a heritage mansion, the property stands out as a premier wedding destination with versatile indoor and outdoor event spaces. Celebrations can transition from the pillarless Regency Ballroom to the expansive Chauras Bagh lawn against a stunning palatial backdrop. With its specialized regional catering and proximity to the airport, it offers a seamless and regal experience for every couple.",
    glance: [
      { label: "Rooms", value: "245" },
      { label: "Guests", value: "3,000+" },
      { label: "Space", value: "50,000+ Sq. Ft." },
      { label: "Buyout Cost", value: "₹2.2 Cr – ₹3.5 Cr" },
      { label: "Accommodation", value: "₹1.3 – ₹1.9 Cr / Night" },
      { label: "F&B", value: "₹60 – ₹95 Lacs" },
      { label: "Decor & Production", value: "₹30 – ₹65 Lacs" },
    ],
    slides: [
      { label: "Hyatt Regency Jaipur", desc: "A palatial marvel blending Rajasthani grandeur with modern luxury.", img: "/assets/photos/royal-and-heritage/hyatt_jaipur.jpg" },
    ],
  },
  {
    id: "H09",
    name: "Alila Fort",
    location: "BISHANGARH",
    desc1: "Perched on a granite hill, Alila Fort Bishangarh is a 236-year-old warrior fortress that offers a truly regal wedding experience. The property features a collection of distinctive venues, including the Baori, a mystical multi-level step-well space, and a 6th-floor terrace with 360-degree Aravalli views...",
    img: "royal-and-heritage/alila_fort.jpg",
    stats: { rooms: "87", guests: "650+" },
    writeup: "Perched on a granite hill, Alila Fort Bishangarh is a 236-year-old warrior fortress that offers a truly regal and intimate wedding experience. The property features a collection of distinctive venues, including the Baori — a mystical multi-level step-well space — and the 6th-floor Nazaara terrace with sweeping 360-degree Aravalli views. For grand celebrations, the expansive Aravalli Lawn provides a dramatic outdoor setting. Its secluded location and heritage charm combine to create a private, fairytale-like atmosphere for any celebration.",
    glance: [
      { label: "Rooms", value: "87" },
      { label: "Guests", value: "650+" },
      { label: "Buyout Cost", value: "₹2.5 Cr – ₹4 Cr" },
      { label: "Accommodation", value: "₹1.3 – ₹2.1 Cr / Night" },
      { label: "F&B", value: "₹40 – ₹70 Lacs" },
      { label: "Decor & Production", value: "₹40 Lacs – ₹1.2 Cr" },
    ],
    slides: [
      { label: "Alila Fort Bishangarh", desc: "A 236-year-old warrior fortress perched on a granite hill.", img: "/assets/photos/royal-and-heritage/alila_fort.jpg" },
    ],
  },
  {
    id: "H10",
    name: "Samode Palace",
    location: "JAIPUR · ARAVALLI HILLS",
    desc1: "Samode Palace is a 475-year-old Indo-Saracenic marvel nestled in the Aravalli hills, offering an intimate and secluded alternative to city-based venues. Its grandeur is defined by the legendary Sheesh Mahal, a hall of mirrors, and the Durbar Hall featuring 250-year-old frescoes...",
    img: "royal-and-heritage/samode_jaipur.jpg",
    stats: { rooms: "43", guests: "1,000+" },
    writeup: "Samode Palace is a 475-year-old Indo-Saracenic marvel nestled in the Aravalli hills, offering an intimate and secluded alternative to city-based venues. Its grandeur is defined by the legendary Sheesh Mahal, a hall of mirrors, and the Durbar Hall, featuring 250-year-old frescoes and hand-painted floral motifs. The palace is an ideal residential wedding destination with luxury rooms and suites, including Royal Suites with private Jacuzzis. For larger celebrations, the nearby Samode Bagh adds expansive Mughal gardens and additional accommodation — making it one of Rajasthan's most complete and storied heritage destinations.",
    glance: [
      { label: "Rooms", value: "43 (Palace) + 71 (Bagh)" },
      { label: "Guests", value: "1,000+" },
      { label: "Buyout Cost", value: "₹70 Lacs – ₹1.2 Cr" },
      { label: "Accommodation", value: "₹25 – ₹45 Lacs / Night" },
      { label: "F&B", value: "₹15 – ₹25 Lacs" },
      { label: "Decor & Production", value: "₹15 – ₹35 Lacs" },
    ],
    slides: [
      { label: "Samode Palace", desc: "A 475-year-old Indo-Saracenic marvel in the Aravalli hills.", img: "/assets/photos/royal-and-heritage/samode_jaipur.jpg" },
    ],
  },
  {
    id: "H20",
    name: "Raffles",
    location: "UDAIPUR · UDAI SAGAR LAKE",
    desc1: "Raffles Udaipur is a majestic private island estate in the middle of Udai Sagar Lake, embraced by the Aravallis, where rooms and suites overlook Baroque-inspired gardens and tranquil waters...",
    img: "royal-and-heritage/raffles.jpg",
    stats: { rooms: "137", guests: "500+" },
    writeup: "Raffles Udaipur is a majestic private island estate in the middle of Udai Sagar Lake, embraced by the Aravallis, where rooms and suites overlook Baroque-inspired gardens and tranquil waters. The venue is defined by its vast outdoor spaces, including manicured lawns and the stunning Great Hall ballroom. From intimate ceremonies at the Raffles Patisserie to grand celebrations on the Compass Lawn, the island provides a fairytale setting accessible only by a scenic boat ride. With its signature butler service and world-class dining, it offers an exceptionally regal atmosphere for a destination wedding.",
    glance: [
      { label: "Rooms", value: "137" },
      { label: "Guests", value: "500+" },
      { label: "Space", value: "40,000+ Sq. Ft." },
      { label: "Buyout Cost", value: "₹2.5 Cr – ₹4 Cr" },
      { label: "Accommodation", value: "₹1.6 – ₹2.5 Cr / Night" },
      { label: "F&B", value: "₹50 – ₹85 Lacs" },
      { label: "Decor & Production", value: "₹30 – ₹65 Lacs" },
    ],
    slides: [
      { label: "Raffles Udaipur", desc: "A private island estate on Udai Sagar Lake.", img: "/assets/photos/royal-and-heritage/raffles.jpg" },
    ],
  },
  {
    id: "H25",
    name: "Fairmont",
    location: "UDAIPUR · ARAVALLI HILLS",
    desc1: "Fairmont Udaipur is a grand palatial resort that captures the royal essence of Rajasthan, nestled amidst the verdant Aravalli Hills. Inspired by traditional Rajputana architecture, the property features ornate marble columns, hand-painted domes, and exquisitely designed rooms and suites...",
    img: "royal-and-heritage/fairmont.jpg",
    stats: { rooms: "327", guests: "2,000+" },
    writeup: "Fairmont Udaipur is a grand palatial resort that captures the royal essence of Rajasthan, nestled amidst the verdant Aravalli Hills. Inspired by traditional Rajputana architecture, the property features ornate marble columns, hand-painted domes, and exquisitely designed rooms and suites. It is an exceptional wedding destination offering versatile event spaces including the majestic Jewel Ballroom, the grand Jashn Palace Garden for open-air celebrations, and the unique Chand Baori — a mystical stepwell-inspired setting. This hilltop palace blends historic charm with modern luxury, ensuring a fairytale experience for every couple.",
    glance: [
      { label: "Rooms", value: "327" },
      { label: "Guests", value: "2,000+" },
      { label: "Space", value: "100,000+ Sq. Ft." },
      { label: "Buyout Cost", value: "₹4.5 Cr – ₹6.5 Cr" },
      { label: "Accommodation", value: "₹2.8 – ₹3.8 Cr / Night" },
      { label: "F&B", value: "₹1.1 – ₹1.6 Cr" },
      { label: "Decor & Production", value: "₹40 – ₹90 Lacs" },
    ],
    slides: [
      { label: "Fairmont Udaipur", desc: "A grand palatial resort in the Aravalli Hills.", img: "/assets/photos/royal-and-heritage/fairmont.jpg" },
    ],
  },
  {
    id: "H31",
    name: "Ajit Bhawan",
    location: "JODHPUR",
    desc1: "Ajit Bhawan, Jodhpur, stands as India's first heritage hotel, offering an authentic glimpse into Rajputana royalty within its sprawling crimson-sandstone estate. Built in 1927, the palace exudes an intimate yet grand charm, featuring uniquely designed rooms, suites, and luxury tents...",
    img: "royal-and-heritage/ajitbhawan_jodhpur.jpg",
    stats: { rooms: "64", guests: "400+" },
    writeup: "Ajit Bhawan, Jodhpur, stands as India's first heritage hotel, offering an authentic glimpse into Rajputana royalty within its sprawling crimson-sandstone estate. Built in 1927 for Major General Maharajadhiraja Sir Ajit Singhji, the palace exudes an intimate yet grand charm, featuring uniquely designed rooms, suites, and luxury tents. It serves as a premier wedding destination, boasting versatile venues like the lush Zenana Garden and the elegant Courtyard for traditional ceremonies. Couples are drawn to its vintage aesthetics, world-class Rajasthani cuisine, and the unique opportunity to include a fleet of classic vintage cars in their celebration.",
    glance: [
      { label: "Rooms", value: "64" },
      { label: "Guests", value: "400+" },
      { label: "Buyout Cost", value: "₹45 – ₹75 Lacs" },
      { label: "Accommodation", value: "₹25 – ₹38 Lacs / Night" },
      { label: "F&B", value: "₹12 – ₹22 Lacs" },
      { label: "Decor & Production", value: "₹10 – ₹20 Lacs" },
    ],
    slides: [
      { label: "Ajit Bhawan Jodhpur", desc: "India's first heritage hotel in the Blue City.", img: "/assets/photos/royal-and-heritage/ajitbhawan_jodhpur.jpg" },
    ],
  },
  {
    id: "H32",
    name: "Rawla Narlai",
    location: "ARAVALLI HILLS · NARLAI",
    desc1: "Rawla Narlai is a meticulously restored 17th-century royal hunting lodge located in the Aravalli Hills, halfway between Jodhpur and Udaipur. This boutique heritage destination features individually decorated rooms offering an intimate yet grand setting for destination weddings...",
    img: "royal-and-heritage/rawla_narai_royal.png",
    stats: { rooms: "32" },
    writeup: "Rawla Narlai is a meticulously restored 17th-century royal hunting lodge located in the Aravalli Hills, halfway between Jodhpur and Udaipur. This boutique heritage destination features individually decorated rooms — including the ornate Grand Heritage rooms — offering an intimate yet grand setting for destination weddings. The venue's crown jewel is the Stepwell Dinner at an 11th-century reservoir, where hundreds of lanterns and soulful folk music create a mystical atmosphere for pre-wedding functions. Additional spaces include lush frangipani-scented gardens, traditional courtyards, and the Jharokha Café. Known for its authentic Rajasthani hospitality and living-in-the-past charm, it is a premier choice for couples seeking a secluded, fairytale-like heritage celebration.",
    glance: [
      { label: "Rooms", value: "32" },
      { label: "Buyout Cost", value: "₹35 – ₹60 Lacs" },
      { label: "Accommodation", value: "₹16 – ₹35 Lacs / Night" },
      { label: "F&B", value: "₹10 – ₹18 Lacs" },
      { label: "Decor & Production", value: "₹12 – ₹20 Lacs" },
    ],
    slides: [
      { label: "Rawla Narlai", desc: "A 17th-century royal hunting lodge in the Aravalli Hills.", img: "/assets/photos/royal-and-heritage/rawla_narai_royal.png" },
    ],
  },
  {
    id: "H37",
    name: "Six Senses Fort Barwara",
    location: "RANTHAMBORE",
    desc1: "Six Senses Fort Barwara is a breathtaking 14th-century citadel sensitively restored into a sanctuary of royal grandeur near Ranthambore. This historic fort features magnificent suites designed with contemporary Rajasthani aesthetics and sweeping views of the lake and countryside...",
    img: "royal-and-heritage/six senses_ranthambore.jpg",
    stats: { rooms: "48", guests: "400+" },
    writeup: "Six Senses Fort Barwara is a breathtaking 14th-century citadel sensitively restored into a sanctuary of royal grandeur near Ranthambore. This historic fort features magnificent suites designed with contemporary Rajasthani aesthetics and sweeping views of the lake and countryside. Celebrations unfold within the Zenana Bagh (Queen's Garden), a lush outdoor venue, or the majestic Barwara Ballroom. Couples are drawn to its unique blend of heritage conservation, world-class wellness, and locally-inspired culinary experiences — a sophisticated, fairytale-like setting for couples seeking an environmentally conscious yet opulently traditional celebration.",
    glance: [
      { label: "Rooms", value: "48" },
      { label: "Guests", value: "400+" },
      { label: "Space", value: "30,000+ Sq. Ft." },
      { label: "Buyout Cost", value: "₹2 Cr – ₹3.5 Cr" },
      { label: "Accommodation", value: "₹1.4 – ₹2.1 Cr / Night" },
      { label: "F&B", value: "₹30 – ₹55 Lacs" },
      { label: "Decor & Production", value: "₹25 – ₹66 Lacs" },
    ],
    slides: [
      { label: "Six Senses Fort Barwara", desc: "A 14th-century citadel restored into a luxury sanctuary.", img: "/assets/photos/royal-and-heritage/six senses_ranthambore.jpg" },
    ],
  },
  {
    id: "H41",
    name: "Suryagarh",
    location: "JAISALMER · THAR DESERT",
    desc1: "Suryagarh Jaisalmer is a golden-sandstone fortress that serves as a gateway to the Thar Desert, masterfully blending ancient architectural traditions with modern luxury. This palatial retreat offers exquisitely crafted rooms and suites, including signature Thar Villas with private courtyards...",
    img: "royal-and-heritage/suryagarh_jailasmer.jpg",
    stats: { rooms: "72", guests: "1,200+" },
    writeup: "Suryagarh Jaisalmer is a golden-sandstone fortress that serves as a gateway to the Thar Desert, masterfully blending ancient architectural traditions with modern luxury. This palatial retreat offers exquisitely crafted rooms and suites, including signature Thar Villas with private courtyards. The estate features expansive venues like the Celebration Gardens and the mystical Bawdi, a traditional step-well designed for intimate ceremonies. From desert sundowners to grand courtyard feasts accompanied by Manganiyar folk music, its commitment to curated experiences like midnight temple trails and nomadic hunts ensures a wedding celebration that is both deeply soulful and magnificently regal.",
    glance: [
      { label: "Rooms", value: "72" },
      { label: "Guests", value: "1,200+" },
      { label: "Buyout Cost", value: "₹2.5 Cr – ₹4 Cr" },
      { label: "Accommodation", value: "₹1.5 – ₹2.5 Cr / Night" },
      { label: "F&B", value: "₹35 – ₹65 Lacs" },
      { label: "Decor & Production", value: "₹40 – ₹90 Lacs" },
    ],
    slides: [
      { label: "Suryagarh Jaisalmer", desc: "A golden-sandstone fortress at the gateway to the Thar Desert.", img: "/assets/photos/royal-and-heritage/suryagarh_jailasmer.jpg" },
    ],
  },
];

export default function RoyalHeritagePage() {
  const containerRef = useRef(null);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const openVenue = (dest) => {
    setSelectedVenue(dest);
    setCurrentSlide(0);
    setIsOverlayOpen(true);
  };

  const closeOverlay = () => {
    setIsOverlayOpen(false);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
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
      timer = setTimeout(() => {
        setShowOverlay(false);
        setSelectedVenue(null);
      }, 250);
    }

    return () => {
      if (timer) clearTimeout(timer);
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [isOverlayOpen]);

  useEffect(() => {
    const slides = selectedVenue?.slides || [];
    const handleKeyDown = (e) => {
      if (!isOverlayOpen) return;
      if (e.key === "Escape") closeOverlay();
      if (e.key === "ArrowLeft") setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
      if (e.key === "ArrowRight") setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOverlayOpen, selectedVenue]);

  const ImagePanel = ({ dest }) => (
    <div className="w-full md:w-[360px] relative flex-shrink-0 p-4 md:p-6 flex items-center justify-center bg-bg h-full group/img">
      <div className="relative w-full h-full max-w-[320px] md:max-w-none flex flex-col">
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

      <p className="text-muted text-[15px] leading-[1.7] font-light mb-6 w-full">
        {dest.desc1}
      </p>

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

      <button
        onClick={() => openVenue(dest)}
        className="inline-block bg-[#C8A84B] text-[#1a1200] px-[2rem] py-[0.8rem] text-[11px] tracking-[3px] uppercase font-bold transition-all duration-500 self-start border-none hover:bg-[#A8892F] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,137,47,0.25)]"
      >
        Explore More About This Venue
      </button>
    </div>
  );

  const slides = selectedVenue?.slides || [];

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
          <Link href="/contact" className="btn-gold">
            Start Planning
          </Link>
        </div>
      </section>

      {/* VENUE OVERLAY */}
      {showOverlay && selectedVenue && (
        <div className="fixed inset-0 z-[9999] flex items-end md:items-center justify-center p-0 md:p-4">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 z-[9998] bg-[rgba(13,13,8,0.80)] backdrop-blur-[4px] transition-opacity duration-${isOverlayOpen ? '200' : '250'} ease-in ${isOverlayOpen ? "opacity-100" : "opacity-0"}`}
            onClick={closeOverlay}
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
                <span className="font-sans text-[11px] text-[#9A8F7E] tracking-wider">
                  Royal & Heritage → {selectedVenue.name}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-[#9A8F7E] hover:text-[#1A1408] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
                </button>
                <button
                  onClick={closeOverlay}
                  className="w-[32px] h-[32px] flex items-center justify-center text-[#9A8F7E] hover:text-[#1A1408] transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
            </div>

            {/* TWO COLUMNS */}
            <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
              {/* IMAGE CAROUSEL */}
              <div className="w-full h-[45%] md:w-[50%] md:h-full flex flex-col order-1 md:order-2 shrink-0">
                <div className="relative w-full h-full overflow-hidden bg-[#1A1408]">
                  {slides.map((slide, i) => (
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

                  {/* Slide number */}
                  <div className="absolute top-4 right-4 z-20 font-heading text-[14px] text-[#C9A234]">
                    {(currentSlide + 1).toString().padStart(2, '0')} / {slides.length.toString().padStart(2, '0')}
                  </div>

                  {/* Controls */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 px-[28px] py-[20px] bg-gradient-to-t from-black/60 to-transparent flex flex-col gap-[10px]">
                    {slides.length > 1 && (
                      <div className="flex justify-center items-center gap-[6px]">
                        {slides.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`h-[5px] rounded-[100px] transition-all duration-300 ${i === currentSlide ? "w-[18px] bg-[#C9A234]" : "w-[5px] bg-white/40"}`}
                          />
                        ))}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => setCurrentSlide(prev => prev > 0 ? prev - 1 : slides.length - 1)}
                        className="w-[36px] h-[36px] rounded-full border border-white/30 bg-black/20 flex items-center justify-center hover:bg-[rgba(201,162,52,0.3)] transition-colors group"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform"><polyline points="15 18 9 12 15 6"></polyline></svg>
                      </button>

                      <div className="w-[36px]" />

                      <button
                        onClick={() => setCurrentSlide(prev => prev < slides.length - 1 ? prev + 1 : 0)}
                        className="w-[36px] h-[36px] rounded-full border border-white/30 bg-black/20 flex items-center justify-center hover:bg-[rgba(201,162,52,0.3)] transition-colors group"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform"><polyline points="9 18 15 12 9 6"></polyline></svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* CONTENT AREA */}
              <div
                className="w-full h-[55%] md:w-[50%] md:h-full bg-[#FDFAF5] border-t md:border-t-0 md:border-r border-[#EDE8DC] p-[24px] md:p-[40px] overflow-y-auto order-2 md:order-1 relative"
                data-lenis-prevent
              >
                <div className="flex flex-col min-h-full">
                  <div className="flex items-center justify-center opacity-40">
                    <div className="h-[1px] w-12 bg-[#C9A234]"></div>
                    <span className="mx-3 text-[#C9A234] text-[10px]">✦</span>
                    <div className="h-[1px] w-12 bg-[#C9A234]"></div>
                  </div>

                  <div className="font-sans text-[10px] uppercase text-[#E87B3A] tracking-[5px] mt-[16px] text-center md:text-left">
                    {selectedVenue.location}
                  </div>

                  <h3 className="font-heading text-[44px] text-[#1A1408] leading-[1.05] mt-[8px] text-center md:text-left">
                    {selectedVenue.name}
                  </h3>

                  <div className="w-[56px] h-[1px] bg-[#C9A234] mt-[14px] mx-auto md:mx-0"></div>

                  <p className="font-sans text-[14px] text-[#9A8F7E] leading-[1.75] mt-[18px] text-center md:text-left">
                    {selectedVenue.writeup}
                  </p>

                  <div className="h-[1px] bg-[#EDE8DC] w-full mt-[24px]"></div>

                  <div className="mt-[20px]">
                    <div className="font-sans text-[10px] uppercase text-[#9A8F7E] tracking-[3px] mb-4">Venue at a Glance</div>
                    <ul className="space-y-3">
                      {selectedVenue.glance.map((item, i) => (
                        <li key={i} className="flex justify-between items-start gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-[#C9A234] text-lg leading-none mt-[-2px]">·</span>
                            <span className="font-sans text-[13px] text-[#1A1408]">{item.label}</span>
                          </div>
                          <span className="font-sans text-[12px] text-[#9A8F7E] text-right shrink-0">{item.value}</span>
                        </li>
                      ))}
                    </ul>
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
