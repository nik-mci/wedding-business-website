"use client";
import { useEffect, useRef } from "react";

export default function Timeline() {
  const pathRef = useRef(null);
  const circlesRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (pathRef.current) pathRef.current.classList.add('drawn');
          const circles = circlesRef.current.querySelectorAll('.step-circle');
          const labels = circlesRef.current.querySelectorAll('.step-label');
          circles.forEach((c, i) => {
            setTimeout(() => {
              c.classList.add('popped');
              labels[i].classList.add('visible');
            }, 400 + i * 350);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    if (circlesRef.current) observer.observe(circlesRef.current);
    return () => observer.disconnect();
  }, []);

  const steps = [
    { num: "01", title: "Discovery", desc: "We listen to your vision, values & dreams for the day" },
    { num: "02", title: "Curation", desc: "We handpick venues, vendors & experiences worldwide" },
    { num: "03", title: "Design", desc: "Every detail is styled to reflect your story" },
    { num: "04", title: "Execution", desc: "Flawless orchestration on the day itself" },
    { num: "05", title: "Memories", desc: "We capture & preserve every magical moment" }
  ];

  return (
    <div className="relative mt-20" ref={circlesRef}>
      <div className="relative flex items-start">
        <svg className="absolute top-8 left-0 w-full h-1 overflow-visible" viewBox="0 0 100 4" preserveAspectRatio="none">
          <line ref={pathRef} className="timeline-path stroke-[var(--gold)]" x1="4" y1="2" x2="96" y2="2" fill="none" strokeWidth="1.5" />
        </svg>
        
        <div className="flex justify-between w-full relative z-10">
          {steps.map((step, i) => (
            <div key={i} className="flex-1 flex flex-col items-center text-center px-4">
              <div className="step-circle w-16 h-16 rounded-full border border-[var(--gold)] flex items-center justify-center bg-[#1C1C1C] text-[var(--gold)] font-heading text-2xl font-light">
                {step.num}
              </div>
              <div className="step-label mt-5 opacity-0 transition-opacity duration-500 delay-200">
                <p className="text-[13px] tracking-widest text-white mb-2 font-medium">{step.title}</p>
                <p className="text-[11px] text-white/45 leading-relaxed font-light">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
