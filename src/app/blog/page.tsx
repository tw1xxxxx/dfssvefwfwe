import { headers } from "next/headers";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getPublishedPosts } from "@/lib/posts-db";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  headers();
  const posts = await getPublishedPosts();

  return (
    <main className="min-h-screen">
      <Container>
        <div className="pb-14 pt-28">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-wide text-white/55">
              TECH INSIGHTS
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              База знаний
            </h1>
            <p className="mt-4 text-base leading-7 text-white/65">
              Аналитика, кейсы с техническими деталями и открытые чек‑листы.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
              >
                <div className="text-xs text-white/50">{p.date}</div>
                <div className="mt-3 text-xl font-semibold leading-snug">
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
                <div className="mt-6 flex items-center justify-between text-sm text-white/65">
                  <span className="group-hover:text-white">Открыть</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}

