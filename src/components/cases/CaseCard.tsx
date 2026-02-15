import Link from "next/link";
import Image from "next/image";
import type { CaseStudy } from "@/lib/cases-db";

function label(type: CaseStudy["serviceType"]) {
  if (type === "web") return "Веб";
  if (type === "mobile") return "Мобильное";
  if (type === "crm") return "CRM";
  return "Автоматизация";
}

export function CaseCard({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <Link
      href={`/cases/${caseStudy.slug}`}
      className="group relative flex flex-col rounded-3xl border border-white/10 bg-white/5 p-6 transition-all hover:bg-white/[0.08] hover:border-white/20"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="text-sm text-white/55">
          {caseStudy.client} • {caseStudy.industry}
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/65">
          {label(caseStudy.serviceType)}
        </div>
      </div>

      {caseStudy.imageUrl && (
        <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-white/5 bg-white/5">
          <Image
            src={caseStudy.imageUrl}
            alt={caseStudy.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="mt-6 text-xl font-semibold leading-snug text-white">
        {caseStudy.title}
      </div>

      <div className="mt-4 grid flex-1 gap-4 text-sm">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">
            Задача
          </div>
          <div className="mt-2 text-white/70 line-clamp-2 leading-relaxed">
            {caseStudy.challenge}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-white/30">
            Результат
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {caseStudy.result.slice(0, 3).map((r) => (
              <span
                key={r}
                className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-3 py-1.5 text-xs font-medium text-emerald-400/90"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 border-t border-white/5 pt-6">
        <span className="text-sm font-medium text-white/45 transition-colors group-hover:text-white">
          Открыть историю →
        </span>
      </div>
    </Link>
  );
}
