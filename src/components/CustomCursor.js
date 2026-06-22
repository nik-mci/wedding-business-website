"use client";
import { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const curRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    const onMouseMove = (e) => {
      if (curRef.current) {
        curRef.current.style.left = `${e.clientX}px`;
        curRef.current.style.top = `${e.clientY}px`;
      }
      if (ringRef.current) {
        // Simple smoothing for the ring
        ringRef.current.style.left = `${e.clientX}px`;
        ringRef.current.style.top = `${e.clientY}px`;
      }
    };

    const onMouseEnter = () => setIsHovered(true);
    const onMouseLeave = () => setIsHovered(false);

    window.addEventListener("mousemove", onMouseMove);
    
    const targets = document.querySelectorAll("a, button, .interactive");
    targets.forEach(t => {
      t.addEventListener("mouseenter", onMouseEnter);
      t.addEventListener("mouseleave", onMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      targets.forEach(t => {
        t.removeEventListener("mouseenter", onMouseEnter);
        t.removeEventListener("mouseleave", onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={curRef}
        className={`cursor-dot fixed w-2 h-2 bg-gold rounded-full pointer-events-none z-[100000] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background] duration-300 ${isHovered ? 'w-3 h-3' : ''}`}
      />
      <div
        ref={ringRef}
        className={`cursor-ring fixed w-8 h-8 border border-gold rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 transition-[width,height,opacity] duration-300 ease-out ${isHovered ? 'w-12 h-12 opacity-40' : 'opacity-60'}`}
        style={{ transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94), width 0.3s, height 0.3s, opacity 0.3s' }}
      />
    </>
  );
}
