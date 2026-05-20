"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import GoldDivider from "@/components/GoldDivider";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useParams, notFound } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

const categoryData = {
  "beach-weddings": {
    title: "Beach Weddings",
    locations: "Goa, Kovalam, Varkala, Alleppey, Andaman Islands",
    bg: "destination/059A3564.jpg",
    desc: "Celebrate your eternal love where the golden sands meet the pristine waves. Our beach weddings offer a breathtaking blend of natural beauty and luxurious curation, crafting the perfect coastal celebration."
  },
  "hills-weddings": {
    title: "Hills Weddings",
    locations: "Mussoorie, Shimla, Manali, Nainital, Coorg, Darjeeling",
    bg: "destination/TSR50501.jpg",
    desc: "Exchange vows amidst misty peaks and serene valleys. A hills wedding provides a magical, intimate atmosphere paired with breathtaking panoramic views and crisp mountain air."
  },
  "royal-and-heritage": {
    title: "Royal and Heritage",
    locations: "Udaipur, Jaipur, Jodhpur, Jaisalmer, Neemrana, Ranthambore",
    bg: "royal-and-heritage/alila_fort.jpg",
    desc: "Step into a world of regal splendor and timeless history. Our Royal and Heritage weddings bring majestic forts, ornate palaces, and ancient stories to life, giving you a celebration fit for royalty."
  },
  "cities-and-metropolitans": {
    title: "Cities and Metropolitans",
    locations: "Mumbai, Delhi, Bangalore, Hyderabad, Kolkata",
    bg: "couple-shots/0G4A4625.jpg",
    desc: "Embrace the vibrant energy of India's most iconic metropolises. From skyline ballrooms to contemporary urban retreats, city weddings offer a perfect blend of modern luxury and cosmopolitan charm."
  },
  "backwaters-and-lakes": {
    title: "Backwaters & Lakes",
    locations: "Kumarakom, Kochi, Alleppey",
    bg: "couple-shots/TSR53127.jpg",
    desc: "Glide into your new chapter surrounded by tranquil waters and lush greenery. The backwaters offer a deeply romantic and peaceful setting for a uniquely intimate celebration."
  }
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category;
  const data = categoryData[category];

  useEffect(() => {
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
  }, [category]);

  if (!data) {
    return notFound();
  }

  const locationList = data.locations.split(', ').map(loc => loc.trim());

  return (
    <div>
      {/* PAGE HERO */}
      <div className="page-hero">
        <div 
          className="page-hero-bg" 
          style={{ backgroundImage: `url('/assets/photos/${data.bg}')`, backgroundPosition: "center 35%" }}
        ></div>
        <div className="page-hero-overlay bg-black/60"></div>
        <div className="page-hero-content">
          <GoldDivider darkBg className="mb-4" />
          <p className="page-hero-eyebrow">India Destinations</p>
          <h1 className="page-hero-title">
            <em className="italic">{data.title}</em>
          </h1>
          <GoldDivider darkBg flip className="mt-4" />
        </div>
      </div>

      {/* DESCRIPTION & LOCATIONS */}
      <section className="py-24 px-12 text-center max-w-[800px] mx-auto">
        <p className="reveal text-[15px] leading-[2.2] text-muted font-light mb-16">
          {data.desc}
        </p>

        <p className="section-label reveal mb-10">Signature Locations</p>
        <div className="reveal flex flex-wrap justify-center gap-4">
          {locationList.map((loc, i) => (
            <span key={i} className="inline-block border border-gold/30 px-6 py-3 text-[11px] tracking-[0.2em] uppercase text-ink hover:bg-gold/10 transition-colors duration-300">
              {loc}
            </span>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-ink py-24 px-12 text-center">
        <p className="section-label reveal text-gold">Begin Your Journey</p>
        <h2 className="section-title reveal text-surface">Plan Your <em className="italic">Dream Wedding</em></h2>
        <p className="reveal text-surface/60 text-[13px] font-light mb-10 max-w-[480px] mx-auto leading-[2]">
          Let us curate a flawless {data.title.toLowerCase()} experience for you and your guests. Reach out to explore venues and possibilities.
        </p>
        <div className="reveal">
          <Link href="/contact" className="btn-gold">Enquire Now</Link>
        </div>
      </section>
    </div>
  );
}
