"use client";

import { useState, useEffect } from "react";
import { Loader2, Lock } from "lucide-react";
import Link from "next/link";
import AccountLayout from "@/components/AccountLayout";

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
          Account Settings
        </h1>
        <div className="mt-3 w-[60px] h-px bg-[#C9A234]" />
      </div>

      <div
        className="bg-[#FDFAF5]"
        style={{
          border: "1px solid rgba(201,162,52,0.25)",
          boxShadow: "0 4px 40px rgba(28,15,10,0.07)",
          borderRadius: "2px",
        }}
      >
        {/* Account Details */}
        <div className="px-10 pt-9 pb-8 border-b border-[rgba(201,162,52,0.15)]">
          <SectionHeader>Account Details</SectionHeader>

          <div className="mt-6">
            <label className="block text-[10px] uppercase tracking-[0.18em] text-[#8B7355] mb-2">
              Email Address
            </label>
            <div className="relative flex items-center">
              {user ? (
                <span
                  className="w-full font-body text-[13px] text-[#1A1408] pb-2 pr-6 block"
                  style={{ borderBottom: "1px solid rgba(201,162,52,0.3)" }}
                >
                  {user.email}
                </span>
              ) : (
                <div
                  className="w-full pb-2 block"
                  style={{ borderBottom: "1px solid rgba(201,162,52,0.3)" }}
                >
                  <div className="h-4 w-48 bg-[rgba(201,162,52,0.12)] rounded animate-pulse" />
                </div>
              )}
              <Lock
                size={12}
                className="absolute right-0 bottom-2.5 text-[#C9A234] shrink-0"
              />
            </div>
            <p className="text-[11px] text-[#8B7355] italic mt-2.5 leading-relaxed">
              Your email is used for sign-in and cannot be changed. To use a different address, create a new account.
            </p>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="px-10 pt-8 pb-9">
          <SectionHeader danger>Danger Zone</SectionHeader>

          <div
            className="mt-6 p-5"
            style={{
              border: "1px solid rgba(180,50,50,0.2)",
              background: "rgba(180,50,50,0.03)",
              borderRadius: "2px",
            }}
          >
            <p
              className="font-body text-[12px] uppercase tracking-[0.15em] mb-1"
              style={{ color: "#8B2020" }}
            >
              Delete Account
            </p>
            <p className="font-body text-[12px] text-[#9A8F7E] leading-relaxed mb-4">
              Permanently removes your account, saved ideas, and all enquiries. This cannot be undone.
            </p>

            {!confirmDelete ? (
              <button
                onClick={() => setConfirmDelete(true)}
                className="h-9 px-5 font-body text-[10px] uppercase tracking-[0.25em] transition-all duration-200 hover:bg-[#8B2020] hover:text-white"
                style={{
                  border: "1px solid #8B2020",
                  color: "#8B2020",
                  background: "transparent",
                  borderRadius: "2px",
                }}
              >
                Delete Account
              </button>
            ) : (
              <div className="flex flex-col gap-3">
                <p className="font-body text-[12px] font-semibold" style={{ color: "#8B2020" }}>
                  Are you sure? This will erase everything permanently.
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="h-9 px-5 bg-[#8B2020] text-white font-body text-[10px] uppercase tracking-[0.25em] transition-opacity hover:opacity-90 disabled:opacity-60 flex items-center gap-2"
                    style={{ borderRadius: "2px" }}
                  >
                    {deleting ? (
                      <><Loader2 size={13} className="animate-spin" /> Deleting…</>
                    ) : (
                      "Yes, Delete"
                    )}
                  </button>
                  <button
                    onClick={() => setConfirmDelete(false)}
                    disabled={deleting}
                    className="h-9 px-5 font-body text-[10px] uppercase tracking-[0.25em] text-[#9A8F7E] transition-all duration-200 hover:text-[#1A1408]"
                    style={{
                      border: "1px solid #EDE8DC",
                      background: "transparent",
                      borderRadius: "2px",
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {error && (
              <p className="font-body text-[12px] text-[#E87B3A] mt-3">{error}</p>
            )}
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
    </AccountLayout>
  );
}

function SectionHeader({ children, danger }) {
  return (
    <div>
      <p
        className="text-[10px] uppercase tracking-[0.3em] font-medium flex items-center gap-2"
        style={{ color: danger ? "#8B2020" : "#1A1408" }}
      >
        <span className="text-[8px]" style={{ color: danger ? "#8B2020" : "#C9A234" }}>◆</span>
        {children}
      </p>
      <div
        className="mt-2 h-px"
        style={{ background: danger ? "rgba(180,50,50,0.2)" : "rgba(201,162,52,0.25)" }}
      />
    </div>
  );
}
