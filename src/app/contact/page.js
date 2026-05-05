"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import GoldDivider from "@/components/GoldDivider";
import CornerOrnament from "@/components/CornerOrnament";
import gsap from "gsap";

export default function ContactPage() {
  const [status, setStatus] = useState("idle"); // idle, loading, success

  useEffect(() => {
    // Parallax on image side
    const handleScroll = () => {
      const bg = document.getElementById('contact-img-bg');
      if (bg) bg.style.transform = `translateY(${window.scrollY * 0.15}px)`;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    }, 2000);
  };

  return (
    <div id="contact-layout" className="grid grid-cols-1 md:grid-cols-2 min-h-screen pt-20 md:pt-0">
      {/* FORM SIDE */}
      <div className="contact-form-side bg-surface p-12 md:p-24 flex flex-col justify-center border-r border-ink/5 relative">
        <CornerOrnament size={48} inset={16} opacity={0.35} />
        <GoldDivider className="mb-6 opacity-0 translate-y-5 animate-fadeUp" />
        <p className="form-eyebrow text-[10px] tracking-[0.5em] uppercase text-gold mb-4 font-medium opacity-0 translate-y-5 animate-fadeUp">Let's Begin</p>
        <h1 className="form-title font-heading text-ink text-5xl md:text-7xl font-light leading-[1.1] mb-12 opacity-0 translate-y-5 animate-fadeUp-delayed">Tell Us About<br />Your <em className="italic">Dream Day</em></h1>
        <GoldDivider flip className="mb-10 opacity-0 translate-y-5 animate-fadeUp-delayed" />

        <form id="contact-form" onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="form-group relative group">
              <input type="text" className="form-input peer" id="fname" placeholder=" " required />
              <label className="form-label absolute top-3 left-0 text-[11px] tracking-[0.15em] uppercase text-ink/35 font-medium pointer-events-none transition-all duration-300 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-gold" htmlFor="fname">First Name</label>
              <div className="form-underline absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-400 peer-focus:w-full"></div>
            </div>
            <div className="form-group relative group">
              <input type="text" className="form-input peer" id="lname" placeholder=" " required />
              <label className="form-label absolute top-3 left-0 text-[11px] tracking-[0.15em] uppercase text-ink/35 font-medium pointer-events-none transition-all duration-300 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-gold" htmlFor="lname">Last Name</label>
              <div className="form-underline absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-400 peer-focus:w-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="form-group relative group">
              <input type="email" className="form-input peer" id="email" placeholder=" " required />
              <label className="form-label absolute top-3 left-0 text-[11px] tracking-[0.15em] uppercase text-ink/35 font-medium pointer-events-none transition-all duration-300 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-gold" htmlFor="email">Email Address</label>
              <div className="form-underline absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-400 peer-focus:w-full"></div>
            </div>
            <div className="form-group relative group">
              <input type="tel" className="form-input peer" id="phone" placeholder=" " />
              <label className="form-label absolute top-3 left-0 text-[11px] tracking-[0.15em] uppercase text-ink/35 font-medium pointer-events-none transition-all duration-300 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-gold" htmlFor="phone">Phone Number</label>
              <div className="form-underline absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-400 peer-focus:w-full"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="form-group relative group">
              <input type="date" className="form-input peer pt-5" id="date" placeholder=" " />
              <label className="form-label absolute top-3 left-0 text-[11px] tracking-[0.15em] uppercase text-ink/35 font-medium pointer-events-none transition-all duration-300 -top-4 text-[9px] text-gold" htmlFor="date">Wedding Date</label>
              <div className="form-underline absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-400 peer-focus:w-full"></div>
            </div>
            <div className="form-group relative group">
              <select className="form-input peer appearance-none" id="budget">
                <option value="" disabled selected>Select Budget Range</option>
                <option>₹8L – ₹15L</option>
                <option>₹15L – ₹30L</option>
                <option>₹30L – ₹60L</option>
                <option>₹60L+</option>
              </select>
              <div className="form-underline absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-400 peer-focus:w-full"></div>
            </div>
          </div>

          <div className="form-group relative group">
            <input type="text" className="form-input peer" id="destination" placeholder=" " />
            <label className="form-label absolute top-3 left-0 text-[11px] tracking-[0.15em] uppercase text-ink/35 font-medium pointer-events-none transition-all duration-300 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-gold" htmlFor="destination">Destination in Mind</label>
            <div className="form-underline absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-400 peer-focus:w-full"></div>
          </div>

          <div className="form-group relative group">
            <textarea className="form-input peer h-24 resize-none" id="message" placeholder=" "></textarea>
            <label className="form-label absolute top-3 left-0 text-[11px] tracking-[0.15em] uppercase text-ink/35 font-medium pointer-events-none transition-all duration-300 peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-gold peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[9px] peer-[:not(:placeholder-shown)]:text-gold" htmlFor="message">Tell Us Your Vision</label>
            <div className="form-underline absolute bottom-0 left-0 w-0 h-[1px] bg-gold transition-all duration-400 peer-focus:w-full"></div>
          </div>

          <button 
            className={`form-submit w-full md:w-auto relative px-12 py-5 bg-gold text-surface text-[11px] tracking-[0.25em] uppercase font-semibold cursor-none overflow-hidden transition-all duration-300 hover:bg-[#a8903c] ${status === 'loading' ? 'loading' : ''} ${status === 'success' ? 'bg-[#4CAF50] hover:bg-[#4CAF50]' : ''}`} 
            type="submit"
          >
            <span className={`submit-text transition-opacity duration-300 ${status !== 'idle' ? 'opacity-0' : 'opacity-100'}`}>Send My Enquiry</span>
            {status === 'loading' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-surface/30 border-t-surface rounded-full animate-spin"></div>
              </div>
            )}
            {status === 'success' && (
              <span className="absolute inset-0 flex items-center justify-center text-lg">✓</span>
            )}
          </button>
        </form>

        <div className="contact-options flex gap-8 mt-14 pt-12 border-t border-ink/10">
          <Link href="https://wa.me/" className="contact-opt flex flex-col items-center gap-2 transition-transform duration-300 hover:-translate-y-1.5">
            <div className="opt-icon w-[52px] h-[52px] border border-ink/15 rounded-full flex items-center justify-center text-xl transition-all duration-300 hover:bg-gold hover:border-gold">💬</div>
            <span className="opt-label text-[10px] tracking-[0.2em] uppercase font-medium text-ink">WhatsApp</span>
          </Link>
          <Link href="mailto:hello@vowsandvedas.com" className="contact-opt flex flex-col items-center gap-2 transition-transform duration-300 hover:-translate-y-1.5">
            <div className="opt-icon w-[52px] h-[52px] border border-ink/15 rounded-full flex items-center justify-center text-xl transition-all duration-300 hover:bg-gold hover:border-gold">✉</div>
            <span className="opt-label text-[10px] tracking-[0.2em] uppercase font-medium text-ink">Email</span>
          </Link>
          <button className="contact-opt flex flex-col items-center gap-2 transition-transform duration-300 hover:-translate-y-1.5 cursor-none">
            <div className="opt-icon w-[52px] h-[52px] border border-ink/15 rounded-full flex items-center justify-center text-xl transition-all duration-300 hover:bg-gold hover:border-gold">📅</div>
            <span className="opt-label text-[10px] tracking-[0.2em] uppercase font-medium text-ink">Book a Call</span>
          </button>
        </div>
      </div>

      {/* IMAGE SIDE */}
      <div className="contact-image-side relative overflow-hidden hidden md:block">
        <div 
          id="contact-img-bg" 
          className="absolute inset-[-10%] bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/photos/destination/TSR50973.jpg')" }}
        ></div>
        <div className="absolute inset-0 bg-ink/35"></div>
        <div className="contact-quote absolute bottom-16 left-12 right-12 z-2">
          <GoldDivider darkBg className="mb-6 opacity-80" />
          <blockquote className="font-heading text-surface text-5xl md:text-6xl font-light italic leading-tight">"The best weddings begin with a single conversation."</blockquote>
          <cite className="block text-[11px] tracking-[0.3em] text-gold mt-4 font-normal not-italic uppercase">— Ananya Sharma, Founder</cite>
          <GoldDivider darkBg flip className="mt-6 opacity-80" />
        </div>
      </div>

      <style jsx>{`
        .form-input { border-bottom: 1px solid rgba(0,0,0,0.15); background: transparent; transition: border-color .3s; }
        .form-input:focus { border-color: var(--color-gold); outline: none; }
        .animate-fadeUp { animation: fadeUp .8s .3s both; }
        .animate-fadeUp-delayed { animation: fadeUp .9s .5s both; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}
