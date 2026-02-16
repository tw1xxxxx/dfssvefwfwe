"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useLeadModal } from "@/components/site/LeadModalProvider";
import { NewYearPromo } from "@/components/sections/NewYearPromo";
import { InteractiveBackground } from "@/components/ui/InteractiveBackground";
import { useMemo, useState, useEffect } from "react";

export function Hero() {
  const { open } = useLeadModal();
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    // Optimization: Only mount heavy canvas on desktop
    const checkMobile = () => {
      setShowBackground(window.innerWidth >= 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const stats = useMemo(() => [
    { value: "720+", label: "успешных проектов" },
    { 
      value: (
        <>
          <span className="sm:hidden">~1792 ₽ в минуту</span>
          <span className="hidden sm:inline">~1792 ₽/мин</span>
        </>
      ), 
      label: "приносят наши проекты заказчикам" 
    },
    { 
      value: "6", 
      label: "проектов в работе", 
      isActive: true,
    },
  ], []);

  return (
    <section className="relative overflow-hidden">
      {showBackground && (
        <div className="hidden md:block absolute inset-0 -z-10">
          <InteractiveBackground />
        </div>
      )}
      <Container>
        <div className="relative grid min-h-[86svh] items-center gap-10 py-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="max-w-3xl flex flex-col">
            <div className="order-1 self-start inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[10px] sm:text-xs text-white/70">
              <span className="h-2 w-2 rounded-full bg-[color:var(--color-accent-2)] shadow-[0_0_14px_rgba(45,212,191,0.65)]" />
              Лидер мобильной разработки 2025 года по России
            </div>

            <h1 className="order-2 mt-4 sm:mt-6 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">
              <span className="relative inline-block">
                Ваш успех
              </span>
              <br />
              <span className="relative inline-block mt-1 sm:mt-2">
                — наша работа
              </span>
            </h1>
            <p className="order-3 mt-4 sm:mt-6 max-w-2xl text-sm leading-6 text-white/70 sm:text-lg sm:leading-7">
              <span className="font-semibold text-white/85">
                Продающие сайты, Web-платформы, CRM/CMS системы и мобильные
                приложения.
              </span>
            </p>

            <div className="order-5 sm:order-4 mt-8 sm:mt-10 flex flex-col-reverse items-center gap-4 sm:items-center sm:flex-row sm:gap-3">
              <button
                type="button"
                onClick={() => open()}
                className="inline-flex h-14 w-full sm:w-auto sm:h-12 items-center justify-center rounded-full bg-[color:var(--color-accent-2)] px-4 sm:px-6 text-base sm:text-sm font-semibold text-black transition-colors hover:bg-[#2dd4bf] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ring)]"
              >
                Заказать
              </button>
              <Button variant="secondary" href="/cases" className="!px-4 sm:!px-6 w-full sm:w-auto h-14 sm:h-12 text-base sm:text-sm">
                Смотреть кейсы
              </Button>
            </div>

            <div className="order-4 sm:order-5 mt-8 sm:mt-14 grid grid-cols-2 gap-3 sm:gap-6 sm:grid-cols-3">
              {stats.map((x, i) => {
                const orderClass = i === 0 ? "order-1 sm:order-1" :
                                   i === 1 ? "order-3 col-span-2 sm:order-2 sm:col-span-1" :
                                   "order-2 sm:order-3";

                return (
                  <div
                    key={x.label}
                    className={[
                      "relative w-full text-center group",
                      x.isActive ? "min-w-[120px]" : "",
                      orderClass
                    ].join(" ")}
                  >
                    <div className={`whitespace-nowrap text-lg sm:text-3xl lg:text-4xl font-semibold tracking-tight transition-all duration-500 ${x.isActive ? "text-emerald-400 scale-110" : "text-white"}`}>
                      <span className="relative inline-block">
                        {x.value}
                        {x.isActive ? (
                          <span className="pointer-events-none absolute -right-3 -top-1 h-3 w-3 sm:-right-6 sm:-top-2 sm:h-6 sm:w-6">
                            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/20" />
                            <span className="absolute inset-0 rounded-full bg-emerald-400/25 blur-md" />
                            <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 sm:h-2.5 sm:w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400 ring-1 ring-emerald-200/40 shadow-[0_0_18px_rgba(52,211,153,0.85)]" />
                          </span>
                        ) : null}
                      </span>
                    </div>
                    <div className="mt-1 text-xs sm:text-sm text-white/60">{x.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:justify-self-end relative group">
            <div className="relative z-10">
              <NewYearPromo />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
