"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Post, PostContent } from "@/lib/posts-db";
import { ArrayField, ImageUpload } from "./FormComponents";

export function PostForm({ initialData, isNew = false }: { initialData?: Post, isNew?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Post>(
    initialData || {
      slug: "",
      title: "",
      date: new Date().toISOString().split('T')[0],
      excerpt: "",
      tags: [],
      content: [],
      coverImage: "",
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isNew ? "/api/admin/posts" : `/api/admin/posts/${initialData?.slug}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save");

      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Ошибка сохранения");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Вы уверены, что хотите удалить этот пост?")) return;
    setLoading(true);
    try {
      await fetch(`/api/admin/posts/${initialData?.slug}`, { method: "DELETE" });
      router.push("/admin/posts");
      router.refresh();
    } catch (err) {
      alert("Ошибка удаления");
    } finally {
      setLoading(false);
    }
  };

  const addContentBlock = (type: PostContent['type']) => {
    setData({ ...data, content: [...data.content, { type, text: "" }] });
  };

  const updateContentBlock = (idx: number, text: string) => {
    const newContent = [...data.content];
    newContent[idx] = { ...newContent[idx], text };
    setData({ ...data, content: newContent });
  };

  const removeContentBlock = (idx: number) => {
    setData({ ...data, content: data.content.filter((_, i) => i !== idx) });
  };

  const moveContentBlock = (idx: number, direction: 'up' | 'down') => {
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === data.content.length - 1) return;
    
    const newContent = [...data.content];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    [newContent[idx], newContent[targetIdx]] = [newContent[targetIdx], newContent[idx]];
    setData({ ...data, content: newContent });
  };

  const generateSlug = () => {
    const translit = (str: string) => {
      const ru: Record<string, string> = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 
        'е': 'e', 'ё': 'e', 'ж': 'zh', 'з': 'z', 'и': 'i', 
        'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 
        'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 
        'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 
        'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '', 
        'э': 'e', 'ю': 'yu', 'я': 'ya'
      };
      
      return str.toLowerCase().split('').map(char => ru[char] || char).join('')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    };
    
    setData({ ...data, slug: translit(data.title) });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold">Основная информация</h2>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Slug (URL)</label>
            <div className="flex gap-2">
              <input
                required
                type="text"
                value={data.slug}
                onChange={(e) => setData({ ...data, slug: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
                placeholder="my-awesome-post"
              />
              <button
                type="button"
                onClick={generateSlug}
                className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                title="Сгенерировать из названия"
              >
                🪄
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Дата публикации</label>
            <input
              required
              type="date"
              value={data.date}
              onChange={(e) => setData({ ...data, date: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Заголовок (Title)</label>
          <input
            required
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Краткое описание (Excerpt)</label>
          <textarea
            required
            rows={2}
            value={data.excerpt}
            onChange={(e) => setData({ ...data, excerpt: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
          />
        </div>

        <ArrayField
          label="Теги (Tags)"
          values={data.tags}
          onChange={(val) => setData({ ...data, tags: val })}
        />
        
        <ImageUpload
          label="Обложка (Cover Image)"
          images={data.coverImage ? [data.coverImage] : []}
          onChange={(urls) => setData({ ...data, coverImage: urls[0] || "" })}
          multiple={false}
        />
      </div>

      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Контент</h2>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => addContentBlock('p')}
              className="rounded bg-white/10 px-3 py-1 text-xs font-medium hover:bg-white/20"
            >
              + Параграф
            </button>
            <button
              type="button"
              onClick={() => addContentBlock('h2')}
              className="rounded bg-white/10 px-3 py-1 text-xs font-medium hover:bg-white/20"
            >
              + Заголовок H2
            </button>
            <button
              type="button"
              onClick={() => addContentBlock('li')}
              className="rounded bg-white/10 px-3 py-1 text-xs font-medium hover:bg-white/20"
            >
              + Элемент списка
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {data.content.map((block, idx) => (
            <div key={idx} className="flex gap-2 items-start group">
              <div className="pt-3 text-xs font-mono text-white/30 uppercase w-8 text-right shrink-0">
                {block.type}
              </div>
              
              <div className="flex-1">
                <textarea
                  value={block.text}
                  onChange={(e) => updateContentBlock(idx, e.target.value)}
                  rows={block.type === 'p' ? 3 : 1}
                  className={`w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none ${
                    block.type === 'h2' ? 'font-bold text-lg' : ''
                  }`}
                  placeholder={`Enter ${block.type} text...`}
                />
              </div>

              <div className="flex flex-col gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                 <button
                  type="button"
                  onClick={() => moveContentBlock(idx, 'up')}
                  disabled={idx === 0}
                  className="p-1 hover:text-white disabled:opacity-30"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => moveContentBlock(idx, 'down')}
                  disabled={idx === data.content.length - 1}
                  className="p-1 hover:text-white disabled:opacity-30"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => removeContentBlock(idx)}
                  className="p-1 hover:text-red-400 text-red-400/50"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
          
          {data.content.length === 0 && (
            <div className="text-center py-8 text-white/30 border border-dashed border-white/10 rounded-lg">
              Контент пуст. Добавьте блоки сверху.
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold">SEO Мета-теги</h2>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Meta Title</label>
          <input
            type="text"
            value={data.metaTitle || ""}
            onChange={(e) => setData({ ...data, metaTitle: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/20 focus:border-white/30 focus:outline-none"
            placeholder="Заголовок для поисковиков"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Meta Description</label>
          <textarea
            value={data.metaDescription || ""}
            onChange={(e) => setData({ ...data, metaDescription: e.target.value })}
            className="h-24 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/20 focus:border-white/30 focus:outline-none resize-none"
            placeholder="Описание для поисковиков"
          />
        </div>
        <ArrayField
          label="Meta Keywords"
          values={data.metaKeywords || []}
          onChange={(val) => setData({ ...data, metaKeywords: val })}
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Meta Image (OG Image)</label>
          <ImageUpload
            label=""
            images={data.metaImage ? [data.metaImage] : []}
            onChange={(urls) => setData({ ...data, metaImage: urls[0] || "" })}
            multiple={false}
          />
          <p className="text-xs text-white/40">Если не указано, используется обложка поста</p>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-white px-8 py-3 font-bold text-black hover:bg-white/90 disabled:opacity-50"
        >
          {loading ? "Сохранение..." : "Сохранить"}
        </button>
        {!isNew && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="rounded-full border border-red-500/20 bg-red-500/10 px-8 py-3 font-bold text-red-400 hover:bg-red-500/20 disabled:opacity-50"
          >
            Удалить
          </button>
        )}
      </div>
    </form>
  );
}
