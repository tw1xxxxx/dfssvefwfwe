import Link from "next/link";
import { getPosts } from "@/lib/posts-db";
import { Container } from "@/components/ui/Container";
import { InView } from "@/components/ui/InView";

export async function Insights() {
  const posts = await getPosts();
  const recentPosts = [...posts]
    .filter((p) => p.published !== false)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="border-t border-white/10">
      <Container>
        <div className="py-20">
          <InView>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <div className="text-xs font-semibold tracking-wide text-white/55">
                  INSIGHTS
                </div>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  База знаний / Tech Insights
                </h2>
                <p className="mt-4 text-base leading-7 text-white/65">
                  Аналитика, технические разборы и чек‑листы — чтобы принимать
                  решения на фактах.
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 text-sm font-medium text-white/80 transition-colors hover:bg-white/10"
              >
                Все статьи →
              </Link>
            </div>
          </InView>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {recentPosts.map((p, idx) => (
              <InView key={p.slug} delayMs={idx * 60}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
                >
                  <div className="text-xs text-white/50">{p.date}</div>
                  <div className="mt-3 text-lg font-semibold leading-snug">
                    {p.title}
                  </div>
                  <div className="mt-3 text-sm leading-7 text-white/65">
                    {p.excerpt}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto pt-6 text-sm text-white/65 group-hover:text-white">
                    Читать →
                  </div>
                </Link>
              </InView>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

