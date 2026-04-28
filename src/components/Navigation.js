"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Services", href: "/services" },
    { name: "Weddings", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Stories", href: "/blog" },
    { name: "Destinations", href: "/destinations" },
    { name: "FAQ", href: "/faq" },
  ];

  const isHome = pathname === "/";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-12 py-6 transition-all duration-400 ${scrolled ? 'bg-surface/92 backdrop-blur-lg shadow-sm border-b border-black/5' : 'bg-transparent'}`}>
      <Link href="/" className={`font-heading text-2xl tracking-[0.12em] transition-colors duration-400 ${(!isHome || scrolled) ? 'text-ink' : 'text-surface'}`}>
        VOWS & VEDAS
      </Link>

      <ul className="hidden md:flex items-center gap-9">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.name} className="relative py-1 group">
              <Link 
                href={link.href} 
                className={`text-[11px] uppercase tracking-[0.18em] font-medium transition-colors duration-300 hover:text-gold ${isActive ? 'text-gold' : (!isHome || scrolled) ? 'text-muted' : 'text-surface/90'}`}
              >
                {link.name}
              </Link>
              <div className={`absolute bottom-0 left-0 h-[1.5px] bg-gold transition-all duration-300 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-50'}`} />
            </li>
          );
        })}
      </ul>

      <Link 
        href="/contact" 
        className={`relative group text-[11px] uppercase tracking-[0.18em] font-medium px-6 py-[10px] border transition-all duration-300 overflow-hidden ${(!isHome || scrolled) ? 'border-gold text-ink' : 'border-surface/60 text-surface'}`}
      >
        <span className="relative z-10 group-hover:text-surface transition-colors duration-300">Begin Your Journey</span>
        <div className="absolute inset-0 bg-gold translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out origin-left"></div>
      </Link>
    </nav>
  );
}
