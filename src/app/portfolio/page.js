"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { getBlurProps } from "@/lib/blurDataUrls";
import GoldDivider from "@/components/GoldDivider";
import gsap from "gsap";

const galleryImages = [
  { id: 1, src: "couple-shots/0G4A5379.jpg", ratio: "4 / 5" },
  { id: 2, src: "moodboards/Wedding-Royal Indian/059A6704.jpg", ratio: "3 / 4" },
  { id: 3, src: "moodboards/Mehendi-Tangerine Tales/TSR50228.jpg", ratio: "5 / 4" },
  { id: 4, src: "services/decoration/mandap_decor.jpg", ratio: "4 / 5" },
  { id: 5, src: "moodboards/Haldi-Citrus Bloom/059A5790.jpg", ratio: "3 / 4" },
  { id: 6, src: "couple-shots/059A3486.jpg", ratio: "4 / 5" },
  { id: 7, src: "moodboards/Sangeet-Disco Shimmer/TSR51040.jpg", ratio: "5 / 4" },
  { id: 8, src: "moodboards/Wedding Option 2 - Emerald Eden/057eead1696fe154a4fc816f96cb5e32.jpg", ratio: "3 / 4" },
  { id: 9, src: "services/decoration/haldi_flowers_decor.jpg", ratio: "4 / 5" },
  { id: 10, src: "couple-shots/0G4A1676.jpg", ratio: "3 / 4" },
  { id: 11, src: "moodboards/Wedding Option 3 - Haveli Nights/4193e81865b32695fde1acb84855055d.jpg", ratio: "5 / 4" },
  { id: 12, src: "moodboards/Painted Gardens /08d5262255022083a0542b1e0c902b0f.jpg", ratio: "4 / 5" },
  { id: 13, src: "moodboards/Haldi - Rangon Ki Rasleela/3058732cb7189793a7c740e9dab4323b.jpg", ratio: "3 / 4" },
  { id: 14, src: "couple-shots/TSR53178.jpg", ratio: "4 / 5" },
  { id: 15, src: "services/decoration/sangeet_decoration.jpg", ratio: "5 / 4" },
  { id: 16, src: "moodboards/Mehendi Option 2 - Tropical Rhapsody/328ca19201f34bd31ee36c23f9b3f34a.jpg", ratio: "3 / 4" },
  { id: 17, src: "moodboards/Wedding-Royal Indian/059A6996.jpg", ratio: "4 / 5" },
  { id: 18, src: "couple-shots/0G4A2084.jpg", ratio: "5 / 4" },
  { id: 19, src: "moodboards/Sangeet Option 2 - Crimson Soiree-Moulin Rouge/225c5a0e016b6ba67426bffd49fb7cd4.jpg", ratio: "3 / 4" },
  { id: 20, src: "services/decoration/cocktail_decor.jpg", ratio: "4 / 5" },
  { id: 21, src: "moodboards/Haldi Option 2-Royal Boho/53a84bd999256536b176d705ed6fe6b3.jpg", ratio: "5 / 4" },
  { id: 22, src: "couple-shots/TSR53067.jpg", ratio: "3 / 4" },
  { id: 23, src: "moodboards/Wedding Option 2 - Emerald Eden/48f1dd4e3cf859f45a026da3aab8cce5.jpg", ratio: "4 / 5" },
  { id: 24, src: "moodboards/Mehendi-Tangerine Tales/059A3557.jpg", ratio: "5 / 4" },
  { id: 25, src: "services/decoration/printables1.jpg", ratio: "3 / 4" },
  { id: 26, src: "moodboards/Wedding-Royal Indian/0G4A5285.jpg", ratio: "4 / 5" },
  { id: 27, src: "couple-shots/0G4A4811.jpg", ratio: "3 / 4" },
  { id: 28, src: "moodboards/Haldi-Citrus Bloom/059A5846.jpg", ratio: "5 / 4" },
  { id: 29, src: "moodboards/Sangeet-Disco Shimmer/0G4A2327.jpg", ratio: "4 / 5" },
  { id: 30, src: "services/entertainment/performances.jpg", ratio: "5 / 4" },
  { id: 31, src: "moodboards/Wedding Option 3 - Haveli Nights/83c9bf1b2b9bd012656f78eba9b41a0a.jpg", ratio: "3 / 4" },
  { id: 32, src: "couple-shots/059A4274.jpg", ratio: "4 / 5" },
  { id: 33, src: "moodboards/Painted Gardens /6bdd8cbef1397d65444972fb30f74e48.jpg", ratio: "5 / 4" },
  { id: 34, src: "services/decoration/059A4328.jpg", ratio: "3 / 4" },
  { id: 35, src: "moodboards/Mehendi-Tangerine Tales/0G4A1965.jpg", ratio: "4 / 5" },
  { id: 36, src: "moodboards/Wedding-Royal Indian/TSR53220.jpg", ratio: "5 / 4" },
  { id: 37, src: "couple-shots/TSR51412.jpg", ratio: "3 / 4" },
  { id: 38, src: "moodboards/Haldi - Rangon Ki Rasleela/c385f637fb0673f8d93939e6723fc1ff.jpg", ratio: "4 / 5" },
  { id: 39, src: "services/decoration/e-invites and stationary.JPG", ratio: "5 / 4" },
  { id: 40, src: "moodboards/Wedding Option 2 - Emerald Eden/fd523b6483fef4a1bfa2a2b028651ccf.jpg", ratio: "3 / 4" },
  { id: 41, src: "moodboards/Sangeet Option 2 - Crimson Soiree-Moulin Rouge/aa567d8df33ac888bcb35636c1fefd24.jpg", ratio: "4 / 5" },
  { id: 42, src: "services/decoration/decor1.jpg", ratio: "5 / 4" },
];

export default function PortfolioPage() {
  const [selectedImage, setSelectedImage] = useState(null);

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
  }, []);

  return (
    <div className="bg-bg min-h-screen">
      {/* PAGE HERO */}
      <div className="page-hero">
        <div 
          className="page-hero-bg" 
          style={{ backgroundImage: "url('/assets/photos/couple-shots/059A4274.jpg')", backgroundPosition: "center 20%" }}
        ></div>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <GoldDivider darkBg className="mb-4" />
          <p className="page-hero-eyebrow">Memory Space</p>
          <h1 className="page-hero-title">Captured <em className="italic">Celebrations</em></h1>
          <GoldDivider darkBg flip className="mt-4" />
        </div>
      </div>

      <section style={{ paddingTop: '64px' }}>

        <div className="wedding-grid">
          {galleryImages.map((image) => (
            <div 
              key={image.id}
              className="wedding-item reveal cursor-none mb-2" 
              onClick={() => setSelectedImage(image)}
            >
              <div className="wedding-item-inner relative overflow-hidden group" style={{ aspectRatio: image.ratio }}>
                <Image
                  src={`/assets/photos/${image.src}`}
                  alt="Wedding gallery"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  {...getBlurProps(`/assets/photos/${image.src}`)}
                  className="wed-photo object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODAL */}
      {selectedImage && (
        <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-black/85 transition-opacity duration-400" 
            onClick={() => setSelectedImage(null)}
          ></div>
          <div className="relative z-[5001] w-[min(1120px,92vw)] h-[min(82vh,780px)] bg-black">
            <button 
              className="absolute top-4 right-4 z-[2] w-11 h-11 bg-surface text-ink flex items-center justify-center hover:bg-gold hover:text-surface transition-colors cursor-none" 
              onClick={() => setSelectedImage(null)}
              aria-label="Close gallery image"
            >
              <X size={20} strokeWidth={1.8} />
            </button>
            <div className="relative h-full overflow-hidden">
              <Image
                src={`/assets/photos/${selectedImage.src}`}
                alt="Wedding gallery"
                fill
                sizes="92vw"
                {...getBlurProps(`/assets/photos/${selectedImage.src}`)}
                className="modal-hero-img object-contain"
              />
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .wedding-grid { columns: 3; column-gap: 8px; padding: 0 48px; }
        .wedding-item { break-inside: avoid; }
        .wedding-item-inner { background: rgba(26, 20, 8, 0.08); }

        @media (max-width: 1024px) {
          .wedding-grid { columns: 2; }
        }
        @media (max-width: 640px) {
          .wedding-grid { columns: 2; column-gap: 6px; padding: 0 16px; }
          .wedding-item { margin-bottom: 6px; }
        }
      `}</style>
    </div>
  );
}
