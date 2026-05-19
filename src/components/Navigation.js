"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import ProfileDropdown from "@/components/global/ProfileDropdown";

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
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/portfolio" },
    { 
      name: "Destinations", 
      href: "/destinations",
      submenu: [
        { name: "Beach and Backwaters", href: "/destinations/beach-weddings" },
        { name: "Hills Weddings", href: "/destinations/hills-weddings" },
        { name: "Royal and Heritage", href: "/destinations/royal-and-heritage" },
        { name: "Cities and Metropolitans", href: "/destinations/cities-and-metropolitans" }
      ]
    },
    { name: "FAQ", href: "/faq" },
  ];

  const isHome = pathname === "/";
  const darkHeroRoutes = ["/services", "/destinations", "/portfolio", "/faq"];
  const hasDarkHero =
    isHome || darkHeroRoutes.some((r) => pathname === r || pathname.startsWith(r + "/"));

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] isolate flex items-center justify-between pl-[112px] pr-12 py-4 transition-all duration-400 ${scrolled ? 'bg-surface/92 backdrop-blur-lg shadow-sm border-b border-black/5' : 'bg-transparent'}`}>
      <Link href="/" className="relative h-14 w-44 group">
        <Image
          src="/assets/photos/V&V_A_PNG.png"
          alt="Vows & Vedas"
          fill
          className={`object-contain transition-all duration-400 group-hover:scale-105 ${(!hasDarkHero || scrolled) ? '' : 'brightness-0 invert opacity-90'}`}
          priority
        />
      </Link>

      <ul className="hidden md:flex items-center gap-9">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <li key={link.name} className="relative py-1 group">
              <Link 
                href={link.href} 
                className={`text-[11px] uppercase tracking-[0.18em] font-medium transition-colors duration-300 hover:text-gold ${isActive ? 'text-gold' : (!hasDarkHero || scrolled) ? 'text-muted' : 'text-surface/90'}`}
              >
                {link.name}
              </Link>
              <div className={`absolute bottom-0 left-0 h-[1.5px] bg-gold transition-all duration-300 ${isActive ? 'w-full opacity-100' : 'w-0 opacity-0 group-hover:w-full group-hover:opacity-50'}`} />
              
              {link.submenu && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
                  <div className="w-[200px] bg-surface border border-ink/5 shadow-xl">
                    <ul className="p-2 flex flex-col gap-1">
                      {link.submenu.map((sublink) => (
                        <li key={sublink.name}>
                          <Link 
                            href={sublink.href}
                            className="block px-4 py-2.5 text-[9px] tracking-[0.2em] uppercase text-muted transition-all duration-300 border border-transparent rounded-[6px] hover:border-[#C8A84B] hover:bg-[rgba(200,168,75,0.08)] hover:shadow-[0_0_12px_rgba(200,168,75,0.35)] hover:text-[#C8A84B] hover:translate-x-1"
                          >
                            {sublink.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {/* Profile & CTA Group */}
      <div className="flex items-center gap-6">
        <div className="hidden md:block">
          <ProfileDropdown />
        </div>

        <Link 
          href="/contact" 
          className={`relative group text-[11px] uppercase tracking-[0.18em] font-medium px-6 py-[10px] border transition-all duration-300 overflow-hidden ${(!hasDarkHero || scrolled) ? 'border-gold text-ink' : 'border-surface/60 text-surface'}`}
        >
          <span className="relative z-10 group-hover:text-surface transition-colors duration-300">Begin Your Journey</span>
          <div className="absolute inset-0 bg-gold translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out origin-left"></div>
        </Link>
      </div>
    </nav>
  );
}
