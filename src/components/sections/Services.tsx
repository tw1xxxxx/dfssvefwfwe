"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { InView } from "@/components/ui/InView";
import { useLeadModal } from "@/components/site/LeadModalProvider";

type Service = {
  id: string;
  problem: string;
  solution: string;
  description: string;
};

export function Services() {
  const { open } = useLeadModal();
  const services = useMemo<Service[]>(
    () => [
      {
        id: "web",
        problem: "Просели продажи?",
        solution: "Сайты, которые превращают посетителей в клиентов",
        description:
          "Мы не просто рисуем макеты. Мы проектируем воронки, упаковываем смыслы и внедряем UX, который ведет пользователя к целевому действию. Ваша задумка обретает форму, которая приносит прибыль.",
      },
      {
        id: "mobile",
        problem: "Нужно мобильное приложение, но пугает сложность?",
        solution: "Профессиональная разработка под iOS и Android",
        description:
          "Берем на себя всё: от проектирования интуитивного интерфейса до публикации в сторах. Гарантируем стабильную работу и бесшовную интеграцию с вашим бизнесом. Мы понимаем вашу идею и знаем, как ее реализовать.",
      },
      {
        id: "systems",
        problem: "Хаос в процессах мешает масштабированию?",
        solution: "Автоматизация и CRM под ваши задачи",
        description:
          "Создаем единую экосистему для вашего бизнеса. Избавляем от рутины, объединяем данные и исключаем ошибки. Вы получаете полный контроль и прозрачную отчетность, а мы обеспечиваем внедрение и обучение команды.",
      },
    ],
    [],
  );

  const [openId, setOpenId] = useState<string>("web");

  return (
    <section id="services" className="hidden md:block border-t border-white/10">
      <Container>
        <div className="py-16">
          <InView>
            <div className="max-w-3xl">
              <div className="text-xs font-semibold tracking-wide text-white/55">
                SERVICES
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Мы решаем задачи, а не продаём услуги
              </h2>
              <p className="mt-4 text-base leading-7 text-white/65">
                Выберите проблему — покажем подход, технологии и путь до
                результата.
              </p>
            </div>
          </InView>

          <div className="mt-12 grid gap-6 items-start lg:grid-cols-[1fr_1.2fr]">
            <div className="space-y-4">
              {services.map((s, idx) => (
                <InView key={s.id} delayMs={idx * 60}>
                  <button
                    type="button"
                    onClick={() => setOpenId(s.id)}
                    className={[
                      "group relative w-full overflow-hidden rounded-[2rem] border p-1 text-left transition-all duration-500",
                      openId === s.id
                        ? "border-emerald-500/30 bg-emerald-500/5 shadow-[0_0_40px_rgba(16,185,129,0.05)]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]",
                    ].join(" ")}
                  >
                    <div className="relative z-10 px-7 py-6">
                      <div className="flex items-center justify-between">
                        <div
                          className={[
                            "text-xs font-medium uppercase tracking-wider transition-colors duration-300",
                            openId === s.id
                              ? "text-emerald-400"
                              : "text-white/40 group-hover:text-white/60",
                          ].join(" ")}
                        >
                          {s.id === "web"
                            ? "Web Development"
                            : s.id === "mobile"
                              ? "Mobile Apps"
                              : "Automation"}
                        </div>
                        {openId === s.id && (
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                            <svg
                              className="h-3.5 w-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth="3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="mt-3 text-lg font-medium leading-tight text-white/90">
                        {s.problem}
                      </div>
                      <div
                        className={[
                          "mt-2 text-sm transition-all duration-300",
                          openId === s.id
                            ? "text-white/70"
                            : "text-white/40 group-hover:text-white/50",
                        ].join(" ")}
                      >
                        {s.solution}
                      </div>
                    </div>

                    {/* Active Indicator Bar */}
                    {openId === s.id && (
                      <div className="absolute left-0 top-0 h-full w-1 bg-emerald-500" />
                    )}
                  </button>
                </InView>
              ))}
            </div>

            <div className="relative">
              {/* Decorative background for the detail card */}
              <div className="absolute -inset-0.5 rounded-[2.5rem] bg-gradient-to-b from-emerald-500/10 to-transparent blur-2xl" />

              <div className="relative rounded-[2.5rem] border border-white/10 bg-[#0a0f1a]/60 p-7 backdrop-blur-xl sm:p-9">
                {services
                  .filter((s) => s.id === openId)
                  .map((s) => (
                    <div
                      key={s.id}
                      className="flex flex-col animate-in fade-in slide-in-from-right-4 duration-500"
                    >
                      <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                          Solution
                        </div>
                        <h3 className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-3xl">
                          {s.solution}
                        </h3>
                        <p className="mt-4 text-base leading-relaxed text-white/60">
                          {s.description}
                        </p>

                        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
                          <button
                            type="button"
                            onClick={() =>
                              open({
                                serviceId: s.id,
                                serviceName: s.solution,
                              })
                            }
                            className="group relative inline-flex h-12 items-center justify-center gap-3 overflow-hidden rounded-full bg-emerald-500 px-8 text-sm font-bold text-black transition-all hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] active:scale-[0.98]"
                          >
                            <span className="relative z-10">
                              Заказать
                            </span>
                            <svg 
                              className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor" 
                              strokeWidth="2.5"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                          </button>

                          <Button
                            variant="secondary"
                            href="/cases"
                            className="group h-12 gap-3 rounded-full border-white/10 px-8 text-sm font-semibold transition-all hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-400"
                          >
                            <span>Смотреть кейсы</span>
                            <svg 
                              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor" 
                              strokeWidth="2"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </Button>
                        </div>
                      </div>

                      <div className="pt-8">
                        <p className="flex items-center justify-center gap-2 text-xs font-medium text-white/30">
                          <span className="h-1 w-1 rounded-full bg-emerald-500/50" />
                          Предварительная оценка стоимости за 7 минут
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

