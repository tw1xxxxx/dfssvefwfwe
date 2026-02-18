"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { useLeadModal } from "@/components/site/LeadModalProvider";
import logo16 from "../../../logo16.png";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Header() {
  const pathname = usePathname();
  const { open } = useLeadModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Optimization: Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  if (pathname?.startsWith("/bundles/")) {
    return null;
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b transition-colors",
        "border-white/10 bg-[#05070b]/80 backdrop-blur"
      )}
    >
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={logo16}
              alt="Альфа"
              className="h-10 w-auto sm:h-12"
              priority
            />
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-mono uppercase tracking-widest text-white/70 lg:flex">
            <Link className="hover:text-white transition-colors" href="/cases">
              Кейсы
            </Link>
            <Link className="hover:text-white transition-colors" href="/blog">
              База знаний
            </Link>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden items-center gap-5 sm:flex">
              <a
                href="https://t.me/alpha_dev"
                target="_blank"
                rel="noreferrer"
                className="grid h-11 w-11 place-items-center rounded-2xl bg-white/5 text-sm text-[#0088cc] ring-1 ring-white/10 transition-colors hover:bg-white/10"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
                </svg>
              </a>
              <a
                href="tel:+79999196261"
                className="text-base font-semibold text-[#38bdf8]"
              >
                +7&nbsp;(999)&nbsp;919-62-61
              </a>
            </div>
            <button
              type="button"
              onClick={() => open()}
              className="hidden h-14 items-center justify-center rounded-full bg-[color:var(--color-accent-2)] px-8 text-base font-bold text-black transition-all hover:bg-[#2dd4bf] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ring)] sm:inline-flex"
            >
              Заказать
            </button>
            
            <button
              type="button"
              onClick={() => open()}
              className="flex h-10 items-center justify-center rounded-full bg-[color:var(--color-accent-2)] px-4 text-sm font-bold text-black transition-all hover:bg-[#2dd4bf] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ring)] sm:hidden"
            >
              Заказать
            </button>

            {/* Mobile Burger Button */}
            <button
              type="button"
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-white/10 bg-white/5 lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span
                className={cn(
                  "h-0.5 w-5 rounded-full bg-white transition-all duration-300",
                  isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-5 rounded-full bg-white transition-all duration-300",
                  isMobileMenuOpen ? "opacity-0" : ""
                )}
              />
              <span
                className={cn(
                  "h-0.5 w-5 rounded-full bg-white transition-all duration-300",
                  isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                )}
              />
            </button>
          </div>
        </div>
      </Container>
      
      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#05070b]/95 backdrop-blur-xl transition-all duration-300 lg:hidden",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        <nav className="flex flex-col items-center gap-8 text-2xl font-bold uppercase tracking-wider text-white">
          <Link 
            href="/" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-[color:var(--color-accent-2)] transition-colors"
          >
            Главная
          </Link>
          <Link 
            href="/cases" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-[color:var(--color-accent-2)] transition-colors"
          >
            Кейсы
          </Link>
          <Link 
            href="/blog" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-[color:var(--color-accent-2)] transition-colors"
          >
            База знаний
          </Link>
          <Link 
            href="/#services" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-[color:var(--color-accent-2)] transition-colors"
          >
            Услуги
          </Link>
           <Link 
            href="/#about" 
            onClick={() => setIsMobileMenuOpen(false)}
            className="hover:text-[color:var(--color-accent-2)] transition-colors"
          >
            О компании
          </Link>
        </nav>
        
        <div className="mt-12 flex flex-col items-center gap-6">
          <a
            href="tel:+79999196261"
            className="text-xl font-semibold text-[#38bdf8]"
          >
            +7 (999) 919-62-61
          </a>
          
          <div className="flex gap-4">
             <a
                href="https://t.me/alpha_dev"
                target="_blank"
                rel="noreferrer"
                className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-[#0088cc] ring-1 ring-white/10 transition-colors hover:bg-white/10"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="m20.665 3.717-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.8-1.282-1.434z" />
                </svg>
              </a>
              <a
                href="https://wa.me/79999196261"
                target="_blank"
                rel="noreferrer"
                className="grid h-12 w-12 place-items-center rounded-2xl bg-white/5 text-[#25D366] ring-1 ring-white/10 transition-colors hover:bg-white/10"
              >
                <svg
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967c-.273-.099-.471-.148-.67.15c-.197.297-.767.966-.94 1.164c-.173.199-.347.223-.644.075c-.297-.15-1.255-.463-2.39-1.475c-.883-.788-1.48-1.761-1.653-2.059c-.173-.297-.018-.458.13-.606c.134-.133.298-.347.446-.52c.149-.174.198-.298.298-.497c.099-.198.05-.371-.025-.52c-.075-.149-.669-1.612-.916-2.207c-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372c-.272.297-1.04 1.016-1.04 2.479c0 1.462 1.065 2.875 1.213 3.074c.149.198 2.096 3.2 5.077 4.487c.709.306 1.262.489 1.694.625c.712.227 1.36.195 1.871.118c.571-.085 1.758-.719 2.006-1.413c.248-.694.248-1.289.173-1.413c-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214l-3.741.982l.998-3.648l-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884c2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
              </a>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              open();
            }}
            className="mt-4 inline-flex h-14 items-center justify-center rounded-full bg-[color:var(--color-accent-2)] px-10 text-lg font-bold text-black transition-all hover:bg-[#2dd4bf] active:scale-[0.98]"
          >
            Заказать проект
          </button>
        </div>
      </div>
    </header>
  );
}
