"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useLeadModal } from "@/components/site/LeadModalProvider";

export function MobileFloatingButton() {
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();
  const { open } = useLeadModal();

  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      // Show button when scrolled past 80vh (approx. after Hero section)
      const shouldShow = window.scrollY > window.innerHeight * 0.8;
      setIsVisible(shouldShow);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Check initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  if (pathname !== "/") return null;

  return (
    <div
      className={`fixed bottom-6 left-4 right-4 z-50 transition-all duration-500 md:hidden ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      <button
        onClick={() => open()}
        className="w-full rounded-full bg-[color:var(--color-accent-2)] py-4 text-base font-bold text-black shadow-[0_0_20px_rgba(45,212,191,0.3)] transition-transform active:scale-[0.98]"
      >
        Заказать проект
      </button>
    </div>
  );
}
