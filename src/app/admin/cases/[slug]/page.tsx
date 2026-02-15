import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseBySlug } from "@/lib/cases-db";
import { CaseForm } from "@/components/admin/CaseForm";

export default async function EditCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getCaseBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/cases" className="text-sm text-white/50 hover:text-white mb-2 inline-block">← Назад к списку</Link>
        <h1 className="text-3xl font-bold">Редактирование: {item.title}</h1>
      </div>

      <CaseForm initialData={item} />
    </div>
  );
}
