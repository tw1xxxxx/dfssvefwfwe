"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { InView } from "@/components/ui/InView";

type FAQItem = {
  question: string;
  answer: string;
};

const faqItems: FAQItem[] = [
  {
    question: "Какой бюджет на рекламу необходим для старта?",
    answer:
      "Минимальный бюджет зависит от вашей ниши, конкуренции и региона. Обычно мы рекомендуем начинать от 50 000 рублей для тестового запуска. Это позволяет собрать достаточно данных для аналитики и последующей оптимизации кампаний.",
  },
  {
    question: "Контекстная реклама или SEO продвижение?",
    answer:
      "Контекстная реклама (Яндекс.Директ) дает быстрый результат — заявки могут пойти уже в первый день. SEO-продвижение — это долгосрочная инвестиция, которая со временем снижает стоимость привлечения клиента до минимума. Мы рекомендуем комбинированный подход для максимальной эффективности.",
  },
  {
    question: "Есть ли поддержка после сдачи?",
    answer:
      "После сдачи любого проекта вы получаете 6 месяцев бесплатной гарантийной поддержки. Также предлагаем абонентское обслуживание — от 25 000 ₽/мес с приоритетной обработкой заявок, мониторингом и бэкапами.",
  },
  {
    question: "А что если результат нас не устроит?",
    answer:
      "На каждом этапе вы согласовываете результат перед переходом к следующему. Это исключает ситуацию, когда в конце всё не то. До 3 раундов правок на этапе дизайна включены в стоимость. Все гарантии закреплены в договоре.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative border-t border-white/10 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-[#38bdf8]/5 blur-[120px]" />
      
      <Container>
        <div className="py-16 sm:py-20">
          <InView>
            <div className="max-w-3xl mb-12">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent-2)]" />
                Вопросы и ответы
              </div>
              <h2 className="mt-5 text-3xl font-light tracking-[0.1em] sm:text-4xl lg:text-5xl uppercase text-white/90">
                Часто задаваемые <br />
                <span className="text-[color:var(--color-accent-2)] font-semibold">вопросы</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/60">
                Собрали ответы на самые популярные вопросы, чтобы вам было проще 
                сориентироваться в наших процессах и условиях работы.
              </p>
            </div>
          </InView>

          <div className="mx-auto max-w-4xl space-y-3">
            {faqItems.map((item, index) => (
              <InView key={index} delayMs={index * 50}>
                <div 
                  className={`group overflow-hidden rounded-xl border transition-all duration-300 ${
                    openIndex === index 
                      ? "border-[color:var(--color-accent-2)]/30 bg-white/5" 
                      : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                  }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="flex w-full items-center justify-between p-5 text-left focus:outline-none"
                  >
                    <span className={`text-base font-medium transition-colors duration-300 ${
                      openIndex === index ? "text-[color:var(--color-accent-2)]" : "text-white/80 group-hover:text-white"
                    }`}>
                      {item.question}
                    </span>
                    <div className={`ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ease-in-out ${
                      openIndex === index 
                        ? "border-[color:var(--color-accent-2)]/30 bg-[color:var(--color-accent-2)]/10 text-[color:var(--color-accent-2)] rotate-180" 
                        : "border-white/10 text-white/40"
                    }`}>
                      <svg 
                        className="h-3.5 w-3.5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor" 
                        strokeWidth="2.5"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-sm leading-6 text-white/60 border-t border-white/5 pt-3">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
