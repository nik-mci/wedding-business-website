"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Loader2, Check, Sparkles, Building2, MessageSquare } from "lucide-react";
import AccountHero from "@/components/AccountHero";

const PREFS = [
  {
    key: "inspiration",
    label: "Inspiration & Mood Board Updates",
    description: "New mood boards, wedding trends, and curated ideas delivered to your inbox.",
    Icon: Sparkles,
    recommended: true,
  },
  {
    key: "offers",
    label: "Special Offers & New Venues",
    description: "Be the first to hear about exclusive venue launches and seasonal packages.",
    Icon: Building2,
    recommended: false,
  },
  {
    key: "enquiryUpdates",
    label: "Enquiry Status Updates",
    description: "Get notified when our team responds to your planning enquiry.",
    Icon: MessageSquare,
    recommended: false,
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
      <div className="pt-[104px] min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <p className="font-heading text-2xl font-light text-[#1C1712] mb-3">Sign in to manage notifications</p>
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

  return (
    <div className="pt-[104px] min-h-screen bg-[#FAF7F2]">
      <AccountHero
        title="Notifications"
        subtitle="Curate the updates that arrive in your inbox"
      />

      <div className="max-w-[800px] mx-auto px-6 md:px-12 py-10 flex flex-col gap-4">

        {PREFS.map(({ key, label, description, Icon, recommended }) => (
          <NotificationCard
            key={key}
            label={label}
            description={description}
            Icon={Icon}
            recommended={recommended}
            checked={prefs[key]}
            saving={saving === key}
            saved={saved === key}
            loading={loading}
            onToggle={() => toggle(key)}
          />
        ))}

        {/* Info bar */}
        <div
          className="flex items-start gap-3 px-5 py-4 mt-2"
          style={{
            background: "rgba(184,150,46,0.08)",
            borderLeft: "3px solid #B8962E",
            borderRadius: "0 4px 4px 0",
          }}
        >
          <span className="text-[14px] shrink-0 text-[#B8962E] font-medium">ℹ</span>
          <p className="text-[12px] text-[#9A8F7E] italic leading-relaxed">
            Changes save automatically. Turning off enquiry updates will not affect any planning already in progress.
          </p>
        </div>

        {error && <p className="font-body text-[12px] text-red-500">{error}</p>}

        {/* Bottom nav */}
        <div
          className="pt-6 mt-2 flex justify-between"
          style={{ borderTop: "1px solid rgba(184,150,46,0.15)" }}
        >
          <Link href="/account-settings" className="text-[11px] uppercase tracking-[0.25em] text-[#9A8F7E] hover:text-[#B8962E] transition-colors">
            ← Account Settings
          </Link>
          <Link href="/profile" className="text-[11px] uppercase tracking-[0.25em] text-[#B8962E] hover:opacity-70 transition-opacity">
            My Profile →
          </Link>
        </div>
      </div>
    </div>
  );
}

function NotificationCard({ label, description, Icon, recommended, checked, saving, saved, loading, onToggle }) {
  return (
    <div
      className="bg-white rounded-lg p-6 md:p-8 flex items-center gap-6 transition-all duration-200 hover:bg-[rgba(184,150,46,0.04)] border border-[rgba(184,150,46,0.2)] hover:border-[rgba(184,150,46,0.45)]"
    >
      {/* Icon */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
        style={{
          background: "rgba(184,150,46,0.1)",
          border: "1px solid rgba(184,150,46,0.2)",
        }}
      >
        <Icon size={18} className="text-[#B8962E]" />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <p className="font-heading text-[17px] font-light text-[#1C1712]">{label}</p>
          {recommended && (
            <span
              className="text-[9px] uppercase tracking-[0.15em] text-[#B8962E] px-2 py-0.5"
              style={{ border: "1px solid rgba(184,150,46,0.5)", borderRadius: "2px" }}
            >
              Recommended
            </span>
          )}
        </div>
        <p className="font-body text-[13px] text-[#9A8F7E] leading-relaxed">{description}</p>
      </div>

      {/* Toggle */}
      <div className="flex items-center gap-2 shrink-0">
        {saved && <Check size={13} className="text-[#5A8A5A]" />}
        <span className="text-[9px] uppercase tracking-[0.2em] text-[#9A8F7E] w-5 text-right">
          {checked ? "On" : "Off"}
        </span>
        {loading ? (
          <div className="w-11 h-6 bg-[#F0EBE1] rounded-full animate-pulse" />
        ) : saving ? (
          <Loader2 size={16} className="text-[#B8962E] animate-spin" />
        ) : (
          <button
            onClick={onToggle}
            role="switch"
            aria-checked={checked}
            aria-label={label}
            className="relative w-11 h-6 rounded-full transition-colors duration-300 focus:outline-none"
            style={{ background: checked ? "#B8962E" : "#D1CBC4" }}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                checked ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );
}
