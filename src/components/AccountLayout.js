"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/profile", label: "My Profile" },
  { href: "/account-settings", label: "Account Settings" },
  { href: "/notifications", label: "Notifications" },
];

// Diagonal line texture at 3% opacity
const BG_STYLE = {
  backgroundImage:
    "repeating-linear-gradient(-45deg, transparent, transparent 24px, rgba(201,162,52,0.03) 24px, rgba(201,162,52,0.03) 25px)",
};

export default function AccountLayout({ children, userName, userEmail, unauthed, onSignIn }) {
  const pathname = usePathname();

  const initials = userName
    ? userName
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : userEmail
    ? userEmail[0].toUpperCase()
    : "A";

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
      {/* Mobile tab bar */}
      <div className="lg:hidden border-b border-[#EDE8DC] bg-[#FDFAF5]">
        <div className="max-w-[1100px] mx-auto px-4 flex flex-nowrap overflow-x-auto">
          {NAV_ITEMS.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex-1 text-center py-3 text-[9px] uppercase tracking-[0.2em] border-b-2 transition-colors duration-200 whitespace-nowrap ${
                  active
                    ? "border-[#C9A234] text-[#1A1408]"
                    : "border-transparent text-[#9A8F7E] hover:text-[#C9A234]"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 lg:px-10 py-10 flex gap-12">
        {/* Sidebar */}
        <aside className="hidden lg:flex flex-col w-[220px] shrink-0">
          {/* Monogram + user info */}
          <div className="mb-8 flex flex-col gap-3">
            <div className="w-[52px] h-[52px] rounded-full bg-[#C9A234] flex items-center justify-center shadow-[0_2px_12px_rgba(201,162,52,0.3)]">
              <span className="font-heading text-[20px] font-light text-white tracking-wide">
                {initials}
              </span>
            </div>
            {(userName || userEmail) && (
              <div>
                {userName && (
                  <p className="font-heading text-[16px] font-light text-[#1A1408] leading-snug">
                    {userName}
                  </p>
                )}
                {userEmail && (
                  <p className="text-[11px] text-[#9A8F7E] mt-0.5 leading-snug break-all">
                    {userEmail}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Nav items */}
          <nav className="flex flex-col gap-0.5">
            {NAV_ITEMS.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`group flex items-center px-4 py-2.5 text-[10px] uppercase tracking-[0.22em] border-l-2 transition-all duration-200 ${
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
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
