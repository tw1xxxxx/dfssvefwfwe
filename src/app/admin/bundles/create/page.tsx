"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Bundle } from "@/lib/bundles-db";
import { ArrayField, ImageUpload } from "../components";

export default function CreateBundlePage() {
  const router = useRouter();
  const [bundle, setBundle] = useState<Partial<Bundle>>({
    title: "",
    price: "",
    duration: "",
    includes: [],
    tech: [],
    visibleTags: [],
    images: [],
    detailedFeatures: [],
    metaKeywords: [],
  });
  const [saving, setSaving] = useState(false);

  const generateId = () => {
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
    
    if (bundle.title) {
        setBundle({ ...bundle, id: translit(bundle.title) });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch("/api/bundles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bundle),
      });
      if (res.ok) {
        alert("Создано!");
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Ошибка создания");
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка создания");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-20">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin"
          className="text-white/40 hover:text-white transition-colors"
        >
          ← Назад
        </Link>
        <h1 className="text-2xl font-bold">Создание комплексного предложения</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Info */}
        <div className="grid gap-6 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Основная информация</h2>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Название *</label>
              <input
                type="text"
                required
                value={bundle.title || ""}
                onChange={(e) => setBundle({ ...bundle, title: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/20 focus:border-white/30 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">ID (URL) *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={bundle.id || ""}
                  onChange={(e) => setBundle({ ...bundle, id: e.target.value })}
                  placeholder="my-bundle"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/20 focus:border-white/30 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={generateId}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                  title="Сгенерировать из названия"
                >
                  🪄
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Цена *</label>
              <input
                type="text"
                required
                value={bundle.price || ""}
                onChange={(e) => setBundle({ ...bundle, price: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/20 focus:border-white/30 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Срок *</label>
              <input
                type="text"
                required
                value={bundle.duration || ""}
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
            values={bundle.includes || []}
            onChange={(vals) => setBundle({ ...bundle, includes: vals })}
          />

          <ArrayField
            label="Технологии"
            values={bundle.tech || []}
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
            {saving ? "Создание..." : "Создать"}
          </button>
        </div>
      </form>
    </div>
  );
}
