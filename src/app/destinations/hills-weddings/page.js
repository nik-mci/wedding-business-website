"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoldDivider from "@/components/GoldDivider";
import CornerOrnament from "@/components/CornerOrnament";

gsap.registerPlugin(ScrollTrigger);

const hillDestinations = [
  {
    id: "H01",
    name: "The Westin Himalayas, Rishikesh",
    location: "UTTARAKHAND · RISHIKESH",
    desc1: "A magnificent mountain sanctuary perched on a hillside near Rishikesh, offering breathtaking panoramic views of forested valleys and the holy Ganges River...",
    img: "hill-weddings/The Westin Himalayas Spa and resort, Uttarakhand.jpeg",
    stats: { rooms: "141", guests: "400+" },
    writeup: "The Westin Resort & Spa, Himalayas, is a magnificent mountain sanctuary perched on a hillside near Rishikesh, offering breathtaking panoramic views of the forested valleys and the holy Ganges River. This ultra-luxury retreat provides a serene and upscale residential experience for destination weddings across its elegantly appointed rooms, suites, and private villas. Celebrations unfold within the grand, pillar-less Grand Ballroom for intimate indoor affairs, or across the spectacular Outdoor Terrace Lawns for a starlit mountain ceremony. Couples are drawn to its signature wellness philosophies, world-class culinary innovation, and dramatic Himalayan backdrop — an ethereal, tranquil, and opulent setting for a fairytale celebration.",
    glance: [
      { label: "Rooms", value: "141" },
      { label: "Guests", value: "400+" },
      { label: "Space", value: "10,000+ Sq. Ft." },
      { label: "Buyout Cost", value: "₹2.5 Cr – ₹3.5 Cr" },
      { label: "Accommodation", value: "₹1.5 – ₹2.1 Cr / Night" },
      { label: "F&B", value: "₹50 – ₹75 Lacs" },
      { label: "Decor & Production", value: "₹35 – ₹90 Lacs" },
    ],
    slides: [
      { label: "Main Entrance", desc: "The grand mountain porch and arrival experience.", img: "/assets/photos/hill-weddings/Westin resort and Spa, Himalayas/wi-dedwi-dedwi-main-porch-37022_Wide-Hor.jpeg" },
      { label: "Banquet Setup", desc: "Elegantly dressed banquet space for indoor celebrations.", img: "/assets/photos/hill-weddings/Westin resort and Spa, Himalayas/wi-dedwi-banquetcluster-01-16504_Wide-Hor.jpeg" },
      { label: "Banquet Exterior", desc: "Outdoor banquet cluster against the Himalayan backdrop.", img: "/assets/photos/hill-weddings/Westin resort and Spa, Himalayas/wi-dedwi-banquetcluster-02-19133_Wide-Hor.jpeg" },
      { label: "Garden Villa", desc: "Private garden villa nestled in the mountain landscape.", img: "/assets/photos/hill-weddings/Westin resort and Spa, Himalayas/wi-dedwi-dedwi-garden-villa-37860_Wide-Hor.jpeg" },
      { label: "Lobby", desc: "The grand lobby at dusk with valley views.", img: "/assets/photos/hill-weddings/Westin resort and Spa, Himalayas/wi-dedwi-dedwi-lobby-evening-42613_Wide-Hor.jpeg" },
      { label: "Pool", desc: "Infinity pool overlooking the forested Himalayan valleys.", img: "/assets/photos/hill-weddings/Westin resort and Spa, Himalayas/wi-dedwi-dedwi-pool-01-22123_Wide-Hor.jpeg" },
      { label: "Premier Suite", desc: "Luxurious premier balcony suite with mountain panoramas.", img: "/assets/photos/hill-weddings/Westin resort and Spa, Himalayas/wi-dedwi-dedwi-premierbalconyking--42385_Wide-Hor.jpeg" },
      { label: "Akasa Restaurant", desc: "The Akasa dining experience with Himalayan valley vistas.", img: "/assets/photos/hill-weddings/Westin resort and Spa, Himalayas/wi-dedwi-akasa-001-13487_Wide-Hor.jpeg" },
      { label: "Haven Lounge", desc: "The relaxed Haven Lounge for pre-wedding evenings.", img: "/assets/photos/hill-weddings/Westin resort and Spa, Himalayas/wi-dedwi-haven-lounge1-16584_Wide-Hor.jpeg" },
    ],
  },
  {
    id: "H02",
    name: "Taj Corbett, Uttarakhand",
    location: "UTTARAKHAND · JIM CORBETT",
    desc1: "A magnificent 61-acre wilderness sanctuary on the banks of the Kosi River, surrounded by the majestic forests of Jim Corbett National Park — rustic yet thoroughly opulent...",
    img: "hill-weddings/Taj Corbett Spa and Resort, Uttarakhand .jpg",
    stats: { rooms: "61", guests: "400+" },
    writeup: "Taj Corbett Resort & Spa, Uttarakhand, is a magnificent sanctuary nestled on the banks of the Kosi River, surrounded by the majestic forests of Jim Corbett National Park. This wilderness retreat features elegantly appointed contemporary cottages and suites, providing a rustic yet opulent residential experience for destination weddings. The resort offers versatile event spaces, highlighted by the elegant Jim's Room for indoor celebrations and sprawling, riverside outdoor lawns under a canopy of old-growth trees. Couples are drawn to its unique jungle-safari charm, world-class Taj hospitality, and bespoke outdoor dining experiences — a pristine mountain valley setting that offers a sophisticated, fairytale-like backdrop for a grand, nature-inspired wedding celebration.",
    glance: [
      { label: "Rooms", value: "61" },
      { label: "Guests", value: "400+" },
      { label: "Buyout Cost", value: "₹80 Lacs – ₹1 Cr" },
      { label: "Accommodation", value: "₹45 – ₹65 Lacs / Night" },
      { label: "F&B", value: "₹20 – ₹35 Lacs" },
      { label: "Decor & Production", value: "₹20 – ₹45 Lacs" },
    ],
    slides: [
      { label: "Riverside Sanctuary", desc: "The resort nestled on the banks of the Kosi River.", img: "/assets/photos/hill-weddings/Taj Corbett Resort and Spa, Jim Corbett, Ram Nagar/d96197a8eac8f5f86d97b9882a202a67ad3ef38a-6720x4480.avif" },
      { label: "Forest Estate", desc: "Lush old-growth forest surrounding the 61-acre estate.", img: "/assets/photos/hill-weddings/Taj Corbett Resort and Spa, Jim Corbett, Ram Nagar/8edfae5d0e52a7cc91cea85962611d9471d55c53-7200x5400.avif" },
      { label: "Outdoor Lawns", desc: "Riverside outdoor lawns under a canopy of ancient trees.", img: "/assets/photos/hill-weddings/Taj Corbett Resort and Spa, Jim Corbett, Ram Nagar/19290ed42431a5dcc0b57515c2877105b0e59288-2688x1792.avif" },
      { label: "Cottage", desc: "Elegantly appointed contemporary cottage in the jungle.", img: "/assets/photos/hill-weddings/Taj Corbett Resort and Spa, Jim Corbett, Ram Nagar/264e24a6153dc3ec6435ac31e3257be5fd8afdcd-2688x1792.avif" },
      { label: "Wildlife Setting", desc: "Jim Corbett's majestic natural landscape.", img: "/assets/photos/hill-weddings/Taj Corbett Resort and Spa, Jim Corbett, Ram Nagar/36f374537ef7d72b3e0fa6d43bd71bec17595b33-1920x1440.avif" },
      { label: "Pool", desc: "Jungle pool surrounded by dense Corbett forest.", img: "/assets/photos/hill-weddings/Taj Corbett Resort and Spa, Jim Corbett, Ram Nagar/5f2c3d46ebfa2140d03766f35135817ae6864b42-2688x1792.avif" },
      { label: "Kosi River", desc: "The serene Kosi River flowing past the resort estate.", img: "/assets/photos/hill-weddings/Taj Corbett Resort and Spa, Jim Corbett, Ram Nagar/ec799fe38da366c89714ae2a5b03f7517dc56685-2688x1792.avif" },
      { label: "Dining", desc: "Bespoke outdoor dining experience in the jungle.", img: "/assets/photos/hill-weddings/Taj Corbett Resort and Spa, Jim Corbett, Ram Nagar/fcf63eb081936f212246c78979baac2d2b6f5c63-2688x1792.avif" },
      { label: "Nature Trail", desc: "Scenic nature trail through the Corbett wilderness.", img: "/assets/photos/hill-weddings/Taj Corbett Resort and Spa, Jim Corbett, Ram Nagar/fdaa6c383618505125c762e5029714acdcf54c11-2688x1792.avif" },
    ],
  },
  {
    id: "H03",
    name: "Hyatt Regency, Dehradun",
    location: "DEHRADUN · HIMALAYAN FOOTHILLS",
    desc1: "A magnificent sanctuary at the foothills of the Himalayas, flanked by the serene Malsi Reserved Forest — a perfect blend of urban luxury and scenic mountain tranquility...",
    img: "hill-weddings/hyatt-dehradun.jpeg",
    stats: { rooms: "263", guests: "1,000+" },
    writeup: "Hyatt Regency Dehradun Resort and Spa is a magnificent sanctuary nestled at the foothills of the Himalayas, offering a perfect blend of urban luxury and scenic tranquility. Flanked by the serene Malsi Reserved Forest, this stunning property provides ample premium inventory for high-profile residential wedding parties across its elegantly appointed rooms and suites. The resort is anchored by the majestic Regency Ballroom with its soaring ceiling and the sprawling Regency Lawns set against a breathtaking mountain backdrop. With exceptional regional culinary curation and flawless service, it serves as an elite, picturesque haven for an unforgettable destination wedding.",
    glance: [
      { label: "Rooms", value: "263" },
      { label: "Guests", value: "1,000+" },
      { label: "Space", value: "33,500+ Sq. Ft." },
      { label: "Buyout Cost", value: "₹2.2 Cr – ₹3.8 Cr" },
      { label: "Accommodation", value: "₹1.4 – ₹2.2 Cr / Night" },
      { label: "F&B", value: "₹50 – ₹90 Lacs" },
      { label: "Decor & Production", value: "₹30 – ₹70 Lacs" },
    ],
    slides: [
      { label: "Aerial Facade", desc: "The grand resort facade at the Himalayan foothills.", img: "/assets/photos/hill-weddings/Hyatt Dehradun/DELRH-P0022-Aerial-Facade.16x9.webp" },
      { label: "Regency Ballroom", desc: "The majestic Regency Ballroom for grand indoor celebrations.", img: "/assets/photos/hill-weddings/Hyatt Dehradun/DELRH-P0073-Ballroom-Set-Up.16x9.webp" },
      { label: "Sky Pool Bar", desc: "Rooftop pool bar with panoramic Himalayan views.", img: "/assets/photos/hill-weddings/Hyatt Dehradun/DELRH-P0026-Sky-Pool-Bar.16x9.webp" },
      { label: "Regency Suite", desc: "Luxuriously appointed Regency Suite with mountain vistas.", img: "/assets/photos/hill-weddings/Hyatt Dehradun/DELRH-P0028-Regency-Suite-Bed-Seating-Area.16x9.webp" },
      { label: "Club Room", desc: "Elegant club guestroom with forest-facing views.", img: "/assets/photos/hill-weddings/Hyatt Dehradun/DELRH-P0074-Club-Guestroom-Bed-Seating.16x9.webp" },
      { label: "Malt Bar", desc: "The outdoor Malt Bar terrace for pre-wedding evenings.", img: "/assets/photos/hill-weddings/Hyatt Dehradun/DELRH-P0023-Malt-Bar-Outdoor.16x9.webp" },
      { label: "Dining", desc: "The Range Cosmopolitan culinary experience.", img: "/assets/photos/hill-weddings/Hyatt Dehradun/DELRH-P0027-Range-Cosmopolitan-Food-Gallery.16x9.webp" },
      { label: "Spa", desc: "Rejuvenating couples spa amid serene mountain surroundings.", img: "/assets/photos/hill-weddings/Hyatt Dehradun/DELRH-P0065-Spa-Couple-Check-in.16x9.webp" },
    ],
  },
  {
    id: "H04",
    name: "The Lalit Grand Palace, Srinagar",
    location: "SRINAGAR · DAL LAKE",
    desc1: "Originally built in 1910 as a royal residence for Maharaja Pratap Singh, The Lalit Grand Palace overlooks the serene Dal Lake and stands as a majestic masterpiece of Himalayan heritage...",
    img: "hill-weddings/srinagar-the-lalit.png",
    stats: { rooms: "123", guests: "800+" },
    writeup: "The Lalit Grand Palace Srinagar is a majestic masterpiece of Himalayan heritage, originally built in 1910 as a royal residence for the Maharaja Pratap Singh. Overlooking the serene Dal Lake, this iconic palace offers palace rooms, suites, and exclusive cottages as a regal sanctuary for a destination wedding. The property provides an unparalleled fairytale setting, boasting sprawling, manicured historic lawns under century-old Chinar trees. Indoors, the elegant Darbar Hall offers sophisticated, old-world charm for intimate rituals. Celebrated for its breathtaking valley views, Kashmiri hospitality, and timeless royal architecture, this palace offers an extraordinarily grand and romantic stage for a heritage wedding celebration.",
    glance: [
      { label: "Rooms", value: "123" },
      { label: "Guests", value: "800+" },
      { label: "Buyout Cost", value: "₹1.6 Cr – ₹2.8 Cr" },
      { label: "Accommodation", value: "₹1 – ₹1.6 Cr / Night" },
      { label: "F&B", value: "₹35 – ₹65 Lacs" },
      { label: "Decor & Production", value: "₹25 – ₹65 Lacs" },
    ],
    slides: [
      { label: "The Palace", desc: "The Lalit Grand Palace overlooking the serene Dal Lake.", img: "/assets/photos/hill-weddings/Lalit Srinagar/Lalit Srinagar.jpg" },
      { label: "Palace Grounds", desc: "Manicured historic lawns beneath century-old Chinar trees.", img: "/assets/photos/hill-weddings/Lalit Srinagar/Lalit Srinagar 1.jpg" },
      { label: "Heritage View", desc: "The palace's Himalayan heritage architecture in full grandeur.", img: "/assets/photos/hill-weddings/Lalit Srinagar/Lali Srinagar 2.jpg" },
      { label: "Dal Lake Setting", desc: "Breathtaking Dal Lake valley views from the palace.", img: "/assets/photos/hill-weddings/Lalit Srinagar/Lalit Srinagar 3.jpg" },
      { label: "Celebrations", desc: "A royal wedding celebration at The Lalit Grand Palace.", img: "/assets/photos/hill-weddings/Lalit Srinagar/Lalit Srinagar 4.jpg" },
      { label: "Evening Ambience", desc: "The Lalit Grand Palace beautifully lit at dusk.", img: "/assets/photos/hill-weddings/Lalit Srinagar/Lalit Srinagar 5.jpg" },
    ],
  },
];

export default function HillsWeddingsPage() {
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
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden m-0 p-0">
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
                  Hills Weddings → {selectedVenue.name}
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
