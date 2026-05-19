"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import GoldDivider from "@/components/GoldDivider";
import gsap from "gsap";

export default function FAQPage() {
  const [activeGroup, setActiveGroup] = useState("general");
  const [openItems, setOpenItems] = useState({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabsRef = useRef([]);

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

  useEffect(() => {
    // Position indicator
    const activeIndex = ["general", "planning", "destinations", "pricing"].indexOf(activeGroup);
    const activeTab = tabsRef.current[activeIndex];
    if (activeTab) {
      setIndicatorStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth
      });
    }
  }, [activeGroup]);

  const toggleItem = (groupId, itemIndex) => {
    setOpenItems(prev => ({
      ...prev,
      [`${groupId}-${itemIndex}`]: !prev[`${groupId}-${itemIndex}`]
    }));
  };

  const faqData = {
    general: [
      { q: "What makes Vows & Vedas different from other wedding planners?", a: "We combine deep cultural knowledge with an international design sensibility — and we treat each wedding as a one-of-a-kind story. Every detail is intentional, every vendor is trusted, and every couple feels genuinely cared for from the first call to the final farewell." },
      { q: "How early should we book?", a: "For destination weddings, we recommend booking 12–18 months in advance to secure your ideal venue and dates. For local weddings, 6–12 months is usually sufficient. That said, we occasionally accommodate shorter timelines — reach out and we'll see what's possible." },
      { q: "Do you only plan Indian weddings?", a: "Not at all. While our roots are in South Asian traditions, we plan multicultural, fusion, and inter-faith weddings of all kinds. We've celebrated Hindu, Muslim, Sikh, Christian, civil, and bespoke secular ceremonies across the world." },
      { q: "Will we have a single point of contact?", a: "Yes. Every couple is assigned a dedicated wedding manager who becomes your single point of contact throughout the entire journey — from initial vision call to post-wedding wrap-up. You'll never feel passed around." }
    ],
    planning: [
      { q: "What does the planning process look like?", a: "We begin with a discovery call to understand your vision, style, and priorities. From there, we build a tailored planning timeline, curate venue and vendor shortlists, and guide you through every decision — always at a pace that suits you." },
      { q: "What is included in your planning services?", a: "Our comprehensive services cover everything needed to bring your vision to life. This includes venue selection, bespoke floral and light décor, exquisite catering, cinematic photography, cultural entertainment, and even bridal trousseau styling with professional designers." },
      { q: "How do you manage the planning timeline?", a: "We provide a comprehensive wedding calendar in advance. This tailored calendar details all important milestones and gives you complete clarity to plan your celebration exactly the way you desire without any last-minute stress." },
      { q: "Do you arrange the priest or officiant?", a: "Yes, an officiant is an integral part of the ceremony. Whether you require a traditional Hindu priest, a Catholic pastor, or an officiant for a secular celebration, we will arrange the perfect person to honor your traditions." },
      { q: "Can we choose our own vendors, or do you have a preferred list?", a: "Both. We have a trusted global vendor network built over a decade — photographers, florists, caterers, musicians — and we'll always start with strong recommendations. That said, if you have vendors in mind or want to bring a specific photographer, we're completely flexible." },
      { q: "How involved will you be on the wedding day itself?", a: "Completely. On your wedding day, our on-site team arrives early, manages every vendor, handles every timeline, and troubleshoots anything so that you and your family can be fully present. You won't need to think about a single logistical detail." }
    ],
    destinations: [
      { q: "How does venue selection work?", a: "The venue provides the canvas for your theme. Whether you envision the scenic environs of Kerala, the royal palace settings of Rajasthan, or the pristine beaches of Goa, we will scout and secure the most perfect location for your celebration." },
      { q: "Do you handle local transportation and grand entrances?", a: "Absolutely. We arrange seamless transportation, from receiving guests at the airport to all transfers during their stay. For your grand entrance, we can even provide a luxury limousine complete with elegant floral decorations." },
      { q: "Do you handle guest travel and accommodation?", a: "Yes. For destination weddings, we can coordinate room blocks, airport transfers, welcome hampers, and group excursions for your guests. We work with trusted travel partners to ensure every guest has a seamless experience from arrival to departure." },
      { q: "What destinations do you work in?", a: "We have active vendor partnerships in 40+ destinations — including Rajasthan, Goa, Kerala, Rishikesh, and Mussoorie in India, and internationally in Santorini, Tuscany, Bali, Maldives, Sri Lanka, France, and more. If you have a dream location not on this list, we'll make it work." },
      { q: "Are legal ceremonies possible abroad?", a: "Absolutely. We have experience navigating legal marriage requirements in multiple countries. Alternatively, many couples do a legal registration at home and hold their celebration abroad — we'll guide you through what makes most sense for your situation." }
    ],
    pricing: [
      { q: "What is your starting price?", a: "Our Pearl package starts from ₹8,00,000 for a single-day ceremony with essential services. Our Gold package (3-day multi-event) starts from ₹18,00,000. Bespoke destination weddings are fully tailored — we'll build a custom proposal based on your vision and guest count." },
      { q: "Is a deposit required to book?", a: "Yes — we require a 25% retainer to secure your date. The remaining balance is structured in milestones tied to planning checkpoints. We work transparently on all financials and provide a full budget tracker throughout your planning journey." },
      { q: "Are vendor costs included in your fee?", a: "Our planning fee covers our team's services. Vendor costs — venue hire, catering, photography, florals, etc. — are separate and managed transparently through a shared budget. We negotiate on your behalf and always seek the best value without compromising quality." }
    ]
  };

  return (
    <div className="bg-bg min-h-screen">
      {/* PAGE HERO */}
      <div className="page-hero">
        <div 
          className="page-hero-bg" 
          style={{ backgroundImage: "url('/assets/photos/destination/TSR50355.jpg')", backgroundPosition: "center 40%" }}
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
        <div className="faq-tabs relative mb-16 border-b border-ink/10 flex gap-0">
          {Object.keys(faqData).map((group, i) => (
            <button 
              key={group}
              ref={el => tabsRef.current[i] = el}
              className={`faq-tab px-8 py-4 text-[11px] tracking-[0.2em] uppercase font-medium cursor-none transition-colors duration-300 relative ${activeGroup === group ? 'text-ink' : 'text-muted'}`} 
              onClick={() => setActiveGroup(group)}
            >
              {group}
            </button>
          ))}
          <div 
            className="tab-indicator absolute bottom-[-1px] h-[2px] bg-gold transition-all duration-400 ease-custom"
            style={indicatorStyle}
          ></div>
        </div>

        {/* ACCORDION GROUPS */}
        {Object.entries(faqData).map(([groupId, questions]) => (
          <div key={groupId} className={`faq-group reveal ${activeGroup === groupId ? 'block' : 'hidden'}`}>
            {questions.map((item, i) => {
              const isOpen = !!openItems[`${groupId}-${i}`];
              return (
                <div key={i} className={`faq-item border-b border-ink/5 ${isOpen ? 'open' : ''}`}>
                  <button 
                    className="faq-question w-full flex justify-between items-center py-7 text-left cursor-none group"
                    onClick={() => toggleItem(groupId, i)}
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
                      {item.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
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

      <style jsx>{`
        .tab-indicator { transition: left .4s cubic-bezier(0.25, 0.46, 0.45, 0.94), width .4s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
      `}</style>
    </div>
  );
}
