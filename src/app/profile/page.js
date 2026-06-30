"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, Check, CalendarDays } from "lucide-react";
import AccountHero from "@/components/AccountHero";

const GUEST_OPTIONS = ["Under 50", "50–100", "100–200", "200–400", "400+"];
const BUDGET_OPTIONS = ["Under ₹20L", "₹20–40L", "₹40–75L", "₹75L–1Cr", "Above ₹1Cr"];
const STYLE_TAGS = [
  { label: "Royal Indian", icon: "👑" },
  { label: "Boho", icon: "🌿" },
  { label: "Garden", icon: "🌸" },
  { label: "Beach", icon: "🌊" },
  { label: "Heritage", icon: "🏰" },
  { label: "Contemporary", icon: "🏙️" },
  { label: "Intimate", icon: "💫" },
  { label: "Grand", icon: "✨" },
];

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d)) return null;
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function getDaysUntil(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (isNaN(d)) return null;
  return Math.ceil((d - new Date()) / (1000 * 60 * 60 * 24));
}

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    partnerName: "",
    weddingDate: "",
    guestCount: "",
    budgetRange: "",
    preferredStyle: [],
  });

  useEffect(() => {
    fetch("/api/user/profile")
      .then(async (r) => {
        if (r.status === 401) { setAuthed(false); return; }
        const { user } = await r.json();
        if (user) {
          setForm({
            firstName: user.firstName ?? "",
            lastName: user.lastName ?? "",
            partnerName: user.partnerName ?? "",
            weddingDate: user.weddingDate ?? "",
            guestCount: user.guestCount ?? "",
            budgetRange: user.budgetRange ?? "",
            preferredStyle: user.preferredStyle ?? [],
          });
        }
      })
      .catch(() => setError("Failed to load profile."))
      .finally(() => setLoading(false));
  }, []);

  function set(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function toggleStyle(tag) {
    setForm((prev) => ({
      ...prev,
      preferredStyle: prev.preferredStyle.includes(tag)
        ? prev.preferredStyle.filter((t) => t !== tag)
        : [...prev.preferredStyle, tag],
    }));
    setSaved(false);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (!authed) {
    return (
      <div className="pt-[104px] min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <p className="font-heading text-2xl font-light text-[#1C1712] mb-3">Sign in to view your profile</p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("openProfileDropdown"))}
            className="text-[10px] uppercase tracking-[0.3em] font-medium px-6 py-3 bg-[#B8962E] text-[#FAF7F2] hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const days = getDaysUntil(form.weddingDate);
  const heroName = form.firstName ? `${form.firstName}'s Wedding Studio` : "Your Wedding Studio";
  const initA = form.firstName?.[0]?.toUpperCase() || "A";
  const initB = form.partnerName?.[0]?.toUpperCase() || "?";

  const countdown = (
    <div className="text-right">
      {days !== null ? (
        <>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#B8962E] mb-1">Your day is in</p>
          <p className="font-heading text-[56px] font-light text-[#1C1712] leading-none">
            {days > 0 ? days : 0}
          </p>
          <p className="text-[13px] text-[#9A8F7E] mt-1">days</p>
        </>
      ) : (
        <p className="text-[14px] text-[#9A8F7E] font-light">Set your date ✦</p>
      )}
    </div>
  );

  return (
    <div className="pt-[104px] min-h-screen bg-[#FAF7F2]">
      <AccountHero title={heroName} right={countdown} />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left: Your Wedding Vision */}
          <div className="lg:col-span-2">
            <div
              className="lg:sticky lg:top-[124px] rounded-lg p-8 flex flex-col gap-5"
              style={{ background: "#1C1712", border: "1px solid rgba(184,150,46,0.3)" }}
            >
              {/* Monogram + names */}
              <div
                className="flex flex-col items-center gap-3 pb-6"
                style={{ borderBottom: "1px solid rgba(184,150,46,0.2)" }}
              >
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ border: "1px solid rgba(184,150,46,0.55)" }}
                >
                  <span className="font-heading text-[18px] font-light text-[#B8962E] tracking-widest">
                    {initA} & {initB}
                  </span>
                </div>
                <p className="font-heading text-[22px] font-light italic text-[#FAF7F2] text-center leading-snug">
                  {form.firstName || "You"} & {form.partnerName || "Your Partner"}
                </p>
              </div>

              {/* Details */}
              <div className="flex flex-col gap-4">
                {[
                  { label: "Date", value: formatDate(form.weddingDate) || "Not set yet" },
                  { label: "Guests", value: form.guestCount || "Not set yet" },
                  { label: "Budget", value: form.budgetRange || "Not set yet" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p
                      className="text-[9px] uppercase tracking-[0.3em] mb-0.5"
                      style={{ color: "rgba(184,150,46,0.65)" }}
                    >
                      {label}
                    </p>
                    <p className="flex items-center gap-2 text-[14px] text-[#FAF7F2] font-light">
                      <span className="text-[#B8962E] text-[9px]">✦</span>
                      {value}
                    </p>
                  </div>
                ))}

                {form.preferredStyle.length > 0 && (
                  <div>
                    <p
                      className="text-[9px] uppercase tracking-[0.3em] mb-2"
                      style={{ color: "rgba(184,150,46,0.65)" }}
                    >
                      Style
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {form.preferredStyle.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2.5 py-1 font-light text-[#B8962E]"
                          style={{ border: "1px solid rgba(184,150,46,0.35)", borderRadius: "2px" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Editable form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSave} className="flex flex-col gap-6">

              {/* About You */}
              <div
                className="bg-white rounded-lg p-8 md:p-10"
                style={{ border: "1px solid rgba(184,150,46,0.2)" }}
              >
                <SectionLabel>About You</SectionLabel>
                {loading ? (
                  <Skeleton rows={3} />
                ) : (
                  <div className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <LuxuryInput label="First Name" value={form.firstName} onChange={(v) => set("firstName", v)} placeholder="Your first name" />
                      <LuxuryInput label="Last Name" value={form.lastName} onChange={(v) => set("lastName", v)} placeholder="Your last name" />
                    </div>
                    <LuxuryInput label="Partner's Name" value={form.partnerName} onChange={(v) => set("partnerName", v)} placeholder="Their name" />
                  </div>
                )}
              </div>

              {/* Your Wedding */}
              <div
                className="bg-white rounded-lg p-8 md:p-10"
                style={{ border: "1px solid rgba(184,150,46,0.2)" }}
              >
                <SectionLabel>Your Wedding</SectionLabel>
                {loading ? (
                  <Skeleton rows={4} />
                ) : (
                  <div className="flex flex-col gap-6">
                    <LuxuryDateField
                      label="Wedding Date"
                      value={form.weddingDate}
                      onChange={(v) => set("weddingDate", v)}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <LuxurySelect label="Guest Count" value={form.guestCount} onChange={(v) => set("guestCount", v)} options={GUEST_OPTIONS} placeholder="Select a range" />
                      <LuxurySelect label="Budget Range" value={form.budgetRange} onChange={(v) => set("budgetRange", v)} options={BUDGET_OPTIONS} placeholder="Select a range" />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#B8962E] mb-3">
                        Wedding Style
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {STYLE_TAGS.map(({ label, icon }) => {
                          const active = form.preferredStyle.includes(label);
                          return (
                            <button
                              key={label}
                              type="button"
                              onClick={() => toggleStyle(label)}
                              className={`flex items-center gap-1.5 px-3.5 py-2 text-[11px] font-light transition-all duration-200 rounded-sm ${
                                active
                                  ? "bg-[#B8962E] text-[#FAF7F2]"
                                  : "bg-transparent text-[#9A8F7E] hover:bg-[#B8962E] hover:text-[#FAF7F2]"
                              }`}
                              style={{ border: "1px solid rgba(184,150,46,0.4)" }}
                            >
                              <span>{icon}</span>
                              <span className="uppercase tracking-[0.1em]">{label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Save */}
              <div className="flex items-center justify-end gap-4">
                {saved && (
                  <span className="flex items-center gap-1.5 text-[13px] text-[#5A8A5A]">
                    <Check size={14} /> Profile saved ✦
                  </span>
                )}
                {error && <span className="text-[13px] text-red-500">{error}</span>}
                <button
                  type="submit"
                  disabled={saving || loading}
                  className="h-12 px-10 bg-[#B8962E] hover:bg-[#9A7A20] text-[#FAF7F2] font-body text-[11px] uppercase tracking-[0.25em] transition-all duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? <><Loader2 size={13} className="animate-spin" /> Saving…</> : "Save Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom nav */}
        <div
          className="mt-10 pt-6 flex justify-between"
          style={{ borderTop: "1px solid rgba(184,150,46,0.15)" }}
        >
          <Link href="/my-enquiries" className="text-[11px] uppercase tracking-[0.25em] text-[#B8962E] hover:opacity-70 transition-opacity">
            ← My Enquiries
          </Link>
          <Link href="/account-settings" className="text-[11px] uppercase tracking-[0.25em] text-[#9A8F7E] hover:text-[#B8962E] transition-colors">
            Account Settings →
          </Link>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="text-[11px] uppercase tracking-[0.2em] text-[#B8962E] shrink-0">{children}</span>
      <div className="flex-1 h-px bg-[rgba(184,150,46,0.25)]" />
    </div>
  );
}

function LuxuryInput({ label, value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#B8962E] mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full bg-transparent pb-3 text-[15px] text-[#1C1712] placeholder:text-[#C4BAA8] outline-none transition-all duration-200"
        style={{
          borderBottom: `1px solid ${focused ? "#B8962E" : "rgba(184,150,46,0.35)"}`,
          boxShadow: focused ? "0 2px 0 rgba(184,150,46,0.15)" : "none",
        }}
      />
    </div>
  );
}

function LuxuryDateField({ label, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#B8962E] mb-2">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent pb-3 text-[15px] text-[#1C1712] outline-none transition-all duration-200 pr-6"
          style={{
            borderBottom: `1px solid ${focused ? "#B8962E" : "rgba(184,150,46,0.35)"}`,
            colorScheme: "light",
          }}
        />
        <CalendarDays size={14} className="absolute right-0 bottom-3 text-[#B8962E] pointer-events-none" />
      </div>
    </div>
  );
}

function LuxurySelect({ label, value, onChange, options, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#B8962E] mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent pb-3 text-[15px] text-[#1C1712] outline-none appearance-none cursor-pointer transition-all duration-200 pr-5"
          style={{
            borderBottom: `1px solid ${focused ? "#B8962E" : "rgba(184,150,46,0.35)"}`,
          }}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <span className="absolute right-0 bottom-3 text-[#B8962E] text-[11px] pointer-events-none">▾</span>
      </div>
    </div>
  );
}

function Skeleton({ rows = 2 }) {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-10 bg-[#F0EBE1] rounded-sm" />
      ))}
    </div>
  );
}
