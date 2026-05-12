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
  X
} from "lucide-react";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For demo purposes
  const dropdownRef = useRef(null);

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

  // Close on Escape key
  useEffect(() => {
    function handleEsc(event) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Mock User Data
  const user = {
    firstName: "Arjun",
    lastName: "Kapoor",
    email: "arjun.kapoor@example.com",
    initials: "AK"
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* PROFILE ICON BUTTON */}
      <button
        onClick={toggleDropdown}
        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 border cursor-pointer overflow-hidden ${
          isLoggedIn 
            ? "bg-[#FFF8EC] border-[#C9A234]" 
            : "bg-white border-[#EDE8DC] hover:border-[#C9A234]"
        }`}
      >
        {isLoggedIn ? (
          <span className="font-heading text-sm text-[#C9A234] pt-0.5">{user.initials}</span>
        ) : (
          <User size={18} className="text-[#9A8F7E]" strokeWidth={1.5} />
        )}
      </button>

      {/* DROPDOWN PANEL (Desktop) */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Desktop View */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="hidden md:block absolute right-0 mt-3 w-[260px] bg-white border border-[#EDE8DC] rounded-xl shadow-[0_16px_40px_rgba(0,0,0,0.10)] overflow-hidden z-[1100]"
            >
              {isLoggedIn ? (
                <LoggedInContent user={user} setIsLoggedIn={setIsLoggedIn} />
              ) : (
                <LoggedOutContent setIsLoggedIn={setIsLoggedIn} />
              )}
            </motion.div>

            {/* Mobile View (Full Screen Slide-in) */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="md:hidden fixed inset-0 bg-[#FDFAF5] z-[2000] flex flex-col"
            >
              <div className="flex justify-end p-6 border-bottom border-[#EDE8DC]">
                <button onClick={() => setIsOpen(false)} className="p-2 text-[#1A1408]">
                  <X size={24} />
                </button>
              </div>
              <div className="flex-grow overflow-y-auto">
                {isLoggedIn ? (
                  <LoggedInContent user={user} setIsLoggedIn={setIsLoggedIn} isMobile />
                ) : (
                  <LoggedOutContent setIsLoggedIn={setIsLoggedIn} isMobile />
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function LoggedInContent({ user, setIsLoggedIn, isMobile }) {
  return (
    <div className="flex flex-col">
      {/* Identity Block */}
      <div className="bg-[#FDFAF5] border-b border-[#EDE8DC] p-5 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full border border-[#C9A234] flex items-center justify-center bg-white">
          <span className="font-heading text-base text-[#C9A234] pt-0.5">{user.initials}</span>
        </div>
        <div className="flex flex-col min-w-0">
          <p className="font-body text-[13px] font-bold text-[#1A1408] truncate">
            {user.firstName} {user.lastName}
          </p>
          <p className="font-body text-[11px] text-[#9A8F7E] truncate">
            {user.email}
          </p>
        </div>
      </div>

      {/* Account Section */}
      <div className="py-2">
        <p className="px-5 py-2 text-[9px] uppercase tracking-[0.3em] text-[#9A8F7E] font-bold">Account</p>
        <DropdownItem icon={<User size={16} />} label="My Profile" />
        <DropdownItem icon={<Settings size={16} />} label="Account Settings" />
        <DropdownItem icon={<Bell size={16} />} label="Notifications" />
      </div>

      {/* Saved Section */}
      <div className="py-2 border-t border-[#EDE8DC]">
        <p className="px-5 py-2 text-[9px] uppercase tracking-[0.3em] text-[#9A8F7E] font-bold">Saved</p>
        <DropdownItem icon={<Heart size={16} />} label="Saved Ideas" />
        <DropdownItem icon={<MessageSquare size={16} />} label="My Enquiries" />
      </div>

      {/* Support Section */}
      <div className="py-2 border-t border-[#EDE8DC]">
        <DropdownItem icon={<HelpCircle size={16} />} label="Help & FAQ" />
        <DropdownItem icon={<Mail size={16} />} label="Contact Us" />
      </div>

      {/* Sign Out */}
      <div className="py-2 border-t border-[#EDE8DC]">
        <button 
          onClick={() => setIsLoggedIn(false)}
          className="w-full flex items-center gap-4 px-5 py-2.5 text-[13px] text-[#E87B3A] font-body hover:bg-[#FFF3E0] transition-colors duration-150"
        >
          <LogOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}

function LoggedOutContent({ setIsLoggedIn, isMobile }) {
  return (
    <div className="flex flex-col">
      {/* Welcome Block */}
      <div className="bg-[#FDFAF5] border-b border-[#EDE8DC] p-5 flex flex-col items-center text-center">
        <div className="w-8 h-8 rounded-full border border-[#C9A234] flex items-center justify-center bg-white mb-3 text-[#C9A234]">
          <User size={18} strokeWidth={2} />
        </div>
        <h3 className="font-heading text-lg text-[#1A1408]">Welcome</h3>
        <p className="font-body text-[12px] text-[#9A8F7E] mt-1 leading-relaxed">
          Sign in to save ideas and track your enquiries
        </p>
      </div>

      {/* Auth Buttons */}
      <div className="p-4 flex flex-col gap-2">
        <button 
          onClick={() => setIsLoggedIn(true)}
          className="w-full h-10 bg-[#C9A234] text-white font-body text-[11px] uppercase tracking-[0.3em] font-bold rounded-sm transition-opacity hover:opacity-90"
        >
          Sign In
        </button>
        <button className="w-full h-10 bg-transparent border border-[#C9A234] text-[#C9A234] font-body text-[11px] uppercase tracking-[0.3em] font-bold rounded-sm transition-colors hover:bg-[#C9A234]/5">
          Create Account
        </button>
      </div>
    </div>
  );
}

function DropdownItem({ icon, label }) {
  return (
    <button className="w-full flex items-center gap-4 px-5 py-2.5 text-[13px] text-[#1A1408] font-body hover:bg-[#FDFAF5] hover:text-[#C9A234] transition-all duration-150 group">
      <span className="text-[#9A8F7E] group-hover:text-[#C9A234] transition-colors">{icon}</span>
      <span>{label}</span>
    </button>
  );
}
