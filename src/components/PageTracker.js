"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Stores the path the user was on BEFORE navigating to /contact,
// so the contact form can report which page drove the enquiry.
export default function PageTracker() {
  const pathname = usePathname();
  const prevRef = useRef(null);

  useEffect(() => {
    if (prevRef.current && prevRef.current !== pathname) {
      sessionStorage.setItem("cta_source_path", prevRef.current);
    }
    prevRef.current = pathname;
  }, [pathname]);

  return null;
}
