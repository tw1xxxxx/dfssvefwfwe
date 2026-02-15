import Link from "next/link";
import { getCases } from "@/lib/cases-db";

export const dynamic = 'force-dynamic';

export default async function AdminCasesPage() {
  const cases = await getCases();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link href="/admin" className="text-sm text-white/50 hover:text-white mb-2 inline-block">← Назад в меню</Link>
          <h1 className="text-3xl font-bold">Кейсы / Портфолио</h1>
        </div>
        <Link
          href="/admin/cases/create"
          className="rounded-full bg-white text-black px-6 py-2.5 font-bold hover:bg-white/90 transition-colors"
        >
          + Добавить кейс
        </Link>
      </div>

      <div className="grid gap-4">
        {cases.map((item) => (
          <Link
            key={item.slug}
            href={`/admin/cases/${item.slug}`}
            className="block p-6 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-[color:var(--color-accent)] transition-colors">
                  {item.title}
                </h3>
                <div className="flex flex-wrap gap-4 text-sm text-white/60">
                  <span className="text-[color:var(--color-accent)]">{item.client}</span>
                  <span>•</span>
                  <span>{item.industry}</span>
                  <span>•</span>
                  <span>{item.serviceType}</span>
                </div>
              </div>
              <div className="text-white/40 group-hover:text-white transition-colors">
                Редактировать →
              </div>
            </div>
          </Link>
        ))}

        {cases.length === 0 && (
          <div className="text-center py-12 text-white/40">
            Нет кейсов. Создайте первый!
          </div>
        )}
      </div>
    </div>
  );
}
