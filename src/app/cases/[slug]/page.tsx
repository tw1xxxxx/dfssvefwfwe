import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getCaseBySlug, getCases } from "@/lib/cases-db";
import { CaseOrderButton } from "@/components/cases/CaseOrderButton";
import { ImageCarousel } from "@/components/ui/ImageCarousel";
import { VideoPlayer } from "@/components/ui/VideoPlayer";
import { Metadata } from "next";
import { CaseBackButton } from "@/components/cases/CaseBackButton";

export const revalidate = 60;

export async function generateStaticParams() {
  const cases = await getCases();
  return cases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = await getCaseBySlug(slug);

  if (!item) return {};

  return {
    title: item.metaTitle || `${item.title} | Alpha`,
    description: item.metaDescription || item.challenge,
    keywords: item.metaKeywords || [item.industry, item.client, ...item.tags],
    openGraph: {
      images: item.imageUrl ? [item.imageUrl] : [],
    },
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  
  const item = await getCaseBySlug(slug);
  if (!item) notFound();

  return (
    <main className="min-h-screen">
      <Container>
        <div className="pt-32 pb-14 sm:pt-40 sm:pb-20">
          <CaseBackButton />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
            {/* Main Content */}
            <div className="space-y-10">
              <section>
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-widest text-[color:var(--color-accent)]">
                  <span>{item.industry}</span>
                  <span className="h-1 w-1 rounded-full bg-white/20" />
                  <span className="text-white/40">{item.client}</span>
                </div>
                <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  {item.title}
                </h1>
              </section>

              {/* Media Section */}
              {item.videoUrl ? (
                <section className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5">
                  <VideoPlayer
                    src={item.videoUrl}
                    className="aspect-video w-full"
                  />
                </section>
              ) : (
                <ImageCarousel
                  images={[item.imageUrl, ...(item.gallery || [])].filter((x): x is string => !!x)}
                />
              )}

              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/60">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="grid gap-10 sm:grid-cols-2">
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-white">Задача / Вызов</h2>
                  <p className="text-base leading-relaxed text-white/60">
                    {item.challenge}
                  </p>
                </div>
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-white">Наше решение</h2>
                  <p className="text-base leading-relaxed text-white/60">
                    {item.solution}
                  </p>
                </div>
              </div>

              {item.fullDescription && (
                <div className="space-y-4">
                  <h2 className="text-lg font-semibold text-white">Детали реализации</h2>
                  <p className="text-base leading-relaxed text-white/60">
                    {item.fullDescription}
                  </p>
                </div>
              )}

              {/* Results Grid */}
              <section className="space-y-6">
                <h2 className="text-lg font-semibold text-white">Результаты работы</h2>
                <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
                  {item.result.map((r, idx) => (
                    <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center transition-colors hover:bg-white/10">
                      <div className="text-lg font-bold text-[color:var(--color-accent)] sm:text-xl">{r.value}</div>
                      <div className="mt-0.5 text-[9px] font-medium text-white/40 uppercase tracking-wider leading-tight sm:text-[10px]">{r.description}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              <div className="sticky top-24 space-y-6">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
                  <div className="space-y-6">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Стоимость проекта</div>
                      <div className="mt-2 text-2xl font-semibold text-white">{item.price}</div>
                    </div>
                    
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Сроки выполнения</div>
                      <div className="mt-2 text-2xl font-semibold text-white">{item.duration}</div>
                    </div>

                    <div className="h-px bg-white/10" />

                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Стек технологий</div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tech.map((t) => (
                          <span key={t} className="rounded-xl border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/70">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <CaseOrderButton serviceType={item.serviceType} clientName={item.client} />
                </div>

                <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[color:var(--color-accent)]/10 to-transparent p-8">
                  <h3 className="text-lg font-semibold text-white">Есть проект?</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    Давайте обсудим вашу задачу и найдем оптимальное решение вместе.
                  </p>
                  <a
                    href="https://t.me/alpha_development_bot"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white/5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Написать в Telegram
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </main>
  );
}
