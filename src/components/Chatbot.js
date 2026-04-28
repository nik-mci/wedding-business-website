"use client";
import { useState } from "react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Welcome! I'm here to help you begin planning your dream wedding. What's the occasion?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsgs = [...messages, { type: 'user', text: input }];
    setMessages(newMsgs);
    setInput("");
    
    setTimeout(() => {
      setMessages([...newMsgs, { type: 'bot', text: "Thank you! One of our wedding consultants will be in touch shortly. Or connect on WhatsApp for instant help." }]);
    }, 800);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[2000]">
      {/* CHAT PANEL */}
      <div className={`absolute bottom-[72px] right-0 w-[320px] bg-white rounded-sm shadow-2xl transition-all duration-350 ease-out overflow-hidden ${isOpen ? 'translate-y-0 scale-100 opacity-100 pointer-events-all' : 'translate-y-4 scale-95 opacity-0 pointer-events-none'}`}>
        <div className="bg-[#1C1C1C] p-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[var(--gold)] flex items-center justify-center font-heading text-white text-lg">V</div>
          <div>
            <p className="text-white font-heading text-sm">Vows & Vedas</p>
            <p className="text-[var(--gold)] text-[9px] tracking-widest uppercase">● Online Now</p>
          </div>
        </div>
        
        <div className="bg-[#F8F6F3] p-5 h-64 overflow-y-auto flex flex-col gap-3">
          {messages.map((msg, i) => (
            <div 
              key={i} 
              className={`text-xs leading-relaxed p-3 max-w-[85%] font-light ${msg.type === 'bot' ? 'bg-white text-[#1C1C1C] self-start border-l-2 border-[var(--gold)]' : 'bg-[var(--gold)] text-white self-end'}`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        <div className="flex border-t border-black/5">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type a message..." 
            className="flex-1 border-none p-4 text-xs font-body outline-none"
          />
          <button onClick={handleSend} className="p-4 text-[var(--gold)] text-lg">→</button>
        </div>
        
        <a href="https://wa.me/91XXXXXXXXXX" target="_blank" className="flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white text-[11px] font-semibold tracking-widest hover:bg-[#128C7E] transition-colors">
          💬 &nbsp; CONTINUE ON WHATSAPP
        </a>
      </div>

      {/* CHAT BUTTON */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[var(--gold)] rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 active:scale-95"
      >
        <svg className="w-6 h-6 fill-white" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
      </button>
    </div>
  );
}
