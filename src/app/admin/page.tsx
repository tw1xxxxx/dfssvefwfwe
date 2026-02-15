import Link from "next/link";
import { getBundles } from "@/lib/bundles-db";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
  const bundles = await getBundles();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Управление сайтом</h1>
      </div>

      <div className="mb-12 grid gap-6 sm:grid-cols-2">
        <Link
          href="/admin/seo"
          className="block p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[color:var(--color-accent-2)] transition-colors">SEO и Метатеги</h3>
              <p className="text-sm text-white/60">
                Настройка заголовка, описания и ключевых слов.
              </p>
            </div>
            <div className="text-white/40 group-hover:text-white transition-colors">→</div>
          </div>
        </Link>

        <Link
          href="/admin/cases"
          className="block p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[color:var(--color-accent)] transition-colors">Кейсы / Портфолио</h3>
              <p className="text-sm text-white/60">
                Управление проектами в разделе "Кейсы".
              </p>
            </div>
            <div className="text-white/40 group-hover:text-white transition-colors">→</div>
          </div>
        </Link>

        <Link
          href="/admin/posts"
          className="block p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-[color:var(--color-accent)] transition-colors">Блог / Новости</h3>
              <p className="text-sm text-white/60">
                Публикация статей и новостей компании.
              </p>
            </div>
            <div className="text-white/40 group-hover:text-white transition-colors">→</div>
          </div>
        </Link>
      </div>

      <div className="grid gap-6">
        <h2 className="text-xl font-semibold text-white/60 uppercase tracking-wider text-sm">Комплексные предложения</h2>
        {bundles.map((bundle) => (
          <Link
            key={bundle.id}
            href={`/admin/bundles/${bundle.id}`}
            className="block p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{bundle.title}</h2>
                <div className="flex gap-4 text-sm text-white/60">
                  <span>{bundle.price}</span>
                  <span>•</span>
                  <span>{bundle.duration}</span>
                </div>
              </div>
              <div className="text-white/40">
                Редактировать →
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
