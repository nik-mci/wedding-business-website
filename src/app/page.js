"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CircularGallery from "@/components/CircularGallery";
import HashtagGenerator from "@/components/HashtagGenerator";

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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: processRef.current,
          start: "top 70%",
        }
      });

      tl.to(".timeline-path", {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut"
      }, 0.2);

      const circles = processRef.current.querySelectorAll(".step-circle");
      const labels = processRef.current.querySelectorAll(".step-label");
      
      circles.forEach((c, i) => {
        tl.to(c, {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          onComplete: () => labels[i].classList.add("visible"),
        }, 0.4 + i * 0.35);
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
        <div 
          id="hero-bg" 
          className="absolute inset-[-10%] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/assets/photos/destination/TSR50334.jpg')" }}
        ></div>
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

      {/* HOW WE DO IT */}
      <section id="process" ref={processRef}>
        <p className="section-label reveal">Our Process</p>
        <h2 className="section-title reveal text-surface">How We Craft<br /><em className="italic">Your Day</em></h2>
        <div className="timeline reveal">
          <div className="timeline-track">
            <svg className="timeline-svg" viewBox="0 0 100 4" preserveAspectRatio="none">
              <line className="timeline-path" x1="4" y1="2" x2="96" y2="2" />
            </svg>
            <div className="timeline-steps">
              {[
                { num: "01", title: "Discovery", desc: "We listen to your vision, values & dreams for the day" },
                { num: "02", title: "Curation", desc: "We handpick venues, vendors & experiences worldwide" },
                { num: "03", title: "Design", desc: "Every detail is styled to reflect your story" },
                { num: "04", title: "Execution", desc: "Flawless orchestration on the day itself" },
                { num: "05", title: "Memories", desc: "We capture & preserve every magical moment" }
              ].map((step, i) => (
                <div key={i} className="timeline-step">
                  <div className="step-circle">{step.num}</div>
                  <div className="step-label">
                    <p className="step-title">{step.title}</p>
                    <p className="step-desc">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <p className="section-label reveal">What We Offer</p>
        <h2 className="section-title reveal">Our <em className="italic">Services</em></h2>
        <div className="services-grid">
          {[
            { num: "01", name: "Royal Palace Weddings", img: "destination/059A3564.jpg" },
            { num: "02", name: "Exotic Beach Weddings", img: "destination/TSR50499 (1).jpg" },
            { num: "03", name: "Full Planning & Curation", img: "couple-shots/059A4274.jpg" },
            { num: "04", name: "Décor & Cultural Artistry", img: "couple-shots/0G4A4577.jpg" },
            { num: "05", name: "Cinematic Photography", img: "couple-shots/TSR53127.jpg" },
            { num: "06", name: "Renewal of Vows", img: "destination/TSR50967.jpg" }
          ].map((service, i) => (
            <div key={i} className={`service-card reveal stagger-${i % 3 + 1}`}>
              <Image 
                src={`/assets/photos/${service.img}`} 
                alt={service.name} 
                fill 
                className="service-card-img"
              />
              <div className="service-info">
                <p className="service-number">{service.num}</p>
                <h3 className="service-name">{service.name}</h3>
              </div>
              <div className="service-overlay">
                <Link href="/services" className="service-cta">Explore</Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CIRCULAR MEMORY SPACE */}
      <section id="memory-space" className="bg-ink py-24">
        <div className="px-12 mb-12">
          <p className="section-label" style={{ color: "var(--color-gold)" }}>Portfolio</p>
          <h2 className="section-title text-surface">Our <em className="italic">Memory Space</em></h2>
        </div>
        <div className="h-[600px] w-full">
          <CircularGallery items={[
            { image: '/assets/photos/couple-shots/0G4A2282.jpg', text: 'Zara & Samar' },
            { image: '/assets/photos/destination/0G4A1341.jpg', text: 'Royal Palace' },
            { image: '/assets/photos/couple-shots/TSR51412.jpg', text: 'Ananya & Rohan' },
            { image: '/assets/photos/destination/TSR50501.jpg', text: 'Santorini' },
            { image: '/assets/photos/couple-shots/0G4A5379.jpg', text: 'Beach Bliss' },
            { image: '/assets/photos/destination/TSR50355.jpg', text: 'Tuscany' }
          ]} />
        </div>
        <div className="text-center mt-12">
          <Link href="/portfolio" className="btn-underline">View All Weddings &nbsp;→</Link>
        </div>
      </section>

      {/* HASHTAG GENERATOR */}
      <section id="hashtag" className="bg-bg py-24">
        <div className="px-12 mb-12">
          <p className="section-label">AI Tool</p>
          <h2 className="section-title">Wedding <em className="italic">Hashtag Generator</em></h2>
        </div>
        <div className="px-12">
          <HashtagGenerator />
        </div>
      </section>

      {/* IDEAS TEASER */}
      <section id="ideas">
        <div className="ideas-grid">
          <div className="reveal">
            <p className="section-label">Inspiration</p>
            <h2 className="section-title">Wedding<br /><em className="italic">Ideas & Moods</em></h2>
            <p className="ideas-body">From mandap silhouettes under Rajasthan skies to candlelit cliffside ceremonies in Santorini — explore our curated library of ideas, mood boards, and styling references.</p>
            <Link href="/ideas" className="btn-underline">Explore Ideas &nbsp;→</Link>
          </div>
          <div className="ideas-mosaic reveal">
            <div className="mosaic-card"><div className="mosaic-inner"><div className="mosaic-bg bg-ink/20 flex items-center justify-center h-full"><span className="mosaic-label">Mandap Design</span></div></div></div>
            <div className="mosaic-card"><div className="mosaic-inner"><div className="mosaic-bg bg-ink/30 flex items-center justify-center h-full"><span className="mosaic-label">Night Ceremony</span></div></div></div>
            <div className="mosaic-card"><div className="mosaic-inner"><div className="mosaic-bg bg-ink/40 flex items-center justify-center h-full"><span className="mosaic-label">Floral Arch</span></div></div></div>
            <div className="mosaic-card"><div className="mosaic-inner"><div className="mosaic-bg bg-ink/50 flex items-center justify-center h-full"><span className="mosaic-label">Bridal Look</span></div></div></div>
            <div className="mosaic-card col-span-2"><div className="mosaic-inner"><div className="mosaic-bg bg-ink/60 flex items-center justify-center h-full"><span className="mosaic-label">Reception Setup</span></div></div></div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials">
        <p className="section-label reveal">Love Stories</p>
        <h2 className="section-title reveal">What Our<br /><em className="italic">Couples Say</em></h2>
        <div className="overflow-hidden mt-0">
          <div className="testimonials-track">
            {[
              { quote: "Vows & Vedas turned our dream of a Rajasthan palace wedding into a breathtaking reality. Everything you have done for us is more like what we expect a family member to do.", author: "Zara & Samar", loc: "Udaipur Palace, India" },
              { quote: "Our wedding at the Devi Garh was an unforgettable experience. The hotel was absolutely stunning and the level of service was outstanding.", author: "Sonia & Manlio", loc: "Devi Garh, Rajasthan" },
              { quote: "Thank you and your team from the bottom of my heart for making my renewal of vows so magical and special. It was a dream come true!", author: "Cheryl", loc: "Goa, India" },
              { quote: "Professional, creative, warm. They handled everything — from our 500-guest baraat to the intimate mehendi evening.", author: "Ashira & Junak", loc: "Tuscany, Italy" },
              // Duplicate for infinite scroll
              { quote: "Vows & Vedas turned our dream of a Rajasthan palace wedding into a breathtaking reality. Everything you have done for us is more like what we expect a family member to do.", author: "Zara & Samar", loc: "Udaipur Palace, India" },
              { quote: "Our wedding at the Devi Garh was an unforgettable experience. The hotel was absolutely stunning and the level of service was outstanding.", author: "Sonia & Manlio", loc: "Devi Garh, Rajasthan" },
              { quote: "Thank you and your team from the bottom of my heart for making my renewal of vows so magical and special. It was a dream come true!", author: "Cheryl", loc: "Goa, India" },
              { quote: "Professional, creative, warm. They handled everything — from our 500-guest baraat to the intimate mehendi evening.", author: "Ashira & Junak", loc: "Tuscany, Italy" }
            ].map((testi, i) => (
              <div key={i} className="testi-card">
                <div className="testi-stars">★★★★★</div>
                <p className="testi-quote">"{testi.quote}"</p>
                <p className="testi-author">{testi.author}</p>
                <p className="testi-location">{testi.loc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="final-cta">
        <div id="cta-bg" className="absolute inset-[-10%] bg-cover bg-center filter brightness-[0.3] saturate-[0.5]" style={{ backgroundImage: "url('/assets/photos/destination/TSR50355.jpg')" }}></div>
        <p className="section-label reveal relative z-2" style={{ color: "var(--color-gold)" }}>Your Story Awaits</p>
        <h2 className="section-title reveal text-surface relative z-2">Begin Your<br /><em className="italic">Journey With Us</em></h2>
        <p className="subtitle reveal relative z-2 text-surface/60 text-sm tracking-widest mb-12 uppercase">Let's craft the wedding you've always envisioned.</p>
        <Link href="/contact" className="btn-gold btn-pulse reveal relative z-2">Start Planning →</Link>
      </section>
    </div>
  );
}
