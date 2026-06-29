"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export default function AccountSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [authed, setAuthed] = useState(true);
  const [user, setUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/user/profile")
      .then(async (r) => {
        if (r.status === 401) { setAuthed(false); return; }
        const { user } = await r.json();
        setUser(user);
      })
      .catch(() => setError("Failed to load account details."))
      .finally(() => setLoading(false));
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
          <p className="font-heading text-2xl font-light text-[#1A1408] mb-4">Sign in to view account settings</p>
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

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <div className="pt-[104px] min-h-screen bg-[#FDFAF5]">
      <div className="max-w-[720px] mx-auto px-6 lg:px-12 py-16">

        {/* Header */}
        <div className="mb-12 border-b border-[#EDE8DC] pb-8">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A234] mb-3 font-medium">My Account</p>
          <h1 className="font-heading text-4xl font-light text-[#1A1408]">Account Settings</h1>
        </div>

        <div className="flex flex-col gap-10">

          {/* Account Details */}
          <section>
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#9A8F7E] font-bold mb-5">Account Details</p>
            <div className="bg-white border border-[#EDE8DC] divide-y divide-[#EDE8DC]">
              <Row label="Email Address">
                <span className="font-body text-[13px] text-[#1A1408]">{user?.email}</span>
                <span className="text-[10px] text-[#9A8F7E] ml-2">(read-only)</span>
              </Row>
              {memberSince && (
                <Row label="Member Since">
                  <span className="font-body text-[13px] text-[#1A1408]">{memberSince}</span>
                </Row>
              )}
              <Row label="Sign-in Method">
                <span className="font-body text-[13px] text-[#1A1408]">Magic Link</span>
              </Row>
            </div>
            <p className="text-[11px] text-[#9A8F7E] mt-3 leading-relaxed">
              Your email address is used to send your sign-in link and cannot be changed. To use a different email, create a new account.
            </p>
          </section>

          {/* Danger Zone */}
          <section>
            <p className="text-[9px] uppercase tracking-[0.4em] text-[#9A8F7E] font-bold mb-5">Danger Zone</p>
            <div className="border border-[#F0D0C8] bg-white p-6">
              <h3 className="font-body text-[14px] font-semibold text-[#1A1408] mb-1">Delete Account</h3>
              <p className="font-body text-[13px] text-[#9A8F7E] leading-relaxed mb-5">
                Permanently removes your account, saved ideas, and all enquiries. This cannot be undone.
              </p>

              {!confirmDelete ? (
                <button
                  onClick={() => setConfirmDelete(true)}
                  className="h-10 px-6 border border-[#E87B3A] text-[#E87B3A] font-body text-[11px] uppercase tracking-[0.25em] font-bold hover:bg-[#FFF3E0] transition-colors"
                >
                  Delete Account
                </button>
              ) : (
                <div className="flex flex-col gap-3">
                  <p className="font-body text-[13px] text-[#E87B3A] font-semibold">Are you sure? This will erase everything permanently.</p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className="h-10 px-6 bg-[#E87B3A] text-white font-body text-[11px] uppercase tracking-[0.25em] font-bold hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center gap-2"
                    >
                      {deleting ? <><Loader2 size={13} className="animate-spin" /> Deleting…</> : "Yes, Delete"}
                    </button>
                    <button
                      onClick={() => setConfirmDelete(false)}
                      disabled={deleting}
                      className="h-10 px-6 border border-[#EDE8DC] text-[#9A8F7E] font-body text-[11px] uppercase tracking-[0.25em] hover:border-[#C9A234] hover:text-[#C9A234] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {error && <p className="font-body text-[12px] text-[#E87B3A] mt-3">{error}</p>}
            </div>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-[#EDE8DC] flex gap-8">
          <Link href="/profile" className="text-[11px] uppercase tracking-[0.25em] text-[#C9A234] hover:opacity-70 transition-opacity">
            ← My Profile
          </Link>
          <Link href="/notifications" className="text-[11px] uppercase tracking-[0.25em] text-[#C9A234] hover:opacity-70 transition-opacity">
            Notification Preferences →
          </Link>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 gap-4">
      <span className="text-[10px] uppercase tracking-[0.2em] text-[#9A8F7E] shrink-0 w-[130px]">{label}</span>
      <div className="flex items-center flex-1">{children}</div>
    </div>
  );
}
