"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GoldDivider from "@/components/GoldDivider";
import CornerOrnament from "@/components/CornerOrnament";

const weddingMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ContactPage() {
  const router = useRouter();
  const [status, setStatus] = useState("idle"); // idle, loading, success
  const [weddingMonth, setWeddingMonth] = useState("");
  const [weddingYear, setWeddingYear] = useState("");
  const currentYear = new Date().getFullYear();
  const weddingYears = Array.from({ length: 8 }, (_, index) => currentYear + index);

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
      router.push("/thank-you");
    }, 2000);
  };

  return (
    <div id="contact-layout" className="grid grid-cols-1 md:grid-cols-2 min-h-screen pt-20 md:pt-0">
      {/* FORM SIDE */}
      <div className="contact-form-side bg-surface px-6 pt-10 pb-28 sm:px-8 md:px-14 lg:px-20 xl:px-24 md:py-24 flex flex-col justify-center border-r border-ink/5 relative">
        <CornerOrnament size={48} inset={16} opacity={0.35} />
        <div className="max-w-[680px] w-full mx-auto">
          <GoldDivider className="mb-5 md:mb-6 opacity-0 translate-y-5 animate-fadeUp" />
          <p className="form-eyebrow text-[10px] tracking-[0.42em] md:tracking-[0.5em] uppercase text-gold mb-3 md:mb-4 font-medium opacity-0 translate-y-5 animate-fadeUp">Let's Begin</p>
          <h1 className="form-title font-heading text-ink text-[42px] sm:text-5xl md:text-[64px] xl:text-7xl font-light leading-[1.05] md:leading-[1.1] mb-8 md:mb-10 opacity-0 translate-y-5 animate-fadeUp-delayed">Tell Us About<br />Your <em className="italic">Dream Day</em></h1>
          <GoldDivider flip className="mb-8 md:mb-10 opacity-0 translate-y-5 animate-fadeUp-delayed" />

          <form id="contact-form" onSubmit={handleSubmit} className="space-y-6 md:space-y-7">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-8 md:gap-y-7">
              <div className="form-group">
                <label className="form-label" htmlFor="fname">First Name</label>
                <input type="text" className="form-input" id="fname" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="lname">Last Name</label>
                <input type="text" className="form-input" id="lname" required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-x-8 md:gap-y-7">
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input type="email" className="form-input" id="email" required />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number</label>
                <input type="tel" className="form-input" id="phone" />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="destination">Destination in Mind</label>
              <input type="text" className="form-input" id="destination" />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="wedding-month">Estimated Wedding Date</label>
              <div className="date-picker-grid" aria-label="Estimated wedding date">
                <select
                  className="form-input form-select"
                  id="wedding-month"
                  value={weddingMonth}
                  onChange={(event) => setWeddingMonth(event.target.value)}
                >
                  <option value="">Month</option>
                  {weddingMonths.map((month) => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
                <select
                  className="form-input form-select"
                  id="wedding-year"
                  value={weddingYear}
                  onChange={(event) => setWeddingYear(event.target.value)}
                >
                  <option value="">Year</option>
                  {weddingYears.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
              <input
                type="hidden"
                name="estimatedWeddingDate"
                value={[weddingMonth, weddingYear].filter(Boolean).join(" ")}
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Tell Us Your Vision <span className="normal-case tracking-normal font-light text-muted" style={{ fontSize: '10px' }}>(Optional)</span></label>
              <textarea className="form-input form-textarea" id="message"></textarea>
            </div>

            <button 
              className={`form-submit w-full md:w-auto relative px-9 md:px-12 py-4 md:py-5 bg-gold text-surface text-[11px] tracking-[0.22em] md:tracking-[0.25em] uppercase font-semibold cursor-none overflow-hidden transition-all duration-300 hover:bg-[#a8903c] ${status === 'loading' ? 'loading' : ''} ${status === 'success' ? 'bg-[#4CAF50] hover:bg-[#4CAF50]' : ''}`} 
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

          <div className="contact-options grid grid-cols-2 gap-3 sm:gap-4 mt-10 md:mt-12 pt-8 md:pt-10 border-t border-ink/10">
            <Link href="https://wa.me/" className="contact-opt group flex items-center gap-4 border border-ink/10 px-4 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:bg-[#FDFAF5]">
              <span className="opt-icon w-11 h-11 md:w-12 md:h-12 border border-[#25D366]/40 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-gold group-hover:border-gold" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="w-5 h-5 group-hover:hidden" fill="#25D366">
                  <path d="M12.04 2C6.58 2 2.15 6.34 2.15 11.69c0 1.7.46 3.36 1.32 4.82L2 22l5.62-1.43a10.1 10.1 0 0 0 4.42 1.03c5.46 0 9.9-4.34 9.9-9.69S17.5 2 12.04 2Zm0 17.93a8.36 8.36 0 0 1-4.05-1.05l-.29-.16-3.33.85.89-3.17-.18-.31a7.97 7.97 0 0 1-1.25-4.4c0-4.43 3.68-8.03 8.21-8.03 4.54 0 8.22 3.6 8.22 8.03 0 4.44-3.68 8.24-8.22 8.24Zm4.51-6.02c-.25-.12-1.47-.71-1.7-.79-.23-.09-.4-.12-.56.12-.17.24-.64.79-.78.95-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.2-.73-.64-1.23-1.44-1.37-1.68-.14-.24-.01-.37.11-.49.11-.11.25-.29.37-.43.12-.14.17-.24.25-.4.08-.16.04-.3-.02-.43-.06-.12-.56-1.32-.77-1.81-.2-.47-.41-.41-.56-.42h-.48c-.17 0-.43.06-.66.3-.23.24-.87.83-.87 2.03 0 1.19.89 2.35 1.01 2.51.12.16 1.75 2.62 4.24 3.67.59.25 1.05.4 1.41.51.59.18 1.13.16 1.56.1.47-.07 1.47-.59 1.68-1.15.21-.57.21-1.05.14-1.15-.06-.11-.22-.17-.46-.29Z" />
                </svg>
                <svg viewBox="0 0 24 24" className="w-5 h-5 hidden group-hover:block fill-current text-surface" fill="white">
                  <path d="M12.04 2C6.58 2 2.15 6.34 2.15 11.69c0 1.7.46 3.36 1.32 4.82L2 22l5.62-1.43a10.1 10.1 0 0 0 4.42 1.03c5.46 0 9.9-4.34 9.9-9.69S17.5 2 12.04 2Zm0 17.93a8.36 8.36 0 0 1-4.05-1.05l-.29-.16-3.33.85.89-3.17-.18-.31a7.97 7.97 0 0 1-1.25-4.4c0-4.43 3.68-8.03 8.21-8.03 4.54 0 8.22 3.6 8.22 8.03 0 4.44-3.68 8.24-8.22 8.24Zm4.51-6.02c-.25-.12-1.47-.71-1.7-.79-.23-.09-.4-.12-.56.12-.17.24-.64.79-.78.95-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.2-.73-.64-1.23-1.44-1.37-1.68-.14-.24-.01-.37.11-.49.11-.11.25-.29.37-.43.12-.14.17-.24.25-.4.08-.16.04-.3-.02-.43-.06-.12-.56-1.32-.77-1.81-.2-.47-.41-.41-.56-.42h-.48c-.17 0-.43.06-.66.3-.23.24-.87.83-.87 2.03 0 1.19.89 2.35 1.01 2.51.12.16 1.75 2.62 4.24 3.67.59.25 1.05.4 1.41.51.59.18 1.13.16 1.56.1.47-.07 1.47-.59 1.68-1.15.21-.57.21-1.05.14-1.15-.06-.11-.22-.17-.46-.29Z" />
                </svg>
              </span>
              <span className="flex flex-col text-left">
                <span className="opt-label text-[10px] tracking-[0.2em] uppercase font-semibold text-ink">WhatsApp</span>
                <span className="text-[12px] text-muted mt-1">Quick message</span>
              </span>
            </Link>
            <Link href="mailto:hello@vowsandvedas.com" className="contact-opt group flex items-center gap-4 border border-ink/10 px-4 py-4 transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:bg-[#FDFAF5]">
              <span className="opt-icon w-11 h-11 md:w-12 md:h-12 border border-ink/15 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-gold group-hover:border-gold" aria-hidden="true">
                {/* Gmail logo */}
                <svg viewBox="0 0 48 48" className="w-5 h-5 group-hover:hidden" xmlns="http://www.w3.org/2000/svg">
                  <path fill="#4caf50" d="M45 16.2l-5 2.75-5 4.75L35 40h7c1.657 0 3-1.343 3-3V16.2z"/>
                  <path fill="#1e88e5" d="M3 16.2l3.614 1.71L13 23.7V40H6c-1.657 0-3-1.343-3-3V16.2z"/>
                  <polygon fill="#e53935" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.45 35,23.7 36,17"/>
                  <path fill="#c62828" d="M3 12.298V16.2l10 7.5V11.2L9.876 8.859C9.132 8.301 8.228 8 7.298 8 4.924 8 3 9.924 3 12.298z"/>
                  <path fill="#fbc02d" d="M45 12.298V16.2l-10 7.5V11.2l3.124-2.341C38.868 8.301 39.772 8 40.702 8 43.076 8 45 9.924 45 12.298z"/>
                </svg>
                <svg viewBox="0 0 48 48" className="w-5 h-5 hidden group-hover:block" xmlns="http://www.w3.org/2000/svg">
                  <path fill="white" d="M45 16.2l-5 2.75-5 4.75L35 40h7c1.657 0 3-1.343 3-3V16.2z"/>
                  <path fill="white" d="M3 16.2l3.614 1.71L13 23.7V40H6c-1.657 0-3-1.343-3-3V16.2z"/>
                  <polygon fill="white" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.45 35,23.7 36,17"/>
                  <path fill="white" d="M3 12.298V16.2l10 7.5V11.2L9.876 8.859C9.132 8.301 8.228 8 7.298 8 4.924 8 3 9.924 3 12.298z"/>
                  <path fill="white" d="M45 12.298V16.2l-10 7.5V11.2l3.124-2.341C38.868 8.301 39.772 8 40.702 8 43.076 8 45 9.924 45 12.298z"/>
                </svg>
              </span>
              <span className="flex flex-col text-left">
                <span className="opt-label text-[10px] tracking-[0.2em] uppercase font-semibold text-ink">Email</span>
                <span className="text-[12px] text-muted mt-1">Write to us</span>
              </span>
            </Link>
          </div>
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
        <div className="contact-quote absolute top-1/2 left-12 right-12 z-[2] -translate-y-1/2 flex flex-col items-center text-center">
          <GoldDivider darkBg className="mb-6 opacity-80" />
          <blockquote className="font-heading text-surface text-5xl md:text-6xl font-light italic leading-tight max-w-[720px]">"The best weddings begin with a single conversation."</blockquote>
          <GoldDivider darkBg flip className="mt-6 opacity-80" />
        </div>
      </div>

      <style jsx>{`
        .form-group { position: relative; }
        .form-label {
          display: block;
          color: rgba(26, 20, 8, 0.42);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.18em;
          line-height: 1.4;
          margin-bottom: 9px;
          text-transform: uppercase;
        }
        .form-input {
          width: 100%;
          min-height: 46px;
          border: 0;
          border-bottom: 1px solid rgba(0,0,0,0.16);
          background: transparent;
          color: var(--color-ink);
          font-family: var(--font-body);
          font-size: 15px;
          line-height: 1.5;
          padding: 4px 0 12px;
          transition: border-color .3s, box-shadow .3s;
        }
        .form-textarea {
          min-height: 112px;
          resize: vertical;
        }
        .date-picker-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.35fr) minmax(104px, 0.65fr);
          gap: 18px;
        }
        .form-select {
          appearance: none;
          background-image:
            linear-gradient(45deg, transparent 50%, rgba(26, 20, 8, 0.58) 50%),
            linear-gradient(135deg, rgba(26, 20, 8, 0.58) 50%, transparent 50%);
          background-position:
            calc(100% - 14px) calc(50% - 2px),
            calc(100% - 8px) calc(50% - 2px);
          background-size: 6px 6px, 6px 6px;
          background-repeat: no-repeat;
          padding-right: 30px;
        }
        .form-input:focus { border-color: var(--color-gold); outline: none; }
        .form-input:focus { box-shadow: 0 1px 0 var(--color-gold); }
        .form-group:focus-within .form-label { color: var(--color-gold); }
        .animate-fadeUp { animation: fadeUp .8s .3s both; }
        .animate-fadeUp-delayed { animation: fadeUp .9s .5s both; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @media (max-width: 767px) {
          .contact-options {
            grid-template-columns: 1fr;
          }
          .form-input {
            min-height: 44px;
            font-size: 16px;
          }
          .form-textarea {
            min-height: 104px;
          }
          .date-picker-grid {
            grid-template-columns: 1fr;
            gap: 14px;
          }
        }
      `}</style>
    </div>
  );
}
