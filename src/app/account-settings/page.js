"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, Mail } from "lucide-react";
import AccountHero from "@/components/AccountHero";

export default function AccountSettingsPage() {
  const [authed, setAuthed] = useState(true);
  const [user, setUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => r.json())
      .then(({ user }) => {
        if (!user) setAuthed(false);
        else setUser(user);
      })
      .catch(() => setAuthed(false));
  }, []);

  async function handleDelete() {
    setDeleting(true);
    setError(null);
    try {
      const res = await fetch("/api/user/account", { method: "DELETE" });
      if (!res.ok) throw new Error();
      window.location.href = "/";
    } catch {
      setError("Something went wrong. Please try again.");
      setDeleting(false);
    }
  }

  if (!authed) {
    return (
      <div className="pt-[104px] min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <p className="font-heading text-2xl font-light text-[#1C1712] mb-3">Sign in to view account settings</p>
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

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-GB", { month: "long", year: "numeric" })
    : "2025";

  return (
    <div className="pt-[104px] min-h-screen bg-[#FAF7F2]">
      <AccountHero
        title="Account Settings"
        subtitle="Manage your account credentials and preferences"
      />

      <div className="max-w-[800px] mx-auto px-6 md:px-12 py-10 flex flex-col gap-6">

        {/* Account Details */}
        <div
          className="bg-white rounded-lg p-8 md:p-10"
          style={{ border: "1px solid rgba(184,150,46,0.2)" }}
        >
          <SectionLabel>Account Details</SectionLabel>
          <div className="flex flex-col gap-5">
            <div
              className="flex items-start gap-4 pb-5"
              style={{ borderBottom: "1px solid rgba(184,150,46,0.12)" }}
            >
              <Mail size={16} className="text-[#B8962E] mt-1 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.18em] text-[#B8962E] mb-1.5">
                  Email Address
                </p>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  {user ? (
                    <span className="font-body text-[15px] text-[#9A8F7E] break-all">{user.email}</span>
                  ) : (
                    <div className="h-4 w-48 bg-[#F0EBE1] rounded animate-pulse" />
                  )}
                  <span
                    className="text-[9px] uppercase tracking-[0.1em] text-[#B8962E] px-2 py-0.5"
                    style={{ border: "1px solid rgba(184,150,46,0.45)", borderRadius: "3px" }}
                  >
                    ✓ Verified
                  </span>
                </div>
                <p className="text-[11px] text-[#9A8F7E] italic leading-relaxed">
                  Your sign-in link is sent to this address. To use a different email, create a new account.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#B8962E] text-[11px]">✦</span>
              <span className="text-[12px] text-[#9A8F7E]">Member since {memberSince}</span>
            </div>
          </div>
        </div>

        {/* Preferences — display only */}
        <div
          className="bg-white rounded-lg p-8 md:p-10"
          style={{ border: "1px solid rgba(184,150,46,0.2)" }}
        >
          <SectionLabel>Preferences</SectionLabel>
          <div className="flex flex-col divide-y divide-[rgba(184,150,46,0.1)]">
            {[
              { label: "Communication Language", value: "English" },
              { label: "Currency Display", value: "INR ₹" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center justify-between py-4">
                <span className="text-[13px] text-[#1C1712] font-light">{label}</span>
                <span className="text-[13px] text-[#9A8F7E]">{value}</span>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-[#9A8F7E] italic mt-5">
            Additional preferences coming soon
          </p>
        </div>

        {/* Danger Zone */}
        <div
          className="rounded-lg p-8 md:p-10"
          style={{
            border: "1px solid rgba(192,57,43,0.3)",
            background: "rgba(192,57,43,0.02)",
          }}
        >
          <SectionLabel danger>⚠ Danger Zone</SectionLabel>
          <p className="font-body text-[13px] font-semibold text-[#1C1712] mb-1">Delete Account</p>
          <p className="font-body text-[12px] text-[#9A8F7E] leading-relaxed mb-5">
            Permanently removes your account, saved ideas, and all enquiries. This cannot be undone.
          </p>

          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="h-9 px-5 font-body text-[11px] uppercase tracking-[0.25em] transition-all duration-200 hover:bg-[#C0392B] hover:text-white"
              style={{
                border: "1px solid #C0392B",
                color: "#C0392B",
                background: "transparent",
                borderRadius: "3px",
              }}
            >
              Delete Account
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              <p className="font-body text-[12px] font-semibold" style={{ color: "#C0392B" }}>
                Are you sure? This cannot be undone.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="h-9 px-5 text-white font-body text-[11px] uppercase tracking-[0.25em] transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center gap-2"
                  style={{ background: "#C0392B", borderRadius: "3px" }}
                >
                  {deleting ? <><Loader2 size={13} className="animate-spin" /> Deleting…</> : "Yes, Delete"}
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  disabled={deleting}
                  className="h-9 px-5 font-body text-[11px] uppercase tracking-[0.25em] text-[#9A8F7E] transition-all duration-200 hover:text-[#B8962E]"
                  style={{ border: "1px solid rgba(184,150,46,0.3)", background: "transparent", borderRadius: "3px" }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {error && <p className="font-body text-[12px] mt-3" style={{ color: "#C0392B" }}>{error}</p>}
        </div>

        {/* Bottom nav */}
        <div
          className="pt-6 flex justify-between"
          style={{ borderTop: "1px solid rgba(184,150,46,0.15)" }}
        >
          <Link href="/profile" className="text-[11px] uppercase tracking-[0.25em] text-[#9A8F7E] hover:text-[#B8962E] transition-colors">
            ← My Profile
          </Link>
          <Link href="/notifications" className="text-[11px] uppercase tracking-[0.25em] text-[#B8962E] hover:opacity-70 transition-opacity">
            Notifications →
          </Link>
        </div>
      </div>
    </div>
  );
}

function SectionLabel({ children, danger }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span
        className="text-[11px] uppercase tracking-[0.2em] shrink-0"
        style={{ color: danger ? "#C0392B" : "#B8962E" }}
      >
        {children}
      </span>
      <div
        className="flex-1 h-px"
        style={{ background: danger ? "rgba(192,57,43,0.2)" : "rgba(184,150,46,0.25)" }}
      />
    </div>
  );
}
