"use client";

export default function Testimonials() {
  const testimonials = [
    {
      author: "Priya & Arjun",
      location: "Udaipur Palace, India",
      quote: "Vows & Vedas turned our dream of a Rajasthan palace wedding into a breathtaking reality. Every detail was beyond what we imagined.",
    },
    {
      author: "Meera & Kabir",
      location: "Santorini, Greece",
      quote: "From Santorini to Bali, they gave us the most cinematic wedding. The team was with us every step — we truly felt cared for.",
    },
    {
      author: "Rhea & Dev",
      location: "Jaisalmer, India",
      quote: "The décor was unreal — marigolds and mirror work set against the desert dunes. Our guests are still talking about it two years later.",
    },
    {
      author: "Sonia & Manlio",
      location: "Devi Garh, India",
      quote: "Our wedding at the Devi Garh was an unforgettable experience. The level of service was outstanding and the ceremony felt like a fairy tale.",
    },
    {
      author: "Zara & Samar",
      location: "Symphony Beach, Goa",
      quote: "Everything you have done for us is more like what we expect a family member to do and your presence really made our wedding a wonderful experience.",
    }
  ];

  // Duplicate for seamless loop
  const track = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="bg-[#F8F6F3] py-32 overflow-hidden">
      <div className="px-12 mb-16">
        <p className="section-label reveal">Love Stories</p>
        <h2 className="section-title reveal">What Our<br/><em>Couples Say</em></h2>
      </div>

      <div className="flex gap-7 animate-[scrollTrack_40s_linear_infinite] w-max px-12 hover:[animation-play-state:paused]">
        {track.map((t, i) => (
          <div 
            key={i} 
            className="w-[380px] flex-shrink-0 bg-white p-10 border-b-2 border-transparent hover:border-[var(--gold)] transition-colors duration-300 shadow-sm"
          >
            <div className="text-[var(--gold)] text-xs tracking-[4px] mb-5">★★★★★</div>
            <p className="font-heading text-xl italic font-light leading-relaxed text-[#1C1C1C] mb-7 italic">
              "{t.quote}"
            </p>
            <p className="text-[10px] tracking-[0.3em] uppercase text-[#3D3D3D] font-semibold mb-1">{t.author}</p>
            <p className="text-[10px] tracking-[0.2em] text-[var(--gold)]">{t.location}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
