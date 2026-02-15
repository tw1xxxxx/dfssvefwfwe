"use client";

import { ReactNode, createContext, useContext, useMemo, useState, useEffect } from "react";
import { MultiStepLeadForm } from "@/components/forms/MultiStepLeadForm";
import { AnimatePresence, motion } from "framer-motion";

type LeadDraft = { serviceId?: string; serviceName?: string; skipStep2?: boolean };
type LeadModalApi = { open: (draft?: LeadDraft) => void };

const LeadModalContext = createContext<LeadModalApi | null>(null);

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    throw new Error("LeadModalProvider is missing.");
  }
  return ctx;
}

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [draft, setDraft] = useState<LeadDraft | null>(null);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const api = useMemo<LeadModalApi>(
    () => ({
      open(nextDraft) {
        setDraft(nextDraft ?? null);
        setIsOpen(true);
      },
    }),
    [],
  );

  return (
    <LeadModalContext.Provider value={api}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-[#05070a]/80 backdrop-blur-md"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0f1a]/90 p-6 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-10"
            >
              <button
                type="button"
                className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all hover:bg-white/10 hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="mt-2">
                <MultiStepLeadForm
                  serviceId={draft?.serviceId}
                  serviceName={draft?.serviceName}
                  skipStep2={draft?.skipStep2}
                  onSubmitted={() => {
                    // Wait a bit before closing to let user see success message
                    setTimeout(() => setIsOpen(false), 3000);
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LeadModalContext.Provider>
  );
}

