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
        "sticky top-0 z-50 border-b transition-colors",
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
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
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
            
            <a
              href="tel:+79999196261"
              className="text-base font-semibold text-[#38bdf8] sm:hidden whitespace-nowrap"
            >
              +7 (999) 919-62-61
            </a>

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
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
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
