"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/profile", label: "My Profile", short: "Profile" },
  { href: "/account-settings", label: "Account Settings", short: "Settings" },
  { href: "/notifications", label: "Notifications", short: "Notifications" },
];

const BG_STYLE = {
  backgroundImage:
    "repeating-linear-gradient(-45deg, transparent, transparent 24px, rgba(201,162,52,0.03) 24px, rgba(201,162,52,0.03) 25px)",
};

export default function AccountLayout({ children, unauthed, onSignIn }) {
  const pathname = usePathname();

  if (unauthed) {
    return (
      <div className="pt-[104px] min-h-screen bg-[#FDFAF5] flex items-center justify-center" style={BG_STYLE}>
        <div className="text-center">
          <p className="font-heading text-2xl font-light text-[#1A1408] mb-3">
            Sign in to continue
          </p>
          <button
            onClick={onSignIn}
            className="text-[10px] uppercase tracking-[0.3em] font-medium px-6 py-3 bg-[#C9A234] text-white hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[104px] min-h-screen bg-[#FDFAF5]" style={BG_STYLE}>

      {/* Mobile tab bar — only below xl (1280px) */}
      <div className="xl:hidden border-b border-[#EDE8DC] bg-[#FDFAF5]">
        <div className="max-w-[860px] mx-auto px-4 flex flex-nowrap overflow-x-auto">
          {NAV_ITEMS.map(({ href, short, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                aria-label={label}
                className={`flex-1 text-center py-3 text-[9px] uppercase tracking-[0.2em] border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  active
                    ? "border-[#C9A234] text-[#1A1408]"
                    : "border-transparent text-[#9A8F7E] hover:text-[#C9A234]"
                }`}
              >
                {short}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Page body */}
      <div className="max-w-[1160px] mx-auto px-6 lg:px-10 py-10 xl:flex xl:gap-12">

        {/* Sidebar — only on xl+ */}
        <aside className="hidden xl:block w-[200px] shrink-0 self-start sticky top-[124px]">
          <nav className="flex flex-col gap-0.5">
            {NAV_ITEMS.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center px-4 py-2.5 text-[10px] uppercase tracking-[0.22em] border-l-2 transition-all duration-200 ${
                    active
                      ? "border-[#C9A234] text-[#1A1408] bg-[rgba(201,162,52,0.06)]"
                      : "border-transparent text-[#9A8F7E] hover:text-[#1A1408] hover:border-[#EDE8DC]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 max-w-[860px]">
          {children}
        </main>

      </div>
    </div>
  );
}
