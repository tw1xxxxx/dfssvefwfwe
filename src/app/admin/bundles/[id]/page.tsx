"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Bundle } from "@/lib/bundles-db";
import { ArrayField, ImageUpload } from "../components";

export default function EditBundlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [bundle, setBundle] = useState<Bundle | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/bundles/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBundle(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bundle) return;
    setSaving(true);

    try {
      const res = await fetch(`/api/bundles/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bundle),
      });
      if (res.ok) {
        alert("Сохранено!");
        router.refresh();
      } else {
        alert("Ошибка сохранения");
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Загрузка...</div>;
  if (!bundle) return <div>Не найдено</div>;

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin"
          className="text-white/40 hover:text-white transition-colors"
        >
          ← Назад
        </Link>
        <h1 className="text-2xl font-bold">Редактирование: {bundle.title}</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Info */}
        <div className="grid gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Основная информация</h2>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Название</label>
              <input
                type="text"
                value={bundle.title}
                onChange={(e) => setBundle({ ...bundle, title: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/20 focus:border-white/30 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">ID (slug)</label>
              <input
                type="text"
                value={bundle.id}
                disabled
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white/40 cursor-not-allowed"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Цена</label>
              <input
                type="text"
                value={bundle.price}
                onChange={(e) => setBundle({ ...bundle, price: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/20 focus:border-white/30 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Срок</label>
              <input
                type="text"
                value={bundle.duration}
                onChange={(e) => setBundle({ ...bundle, duration: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/20 focus:border-white/30 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Краткое описание (в карточке)</label>
            <textarea
              value={bundle.shortDescription || ""}
              onChange={(e) => setBundle({ ...bundle, shortDescription: e.target.value })}
              className="w-full h-24 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/20 focus:border-white/30 focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Полное описание (детально)</label>
            <textarea
              value={bundle.description || ""}
              onChange={(e) => setBundle({ ...bundle, description: e.target.value })}
              className="w-full h-40 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/20 focus:border-white/30 focus:outline-none resize-y"
            />
          </div>
        </div>

        {/* Media */}
        <div className="grid gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Медиа</h2>
          
          <ImageUpload
            label="Изображения (первое - превью)"
            images={bundle.images || []}
            onChange={(imgs) => setBundle({ ...bundle, images: imgs })}
          />

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Видео (обрезка с конца, сек)</label>
              <input
                type="number"
                value={bundle.videoSettings?.trimEnd || 0}
                onChange={(e) =>
                  setBundle({
                    ...bundle,
                    videoSettings: { ...bundle.videoSettings, trimEnd: Number(e.target.value) },
                  })
                }
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/20 focus:border-white/30 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Lists */}
        <div className="grid gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Списки</h2>
          
          <ArrayField
            label="Что входит (список)"
            values={bundle.includes}
            onChange={(vals) => setBundle({ ...bundle, includes: vals })}
          />

          <ArrayField
            label="Технологии"
            values={bundle.tech}
            onChange={(vals) => setBundle({ ...bundle, tech: vals })}
          />

          <ArrayField
            label="Теги (видны на карточке)"
            values={bundle.visibleTags || []}
            onChange={(vals) => setBundle({ ...bundle, visibleTags: vals })}
          />

          <ArrayField
            label="Детальные функции (для страницы)"
            values={bundle.detailedFeatures || []}
            onChange={(vals) => setBundle({ ...bundle, detailedFeatures: vals })}
          />
        </div>

        {/* SEO */}
        <div className="grid gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">SEO</h2>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Meta Title</label>
            <input
              type="text"
              value={bundle.metaTitle || ""}
              onChange={(e) => setBundle({ ...bundle, metaTitle: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/20 focus:border-white/30 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Meta Description</label>
            <textarea
              value={bundle.metaDescription || ""}
              onChange={(e) => setBundle({ ...bundle, metaDescription: e.target.value })}
              className="w-full h-24 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/20 focus:border-white/30 focus:outline-none resize-none"
            />
          </div>

          <ArrayField
            label="Meta Keywords"
            values={bundle.metaKeywords || []}
            onChange={(vals) => setBundle({ ...bundle, metaKeywords: vals })}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Meta Image (OG Image)</label>
            <ImageUpload
              label=""
              images={bundle.metaImage ? [bundle.metaImage] : []}
              onChange={(urls) => setBundle({ ...bundle, metaImage: urls[0] || "" })}
              multiple={false}
            />
            <p className="text-xs text-white/40">Если не указано, используется первое изображение из слайдера</p>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link
            href="/admin"
            className="px-6 py-2 rounded-lg border border-white/10 hover:bg-white/5 transition-colors"
          >
            Отмена
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2 rounded-lg bg-[color:var(--color-accent-2)] text-black font-semibold hover:bg-[#2dd4bf] transition-colors disabled:opacity-50"
          >
            {saving ? "Сохранение..." : "Сохранить изменения"}
          </button>
        </div>
      </form>
    </div>
  );
}
