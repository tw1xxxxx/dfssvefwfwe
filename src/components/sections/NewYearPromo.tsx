"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useLeadModal } from "@/components/site/LeadModalProvider";

type PromoSnowVars = {
  "--float-dur"?: string;
  "--spin-dur"?: string;
  "--delay"?: string;
};

export function NewYearPromo({ className }: { className?: string }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const { open } = useLeadModal();

  const deadline = useMemo(
    () => new Date(2026, 2, 1, 0, 0, 0),
    [],
  );

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateCountdown = () => {
      const diff = Math.max(0, deadline.getTime() - Date.now());
      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      setCountdown({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const id = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(id);
  }, [deadline]);

  if (!mounted) {
    return (
      <div className={`relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8 min-h-[400px] ${className || ""}`} />
    );
  }

  return (
    <div className={`relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8 ${className || ""}`}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="absolute -left-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-indigo-500/10 blur-3xl" />
        {[
          {
            size: 132,
            left: "-8%",
            top: "8%",
            floatDur: "16s",
            spinDur: "46s",
            delay: "-3s",
            opacity: 0.22,
          },
          {
            size: 96,
            left: "70%",
            top: "-10%",
            floatDur: "18s",
            spinDur: "54s",
            delay: "-11s",
            opacity: 0.18,
          },
          {
            size: 84,
            left: "88%",
            top: "42%",
            floatDur: "15s",
            spinDur: "50s",
            delay: "-7s",
            opacity: 0.16,
          },
          {
            size: 112,
            left: "12%",
            top: "62%",
            floatDur: "20s",
            spinDur: "62s",
            delay: "-15s",
            opacity: 0.14,
          },
          {
            size: 76,
            left: "38%",
            top: "20%",
            floatDur: "14s",
            spinDur: "40s",
            delay: "-9s",
            opacity: 0.12,
          },
        ].map((x, idx) => (
          <span
            key={idx}
            style={
              {
                position: "absolute",
                width: x.size,
                height: x.size,
                left: x.left,
                top: x.top,
                opacity: x.opacity,
                "--float-dur": x.floatDur,
                "--spin-dur": x.spinDur,
                "--delay": x.delay,
              } as CSSProperties & PromoSnowVars
            }
            className="promo-snow-float"
          >
            <div
              className="animate-promo-float rounded-full bg-gradient-to-br from-white/5 to-transparent"
            />
          </span>
        ))}
      </div>

      <div className="relative z-10 flex h-full flex-col">
        <div className="text-xs font-semibold tracking-wide text-white/60">
          НОВОГОДНЯЯ АКЦИЯ
        </div>

        <div className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
          Сайт под ключ за{" "}
          <span className="text-[color:var(--color-accent-2)]">
            33&nbsp;000 ₽
          </span>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-2 sm:gap-3">
          {[
            { v: String(countdown.days), k: "дней" },
            { v: String(countdown.hours).padStart(2, "0"), k: "часов" },
            { v: String(countdown.minutes).padStart(2, "0"), k: "мин" },
            { v: String(countdown.seconds).padStart(2, "0"), k: "сек" },
          ].map((x) => (
            <div
              key={x.k}
              className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3 text-center"
            >
              <div className="text-lg font-semibold tabular-nums sm:text-xl">
                {x.v}
              </div>
              <div className="mt-0.5 text-[11px] text-white/55 sm:text-xs">
                {x.k}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 mb-8 space-y-3 text-sm text-white/75">
          {[
            "Дешевое и быстрое решение",
            "SEO-оптимизация",
            "Размещение и настройка",
          ].map((t) => (
            <div key={t} className="flex gap-3">
              <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-white/40" />
              <div>{t}</div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() =>
            open({ serviceName: "Сайт под ключ — новогодняя акция" })
          }
          className="mt-auto inline-flex h-12 w-full items-center justify-center rounded-full bg-[color:var(--color-accent-2)] px-6 text-sm font-semibold text-black transition-colors hover:bg-[#2dd4bf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ring)]"
        >
          Заказать
        </button>
      </div>
    </div>
  );
}

