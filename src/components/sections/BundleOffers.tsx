"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { InView } from "@/components/ui/InView";
import { useLeadModal } from "@/components/site/LeadModalProvider";
import LazyVideo from "@/components/ui/LazyVideo";
import type { Bundle } from "@/lib/bundles-db";

export function BundleOffers({ bundles }: { bundles: Bundle[] }) {
  const { open } = useLeadModal();

  const [showAll, setShowAll] = useState(false);
  const visibleBundles = showAll ? bundles : bundles.slice(0, 3);

  const getGradient = (id: string) => {
    const num = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
    const gradients = [
      "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
      "bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-500",
      "bg-gradient-to-br from-orange-400 via-rose-500 to-purple-600",
      "bg-gradient-to-br from-blue-600 via-indigo-500 to-violet-500",
      "bg-gradient-to-br from-teal-400 via-emerald-500 to-green-600",
    ];
    return gradients[num % gradients.length];
  };

  return (
    <section className="border-t border-white/10">
      <Container>
        <div className="py-20">
          <InView>
            <div className="max-w-3xl">
              <div className="text-xs font-semibold tracking-wide text-white/55">
                PACKAGES
              </div>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                Комплексные предложения
              </h2>
              <p className="mt-4 text-base leading-7 text-white/65">
                Готовые форматы, где уже понятны состав работ, сроки и диапазон
                бюджета.
              </p>
            </div>
          </InView>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            {visibleBundles.map((b, idx) => (
              <InView key={b.id} delayMs={idx * 80} className="h-full">
                <div
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition-all hover:bg-white/[0.08] hover:border-white/20"
                >
                  <div className="relative h-48 w-full overflow-hidden rounded-t-3xl border-2 border-red-500/50">
                    {/* DEBUG: Show src */}
                    <div className="absolute top-0 left-0 z-50 bg-black/50 text-[10px] text-white p-1">
                        {b.images?.[0] || "No Image"}
                        {b.images?.[0] && <a href={b.images[0]} target="_blank" className="ml-2 underline text-blue-300">Open</a>}
                    </div>

                    {b.images && b.images[0] && b.images[0].endsWith(".mp4") ? (
                      <LazyVideo
                        src={b.images[0]}
                        trimEnd={b.videoSettings?.trimEnd}
                        className="h-full w-full object-cover"
                      />
                    ) : b.images && b.images[0] && b.images[0].startsWith("gradient-") ? (
                      <div className={`h-full w-full ${getGradient(b.images[0])}`} />
                    ) : b.images && b.images[0] ? (
                      <Image
                        src={b.images[0]}
                        alt={b.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className={`h-full w-full ${getGradient(b.id)}`} />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <div className="text-lg font-semibold tracking-tight">
                      {b.title}
                    </div>
                    {(b.shortDescription || b.description) && (
                      <p className="mt-2 text-sm text-white/60 line-clamp-2">
                        {b.shortDescription || b.description}
                      </p>
                    )}

                    <div className="mt-auto flex flex-col justify-end pt-8">
                      <div className="flex items-end justify-between gap-4">
                        <div className="flex-1">
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                            Срок
                          </div>
                          <div className="mt-1 text-sm font-medium text-white/80">
                            {b.duration}
                          </div>
                        </div>
                        <div className="flex-1 text-right">
                          <div className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                            Стоимость
                          </div>
                          <div className="mt-1 text-lg font-bold text-[color:var(--color-accent-2)]">
                            {b.price}
                          </div>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => open(b.title)}
                        className="mt-6 flex w-full items-center justify-center rounded-xl bg-white/10 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/20"
                      >
                        Заказать
                      </button>
                    </div>
                  </div>
                </div>
              </InView>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
