"use client";

import Link from "next/link";
import { CaseForm } from "@/components/admin/CaseForm";

export default function CreateCasePage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/cases" className="text-sm text-white/50 hover:text-white mb-2 inline-block">← Назад к списку</Link>
        <h1 className="text-3xl font-bold">Новый кейс</h1>
      </div>

      <CaseForm isNew />
    </div>
  );
}
