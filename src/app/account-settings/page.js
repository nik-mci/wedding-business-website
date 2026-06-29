"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function AccountSettingsPage() {
  const [authed, setAuthed] = useState(true);
  const [user, setUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  // Use session API — reads JWT cookie, no Cosmos call, instant
  useEffect(() => {
    fetch("/api/auth/session")
      .then(r => r.json())
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
      <div className="pt-[104px] min-h-screen bg-[#FDFAF5] flex items-center justify-center">
        <div className="text-center">
          <p className="font-heading text-2xl font-light text-[#1A1408] mb-3">Sign in to view account settings</p>
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
          <h1 className="font-heading text-[36px] font-light text-[#1A1408] leading-tight">Account Settings</h1>
        </div>

        <div className="bg-white border border-[#EDE8DC] shadow-[0_2px_16px_rgba(0,0,0,0.04)]">

          {/* Account Details */}
          <div className="px-6 py-5 border-b border-[#EDE8DC]">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#C9A234] font-bold mb-4">Account Details</p>
            <div className="divide-y divide-[#EDE8DC] border border-[#EDE8DC]">
              <Row label="Email Address">
                {user ? (
                  <>
                    <span className="font-body text-[13px] text-[#1A1408] break-all">{user.email}</span>
                    <span className="text-[10px] text-[#9A8F7E] ml-2 shrink-0">(read-only)</span>
                  </>
                ) : (
                  <div className="h-4 w-48 bg-[#F0EBE1] rounded animate-pulse" />
                )}
              </Row>
            </div>
            <p className="text-[11px] text-[#9A8F7E] mt-3 leading-relaxed">
              Your email address is used to send your sign-in link and cannot be changed. To use a different email, create a new account.
            </p>
          </div>

          {/* Danger Zone */}
          <div className="px-6 py-5">
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#C9A234] font-bold mb-4">Danger Zone</p>
            <div className="border border-[#F0D0C8] p-5">
              <p className="font-body text-[13px] font-semibold text-[#1A1408] mb-1">Delete Account</p>
              <p className="font-body text-[12px] text-[#9A8F7E] leading-relaxed mb-4">
                Permanently removes your account, saved ideas, and all enquiries. This cannot be undone.
              </p>

              {!confirmDelete ? (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="h-9 px-5 border border-[#E87B3A] text-[#E87B3A] font-body text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-[#FFF3E0] transition-colors"
                >
                  Delete Account
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <p className="font-body text-[12px] text-[#E87B3A] font-semibold">Are you sure? This will erase everything permanently.</p>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="h-9 px-5 bg-[#E87B3A] text-white font-body text-[11px] uppercase tracking-[0.25em] font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
                    >
                      {deleting ? <><Loader2 size={13} className="animate-spin" /> Deleting…</> : "Yes, Delete"}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(false)}
                      disabled={deleting}
                      className="h-9 px-5 border border-[#EDE8DC] text-[#9A8F7E] font-body text-[11px] uppercase tracking-[0.25em] hover:border-[#C9A234] hover:text-[#C9A234] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {error && <p className="font-body text-[12px] text-[#E87B3A] mt-3">{error}</p>}
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-6">
          <Link href="/profile" className="text-[11px] uppercase tracking-[0.25em] text-[#9A8F7E] hover:text-[#C9A234] transition-colors">
            ← My Profile
          </Link>
          <Link href="/notifications" className="text-[11px] uppercase tracking-[0.25em] text-[#C9A234] hover:opacity-70 transition-opacity">
            Notifications →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center px-4 py-3 gap-1 sm:gap-4">
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#9A8F7E] shrink-0 sm:w-[130px]">{label}</span>
      <div className="flex items-center flex-1 min-w-0">{children}</div>
    </div>
  );
}
