import { LeadForm } from "@/components/forms/LeadForm";
import { Container } from "@/components/ui/Container";
import { InView } from "@/components/ui/InView";

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-white/10">
      {/* Decorative background elements */}
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[color:var(--color-accent-2)]/10 blur-[120px]" />
      <div className="absolute -left-24 -bottom-24 h-96 w-96 rounded-full bg-[#38bdf8]/10 blur-[120px]" />

      <Container>
        <div className="relative py-24">
          <InView>
            <div className="flex flex-col items-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent-2)]" />
                Contact
              </div>
              <h2 className="mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Давайте обсудим <br className="hidden sm:block" />
                <span className="text-[color:var(--color-accent-2)]">ваш проект</span>
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
                Умная форма с фильтром по бюджету и описанием — чтобы не тратить
                время на лишние созвоны.
              </p>
            </div>
          </InView>

          <div className="mt-16 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <InView delayMs={100}>
              <div className="group relative rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-1 backdrop-blur-sm transition-all hover:border-white/20">
                <div className="rounded-[2.25rem] bg-[#070a12]/40 p-6 sm:p-10">
                  <LeadForm />
                </div>
              </div>
            </InView>

            <div className="flex flex-col gap-8">
              <InView delayMs={200}>
                <div className="rounded-[2.5rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm">
                  <div className="text-xl font-semibold">Быстрая связь</div>
                  <div className="mt-6 flex flex-col gap-4">
                    {/* Phone - Main Call to Action */}
                    <a
                      href="tel:+79999196261"
                      className="group relative flex items-center gap-4 rounded-2xl bg-white/5 p-4 transition-all hover:bg-white/10 hover:scale-[1.02] border border-white/5 hover:border-white/10"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/50 transition-transform group-hover:scale-110">
                        <svg
                          className="h-5 w-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-xs font-medium uppercase tracking-wider text-white/40">
                          Позвонить нам
                        </div>
                        <div className="text-lg font-bold text-white/90">
                          +7 (999) 919-62-61
                        </div>
                      </div>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                         <svg className="h-5 w-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                         </svg>
                      </div>
                    </a>

                    {/* Messengers Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Telegram */}
                      <a
                        href="https://t.me/alpha_development_bot"
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#0088cc]/10 p-4 transition-all hover:bg-[#0088cc]/20 hover:scale-[1.02] border border-[#0088cc]/20 hover:border-[#0088cc]/40"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0088cc]/20 text-[#0088cc] ring-1 ring-[#0088cc]/50 transition-transform group-hover:scale-110">
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m22 2-7 20-4-9-9-4Z" />
                            <path d="M22 2 11 13" />
                          </svg>
                        </div>
                        <div className="text-sm font-semibold text-white/90">Telegram</div>
                      </a>

                      {/* WhatsApp */}
                      <a
                        href="https://wa.me/79999196261"
                        target="_blank"
                        rel="noreferrer"
                        className="group flex flex-col items-center justify-center gap-3 rounded-2xl bg-[#25D366]/10 p-4 transition-all hover:bg-[#25D366]/20 hover:scale-[1.02] border border-[#25D366]/20 hover:border-[#25D366]/40"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]/20 text-[#25D366] ring-1 ring-[#25D366]/50 transition-transform group-hover:scale-110">
                          <svg
                            className="h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                             <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                          </svg>
                        </div>
                        <div className="text-sm font-semibold text-white/90">WhatsApp</div>
                      </a>
                    </div>
                  </div>
                </div>
              </InView>

              <InView delayMs={300}>
                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[color:var(--color-accent-2)]/20 to-transparent p-8">
                  <div className="relative z-10">
                    <div className="text-lg font-semibold">Всегда на связи</div>
                    <p className="mt-2 text-sm leading-6 text-white/60">
                      Кнопка «Заказать» всегда доступна в шапке сайта. 
                      Мы отвечаем в течение 15 минут в рабочее время.
                    </p>
                  </div>
                  <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-full bg-[color:var(--color-accent-2)]/20 blur-3xl" />
                </div>
              </InView>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

