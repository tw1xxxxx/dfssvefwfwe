"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { InView } from "@/components/ui/InView";

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-[color:var(--color-accent)]/30 via-white/5 to-[color:var(--color-accent-2)]/25 ring-1 ring-white/10">
      <span className="text-base font-semibold text-white/85">{initials}</span>
    </div>
  );
}

const TEAM_DATA = [
  {
    id: "alexey",
    role: "Тимлид",
    name: "Алексей",
    quote: "Скорость важна, но предсказуемость важнее.",
    initials: "АЛ",
    image: "/staff/dev1.png",
  },
  {
    id: "maria",
    role: "Архитектор",
    name: "Мария",
    quote: "Архитектура — это про риски и масштабирование.",
    initials: "МР",
  },
  {
    id: "dmitry",
    role: "UX/UI дизайнер",
    name: "Дмитрий",
    quote: "Дизайн — это путь пользователя к действию.",
    initials: "ДК",
  },
  {
    id: "ivan",
    role: "Backend разработчик",
    name: "Иван",
    quote: "Код должен быть чистым, а API — предсказуемым.",
    initials: "ИВ",
    image: "/staff/dev4.png",
  },
  {
    id: "anna",
    role: "Frontend разработчик",
    name: "Анна",
    quote: "Интерфейс — это лицо продукта.",
    initials: "АН",
  },
  {
    id: "sergey",
    role: "QA инженер",
    name: "Сергей",
    quote: "Баги не пройдут, если тесты покрывают всё.",
    initials: "СЕ",
  },
  {
    id: "elena",
    role: "Project Manager",
    name: "Елена",
    quote: "Дедлайны — это обещания, которые мы держим.",
    initials: "ЕЛ",
  },
  {
    id: "maxim",
    role: "DevOps инженер",
    name: "Максим",
    quote: "Автоматизация — ключ к стабильности.",
    initials: "МА",
  },
  {
    id: "artem",
    role: "Mobile разработчик",
    name: "Артем",
    quote: "Плавность работы приложения — наш приоритет.",
    initials: "АР",
  },
  {
    id: "olga",
    role: "Data Scientist",
    name: "Ольга",
    quote: "Данные говорят больше, чем слова.",
    initials: "ОЛ",
  },
  {
    id: "viktor",
    role: "Системный аналитик",
    name: "Виктор",
    quote: "Сначала требования, потом реализация.",
    initials: "ВИ",
  },
  {
    id: "ksenia",
    role: "HR менеджер",
    name: "Ксения",
    quote: "Люди — главный актив любой компании.",
    initials: "КС",
  },
  {
    id: "nikolay",
    role: "SEO специалист",
    name: "Николай",
    quote: "Первые позиции в поиске — результат системы.",
    initials: "НИ",
  },
  {
    id: "yulia",
    role: "Copywriter",
    name: "Юлия",
    quote: "Слова должны продавать и вдохновлять.",
    initials: "ЮЛ",
  },
  {
    id: "andrey",
    role: "Support Lead",
    name: "Андрей",
    quote: "Помощь пользователю — наша главная цель.",
    initials: "АН",
  },
];

const STACK_DATA = [
  { name: "React", icon: "⚛️", color: "text-[#61DAFB]" },
  { name: "Next.js", icon: "▲", color: "text-white" },
  { name: "TypeScript", icon: "TS", color: "text-[#3178C6]" },
  { name: "Node.js", icon: "", color: "text-[#339933]" },
  { name: "Python", icon: "🐍", color: "text-[#3776AB]" },
  { name: "Django", icon: "DJ", color: "text-[#092E20]" },
  { name: "Flutter", icon: "", color: "text-[#02569B]" },
  { name: "PostgreSQL", icon: "🐘", color: "text-[#4169E1]" },
  { name: "Redis", icon: "", color: "text-[#DC382D]" },
  { name: "Docker", icon: "🐳", color: "text-[#2496ED]" },
  { name: "AWS", icon: "", color: "text-[#FF9900]" },
  { name: "GCP", icon: "", color: "text-[#4285F4]" },
  { name: "Tailwind", icon: "", color: "text-[#06B6D4]" },
  { name: "Figma", icon: "", color: "text-[#F24E1E]" },
  { name: "Git", icon: "", color: "text-[#F05032]" },
];

const STATS_DATA = [
  { k: "5+ лет", v: "на рынке", icon: "🚀" },
  { k: "720+", v: "проектов в продакшене", icon: "💎" },
  { k: "12", v: "экспертов в команде", icon: "👥" },
];

export function About() {
  return (
    <section id="about" className="relative border-t border-white/10 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[1px] w-full max-w-4xl bg-gradient-to-r from-transparent via-[color:var(--color-accent-2)]/50 to-transparent" />

      <Container>
        <div className="py-24">
          <InView>
            <div className="flex flex-col items-center text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent-2)]" />
                About Us
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl">
                Задача в <span className="text-[color:var(--color-accent-2)]">надежных руках</span>
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
                Наша миссия — помогать бизнесу расти через технологии. Мы
                погружаемся в контекст, чтобы построить решение, которое работает
                в реальности.
              </p>
            </div>
          </InView>

          <div className="grid gap-6 lg:grid-cols-[1fr_auto]">
            <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="text-xl font-semibold text-white/90">Команда</div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      const container = document.getElementById('team-slider');
                      if (container) container.scrollBy({ left: -300, behavior: 'smooth' });
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
                  >
                    <svg className="h-4 w-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => {
                      const container = document.getElementById('team-slider');
                      if (container) container.scrollBy({ left: 300, behavior: 'smooth' });
                    }}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
                  >
                    <svg className="h-4 w-4 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <div 
                id="team-slider"
                className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {TEAM_DATA.map((p, idx) => (
                  <div 
                    key={p.id}
                    className="flex-none w-[320px] snap-center"
                  >
                    <div className="group flex flex-col items-center text-center p-8 rounded-[2rem] border border-white/5 bg-white/[0.03] transition-all duration-500 hover:border-emerald-500/30 hover:bg-emerald-500/[0.02] hover:-translate-y-1 h-full">
                      <div className="relative mb-6">
                        <div className="relative h-44 w-44 overflow-hidden rounded-[3rem] bg-gradient-to-br from-[color:var(--color-accent)]/30 via-white/5 to-[color:var(--color-accent-2)]/25 ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3">
                          {p.image ? (
                             <Image
                               key={`${p.id}-image`}
                               src={p.image}
                               alt={p.name}
                               fill
                               className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-3"
                             />
                           ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <span className="text-4xl font-bold text-white/85">{p.initials}</span>
                            </div>
                          )}
                          {/* Stylish overlay/border */}
                          <div className="absolute inset-0 ring-1 ring-inset ring-white/20 group-hover:ring-emerald-500/50 transition-colors" />
                        </div>
                        
                        <div className="absolute -inset-4 rounded-full bg-emerald-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      </div>
                      <div className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors">{p.role}</div>
                      <div className="mt-1 text-sm text-white/40">{p.name}</div>
                      <div className="mt-6 text-sm italic leading-relaxed text-white/50 px-4 line-clamp-3">
                        “{p.quote}”
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:w-[320px]">
              <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm">
                <div className="mb-6">
                  <div className="text-sm font-bold uppercase tracking-wider text-white/40">Цифры говорят за нас</div>
                </div>
                <div className="grid gap-3">
                  {STATS_DATA.map((s, idx) => (
                    <InView key={s.k} delayMs={idx * 100}>
                      <div className="group relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] p-4 transition-all duration-500 hover:border-emerald-500/30 hover:bg-emerald-500/[0.02]">
                        <div className="relative z-10 flex items-center gap-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-xl transition-all duration-500 group-hover:bg-emerald-500 group-hover:text-black group-hover:shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                            {s.icon}
                          </div>
                          <div>
                            <div className="text-xl font-black text-white group-hover:text-emerald-400 transition-colors duration-500 tracking-tight">
                              {s.k}
                            </div>
                            <div className="text-[9px] font-bold uppercase tracking-wider text-white/30 group-hover:text-white/50 transition-colors">
                              {s.v}
                            </div>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-emerald-500/40 transition-all duration-1000 group-hover:w-full" />
                      </div>
                    </InView>
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#38bdf8]/10 to-transparent p-6">
                <div className="relative z-10">
                  <div className="text-[10px] font-bold text-[#38bdf8] uppercase tracking-widest mb-1">Наш подход</div>
                  <div className="text-sm font-semibold text-white/90">Стек под задачу</div>
                  <p className="mt-2 text-[11px] leading-relaxed text-white/50">
                    Мы выбираем лучшее решение для вашего бизнеса.
                  </p>
                </div>
                <div className="absolute -right-8 -bottom-8 h-24 w-24 rounded-full bg-[#38bdf8]/10 blur-3xl" />
              </div>
            </div>
          </div>

          {/* Tech Stack Grid */}
          <div className="mt-6 rounded-[2.5rem] border border-white/10 bg-white/[0.02] p-8 overflow-hidden backdrop-blur-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <div className="text-xl font-semibold text-white/90">Технологический стек</div>
                <p className="mt-1 text-xs text-white/50">Современные инструменты для ваших решений</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {STACK_DATA.map((t, idx) => (
                <InView key={t.name} delayMs={idx * 30}>
                  <div className="group relative rounded-2xl border border-white/5 bg-white/[0.03] p-3 transition-all hover:border-[color:var(--color-accent-2)]/30 hover:bg-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-base transition-transform group-hover:scale-110 ${t.color}`}>
                        {t.icon}
                      </div>
                      <div className="text-[11px] font-medium text-white/70 group-hover:text-white transition-colors">
                        {t.name}
                      </div>
                    </div>
                  </div>
                </InView>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
