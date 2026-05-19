"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoldDivider from "@/components/GoldDivider";
import CornerOrnament from "@/components/CornerOrnament";

gsap.registerPlugin(ScrollTrigger);

const cityDestinations = [
  // DELHI
  {
    id: "C01",
    name: "Zora",
    location: "NEW DELHI · LODHI ROAD",
    desc1: "Designed by award-winning architect Walid Baz, The Zora – Delhi Convention Center is a nature-inspired masterpiece featuring soaring 45-foot ceilings and state-of-the-art 3D mapping — a masterclass in logistical efficiency and elite sophistication...",
    img: "citiy luxe/zora-delhi.jpg",
    stats: { guests: "3,000+" },
    writeup: "The Zora – Delhi Convention Center is a premier luxury destination on Lodhi Road, designed by award-winning architect Walid Baz. It blends nature-inspired artistry with modern grandeur, featuring soaring 45-foot ceilings and state-of-the-art 3D mapping. The venue offers unmatched versatility for large-scale celebrations, anchored by the Grand Ballroom for intimate to large gatherings, while the sprawling Open Canvas provides a fully customizable outdoor setting. With abundant parking and close proximity to top five-star hotels, it is a masterclass in logistical efficiency and elite sophistication for any wedding.",
    glance: [
      { label: "Guests", value: "3,000+" },
      { label: "Grand Ballroom", value: "45,000 Sq. Ft." },
      { label: "Open Canvas", value: "1.25 Lakh Sq. Ft." },
      { label: "Parking", value: "2,000+ Vehicles" },
    ],
    slides: [
      { label: "Zora Delhi", desc: "A nature-inspired convention center on Lodhi Road.", img: "/assets/photos/citiy luxe/zora-delhi.jpg" },
    ],
  },
  {
    id: "C02",
    name: "Morebagh",
    location: "NEW DELHI · CHATTARPUR",
    desc1: "An exquisite farmhouse estate in Chattarpur renowned for its lush Mediterranean-inspired landscapes and stunning white villa — a serene escape for luxury farmhouse celebrations...",
    img: "citiy luxe/morbagh-delhi.jpg",
    stats: { guests: "1,000+" },
    writeup: "Morebagh is an exquisite farmhouse estate in Chattarpur, New Delhi, renowned for its lush, sprawling landscapes and Mediterranean-inspired elegance. This premier venue offers a serene escape from the city's bustle, featuring meticulously manicured gardens and a stunning white villa that serves as a sophisticated backdrop for upscale celebrations. Morebagh is particularly favored for its versatility, allowing for seamless transitions between sun-drenched outdoor brunches and opulent starlit receptions. Its blend of high-end privacy, contemporary aesthetics, and vast open spaces makes it a top choice for couples seeking a personalized, luxury farmhouse wedding experience in the heart of Delhi's elite wedding hub.",
    glance: [
      { label: "Guests", value: "1,000+" },
      { label: "Setting", value: "Luxury Farmhouse Estate" },
    ],
    slides: [
      { label: "Morebagh Chattarpur", desc: "A Mediterranean-inspired luxury farmhouse estate.", img: "/assets/photos/citiy luxe/morbagh-delhi.jpg" },
    ],
  },
  {
    id: "C03",
    name: "ITC Grand Bharat",
    location: "GURGAON · ARAVALLI RANGE",
    desc1: "A LEED Platinum-certified 300-acre all-suite estate in the Aravalli Range, paying homage to India's diverse architectural heritage — its suites and Presidential Villas each inspired by legendary Indian dynasties...",
    img: "citiy luxe/ITC-grand-bharat-delhi.png",
    stats: { rooms: "104", guests: "1,300+" },
    writeup: "ITC Grand Bharat, located in the Aravalli Range near Gurgaon, is a LEED Platinum-certified luxury retreat that pays homage to India's diverse architectural heritage. This expansive all-suite estate features deluxe suites and four palatial Presidential Villas, each inspired by legendary Indian dynasties. It serves as a premier wedding destination with vast event spaces, including the pillar-less Prithvi Ballroom and sprawling manicured lawns like Peacock Lawn for grander celebrations. From poolside haldi ceremonies to the mystical Ghats of Yamuna evening rituals, the resort offers regal backdrops supported by ITC's renowned hospitality and world-class culinary experiences.",
    glance: [
      { label: "Rooms", value: "104" },
      { label: "Guests", value: "1,300+" },
      { label: "Space", value: "50,000+ Sq. Ft." },
      { label: "Buyout Cost", value: "₹2.5 Cr – ₹3.8 Cr" },
      { label: "Accommodation", value: "₹1.6 – ₹2.2 Cr / Night" },
      { label: "F&B", value: "₹45 – ₹70 Lacs" },
      { label: "Decor & Production", value: "₹40 – ₹90 Lacs" },
    ],
    slides: [
      { label: "ITC Grand Bharat", desc: "A 300-acre all-suite estate in the Aravalli Range.", img: "/assets/photos/citiy luxe/ITC-grand-bharat-delhi.png" },
    ],
  },
  {
    id: "C04",
    name: "Leela Palace",
    location: "NEW DELHI · DIPLOMATIC ENCLAVE",
    desc1: "The Leela Palace New Delhi, in the prestigious Diplomatic Enclave, is a modern architectural masterpiece inspired by the grandeur of the Lutyens era, offering some of the city's largest and most luxuriously appointed rooms...",
    img: "citiy luxe/The-Leela-Palace-New-Delhi.jpg",
    stats: { rooms: "254", guests: "400+" },
    writeup: "The Leela Palace New Delhi, located in the prestigious Diplomatic Enclave, is a modern architectural masterpiece inspired by the grandeur of the Lutyens era. This palatial hotel offers luxuriously appointed rooms and suites, boasting some of the largest entry-level guest rooms in the city. As a wedding destination, it offers a sophisticated blend of royal Indian charm and contemporary luxury, anchored by the magnificent Grand Ballroom. For more intimate or outdoor ceremonies, the terrace and lush inner courtyards provide an elite setting. Renowned for its world-class dining, bespoke service, and iconic rooftop pool, it offers an exceptionally regal and centrally located backdrop for high-end celebrations.",
    glance: [
      { label: "Rooms", value: "254" },
      { label: "Guests", value: "400+" },
      { label: "Buyout Cost", value: "₹4.8 Cr – ₹6.8 Cr" },
      { label: "Accommodation", value: "₹3.2 – ₹4.4 Cr / Night" },
      { label: "F&B", value: "₹1 – ₹1.4 Cr" },
      { label: "Decor & Production", value: "₹60 Lacs – ₹1.2 Cr" },
    ],
    slides: [
      { label: "Leela Palace New Delhi", desc: "A Lutyens-era inspired palace in the Diplomatic Enclave.", img: "/assets/photos/citiy luxe/The-Leela-Palace-New-Delhi.jpg" },
    ],
  },
  {
    id: "C05",
    name: "ITC Maurya",
    location: "NEW DELHI · DIPLOMATIC ENCLAVE",
    desc1: "A landmark of Mauryan-inspired architecture and elite hospitality at the heart of New Delhi's Diplomatic Enclave, home to the legendary Bukhara and Dum Pukht dining experiences...",
    img: "citiy luxe/itc-maurya-delhi.png",
    stats: { rooms: "437", guests: "600+" },
    writeup: "ITC Maurya is a landmark of Mauryan-inspired architecture and elite hospitality located in the heart of New Delhi's Diplomatic Enclave. This iconic property features an ideal inventory for residential weddings requiring significant capacity. Its crown jewel is the Kamal Mahal ballroom, a pillar-less masterpiece capable of hosting large celebrations in a regal, traditional setting. Renowned for its world-class culinary heritage, including the legendary Bukhara and Dum Pukht, the hotel offers an unparalleled gastronomic experience. With its blend of historic grandeur, sprawling gardens, and central accessibility, ITC Maurya remains a prestigious destination for sophisticated and high-profile celebrations.",
    glance: [
      { label: "Rooms", value: "437" },
      { label: "Guests", value: "600+" },
      { label: "Buyout Cost", value: "₹4.5 Cr – ₹6.5 Cr" },
      { label: "Accommodation", value: "₹2.6 – ₹3.6 Cr / Night" },
      { label: "F&B", value: "₹1 – ₹1.5 Cr" },
      { label: "Decor & Production", value: "₹40 Lacs – ₹1.1 Cr" },
    ],
    slides: [
      { label: "ITC Maurya Delhi", desc: "A landmark of Mauryan-inspired architecture in New Delhi.", img: "/assets/photos/citiy luxe/itc-maurya-delhi.png" },
    ],
  },
  // MUMBAI
  {
    id: "C06",
    name: "Taj Lands End",
    location: "MUMBAI · BANDRA WEST",
    desc1: "Perched atop Bandra West with breathtaking panoramic views of the Arabian Sea and the iconic Bandra-Worli Sea Link, Taj Lands End is a pinnacle of seaside luxury and world-renowned Taj hospitality...",
    img: "citiy luxe/taj-mumbai.jpg",
    stats: { rooms: "496", guests: "1,000+" },
    writeup: "Taj Lands End, Mumbai, is a pinnacle of luxury perched atop Bandra West, offering breathtaking, panoramic views of the Arabian Sea and the iconic Bandra-Worli Sea Link. As a premier wedding destination, celebrations unfold within the majestic Ballroom or the lush Poolside Lawns for a stunning alfresco experience. Couples are drawn to its blend of contemporary urban grandeur, world-renowned Taj hospitality, and diverse culinary excellence. This seaside landmark provides a glamorous and logistically seamless setting for couples seeking an opulent, high-profile celebration in the heart of Mumbai.",
    glance: [
      { label: "Rooms", value: "496" },
      { label: "Guests", value: "1,000+" },
      { label: "Space", value: "55,000+ Sq. Ft." },
      { label: "Buyout Cost", value: "₹4.5 Cr – ₹6.5 Cr" },
      { label: "Accommodation", value: "₹2.8 – ₹3.8 Cr / Night" },
      { label: "F&B", value: "₹1.1 – ₹1.6 Cr" },
      { label: "Decor & Production", value: "₹50 Lacs – ₹1 Cr" },
    ],
    slides: [
      { label: "Taj Lands End Mumbai", desc: "A seaside luxury landmark in Bandra with Sea Link views.", img: "/assets/photos/citiy luxe/taj-mumbai.jpg" },
    ],
  },
  {
    id: "C07",
    name: "Grand Hyatt BKC",
    location: "MUMBAI · BANDRA KURLA COMPLEX",
    desc1: "A sprawling 12-acre luxury landmark in Bandra Kurla Complex, Grand Hyatt Mumbai redefines urban grandeur with a world-class culinary repertoire and a stunning collection of contemporary art...",
    img: "citiy luxe/hyatt-mumbai.jpg",
    stats: { rooms: "548 + 110 Apts", guests: "1,500+" },
    writeup: "Grand Hyatt Mumbai Hotel & Residences in Bandra Kurla Complex is a sprawling 12-acre luxury landmark that redefines urban grandeur. This multifaceted destination features rooms, suites, and serviced apartments, making it one of Mumbai's largest inventories for residential weddings. The property is highlighted by the majestic, pillar-less Grand Ballroom. For alfresco celebrations, the lush Outdoor Courtyard and gardens provide a serene, art-filled sanctuary. Couples choose this venue for its world-class culinary repertoire, impeccable logistical efficiency, and a stunning collection of contemporary art, ensuring a sophisticated and seamless wedding experience in the city's geographic heart.",
    glance: [
      { label: "Rooms", value: "548 + 110 Apts" },
      { label: "Guests", value: "1,500+" },
      { label: "Space", value: "30,000+ Sq. Ft." },
      { label: "Buyout Cost", value: "₹4.8 Cr – ₹7 Cr" },
      { label: "Accommodation", value: "₹3.2 – ₹4.4 Cr / Night" },
      { label: "F&B", value: "₹1 – ₹1.7 Cr" },
      { label: "Decor & Production", value: "₹50 Lacs – ₹1.2 Cr" },
    ],
    slides: [
      { label: "Grand Hyatt BKC Mumbai", desc: "A 12-acre luxury landmark in Bandra Kurla Complex.", img: "/assets/photos/citiy luxe/hyatt-mumbai.jpg" },
    ],
  },
  {
    id: "C08",
    name: "Fairmont Sahar",
    location: "MUMBAI · SAHAR",
    desc1: "A sophisticated urban palace near the international airport, Fairmont Sahar reflects a modern palace aesthetic with its hallmark Grandest of Spirits service and a pillar-less Grand Ballroom...",
    img: "citiy luxe/fairmont-mumbai.jpg",
    stats: { rooms: "325", guests: "1,000+" },
    writeup: "Fairmont Sahar, Mumbai, is a pinnacle of sophisticated urban luxury located near the international airport, designed to reflect a modern palace aesthetic. This grand hotel offers a refined sanctuary for residential wedding parties. As a premier wedding venue, it boasts one of the city's most impressive pillar-less Grand Ballrooms. For outdoor functions, the beautifully landscaped Terrace Gardens provide a romantic alfresco setting. Couples are drawn to Fairmont's hallmark Grandest of Spirits service, world-class culinary innovation, and its seamless blend of contemporary glamour and classical elegance, making it an elite choice for a high-profile celebration.",
    glance: [
      { label: "Rooms", value: "325" },
      { label: "Guests", value: "1,000+" },
      { label: "Ballroom", value: "11,000+ Sq. Ft." },
      { label: "Buyout Cost", value: "₹4.5 Cr – ₹6.5 Cr" },
      { label: "Accommodation", value: "₹2.8 – ₹3.8 Cr / Night" },
      { label: "F&B", value: "₹1.1 – ₹1.6 Cr" },
      { label: "Decor & Production", value: "₹60 Lacs – ₹1.5 Cr" },
    ],
    slides: [
      { label: "Fairmont Sahar Mumbai", desc: "A modern palace near Mumbai's international airport.", img: "/assets/photos/citiy luxe/fairmont-mumbai.jpg" },
    ],
  },
  // BANGALORE
  {
    id: "C09",
    name: "Sheraton Grand Whitefield",
    location: "BENGALURU · WHITEFIELD",
    desc1: "Sheraton Grand Bengaluru Whitefield is a landmark property in Bengaluru's premier tech corridor, housing one of the city's largest convention centers with vast indoor and alfresco wedding spaces...",
    img: "citiy luxe/sheraton-whitefield-bangalore.jpg",
    stats: { rooms: "360", guests: "2,000+" },
    writeup: "Sheraton Grand Bengaluru Whitefield Hotel & Convention Center is a landmark property, featuring a masterclass in modern grandeur. As a premier wedding destination, it boasts one of the city's largest convention centers with extensive versatile event space. Celebrations are anchored by the majestic, pillar-less Grand Ballroom for large-scale indoor functions, while the lush Outdoor Lawns provide a sophisticated setting for alfresco rituals. Couples are drawn to its seamless logistical efficiency, world-class culinary expertise, and the prestige of a venue designed for high-profile, large-scale celebrations.",
    glance: [
      { label: "Rooms", value: "360" },
      { label: "Guests", value: "2,000+" },
      { label: "Space", value: "65,000+ Sq. Ft." },
      { label: "Buyout Cost", value: "₹2.8 Cr – ₹4.5 Cr" },
      { label: "Accommodation", value: "₹1.8 – ₹2.6 Cr / Night" },
      { label: "F&B", value: "₹70 Lacs – ₹1.2 Cr" },
      { label: "Decor & Production", value: "₹35 – ₹90 Lacs" },
    ],
    slides: [
      { label: "Sheraton Grand Whitefield", desc: "A modern grand convention hotel in Bengaluru's Whitefield.", img: "/assets/photos/citiy luxe/sheraton-whitefield-bangalore.jpg" },
    ],
  },
  {
    id: "C10",
    name: "ITC Gardenia",
    location: "BENGALURU · CITY CENTRE",
    desc1: "An architectural tribute to Bengaluru's Garden City identity, ITC Gardenia is a LEED Platinum-certified hotel with vertical gardens and open-air spaces that weave sustainability into luxury...",
    img: "citiy luxe/itc-banglore.jpg",
    stats: { rooms: "291", guests: "600+" },
    writeup: "ITC Gardenia, Bengaluru, is an architectural tribute to the Garden City, blending sustainable luxury with vertical gardens and open-air spaces. This LEED Platinum-certified hotel offers a refined sanctuary for residential weddings across its elegantly appointed rooms and suites. The property is a premier destination for sophisticated celebrations, featuring the Mysore Hall, a pillar-less ballroom for regal indoor functions. For alfresco celebrations, the beautifully landscaped Botanic Garden provides a lush, tropical backdrop. Couples are drawn to ITC's legendary culinary excellence and the hotel's Luxury Accommodation with a Conscience philosophy — a majestic and environmentally conscious stage for an unforgettable wedding.",
    glance: [
      { label: "Rooms", value: "291" },
      { label: "Guests", value: "600+" },
      { label: "Buyout Cost", value: "₹3 Cr – ₹4.5 Cr" },
      { label: "Accommodation", value: "₹2 – ₹2.8 Cr / Night" },
      { label: "F&B", value: "₹75 Lacs – ₹1.1 Cr" },
      { label: "Decor & Production", value: "₹35 – ₹85 Lacs" },
    ],
    slides: [
      { label: "ITC Gardenia Bengaluru", desc: "A LEED Platinum hotel with vertical gardens in Bengaluru.", img: "/assets/photos/citiy luxe/itc-banglore.jpg" },
    ],
  },
  {
    id: "C11",
    name: "Taj West End",
    location: "BENGALURU · CITY CENTRE",
    desc1: "A legendary 20-acre sanctuary blending Victorian-era charm with over 130 years of heritage — its colonial-style rooms and suites nestled amid lush century-old tropical gardens and the famous 150-year-old Rain Tree...",
    img: "citiy luxe/taj-westend-banglore.jpg",
    stats: { rooms: "117", guests: "500+" },
    writeup: "Taj West End, Bengaluru, is a legendary 20-acre sanctuary that seamlessly blends Victorian-era charm with over 130 years of heritage. This historic estate features colonial-style rooms and suites, each offering a serene escape amidst lush, century-old tropical gardens. As a premier wedding destination, celebrations are anchored by the Grand Ballroom for intimate to grand indoor affairs, or the iconic Prince of Wales Lawns for grand alfresco ceremonies. Couples are drawn to its unique heritage architecture, the famous 150-year-old Rain Tree, and world-class Taj hospitality, providing an unparalleled, fairytale backdrop for an opulent celebration in the heart of the city.",
    glance: [
      { label: "Rooms", value: "117" },
      { label: "Guests", value: "500+" },
      { label: "Space", value: "20,000+ Sq. Ft." },
      { label: "Buyout Cost", value: "₹2 Cr – ₹3.5 Cr" },
      { label: "Accommodation", value: "₹1.2 – ₹1.8 Cr / Night" },
      { label: "F&B", value: "₹45 – ₹70 Lacs" },
      { label: "Decor & Production", value: "₹30 – ₹85 Lacs" },
    ],
    slides: [
      { label: "Taj West End Bengaluru", desc: "A legendary 20-acre Victorian heritage estate in Bengaluru.", img: "/assets/photos/citiy luxe/taj-westend-banglore.jpg" },
    ],
  },
  {
    id: "C12",
    name: "Prestige Golfshire",
    location: "BENGALURU · NANDI HILLS",
    desc1: "Set against the scenic Nandi Hills, Prestige Golfshire houses the JW Marriott Bengaluru Prestige Golfshire Resort & Spa — an ultra-luxury retreat with a world-class 18-hole golf course and serene lake views...",
    img: "citiy luxe/prestigegolfshire-banglore.jpg",
    stats: { rooms: "301", guests: "1,000+" },
    writeup: "Prestige Golfshire Club, set against the scenic backdrop of Nandi Hills, is an ultra-luxury retreat that redefines the destination wedding experience in Bengaluru. This sprawling estate offers luxuriously appointed rooms, suites, and villas for high-capacity residential celebrations. As a premier venue, it boasts sophisticated event spaces, including the majestic Grand Ballroom and sprawling manicured lawns perfect for grand alfresco ceremonies. Couples are drawn to its world-class 18-hole golf course, serene lake views, and signature Marriott hospitality — a stunningly modern and opulent setting for an unforgettable, large-scale wedding away from the city's bustle.",
    glance: [
      { label: "Rooms", value: "301" },
      { label: "Guests", value: "1,000+" },
      { label: "Space", value: "66,000+ Sq. Ft." },
      { label: "Buyout Cost", value: "₹3.8 Cr – ₹5.5 Cr" },
      { label: "Accommodation", value: "₹2.4 – ₹3.4 Cr / Night" },
      { label: "F&B", value: "₹90 Lacs – ₹1.3 Cr" },
      { label: "Decor & Production", value: "₹50 Lacs – ₹1.2 Cr" },
    ],
    slides: [
      { label: "Prestige Golfshire", desc: "JW Marriott resort with an 18-hole golf course near Nandi Hills.", img: "/assets/photos/citiy luxe/prestigegolfshire-banglore.jpg" },
    ],
  },
  {
    id: "C13",
    name: "Kings Meadow",
    location: "BENGALURU · NORTH BANGALORE",
    desc1: "An expansive, purpose-built luxury wedding destination in North Bengaluru offering a seamless blend of contemporary architecture and manicured natural beauty with one of the city's premier high-capacity pillar-less ballrooms...",
    img: "citiy luxe/kings-meadows-banglore.jpg",
    stats: { guests: "1,500+" },
    writeup: "Kings Meadow in North Bengaluru is an expansive, purpose-built luxury wedding destination that offers a seamless blend of contemporary architecture and manicured natural beauty. The venue is designed to host grand celebrations, featuring a massive, pillar-less ballroom among the city's premier high-capacity spaces. For alfresco ceremonies, the property boasts beautifully landscaped lawns and a charming poolside area, perfect for sun-drenched haldi rituals or starlit receptions. Couples are drawn to its logistical superiority, with ample parking, dedicated bridal suites, and flexible vendor policies — an open-canvas environment for those seeking a grand, personalized wedding with modern infrastructural excellence.",
    glance: [
      { label: "Guests", value: "1,500+" },
      { label: "Parking", value: "500+ Vehicles" },
      { label: "Buyout Cost", value: "₹45 – ₹70 Lacs" },
      { label: "Accommodation", value: "₹12 – ₹18 Lacs / Night" },
      { label: "F&B", value: "₹15 – ₹30 Lacs" },
      { label: "Decor & Production", value: "₹12 – ₹25 Lacs" },
    ],
    slides: [
      { label: "Kings Meadow Bengaluru", desc: "A purpose-built luxury wedding venue in North Bengaluru.", img: "/assets/photos/citiy luxe/kings-meadows-banglore.jpg" },
    ],
  },
  {
    id: "C14",
    name: "Angsana Oasis",
    location: "BENGALURU · NORTH BANGALORE",
    desc1: "A tranquil Mediterranean-inspired sanctuary in North Bengaluru offering an intimate yet grand boutique wedding experience surrounded by lush greenery and world-class Ayurvedic spa facilities...",
    img: "citiy luxe/angsana-banglore.jpg",
    stats: { rooms: "79", guests: "1,000+" },
    writeup: "Angsana Oasis Spa & Resort in North Bengaluru is a tranquil, Mediterranean-inspired sanctuary that offers an intimate yet grand setting for destination weddings. The resort features well-appointed rooms and suites, making it ideal for boutique residential celebrations. As a premier wedding destination, it offers versatile spaces including the Main Lawn for grand gatherings, and the elegant Hibiscus and Marigold indoor halls for more private rituals. Couples are drawn to its world-class Ayurvedic spa, Thai-inspired architecture, and sprawling open-air courtyards that capture the city's pleasant climate. This resort provides a serene, sophisticated backdrop for those seeking a harmonious blend of wellness, natural beauty, and traditional hospitality.",
    glance: [
      { label: "Rooms", value: "79" },
      { label: "Guests", value: "1,000+" },
      { label: "Buyout Cost", value: "₹50 – ₹85 Lacs" },
      { label: "Accommodation", value: "₹25 – ₹38 Lacs / Night" },
      { label: "F&B", value: "₹15 – ₹25 Lacs" },
      { label: "Decor & Production", value: "₹10 – ₹25 Lacs" },
    ],
    slides: [
      { label: "Angsana Oasis Bengaluru", desc: "A Mediterranean-inspired spa resort in North Bengaluru.", img: "/assets/photos/citiy luxe/angsana-banglore.jpg" },
    ],
  },
];

export default function CitiesMetropolitansPage() {
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
                  Cities & Metropolitans → {selectedVenue.name}
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

                  <div className="absolute top-4 right-4 z-20 font-heading text-[14px] text-[#C9A234]">
                    {(currentSlide + 1).toString().padStart(2, '0')} / {slides.length.toString().padStart(2, '0')}
                  </div>

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
