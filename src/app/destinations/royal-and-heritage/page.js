"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoldDivider from "@/components/GoldDivider";
import CornerOrnament from "@/components/CornerOrnament";
import { getBlurProps } from "@/lib/blurDataUrls";

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
      { label: "Celebrations", desc: "Grand celebration spaces at The Leela Palace Jaipur.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/The Leela Palace Jaipur/Celebrations 1920x950.webp" },
      { label: "Fountain Courtyard", desc: "The iconic fountain courtyard at The Leela Palace.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/The Leela Palace Jaipur/Fountain Courtyard_1920x950.webp" },
      { label: "Maharaja Suite", desc: "Opulent Maharaja Suite overlooking palace grounds.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/The Leela Palace Jaipur/Maharaja Suite_1920x950_2.webp" },
      { label: "Royal Villa Outdoor", desc: "Private outdoor space at the Royal Villa.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/The Leela Palace Jaipur/Royal Villa Outdoor-1200x790-a6302a1.jpg" },
      { label: "Swimming Pool", desc: "Serene pool set against the Aravalli hills.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/The Leela Palace Jaipur/Swimming Pool_1920x950.webp" },
      { label: "Culinary", desc: "Award-winning dining at The Leela Palace Jaipur.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/The Leela Palace Jaipur/Culinary1.jpg" },
      { label: "Spa", desc: "The Leela's world-class wellness and spa.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/The Leela Palace Jaipur/Spa-4297x6621-788a7b4_810x520.webp" },
      { label: "Lobby", desc: "The grand entrance and lobby of The Leela Palace.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/The Leela Palace Jaipur/DDS01230_0.jpg" },
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
      { label: "Central Courtyard", desc: "The grand central courtyard of Hyatt Regency Jaipur.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Hyatt Regency Jaipur Mansarovar/JAIRJ-P0001-Central-Courtyard.16x9.webp" },
      { label: "Chauras Bagh", desc: "Expansive Chauras Bagh lawn for grand outdoor celebrations.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Hyatt Regency Jaipur Mansarovar/JAIRJ-P0005-Chauras-Bagh.16x9.webp" },
      { label: "Regency Ballroom", desc: "The pillarless Regency Ballroom for lavish receptions.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Hyatt Regency Jaipur Mansarovar/JAIRJ-P0098-Regency-Ballroom.16x9.webp" },
      { label: "Presidential Suite", desc: "Luxurious Presidential Suite living room.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Hyatt Regency Jaipur Mansarovar/JAIRJ-P0097-Presidential-Suite-Living-Room.16x9.webp" },
      { label: "Tower King Room", desc: "Elegantly appointed Tower King guestroom.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Hyatt Regency Jaipur Mansarovar/JAIRJ-P0030-Tower-King-Room.16x9.webp" },
      { label: "Swimming Pool", desc: "The resort-style pool set within palace gardens.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Hyatt Regency Jaipur Mansarovar/JAIRJ-P0014-Swimming-Pool.16x9.webp" },
      { label: "Royal Bakery Bar", desc: "The Royal Bakery Bar with artisanal bites and cocktails.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Hyatt Regency Jaipur Mansarovar/JAIRJ-P0009-Royal-Bakery-Bar-Seating.16x9.webp" },
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
      { label: "Fort View", desc: "Alila Fort Bishangarh rising above the Aravalli landscape.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Alila Fort Bishangarh/JAIAL-R0001-View.16x9.webp" },
      { label: "Aravalli View", desc: "Sweeping 360-degree views from the Nazaara terrace.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Alila Fort Bishangarh/Alila-Fort-Bishangarh-P035-Aravali-View.16x9.webp" },
      { label: "Exterior at Night", desc: "The fort dramatically lit against the night sky.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Alila Fort Bishangarh/Alila-Fort-Bishangarh-P021-Exterior-at-Night.16x9.webp" },
      { label: "Wedding Couple", desc: "A royal celebration within the fort's ancient walls.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Alila Fort Bishangarh/Alila-Fort-Bishangarh-P037-Wedding-Couple.4x3.webp" },
      { label: "Kachchawa Deck", desc: "The Kachchawa Deck for sundowners and ceremonies.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Alila Fort Bishangarh/Alila-Fort-Bishangarh-P025-Kachchawa-Deck.16x9.webp" },
      { label: "Heritage Twin Room", desc: "Richly appointed Heritage Twin Room with fort views.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Alila Fort Bishangarh/Alila-Fort-Bishangarh-P007-Heritage-Twin-Room.16x9.webp" },
      { label: "Tented Suite", desc: "Luxurious tented suite nestled within the fort grounds.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Alila Fort Bishangarh/JAIAL-P0058-Tented-Suite-Front-View.16x9.webp" },
      { label: "Amarsar Restaurant", desc: "Heritage dining at the Amarsar Restaurant.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Alila Fort Bishangarh/Alila-Fort-Bishangarh-P015-Amarsar-Restaurant.16x9.webp" },
      { label: "Celebrations", desc: "A grand wedding celebration within the fort.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Alila Fort Bishangarh/TSR52812.jpg" },
      { label: "Ceremony", desc: "A candlelit ceremony at Alila Fort Bishangarh.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Alila Fort Bishangarh/TSR53156.jpg" },
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
      { label: "The Palace", desc: "Samode Palace rising from the Aravalli hills.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Samode Palace/1-24.jpg" },
      { label: "Palace Grounds", desc: "The sprawling courtyards and gardens of Samode.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Samode Palace/1-29.jpg" },
      { label: "Celebration", desc: "A grand celebration in the palace halls.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Samode Palace/2-1.jpg" },
      { label: "Heritage Interior", desc: "Intricately hand-painted interiors and frescoed halls.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Samode Palace/2-2.jpg" },
      { label: "Garden Setting", desc: "Lush palace gardens for open-air ceremonies.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Samode Palace/4-2.jpg" },
      { label: "Royal Suite", desc: "A Royal Suite with ornate Rajasthani detailing.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Samode Palace/DSC8352_High_Res.jpg" },
      { label: "Wedding Ceremony", desc: "A traditional wedding ceremony at Samode Palace.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Samode Palace/MG_8992.jpg" },
      { label: "Evening Celebrations", desc: "The palace lit magnificently for an evening celebration.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaipur/Samode Palace/MG_9755.jpg" },
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
      { label: "Island Estate", desc: "Raffles Udaipur — a private island on Udai Sagar Lake.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Raffles/2024-01-24.webp" },
      { label: "Palace Gardens", desc: "Baroque-inspired gardens overlooking the lake.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Raffles/2024-06-17.webp" },
      { label: "Celebrations", desc: "Grand celebrations at Raffles Udaipur.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Raffles/2024-08-16.webp" },
      { label: "Ceremony Setup", desc: "An intimate ceremony set up on the Compass Lawn.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Raffles/2024-08-16 (1).webp" },
      { label: "Property View", desc: "Sweeping views of the island and surrounding Aravallis.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Raffles/unnamed.webp" },
      { label: "Interiors", desc: "Elegantly appointed suites at Raffles Udaipur.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Raffles/unnamed (1).webp" },
      { label: "Dining", desc: "World-class dining with lake and garden views.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Raffles/unnamed (2).webp" },
      { label: "Pool", desc: "The stunning infinity pool overlooking Udai Sagar Lake.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Raffles/unnamed (3).webp" },
      { label: "Great Hall", desc: "The grand Great Hall ballroom at Raffles.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Raffles/unnamed (4).webp" },
      { label: "Patisserie", desc: "Raffles Patisserie — intimate gatherings and high tea.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Raffles/unnamed (5).webp" },
      { label: "Evening Ambience", desc: "Raffles Udaipur glowing at dusk.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Raffles/unnamed (6).webp" },
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
      { label: "The Palace", desc: "Fairmont Udaipur Palace rising above the Aravalli Hills.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Fairmont Udaipur Palace/2025-08-01.webp" },
      { label: "Grand Facade", desc: "The ornate facade of Fairmont Udaipur Palace.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Fairmont Udaipur Palace/2025-08-01 (1).webp" },
      { label: "Jewel Ballroom", desc: "The majestic Jewel Ballroom for grand receptions.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Fairmont Udaipur Palace/2025-08-12.webp" },
      { label: "Jashn Palace Garden", desc: "The expansive Jashn Palace Garden for outdoor celebrations.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Fairmont Udaipur Palace/2025-08-12 (1).webp" },
      { label: "Chand Baori", desc: "The mystical Chand Baori stepwell-inspired setting.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Fairmont Udaipur Palace/2025-08-19.webp" },
      { label: "Suites", desc: "Exquisitely designed suites with Aravalli views.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Fairmont Udaipur Palace/2025-08-19 (1).webp" },
      { label: "Pool Terrace", desc: "The palatial pool terrace with sweeping hilltop views.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Fairmont Udaipur Palace/2025-09-10.webp" },
      { label: "Celebrations", desc: "A grand wedding celebration at Fairmont Udaipur.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Fairmont Udaipur Palace/2025-12-18.webp" },
      { label: "Evening Glow", desc: "Fairmont Udaipur Palace illuminated at dusk.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Fairmont Udaipur Palace/2025-12-25.webp" },
      { label: "Interiors", desc: "Hand-painted domes and ornate marble columns within.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Fairmont Udaipur Palace/unnamed.webp" },
      { label: "Decor", desc: "Richly detailed décor across the palace.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Fairmont Udaipur Palace/unnamed (1).webp" },
      { label: "Aerial View", desc: "An aerial perspective of Fairmont's hilltop palace grounds.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Udaipur/Fairmont Udaipur Palace/unnamed.jpg" },
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
      { label: "The Estate", desc: "Ajit Bhawan's sprawling crimson-sandstone estate in Jodhpur.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jodhpur/Ajit Bhawan/2021-12-18.webp" },
      { label: "Heritage Grounds", desc: "The lush gardens and courtyards of Ajit Bhawan.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jodhpur/Ajit Bhawan/2024-03-15.webp" },
      { label: "Palace View", desc: "The palace facade and surrounding grounds.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jodhpur/Ajit Bhawan/unnamed.webp" },
      { label: "Zenana Garden", desc: "The lush Zenana Garden — perfect for traditional ceremonies.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jodhpur/Ajit Bhawan/unnamed (1).webp" },
      { label: "Courtyard", desc: "The elegant Courtyard at the heart of the estate.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jodhpur/Ajit Bhawan/unnamed (2).webp" },
      { label: "Heritage Suites", desc: "Uniquely designed heritage rooms and suites.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jodhpur/Ajit Bhawan/unnamed (3).webp" },
      { label: "Celebrations", desc: "A royal celebration amidst Rajputana heritage.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jodhpur/Ajit Bhawan/unnamed (4).webp" },
      { label: "Evening Ambience", desc: "Ajit Bhawan glowing under the Jodhpur night sky.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jodhpur/Ajit Bhawan/unnamed (5).webp" },
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
      { label: "The Fort", desc: "Six Senses Fort Barwara — a 14th-century citadel near Ranthambore.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Ranthambore/Six Senses Fort Barwara/ADD_040517.webp" },
      { label: "Zenana Bagh", desc: "The Zenana Bagh — Queen's Garden for outdoor celebrations.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Ranthambore/Six Senses Fort Barwara/1_Zenana_Mahal_.webp" },
      { label: "Stepwell Celebrations", desc: "The mystical stepwell setting for pre-wedding functions.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Ranthambore/Six Senses Fort Barwara/Stepwell_-_Celebrations.webp" },
      { label: "Barwara State Room", desc: "The majestic Barwara State Room for intimate gatherings.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Ranthambore/Six Senses Fort Barwara/1_Barwara_State_Room_.webp" },
      { label: "Fort Grounds", desc: "The sweeping grounds of Six Senses Fort Barwara.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Ranthambore/Six Senses Fort Barwara/2022-06-26.webp" },
      { label: "Spa Relaxation", desc: "World-class wellness at the Six Senses Spa.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Ranthambore/Six Senses Fort Barwara/170115_Spa Relaxation_Final.webp" },
      { label: "Heritage Suites", desc: "Magnificently restored suites within the ancient fort.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Ranthambore/Six Senses Fort Barwara/unnamed.webp" },
      { label: "Celebrations", desc: "A royal celebration within the fort's storied walls.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Ranthambore/Six Senses Fort Barwara/unnamed (1).webp" },
      { label: "Evening Setting", desc: "Six Senses Fort Barwara beautifully lit at dusk.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Ranthambore/Six Senses Fort Barwara/unnamed (2).webp" },
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
      { label: "The Fortress", desc: "Suryagarh — a golden-sandstone fortress at the gateway to the Thar.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaiselmer/Suryagarh /ic103503.jpg" },
      { label: "Dinner on the Dunes", desc: "A magical dinner-on-the-dunes experience under desert stars.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaiselmer/Suryagarh /suryagarh_dining_dinner-on-the-dunes_1.jpg" },
      { label: "Wedding Celebrations", desc: "A grand wedding celebration in Suryagarh's open courtyards.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaiselmer/Suryagarh /suryagarh_misc_weddings_58.jpg" },
      { label: "Heritage Room", desc: "Twin bedroom in the elegantly crafted Heritage Room.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaiselmer/Suryagarh /suryagarh_rooms_heritage-room_twin-bedroom_1.jpg" },
      { label: "Jaisalmer Haveli", desc: "The opulent Jaisalmer Haveli suite.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaiselmer/Suryagarh /suryagarh_rooms_jaisalmer-haveli_4.jpg" },
      { label: "Luxury Suite", desc: "A signature Thar Villa with private courtyard.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaiselmer/Suryagarh /suryagarh_rooms_luxury-suite_2.jpg" },
      { label: "Property", desc: "Suryagarh set against the golden Thar landscape.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaiselmer/Suryagarh /unnamed.webp" },
      { label: "Celebration Gardens", desc: "The expansive Celebration Gardens of Suryagarh.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaiselmer/Suryagarh /unnamed (1).webp" },
      { label: "The Bawdi", desc: "The mystical Bawdi step-well for intimate ceremonies.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaiselmer/Suryagarh /unnamed (2).webp" },
      { label: "Desert Sundowner", desc: "A golden sundowner in the heart of the Thar Desert.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaiselmer/Suryagarh /unnamed (3).webp" },
      { label: "Evening Ambience", desc: "Suryagarh glowing magnificently at dusk.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaiselmer/Suryagarh /unnamed (4).webp" },
      { label: "Folk Evenings", desc: "Soulful Manganiyar folk performances under the stars.", img: "/assets/photos/royal-and-heritage/Royal Circuit/Jaiselmer/Suryagarh /unnamed (5).webp" },
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

  const slides = selectedVenue?.slides || [];

  return (
    <div ref={containerRef} className="bg-bg overflow-x-hidden flex flex-col gap-0 p-0 m-0">
      {/* HERO BANNER */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden m-0 p-0">
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/photos/destination/TSR50334.jpg"
            alt="Royal Heritage Hero"
            fill
            priority
            sizes="100vw"
            {...getBlurProps("/assets/photos/destination/TSR50334.jpg")}
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
      <section className="bg-bg pt-10 pb-16 px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col items-center text-center mb-10">
            <p className="section-label reveal">Our Venues</p>
            <h2 className="section-title reveal text-ink">Where Your Story Unfolds</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {heritageDestinations.map((venue, index) => (
              <div
                key={venue.id}
                className="relative h-[320px] rounded-xl overflow-hidden cursor-pointer group bg-[#1A1408]"
                onClick={() => openVenue(venue)}
              >
                <div className="absolute inset-0 overflow-hidden">
                  <Image
                    src={`/assets/photos/${venue.img}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={venue.name}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 border-2 border-[#C9A234] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col items-start">
                  <span className="text-[#C9A234] text-[11px] mb-1.5">✦</span>
                  <p className="text-[10px] font-body uppercase text-[#C9A234] tracking-[3px] mb-1">
                    {String(index + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-heading text-white text-[22px] leading-[1.2] mb-1">
                    {venue.name}
                  </h3>
                  <p className="text-white/60 text-[11px] uppercase tracking-[2px] mb-3">
                    {venue.location}
                  </p>
                  <div className="flex gap-2 mb-4">
                    <span className="px-3 py-1 bg-white/10 border border-[#C8A84B]/30 rounded-full text-[10px] text-white/80">
                      Rooms: {venue.stats?.rooms || "N/A"}
                    </span>
                    <span className="px-3 py-1 bg-white/10 border border-[#C8A84B]/30 rounded-full text-[10px] text-white/80">
                      Guests: {venue.stats?.guests || "N/A"}
                    </span>
                  </div>
                  <div className="px-4 py-1.5 rounded-full bg-[#C9A234]/15 border border-[#C9A234]/40 text-[10px] text-[#C9A234] uppercase tracking-[2px] group-hover:bg-[#C9A234]/30 transition-colors duration-300">
                    Explore Venue →
                  </div>
                </div>
              </div>
            ))}
          </div>
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
