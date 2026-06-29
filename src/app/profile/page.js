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

  if (loading) {
    return (
      <div className="pt-[104px] min-h-screen bg-[#FDFAF5] flex items-center justify-center">
        <Loader2 size={24} className="text-[#C9A234] animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="pt-[104px] min-h-screen bg-[#FDFAF5] flex items-center justify-center">
        <div className="text-center">
          <p className="font-heading text-2xl font-light text-[#1A1408] mb-4">Sign in to view your profile</p>
          <p className="text-[14px] text-[#9A8F7E] mb-8">You need to be signed in to access this page.</p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent("openProfileDropdown"))}
            className="inline-flex items-center text-[10px] uppercase tracking-[0.3em] font-medium px-6 py-3 bg-[#C9A234] text-white hover:opacity-90 transition-opacity"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[104px] min-h-screen bg-[#FDFAF5]">
      <div className="max-w-[720px] mx-auto px-6 lg:px-12 py-10">

        {/* Header */}
        <div className="mb-7 border-b border-[#EDE8DC] pb-5">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A234] mb-1.5 font-medium">My Account</p>
          <h1 className="font-heading text-4xl font-light text-[#1A1408]">My Profile</h1>
          <p className="text-[13px] text-[#9A8F7E] mt-1">Tell us about you and your wedding.</p>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-6">

          {/* About You */}
          <section>
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#9A8F7E] font-bold mb-3">About You</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="First Name" value={form.firstName} onChange={(v) => set("firstName", v)} placeholder="Your first name" />
              <Field label="Last Name" value={form.lastName} onChange={(v) => set("lastName", v)} placeholder="Your last name" />
              <div className="sm:col-span-2">
                <Field label="Partner's Name" value={form.partnerName} onChange={(v) => set("partnerName", v)} placeholder="Their name" />
              </div>
            </div>
          </section>

          {/* Your Wedding */}
          <section>
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#9A8F7E] font-bold mb-3">Your Wedding</p>
            <div className="flex flex-col gap-3">

              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-[#9A8F7E] mb-1.5">Wedding Date</label>
                <input
                  type="date"
                  value={form.weddingDate}
                  onChange={(e) => set("weddingDate", e.target.value)}
                  className="h-10 px-3 border border-[#EDE8DC] font-body text-[13px] text-[#1A1408] focus:outline-none focus:border-[#C9A234] transition-colors bg-white w-full sm:w-64"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <SelectField
                  label="Guest Count"
                  value={form.guestCount}
                  onChange={(v) => set("guestCount", v)}
                  options={GUEST_OPTIONS}
                  placeholder="Select a range"
                />
                <SelectField
                  label="Budget Range"
                  value={form.budgetRange}
                  onChange={(v) => set("budgetRange", v)}
                  options={BUDGET_OPTIONS}
                  placeholder="Select a range"
                />
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
                        className={`px-4 py-2 rounded-full text-[11px] font-body border transition-all duration-150 ${
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
          </section>

          {/* Save */}
          <div className="flex items-center gap-4 pt-3 border-t border-[#EDE8DC]">
            <button
              type="submit"
              disabled={saving}
              className="h-11 px-8 bg-[#C9A234] text-white font-body text-[11px] uppercase tracking-[0.3em] font-bold transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center gap-2"
            >
              {saving ? (
                <><Loader2 size={14} className="animate-spin" /> Saving…</>
              ) : (
                "Save Profile"
              )}
            </button>
            {saved && (
              <span className="flex items-center gap-1.5 text-[12px] text-[#5A8A5A] font-body">
                <Check size={14} /> Saved
              </span>
            )}
            {error && (
              <span className="text-[12px] text-[#E87B3A] font-body">{error}</span>
            )}
          </div>
        </form>

        <div className="mt-8 pt-5 border-t border-[#EDE8DC]">
          <Link href="/my-enquiries" className="text-[11px] uppercase tracking-[0.25em] text-[#C9A234] hover:opacity-70 transition-opacity">
            View My Enquiries →
          </Link>
        </div>
      </div>
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
        className="w-full h-10 px-3 border border-[#EDE8DC] font-body text-[13px] text-[#1A1408] placeholder:text-[#C4BAA8] focus:outline-none focus:border-[#C9A234] transition-colors bg-white"
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
        className="w-full h-10 px-3 border border-[#EDE8DC] font-body text-[13px] text-[#1A1408] focus:outline-none focus:border-[#C9A234] transition-colors bg-white appearance-none cursor-pointer"
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
