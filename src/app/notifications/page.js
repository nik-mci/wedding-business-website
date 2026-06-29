"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, Check, Mail, Landmark, MessageSquare } from "lucide-react";
import AccountLayout from "@/components/AccountLayout";

const PREFS = [
  {
    key: "inspiration",
    label: "Inspiration & Mood Board Updates",
    description: "New mood boards, wedding trends, and curated ideas delivered to your inbox.",
    Icon: Mail,
  },
  {
    key: "offers",
    label: "Special Offers & New Venues",
    description: "Be the first to hear about exclusive venue launches and seasonal packages.",
    Icon: Landmark,
  },
  {
    key: "enquiryUpdates",
    label: "Enquiry Status Updates",
    description: "Get notified when our team responds to your planning enquiry.",
    Icon: MessageSquare,
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

  return (
    <AccountLayout
      unauthed={!authed}
      onSignIn={() => window.dispatchEvent(new CustomEvent("openProfileDropdown"))}
    >
      {/* Page heading */}
      <div className="mb-7">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A234] mb-1 font-medium">
          My Account
        </p>
        <h1 className="font-heading text-[42px] font-light text-[#1A1408] leading-none">
          Notifications
        </h1>
        <div className="mt-3 w-[60px] h-px bg-[#C9A234]" />
      </div>

      {/* Intro */}
      <div className="mb-6 flex items-start gap-3">
        <span className="text-[#C9A234] text-[10px] tracking-[0.3em] mt-1">◆</span>
        <p className="font-heading text-[16px] font-light text-[#9A8F7E] leading-relaxed">
          Choose which emails you'd like to receive from us.
        </p>
      </div>

      <div
        className="bg-[#FDFAF5]"
        style={{
          border: "1px solid rgba(201,162,52,0.25)",
          boxShadow: "0 4px 40px rgba(28,15,10,0.07)",
          borderRadius: "2px",
        }}
      >
        {PREFS.map(({ key, label, description, Icon }, idx) => (
          <div
            key={key}
            className={`px-8 py-6 flex items-center gap-6 ${
              idx < PREFS.length - 1 ? "border-b border-[rgba(201,162,52,0.12)]" : ""
            }`}
          >
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "rgba(201,162,52,0.1)" }}
            >
              <Icon size={16} className="text-[#C9A234]" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <p className="font-heading text-[15px] font-light text-[#1A1408] leading-snug mb-1">
                {label}
              </p>
              <p className="font-body text-[12px] text-[#9A8F7E] leading-relaxed">
                {description}
              </p>
            </div>

            {/* Toggle */}
            <div className="flex items-center gap-2.5 shrink-0">
              {saved === key && (
                <Check size={13} className="text-[#5A8A5A]" />
              )}
              {loading ? (
                <div className="w-11 h-6 bg-[rgba(201,162,52,0.15)] rounded-full animate-pulse" />
              ) : saving === key ? (
                <Loader2 size={16} className="text-[#C9A234] animate-spin" />
              ) : (
                <button
                  onClick={() => toggle(key)}
                  role="switch"
                  aria-checked={prefs[key]}
                  aria-label={label}
                  className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
                    prefs[key] ? "bg-[#C9A234]" : "bg-[#D8D0C4]"
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

        {/* Disclaimer */}
        <div
          className="mx-6 mb-6 mt-2 px-4 py-3"
          style={{
            background: "rgba(201,162,52,0.06)",
            borderLeft: "2px solid #C9A234",
            borderRadius: "1px",
          }}
        >
          <p className="text-[11px] text-[#8B7355] italic leading-relaxed">
            Changes save automatically. Turning off enquiry updates will not affect any planning already in progress.
          </p>
        </div>
      </div>

      {error && (
        <p className="font-body text-[12px] text-[#E87B3A] mt-3">{error}</p>
      )}
    </AccountLayout>
  );
}
