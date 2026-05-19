"use client";

import { useEffect, useRef, useState } from "react";
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
    location: "GOA · CANSAULIM",
    desc1: "ITC Grand Goa Resort & Spa, nestled along the pristine Arossim Beach, is a masterpiece of Indo-Portuguese architecture set across 45 acres of lush beachfront gardens and shimmering lagoons. This village-style resort features 246 elegantly designed rooms and suites...",
    img: "destination/ITC-grand/goilc-exterior-5185-hor-clsc.webp",
    stats: { rooms: "246", guests: "1,000+" },
    writeup: "ITC Grand Goa Resort & Spa, nestled along the pristine Arossim Beach, is a masterpiece of Indo-Portuguese architecture set across 45 acres of lush beachfront gardens and shimmering lagoons. The property offers versatile event spaces including the majestic Salcete Ballroom and sprawling seaside lawns for grand alfresco celebrations. Couples are drawn to its unique land-meets-sea aesthetic, the award-winning Kaya Kalp Spa, and ITC's legendary culinary heritage — a sophisticated and fairytale-like setting for an unforgettable coastal wedding.",
    glance: [
      { label: "Rooms", value: "246" },
      { label: "Guests", value: "1,000+" },
      { label: "Space", value: "45,000+ Sq. Ft." },
      { label: "Buyout Cost", value: "₹1.5 Cr – ₹3 Cr" },
      { label: "Accommodation", value: "₹50 – ₹75 Lacs / Night" },
      { label: "F&B", value: "₹4,500 – ₹6,500 / Plate" },
      { label: "Decor & Production", value: "₹40 Lacs – ₹1.5 Cr" },
    ],
    slides: [
      { label: "Exterior View", desc: "Classic Portuguese-inspired architecture across 45 acres of lush landscape.", img: "/assets/photos/destination/ITC-grand/goilc-exterior-5185-hor-clsc.webp" },
      { label: "Magical Forest", desc: "A tropical sanctuary for intimate woodland ceremonies and celebrations.", img: "/assets/photos/destination/ITC-grand/goilc-magicalforest-8768-hor-clsc.webp" },
      { label: "Seaside Sunset", desc: "Breathtaking Arabian Sea vistas from the property during the golden hour.", img: "/assets/photos/destination/ITC-grand/goilc-evening-sunset-8771-hor-clsc.jpg" },
      { label: "Grand Lobby", desc: "Opulent arrival experience featuring heritage Goan charm and grandeur.", img: "/assets/photos/destination/ITC-grand/lc-goilc-lobby-11425_Classic-Hor.jpeg" },
      { label: "Kayakalp Spa", desc: "Award-winning wellness sanctuary perfect for pre-wedding relaxation.", img: "/assets/photos/destination/ITC-grand/goilc-kayakalp-spa-8761_Classic-Hor.jpeg" },
      { label: "Lap Pool Suite", desc: "Ultra-luxury accommodations featuring private pool access and premium comfort.", img: "/assets/photos/destination/ITC-grand/lc-goilc-lap-pool-suite-41870_Classic-Hor.jpeg" },
    ],
  },
  {
    id: "02",
    name: "St. Regis Goa Resort",
    location: "GOA · SAL RIVER",
    desc1: "A breathtaking 49-acre sanctuary poised between the Sal River and the Arabian Sea, blending Goan heritage with modern luxury across elegantly appointed rooms, suites, and private villas...",
    img: "beach-wedding/st regis goa.jpeg",
    stats: { rooms: "206", guests: "500+" },
    writeup: "A breathtaking 49-acre sanctuary poised between the Sal River and the Arabian Sea, blending Goan heritage with modern luxury across elegantly appointed rooms, suites, and private villas. The iconic St. Regis Butler Service, private beach access, and a signature golf course make it one of the coast's most distinguished wedding destinations — where curated grandeur meets effortless coastal elegance.",
    glance: [
      { label: "Rooms", value: "206" },
      { label: "Guests", value: "500+" },
      { label: "Space", value: "32,000+ Sq. Ft." },
      { label: "Buyout Cost", value: "₹2.5 Cr – ₹3 Cr" },
      { label: "Accommodation", value: "₹1.3 – ₹1.8 Cr / Night" },
      { label: "F&B", value: "₹4,000 – ₹6,000 / Plate" },
      { label: "Decor & Production", value: "₹40 Lacs – ₹1.2 Cr" },
    ],
    slides: [
      { label: "Beach Wedding", desc: "Pristine beachside celebrations at the Sal River shore.", img: "/assets/photos/beach-wedding/St.Regis Goa Resort (Cavelossim)/Property Pictures/xr-goixr-beach-wedding-37064_Classic-Hor.jpeg" },
      { label: "Beachside Setup", desc: "Elegantly curated outdoor wedding setting.", img: "/assets/photos/beach-wedding/St.Regis Goa Resort (Cavelossim)/Property Pictures/xr-goixr-beachside-wedding-setup-26458_Classic-Hor.jpeg" },
      { label: "Caroline Astor Cluster", desc: "Exclusive villa cluster with lush tropical surroundings.", img: "/assets/photos/beach-wedding/St.Regis Goa Resort (Cavelossim)/Property Pictures/xr-goixr-caroline-astor-cluster-42531_Classic-Hor.jpeg" },
      { label: "Lagoon Grand Deluxe", desc: "Overwater lagoon suite with serene Goan views.", img: "/assets/photos/beach-wedding/St.Regis Goa Resort (Cavelossim)/Property Pictures/xr-goixr-lagoon-grand-deluxe-13707_Classic-Hor.jpeg" },
      { label: "Lobby", desc: "Grand arrival experience with signature St. Regis refinement.", img: "/assets/photos/beach-wedding/St.Regis Goa Resort (Cavelossim)/Property Pictures/xr-goixr-lobby-reception-14125_Classic-Hor.jpeg" },
      { label: "Manor Pool Suite", desc: "Private pool suite framed by lush tropical gardens.", img: "/assets/photos/beach-wedding/St.Regis Goa Resort (Cavelossim)/Property Pictures/xr-goixr-manor-pool-suite-living-d-13398_Classic-Hor.jpeg" },
      { label: "Pool Aerial View", desc: "Sweeping drone view of the resort and Arabian Sea.", img: "/assets/photos/beach-wedding/St.Regis Goa Resort (Cavelossim)/Property Pictures/xr-goixr-pool-drone-top-view-17804_Classic-Hor.jpeg" },
    ],
  },
  {
    id: "03",
    name: "Grand Hyatt, Goa",
    location: "GOA · BAMBOLIM BAY",
    desc1: "A magnificent 17th-century Indo-Portuguese inspired estate sprawling across 28 acres of lush tropical gardens along Bambolim Bay — one of Goa's grandest residential wedding properties...",
    img: "beach-wedding/grand-hyatt-goa.jpg",
    stats: { rooms: "312", guests: "1,200+" },
    writeup: "A magnificent 17th-century Indo-Portuguese inspired estate sprawling across 28 acres of lush tropical gardens along Bambolim Bay — one of Goa's grandest residential wedding properties. The pillar-less Grand Ballroom, picturesque Palace Lawns, and seaside verandas with Arabian Sea views make it an elite choice for large-scale coastal celebrations that command both scale and sophistication.",
    glance: [
      { label: "Rooms", value: "312" },
      { label: "Guests", value: "1,200+" },
      { label: "Space", value: "40,000+ Sq. Ft." },
      { label: "Buyout Cost", value: "₹3.5 Cr – ₹5.5 Cr" },
      { label: "Accommodation", value: "₹2.2 – ₹3.4 Cr / Night" },
      { label: "F&B", value: "₹80 Lacs – ₹1.2 Cr" },
      { label: "Decor & Production", value: "₹50 Lacs – ₹1.5 Cr" },
    ],
    slides: [
      { label: "Palace Building", desc: "The iconic Indo-Portuguese palace facade along Bambolim Bay.", img: "/assets/photos/beach-wedding/Grand Hyatt Goa/Grand-Hyatt-Goa-P349-Palace-Building-Water.16x9.webp" },
      { label: "Grand Ballroom", desc: "The pillar-less Grand Ballroom for grand celebrations.", img: "/assets/photos/beach-wedding/Grand Hyatt Goa/GOAGH-P093-Grand-Ballroom.16x9.webp" },
      { label: "Indoor Wedding", desc: "An elegantly dressed indoor wedding in the Grand Ballroom.", img: "/assets/photos/beach-wedding/Grand Hyatt Goa/GOAGH-P226-Indoor-Wedding-Grand-Ballroom.16x9.webp" },
      { label: "Outdoor Wedding", desc: "A breathtaking outdoor wedding setup on the Palace Lawns.", img: "/assets/photos/beach-wedding/Grand Hyatt Goa/GOAGH-P233-Outdoor-Wedding-Set-Up.16x9.webp" },
      { label: "Wedding Setup", desc: "Floral-adorned mandap against a lush tropical backdrop.", img: "/assets/photos/beach-wedding/Grand Hyatt Goa/GOAGH-P251-Wedding-Set-Up.16x9.webp" },
      { label: "Bay View Lounge", desc: "Panoramic Bambolim Bay vistas from the lounge.", img: "/assets/photos/beach-wedding/Grand Hyatt Goa/GOAGH-P0715-Bay-View-Lounge.16x9.webp" },
      { label: "Grand Staircase", desc: "The sweeping heritage staircase of the palace estate.", img: "/assets/photos/beach-wedding/Grand Hyatt Goa/Grand-Hyatt-Goa-P406-Grand-Staircase.16x9.webp" },
      { label: "Grand Suite", desc: "Luxuriously appointed grand suite with garden views.", img: "/assets/photos/beach-wedding/Grand Hyatt Goa/Grand-Hyatt-Goa-P452-Grand-Suite-Living-Room.16x9.webp" },
    ],
  },
  {
    id: "04",
    name: "Taj Exotica, Goa",
    location: "GOA · BENAULIM BEACH",
    desc1: "A Mediterranean-inspired oasis across 56 acres of manicured gardens along pristine Benaulim Beach — intimate yet grand, with sun-drenched architecture and private beachfront access...",
    img: "beach-wedding/taj-exortica-goa.jpg",
    stats: { rooms: "140", guests: "450+" },
    writeup: "A Mediterranean-inspired oasis across 56 acres of manicured gardens along pristine Benaulim Beach — intimate yet grand, with sun-drenched architecture and private beachfront access. The majestic Sala Gran Ballroom and Sea-View Lawns, backed by Taj's award-winning culinary excellence, offer a timeless setting for a quintessential Goan celebration — refined, unhurried, and utterly memorable.",
    glance: [
      { label: "Rooms", value: "140" },
      { label: "Guests", value: "450+" },
      { label: "Space", value: "11,000+ Sq. Ft." },
      { label: "Buyout Cost", value: "₹2 Cr – ₹3.5 Cr" },
      { label: "Accommodation", value: "₹1.1 – ₹1.7 Cr / Night" },
      { label: "F&B", value: "₹45 – ₹75 Lacs" },
      { label: "Decor & Production", value: "₹35 Lacs – ₹1 Cr" },
    ],
    slides: [
      { label: "Resort Exterior", desc: "Mediterranean-inspired architecture along Benaulim Beach.", img: "/assets/photos/beach-wedding/Taj Exotica Resort & Spa, Goa/1b873576ffd9475d30103339bd8a2f52d0ce5931-1920x1280.avif" },
      { label: "Beachfront", desc: "Pristine private beachfront stretching into the Arabian Sea.", img: "/assets/photos/beach-wedding/Taj Exotica Resort & Spa, Goa/4741de869ba6e29e7e4cc1849b22b5753d41ba97-1920x1280.avif" },
      { label: "Pool", desc: "Serene lagoon pool surrounded by manicured tropical gardens.", img: "/assets/photos/beach-wedding/Taj Exotica Resort & Spa, Goa/74dfa499f55786ab424c593e57467f0ffea04104-1920x1328.avif" },
      { label: "Gardens", desc: "Sprawling 56-acre gardens perfect for outdoor ceremonies.", img: "/assets/photos/beach-wedding/Taj Exotica Resort & Spa, Goa/8e46c4fc1463cb7535dbc89dab0eca3d7620754b-1920x1280.avif" },
      { label: "Lawns", desc: "Manicured Sea-View Lawns for golden hour celebrations.", img: "/assets/photos/beach-wedding/Taj Exotica Resort & Spa, Goa/a180a2e7b3caed6c2bbdd679ebbc51ad17669069-1920x1280.avif" },
      { label: "Sala Gran Ballroom", desc: "The elegant Sala Gran Ballroom for indoor receptions.", img: "/assets/photos/beach-wedding/Taj Exotica Resort & Spa, Goa/b160cd227ebb349ff72ccdd264a9e203dc00162f-1920x1280.avif" },
      { label: "Villa", desc: "Private villa retreat with lush tropical surroundings.", img: "/assets/photos/beach-wedding/Taj Exotica Resort & Spa, Goa/ba656fabed52cb526fb8d631fbe530e2948dba76-1920x1280.avif" },
      { label: "Sunset", desc: "Golden hour views over the Arabian Sea.", img: "/assets/photos/beach-wedding/Taj Exotica Resort & Spa, Goa/ea7931e2b97c33f010f91f8db460377220e0513f-1920x1280.avif" },
    ],
  },
  {
    id: "05",
    name: "Taj Cidade de Goa",
    location: "GOA · VAINGUINIM BEACH",
    desc1: "A stunning hillside tribute to Portuguese-inspired architecture — arched corridors, red-tiled roofs, and hand-painted murals frame every celebration with old-world charm and coastal romance...",
    img: "beach-wedding/taj-cidade-goa.jpg",
    stats: { rooms: "207", guests: "450+" },
    writeup: "A stunning hillside tribute to Portuguese-inspired architecture — arched corridors, red-tiled roofs, and hand-painted murals frame every celebration with old-world charm and coastal romance. The iconic Sunset Lawns with panoramic Arabian Sea views and private beach access make it a picturesque and culturally rich destination for couples seeking a wedding steeped in history and alive with beauty.",
    glance: [
      { label: "Rooms", value: "207" },
      { label: "Guests", value: "450+" },
      { label: "Buyout Cost", value: "₹2.5 Cr – ₹3.5 Cr" },
      { label: "Accommodation", value: "₹1.4 – ₹2.4 Cr / Night" },
      { label: "F&B", value: "₹65 Lacs – ₹1.2 Cr" },
      { label: "Decor & Production", value: "₹40 Lacs – ₹1.2 Cr" },
    ],
    slides: [
      { label: "Resort View", desc: "Portuguese-inspired hillside architecture on Vainguinim Beach.", img: "/assets/photos/beach-wedding/Taj Cidade de Goa Horizon, Goa/563e671d5f744179f79170f035e8f228b83fb32a-2000x1500.avif" },
      { label: "Sunset Lawns", desc: "Panoramic Arabian Sea vistas from the iconic Sunset Lawns.", img: "/assets/photos/beach-wedding/Taj Cidade de Goa Horizon, Goa/8d199c19f8e1920b89b65fbc78d75b4175076450-2000x1500.avif" },
      { label: "Arched Corridors", desc: "Hand-painted murals and arched corridors of old Goa.", img: "/assets/photos/beach-wedding/Taj Cidade de Goa Horizon, Goa/8ef7225e81b7f73240d036077fc68d9f90b5bfbd-2186x1456.avif" },
      { label: "Pool & Sea", desc: "Infinity pool with sweeping views of the Arabian Sea.", img: "/assets/photos/beach-wedding/Taj Cidade de Goa Horizon, Goa/c87a9ca6c7b5c46cf5b9ede088ac844b3e20ffd6-2289x1500.avif" },
      { label: "Heritage Facade", desc: "The iconic red-tiled rooftops of the heritage property.", img: "/assets/photos/beach-wedding/Taj Cidade de Goa Horizon, Goa/154d93c50dccdd3152db7b76e69ae79d53d7909a-756x503.avif" },
      { label: "Beachside", desc: "Private beach access for sunset ceremonies.", img: "/assets/photos/beach-wedding/Taj Cidade de Goa Horizon, Goa/8dda45bb7f56ad4120af265f6ef9fa8420fff2f4-756x503.avif" },
    ],
  },
  {
    id: "06",
    name: "Caravela Beach Resort, Goa",
    location: "GOA · VARCA BEACH",
    desc1: "A sprawling 24-acre beachfront estate on the pristine white sands of Varca Beach, blending Indo-Portuguese heritage with refined tropical luxury...",
    img: "beach-wedding/caravela-beachresort.jpg",
    stats: { rooms: "199", guests: "600+" },
    writeup: "A sprawling 24-acre beachfront estate on the pristine white sands of Varca Beach, blending Indo-Portuguese heritage with refined tropical luxury. The Poolside Lawns, expansive beachfront sunset backdrop, and a unique 9-hole golf course make it a sophisticated and serene choice — offering a rare combination of exclusivity, warmth, and natural grandeur for a fairytale coastal celebration.",
    glance: [
      { label: "Rooms", value: "199" },
      { label: "Guests", value: "600+" },
      { label: "Buyout Cost", value: "₹1.8 Cr – ₹3 Cr" },
      { label: "Accommodation", value: "₹1.1 – ₹1.6 Cr / Night" },
      { label: "F&B", value: "₹40 – ₹60 Lacs" },
      { label: "Decor & Production", value: "₹30 – ₹80 Lacs" },
    ],
    slides: [
      { label: "Beachfront Estate", desc: "The sprawling 24-acre beachfront estate on Varca Beach.", img: "/assets/photos/beach-wedding/Caravela Beach Resort Goa/217B0934_pwuypk.webp" },
      { label: "Beach", desc: "Pristine white sands of Varca Beach at sunset.", img: "/assets/photos/beach-wedding/Caravela Beach Resort Goa/217B1960_oqmmsx.webp" },
      { label: "Poolside", desc: "Elegant poolside lawns for outdoor wedding celebrations.", img: "/assets/photos/beach-wedding/Caravela Beach Resort Goa/217B1999_final_edit_23_bph3pc.webp" },
      { label: "Gardens", desc: "Manicured tropical gardens across the resort estate.", img: "/assets/photos/beach-wedding/Caravela Beach Resort Goa/217B2065_gbq0qf.webp" },
      { label: "Resort View", desc: "The elegant Indo-Portuguese resort facade.", img: "/assets/photos/beach-wedding/Caravela Beach Resort Goa/217B4305_ghmvto.webp" },
      { label: "Villa", desc: "Spacious two-bedroom garden villa for bridal parties.", img: "/assets/photos/beach-wedding/Caravela Beach Resort Goa/2_Bedroom_Garden_Villa_1_vigfqe.webp" },
      { label: "Presidential Villa", desc: "Grand presidential villa with private living quarters.", img: "/assets/photos/beach-wedding/Caravela Beach Resort Goa/Presidential_Villa_Living_Room_05_duktci_yhalfd.webp" },
      { label: "Exterior", desc: "The resort's beachside landscape at the golden hour.", img: "/assets/photos/beach-wedding/Caravela Beach Resort Goa/_P5A7205_edited.webp" },
    ],
  },
  {
    id: "07",
    name: "Taj Green Cove, Kovalam",
    location: "KERALA · KOVALAM",
    desc1: "A breathtaking 10-acre Balinese-inspired retreat on a lush hillside where the backwaters meet the Arabian Sea — secluded, intimate, and entirely distinctive...",
    img: "beach-wedding/taj-green-cove-kerala.jpg",
    stats: { rooms: "59", guests: "500+" },
    writeup: "A breathtaking 10-acre Balinese-inspired retreat on a lush hillside where the backwaters meet the Arabian Sea — secluded, intimate, and entirely distinctive. Unique boat-entry experiences, the world-renowned J Wellness Circle, and Seaside Lawns for sunset ceremonies make it a fairytale destination for those seeking tranquil coastal opulence along Kerala's most celebrated shoreline.",
    glance: [
      { label: "Rooms", value: "59" },
      { label: "Guests", value: "500+" },
      { label: "Buyout Cost", value: "₹80 Lacs – ₹1.5 Cr" },
      { label: "Accommodation", value: "₹50 – ₹80 Lacs / Night" },
      { label: "F&B", value: "₹18 – ₹30 Lacs" },
      { label: "Decor & Production", value: "₹20 – ₹50 Lacs" },
    ],
    slides: [
      { label: "Hillside Retreat", desc: "Balinese-inspired hillside retreat where backwaters meet the sea.", img: "/assets/photos/beach-wedding/Taj Green Cove Resort & Spa, Kovalam/1d1aab7e1f1cfa43e8058bc1016867a5173c8044-4500x2989.avif" },
      { label: "Seaside Lawns", desc: "Seaside lawns for sunset wedding ceremonies in Kovalam.", img: "/assets/photos/beach-wedding/Taj Green Cove Resort & Spa, Kovalam/246d5a19334f5f0fcfb0ab48047d07266afda318-1920x1275.avif" },
      { label: "Infinity Pool", desc: "Panoramic infinity pool overlooking the Arabian Sea.", img: "/assets/photos/beach-wedding/Taj Green Cove Resort & Spa, Kovalam/35d1c79c1d662b92f38afd1de0b46e3f11d2437e-3888x2592.avif" },
      { label: "Gardens", desc: "Lush tropical gardens cascading down the hillside.", img: "/assets/photos/beach-wedding/Taj Green Cove Resort & Spa, Kovalam/4632caea1c2654cbcf51138007bfa9e34387585e-3600x2701.avif" },
      { label: "Aerial View", desc: "Aerial view of the resort nestled between the forest and sea.", img: "/assets/photos/beach-wedding/Taj Green Cove Resort & Spa, Kovalam/81d57710dd04d80b7ffb520dfc7723d938b92e54-1920x1280.avif" },
      { label: "Spa", desc: "The world-renowned J Wellness Circle sanctuary.", img: "/assets/photos/beach-wedding/Taj Green Cove Resort & Spa, Kovalam/940ed470a00aeb7fcf44f782d55da2e102a181c6-1400x1120.avif" },
      { label: "Backwaters", desc: "Tranquil backwater vistas from the resort's vantage point.", img: "/assets/photos/beach-wedding/Taj Green Cove Resort & Spa, Kovalam/c408bbdd850f17a94e24788fd377e0a86cf95401-1920x1034.avif" },
      { label: "Kerala Coastline", desc: "The dramatic Kerala coastline framing the resort.", img: "/assets/photos/beach-wedding/Taj Green Cove Resort & Spa, Kovalam/ed23f9f8c4c8b94b59365a65602ee1074f8c97ed-1920x913.avif" },
    ],
  },
  {
    id: "08",
    name: "The Leela, Kovalam",
    location: "KERALA · KOVALAM",
    desc1: "India's only clifftop beach resort — a breathtaking architectural marvel merging panoramic Arabian Sea views with traditional Kerala heritage across exclusive clifftop accommodations...",
    img: "beach-wedding/The-Leela-Palace-Trail-kovalam.jpg",
    stats: { rooms: "188", guests: "900+" },
    writeup: "India's only clifftop beach resort — a breathtaking architectural marvel merging panoramic Arabian Sea views with traditional Kerala heritage across exclusive clifftop accommodations. From the grand Pandal Convention Center to the intimate private beach for sunset vows, it offers a regal and ethereal setting unlike any other coastal property — where every moment is framed by the endless expanse of the Arabian Sea.",
    glance: [
      { label: "Rooms", value: "188" },
      { label: "Guests", value: "900+" },
      { label: "Buyout Cost", value: "₹2.8 Cr – ₹4.5 Cr" },
      { label: "Accommodation", value: "₹1.6 – ₹2.6 Cr / Night" },
      { label: "F&B", value: "₹70 Lacs – ₹1.1 Cr" },
      { label: "Decor & Production", value: "₹40 Lacs – ₹1 Cr" },
    ],
    slides: [
      { label: "Clifftop Vista", desc: "India's only clifftop beach resort with panoramic Arabian Sea views.", img: "/assets/photos/beach-wedding/The Leela (Kovalam)/Intro_1035x600_5.webp" },
      { label: "Celebrations", desc: "Grand celebration setup against the Kovalam clifftop backdrop.", img: "/assets/photos/beach-wedding/The Leela (Kovalam)/Celebrations_850x530_4.webp" },
      { label: "Presidential Suite", desc: "Opulent presidential suite with sea-facing private terrace.", img: "/assets/photos/beach-wedding/The Leela (Kovalam)/Presidential Suite_560x535_1.webp" },
      { label: "Royal Club Duplex", desc: "Exclusive royal club duplex suite with heritage interiors.", img: "/assets/photos/beach-wedding/The Leela (Kovalam)/Royal-Club -Duplex-Suite .webp" },
      { label: "Royal Club Room", desc: "Classically appointed royal club room with ocean vistas.", img: "/assets/photos/beach-wedding/The Leela (Kovalam)/Royal-Club-Room-Leela-Kovalam-Hotel.webp" },
      { label: "The Terrace", desc: "Clifftop terrace overlooking the endless Arabian Sea.", img: "/assets/photos/beach-wedding/The Leela (Kovalam)/The Terrace_550x665.webp" },
      { label: "Palace Trail", desc: "The legendary Leela Palace Trail through Kovalam's heritage.", img: "/assets/photos/beach-wedding/The Leela (Kovalam)/The-Leela-Palace-Trail.webp" },
    ],
  },
];

export default function BeachWeddingsPage() {
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
          {dest.id === "01" ? (
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
          <p className="text-gold text-[12px] tracking-[0.6em] uppercase mb-6 font-medium">Your Sanctuary Awaits</p>
          <h2 className="font-heading text-surface text-5xl md:text-6xl font-light mb-12 italic">
            Begin Your Coastal <br /> Love Story
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
                  Beach Weddings → {selectedVenue.name}
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

                  {/* Slide number overlay */}
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
