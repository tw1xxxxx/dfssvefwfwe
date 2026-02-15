"use client";

import Link from "next/link";
import { PostForm } from "@/components/admin/PostForm";

export default function CreatePostPage() {
  return (
    <div>
      <div className="mb-8">
        <Link href="/admin/posts" className="text-sm text-white/50 hover:text-white mb-2 inline-block">← Назад к списку</Link>
        <h1 className="text-3xl font-bold">Новый пост</h1>
      </div>

      <PostForm isNew />
    </div>
  );
}
