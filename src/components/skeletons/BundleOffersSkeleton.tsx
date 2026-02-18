import { Container } from "@/components/ui/Container";

export function BundleOffersSkeleton() {
  return (
    <section className="border-t border-white/10">
      <Container>
        <div className="py-20">
          <div className="max-w-3xl animate-pulse">
            <div className="h-3 w-20 rounded-full bg-white/10" />
            <div className="mt-6 h-8 w-64 rounded-lg bg-white/10 sm:h-10 sm:w-96" />
            <div className="mt-4 h-5 w-full max-w-lg rounded-lg bg-white/5" />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]"
              >
                {/* Image Placeholder */}
                <div className="relative h-48 w-full border-b border-white/5 bg-white/5 animate-pulse">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
                </div>

                <div className="relative z-10 flex flex-1 flex-col p-6 sm:p-7">
                  {/* Title */}
                  <div className="h-6 w-3/4 rounded-md bg-white/10 animate-pulse" />
                  
                  {/* Description */}
                  <div className="mt-4 space-y-2">
                    <div className="h-4 w-full rounded-md bg-white/5 animate-pulse" />
                    <div className="h-4 w-2/3 rounded-md bg-white/5 animate-pulse" />
                  </div>

                  <div className="mt-auto flex flex-col justify-end pt-8">
                    {/* Stats */}
                    <div className="flex items-end justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="h-2.5 w-10 rounded bg-white/5 animate-pulse" />
                        <div className="h-4 w-16 rounded bg-white/10 animate-pulse" />
                      </div>
                      <div className="flex-1 text-right space-y-2 flex flex-col items-end">
                        <div className="h-2.5 w-14 rounded bg-white/5 animate-pulse" />
                        <div className="h-5 w-20 rounded bg-white/10 animate-pulse" />
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <div className="h-12 w-full rounded-xl border border-white/5 bg-white/[0.02] animate-pulse" />
                      <div className="h-12 w-full rounded-xl bg-white/10 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
