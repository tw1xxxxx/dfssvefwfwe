"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Handle initial load and route changes
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900); // 900ms to see the full draw cycle

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeIn" }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#030712]"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative h-32 w-32"
          >
            {/* SVG Logo A */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full filter drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
              {/* Left leg */}
              <motion.path
                d="M 50 15 L 15 85"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                className="text-emerald-500"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
              />
              {/* Right leg */}
              <motion.path
                d="M 50 15 L 85 85"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                className="text-emerald-500"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
              />
              {/* Crossbar */}
              <motion.path
                d="M 32 55 L 68 55"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                className="text-emerald-500"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.2, ease: "easeOut", delay: 0.4 }}
              />

              {/* White core for extra pop (animates with the main lines) */}
              <motion.path
                d="M 50 15 L 15 85"
                fill="transparent"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                className="opacity-40"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
              />
              <motion.path
                d="M 50 15 L 85 85"
                fill="transparent"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                className="opacity-40"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
              />
              <motion.path
                d="M 32 55 L 68 55"
                fill="transparent"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                className="opacity-40"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.2, ease: "easeOut", delay: 0.4 }}
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
