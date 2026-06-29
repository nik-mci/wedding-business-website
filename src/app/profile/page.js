"use client";

import { useState, useEffect } from "react";
import { Loader2, Check, CalendarDays } from "lucide-react";
import AccountLayout from "@/components/AccountLayout";

const GUEST_OPTIONS = ["Under 50", "50–100", "100–200", "200–400", "400+"];
const BUDGET_OPTIONS = ["Under ₹20L", "₹20–40L", "₹40–75L", "₹75L–1Cr", "Above ₹1Cr"];
const STYLE_TAGS = ["Royal Indian", "Boho", "Garden", "Beach", "Heritage", "Contemporary", "Intimate", "Grand"];

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
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const userName = [form.firstName, form.lastName].filter(Boolean).join(" ") || undefined;

  return (
    <AccountLayout
      userName={userName}
      unauthed={!authed}
      onSignIn={() => window.dispatchEvent(new CustomEvent("openProfileDropdown"))}
    >
      {/* Page heading */}
      <div className="mb-7">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A234] mb-1 font-medium">
          My Account
        </p>
        <h1 className="font-heading text-[42px] font-light text-[#1A1408] leading-none">
          My Profile
        </h1>
        <div className="mt-3 w-[60px] h-px bg-[#C9A234]" />
      </div>

      <form onSubmit={handleSave}>
        <div
          className="bg-[#FDFAF5]"
          style={{
            border: "1px solid rgba(201,162,52,0.25)",
            boxShadow: "0 4px 40px rgba(28,15,10,0.07)",
            borderRadius: "2px",
          }}
        >
          {/* About You */}
          <div className="px-10 pt-9 pb-8">
            <SectionHeader>About You</SectionHeader>
            {loading ? (
              <Skeleton rows={2} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-6 mt-6">
                <LineField
                  label="First Name"
                  value={form.firstName}
                  onChange={(v) => set("firstName", v)}
                  placeholder="Your first name"
                />
                <LineField
                  label="Last Name"
                  value={form.lastName}
                  onChange={(v) => set("lastName", v)}
                  placeholder="Your last name"
                />
                <LineField
                  label="Partner's Name"
                  value={form.partnerName}
                  onChange={(v) => set("partnerName", v)}
                  placeholder="Their name"
                />
              </div>
            )}
          </div>

          {/* Ornamental divider */}
          <div className="flex items-center gap-3 px-10">
            <div className="flex-1 h-px bg-[rgba(201,162,52,0.2)]" />
            <span className="text-[#C9A234] text-[10px] tracking-[0.3em]">◆</span>
            <div className="flex-1 h-px bg-[rgba(201,162,52,0.2)]" />
          </div>

          {/* Your Wedding */}
          <div className="px-10 pt-8 pb-9">
            <SectionHeader>Your Wedding</SectionHeader>
            {loading ? (
              <Skeleton rows={3} />
            ) : (
              <div className="flex flex-col gap-6 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-6">
                  <DateField
                    label="Wedding Date"
                    value={form.weddingDate}
                    onChange={(v) => set("weddingDate", v)}
                  />
                  <LineSelectField
                    label="Guest Count"
                    value={form.guestCount}
                    onChange={(v) => set("guestCount", v)}
                    options={GUEST_OPTIONS}
                    placeholder="Select a range"
                  />
                  <LineSelectField
                    label="Budget Range"
                    value={form.budgetRange}
                    onChange={(v) => set("budgetRange", v)}
                    options={BUDGET_OPTIONS}
                    placeholder="Select a range"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#8B7355] mb-3">
                    Wedding Style
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {STYLE_TAGS.map((tag) => {
                      const active = form.preferredStyle.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleStyle(tag)}
                          className={`px-4 py-1.5 text-[10px] uppercase tracking-[0.18em] font-body transition-all duration-200 ${
                            active
                              ? "bg-[#C9A234] text-[#FAF6F0] border border-[#C9A234]"
                              : "bg-transparent text-[#9A8F7E] border border-[rgba(201,162,52,0.35)] hover:bg-[rgba(201,162,52,0.08)] hover:text-[#1A1408]"
                          }`}
                          style={{ borderRadius: "2px" }}
                        >
                          {tag}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Save bar */}
          <div className="px-10 py-5 border-t border-[rgba(201,162,52,0.15)] bg-[rgba(201,162,52,0.03)] flex items-center gap-5">
            <button
              type="submit"
              disabled={saving || loading}
              className="h-12 px-8 bg-[#C9A234] text-[#FAF6F0] font-body text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-200 hover:bg-[#9A7D22] hover:shadow-[0_4px_16px_rgba(201,162,52,0.3)] disabled:opacity-50 flex items-center gap-2"
              style={{ borderRadius: "2px", minWidth: "180px" }}
            >
              {saving ? (
                <><Loader2 size={13} className="animate-spin" /> Saving…</>
              ) : (
                "Save Profile"
              )}
            </button>
            {saved && (
              <span className="flex items-center gap-1.5 text-[12px] text-[#5A8A5A] font-body">
                <Check size={13} /> Saved
              </span>
            )}
            {error && (
              <span className="text-[12px] text-[#E87B3A] font-body">{error}</span>
            )}
          </div>
        </div>
      </form>
    </AccountLayout>
  );
}

function SectionHeader({ children }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.3em] text-[#1A1408] font-medium flex items-center gap-2">
        <span className="text-[#C9A234] text-[8px]">◆</span>
        {children}
      </p>
      <div className="mt-2 h-px bg-[rgba(201,162,52,0.25)]" />
    </div>
  );
}

function LineField({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#8B7355] mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent font-heading text-[15px] text-[#1A1408] placeholder:text-[#C4BAA8] placeholder:font-body placeholder:text-[13px] pb-2 focus:outline-none transition-all duration-200"
        style={{
          borderBottom: "1px solid rgba(201,162,52,0.4)",
          boxShadow: "none",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderBottomColor = "#C9A234";
          e.currentTarget.style.boxShadow = "0 2px 0 rgba(201,162,52,0.15)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderBottomColor = "rgba(201,162,52,0.4)";
          e.currentTarget.style.boxShadow = "none";
        }}
      />
    </div>
  );
}

function LineSelectField({ label, value, onChange, options, placeholder }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#8B7355] mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent font-body text-[13px] text-[#1A1408] pb-2 focus:outline-none appearance-none cursor-pointer transition-all duration-200 pr-5"
          style={{
            borderBottom: "1px solid rgba(201,162,52,0.4)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderBottomColor = "#C9A234";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderBottomColor = "rgba(201,162,52,0.4)";
          }}
        >
          <option value="" className="text-[#C4BAA8]">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <span className="absolute right-0 bottom-2.5 text-[#C9A234] text-[10px] pointer-events-none">▾</span>
      </div>
    </div>
  );
}

function DateField({ label, value, onChange }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.18em] text-[#8B7355] mb-2">
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent font-body text-[13px] text-[#1A1408] pb-2 focus:outline-none transition-all duration-200 pr-6"
          style={{
            borderBottom: "1px solid rgba(201,162,52,0.4)",
            colorScheme: "light",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderBottomColor = "#C9A234";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderBottomColor = "rgba(201,162,52,0.4)";
          }}
        />
        <CalendarDays size={13} className="absolute right-0 bottom-2.5 text-[#C9A234] pointer-events-none" />
      </div>
    </div>
  );
}

function Skeleton({ rows = 2 }) {
  return (
    <div className="flex flex-col gap-4 mt-6 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-8 bg-[rgba(201,162,52,0.1)] rounded-sm" />
      ))}
    </div>
  );
}
