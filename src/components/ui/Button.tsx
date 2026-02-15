import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

function cn(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  type,
  disabled,
  className: customClassName,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: Size;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--color-ring)] disabled:opacity-50 disabled:pointer-events-none";
  const sizes =
    size === "sm" ? "h-10 px-4 text-sm" : "h-12 px-6 text-sm sm:text-base";
  const variants =
    variant === "primary"
      ? "bg-[color:var(--color-accent)] text-black hover:bg-[#5aa0ff]"
      : variant === "secondary"
        ? "border border-[color:var(--color-card-border)] bg-[color:var(--color-card)] text-[color:var(--color-foreground)] hover:bg-white/10"
        : "text-[color:var(--color-foreground)] hover:bg-white/5";

  const className = cn(base, sizes, variants, customClassName);

  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type ?? "button"}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

