import Link from "next/link";
import { getPosts } from "@/lib/posts-db";

export const dynamic = 'force-dynamic';

export default async function AdminPostsPage() {
  const posts = await getPosts();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin" className="text-sm text-white/50 hover:text-white mb-2 inline-block">← Назад в меню</Link>
          <h1 className="text-3xl font-bold">Блог / Новости</h1>
        </div>
        <Link
          href="/admin/posts/create"
          className="rounded-full bg-white text-black px-6 py-2.5 font-bold hover:bg-white/90 transition-colors"
        >
          + Добавить пост
        </Link>
      </div>

      <div className="grid gap-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/admin/posts/${post.slug}`}
            className="block p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[color:var(--color-accent)] transition-colors">
                  {post.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-white/60">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.tags.join(', ')}</span>
                </div>
              </div>
              <div className="text-white/40 group-hover:text-white transition-colors">
                Редактировать →
              </div>
            </div>
          </Link>
        ))}

        {posts.length === 0 && (
          <div className="text-center py-12 text-white/40">
            Нет постов. Создайте первый!
          </div>
        )}
      </div>
    </div>
  );
}
