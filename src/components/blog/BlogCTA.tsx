"use client";

import { useLeadModal } from "@/components/site/LeadModalProvider";

export function BlogCTA() {
  const { open } = useLeadModal();

  return (
    <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
      <div className="text-center sm:text-left">
        <h3 className="text-lg font-bold leading-tight text-white sm:text-xl lg:text-2xl">
          А любое IT решение дешевле и быстрее с Альфа Девелопмент!
        </h3>
        <p className="mt-2 text-sm text-white/60 sm:text-base">
          Всего один звонок и 7 минут
        </p>
      </div>
      <div className="mt-6 flex justify-center sm:mt-0 sm:shrink-0">
        <button
          onClick={() => open()}
          className="rounded-full bg-[color:var(--color-accent-2)] px-6 py-3 text-sm font-bold uppercase tracking-wide text-black transition-all hover:bg-[#2dd4bf] active:scale-[0.98]"
        >
          Обсудить
        </button>
      </div>
    </div>
  );
}
