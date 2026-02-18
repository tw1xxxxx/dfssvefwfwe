import { headers } from "next/headers";
import Link from "next/link";
import { CaseGrid } from "@/components/cases/CaseGrid";
import { Container } from "@/components/ui/Container";
import { getCases } from "@/lib/cases-db";

export const dynamic = "force-dynamic";

export default async function CasesPage() {
  headers();
  const caseStudies = await getCases();

  return (
    <main className="min-h-screen">
      <Container>
        <div className="pt-32 pb-14">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-wide text-white/55">
              CASE STUDIES
            </div>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Кейсы
            </h1>
            <p className="mt-4 text-base leading-7 text-white/65">
              Истории, где важны цифры: рост конверсии, ускорение операций,
              снижение ошибок.
            </p>
          </div>

          <div className="mt-10">
            <CaseGrid items={caseStudies} />
          </div>

          <div className="mt-14 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="text-sm font-semibold">Нужен похожий результат?</div>
            <div className="mt-2 text-sm text-white/65">
              Перейдите на главную и нажмите «Заказать» — подготовим план
              и оценку.
            </div>
            <Link
              href="/#contact"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-[color:var(--color-accent-2)] px-6 text-sm font-semibold text-black transition-colors hover:bg-[#2dd4bf]"
            >
              Заказать →
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
}
