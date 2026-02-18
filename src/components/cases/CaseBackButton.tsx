"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function CaseBackButton() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const bundleId = searchParams.get("bundleId");

  const backLink =
    from === "bundle" && bundleId
      ? { href: `/bundles/${bundleId}`, text: "Назад к предложению" }
      : { href: "/cases", text: "Все кейсы" };

  return (
    <Link
      href={backLink.href}
      className="group inline-flex items-center gap-2 text-sm text-white/45 transition-colors hover:text-white"
    >
      <span className="transition-transform group-hover:-translate-x-1">←</span>
      {backLink.text}
    </Link>
  );
}
