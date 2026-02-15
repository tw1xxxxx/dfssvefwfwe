import Link from "next/link";
import { getCases } from "@/lib/cases-db";
import { CaseGrid } from "@/components/cases/CaseGrid";
import { Container } from "@/components/ui/Container";
import { InView } from "@/components/ui/InView";

export async function Cases() {
  const caseStudies = await getCases();

  return (
    <section id="cases" className="border-t border-white/10">
      <Container>
        <div className="py-20">
          <InView>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl">
                <div className="text-xs font-semibold tracking-wide text-white/55">
                  CASE STUDIES
                </div>
                <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
                  Доказательство экспертности — в цифрах
                </h2>
                <p className="mt-4 text-base leading-7 text-white/65">
                  Каждый кейс — история: вызов → решение → результат.
                </p>
              </div>

              <Link
                href="/cases"
                className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 text-sm font-medium text-white/80 transition-colors hover:bg-white/10"
              >
                Все кейсы →
              </Link>
            </div>
          </InView>

          <div className="mt-12">
            <CaseGrid items={caseStudies} limit={4} />
          </div>
        </div>
      </Container>
    </section>
  );
}

