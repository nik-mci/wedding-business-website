"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, Check } from "lucide-react";

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

  if (!authed) {
    return (
      <div className="pt-[104px] min-h-screen bg-[#FDFAF5] flex items-center justify-center">
        <div className="text-center">
          <p className="font-heading text-2xl font-light text-[#1A1408] mb-3">Sign in to view your profile</p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("openProfileDropdown"))}
            className="text-[10px] uppercase tracking-[0.3em] font-medium px-6 py-3 bg-[#C9A234] text-white hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[104px] min-h-screen bg-[#FDFAF5]">
      <div className="max-w-[860px] mx-auto px-6 lg:px-12 py-10">

        {/* Header */}
        <div className="mb-6">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A234] mb-1.5 font-medium">My Account</p>
          <h1 className="font-heading text-[36px] font-light text-[#1A1408] leading-tight">My Profile</h1>
        </div>

        <form onSubmit={handleSave}>
          <div className="bg-white border border-[#EDE8DC] shadow-[0_2px_16px_rgba(0,0,0,0.04)]">

            {/* About You */}
            <div className="px-6 py-7 border-b border-[#EDE8DC]">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#C9A234] font-bold mb-4">About You</p>
              {loading ? (
                <Skeleton rows={2} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Field label="First Name" value={form.firstName} onChange={(v) => set("firstName", v)} placeholder="Your first name" />
                  <Field label="Last Name" value={form.lastName} onChange={(v) => set("lastName", v)} placeholder="Your last name" />
                  <div className="sm:col-span-2">
                    <Field label="Partner's Name" value={form.partnerName} onChange={(v) => set("partnerName", v)} placeholder="Their name" />
                  </div>
                </div>
              )}
            </div>

            {/* Your Wedding */}
            <div className="px-6 py-7 border-b border-[#EDE8DC]">
              <p className="text-[9px] uppercase tracking-[0.4em] text-[#C9A234] font-bold mb-4">Your Wedding</p>
              {loading ? (
                <Skeleton rows={3} />
              ) : (
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#9A8F7E] mb-1.5">Wedding Date</label>
                    <input
                      type="date"
                      value={form.weddingDate}
                      onChange={(e) => set("weddingDate", e.target.value)}
                      className="h-10 px-3 border border-[#EDE8DC] font-body text-[13px] text-[#1A1408] focus:outline-none focus:border-[#C9A234] transition-colors bg-[#FDFAF5] w-full"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <SelectField label="Guest Count" value={form.guestCount} onChange={(v) => set("guestCount", v)} options={GUEST_OPTIONS} placeholder="Select a range" />
                    <SelectField label="Budget Range" value={form.budgetRange} onChange={(v) => set("budgetRange", v)} options={BUDGET_OPTIONS} placeholder="Select a range" />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#9A8F7E] mb-2">Wedding Style</label>
                    <div className="flex flex-wrap gap-2">
                      {STYLE_TAGS.map((tag) => {
                        const active = form.preferredStyle.includes(tag);
                        return (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => toggleStyle(tag)}
                            className={`px-3 py-1.5 rounded-full text-[11px] font-body border transition-all duration-150 ${
                              active
                                ? "bg-[#C9A234] border-[#C9A234] text-white"
                                : "border-[#EDE8DC] text-[#9A8F7E] hover:border-[#C9A234] hover:text-[#C9A234]"
                            }`}
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
            <div className="px-6 py-5 bg-[#FDFAF5] flex items-center justify-end gap-4">
              {saved && (
                <span className="flex items-center gap-1.5 text-[12px] text-[#5A8A5A] font-body">
                  <Check size={13} /> Saved
                </span>
              )}
              {error && <span className="text-[12px] text-[#E87B3A] font-body">{error}</span>}
              <button
                type="submit"
                disabled={saving || loading}
                className="h-10 px-7 min-w-[180px] bg-[#C9A234] text-white font-body text-[11px] uppercase tracking-[0.3em] font-bold transition-opacity hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {saving ? <><Loader2 size={13} className="animate-spin" /> Saving…</> : "Save Profile"}
              </button>
            </div>
          </div>
        </form>

        <div className="mt-6 flex justify-between">
          <Link href="/my-enquiries" className="text-[11px] uppercase tracking-[0.25em] text-[#C9A234] hover:opacity-70 transition-opacity">
            My Enquiries →
          </Link>
          <Link href="/account-settings" className="text-[11px] uppercase tracking-[0.25em] text-[#9A8F7E] hover:text-[#C9A234] transition-colors">
            Account Settings →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Skeleton({ rows = 2 }) {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-10 bg-[#F0EBE1] rounded-sm" />
      ))}
    </div>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#9A8F7E] mb-1.5">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-10 px-3 border border-[#EDE8DC] font-body text-[13px] text-[#1A1408] placeholder:text-[#C4BAA8] focus:outline-none focus:border-[#C9A234] transition-colors bg-[#FDFAF5]"
      />
    </div>
  );
}

function SelectField({ label, value, onChange, options, placeholder }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.2em] text-[#9A8F7E] mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-10 px-3 border border-[#EDE8DC] font-body text-[13px] text-[#1A1408] focus:outline-none focus:border-[#C9A234] transition-colors bg-[#FDFAF5] appearance-none cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
