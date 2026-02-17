"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import type { CaseStudy } from "@/lib/cases-db";
import { useLeadModal } from "@/components/site/LeadModalProvider";
import { CaseCard } from "@/components/cases/CaseCard";

type ServiceFilter = "all" | CaseStudy["serviceType"];
type IndustryFilter = "all" | string;

function label(filter: ServiceFilter) {
  if (filter === "all") return "Все";
  if (filter === "web") return "Веб";
  if (filter === "mobile") return "Мобильное";
  if (filter === "crm") return "CRM";
  return "Автоматизация";
}

export function CaseGrid({
  items,
  initialFilter = "all",
  limit,
}: {
  items: CaseStudy[];
  initialFilter?: ServiceFilter;
  limit?: number;
}) {
  const { open } = useLeadModal();
  const [filter, setFilter] = useState<ServiceFilter>(initialFilter);
  const [industry, setIndustry] = useState<IndustryFilter>("all");
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsIndustryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const industries = useMemo(() => {
    const unique = Array.from(new Set(items.map((x) => x.industry)));
    unique.sort((a, b) => a.localeCompare(b, "ru"));
    return unique;
  }, [items]);

  const filtered = useMemo(() => {
    let list =
      filter === "all" ? items : items.filter((x) => x.serviceType === filter);
    if (industry !== "all") {
      list = list.filter((x) => x.industry === industry);
    }
    return typeof limit === "number" ? list.slice(0, limit) : list;
  }, [filter, industry, items, limit]);

  return (
    <div className="relative">
      <div 
        className="sticky top-[80px] z-40 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between transition-all duration-300 py-2"
      >
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
          {(["all", "web", "mobile", "crm", "automation"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={[
                "whitespace-nowrap rounded-full border px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-medium transition-all flex-shrink-0 backdrop-blur-md",
                filter === f
                  ? "border-emerald-500/50 bg-[#064e3b]/80 text-emerald-400 shadow-lg shadow-emerald-500/10"
                  : "border-white/10 bg-[#0d111a]/80 text-white/60 hover:border-white/20 hover:bg-[#0d111a] hover:text-white",
              ].join(" ")}
            >
              {label(f) === "Все" ? "Все кейсы" : label(f)}
            </button>
          ))}
        </div>

        <div className="relative hidden sm:block" ref={dropdownRef}>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-white/40">Отрасль</span>
            <button
              onClick={() => setIsIndustryOpen(!isIndustryOpen)}
              className={[
                "flex h-11 items-center justify-between gap-3 rounded-2xl border px-4 text-sm font-medium transition-all",
                isIndustryOpen
                  ? "border-emerald-500/50 bg-white/10 text-white ring-2 ring-emerald-500/20"
                  : "border-white/10 bg-white/5 text-white/80 hover:border-white/20 hover:bg-white/10",
              ].join(" ")}
            >
              <span>{industry === "all" ? "Все отрасли" : industry}</span>
              <svg 
                className={`h-4 w-4 text-white/40 transition-transform duration-300 ${isIndustryOpen ? "rotate-180" : ""}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {isIndustryOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-64 origin-top-right overflow-hidden rounded-2xl border border-white/10 bg-[#0d111a] p-1.5 shadow-2xl shadow-black/50 animate-in fade-in zoom-in-95 duration-200">
              <button
                onClick={() => {
                  setIndustry("all");
                  setIsIndustryOpen(false);
                }}
                className={[
                  "flex w-full items-center rounded-xl px-3 py-2.5 text-sm transition-colors",
                  industry === "all"
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "text-white/60 hover:bg-white/5 hover:text-white",
                ].join(" ")}
              >
                Все отрасли
              </button>
              <div className="my-1 h-px bg-white/5" />
              <div className="max-h-60 overflow-y-auto custom-scrollbar">
                {industries.map((x) => (
                  <button
                    key={x}
                    onClick={() => {
                      setIndustry(x);
                      setIsIndustryOpen(false);
                    }}
                    className={[
                      "flex w-full items-center rounded-xl px-3 py-2.5 text-sm transition-colors",
                      industry === x
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "text-white/60 hover:bg-white/5 hover:text-white",
                    ].join(" ")}
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {filtered.map((c) => (
          <CaseCard key={c.slug} caseStudy={c} />
        ))}
      </div>
    </div>
  );
}
