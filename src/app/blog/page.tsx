import { headers } from "next/headers";
import { Container } from "@/components/ui/Container";
import { getPublishedPosts } from "@/lib/posts-db";

import { BlogList } from "@/components/blog/BlogList";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  headers();
  const posts = await getPublishedPosts();

  return (
    <main className="min-h-screen">
      <Container>
        <div className="pt-32 pb-14">
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

          <BlogList initialPosts={posts} />
        </div>
      </Container>
    </main>
  );
}

