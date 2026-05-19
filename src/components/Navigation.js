"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import ProfileDropdown from "@/components/global/ProfileDropdown";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileSubmenu(null);
  }, [pathname]);

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [mobileOpen]);

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
  const onDarkHero = hasDarkHero && !scrolled && !mobileOpen;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[100] isolate flex items-center justify-between pl-4 pr-4 sm:pl-8 sm:pr-6 md:pl-[112px] md:pr-12 py-2 transition-all duration-400 ${scrolled ? 'bg-surface/92 backdrop-blur-lg shadow-sm border-b border-black/5' : 'bg-transparent'}`}>
        <Link href="/" className="relative h-[68px] w-[214px] md:h-[96px] md:w-[301px] group">
          <Image
            src="/assets/photos/V&V_A_PNG.png"
            alt="Vows & Vedas"
            fill
            sizes="(min-width: 768px) 301px, 214px"
            className={`object-contain transition-all duration-400 group-hover:scale-105 ${(!hasDarkHero || scrolled) ? '' : 'brightness-0 invert opacity-90'}`}
            priority
          />
        </Link>

        <ul className="hidden md:flex items-center gap-12">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.name} className="relative py-1 group">
                <Link
                  href={link.href}
                  className={`text-[13px] uppercase tracking-[0.24em] font-medium transition-colors duration-300 hover:text-gold ${isActive ? 'text-gold' : (!hasDarkHero || scrolled) ? 'text-muted' : 'text-surface/90'}`}
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
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          <div className="hidden md:block">
            <ProfileDropdown />
          </div>

          <Link
            href="/contact"
            className={`hidden sm:inline-block relative group text-[13px] uppercase tracking-[0.24em] font-medium px-4 py-2 md:px-6 md:py-[10px] border transition-all duration-300 overflow-hidden ${(!hasDarkHero || scrolled) ? 'border-gold text-ink' : 'border-surface/60 text-surface'}`}
          >
            <span className="relative z-10 group-hover:text-surface transition-colors duration-300">Begin Your Journey</span>
            <div className="absolute inset-0 bg-gold translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out origin-left"></div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            className={`md:hidden flex items-center justify-center w-10 h-10 -mr-2 ${onDarkHero ? 'text-surface' : 'text-ink'}`}
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-[110] bg-bg flex flex-col transition-opacity duration-300 ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between pl-4 pr-4 py-2 border-b border-ink/5">
          <Link href="/" className="relative h-[68px] w-[214px]" onClick={() => setMobileOpen(false)}>
            <Image
              src="/assets/photos/V&V_A_PNG.png"
              alt="Vows & Vedas"
              fill
              sizes="214px"
              className="object-contain"
            />
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            className="flex items-center justify-center w-10 h-10 -mr-2 text-ink"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        <ul className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isSubOpen = mobileSubmenu === link.name;
            return (
              <li key={link.name} className="border-b border-ink/5 last:border-b-0">
                {link.submenu ? (
                  <>
                    <div className="flex items-stretch">
                      <Link
                        href={link.href}
                        className={`flex-1 py-4 text-[14px] uppercase tracking-[0.22em] font-medium transition-colors ${isActive ? 'text-gold' : 'text-ink'}`}
                      >
                        {link.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileSubmenu(isSubOpen ? null : link.name)}
                        aria-label={`Toggle ${link.name} submenu`}
                        aria-expanded={isSubOpen}
                        className="flex items-center justify-center w-12 text-muted"
                      >
                        <ChevronDown size={18} strokeWidth={1.5} className={`transition-transform duration-300 ${isSubOpen ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                    <div className={`overflow-hidden transition-all duration-300 ease-out ${isSubOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>
                      <ul className="flex flex-col gap-1 pb-4 pl-2">
                        {link.submenu.map((sublink) => (
                          <li key={sublink.name}>
                            <Link
                              href={sublink.href}
                              className="block py-2.5 text-[11px] tracking-[0.2em] uppercase text-muted hover:text-gold transition-colors"
                            >
                              {sublink.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className={`block py-4 text-[14px] uppercase tracking-[0.22em] font-medium transition-colors ${isActive ? 'text-gold' : 'text-ink'}`}
                  >
                    {link.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <div className="px-6 py-6 border-t border-ink/5 flex items-center justify-between gap-4">
          <ProfileDropdown />
          <Link
            href="/contact"
            className="flex-1 text-center text-[11px] uppercase tracking-[0.22em] font-medium px-4 py-3 border border-gold text-ink"
          >
            Begin Your Journey
          </Link>
        </div>
      </div>
    </>
  );
}
