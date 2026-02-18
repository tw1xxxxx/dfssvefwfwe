"use client";

import { useLeadModal } from "@/components/site/LeadModalProvider";

export function BlogCTA() {
  const { open } = useLeadModal();

  return (
    <div className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8 text-center sm:p-12">
      <h3 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
        А любое IT решение дешевле и быстрее с Альфа Девелопмент!
      </h3>
      <p className="mt-4 text-lg text-white/60 sm:text-xl">
        Всего один звонок и 7 минут
      </p>
      <div className="mt-8 flex justify-center">
        <button
          onClick={() => open()}
          className="rounded-full bg-[color:var(--color-accent-2)] px-8 py-4 text-lg font-bold text-black transition-all hover:bg-[#2dd4bf] active:scale-[0.98]"
        >
          Обсудить
        </button>
      </div>
    </div>
  );
}
