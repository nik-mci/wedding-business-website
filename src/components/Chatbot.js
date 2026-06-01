"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

const STARTERS = [
  "What wedding venues do you offer in Goa?",
  "Tell me about palace weddings in Rajasthan",
  "What services does Vows & Vedas provide?",
  "How early should we book?",
];

const INITIAL_MESSAGE = {
  role: "bot",
  text: "Welcome to Vows & Vedas. I'm here to help you explore our destinations, services, and venues. What would you like to know?",
};

export default function Chatbot() {
  const [open, setOpen]               = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [messages, setMessages]       = useState([INITIAL_MESSAGE]);
  const [input, setInput]             = useState("");
  const [startersVisible, setStartersVisible] = useState(true);
  const [isStreaming, setIsStreaming]  = useState(false);
  const [accIntent, setAccIntent]     = useState({});
  const [leadCaptured]                = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const abortRef       = useRef(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    window.toggleChat = () => setOpen(prev => !prev);
    return () => { delete window.toggleChat; };
  }, []);

  const historyForApi = () =>
    messages
      .filter(m => m.role !== "typing")
      .map(m => ({ role: m.role === "bot" ? "assistant" : "user", content: m.text }));

  const sendMessage = async (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed || isStreaming) return;

    setInput("");
    setStartersVisible(false);
    setIsStreaming(true);

    // Add user message + empty bot placeholder for streaming into
    const userMsg  = { role: "user", text: trimmed };
    const botMsg   = { role: "bot",  text: "", streaming: true };
    setMessages(prev => [...prev, userMsg, botMsg]);

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/chat", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        signal:  abortRef.current.signal,
        body: JSON.stringify({
          query:                trimmed,
          conversation_history: historyForApi(),
          accumulated_intent:   accIntent,
          lead_captured:        leadCaptured,
        }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let   buffer  = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop(); // keep incomplete line

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          try {
            const event = JSON.parse(line.slice(6));
            if (event.type === "token") {
              setMessages(prev => {
                const updated = [...prev];
                const last    = updated[updated.length - 1];
                if (last?.role === "bot") updated[updated.length - 1] = { ...last, text: last.text + event.text };
                return updated;
              });
            } else if (event.type === "meta") {
              if (event.accumulated_intent) setAccIntent(event.accumulated_intent);
            } else if (event.type === "done") {
              setMessages(prev => {
                const updated = [...prev];
                const last    = updated[updated.length - 1];
                if (last?.role === "bot") updated[updated.length - 1] = { ...last, streaming: false };
                return updated;
              });
            } else if (event.type === "error") {
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: "bot", text: event.message, streaming: false };
                return updated;
              });
            }
          } catch { /* malformed SSE line — skip */ }
        }
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "bot",
            text: "Something went wrong. Please try again or reach us on WhatsApp: +91 9654277656",
            streaming: false,
          };
          return updated;
        });
      }
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const showHandoffCta = accIntent.stage === "handoff" ||
    (accIntent.intent_level === "high" && messages.length > 6);

  return (
    <>
      {/* ── Right sidebar: Call / Email / WhatsApp ─────────────────── */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[2001]">
        {sidebarOpen ? (
          <div className="bg-[#1A1408] border border-[#C9A234]/25 border-r-0 rounded-l-2xl flex flex-col items-center shadow-[-8px_0_40px_rgba(0,0,0,0.45)]">

            {/* Close button */}
            <button
              onClick={() => setSidebarOpen(false)}
              aria-label="Close contact panel"
              className="w-full flex items-center justify-center pt-3 pb-2 text-[#9A8F7E] hover:text-[#C9A234] transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>

            <div className="w-8 h-px bg-[#C9A234]/20" />

            {/* Call Us */}
            <a
              href="tel:+919654277656"
              aria-label="Call us"
              className="group flex flex-col items-center gap-1.5 px-4 py-3.5 hover:bg-[#251C0D] transition-colors duration-200 w-full"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#C9A234] group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.93a16 16 0 0 0 6.29 6.29l.93-.88a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <span className="text-[#C9A234] text-[8px] tracking-[0.2em] uppercase font-medium leading-none whitespace-nowrap">Call Us</span>
            </a>

            <div className="w-8 h-px bg-[#C9A234]/20" />

            {/* Email / Enquiry */}
            <a
              href="mailto:arunima.sethi@getsholidays.com"
              aria-label="Email us"
              className="group flex flex-col items-center gap-1.5 px-4 py-3.5 hover:bg-[#251C0D] transition-colors duration-200 w-full"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#C9A234] group-hover:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M2 7l10 7 10-7"/>
              </svg>
              <span className="text-[#C9A234] text-[8px] tracking-[0.2em] uppercase font-medium leading-none whitespace-nowrap">Enquiry</span>
            </a>

            <div className="w-8 h-px bg-[#C9A234]/20" />

            {/* WhatsApp */}
            <a
              href="https://wa.me/919654277656"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="group flex flex-col items-center gap-1.5 px-4 py-3.5 hover:bg-[#251C0D] transition-colors duration-200 w-full"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-[#C9A234] group-hover:scale-110 transition-transform duration-200" fill="currentColor">
                <path d="M12.04 2C6.58 2 2.15 6.34 2.15 11.69c0 1.7.46 3.36 1.32 4.82L2 22l5.62-1.43a10.1 10.1 0 0 0 4.42 1.03c5.46 0 9.9-4.34 9.9-9.69S17.5 2 12.04 2Zm0 17.93a8.36 8.36 0 0 1-4.05-1.05l-.29-.16-3.33.85.89-3.17-.18-.31a7.97 7.97 0 0 1-1.25-4.4c0-4.43 3.68-8.03 8.21-8.03 4.54 0 8.22 3.6 8.22 8.03 0 4.44-3.68 8.24-8.22 8.24Zm4.51-6.02c-.25-.12-1.47-.71-1.7-.79-.23-.09-.4-.12-.56.12-.17.24-.64.79-.78.95-.14.16-.29.18-.53.06-.25-.12-1.04-.38-1.98-1.2-.73-.64-1.23-1.44-1.37-1.68-.14-.24-.01-.37.11-.49.11-.11.25-.29.37-.43.12-.14.17-.24.25-.4.08-.16.04-.3-.02-.43-.06-.12-.56-1.32-.77-1.81-.2-.47-.41-.41-.56-.42h-.48c-.17 0-.43.06-.66.3-.23.24-.87.83-.87 2.03 0 1.19.89 2.35 1.01 2.51.12.16 1.75 2.62 4.24 3.67.59.25 1.05.4 1.41.51.59.18 1.13.16 1.56.1.47-.07 1.47-.59 1.68-1.15.21-.57.21-1.05.14-1.15-.06-.11-.22-.17-.46-.29Z" />
              </svg>
              <span className="text-[#C9A234] text-[8px] tracking-[0.2em] uppercase font-medium leading-none whitespace-nowrap">WhatsApp</span>
            </a>

            <div className="pb-2" />
          </div>
        ) : (
          /* Re-open tab */
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open contact options"
            className="w-6 h-16 bg-[#1A1408] border border-[#C9A234]/30 border-r-0 rounded-l-lg flex items-center justify-center text-[#C9A234] hover:bg-[#251C0D] transition-colors duration-200 shadow-[-4px_0_20px_rgba(0,0,0,0.4)]"
          >
            <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
        )}
      </div>

      {/* ── Bottom-right: Chat panel + toggle ──────────────────────── */}
      <div className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 z-[2000] flex flex-col gap-3 items-end pointer-events-none">

        {/* Chat panel */}
        <div
          className={`
            flex flex-col
            w-[calc(100vw-32px)] sm:w-[390px]
            h-[70vh] sm:h-[560px]
            bg-[#1A1408] border border-[#C9A234]/25
            shadow-[0_24px_80px_rgba(0,0,0,0.55)]
            rounded-2xl overflow-hidden
            origin-bottom-right
            transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
            ${open
              ? "opacity-100 scale-100 pointer-events-auto translate-y-0"
              : "opacity-0 scale-95 pointer-events-none translate-y-3"}
          `}
          aria-hidden={!open}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#C9A234]/15 shrink-0">
            <div className="flex items-center gap-3">
              <span className="text-[#C9A234] text-lg leading-none">✦</span>
              <div>
                <p className="font-heading text-[#FDFAF5] text-[17px] leading-tight">Vows &amp; Vedas</p>
                <p className="text-[#9A8F7E] text-[10px] tracking-[0.18em] uppercase font-medium mt-0.5">Wedding Concierge</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="w-8 h-8 flex items-center justify-center text-[#9A8F7E] hover:text-[#C9A234] transition-colors duration-200 cursor-none"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div data-lenis-prevent className="flex-1 min-h-0 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-[#C9A234]/20">
            {messages.map((msg, i) => (
              <div key={i} className={`flex items-end gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {msg.role === "bot" && (
                  <span className="w-6 h-6 shrink-0 rounded-full border border-[#C9A234]/40 flex items-center justify-center text-[#C9A234] text-[10px] mb-0.5">✦</span>
                )}
                <div
                  className={`
                    max-w-[78%] px-4 py-3 text-[13px] leading-[1.75] font-light
                    ${msg.role === "bot"
                      ? "bg-[#251C0D] text-[#FDFAF5]/90 rounded-2xl rounded-bl-sm border border-[#C9A234]/10"
                      : "bg-[#C9A234] text-[#1A1408] rounded-2xl rounded-br-sm font-medium"}
                  `}
                >
                  {/* Typing indicator for empty streaming message */}
                  {msg.streaming && !msg.text ? (
                    <span className="flex gap-1 items-center py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A234]/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A234]/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C9A234]/60 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  ) : msg.text}
                </div>
              </div>
            ))}

            {/* Handoff CTA — shown when user is ready to enquire */}
            {showHandoffCta && (
              <div className="flex flex-col items-start gap-2 pl-9">
                <p className="text-[10px] text-[#9A8F7E] tracking-[0.15em] uppercase">Ready to begin?</p>
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="text-[11px] font-medium tracking-[0.2em] uppercase bg-[#C9A234] text-[#1A1408] px-4 py-2.5 rounded-full hover:bg-[#C9A234]/90 transition-colors duration-200"
                >
                  Begin Your Journey →
                </Link>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Starter prompts */}
          {startersVisible && messages.length === 1 && (
            <div className="px-4 pb-3 shrink-0">
              <p className="text-[#9A8F7E] text-[9px] tracking-[0.22em] uppercase mb-2.5 font-medium">Suggested</p>
              <div className="flex flex-col gap-2">
                {STARTERS.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => sendMessage(s)}
                    className="text-left text-[12px] text-[#FDFAF5]/70 border border-[#C9A234]/20 px-3.5 py-2.5 rounded-xl hover:border-[#C9A234]/60 hover:text-[#FDFAF5] hover:bg-[#C9A234]/5 transition-all duration-200 cursor-none leading-snug"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-4 pb-4 pt-2 border-t border-[#C9A234]/15 shrink-0">
            <div className="flex items-center gap-2 bg-[#251C0D] border border-[#C9A234]/20 rounded-xl px-4 py-2.5 focus-within:border-[#C9A234]/50 transition-colors duration-200">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask about venues, services…"
                className="flex-1 bg-transparent text-[#FDFAF5] text-[13px] font-light placeholder:text-[#9A8F7E]/60 outline-none"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                aria-label="Send message"
                className="w-7 h-7 flex items-center justify-center text-[#C9A234] disabled:opacity-30 hover:scale-110 transition-all duration-200 cursor-none shrink-0"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </div>
            <p className="text-center text-[9px] text-[#9A8F7E]/40 mt-2 tracking-[0.1em]">Powered by Vows &amp; Vedas AI</p>
          </div>
        </div>

        {/* Chat toggle button */}
        <button
          onClick={() => setOpen(prev => !prev)}
          aria-label={open ? "Close chat" : "Open chat"}
          className="group flex items-center gap-0 hover:gap-3 overflow-hidden transition-all duration-300 cursor-none pointer-events-auto"
        >
          <span className="max-w-0 group-hover:max-w-[160px] opacity-0 group-hover:opacity-100 transition-all duration-300 overflow-hidden whitespace-nowrap bg-[#1A1408] text-[#C9A234] text-[10px] font-medium tracking-[0.2em] uppercase px-0 group-hover:px-4 py-3 shadow-lg">
            {open ? "Close Chat" : "Chat With Us"}
          </span>
          <span className={`w-12 h-12 sm:w-14 sm:h-14 border rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(201,162,52,0.25)] transition-all duration-300 hover:scale-110 active:scale-95 ${open ? "bg-[#C9A234] border-[#C9A234]" : "bg-[#1A1408] border-[#C9A234]/50 group-hover:border-[#C9A234] group-hover:shadow-[0_8px_40px_rgba(201,162,52,0.45)]"}`}>
            {open ? (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#1A1408" strokeWidth="2" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="#C9A234" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            )}
          </span>
        </button>

      </div>
    </>
  );
}
