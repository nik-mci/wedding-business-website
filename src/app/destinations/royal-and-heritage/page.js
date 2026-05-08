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
  // JAIPUR
  { type: 'section', name: 'Jaipur' },
  {
    id: "H01",
    name: "Rambagh Palace",
    location: "Jaipur",
    desc: "Once the residence of the Maharaja of Jaipur, now the crown jewel of Indian palace weddings. Mughal gardens, grand durbar halls, and royal pageantry at every turn.",
    img: "destination/TSR50334.jpg",
  },
  {
    id: "H02",
    name: "Rajasthali Resort",
    location: "Jaipur",
    desc: "A village-themed luxury resort celebrating Rajasthani folk art and craftsmanship. Vibrant, cultural, and wonderfully immersive for couples who want authenticity with comfort.",
    img: "destination/TSR50967.jpg",
  },
  {
    id: "H03",
    name: "Jai Mahal Palace",
    location: "Jaipur",
    desc: "A 18th-century palace set in 18 acres of Mughal gardens. Stately, elegant, and perfectly proportioned for intimate royal ceremonies.",
    img: "destination/TSR50973.jpg",
  },
  {
    id: "H04",
    name: "Fairmont Jaipur",
    location: "Jaipur",
    desc: "Contemporary luxury meets Rajput grandeur. Expansive event lawns, palatial interiors, and Fairmont's world-class service for large, lavish celebrations.",
    img: "destination/TSR50995.jpg",
  },
  {
    id: "H05",
    name: "Leela Palace",
    location: "Jaipur",
    desc: "A majestic tribute to Rajasthan’s royal heritage set against the serene backdrop of the Aravalli hills. This magnificent venue seamlessly blends traditional Rajputana architecture with Mughal-inspired design, featuring gleaming white facades, intricate Thikri mirror work, and sprawling manicured gardens. Featuring a grand pillarless ballroom and enchanting outdoor lawns, it is a premier choice for both intimate ceremonies and lavish celebrations. The palace offers exquisite suites and villas, many featuring private plunge pools and courtyard views to ensure a truly royal stay. Choosing this destination promises an unforgettable wedding experience defined by world-class dining, exceptional hospitality, and a fairytale-like atmosphere.",
    img: "destination/059A3486.jpg",
    stats: {
      rooms: "200",
      guests: "1,500",
      space: "50,000+ Sq. Ft."
    }
  },
  {
    id: "H06",
    name: "Hyatt Regency",
    location: "Jaipur",
    desc: "A reliable luxury anchor in the Pink City. Generous ballrooms, outdoor lawns, and seamless event management for multi-day wedding programmes.",
    img: "destination/0G4A1341.jpg",
  },
  {
    id: "H07",
    name: "Ananta Spa & Resort",
    location: "Jaipur",
    desc: "A wellness-forward resort with traditional Rajasthani architecture and serene surroundings. Intimate, unhurried, and beautifully detailed throughout.",
    img: "destination/pool_venue.jpg",
  },
  {
    id: "H08",
    name: "Le Méridien",
    location: "Jaipur",
    desc: "Modern design with Rajasthani accents in the heart of the city. Well-appointed event spaces and Le Méridien's artistic hospitality sensibility.",
    img: "destination/059A3032 (1).jpg",
  },
  {
    id: "H09",
    name: "Alila Fort Bishangarh",
    location: "Bishangarh",
    desc: "A 230-year-old hilltop fort transformed into a breathtaking luxury hotel. Rampart ceremony spaces, 360-degree countryside views, and a drama that no flat-ground venue can match.",
    img: "destination/TSR50334.jpg",
  },
  {
    id: "H10",
    name: "Samode Palace",
    location: "Samode",
    desc: "A gem of Indo-Saracenic architecture nestled in the Aravalli foothills. Hand-painted frescoes, courtyards, and candlelit evenings that feel like stepping into another century.",
    img: "destination/TSR50967.jpg",
  },
  {
    id: "H11",
    name: "Chomu Palace",
    location: "Chomu",
    desc: "A magnificently restored 300-year-old royal palace just outside Jaipur. Authentic, grand, and untouched by the modern hotel formula — for couples who want the real thing.",
    img: "destination/TSR50973.jpg",
  },
  {
    id: "H12",
    name: "Taj Devi Ratn",
    location: "Jaipur",
    desc: "Taj's contemporary luxury resort in Jaipur with expansive event grounds and the brand's legendary attention to detail. A refined, modern counterpoint to the city's heritage properties.",
    img: "destination/TSR50995.jpg",
  },
  {
    id: "H13",
    name: "The Palace by Park — Jewels",
    location: "Jaipur",
    desc: "A boutique palace property with intimate courtyards and warm Rajasthani hospitality. Perfect for smaller, personal celebrations that still feel regal.",
    img: "destination/059A3486.jpg",
  },
  {
    id: "H14",
    name: "Anantara Jewel Bagh",
    location: "Jaipur",
    desc: "A restored royal garden estate with Anantara's signature Southeast Asian-meets-Indian luxury sensibility. Lush, fragrant, and deeply curated.",
    img: "destination/0G4A1341.jpg",
  },
  {
    id: "H15",
    name: "ITC Rajputana",
    location: "Jaipur",
    desc: "ITC's tribute to Rajput military architecture — bold, structured, and impressive. Strong event infrastructure and ITC's trademark culinary excellence.",
    img: "destination/pool_venue.jpg",
  },
  {
    id: "H16",
    name: "Indana Palace",
    location: "Jaipur",
    desc: "A palatial property with generous outdoor spaces and traditional Rajasthani décor. Accessible luxury for larger guest lists without compromising on royal atmosphere.",
    img: "destination/059A3032 (1).jpg",
  },

  // UDAIPUR
  { type: 'section', name: 'Udaipur' },
  {
    id: "H17",
    name: "Aurika by Lemon Tree",
    location: "Udaipur",
    desc: "A sleek, contemporary lakeside property with panoramic Aravalli views. Modern luxury with a stunning natural setting for the design-forward couple.",
    img: "destination/TSR50334.jpg",
  },
  {
    id: "H18",
    name: "Taj Aravali Resort",
    location: "Udaipur",
    desc: "Spread across the Aravalli hillside with sweeping lake and city views. Taj's impeccable service in one of Udaipur's most scenic elevated locations.",
    img: "destination/TSR50967.jpg",
  },
  {
    id: "H19",
    name: "ITC Mementos",
    location: "Udaipur",
    desc: "ITC's newest and most luxurious Udaipur offering. Palatial scale, curated Rajasthani art, and lakeside positioning that rivals the city's most iconic addresses.",
    img: "destination/TSR50973.jpg",
  },
  {
    id: "H20",
    name: "Raffles Udaipur",
    location: "Udaipur",
    desc: "Set on a private island in Udai Sagar Lake, accessible only by boat. Raffles' legendary colonial elegance in the most exclusive setting Udaipur has to offer.",
    img: "destination/TSR50995.jpg",
  },
  {
    id: "H21",
    name: "The Leela Palace",
    location: "Udaipur",
    desc: "Floating above Lake Pichola like a dream, The Leela is one of India's most photographed wedding venues. Marble courtyards, lake-facing ceremony spaces, and service that anticipates every need.",
    img: "destination/059A3486.jpg",
  },
  {
    id: "H22",
    name: "The Oberoi Udaivilas",
    location: "Udaipur",
    desc: "Consistently ranked among the world's finest hotels. Sprawling lake-facing suites, private pools, and ceremony spaces where every frame looks like a painting.",
    img: "destination/0G4A1341.jpg",
  },
  {
    id: "H23",
    name: "Trident Udaipur",
    location: "Udaipur",
    desc: "A beautifully positioned lakeside property with Aravalli views and a quieter, more intimate atmosphere. Elegant without being overwhelming — ideal for mid-sized celebrations.",
    img: "destination/pool_venue.jpg",
  },
  {
    id: "H24",
    name: "Radisson Blu Palace Resort",
    location: "Udaipur",
    desc: "Palace-inspired architecture with generous event lawns and Aravalli backdrop. A strong, reliable luxury option for larger Udaipur weddings.",
    img: "destination/059A3032 (1).jpg",
  },
  {
    id: "H25",
    name: "Fairmont Udaipur",
    location: "Udaipur",
    desc: "A striking new addition to Udaipur's luxury landscape. Contemporary palatial design, expansive event terraces, and Fairmont's polished international hospitality.",
    img: "destination/TSR50334.jpg",
  },
  {
    id: "H26",
    name: "Taj Lalit Bagh",
    location: "Udaipur",
    desc: "Set in lush heritage gardens with traditional Rajasthani architecture. A serene, garden-first wedding property that feels removed from the world.",
    img: "destination/TSR50967.jpg",
  },
  {
    id: "H27",
    name: "Marriott Udaipur",
    location: "Udaipur",
    desc: "A well-positioned luxury property with strong event facilities and city views. Dependable, polished, and well-suited for large wedding parties.",
    img: "destination/TSR50973.jpg",
  },

  // JODHPUR
  { type: 'section', name: 'Jodhpur' },
  {
    id: "H28",
    name: "Umaid Bhawan Palace",
    location: "Jodhpur",
    desc: "One of the world's largest private residences and India's most iconic palace hotel. Getting married here is not just a wedding — it is a historic occasion.",
    img: "destination/TSR50995.jpg",
  },
  {
    id: "H29",
    name: "Radisson Jodhpur",
    location: "Jodhpur",
    desc: "A contemporary luxury hotel with strong event infrastructure in the Blue City. Reliable, spacious, and well-connected for guests arriving from across the country.",
    img: "destination/059A3486.jpg",
  },
  {
    id: "H30",
    name: "Taj Hari Mahal",
    location: "Jodhpur",
    desc: "A palatial Taj property inspired by Jodhpur's majestic architecture. Grand arched corridors, Rajput detailing, and Taj's legendary wedding expertise.",
    img: "destination/0G4A1341.jpg",
  },
  {
    id: "H31",
    name: "Ajit Bhawan",
    location: "Jodhpur",
    desc: "India's first heritage hotel — a royal residence converted with extraordinary character and warmth. Tented courts, vintage vehicles, and a family-run hospitality that is deeply personal.",
    img: "destination/pool_venue.jpg",
  },
  {
    id: "H32",
    name: "Welcomhotel by ITC",
    location: "Jodhpur",
    desc: "ITC's strong hospitality offering in Jodhpur with well-appointed event spaces and a commanding presence in the heart of the city.",
    img: "destination/059A3032 (1).jpg",
  },

  // BIKANER
  { type: 'section', name: 'Bikaner' },
  {
    id: "H33",
    name: "Laxmi Niwas Palace",
    location: "Bikaner",
    desc: "A magnificent Indo-Saracenic palace built by Maharaja Ganga Singh. Sandstone courtyards, frescoed interiors, and a grandeur that Bikaner's desert setting only amplifies.",
    img: "destination/TSR50334.jpg",
  },
  {
    id: "H34",
    name: "Narendra Bhawan",
    location: "Bikaner",
    desc: "The reimagined home of the last ruling Maharaja of Bikaner. Eclectic, layered, and full of personal royal history — a boutique palace experience unlike any other in Rajasthan.",
    img: "destination/TSR50967.jpg",
  },

  // PUSHKAR
  { type: 'section', name: 'Pushkar' },
  {
    id: "H35",
    name: "The Westin Pushkar",
    location: "Pushkar",
    desc: "A serene luxury resort overlooking the sacred Pushkar Lake and the Aravalli hills. Spiritual energy, desert light, and Westin's wellness-forward hospitality.",
    img: "destination/TSR50973.jpg",
  },
  {
    id: "H36",
    name: "Ananta Spa & Resort",
    location: "Pushkar",
    desc: "Nestled in the Aravalli foothills with quiet, expansive grounds. A peaceful, beautifully detailed retreat perfect for intimate ceremonies in one of India's most sacred towns.",
    img: "destination/TSR50995.jpg",
  },

  // RANTHAMBORE
  { type: 'section', name: 'Ranthambore' },
  {
    id: "H37",
    name: "Six Senses Fort Barwara",
    location: "Ranthambore",
    desc: "A 10th-century fort meticulously restored by Six Senses into one of India's most extraordinary hotels. Ancient temples within the property, rampart ceremony spaces, and the brand's signature soulful luxury.",
    img: "destination/059A3486.jpg",
  },
  {
    id: "H38",
    name: "Nahargarh",
    location: "Ranthambore",
    desc: "A jungle luxury camp on the edge of Ranthambore National Park. Raw, wild, and deeply atmospheric — where wedding evenings end with the sounds of the forest.",
    img: "destination/0G4A1341.jpg",
  },
  {
    id: "H39",
    name: "The Oberoi Vanyavilas",
    location: "Ranthambore",
    desc: "India's finest wildlife resort. Luxury tents, jungle settings, and Oberoi's flawless service — a wedding where tigers roam the surrounding wilderness.",
    img: "destination/pool_venue.jpg",
  },
  {
    id: "H40",
    name: "JW Marriott Resort & Spa",
    location: "Ranthambore",
    desc: "A grand resort property bringing JW's full luxury offering to the Ranthambore landscape. Spacious event grounds and strong hospitality for larger wildlife-destination weddings.",
    img: "destination/059A3032 (1).jpg",
  },

  // JAISALMER
  { type: 'section', name: 'Jaisalmer' },
  {
    id: "H41",
    name: "Suryagarh",
    location: "Jaisalmer",
    desc: "A fortified golden sandstone palace rising from the Thar Desert. Rooftop ceremonies under infinite stars, sand dune receptions, and a romance that only the desert can conjure.",
    img: "destination/TSR50334.jpg",
  },
  {
    id: "H42",
    name: "Jaisalmer Marriott Resort & Spa",
    location: "Jaisalmer",
    desc: "Marriott's full luxury offering in the golden city. Desert-themed event spaces, strong infrastructure, and a warm hospitality for large Jaisalmer celebrations.",
    img: "destination/TSR50967.jpg",
  },
  {
    id: "H43",
    name: "Jaisalkot",
    location: "Jaisalmer",
    desc: "A boutique tented camp resort blending desert living with curated luxury. Intimate, artful, and perfectly suited for couples who want their wedding to feel like a private desert retreat.",
    img: "destination/TSR50973.jpg",
  },
  {
    id: "H44",
    name: "Storii by ITC Hotels",
    location: "Jaisalmer",
    desc: "A heritage-inspired boutique property with ITC's characteristic attention to craft and detail. Intimate courtyards and golden sandstone surroundings in the heart of Jaisalmer.",
    img: "destination/TSR50995.jpg",
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
      <p className="text-muted text-[15px] leading-[1.7] font-light mb-8 w-full">
        {dest.desc}
      </p>

      {/* STATS PILLS */}
      {dest.stats && (
        <div className="flex flex-wrap gap-3 mb-8">
          {dest.stats.rooms && (
            <div className="px-4 py-1.5 bg-white border border-[#C8A84B]/20 rounded-full flex items-center gap-2 shadow-sm transition-transform hover:scale-105">
              <span className="text-[#C8A84B] text-[9px] font-bold uppercase tracking-[1px]">Rooms:</span>
              <span className="text-ink text-[11px] font-medium">{dest.stats.rooms}</span>
            </div>
          )}
          {dest.stats.guests && (
            <div className="px-4 py-1.5 bg-white border border-[#C8A84B]/20 rounded-full flex items-center gap-2 shadow-sm transition-transform hover:scale-105">
              <span className="text-[#C8A84B] text-[9px] font-bold uppercase tracking-[1px]">Guests:</span>
              <span className="text-ink text-[11px] font-medium">{dest.stats.guests}</span>
            </div>
          )}
          {dest.stats.space && (
            <div className="px-4 py-1.5 bg-white border border-[#C8A84B]/20 rounded-full flex items-center gap-2 shadow-sm transition-transform hover:scale-105">
              <span className="text-[#C8A84B] text-[9px] font-bold uppercase tracking-[1px]">Space:</span>
              <span className="text-ink text-[11px] font-medium">{dest.stats.space}</span>
            </div>
          )}
          {dest.stats.acres && (
            <div className="px-4 py-1.5 bg-white border border-[#C8A84B]/20 rounded-full flex items-center gap-2 shadow-sm transition-transform hover:scale-105">
              <span className="text-[#C8A84B] text-[9px] font-bold uppercase tracking-[1px]">Acres:</span>
              <span className="text-ink text-[11px] font-medium">{dest.stats.acres}</span>
            </div>
          )}
        </div>
      )}

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

            const cardIndex = heritageDestinations.filter(d => d.type !== 'section').indexOf(dest);
            const isEven = cardIndex % 2 === 0;

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
