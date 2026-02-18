import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { CaseCard } from "@/components/cases/CaseCard";
import { getBundleById, getBundles } from "@/lib/bundles-db";
import { getCases } from "@/lib/cases-db";
import { OrderButton } from "@/components/ui/OrderButton";
import { ImageCarousel } from "@/components/ui/ImageCarousel";

export const revalidate = 60;

export async function generateStaticParams() {
  const bundles = await getBundles();
  return bundles.map((b) => ({
    id: b.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bundle = await getBundleById(id);

  if (!bundle) {
    return {};
  }

  return {
    title: bundle.metaTitle || `${bundle.title} | Alpha`,
    description: bundle.metaDescription || bundle.description || bundle.shortDescription,
    keywords: bundle.metaKeywords,
  };
}

export default async function BundlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const bundle = await getBundleById(id);

  if (!bundle) {
    notFound();
  }

  const allCases = await getCases();
  const relatedCases = allCases
    .filter((c) => {
      if (bundle.id === "landing" || bundle.id === "corporate")
        return c.serviceType === "web";
      if (bundle.id === "app") return c.serviceType === "mobile";
      if (bundle.id === "crm" || bundle.id === "internal-tools")
        return c.serviceType === "crm";
      return false;
    })
    .slice(0, 2);

  return (
    <main className="min-h-screen pt-24 pb-20">
      <Container>
        <Link
          href="/#bundles"
          className="inline-flex items-center text-sm font-medium text-white/50 hover:text-white transition-colors mb-8"
        >
          ← Назад к предложениям
        </Link>

        <div className="mb-12">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
            Комплексное предложение
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            {bundle.title}
          </h1>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_350px]">
          <div>
            {bundle.images && bundle.images.length > 0 && (
              <ImageCarousel
                images={[bundle.images[0]]}
                videoTrimEnd={bundle.videoSettings?.trimEnd}
              />
            )}

            {bundle.visibleTags && bundle.visibleTags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {bundle.visibleTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/90 shadow-sm backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105 hover:border-white/20 hover:shadow-[0_0_15px_rgba(45,212,191,0.15)]"
                  >
                    <span className="mr-1.5 text-[color:var(--color-accent-2)]">#</span>
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <p className="mt-6 text-lg leading-relaxed text-white/70">
              {bundle.description}
            </p>

            <div className="mt-12">
              <h2 className="text-xl font-semibold text-white">
                Что входит в стоимость
              </h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {bundle.detailedFeatures?.map((feature, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-[color:var(--color-accent-2)]" />
                    <span className="text-sm leading-relaxed text-white/75">
                      {feature}
                    </span>
                  </div>
                )) || (
                  <div className="text-white/50">
                    Описание состава работ готовится...
                  </div>
                )}
              </div>
            </div>

            <div className="mt-12">
              <h2 className="text-xl font-semibold text-white">Технологии</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {bundle.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm font-medium text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-24 flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:min-h-[calc((100vw-446px)*0.5625)] xl:min-h-[460px]">
              <div>
                <div className="text-sm font-medium uppercase tracking-wider text-white/50">Стоимость</div>
                <div className="mt-3 text-4xl sm:text-5xl font-bold text-[color:var(--color-accent-2)] tracking-tight">
                  {bundle.price}
                </div>

                <div className="mt-8 space-y-4 border-t border-white/10 pt-8">
                  <div className="flex justify-between text-base">
                    <span className="text-white/60">Срок разработки</span>
                    <span className="font-semibold text-white">
                      {bundle.duration}
                    </span>
                  </div>
                  {bundle.tech && bundle.tech.length > 0 && (
                    <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
                      <span className="text-white/60 text-sm">Технологии</span>
                      <div className="flex flex-wrap gap-2">
                        {bundle.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded bg-white/5 px-2 py-1 text-xs font-medium text-white/80"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <OrderButton
                  serviceId={
                    bundle.id === "landing" || bundle.id === "corporate"
                      ? "web"
                      : bundle.id === "app"
                      ? "mobile"
                      : "systems"
                  }
                  serviceName={`Комплексное предложение — ${bundle.title}`}
                  className="mt-8 inline-flex h-14 w-full items-center justify-center rounded-full bg-[color:var(--color-accent-2)] px-6 text-base font-bold text-black transition-all duration-300 hover:bg-[#2dd4bf] hover:scale-[1.02] shadow-[0_0_20px_rgba(45,212,191,0.2)] hover:shadow-[0_0_30px_rgba(45,212,191,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ring)]"
                >
                  Заказать
                </OrderButton>

                <div className="mt-6 text-center text-xs text-white/30">
                  Оставьте заявку для бесплатной консультации
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedCases.length > 0 && (
          <div className="mt-24 border-t border-white/10 pt-20">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-12">
              <div>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Похожие кейсы
                </h2>
                <p className="mt-2 text-white/60">
                  Примеры реализации подобных проектов из нашего портфолио
                </p>
              </div>
              <Link
                href="/cases"
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 text-sm font-medium text-white/80 transition-colors hover:bg-white/10"
              >
                Все кейсы →
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {relatedCases.map((c) => (
                <CaseCard 
                  key={c.slug} 
                  caseStudy={c} 
                  queryParams={{ from: "bundle", bundleId: bundle.id }} 
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
}
