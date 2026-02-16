"use client";

import { useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { InView } from "@/components/ui/InView";

type Step = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  link?: {
    label: string;
    href: string;
  };
};

export function Process() {
  const steps = useMemo<Step[]>(
    () => [
      {
        id: "discussion",
        title: "Обсуждение",
        subtitle: "Слушаем и слышим",
        icon: (
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        ),
        description:
          "Максимальное погружение в вашу задачу. Нам важно понять истинные цели бизнеса и боли пользователей.",
      },
      {
        id: "proposal",
        title: "Формирование КП",
        subtitle: "Прозрачность и план",
        icon: (
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
        ),
        description:
          "Детальное коммерческое предложение: все виды работ, этапы реализации и итоговая стоимость.",
      },
      {
        id: "contract",
        title: "Заключение договора",
        subtitle: "Юридическая чистота",
        icon: (
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
        ),
        description:
          "Договор, гарантирующий качество и сроки. Работаем в белую и несем полную ответственность.",
        link: {
          label: "Пример договора",
          href: "/docs/sample-contract.pdf",
        }
      },
      {
        id: "development",
        title: "Активная разработка",
        subtitle: "Постоянный прогресс",
        icon: (
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
            <line x1="12" y1="2" x2="12" y2="22" />
          </svg>
        ),
        description:
          "Прогресс в реальном времени. Вносите коррективы на любом этапе, чтобы продукт был идеальным.",
      },
      {
        id: "approval",
        title: "Согласование и правки",
        subtitle: "Ваше видение",
        icon: (
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <polyline points="16 11 18 13 22 9" />
          </svg>
        ),
        description:
          "Доводим каждую деталь до совершенства на основе вашей обратной связи и финальных тестов.",
      },
      {
        id: "launch",
        title: "Размещение и запуск",
        subtitle: "Готовый результат",
        icon: (
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-5c1.62-2.2 5-3 5-3" />
            <path d="M12 15v5s3.03-.55 5-2c2.2-1.62 3-5 3-5" />
          </svg>
        ),
        description:
          "Полностью работающий продукт на вашем хостинге, готовый к приему первых пользователей.",
      },
    ],
    [],
  );

  return (
    <section id="process" className="relative border-t border-white/10 bg-[#030712] py-24 sm:py-32">
      {/* Background gradients */}
      <div className="absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-emerald-500/[0.03] blur-[100px]" />
      <div className="absolute left-0 bottom-0 h-[400px] w-[400px] rounded-full bg-emerald-500/[0.03] blur-[100px]" />

      <Container>
        <InView>
          <div className="mb-8 md:mb-24 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-1.5 text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] text-emerald-400">
              Workflow
            </div>
            <h2 className="mt-3 md:mt-6 text-3xl md:text-4xl font-semibold tracking-tight sm:text-5xl text-white">
              Решение в <span className="text-emerald-400 text-glow">6 шагов</span>
            </h2>
            <p className="mt-3 md:mt-6 text-sm md:text-lg text-white/40 max-w-2xl mx-auto">
              Прозрачный процесс работы от первого обсуждения до запуска готового продукта.
            </p>
          </div>
        </InView>

        <div className="grid gap-3 grid-cols-2 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, idx) => (
            <InView key={step.id} delayMs={idx * 100}>
              <div className="group relative h-full rounded-2xl md:rounded-3xl border border-white/10 bg-white/5 p-4 md:p-8 transition-all hover:border-emerald-500/30 hover:bg-white/[0.07]">
                <div className="mb-3 md:mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-0">
                  <div className="flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-xl md:rounded-2xl bg-white/5 text-emerald-400 ring-1 ring-white/10 transition-transform group-hover:scale-110 group-hover:bg-emerald-500/10 group-hover:ring-emerald-500/20">
                    <div className="w-5 h-5 md:w-auto md:h-auto flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                  <span className="text-2xl md:text-6xl font-bold text-white/5 group-hover:text-emerald-500/10 transition-colors">
                    0{idx + 1}
                  </span>
                </div>
                
                <h3 className="mb-1 md:mb-2 text-sm md:text-xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-[10px] md:text-sm font-bold uppercase tracking-wider text-white/40 mb-2 md:mb-4">
                  {step.subtitle}
                </p>

                <p className="hidden md:block text-base leading-relaxed text-white/60">
                  {step.description}
                </p>

                {step.link && (
                  <a
                    href={step.link.href}
                    download
                    className="mt-2 md:mt-6 inline-flex items-center gap-2 text-[10px] md:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <svg className="h-3 w-3 md:h-4 md:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {step.link.label}
                  </a>
                )}
              </div>
            </InView>
          ))}
        </div>
      </Container>
    </section>
  );
}
