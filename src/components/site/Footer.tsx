import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <Container>
        <div className="flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-sm font-semibold">Альфа</div>
            <div className="mt-1 text-xs text-white/55">
              Ваш успех — наша работа.
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-white/65">
            <Link className="hover:text-white" href="/cases">
              Кейсы
            </Link>
            <Link className="hover:text-white" href="/blog">
              База знаний
            </Link>
            <Link className="hover:text-white" href="/#contact">
              Контакты
            </Link>
          </div>

          <div className="text-xs text-white/45">
            © {new Date().getFullYear()} Альфа. Все права защищены.
          </div>
        </div>
      </Container>
    </footer>
  );
}
