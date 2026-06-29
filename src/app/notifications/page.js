"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Loader2, Check } from "lucide-react";

const PREFS = [
  {
    key: "inspiration",
    label: "Inspiration & Mood Board Updates",
    description: "New mood boards, wedding trends, and curated ideas delivered to your inbox.",
  },
  {
    key: "offers",
    label: "Special Offers & New Venues",
    description: "Be the first to hear about exclusive venue launches and seasonal packages.",
  },
  {
    key: "enquiryUpdates",
    label: "Enquiry Status Updates",
    description: "Get notified when our team responds to your planning enquiry.",
  },
];

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(true);
  const [prefs, setPrefs] = useState({ inspiration: true, offers: true, enquiryUpdates: true });
  const [saving, setSaving] = useState(null);
  const [saved, setSaved] = useState(null);
  const [error, setError] = useState(null);
  const savedTimer = useRef(null);

  useEffect(() => {
    fetch("/api/user/notifications")
      .then(async (r) => {
        if (r.status === 401) { setAuthed(false); return; }
        const { notifications } = await r.json();
        if (notifications) setPrefs(notifications);
      })
      .catch(() => setError("Failed to load preferences."))
      .finally(() => setLoading(false));
  }, []);

  async function toggle(key) {
    const next = !prefs[key];
    setPrefs((prev) => ({ ...prev, [key]: next }));
    setSaving(key);
    setError(null);

    try {
      const res = await fetch("/api/user/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: next }),
      });
      if (!res.ok) throw new Error();
      setSaved(key);
      clearTimeout(savedTimer.current);
      savedTimer.current = setTimeout(() => setSaved(null), 2000);
    } catch {
      setPrefs((prev) => ({ ...prev, [key]: !next }));
      setError("Failed to save. Please try again.");
    } finally {
      setSaving(null);
    }
  }

  if (!authed) {
    return (
      <div className="pt-[104px] min-h-screen bg-[#FDFAF5] flex items-center justify-center">
        <div className="text-center">
          <p className="font-heading text-2xl font-light text-[#1A1408] mb-3">Sign in to manage notifications</p>
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
          <h1 className="font-heading text-[36px] font-light text-[#1A1408] leading-tight">Notifications</h1>
          <p className="text-[13px] text-[#9A8F7E] mt-1">Choose which emails you'd like to receive from us.</p>
        </div>

        <div className="bg-white border border-[#EDE8DC] shadow-[0_2px_16px_rgba(0,0,0,0.04)] divide-y divide-[#EDE8DC]">
          {PREFS.map(({ key, label, description }) => (
            <div key={key} className="px-6 py-4 flex items-center gap-6">
              <div className="flex-1 min-w-0">
                <p className="font-body text-[13px] font-semibold text-[#1A1408] mb-0.5">{label}</p>
                <p className="font-body text-[12px] text-[#9A8F7E] leading-relaxed">{description}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {saved === key && <Check size={13} className="text-[#5A8A5A]" />}
                {loading ? (
                  <div className="w-11 h-6 bg-[#F0EBE1] rounded-full animate-pulse" />
                ) : saving === key ? (
                  <Loader2 size={16} className="text-[#C9A234] animate-spin" />
                ) : (
                  <button
                    onClick={() => toggle(key)}
                    role="switch"
                    aria-checked={prefs[key]}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
                      prefs[key] ? "bg-[#C9A234]" : "bg-[#EDE8DC]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        prefs[key] ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="px-6 py-3 bg-[#FDFAF5]">
            <p className="text-[11px] text-[#9A8F7E] leading-relaxed">
              Changes save automatically. Turning off enquiry updates will not affect any planning already in progress.
            </p>
          </div>
        </div>

        {error && <p className="font-body text-[12px] text-[#E87B3A] mt-3">{error}</p>}

        <div className="mt-6 flex gap-6">
          <Link href="/account-settings" className="text-[11px] uppercase tracking-[0.25em] text-[#9A8F7E] hover:text-[#C9A234] transition-colors">
            ← Account Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
