"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Settings,
  Bell,
  Heart,
  MessageSquare,
  HelpCircle,
  Mail,
  LogOut,
  X,
  Loader2,
} from "lucide-react";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);       // null = logged out, object = logged in
  const [loading, setLoading] = useState(true); // initial session fetch
  const dropdownRef = useRef(null);

  // Fetch real session on mount
  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then((data) => setUser(data.user ?? null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Open programmatically (e.g. from guest heart-click on Ideas page)
  useEffect(() => {
    function handleOpen() { setIsOpen(true); }
    window.addEventListener("openProfileDropdown", handleOpen);
    return () => window.removeEventListener("openProfileDropdown", handleOpen);
  }, []);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleEsc(event) {
      if (event.key === "Escape") setIsOpen(false);
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const initials = user
    ? `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase() || user.email?.[0]?.toUpperCase() || "?"
    : null;

  async function handleSignOut() {
    await fetch("/api/auth/signout", { method: "POST" });
    setUser(null);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile icon button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border cursor-pointer overflow-hidden ${
          user
            ? "bg-[#FFF8EC] border-[#C9A234]"
            : "bg-white border-[#EDE8DC] hover:border-[#C9A234]"
        }`}
      >
        {loading ? (
          <Loader2 size={14} className="text-[#9A8F7E] animate-spin" />
        ) : user ? (
          <span className="font-heading text-sm text-[#C9A234] pt-0.5">{initials}</span>
        ) : (
          <User size={18} className="text-[#9A8F7E]" strokeWidth={1.5} />
        )}
      </button>

      {/* Panels */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Desktop dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="hidden md:block absolute right-0 mt-3 w-[260px] bg-white border border-[#EDE8DC] rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.10)] overflow-hidden z-[1100]"
            >
              {user ? (
                <LoggedInContent user={user} initials={initials} onSignOut={handleSignOut} />
              ) : (
                <LoggedOutContent onLogin={setUser} />
              )}
            </motion.div>

            {/* Mobile full-screen slide-in */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed inset-0 bg-[#FDFAF5] z-[2000] flex flex-col"
            >
              <div className="flex justify-end p-6 border-b border-[#EDE8DC]">
                <button onClick={() => setIsOpen(false)} className="p-2 text-[#1A1408]">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto">
                {user ? (
                  <LoggedInContent user={user} initials={initials} onSignOut={handleSignOut} isMobile />
                ) : (
                  <LoggedOutContent onLogin={setUser} isMobile />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function LoggedInContent({ user, initials, onSignOut, isMobile }) {
  return (
    <div className="flex flex-col">
      {/* Identity block */}
      <div className="bg-[#FDFAF5] border-b border-[#EDE8DC] p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full border border-[#C9A234] flex items-center justify-center bg-white shrink-0">
          <span className="font-heading text-base text-[#C9A234] pt-0.5">{initials}</span>
        </div>
        <div className="flex flex-col min-w-0">
          <p className="font-body text-[13px] font-bold text-[#1A1408] truncate">
            {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email}
          </p>
          <p className="font-body text-[11px] text-[#9A8F7E] truncate">{user.email}</p>
        </div>
      </div>

      {/* Account */}
      <div className="py-2">
        <p className="px-5 py-2 text-[9px] uppercase tracking-[0.3em] text-[#9A8F7E] font-bold">Account</p>
        <DropdownItem icon={<User size={16} />} label="My Profile" />
        <DropdownItem icon={<Settings size={16} />} label="Account Settings" />
        <DropdownItem icon={<Bell size={16} />} label="Notifications" />
      </div>

      {/* Saved */}
      <div className="py-2 border-t border-[#EDE8DC]">
        <p className="px-5 py-2 text-[9px] uppercase tracking-[0.3em] text-[#9A8F7E] font-bold">Saved</p>
        <DropdownItem icon={<Heart size={16} />} label="Saved Ideas" href="/saved-ideas" />
        <DropdownItem icon={<MessageSquare size={16} />} label="My Enquiries" href="/my-enquiries" />
      </div>

      {/* Support */}
      <div className="py-2 border-t border-[#EDE8DC]">
        <DropdownItem icon={<HelpCircle size={16} />} label="Help & FAQ" href="/faq" />
        <DropdownItem icon={<Mail size={16} />} label="Contact Us" href="/contact" />
      </div>

      {/* Sign out */}
      <div className="py-2 border-t border-[#EDE8DC]">
        <button
          onClick={onSignOut}
          className="w-full flex items-center gap-4 px-5 py-2.5 text-[13px] text-[#E87B3A] font-body hover:bg-[#FFF3E0] transition-colors duration-150"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

function LoggedOutContent({ onLogin, isMobile }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/auth/send-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      setStatus(data.sent ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col">
      {/* Welcome block */}
      <div className="bg-[#FDFAF5] border-b border-[#EDE8DC] p-5 flex flex-col items-center text-center">
        <div className="w-8 h-8 rounded-full border border-[#C9A234] flex items-center justify-center bg-white mb-3 text-[#C9A234]">
          <User size={18} strokeWidth={2} />
        </div>
        <h3 className="font-heading text-lg text-[#1A1408]">Welcome</h3>
        <p className="font-body text-[12px] text-[#9A8F7E] mt-1 leading-relaxed">
          Sign in to save ideas and track your enquiries
        </p>
      </div>

      {/* Form / states */}
      <div className="p-4">
        {status === "sent" ? (
          <div className="text-center py-2">
            <p className="font-body text-[13px] text-[#1A1408] font-semibold mb-1">Check your inbox</p>
            <p className="font-body text-[11px] text-[#9A8F7E] leading-relaxed">
              We sent a sign-in link to <span className="text-[#C9A234]">{email}</span>. It expires in 15 minutes.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="w-full h-10 px-3 border border-[#EDE8DC] rounded-sm font-body text-[13px] text-[#1A1408] placeholder:text-[#C4BAA8] focus:outline-none focus:border-[#C9A234] transition-colors bg-white"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full h-10 bg-[#C9A234] text-white font-body text-[11px] uppercase tracking-[0.3em] font-bold rounded-sm transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {status === "sending" ? (
                <><Loader2 size={14} className="animate-spin" /> Sending…</>
              ) : (
                "Send Sign-in Link"
              )}
            </button>
            {status === "error" && (
              <p className="font-body text-[11px] text-[#E87B3A] text-center">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

function DropdownItem({ icon, label, href }) {
  const cls = "w-full flex items-center gap-4 px-5 py-2.5 text-[13px] text-[#1A1408] font-body hover:bg-[#FDFAF5] hover:text-[#C9A234] transition-all duration-150 group";
  const inner = (
    <>
      <span className="text-[#9A8F7E] group-hover:text-[#C9A234] transition-colors">{icon}</span>
      <span>{label}</span>
    </>
  );
  return href ? (
    <Link href={href} className={cls}>{inner}</Link>
  ) : (
    <button className={cls}>{inner}</button>
  );
}
