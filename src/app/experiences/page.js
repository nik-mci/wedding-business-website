export default function Experiences() {
  const experiences = [
    {
      title: "The Big Fat Indian Wedding",
      location: "Rajasthan",
      duration: "4 Days",
      days: [
        { title: "Day 1: Royal Welcome", desc: "A traditional greeting with garlands and non-alcoholic refreshments followed by a city tour and a Bachelor's Party in a floral canopy." },
        { title: "Day 2: The Engagement", desc: "Sagan function with rings exchanged amidst traditional music from Shehnai and Flute players." },
        { title: "Day 3: Mehndi & Sangeet", desc: "Celebrity performances and vibrant henna artistry at a theme-decorated venue." },
        { title: "Day 4: The Grand Finale", desc: "Haldi and Chura rituals followed by a majestic procession with elephants, fireworks, and a lavish buffet dinner." }
      ]
    },
    {
      title: "Exotic Beachside Wedding",
      location: "Goa",
      duration: "4 Days",
      days: [
        { title: "Day 1: Sunkissed Arrival", desc: "Transfer to your luxury beach resort for a day of refreshing leisure." },
        { title: "Day 2: Bridal Rituals", desc: "Traditional anointing with scented oils followed by a joint couple's spa treatment at Aguada." },
        { title: "Day 3: The Sand Ceremony", desc: "A beachside exchange of vows accompanied by a special choir, followed by a pool-side gala dinner and champagne." },
        { title: "Day 4: Blissful Brunch", desc: "The first morning of marriage celebrated with a champagne brunch in the privacy of your decorated villa." }
      ]
    },
    {
      title: "Celestial Kerala Union",
      location: "Kerala",
      duration: "3 Days",
      days: [
        { title: "Day 1: Backwater Greeting", desc: "Arrival at a tropical resort followed by an intimate Mehndi ceremony with South Indian classical music." },
        { title: "Day 2: The Nuptial Chain", desc: "A grand entrance on decorated elephants followed by rituals under a floral pandal and a feast served on banana leaves." },
        { title: "Day 3: Tropical Reflection", desc: "A final day of relaxation by the emerald waters and a farewell dinner under the palms." }
      ]
    }
  ];

  return (
    <div className="pt-32 bg-[#F8F6F3]">
      <section className="px-12 py-24 text-center">
        <p className="label">Signature Itineraries</p>
        <h1 className="text-6xl md:text-8xl leading-none">Curated <em>Experiences</em></h1>
      </section>

      <section className="px-12 pb-32">
        <div className="max-w-[1440px] mx-auto space-y-40">
          {experiences.map((exp, i) => (
            <div key={i} className="reveal">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-black/10 pb-10">
                <div>
                  <h2 className="text-4xl md:text-6xl font-heading mb-3">{exp.title}</h2>
                  <p className="text-[var(--gold)] text-xl font-heading italic">{exp.location}</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-px bg-[var(--gold)]"></div>
                  <p className="text-[10px] uppercase tracking-[0.4em] font-semibold">{exp.duration}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {exp.days.map((day, j) => (
                  <div key={j} className="relative pl-8 border-l border-black/5 group interactive">
                    <div className="absolute top-0 left-[-1.5px] w-[3px] h-0 bg-[var(--gold)] group-hover:h-full transition-all duration-700"></div>
                    <p className="text-[9px] tracking-[0.4em] text-[var(--gold)] font-bold mb-5 uppercase">{day.title}</p>
                    <p className="text-sm text-[#3D3D3D] leading-relaxed font-light">{day.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-12 bg-[#1C1C1C] text-white text-center">
        <div className="max-w-2xl mx-auto reveal">
          <p className="label !text-[var(--gold)]">Tailored Journeys</p>
          <h2 className="text-5xl mb-12">Design Your <em>Legacy</em></h2>
          <p className="text-white/40 font-light mb-12">
            These itineraries are the foundation. Every detail is flexible and can be molded according to your family's beliefs and your personal vision.
          </p>
          <button className="btn-gold">Customize Itinerary</button>
        </div>
      </section>
    </div>
  );
}
