"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import GoldDivider from "@/components/GoldDivider";

const INCLUSIONS = [
  "Venue sourcing and selection",
  "All vendor negotiations",
  "Contract management",
  "Detailed design conceptualisation",
  "Guest management support",
  "Multiple planning meetings",
  "Site visits",
  "Post-wedding vendor settlements",
];

export default function FAQPage() {
  const [openItems, setOpenItems] = useState({});

  const faqData = [
    { q: "What makes Vows & Vedas different from other wedding planners?", a: "We combine deep cultural knowledge with an international design sensibility — and we treat each wedding as a one-of-a-kind story. Every detail is intentional, every vendor is trusted, and every couple feels genuinely cared for from the first call to the final farewell." },
    { q: "How early should we book?", a: "For destination weddings, we recommend booking 12–18 months in advance to secure your ideal venue and dates. For local weddings, 6–12 months is usually sufficient. That said, we occasionally accommodate shorter timelines — reach out and we'll see what's possible." },
    { q: "Do you only plan Indian weddings?", a: "Not at all. While our roots are in South Asian traditions, we plan multicultural, fusion, and inter-faith weddings of all kinds. We've celebrated Hindu, Muslim, Sikh, Christian, civil, and bespoke secular ceremonies across the world." },
    { q: "Will we have a single point of contact?", a: "Yes. Every couple is assigned a dedicated wedding manager who becomes your single point of contact throughout the entire journey — from initial vision call to post-wedding wrap-up. You'll never feel passed around." },
    {
      id: "package-inclusions",
      q: "What's included in your planning packages?",
      aJsx: (
        <div>
          <p className="mb-4">Both our Full Planning and Full Luxury / Destination Planning packages include end-to-end support from scratch:</p>
          <ul className="space-y-2 mb-6">
            {INCLUSIONS.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#C9A234] shrink-0" />
                {item}
              </li>
            ))}
          </ul>
          <p>For the Luxury &amp; Destination package, all inclusions remain the same — what changes is the scale of execution, the level of detailing, personalisation, and the ratio of our team to your guests.</p>
        </div>
      ),
    },
  ];

  const toggleItem = (itemIndex) => {
    setOpenItems(prev => ({
      ...prev,
      [itemIndex]: !prev[itemIndex]
    }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

    if (window.location.hash === '#package-inclusions') {
      const idx = faqData.findIndex(item => item.id === 'package-inclusions');
      if (idx !== -1) {
        setOpenItems({ [idx]: true });
        setTimeout(() => {
          document.getElementById('package-inclusions')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 400);
      }
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-bg min-h-screen">
      {/* PAGE HERO */}
      <div className="page-hero">
        <div 
          className="page-hero-bg" 
          style={{ backgroundImage: "url('/assets/photos/couple-shots/TSR53178.jpg')", backgroundPosition: "center 40%" }}
        ></div>
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <GoldDivider darkBg className="mb-4" />
          <p className="page-hero-eyebrow">Everything You Need to Know</p>
          <h1 className="page-hero-title">Frequently Asked<br /><em className="italic">Questions</em></h1>
          <GoldDivider darkBg flip className="mt-4" />
        </div>
      </div>

      <section className="py-24 px-12 max-w-[1000px] mx-auto">
        <div className="faq-group">
          {faqData.map((item, i) => {
            const isOpen = !!openItems[i];
            return (
              <div key={i} id={item.id || undefined} className={`faq-item border-b border-ink/5 ${isOpen ? 'open' : ''}`}>
                <button
                  className="faq-question w-full flex justify-between items-center py-7 text-left cursor-none group"
                  onClick={() => toggleItem(i)}
                >
                  <h3 className={`font-heading text-2xl font-normal leading-tight flex-1 pr-8 transition-colors duration-300 ${isOpen ? 'text-gold' : 'text-ink group-hover:text-gold'}`}>{item.q}</h3>
                  <span className={`faq-icon w-8 h-8 border border-ink/15 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-400 text-base font-light ${isOpen ? 'rotate-45 border-gold bg-gold text-surface' : 'text-muted group-hover:border-gold'}`}>+</span>
                </button>
                <div
                  className="faq-answer overflow-hidden transition-all duration-400 ease-custom relative"
                  style={{ height: isOpen ? 'auto' : '0px' }}
                >
                  <div className={`absolute left-0 top-0 w-[2px] bg-gold transition-all duration-400 delay-100 ${isOpen ? 'h-full' : 'h-0'}`}></div>
                  <div className="faq-answer-inner pl-6 pb-7 text-[13px] leading-[2] text-muted font-light">
                    {item.aJsx || item.a}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section id="faq-cta" className="bg-ink py-24 px-12 text-center">
        <p className="section-label reveal text-gold">Still Have Questions?</p>
        <h2 className="section-title reveal text-surface">Let's <em className="italic">Talk</em></h2>
        <p className="reveal text-surface/60 text-[13px] font-light mb-10 max-w-[440px] mx-auto leading-[2]">Our team is happy to answer anything. Reach out directly or start a conversation with our assistant.</p>
        <div className="reveal flex gap-5 justify-center flex-wrap">
          <Link href="/contact" className="btn-gold">Contact Us</Link>
          <button onClick={() => window.toggleChat && window.toggleChat()} className="btn-ghost light">Chat With Us</button>
        </div>
      </section>

    </div>
  );
}
