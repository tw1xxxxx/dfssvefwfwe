import { Container } from "@/components/ui/Container";

export function CasesSkeleton() {
  return (
    <section id="cases" className="border-t border-white/10">
      <Container>
        <div className="py-20">
          {/* Header Skeleton */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-3xl w-full">
              <div className="h-4 w-24 rounded bg-white/10 animate-pulse" />
              <div className="mt-4 h-8 w-3/4 max-w-lg rounded-lg bg-white/10 animate-pulse sm:h-10" />
              <div className="mt-4 h-5 w-full max-w-md rounded-lg bg-white/5 animate-pulse" />
            </div>

            <div className="h-12 w-32 rounded-full bg-white/5 animate-pulse" />
          </div>

          {/* Grid Skeleton */}
          <div className="mt-12">
            {/* Filter Bar Skeleton */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between py-2 mb-8">
              <div className="flex items-center gap-2 overflow-x-hidden">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-9 w-24 rounded-full bg-white/5 animate-pulse" />
                ))}
              </div>
              <div className="hidden sm:block h-11 w-40 rounded-2xl bg-white/5 animate-pulse" />
            </div>

            {/* Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="relative flex flex-col rounded-3xl border border-white/10 bg-white/5 p-6"
                >
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="h-4 w-32 rounded bg-white/10 animate-pulse" />
                    <div className="h-6 w-20 rounded-full bg-white/10 animate-pulse" />
                  </div>

                  {/* Image Placeholder */}
                  <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-white/5 bg-white/5">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                  </div>

                  {/* Title */}
                  <div className="mt-6 h-7 w-3/4 rounded bg-white/10 animate-pulse" />

                  {/* Challenge & Result */}
                  <div className="mt-4 grid flex-1 gap-4">
                    <div>
                      <div className="h-3 w-16 rounded bg-white/5 animate-pulse" />
                      <div className="mt-2 h-4 w-full rounded bg-white/5 animate-pulse" />
                      <div className="mt-1 h-4 w-2/3 rounded bg-white/5 animate-pulse" />
                    </div>
                    <div>
                      <div className="h-3 w-20 rounded bg-white/5 animate-pulse" />
                      <div className="mt-3 flex gap-2">
                        <div className="h-6 w-24 rounded-xl bg-white/5 animate-pulse" />
                        <div className="h-6 w-32 rounded-xl bg-white/5 animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-8 border-t border-white/5 pt-6">
                    <div className="h-4 w-32 rounded bg-white/5 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
