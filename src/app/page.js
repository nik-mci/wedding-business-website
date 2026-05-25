"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircularGallery from "@/components/CircularGallery";
import HashtagGeneratorPopup from "@/components/HashtagGeneratorPopup";
import GoldDivider from "@/components/GoldDivider";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroRef = useRef(null);
  const processRef = useRef(null);

  useEffect(() => {
    // ── HERO ANIMATION ──
    const ctx = gsap.context(() => {
      // Parallax hero bg
      gsap.to("#hero-bg", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });

      // Word by word reveal
      gsap.to(".hero-title .word", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: "power2.out",
        delay: 1.4,
      });

      // Fade up elements
      gsap.to(".hero-eyebrow, .hero-subtitle, .hero-ctas, .hero-scroll", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 2.8,
      });

      // Timeline animation
      let mm = gsap.matchMedia();
      
      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 60%",
          }
        });

        tl.to(".timeline-line-progress", {
          width: "100%",
          duration: 2,
          ease: "power2.inOut"
        }, 0);

        const steps = processRef.current.querySelectorAll(".timeline-step-horizontal");
        
        steps.forEach((step, i) => {
          const dot = step.querySelector(".step-dot");
          const content = step.querySelector(".step-content");
          
          const delay = (i / Math.max(1, steps.length - 1)) * 1.6; 
          
          tl.to(dot, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(2)"
          }, delay);
          
          tl.to(content, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power2.out"
          }, delay + 0.1);
        });
      });

      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: processRef.current,
            start: "top 70%",
          }
        });

        tl.to(".timeline-line-vertical-progress", {
          height: "100%",
          duration: 2,
          ease: "power2.inOut"
        }, 0);

        const steps = processRef.current.querySelectorAll(".timeline-step-vertical");
        steps.forEach((step, i) => {
          const dot = step.querySelector(".step-dot-vert");
          const content = step.querySelector(".step-content-vert");
          
          const delay = (i / Math.max(1, steps.length - 1)) * 1.6;
          
          tl.to(dot, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, delay);
          tl.to(content, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out" }, delay + 0.1);
        });
      });
    }, [heroRef, processRef]);

    // ── REVEAL SYSTEM ──
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

    // ── FINAL CTA PARALLAX ──
    gsap.to("#cta-bg", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: "#final-cta",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden">

      {/* HERO SECTION */}
      <section id="hero" ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        <video 
          id="hero-bg"
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/photos/hero-video.mp4" type="video/mp4" />
        </video>
        <div id="hero-overlay" className="absolute inset-0 bg-gradient-to-b from-ink/45 via-ink/20 to-ink/60"></div>
        <div id="hero-content" className="relative z-2 text-center px-6">
          <p className="hero-eyebrow opacity-0 translate-y-6">Luxury Destination Weddings</p>
          <h1 className="hero-title">
            <span className="word italic mr-4">Where</span>
            <span className="word italic mr-4">Every</span>
            <span className="word mr-4">Vow</span><br />
            <span className="word italic mr-4">Becomes</span>
            <span className="word mr-4">a</span>
            <span className="word">Story</span>
          </h1>
          <p className="hero-subtitle opacity-0 translate-y-6">Crafting timeless ceremonies across the world's most extraordinary destinations</p>
          <div className="hero-ctas opacity-0 translate-y-6">
            <Link href="/contact" className="btn-gold mr-4">Plan Your Wedding</Link>
            <Link href="/portfolio" className="btn-ghost light">View Our Work</Link>
          </div>
        </div>
        <div className="hero-scroll opacity-0 translate-y-6">
          <div className="scroll-line"></div>
          <span>Scroll</span>
        </div>
      </section>

      {/* ORNAMENTAL DIVIDER */}
      <GoldDivider variant="section" />

      {/* HOW WE DO IT */}
      <section id="our-process" ref={processRef} className="overflow-hidden bg-bg pt-6 pb-8">
        <div className="flex flex-col items-center text-center px-12">
          <GoldDivider className="mb-4 reveal" />
          <p className="section-label reveal">Our Process</p>
          <h2 className="section-title reveal text-ink">How We Craft <em className="italic">Your Day</em></h2>
        </div>

        {/* DESKTOP HORIZONTAL TIMELINE */}
        <div className="hidden md:flex relative w-full h-[220px] mt-4 items-center">
          {/* Connector Line Progress */}
          <div className="absolute top-1/2 left-[8%] right-[8%] h-[1px] -translate-y-1/2 z-0 pointer-events-none">
            <div className="timeline-line-progress absolute top-0 left-0 h-[1px] bg-gold origin-left opacity-60" style={{ width: '0%' }}></div>
          </div>
          
          <div className="relative z-10 flex items-center justify-between w-[92%] mx-auto h-full">
            {[
              { num: "01", title: "Discovery", desc: "We listen to your vision, values & dreams for the day" },
              { num: "02", title: "Curation", desc: "We handpick venues, vendors & experiences worldwide" },
              { num: "03", title: "Design", desc: "Every detail is styled to reflect your story" },
              { num: "04", title: "Execution", desc: "Flawless orchestration on the day itself" },
              { num: "05", title: "Memories", desc: "We capture & preserve every magical moment" }
            ].map((step, i) => {
              const isOdd = i % 2 === 0;
              return (
                <div key={i} className="contents">
                  <div className="timeline-step-horizontal flex flex-col items-center justify-center relative w-[18%]">
                    {isOdd ? (
                      <>
                        <div className="step-content absolute bottom-[calc(50%+28px)] flex flex-col items-center text-center w-full translate-y-4 opacity-0">
                          <p className="font-body uppercase text-ink text-[11px] tracking-widest mb-2 font-medium">{step.title}</p>
                          <p className="font-body font-light text-muted text-[10px] leading-[1.6] px-2 max-w-[200px] mx-auto whitespace-normal break-keep">{step.desc}</p>
                        </div>
                        <div className="step-dot relative z-10 opacity-0 scale-0 flex items-center justify-center w-[44px] h-[44px] text-gold bg-bg">
                          <svg width="44" height="44" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                            <path d="M 28 3 L 53 28 L 28 53 L 3 28 Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M 28 9 L 47 28 L 28 47 L 9 28 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
                            <circle cx="3" cy="28" r="2" fill="currentColor" />
                            <circle cx="53" cy="28" r="2" fill="currentColor" />
                          </svg>
                          <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "16px", color: "#C8A84B" }} className="relative z-10 bg-bg px-1">{step.num}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="step-dot relative z-10 opacity-0 scale-0 flex items-center justify-center w-[44px] h-[44px] text-gold bg-bg">
                          <svg width="44" height="44" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                            <path d="M 28 3 L 53 28 L 28 53 L 3 28 Z" stroke="currentColor" strokeWidth="1.5" />
                            <path d="M 28 9 L 47 28 L 28 47 L 9 28 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
                            <circle cx="3" cy="28" r="2" fill="currentColor" />
                            <circle cx="53" cy="28" r="2" fill="currentColor" />
                          </svg>
                          <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "16px", color: "#C8A84B" }} className="relative z-10 bg-bg px-1">{step.num}</span>
                        </div>
                        <div className="step-content absolute top-[calc(50%+28px)] flex flex-col items-center text-center w-full -translate-y-4 opacity-0">
                          <p className="font-body uppercase text-ink text-[11px] tracking-widest mb-2 font-medium">{step.title}</p>
                          <p className="font-body font-light text-muted text-[10px] leading-[1.6] px-2 max-w-[200px] mx-auto whitespace-normal break-keep">{step.desc}</p>
                        </div>
                      </>
                    )}
                  </div>
                  {i < 4 && (
                    <div className="flex-1 flex justify-center items-center z-0">
                      <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70" style={{ color: "#C8A84B" }}>
                        <path d="M 0 15 L 45 15 C 55 15, 55 5, 60 5 C 65 5, 65 15, 75 15 L 120 15" stroke="currentColor" strokeWidth="1.2" fill="none" />
                        <circle cx="60" cy="5" r="1.5" fill="currentColor" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* MOBILE VERTICAL TIMELINE */}
        <div className="md:hidden relative w-full mt-12 pl-4 pb-8">
          <div className="absolute top-6 bottom-6 left-[40px] w-[1px] z-0 pointer-events-none">
            <div className="timeline-line-vertical-progress absolute top-0 left-0 w-[1px] bg-gold origin-top opacity-60" style={{ height: '0%' }}></div>
          </div>
          
          <div className="flex flex-col relative z-10">
            {[
              { num: "01", title: "Discovery", desc: "We listen to your vision, values & dreams for the day" },
              { num: "02", title: "Curation", desc: "We handpick venues, vendors & experiences worldwide" },
              { num: "03", title: "Design", desc: "Every detail is styled to reflect your story" },
              { num: "04", title: "Execution", desc: "Flawless orchestration on the day itself" },
              { num: "05", title: "Memories", desc: "We capture & preserve every magical moment" }
            ].map((step, i) => {
              return (
                <div key={i} className="contents">
                  <div className="timeline-step-vertical flex items-start relative min-h-[100px]">
                    <div className="step-dot-vert relative z-10 flex items-center justify-center w-[48px] h-[48px] shrink-0 text-gold bg-bg mt-[-4px] opacity-0 scale-0">
                      <svg width="48" height="48" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0">
                        <path d="M 28 3 L 53 28 L 28 53 L 3 28 Z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M 28 9 L 47 28 L 28 47 L 9 28 Z" stroke="currentColor" strokeWidth="0.8" opacity="0.6" />
                        <circle cx="3" cy="28" r="2" fill="currentColor" />
                        <circle cx="53" cy="28" r="2" fill="currentColor" />
                      </svg>
                      <span style={{ fontFamily: "Georgia, serif", fontStyle: "italic", fontSize: "14px", color: "#C8A84B" }} className="relative z-10 bg-bg px-1">{step.num}</span>
                    </div>
                    <div className="step-content-vert ml-6 flex flex-col opacity-0 -translate-x-4 pt-2">
                      <p className="font-body uppercase text-ink text-[13px] tracking-widest mb-1 font-medium">{step.title}</p>
                      <p className="font-body font-light text-muted text-[11px] leading-[1.6] max-w-[220px] whitespace-normal break-keep">{step.desc}</p>
                    </div>
                  </div>
                  {i < 4 && (
                    <div className="w-[48px] flex justify-center -my-2 z-0">
                      <svg width="30" height="60" viewBox="0 0 30 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-70" style={{ color: "#C8A84B" }}>
                        <path d="M 15 0 L 15 15 C 15 25, 5 25, 5 30 C 5 35, 15 35, 15 45 L 15 60" stroke="currentColor" strokeWidth="1.2" fill="none" />
                        <circle cx="5" cy="30" r="1.5" fill="currentColor" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* CIRCULAR MEMORY SPACE */}
      <section id="memory-space" className="bg-ink py-10">
        <div className="px-12 mb-6 flex flex-col items-center text-center">
          <GoldDivider darkBg className="mb-4 reveal" />
          <p className="section-label" style={{ color: "var(--color-gold)" }}>Portfolio</p>
          <h2 className="section-title text-surface">Our <em className="italic">Memory Space</em></h2>
          <GoldDivider darkBg flip className="mt-2 reveal" />
        </div>
        <div className="h-[600px] w-full">
          <CircularGallery items={[
            { image: '/assets/photos/couple-shots/0G4A2282.jpg', text: 'Manya & Siddhant' },
            { image: '/assets/photos/destination/0G4A1341.jpg', text: 'Royal Palace' },
            { image: '/assets/photos/couple-shots/0G4A5379.jpg', text: 'First Look Forever' },
            { image: '/assets/photos/services/mehendi.jpg', text: 'Mehendi Nights' },
            { image: '/assets/photos/services/decoration/pool_venue2.jpg', text: 'Pool Side Vows' },
            { image: '/assets/photos/couple-shots/059A3486.jpg', text: 'Courtyard Promises' }
          ]} />
        </div>
        <div className="text-center mt-10">
          <Link href="/portfolio" className="btn-underline">View All Weddings &nbsp;→</Link>
        </div>
      </section>


      {/* IDEAS TEASER */}
      <section id="ideas-moods" className="py-10 bg-bg">
        <div className="max-w-[1440px] mx-auto px-12 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="reveal">
            <GoldDivider className="mb-4" />
            <p className="section-label">Inspiration</p>
            <h2 className="section-title">Wedding<br /><em className="italic">Ideas & Moods</em></h2>
            <GoldDivider flip className="mb-6" />
            <p className="text-muted text-[13px] leading-[2] font-light mb-8 max-w-[480px]">
              From mandap silhouettes under Rajasthan skies to candlelit cliffside ceremonies in Santorini — explore our curated library of ideas, mood boards, and styling references.
            </p>
            <Link href="/moodboards" className="btn-gold">Explore All Moodboards &nbsp;→</Link>
          </div>
          <div className="flex flex-col items-center">
            <div className="ideas-mosaic reveal grid grid-cols-2 grid-rows-3 gap-2 h-[500px] w-full">
              <div className="mosaic-card row-span-2 relative overflow-hidden group">
                <Image src="/assets/photos/services/decoration/mandap_decor.jpg" alt="Mandap Design" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/10 transition-colors"></div>
                <div className="absolute bottom-4 left-4 z-2">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-surface/80 font-medium">Mandap Design</span>
                </div>
              </div>
              <div className="mosaic-card relative overflow-hidden group">
                <Image src="/assets/photos/services/decoration/sangeet_decoration.jpg" alt="Night Ceremony" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/10 transition-colors"></div>
                <div className="absolute bottom-4 left-4 z-2">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-surface/80 font-medium">Night Ceremony</span>
                </div>
              </div>
              <div className="mosaic-card relative overflow-hidden group">
                <Image src="/assets/photos/services/decoration/haldi_flowers_decor.jpg" alt="Floral Arch" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-ink/40 group-hover:bg-ink/10 transition-colors"></div>
                <div className="absolute bottom-4 left-4 z-2">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-surface/80 font-medium">Floral Arch</span>
                </div>
              </div>
              <div className="mosaic-card col-span-1 relative overflow-hidden group">
                <Image src="/assets/photos/couple-shots/TSR53127.jpg" alt="Bridal Look" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-ink/50 group-hover:bg-ink/10 transition-colors"></div>
                <div className="absolute bottom-4 left-4 z-2">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-surface/80 font-medium">Bridal Look</span>
                </div>
              </div>
              <div className="mosaic-card col-span-2 relative overflow-hidden group">
                <Image src="/assets/photos/couple-shots/059A3486.jpg" alt="Reception Setup" fill sizes="100vw" className="object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-ink/60 group-hover:bg-ink/10 transition-colors"></div>
                <div className="absolute bottom-4 left-4 z-2">
                  <span className="text-[9px] tracking-[0.3em] uppercase text-surface/80 font-medium">Reception Setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoldDivider variant="section" />

      {/* TESTIMONIALS */}
      <section id="couples-say" className="pt-4 pb-6">
        <div className="flex flex-col items-center text-center">
          <GoldDivider className="mb-4 reveal" />
          <p className="section-label reveal">Love Stories</p>
          <h2 className="section-title reveal">What Our <em className="italic">Couples Say</em></h2>
          <GoldDivider flip className="mt-2 mb-8 reveal" />
        </div>
        <div className="overflow-hidden mt-0">
          <div className="testimonials-track">
            {[
              { quote: "Vows & Vedas turned our dream of a Rajasthan palace wedding into a breathtaking reality. Everything you have done for us is more like what we expect a family member to do.", author: "Zara & Samar", loc: "Udaipur Palace, India" },
              { quote: "Our wedding at the Devi Garh was an unforgettable experience. The hotel was absolutely stunning and the level of service was outstanding.", author: "Sonia & Manlio", loc: "Devi Garh, Rajasthan" },
              { quote: "The entire wedding and organization was truly amazing! Our dream is to go back to Symphony Beach once again. We will recommend you everywhere we can.", author: "Tivadar & Orsi", loc: "Symphony Beach, Goa" },
              { quote: "The wedding was spectacular and everything I dreamed and more. Thank you and your team from the bottom of my heart for making my renewal of vows so magical and special.", author: "Cheryl", loc: "Rajasthan" },
              { quote: "We were really impressed that we managed to organize the entire three-day ceremony from so far away, in such detail. From the painstaking planning to the wonderful memories, the wedding was exceptional.", author: "The UK couple", loc: "Vijay & Team, India" },
              // Duplicate for infinite scroll
              { quote: "Vows & Vedas turned our dream of a Rajasthan palace wedding into a breathtaking reality. Everything you have done for us is more like what we expect a family member to do.", author: "Zara & Samar", loc: "Udaipur Palace, India" },
              { quote: "Our wedding at the Devi Garh was an unforgettable experience. The hotel was absolutely stunning and the level of service was outstanding.", author: "Sonia & Manlio", loc: "Devi Garh, Rajasthan" },
              { quote: "The entire wedding and organization was truly amazing! Our dream is to go back to Symphony Beach once again. We will recommend you everywhere we can.", author: "Tivadar & Orsi", loc: "Symphony Beach, Goa" },
              { quote: "The wedding was spectacular and everything I dreamed and more. Thank you and your team from the bottom of my heart for making my renewal of vows so magical and special.", author: "Cheryl", loc: "Rajasthan" },
              { quote: "We were really impressed that we managed to organize the entire three-day ceremony from so far away, in such detail. From the painstaking planning to the wonderful memories, the wedding was exceptional.", author: "The UK couple", loc: "Vijay & Team, India" }
            ].map((testi, i) => (
              <div key={i} className="testi-card">
                <svg width="180" height="22.5" viewBox="0 0 240 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-6 opacity-80" style={{ color: "var(--color-gold)" }}>
                  <circle cx="120" cy="15" r="5" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M 111 15 C 85 22, 50 8, 10 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <path d="M 129 15 C 155 22, 190 8, 230 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <circle cx="10" cy="15" r="2" fill="currentColor" />
                  <circle cx="230" cy="15" r="2" fill="currentColor" />
                  <path d="M 110 21 Q 120 28 130 21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <circle cx="120" cy="24.5" r="1.5" fill="currentColor" />
                  <path d="M 105 18 Q 110 18 112 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <path d="M 135 18 Q 130 18 128 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
                <div className="testi-stars">★★★★★</div>
                <p className="testi-quote">"{testi.quote}"</p>
                <p className="testi-author">{testi.author}</p>
                <p className="testi-location">{testi.loc}</p>
                <svg width="180" height="22.5" viewBox="0 0 240 30" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-6 opacity-80" style={{ color: "var(--color-gold)", transform: "scaleY(-1)" }}>
                  <circle cx="120" cy="15" r="5" stroke="currentColor" strokeWidth="2.5" />
                  <path d="M 111 15 C 85 22, 50 8, 10 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <path d="M 129 15 C 155 22, 190 8, 230 15" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <circle cx="10" cy="15" r="2" fill="currentColor" />
                  <circle cx="230" cy="15" r="2" fill="currentColor" />
                  <path d="M 110 21 Q 120 28 130 21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <circle cx="120" cy="24.5" r="1.5" fill="currentColor" />
                  <path d="M 105 18 Q 110 18 112 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                  <path d="M 135 18 Q 130 18 128 16" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldDivider variant="section" />

      {/* FINAL CTA */}
      <section id="final-cta" className="relative overflow-hidden">
        <div id="cta-bg" className="absolute inset-[-10%] bg-cover bg-center filter brightness-[0.3] saturate-[0.5]" style={{ backgroundImage: "url('/assets/photos/destination/TSR50355.jpg')" }}></div>
        <div className="relative z-[2] flex flex-col items-center text-center">
          <GoldDivider darkBg className="mb-4 reveal" />
          <p className="section-label reveal" style={{ color: "var(--color-gold)" }}>Your Story Awaits</p>
          <h2 className="section-title reveal text-gold">Begin Your <em className="italic">Journey With Us</em></h2>
          <GoldDivider darkBg flip className="mt-2 mb-8 reveal" />
          <p className="subtitle reveal text-surface/60 text-sm tracking-widest mb-6 uppercase">Let's craft the wedding you've always envisioned.</p>
          <Link href="/contact" className="btn-gold btn-pulse reveal">Start Planning →</Link>
        </div>
      </section>

      <HashtagGeneratorPopup />
    </div>
  );
}
