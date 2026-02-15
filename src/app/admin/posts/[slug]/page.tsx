import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts-db";
import { PostForm } from "@/components/admin/PostForm";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getPostBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/posts" className="text-sm text-white/50 hover:text-white mb-2 inline-block">← Назад к списку</Link>
        <h1 className="text-3xl font-bold">Редактирование: {item.title}</h1>
      </div>

      <PostForm initialData={item} />
    </div>
  );
}
