export default function Venues() {
  const regions = [
    {
      name: "Udaipur",
      description: "The crown jewel of Rajasthan weddings, where palaces float on serene lakes.",
      venues: [
        { name: "Oberoi Udai Vilas", type: "Luxury Palace Studio", desc: "Ranked among the world's best, offering traditional architecture and sun-kissed lake views." },
        { name: "Shiv Niwas Palace", type: "Royal Residence", desc: "A crescent-shaped palace providing a truly regal red-carpet welcome." },
        { name: "Jag Mandir", type: "Island Fortress", desc: "The legendary island palace accessible only by boat for exclusive celebrations." },
        { name: "Taj Lake Palace", type: "Marble Vision", desc: "A floating vision of white marble set in the middle of Lake Pichola." }
      ]
    },
    {
      name: "Jaipur",
      description: "Majestic forts and pink-hued palaces that capture the essence of royalty.",
      venues: [
        { name: "Rambagh Palace", type: "Grand Estate", desc: "The former residence of the Maharaja, offering unmatched splendor and expansive gardens." },
        { name: "Jai Mahal Palace", type: "Mughal Heritage", desc: "A masterpiece of Indo-Saracenic architecture set amidst 18 acres of landscaped gardens." },
        { name: "Oberoi Raj Vilas", type: "Fortress Resort", desc: "A 32-acre oasis built around a traditional Rajasthani fort and a 280-year-old Shiva temple." }
      ]
    },
    {
      name: "Jodhpur",
      description: "Desert grandeur dominated by the massive Mehrangarh fort.",
      venues: [
        { name: "Umaid Bhavan Palace", type: "Living History", desc: "One of the world's largest private residences, offering golden sandstone grandeur." },
        { name: "Ajit Bhawan Palace", type: "Heritage Charm", desc: "India's first heritage hotel, combining classic elegance with warm Rajput hospitality." },
        { name: "Taj Hari Mahal", type: "Marwar Palace", desc: "Inspired by 14th-century architecture, featuring intricate carvings and sprawling courtyards." }
      ]
    }
  ];

  return (
    <div className="pt-32 bg-[#F8F6F3]">
      <header className="h-[50vh] bg-[#1C1C1C] flex items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/photos/destination/TSR50334.jpg')] bg-cover bg-center opacity-30 grayscale"></div>
        <div className="relative z-10 reveal">
          <p className="label !text-[var(--gold)] mb-4">Elite Partners</p>
          <h1 className="text-white text-6xl md:text-8xl leading-none">The <em>Directory</em></h1>
        </div>
      </header>

      <section className="px-12 py-32">
        <div className="max-w-[1440px] mx-auto space-y-32">
          {regions.map((region, i) => (
            <div key={region.name} className="reveal">
              <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-8">
                <h2 className="font-heading text-5xl md:text-7xl">
                  {region.name}
                </h2>
                <p className="text-[#3D3D3D] font-light text-sm max-w-sm leading-relaxed">
                  {region.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2px] bg-black/5">
                {region.venues.map((venue, j) => (
                  <div key={j} className="bg-white p-10 transition-all duration-500 hover:bg-[#FDFDFD] group interactive">
                    <p className="text-[9px] tracking-[0.4em] text-[var(--gold)] font-semibold mb-5 uppercase">{venue.type}</p>
                    <h3 className="text-2xl mb-5 font-heading group-hover:text-[var(--gold)] transition-colors">{venue.name}</h3>
                    <p className="text-xs text-[#3D3D3D] leading-relaxed font-light">{venue.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-12 text-center bg-[#1C1C1C] text-white">
        <div className="max-w-2xl mx-auto">
          <p className="label !text-[var(--gold)]">Inquiry</p>
          <h2 className="text-5xl mb-8">Exclusive <em>Booking</em></h2>
          <p className="text-white/40 font-light mb-12">
            Through our preferred partnership status, our clients receive priority dates and exclusive amenities at these iconic properties.
          </p>
          <button className="btn-gold">Request Availability</button>
        </div>
      </section>
    </div>
  );
}
