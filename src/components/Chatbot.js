"use client";

export default function Chatbot() {
  return (
    <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-[2000] flex flex-col gap-3 items-end">
      {/* WhatsApp */}
      <a
        href="https://wa.me/91XXXXXXXXXX"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex items-center gap-0 hover:gap-3 overflow-hidden transition-all duration-300 cursor-none"
      >
        <span className="max-w-0 group-hover:max-w-[160px] opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden whitespace-nowrap bg-[#1A1408] text-[#C9A234] text-[10px] font-medium tracking-[0.2em] uppercase px-0 group-hover:px-4 py-3 shadow-lg">
          WhatsApp
        </span>
        <span className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1A1408] border border-[#C9A234]/50 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(201,162,52,0.25)] group-hover:shadow-[0_8px_40px_rgba(201,162,52,0.45)] group-hover:border-[#C9A234] transition-all duration-300 hover:scale-110 active:scale-95">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#C9A234">
            <path d="M12.04 2C6.58 2 2.15 6.34 2.15 11.69c0 1.7.46 3.36 1.32 4.82L2 22l5.62-1.43a10.1 10.1 0 0 0 4.42 1.03c5.46 0 9.9-4.34 9.9-9.69S17.5 2 12.04 2Zm0 17.93a8.36 8.36 0 0 1-4.05-1.05l-.29-.16-3.33.85.89-3.17-.18-.31a7.97 7.97 0 0 1-1.25-4.4c0-4.43 3.68-8.03 8.21-8.03 4.54 0 8.22 3.6 8.22 8.03 0 4.44-3.68 8.24-8.22 8.24Zm4.51-6.02c-.25-.12-1.47-.71-1.7-.79-.23-.09-.4-.12-.56.12-.17.24-.64.79-.78.95-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.2-.73-.64-1.23-1.44-1.37-1.68-.14-.24-.01-.37.11-.49.11-.11.25-.29.37-.43.12-.14.17-.24.25-.4.08-.16.04-.3-.02-.43-.06-.12-.56-1.32-.77-1.81-.2-.47-.41-.41-.56-.42h-.48c-.17 0-.43.06-.66.3-.23.24-.87.83-.87 2.03 0 1.19.89 2.35 1.01 2.51.12.16 1.75 2.62 4.24 3.67.59.25 1.05.4 1.41.51.59.18 1.13.16 1.56.1.47-.07 1.47-.59 1.68-1.15.21-.57.21-1.05.14-1.15-.06-.11-.22-.17-.46-.29Z" />
          </svg>
        </span>
      </a>

      {/* Email */}
      <a
        href="mailto:hello@vowsandvedas.com"
        aria-label="Send us an email"
        className="group flex items-center gap-0 hover:gap-3 overflow-hidden transition-all duration-300 cursor-none"
      >
        <span className="max-w-0 group-hover:max-w-[160px] opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden whitespace-nowrap bg-[#1A1408] text-[#C9A234] text-[10px] font-medium tracking-[0.2em] uppercase px-0 group-hover:px-4 py-3 shadow-lg">
          Email Us
        </span>
        <span className="w-12 h-12 sm:w-14 sm:h-14 bg-[#1A1408] border border-[#C9A234]/50 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(201,162,52,0.25)] group-hover:shadow-[0_8px_40px_rgba(201,162,52,0.45)] group-hover:border-[#C9A234] transition-all duration-300 hover:scale-110 active:scale-95">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#C9A234" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <path d="M2 7l10 7 10-7"/>
          </svg>
        </span>
      </a>
    </div>
  );
}
