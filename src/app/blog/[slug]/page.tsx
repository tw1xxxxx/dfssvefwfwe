import { notFound } from "next/navigation";
import { headers } from "next/headers";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { getPostBySlug } from "@/lib/posts-db";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.metaTitle || `${post.title} | Блог Alpha`,
    description: post.metaDescription || post.excerpt,
    keywords: post.metaKeywords || post.tags,
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  headers();
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <main className="min-h-screen">
      <Container>
        <div className="py-14">
          <Link href="/blog" className="text-sm text-white/65 hover:text-white">
            ← Все статьи
          </Link>

          <div className="mt-8 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="text-xs text-white/50">{post.date}</div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-10 space-y-5 text-sm leading-7 text-white/75">
              {post.content.map((b, idx) =>
                b.type === "h2" ? (
                  <h2 key={idx} className="pt-4 text-lg font-semibold">
                    {b.text}
                  </h2>
                ) : b.type === "li" ? (
                  <div key={idx} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-white/40" />
                    <div>{b.text}</div>
                  </div>
                ) : (
                  <p key={idx}>{b.text}</p>
                ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}

