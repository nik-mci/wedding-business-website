"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoldDivider from "@/components/GoldDivider";
import CornerOrnament from "@/components/CornerOrnament";
import blurDataUrls from "@/lib/blurDataUrls";

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
      { label: "The Zora", desc: "A nature-inspired luxury event space on Lodhi Road.", img: "/assets/photos/citiy luxe/Delhi/The Zora/2024-11-15.webp" },
      { label: "Garden Setting", desc: "Lush open-air spaces at The Zora.", img: "/assets/photos/citiy luxe/Delhi/The Zora/2025-10-03.webp" },
      { label: "Celebrations", desc: "Grand celebrations amid The Zora's natural landscape.", img: "/assets/photos/citiy luxe/Delhi/The Zora/2025-10-03 (1).webp" },
      { label: "Evening Ambience", desc: "The Zora glowing beautifully at dusk.", img: "/assets/photos/citiy luxe/Delhi/The Zora/2026-03-18.webp" },
      { label: "Venue", desc: "The Zora's distinctive open-canvas event spaces.", img: "/assets/photos/citiy luxe/Delhi/The Zora/unnamed.webp" },
      { label: "Interiors", desc: "Contemporary elegance within The Zora.", img: "/assets/photos/citiy luxe/Delhi/The Zora/unnamed (1).webp" },
      { label: "Outdoor", desc: "Scenic outdoor settings at The Zora.", img: "/assets/photos/citiy luxe/Delhi/The Zora/unnamed (2).webp" },
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
      { label: "The Estate", desc: "Morebagh's sprawling Mediterranean-inspired farmhouse estate.", img: "/assets/photos/citiy luxe/Delhi/MorBagh/476314502_1556986441637501_4368532176966872427_n.jpg" },
      { label: "Gardens", desc: "Meticulously manicured gardens at Morebagh.", img: "/assets/photos/citiy luxe/Delhi/MorBagh/479178247_1560703341265811_7952591980526054025_n.jpg" },
      { label: "The Villa", desc: "Morebagh's stunning white villa backdrop.", img: "/assets/photos/citiy luxe/Delhi/MorBagh/479440165_1560842807918531_2029291331342882243_n.jpg" },
      { label: "Celebrations", desc: "A grand celebration under the open sky at Morebagh.", img: "/assets/photos/citiy luxe/Delhi/MorBagh/480231989_1560703331265812_6722740456509888607_n.jpg" },
      { label: "Evening", desc: "Morebagh lit beautifully for an evening reception.", img: "/assets/photos/citiy luxe/Delhi/MorBagh/480264744_1560851777917634_3752884866447731567_n.jpg" },
      { label: "Outdoor Setting", desc: "Lush outdoor spaces for alfresco ceremonies.", img: "/assets/photos/citiy luxe/Delhi/MorBagh/77238867_423697344966422_4984726687116689408_n.jpg" },
      { label: "Farmhouse Lawn", desc: "Verdant lawns at the heart of Morebagh.", img: "/assets/photos/citiy luxe/Delhi/MorBagh/78405981_423697488299741_1901688175797993472_n.jpg" },
      { label: "Ceremony", desc: "An intimate ceremony set up at Morebagh.", img: "/assets/photos/citiy luxe/Delhi/MorBagh/83478000_465201604149329_9052154754737635328_n.jpg" },
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
      { label: "The Estate", desc: "ITC Grand Bharat's 300-acre estate in the Aravalli Range.", img: "/assets/photos/citiy luxe/Delhi/ITC Grand Bharat/ITC GRand Bharat.jpg" },
      { label: "Property", desc: "The palatial grounds of ITC Grand Bharat.", img: "/assets/photos/citiy luxe/Delhi/ITC Grand Bharat/ITC GRand Bharat 2.jpg" },
      { label: "Celebration", desc: "A grand wedding celebration at ITC Grand Bharat.", img: "/assets/photos/citiy luxe/Delhi/ITC Grand Bharat/ITC Grand Bharat 3.jpg" },
      { label: "Interiors", desc: "Opulent interiors inspired by Indian dynastic heritage.", img: "/assets/photos/citiy luxe/Delhi/ITC Grand Bharat/ITC Grand Bharat 4.jpg" },
      { label: "Peacock Lawn", desc: "The sprawling Peacock Lawn for grand alfresco celebrations.", img: "/assets/photos/citiy luxe/Delhi/ITC Grand Bharat/ITC Grand BHarat 5.webp" },
      { label: "Evening Ambience", desc: "ITC Grand Bharat glowing magnificently at dusk.", img: "/assets/photos/citiy luxe/Delhi/ITC Grand Bharat/ITC Brand Bharat 6.webp" },
      { label: "Prithvi Ballroom", desc: "The pillar-less Prithvi Ballroom for regal indoor functions.", img: "/assets/photos/citiy luxe/Delhi/ITC Grand Bharat/ITC Grand Bharat 7.webp" },
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
      { label: "The Palace", desc: "The Leela Palace New Delhi in the Diplomatic Enclave.", img: "/assets/photos/citiy luxe/Delhi/Leela Palace Delhi/The-Leela-Palace-New-Delhi.webp" },
      { label: "Celebrations", desc: "Grand wedding celebrations at The Leela Palace.", img: "/assets/photos/citiy luxe/Delhi/Leela Palace Delhi/Celebrations_1920x950_1.webp" },
      { label: "Presidential Suite", desc: "The opulent Presidential Suite at The Leela Palace.", img: "/assets/photos/citiy luxe/Delhi/Leela Palace Delhi/Presidential Suite_1920x950_1.webp" },
      { label: "Maharaja Suite", desc: "The majestic Maharaja Suite with palace views.", img: "/assets/photos/citiy luxe/Delhi/Leela Palace Delhi/Maharaja Suite_Leela-New-Delhi.webp" },
      { label: "Parlour Suite", desc: "Elegantly appointed Parlour Suite at The Leela.", img: "/assets/photos/citiy luxe/Delhi/Leela Palace Delhi/Parlour-Suite-Leela-Delhi.webp" },
      { label: "Lobby Lounge", desc: "The grand Lobby Lounge welcoming guests in style.", img: "/assets/photos/citiy luxe/Delhi/Leela Palace Delhi/The-Lobby-Lounge.jpg" },
      { label: "Le Cirque", desc: "Fine dining at Le Cirque Signature within The Leela.", img: "/assets/photos/citiy luxe/Delhi/Leela Palace Delhi/Le Circue_560x665_0.webp" },
      { label: "Destination Delhi", desc: "The Leela Palace — Delhi's premier wedding address.", img: "/assets/photos/citiy luxe/Delhi/Leela Palace Delhi/Destination-Delhi-North-India.webp" },
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
      { label: "Exterior", desc: "ITC Maurya's iconic Mauryan-inspired facade at night.", img: "/assets/photos/citiy luxe/Delhi/ITC Maurya /exterior-night.jpg" },
      { label: "Kamal Mahal", desc: "The pillar-less Kamal Mahal ballroom for grand celebrations.", img: "/assets/photos/citiy luxe/Delhi/ITC Maurya /kamal-mahal.jpg" },
      { label: "Celebrations", desc: "A grand wedding celebration at ITC Maurya.", img: "/assets/photos/citiy luxe/Delhi/ITC Maurya /Celebrations_1920x950_1.webp" },
      { label: "Chandragupta Suite", desc: "The opulent Chandragupta Suite bedroom.", img: "/assets/photos/citiy luxe/Delhi/ITC Maurya /chandragupta-suite-bedroom.jpg" },
      { label: "Presidential Suite", desc: "Lavish Presidential Suite living area.", img: "/assets/photos/citiy luxe/Delhi/ITC Maurya /presidential-suite-living-area.jpg" },
      { label: "Bukhara", desc: "The legendary Bukhara — India's most iconic restaurant.", img: "/assets/photos/citiy luxe/Delhi/ITC Maurya /bukhara.jpg" },
      { label: "Dum Pukht", desc: "Dum Pukht — a culinary masterpiece within ITC Maurya.", img: "/assets/photos/citiy luxe/Delhi/ITC Maurya /dum-pukht-detail.jpg" },
      { label: "Poolside", desc: "The serene poolside at ITC Maurya.", img: "/assets/photos/citiy luxe/Delhi/ITC Maurya /poolside.jpg" },
      { label: "Lobby", desc: "The grand lobby welcoming guests at ITC Maurya.", img: "/assets/photos/citiy luxe/Delhi/ITC Maurya /lobby.jpg" },
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
      { label: "Taj Lands End", desc: "Taj Lands End perched above the Arabian Sea in Bandra.", img: "/assets/photos/citiy luxe/Mumbai/Taj Lands In , Mumbai/d73db84c8d96fcc30bf87b217bfd1e49c065e720-3840x1860.avif" },
      { label: "Grand Ballroom", desc: "The majestic ballroom at Taj Lands End.", img: "/assets/photos/citiy luxe/Mumbai/Taj Lands In , Mumbai/0176b2325d2d14c1c700f4646e06d87b046c68a5-1920x1280.avif" },
      { label: "Poolside Lawn", desc: "The stunning poolside lawn for alfresco celebrations.", img: "/assets/photos/citiy luxe/Mumbai/Taj Lands In , Mumbai/4e7530ee9e404907e3db62a082ea6529be948b80-1920x1280.avif" },
      { label: "Sea View", desc: "Panoramic Arabian Sea and Sea Link views from Taj Lands End.", img: "/assets/photos/citiy luxe/Mumbai/Taj Lands In , Mumbai/642fb6b1f99db44924941617cd883e8b55d2d3c3-6419x4401.avif" },
      { label: "Celebrations", desc: "A spectacular wedding celebration at Taj Lands End.", img: "/assets/photos/citiy luxe/Mumbai/Taj Lands In , Mumbai/7e38e15e8f79d581d45502b3f9583fc2bb43cb0c-7008x4672.avif" },
      { label: "Suites", desc: "Elegantly appointed suites with sea and city views.", img: "/assets/photos/citiy luxe/Mumbai/Taj Lands In , Mumbai/805cf95900b44e9204c9d95a1d1199b6df07089f-1920x1280.avif" },
      { label: "Ceremony", desc: "A beautiful ceremony setup at Taj Lands End.", img: "/assets/photos/citiy luxe/Mumbai/Taj Lands In , Mumbai/b57da7f73c0d1d13628ff8e03668f0a62a9a747a-7008x4672.avif" },
      { label: "Reception", desc: "A glamorous reception evening at Taj Lands End.", img: "/assets/photos/citiy luxe/Mumbai/Taj Lands In , Mumbai/cad79b171fb7e7175f342ac6b0f84b27de73d4de-7008x4672.avif" },
      { label: "Dining", desc: "World-class Taj dining with a sea backdrop.", img: "/assets/photos/citiy luxe/Mumbai/Taj Lands In , Mumbai/db974df5744381ae096b5b997b11f53c887964a1-1920x1280.avif" },
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
      { label: "Exterior & Grand Lawns", desc: "Grand Hyatt Mumbai's iconic exterior with sprawling lawns.", img: "/assets/photos/citiy luxe/Mumbai/Grand Hyatt Mumbai Hotel & Residences/Grand-Hyatt-Mumbai-P452-Exterior-and-Grand-Lawns.16x9.webp" },
      { label: "Grand Ballroom", desc: "The pillar-less Grand Ballroom for spectacular receptions.", img: "/assets/photos/citiy luxe/Mumbai/Grand Hyatt Mumbai Hotel & Residences/MUMGH-P0921-Grand-Ballroom-Social-Cluster-Seating.16x9.webp" },
      { label: "Grand Alfresco", desc: "The Grand Alfresco at sunset — a stunning outdoor venue.", img: "/assets/photos/citiy luxe/Mumbai/Grand Hyatt Mumbai Hotel & Residences/MUMGH-P0929-The-Grand-Alfresco-Sunset-Expanse.16x9.webp" },
      { label: "Inner Courtyard", desc: "The serene inner courtyard at dusk.", img: "/assets/photos/citiy luxe/Mumbai/Grand Hyatt Mumbai Hotel & Residences/MUMGH-P0765-Inner-Courtyard-Hotel-Exterior-Evening.16x9.webp" },
      { label: "Presidential Suite", desc: "The lavish Presidential Suite at Grand Hyatt Mumbai.", img: "/assets/photos/citiy luxe/Mumbai/Grand Hyatt Mumbai Hotel & Residences/MUMGH-P344-Presidential-Suite.16x9.webp" },
      { label: "Grand Executive Suite", desc: "Elegantly appointed Grand Executive Suite.", img: "/assets/photos/citiy luxe/Mumbai/Grand Hyatt Mumbai Hotel & Residences/MUMGH-P0933-Grand-Executive-Suite-Room.16x9.webp" },
      { label: "Outdoor Pool", desc: "The outdoor pool — a serene art-filled retreat.", img: "/assets/photos/citiy luxe/Mumbai/Grand Hyatt Mumbai Hotel & Residences/MUMGH-P0767-Outdoor-Pool.16x9.webp" },
      { label: "Celini", desc: "Celini — world-class Italian dining at Grand Hyatt.", img: "/assets/photos/citiy luxe/Mumbai/Grand Hyatt Mumbai Hotel & Residences/MUMGH-P0908-Celini-Master-Image.16x9.webp" },
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
      { label: "The Hotel", desc: "Fairmont Sahar — a sophisticated urban palace in Mumbai.", img: "/assets/photos/citiy luxe/Mumbai/Fairmont , Mumbai/HCM_P_1738946_4by3.webp" },
      { label: "Grand Ballroom", desc: "One of Mumbai's most impressive pillar-less Grand Ballrooms.", img: "/assets/photos/citiy luxe/Mumbai/Fairmont , Mumbai/HCM_P_2015541_4by3.webp" },
      { label: "Celebrations", desc: "A grand wedding celebration at Fairmont Sahar.", img: "/assets/photos/citiy luxe/Mumbai/Fairmont , Mumbai/HCM_P_3362367_4by3.webp" },
      { label: "Terrace Gardens", desc: "The beautifully landscaped Terrace Gardens for alfresco rituals.", img: "/assets/photos/citiy luxe/Mumbai/Fairmont , Mumbai/HCM_P_4197997_4by3.webp" },
      { label: "Suites", desc: "Elegantly designed suites at Fairmont Sahar.", img: "/assets/photos/citiy luxe/Mumbai/Fairmont , Mumbai/HCM_P_4251596_4by3.webp" },
      { label: "Dining", desc: "World-class culinary innovation at Fairmont Sahar.", img: "/assets/photos/citiy luxe/Mumbai/Fairmont , Mumbai/HCM_P_4661071_4by3.webp" },
      { label: "Pool", desc: "The stunning pool area at Fairmont Sahar.", img: "/assets/photos/citiy luxe/Mumbai/Fairmont , Mumbai/HCM_P_4680405_4by3.webp" },
      { label: "Ceremony", desc: "An elegantly arranged ceremony at Fairmont Sahar.", img: "/assets/photos/citiy luxe/Mumbai/Fairmont , Mumbai/HCM_P_4793211_4by3.webp" },
      { label: "Lobby", desc: "The grand lobby of Fairmont Sahar.", img: "/assets/photos/citiy luxe/Mumbai/Fairmont , Mumbai/HCM_P_5705644_4by3.webp" },
      { label: "Reception", desc: "A glamorous evening reception at Fairmont Sahar.", img: "/assets/photos/citiy luxe/Mumbai/Fairmont , Mumbai/HCM_P_6219018_4by3.webp" },
      { label: "Exterior", desc: "The striking modern palace facade of Fairmont Sahar.", img: "/assets/photos/citiy luxe/Mumbai/Fairmont , Mumbai/HCM_P_8147067_4by3.webp" },
      { label: "Banquet", desc: "Exquisitely arranged banquet spaces at Fairmont Sahar.", img: "/assets/photos/citiy luxe/Mumbai/Fairmont , Mumbai/HCM_P_9808711_4by3.webp" },
    ],
  },
  // BANGALORE
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
      { label: "Exterior", desc: "ITC Gardenia's striking facade amid Bengaluru's Garden City.", img: "/assets/photos/citiy luxe/Bangalore/ITC Gardenia, a Luxury Collection Hotel, Bengaluru/blrgl-exterior-9880-hor-wide.webp" },
      { label: "Mysore Hall", desc: "The pillar-less Mysore Hall for grand indoor celebrations.", img: "/assets/photos/citiy luxe/Bangalore/ITC Gardenia, a Luxury Collection Hotel, Bengaluru/blrgl-banquet-9936-hor-wide.avif" },
      { label: "Pool", desc: "The stunning pool surrounded by vertical gardens.", img: "/assets/photos/citiy luxe/Bangalore/ITC Gardenia, a Luxury Collection Hotel, Bengaluru/blrgl-pool-9948-hor-wide.webp" },
      { label: "Lobby", desc: "The elegant lobby of ITC Gardenia.", img: "/assets/photos/citiy luxe/Bangalore/ITC Gardenia, a Luxury Collection Hotel, Bengaluru/blrgl-lobby-9914-hor-wide.avif" },
      { label: "Suite", desc: "Luxuriously appointed suites at ITC Gardenia.", img: "/assets/photos/citiy luxe/Bangalore/ITC Gardenia, a Luxury Collection Hotel, Bengaluru/blrgl-suite-9921-hor-wide.avif" },
      { label: "Guest Room", desc: "Elegantly designed guestrooms with garden views.", img: "/assets/photos/citiy luxe/Bangalore/ITC Gardenia, a Luxury Collection Hotel, Bengaluru/blrgl-room-9917-hor-wide.webp" },
      { label: "Restaurant", desc: "Award-winning dining at ITC Gardenia's signature restaurant.", img: "/assets/photos/citiy luxe/Bangalore/ITC Gardenia, a Luxury Collection Hotel, Bengaluru/blrgl-restaurant-9300-hor-wide.avif" },
      { label: "Dinner Setting", desc: "An intimate dinner set amid ITC Gardenia's lush spaces.", img: "/assets/photos/citiy luxe/Bangalore/ITC Gardenia, a Luxury Collection Hotel, Bengaluru/blrgl-dinner-9934-hor-wide.avif" },
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
      { label: "The Estate", desc: "Taj West End's legendary 20-acre Victorian heritage estate.", img: "/assets/photos/citiy luxe/Bangalore/Taj West End, Bengaluru/84fcb6940fa56fd0fe843e0b092affb417be8b9b-3840x1860.avif" },
      { label: "Prince of Wales Lawns", desc: "The iconic Prince of Wales Lawns for grand alfresco ceremonies.", img: "/assets/photos/citiy luxe/Bangalore/Taj West End, Bengaluru/4ce6c5815247af57cfb7e451839d130a8c3f3622-4660x3495.avif" },
      { label: "Grand Ballroom", desc: "The Grand Ballroom for intimate to grand indoor affairs.", img: "/assets/photos/citiy luxe/Bangalore/Taj West End, Bengaluru/5790f3969d59fcfbfae2e645fe84676be3c64cd6-1920x1274.avif" },
      { label: "Heritage Gardens", desc: "Century-old tropical gardens surrounding the estate.", img: "/assets/photos/citiy luxe/Bangalore/Taj West End, Bengaluru/658a602eb7e9b0af07f54193c1d3a2ac11ce8531-2048x1536.avif" },
      { label: "Celebrations", desc: "A grand wedding celebration at Taj West End.", img: "/assets/photos/citiy luxe/Bangalore/Taj West End, Bengaluru/bb9663695af1a8b6fed00e6bcd6dd3ab6409b96b-2500x1662.avif" },
      { label: "Colonial Suites", desc: "Colonial-style rooms and suites nestled amid lush gardens.", img: "/assets/photos/citiy luxe/Bangalore/Taj West End, Bengaluru/bc9c310902c60f66cb6b39c2d15c6e22776049ba-1920x1316.avif" },
      { label: "Evening Ambience", desc: "Taj West End beautifully lit for an evening celebration.", img: "/assets/photos/citiy luxe/Bangalore/Taj West End, Bengaluru/ce5858e29ff6e93f7f9d15c76b4bcf0205230b2e-1920x1404.avif" },
      { label: "Garden Setting", desc: "The famed 150-year-old Rain Tree amid heritage gardens.", img: "/assets/photos/citiy luxe/Bangalore/Taj West End, Bengaluru/2f933d5e3d90de64c4362d35a394eb5342864f0f-1920x1438.avif" },
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
      { label: "Prestige Golfshire", desc: "JW Marriott Prestige Golfshire set against Nandi Hills.", img: "/assets/photos/citiy luxe/Bangalore/Prestige Golfshire, JW Marriot/Prestige Golfshire.jpg" },
      { label: "The Estate", desc: "The sprawling Prestige Golfshire estate.", img: "/assets/photos/citiy luxe/Bangalore/Prestige Golfshire, JW Marriot/Prestige Golfshire 1.jpg" },
      { label: "Celebrations", desc: "A grand wedding celebration at Prestige Golfshire.", img: "/assets/photos/citiy luxe/Bangalore/Prestige Golfshire, JW Marriot/Prestige Golfshire 2.jpg" },
      { label: "Venue Spaces", desc: "Versatile event spaces at JW Marriott Golfshire.", img: "/assets/photos/citiy luxe/Bangalore/Prestige Golfshire, JW Marriot/Prestige Golfshire 3.jpg" },
      { label: "Outdoor Setting", desc: "Manicured lawns for alfresco ceremonies.", img: "/assets/photos/citiy luxe/Bangalore/Prestige Golfshire, JW Marriot/Prestige Golfshire 4.jpg" },
      { label: "Golf Course", desc: "The world-class 18-hole golf course at Prestige Golfshire.", img: "/assets/photos/citiy luxe/Bangalore/Prestige Golfshire, JW Marriot/Prestige Golfshire 5.jpg" },
      { label: "Interiors", desc: "Elegantly appointed interiors at JW Marriott Golfshire.", img: "/assets/photos/citiy luxe/Bangalore/Prestige Golfshire, JW Marriot/Prestige Golfshire 6.jpg" },
      { label: "Evening Ambience", desc: "Prestige Golfshire beautifully lit for an evening celebration.", img: "/assets/photos/citiy luxe/Bangalore/Prestige Golfshire, JW Marriot/Prestige Golfshire 7.jpg" },
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
      { label: "The Venue", desc: "Kings Meadow — a purpose-built luxury wedding destination.", img: "/assets/photos/citiy luxe/Bangalore/The King_s Meadows _ Luxury Wedding Venue in Bangalore/ASHK1710-scaled.jpg" },
      { label: "Grand Ballroom", desc: "The pillar-less ballroom — one of Bengaluru's largest.", img: "/assets/photos/citiy luxe/Bangalore/The King_s Meadows _ Luxury Wedding Venue in Bangalore/DSC_5804-new-copy-scaled.jpg" },
      { label: "Manicured Lawns", desc: "Beautifully landscaped lawns for grand outdoor ceremonies.", img: "/assets/photos/citiy luxe/Bangalore/The King_s Meadows _ Luxury Wedding Venue in Bangalore/DSC_5868-new-3-2-1.jpg" },
      { label: "Celebration", desc: "A grand wedding celebration at Kings Meadow.", img: "/assets/photos/citiy luxe/Bangalore/The King_s Meadows _ Luxury Wedding Venue in Bangalore/DSC_6035.jpg" },
      { label: "Poolside", desc: "The charming poolside area for haldi and daytime rituals.", img: "/assets/photos/citiy luxe/Bangalore/The King_s Meadows _ Luxury Wedding Venue in Bangalore/SPX02745.jpg" },
      { label: "Outdoor Setting", desc: "Kings Meadow's open-canvas outdoor event spaces.", img: "/assets/photos/citiy luxe/Bangalore/The King_s Meadows _ Luxury Wedding Venue in Bangalore/f6f24c_0058c24483114c2eb919d70808b983f6mv2.webp" },
      { label: "Evening", desc: "Kings Meadow brilliantly lit for a starlit reception.", img: "/assets/photos/citiy luxe/Bangalore/The King_s Meadows _ Luxury Wedding Venue in Bangalore/f6f24c_0a5d260b843b49a590cdb83e213e7348mv2.jpg" },
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
      { label: "The Resort", desc: "Angsana Oasis — a tranquil Mediterranean-inspired sanctuary.", img: "/assets/photos/citiy luxe/Bangalore/Angsana Oasis Spa And Resort/unnamed.webp" },
      { label: "Senate Hall", desc: "The elegant Senate Hall for indoor ceremonies and receptions.", img: "/assets/photos/citiy luxe/Bangalore/Angsana Oasis Spa And Resort/Senate_Hall_3jSYP60_If9UzhP.jpg" },
      { label: "Main Lawn", desc: "The sprawling Main Lawn for grand outdoor gatherings.", img: "/assets/photos/citiy luxe/Bangalore/Angsana Oasis Spa And Resort/unnamed (1).webp" },
      { label: "Celebrations", desc: "A beautiful celebration set amid Angsana's open-air courtyards.", img: "/assets/photos/citiy luxe/Bangalore/Angsana Oasis Spa And Resort/_DSC8693-Edit.webp" },
      { label: "Garden Setting", desc: "Lush garden spaces at Angsana Oasis.", img: "/assets/photos/citiy luxe/Bangalore/Angsana Oasis Spa And Resort/_DSC8766-Edit.webp" },
      { label: "Presidential Suite", desc: "The Presidential Suite bedroom at Angsana Oasis.", img: "/assets/photos/citiy luxe/Bangalore/Angsana Oasis Spa And Resort/an-bangalore-Presidential-Suite-Bedroom-1200X675.webp" },
      { label: "Garden Suite", desc: "The Garden Suite living room — serene and elegantly appointed.", img: "/assets/photos/citiy luxe/Bangalore/Angsana Oasis Spa And Resort/an-bangalore-garden-suite-living-room-1200X675 (1).webp" },
      { label: "Sundance Bistro", desc: "Sundance Bistro — casual dining in a tropical setting.", img: "/assets/photos/citiy luxe/Bangalore/Angsana Oasis Spa And Resort/an-bangalore-Sundance-Bistro-Sitting-Area-1200X675.webp" },
      { label: "Tangerine Restaurant", desc: "Tangerine Restaurant — award-winning dining at Angsana.", img: "/assets/photos/citiy luxe/Bangalore/Angsana Oasis Spa And Resort/an-bangalore-Tangerine-Restaurant-Side-View-1200X675.webp" },
      { label: "Property View", desc: "The beautiful grounds of Angsana Oasis Spa & Resort.", img: "/assets/photos/citiy luxe/Bangalore/Angsana Oasis Spa And Resort/34 - Copy.webp" },
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
              sizes="(max-width: 768px) 100vw, 360px"
              placeholder="blur"
              blurDataURL={blurDataUrls[`/assets/photos/${dest.img}`]}
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
            src="/assets/photos/destination/cities-wedding.jpg"
            alt="City Wedding Hero"
            fill
            priority
            sizes="100vw"
            placeholder="blur"
            blurDataURL={blurDataUrls["/assets/photos/destination/cities-wedding.jpg"]}
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
                  {slides.map((slide, i) => {
                    const isActive = i === currentSlide;
                    const isPrev = i === (currentSlide - 1 + slides.length) % slides.length;
                    const isNext = i === (currentSlide + 1) % slides.length;
                    if (!isActive && !isPrev && !isNext) return null;
                    return (
                      <div
                        key={i}
                        className={`absolute inset-0 transition-opacity duration-[400ms] ease-in-out ${isActive ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                      >
                        <div className="w-full h-full transform scale-[1.0] animate-kenBurns origin-center">
                          <Image
                            src={slide.img}
                            alt={slide.label}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    );
                  })}

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
