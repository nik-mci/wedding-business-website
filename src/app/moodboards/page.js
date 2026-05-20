"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import blurDataUrls from "@/lib/blurDataUrls";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const moodBoards = [
  { 
    id: "haldi-citrus-bloom", 
    number: "01", 
    category: "Haldi", 
    name: "Citrus Bloom", 
    count: 12, 
    colors: ["#F2994A", "#949B6A", "#F17B5F", "#DFB271", "#E9E1D2"], 
    tags: ["Citrus Tones","Marigold Florals","Daytime Haldi"], 
    perfectFor: ["Outdoor Celebrations","Vibrant Themes","Tropical Settings"], 
    description: "A vibrant fusion of citrus tones and sunshine yellows. Fresh marigolds, zesty accents, and a celebration that radiates warmth and joy.",
    images: [
      "moodboards/Haldi-Citrus Bloom/059A5790.jpg",
      "moodboards/Haldi-Citrus Bloom/059A5791.jpg",
      "moodboards/Haldi-Citrus Bloom/059A5798.jpg",
      "moodboards/Haldi-Citrus Bloom/059A5799.jpg",
      "moodboards/Haldi-Citrus Bloom/059A5800.jpg",
      "moodboards/Haldi-Citrus Bloom/059A5801.jpg",
      "moodboards/Haldi-Citrus Bloom/059A5837.jpg",
      "moodboards/Haldi-Citrus Bloom/059A5840.jpg",
      "moodboards/Haldi-Citrus Bloom/059A5841.jpg",
      "moodboards/Haldi-Citrus Bloom/059A5846.jpg",
      "moodboards/Haldi-Citrus Bloom/059A5847.jpg",
      "moodboards/Haldi-Citrus Bloom/059A5852.jpg"
    ]
  },
  { 
    id: "haldi-royal-boho", 
    number: "02", 
    category: "Haldi", 
    name: "Royal Boho", 
    count: 10, 
    colors: ["#E4A11B", "#989B74", "#B4522A", "#EEE0C6", "#56392D"], 
    tags: ["Macramé Decor","Terracotta Accents","Bohemian Luxe"], 
    perfectFor: ["Outdoor Sunsets","Intimate Gatherings","Artistic Themes"], 
    description: "A free-spirited blend of regal textures and bohemian charm. Terracotta accents, macramé details, and a relaxed yet opulent atmosphere.",
    images: [
      "moodboards/Haldi Option 2-Royal Boho/12365585c34bddd12d9a852dce0745cc.jpg",
      "moodboards/Haldi Option 2-Royal Boho/1b38d3bcf1dac641ca4a1dc939ada10c.jpg",
      "moodboards/Haldi Option 2-Royal Boho/1fdb6f6c1ee11038e47768b35dc1393e.jpg",
      "moodboards/Haldi Option 2-Royal Boho/53a84bd999256536b176d705ed6fe6b3.jpg",
      "moodboards/Haldi Option 2-Royal Boho/7fe8ad38c256927916e1f715111cafdb.jpg",
      "moodboards/Haldi Option 2-Royal Boho/913c7f0d12e5a81e8e513ca9ba78dda7.jpg",
      "moodboards/Haldi Option 2-Royal Boho/99312f00aed19fdf225721a2bb4745b7.jpg",
      "moodboards/Haldi Option 2-Royal Boho/a105b924d361d89e6112af941608c586.jpg",
      "moodboards/Haldi Option 2-Royal Boho/b0adde2fbea235b7abbb28a00038dbce.jpg",
      "moodboards/Haldi Option 2-Royal Boho/d2ad0c4afa270184c63778469406d1ba.jpg"
    ]
  },
  { 
    id: "mehendi-tangerine-tales", 
    number: "03", 
    category: "Mehendi", 
    name: "Tangerine Tales", 
    count: 23, 
    colors: ["#D37232", "#E88D3D", "#F1B14C", "#999B74", "#E67373"], 
    tags: ["Tangerine Tones","Citrus Decor","Bohemian Mehendi"], 
    perfectFor: ["Daytime Celebrations","Vibrant Outdoors","Poolside Parties"], 
    description: "A zesty celebration of color and tradition. Tangerine hues meet lush greens, creating a spirited and sun-drenched mehendi experience.",
    images: [
      "moodboards/Mehendi-Tangerine Tales/059A2920.jpg",
      "moodboards/Mehendi-Tangerine Tales/059A2924.jpg",
      "moodboards/Mehendi-Tangerine Tales/059A2925.jpg",
      "moodboards/Mehendi-Tangerine Tales/059A2933.jpg",
      "moodboards/Mehendi-Tangerine Tales/059A2938.jpg",
      "moodboards/Mehendi-Tangerine Tales/059A2944.jpg",
      "moodboards/Mehendi-Tangerine Tales/059A2949.jpg",
      "moodboards/Mehendi-Tangerine Tales/059A3557.jpg",
      "moodboards/Mehendi-Tangerine Tales/059A3558.jpg",
      "moodboards/Mehendi-Tangerine Tales/059A3559.jpg",
      "moodboards/Mehendi-Tangerine Tales/059A3821.jpg",
      "moodboards/Mehendi-Tangerine Tales/0G4A1232.jpg",
      "moodboards/Mehendi-Tangerine Tales/0G4A1263.jpg",
      "moodboards/Mehendi-Tangerine Tales/0G4A1965.jpg",
      "moodboards/Mehendi-Tangerine Tales/0G4A1972.jpg",
      "moodboards/Mehendi-Tangerine Tales/TSR50228.jpg",
      "moodboards/Mehendi-Tangerine Tales/TSR50230.jpg",
      "moodboards/Mehendi-Tangerine Tales/TSR50231.jpg",
      "moodboards/Mehendi-Tangerine Tales/TSR50241.jpg",
      "moodboards/Mehendi-Tangerine Tales/TSR50242.jpg",
      "moodboards/Mehendi-Tangerine Tales/TSR50244.jpg",
      "moodboards/Mehendi-Tangerine Tales/TSR50250.jpg",
      "moodboards/Mehendi-Tangerine Tales/TSR50256.jpg"
    ]
  },
  { 
    id: "mehendi-tropical-rhapsody", 
    number: "04", 
    category: "Mehendi", 
    name: "Tropical Rhapsody", 
    count: 15, 
    colors: ["#137E45", "#FFC03D", "#FF7B51", "#F6407B", "#00A2B1"], 
    tags: ["Tropical Florals","Vibrant Greens","Exotic Decor"], 
    perfectFor: ["Beachside Venues","Summer Celebrations","Lush Gardens"], 
    description: "A lush, exotic escape filled with vibrant tropical blooms and emerald greens. A rhapsody of color that brings the magic of the tropics to your mehendi.",
    images: [
      "moodboards/Mehendi Option 2 - Tropical Rhapsody/08b8afc5f535266be77c688e12ed0f5f.jpg",
      "moodboards/Mehendi Option 2 - Tropical Rhapsody/1501908146_image4519.webp",
      "moodboards/Mehendi Option 2 - Tropical Rhapsody/1510317997_00008_423M.webp",
      "moodboards/Mehendi Option 2 - Tropical Rhapsody/328ca19201f34bd31ee36c23f9b3f34a.jpg",
      "moodboards/Mehendi Option 2 - Tropical Rhapsody/5367daa3055113a2e5ba7d6825f3a862.jpg",
      "moodboards/Mehendi Option 2 - Tropical Rhapsody/7bb99c6dbe065addff5546f9b88193eb.jpg",
      "moodboards/Mehendi Option 2 - Tropical Rhapsody/898e0e372d5230db34aabf639abe9c77.jpg",
      "moodboards/Mehendi Option 2 - Tropical Rhapsody/D0X1EzjNoqMueQ2GuXAEU3XTkNjBQsfDSbrqhzx5OIKbaPaN_X6MEAo47Z_Spf0nMzTXKIO17MpfRGWx5iAOj30hXsFLmUa5gSHmafnCY4E1BFFtIeZb9JjesUlYBIhyL2Z675Oogg6KAqf78xLWOH7BXFR5It4Ql03aAkejo9obMOyeCwEGglvtKP45ZfRP.jpg",
      "moodboards/Mehendi Option 2 - Tropical Rhapsody/HYXR_Pfjpaw8zd_HYuDoWv330Ip3fsGO6qWV-fvELPrf4LeVrJCLxMHQ-jK04Zsxa0st_aJYXgaGv4lnCO3wFn-5Q-ROVaWFSXCox4GKx5UAH1iafQvENGFm_aitGP5HpzMMrz9clK02X3T9MuAOzqWhiTH2UGzYW3bijUu5ssrkOqrYVXCyl_3qA4MYb9MS.jpg",
      "moodboards/Mehendi Option 2 - Tropical Rhapsody/JitzCZ9OI0pUysBCdGV20NhxcwTaBpsUxv7ZzzzM0YoE6SZKf9YbagOMsz_zeI21qATCH1YybVFu49QB5sozwkdV1wyNHoQqehmxEvLFUbbJ4LMztdFuLrjtcumbWssRdK5ozUJWfU6BYcRsKYf3tl_sDd-tP21XCWcrO_Fr_Lyr3xmPpO-zlhCzXrSSQ4FP.jpg",
      "moodboards/Mehendi Option 2 - Tropical Rhapsody/UC-TE-ybNxGtzRp1h7K_x_2RYeVfkEQ-ul1o4nPel45kudCMIMHMvCzoJxRDxItR3yI-RjNbi9cM9Mg2NhzkpuYkKyGiM5MFhWmOQ0kinJ1kn9pAPlIo9TgKiPw9lqRbdUi91VLeJoO9Yo1YI0lBCdjHlcIPUkSOiNXTou_ITBM9tpsTVWfL-RgEHUvfkWKm.jpg",
      "moodboards/Mehendi Option 2 - Tropical Rhapsody/f7c446a7ce64b1c841652dae400b3508.jpg",
      "moodboards/Mehendi Option 2 - Tropical Rhapsody/nqDjeuwd95p3c-4ixo9LLj77XsR46RJ6aDe8vTT2t5qmlzTu2wAsI3CqiL5fX9xEMrnIzStWxQ1OrCe5Pf2YdVI-tV7niYxP1ul1KQg7ogx9UC_tI-k3giWIRujnObgZOYthTB79y5GU4kAXgDsl89e5mygE0cgi9d7aqFrSjj40BUD0bFVrQBKQLEh7MSDc.jpg",
      "moodboards/Mehendi Option 2 - Tropical Rhapsody/ChatGPT Image May 13, 2026, 05_14_30 PM.png",
      "moodboards/Mehendi Option 2 - Tropical Rhapsody/ChatGPT Image May 13, 2026, 05_30_10 PM.png"
    ]
  },
  { 
    id: "wedding-royal-indian", 
    number: "05", 
    category: "Wedding", 
    name: "Royal Indian", 
    count: 24, 
    colors: ["#800000", "#D4AF37", "#5C4033", "#228B22", "#F5F5DC"], 
    tags: ["Palatial Grandeur","Maroon & Gold","Heritage Venues"], 
    perfectFor: ["Grand Receptions","Royal Ceremonies","Historic Palaces"], 
    description: "A celebration of timeless elegance and palatial grandeur. Rich maroon tones, antique gold accents, and heritage settings create a wedding of regal proportions.",
    images: [
      "moodboards/Wedding-Royal Indian/059A6704.jpg",
      "moodboards/Wedding-Royal Indian/059A6706.jpg",
      "moodboards/Wedding-Royal Indian/059A6711.jpg",
      "moodboards/Wedding-Royal Indian/059A6713.jpg",
      "moodboards/Wedding-Royal Indian/059A6715.jpg",
      "moodboards/Wedding-Royal Indian/059A6986.jpg",
      "moodboards/Wedding-Royal Indian/059A6996.jpg",
      "moodboards/Wedding-Royal Indian/059A7005.jpg",
      "moodboards/Wedding-Royal Indian/059A7029.jpg",
      "moodboards/Wedding-Royal Indian/059A7033.jpg",
      "moodboards/Wedding-Royal Indian/059A7034.jpg",
      "moodboards/Wedding-Royal Indian/059A7038.jpg",
      "moodboards/Wedding-Royal Indian/059A7041.jpg",
      "moodboards/Wedding-Royal Indian/059A7080.jpg",
      "moodboards/Wedding-Royal Indian/059A7088.jpg",
      "moodboards/Wedding-Royal Indian/0G4A5277.jpg",
      "moodboards/Wedding-Royal Indian/0G4A5280.jpg",
      "moodboards/Wedding-Royal Indian/0G4A5285.jpg",
      "moodboards/Wedding-Royal Indian/0G4A5286.jpg",
      "moodboards/Wedding-Royal Indian/ChatGPT Image May 13, 2026, 05_51_34 PM.png",
      "moodboards/Wedding-Royal Indian/TSR53198.jpg",
      "moodboards/Wedding-Royal Indian/TSR53206.jpg",
      "moodboards/Wedding-Royal Indian/TSR53220.jpg",
      "moodboards/Wedding-Royal Indian/TSR53252.jpg"
    ]
  },
  { 
    id: "wedding-emerald-eden", 
    number: "06", 
    category: "Wedding", 
    name: "Emerald Eden", 
    count: 16, 
    colors: ["#0E5B46", "#2E7A5A", "#6F9D7D", "#A8C5B1", "#D8C28A"], 
    tags: ["Forest Settings","Moss Palette","Intimate Outdoor"], 
    perfectFor: ["Eco-friendly Weddings","Small Groups","Hill Stations"], 
    description: "Deep greens and quiet moss. A celebration that feels grown, not made — organic, intimate, and deeply connected to nature.",
    images: [
      "moodboards/Wedding Option 2 - Emerald Eden/057eead1696fe154a4fc816f96cb5e32.jpg",
      "moodboards/Wedding Option 2 - Emerald Eden/06d11265dcde51dda65ab0dab15728ea.jpg",
      "moodboards/Wedding Option 2 - Emerald Eden/35d8525c2c25bead7cc71f34483b36e2.jpg",
      "moodboards/Wedding Option 2 - Emerald Eden/3d3af56de84158b4cac7311ed463f833.jpg",
      "moodboards/Wedding Option 2 - Emerald Eden/48f1dd4e3cf859f45a026da3aab8cce5.jpg",
      "moodboards/Wedding Option 2 - Emerald Eden/4ef847e43ac196fadceff2705c8cdcc6.jpg",
      "moodboards/Wedding Option 2 - Emerald Eden/6a0e97ecd181369a324b4d5461336f8d.jpg",
      "moodboards/Wedding Option 2 - Emerald Eden/71cf13928fb4dc5279ea7514d0275022.jpg",
      "moodboards/Wedding Option 2 - Emerald Eden/77f39f935d8432b4108e53b932d9cd4f.jpg",
      "moodboards/Wedding Option 2 - Emerald Eden/99c936e6623b46e8f4a13aac4a8bd1ed.jpg",
      "moodboards/Wedding Option 2 - Emerald Eden/b407d703a28fa1d21087f7e6cc80a8de.jpg",
      "moodboards/Wedding Option 2 - Emerald Eden/c6ea54e523e08e1cf2abc938126f4b06.jpg",
      "moodboards/Wedding Option 2 - Emerald Eden/db4a9c61366b050a77b7909fc94128ae.jpg",
      "moodboards/Wedding Option 2 - Emerald Eden/f2c2226c8479e64e0d06e01d9bfbef20.jpg",
      "moodboards/Wedding Option 2 - Emerald Eden/fb96105a84ed299cd95e38a4e93b27ae.jpg",
      "moodboards/Wedding Option 2 - Emerald Eden/fd523b6483fef4a1bfa2a2b028651ccf.jpg"
    ]
  },
  { 
    id: "sangeet-disco-shimmer", 
    number: "07", 
    category: "Sangeet", 
    name: "Disco Shimmer", 
    count: 14, 
    colors: ["#000000", "#C0C0C0", "#4B0082", "#FFBF00", "#FFFFFF"], 
    tags: ["Night Ceremony","Mirror Decor","High Energy"], 
    perfectFor: ["Large Parties","Indoor Ballrooms","Cocktail Nights"], 
    description: "Glittering mirrors, pulsing lights, and an energy that doesn't quit. A sangeet designed for the dance floor.",
    images: [
      "moodboards/Sangeet-Disco Shimmer/059A4336.jpg",
      "moodboards/Sangeet-Disco Shimmer/0G4A2324.jpg",
      "moodboards/Sangeet-Disco Shimmer/0G4A2325.jpg",
      "moodboards/Sangeet-Disco Shimmer/0G4A2327.jpg",
      "moodboards/Sangeet-Disco Shimmer/0G4A2906.jpg",
      "moodboards/Sangeet-Disco Shimmer/ChatGPT Image May 11, 2026, 05_59_37 PM.png",
      "moodboards/Sangeet-Disco Shimmer/TSR51027.jpg",
      "moodboards/Sangeet-Disco Shimmer/TSR51040.jpg",
      "moodboards/Sangeet-Disco Shimmer/TSR51041.jpg",
      "moodboards/Sangeet-Disco Shimmer/TSR51043.jpg",
      "moodboards/Sangeet-Disco Shimmer/TSR51044.jpg",
      "moodboards/Sangeet-Disco Shimmer/TSR51049.jpg",
      "moodboards/Sangeet-Disco Shimmer/TSR51060.jpg",
      "moodboards/Sangeet-Disco Shimmer/TSR51154.jpg"
    ]
  },
  { 
    id: "sangeet-crimson-soiree", 
    number: "08", 
    category: "Sangeet", 
    name: "Crimson Soiree", 
    count: 15, 
    colors: ["#8B0000", "#4E0110", "#D4AF37", "#B76E79", "#000000"], 
    tags: ["Moulin Rouge Theme","Crimson Velvet","Dramatic Cabaret"], 
    perfectFor: ["Themed Sangeets","Bold Personalities","Nighttime Glamour"], 
    description: "A seductive fusion of Parisian cabaret and Indian tradition. Crimson velvets, dramatic feathers, and a Moulin Rouge-inspired glamour that sets the stage for an unforgettable night.",
    images: [
      "moodboards/Sangeet Option 2 - Crimson Soiree-Moulin Rouge/11a31f6f549eba7d5744a4553a32e0bc.jpg",
      "moodboards/Sangeet Option 2 - Crimson Soiree-Moulin Rouge/225c5a0e016b6ba67426bffd49fb7cd4.jpg",
      "moodboards/Sangeet Option 2 - Crimson Soiree-Moulin Rouge/255965e03eb7463f719142ea3deb10f3.jpg",
      "moodboards/Sangeet Option 2 - Crimson Soiree-Moulin Rouge/271b3b70c9f5930c6d2edef88f074e1c.jpg",
      "moodboards/Sangeet Option 2 - Crimson Soiree-Moulin Rouge/434cd9e19df5597e5fb6dbd355a693d1.jpg",
      "moodboards/Sangeet Option 2 - Crimson Soiree-Moulin Rouge/763dec3612df6e1b1264fd1ad6bc02fa.jpg",
      "moodboards/Sangeet Option 2 - Crimson Soiree-Moulin Rouge/8cae7e5ed03fc9e4bfc29bdba61f0ad2.jpg",
      "moodboards/Sangeet Option 2 - Crimson Soiree-Moulin Rouge/9a627d9aa093d492a4760142121e9a92.jpg",
      "moodboards/Sangeet Option 2 - Crimson Soiree-Moulin Rouge/Picture11.png",
      "moodboards/Sangeet Option 2 - Crimson Soiree-Moulin Rouge/Picture8.png",
      "moodboards/Sangeet Option 2 - Crimson Soiree-Moulin Rouge/Picture9.png",
      "moodboards/Sangeet Option 2 - Crimson Soiree-Moulin Rouge/aa567d8df33ac888bcb35636c1fefd24.jpg",
      "moodboards/Sangeet Option 2 - Crimson Soiree-Moulin Rouge/b693078994ebcd0ffadf8555bcc83ad1.jpg",
      "moodboards/Sangeet Option 2 - Crimson Soiree-Moulin Rouge/bd947706a36405f2062982d0756e2f7b.jpg",
      "moodboards/Sangeet Option 2 - Crimson Soiree-Moulin Rouge/e8a3a041b5bf29ebc7bfca40fd52e1f1.jpg"
    ]
  }
];

export default function MoodBoardsPage() {
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [copied, setCopied] = useState(false);
  const gridRef = useRef(null);
  const overlayRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    // Check for hash on load
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const board = moodBoards.find(b => b.id === hash);
      if (board) {
        setSelectedBoard(board);
        setShowOverlay(true);
      }
    }

    // Grid entrance animation
    const cards = gridRef.current.querySelectorAll(".mood-card");
    gsap.fromTo(cards, 
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: "power2.out" }
    );
  }, []);

  useEffect(() => {
    if (showOverlay) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.documentElement.classList.add("lenis-stopped");
      if (selectedBoard) window.location.hash = selectedBoard.id;
      
      // Overlay animation
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.2 });
      gsap.fromTo(panelRef.current, 
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "cubic-bezier(0.16,1,0.3,1)" }
      );
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
      document.documentElement.classList.remove("lenis-stopped");
      window.location.hash = "";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
      document.documentElement.classList.remove("lenis-stopped");
    };
  }, [showOverlay, selectedBoard]);

  const closeOverlay = () => {
    gsap.to(panelRef.current, { scale: 0.94, opacity: 0, duration: 0.25, ease: "power2.in" });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.25, onComplete: () => setShowOverlay(false) });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const MoodBoardCard = ({ board, index }) => {
    const isTall = (index % 2 === 0); // Alternate heights
    const isNudged = board.id === "wedding-emerald-eden" || board.id === "sangeet-crimson-soiree";

    return (
      <div 
        onClick={() => { setSelectedBoard(board); setShowOverlay(true); }}
        className={`mood-card group relative bg-[#1A1408] rounded-[12px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-[6px] hover:shadow-[0_24px_48px_rgba(0,0,0,0.15)] hover:ring-2 hover:ring-[#C9A234] ${isTall ? 'h-[480px]' : 'h-[360px]'}`}
        style={{ 
          marginTop: isNudged ? '-120px' : '0',
        }}
      >
        {/* 2x2 Image Grid */}
        <div className="grid grid-cols-2 grid-rows-2 h-full w-full">
          {board.images.map((img, i) => (
            <div key={i} className="relative overflow-hidden">
              <Image
                src={`/assets/photos/${img}`}
                alt={board.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                placeholder="blur"
                blurDataURL={blurDataUrls[`/assets/photos/${img}`] ?? "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAKAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUE/8QAIhAAAQQCAgMBAAAAAAAAAAAAAQIDBAUREiExQWH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Amae5qKlkke+VzWMYN3OcdgAPUkp1f8bX1PBHUQyQytyZI0tcPYjoqJ5e2NjnvcGtaCSSdgAOpUHbNW0Nn1RV1VVHmkqJXSPO5J8k7nf1JKD/2Q=="}
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
          ))}
        </div>

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1408]/75 via-transparent to-transparent pointer-events-none"></div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-left">
          <p className="font-body text-[#C9A234] text-[10px] uppercase tracking-[0.4em] mb-1">{board.category}</p>
          <h3 className="font-heading text-white text-[28px] leading-tight mb-1">{board.name}</h3>
          <p className="font-body text-white/55 text-[11px] tracking-wider">{board.count} ideas</p>
        </div>

        {/* Plus Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-white/12 backdrop-blur-sm border border-white/25 flex items-center justify-center text-white text-2xl font-light">
            +
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#FDFAF5] min-h-screen">
      
      {/* HERO SECTION */}
      <header className="pt-20 pb-12 px-6 text-center">
        <p className="font-body text-[#E87B3A] text-[11px] uppercase tracking-[0.4em] mb-3">Explore & Inspire</p>
        <h1 className="font-heading text-[#1A1408] text-5xl md:text-[56px] leading-tight mb-3">Wedding Mood Boards</h1>
        <p className="font-body text-[#9A8F7E] text-[15px] max-w-[600px] mx-auto mb-6">Eight curated aesthetics to spark your imagination.</p>
        <div className="w-12 h-[1px] bg-[#C9A234] mx-auto"></div>
      </header>

      {/* MASONRY GRID */}
      <main className="max-w-[1280px] mx-auto px-6 md:px-20 pb-24">
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {moodBoards.map((board, i) => (
            <MoodBoardCard key={board.id} board={board} index={i} />
          ))}
        </div>
      </main>

      {/* LIGHTBOX OVERLAY */}
      {showOverlay && selectedBoard && (
        <div 
          ref={overlayRef}
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-8 opacity-0 overscroll-none"
        >
          {/* Backdrop */}
          <div 
            onClick={closeOverlay}
            className="absolute inset-0 bg-[#0d0d08]/78 backdrop-blur-[4px] touch-none"
          />
          
          {/* Panel */}
          <div 
            ref={panelRef}
            className="relative w-[95vw] md:w-[90vw] h-[90vh] max-w-[1200px] bg-white rounded-[16px] overflow-y-auto md:overflow-hidden flex flex-col md:flex-row shadow-2xl overscroll-contain"
          >
            {/* LEFT COLUMN */}
            <div 
              className="w-full md:w-[38%] bg-[#FDFAF5] border-r border-[#EDE8DC] p-10 overflow-y-auto custom-scrollbar md:sticky md:top-0 h-auto md:h-full flex flex-col overscroll-contain"
              data-lenis-prevent
            >
              <p className="font-body text-[#E87B3A] text-[10px] uppercase tracking-[0.4em] mb-2">{selectedBoard.category}</p>
              <h2 className="font-heading text-[#1A1408] text-[44px] leading-[1.1] mb-4">{selectedBoard.name}</h2>
              <div className="w-12 h-[1px] bg-[#C9A234] mb-5"></div>
              <p className="font-body text-[#9A8F7E] text-[14px] leading-[1.75] mb-7 max-w-[320px] font-light">
                {selectedBoard.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedBoard.tags.map((tag, i) => (
                  <span key={i} className="border border-[#EDE8DC] rounded-full px-[14px] py-[6px] text-[#9A8F7E] text-[11px] font-body">{tag}</span>
                ))}
              </div>

              {/* Color Palette */}
              <div className="mb-8">
                <p className="font-body text-[#9A8F7E] text-[10px] uppercase tracking-[0.3em] mb-3">Colour Palette</p>
                <div className="flex gap-2">
                  {selectedBoard.colors.map((color, i) => (
                    <div key={i} className="w-[28px] h-[28px] rounded-full shadow-sm" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>

              {/* Perfect For */}
              <div className="mb-10">
                <p className="font-body text-[#9A8F7E] text-[10px] uppercase tracking-[0.3em] mb-3">Perfect For</p>
                <div className="flex flex-wrap gap-2">
                  {selectedBoard.perfectFor.map((item, i) => (
                    <span key={i} className="border border-[#EDE8DC] rounded-full px-[14px] py-[6px] text-[#9A8F7E] text-[11px] font-body">{item}</span>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-auto pt-8 flex flex-col gap-3">
                <Link 
                  href="/contact" 
                  className="w-full bg-[#C9A234] text-white flex items-center justify-center h-[48px] rounded-[6px] text-[11px] uppercase tracking-[0.3em] font-body hover:bg-[#A8892F] transition-colors"
                >
                  Talk To A Planner
                </Link>
                <button className="w-full border border-[#C9A234] text-[#C9A234] flex items-center justify-center h-[48px] rounded-[6px] text-[11px] uppercase tracking-[0.3em] font-body hover:bg-[#C9A234]/5 transition-colors">
                  Save This Board
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN AREA */}
            <div className="w-full md:w-[62%] flex flex-col h-auto md:h-full bg-white overscroll-contain">
              {/* TOP BAR */}
              <div className="h-14 border-bottom border-[#EDE8DC] px-6 flex items-center justify-between shrink-0">
                <div className="text-[#9A8F7E] text-[11px] font-body">
                  Mood Boards &nbsp;→&nbsp; <span className="text-[#1A1408]">{selectedBoard.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={handleShare}
                    className="relative group p-2 text-[#9A8F7E] hover:text-[#1A1408] transition-colors"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                    {copied && (
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1A1408] text-white text-[10px] px-2 py-1 rounded">Copied!</span>
                    )}
                  </button>
                  <button 
                    onClick={closeOverlay}
                    className="p-2 text-[#9A8F7E] hover:text-[#1A1408] transition-colors text-2xl leading-none"
                  >
                    ×
                  </button>
                </div>
              </div>

              {/* SCROLLABLE GRID */}
              <div 
                className="flex-grow overflow-y-auto p-7 custom-scrollbar overscroll-contain"
                data-lenis-prevent
              >
                <div className="columns-2 gap-3 space-y-3">
                  {selectedBoard.images.map((img, i) => (
                    <div key={i} className="relative group rounded-[8px] overflow-hidden break-inside-avoid">
                      <Image
                        src={`/assets/photos/${img}`}
                        alt="Mood board detail"
                        width={400}
                        height={i % 2 === 0 ? 500 : 300}
                        sizes="(max-width: 768px) 50vw, 22vw"
                        className="w-full object-cover rounded-[8px] transition-all duration-500 blur-none hover:ring-1 hover:ring-[#C9A234]"
                      />
                      <div className="absolute top-3 right-3 w-7 h-7 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 translate-y-1 group-hover:translate-y-0">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C9A234" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
                      </div>
                    </div>
                  ))}
                </div>

                {/* YOU MIGHT ALSO LIKE */}
                <div className="mt-12 pt-8 border-t border-[#EDE8DC]">
                  <p className="font-body text-[#9A8F7E] text-[10px] uppercase tracking-[0.3em] mb-5">You Might Also Like</p>
                  <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                    {moodBoards.filter(b => b.id !== selectedBoard.id).slice(0, 4).map(board => (
                      <div 
                        key={board.id} 
                        onClick={() => setSelectedBoard(board)}
                        className="relative w-[180px] h-[120px] rounded-[8px] overflow-hidden shrink-0 cursor-pointer group"
                      >
                        <Image src={`/assets/photos/${board.images[0]}`} alt={board.name} fill sizes="180px" className="object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                        <p className="absolute bottom-3 left-3 font-heading text-white text-[16px] leading-tight">{board.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #FDFAF5; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #EDE8DC; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #C9A234/40; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
