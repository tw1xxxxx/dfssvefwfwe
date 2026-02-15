"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Bundle } from "@/lib/bundles-db";

function ArrayField({
  label,
  values,
  onChange,
}: {
  label: string;
  values: string[];
  onChange: (newValues: string[]) => void;
}) {
  const add = () => onChange([...values, ""]);
  const remove = (idx: number) => onChange(values.filter((_, i) => i !== idx));
  const update = (idx: number, val: string) => {
    const newValues = [...values];
    newValues[idx] = val;
    onChange(newValues);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white/80">{label}</label>
      {values.map((val, idx) => (
        <div key={idx} className="flex gap-2">
          <input
            type="text"
            value={val}
            onChange={(e) => update(idx, e.target.value)}
            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/20 focus:border-white/30 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => remove(idx)}
            className="px-3 py-2 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="text-sm text-blue-400 hover:text-blue-300"
      >
        + Добавить пункт
      </button>
    </div>
  );
}

import { Reorder } from "framer-motion";

function ImageUpload({
  label,
  images,
  onChange,
}: {
  label: string;
  images: string[];
  onChange: (newImages: string[]) => void;
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        onChange([...images, data.url]);
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка загрузки");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-white/80">{label}</label>
      <Reorder.Group
        axis="y"
        values={images}
        onReorder={onChange}
        className="flex flex-col gap-3"
      >
        {images.map((img, idx) => (
          <Reorder.Item
            key={img}
            value={img}
            className="relative flex items-center gap-4 bg-white/5 p-3 rounded-lg group cursor-move touch-none border border-white/5 hover:border-white/10"
          >
            <div className="text-white/30 px-2 cursor-grab active:cursor-grabbing">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
              </svg>
            </div>

            <div className="relative h-16 w-24 flex-none bg-black/20 rounded overflow-hidden">
              {img.startsWith("/") || img.startsWith("http") ? (
                <Image src={img} alt="" fill className="object-cover pointer-events-none" draggable={false} />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[10px] text-white/40">
                  NO IMG
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              {idx === 0 && (
                <span className="inline-block bg-[color:var(--color-accent-2)] text-black text-[10px] font-bold px-2 py-0.5 rounded-full mb-1">
                  ПРЕВЬЮ
                </span>
              )}
              <div className="text-xs text-white/40 truncate">{img.split("/").pop()}</div>
            </div>

            <button
              type="button"
              onClick={() => onChange(images.filter((_, i) => i !== idx))}
              className="p-2 text-white/40 hover:text-red-400 transition-colors"
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <label className="flex items-center justify-center w-full p-4 border border-dashed border-white/20 rounded-lg hover:border-white/40 cursor-pointer transition-colors bg-white/5 gap-2">
        <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
        <span className="text-xl text-white/60">+</span>
        <span className="text-sm text-white/60">{uploading ? "Загрузка..." : "Загрузить фото"}</span>
      </label>
    </div>
  );
}

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
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Редактирование: {bundle.title}</h1>
        <Link href="/admin" className="text-sm text-white/60 hover:text-white">
          ← Назад
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Main Info */}
        <section className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Основная информация</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Название</label>
              <input
                type="text"
                value={bundle.title}
                onChange={(e) => setBundle({ ...bundle, title: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Цена</label>
              <input
                type="text"
                value={bundle.price}
                onChange={(e) => setBundle({ ...bundle, price: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80">Срок</label>
              <input
                type="text"
                value={bundle.duration}
                onChange={(e) => setBundle({ ...bundle, duration: e.target.value })}
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Краткое описание (для карточки)</label>
            <textarea
              value={bundle.shortDescription || ""}
              onChange={(e) => setBundle({ ...bundle, shortDescription: e.target.value })}
              className="w-full h-24 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none resize-none"
            />
          </div>
        </section>

        {/* Details Page Info */}
        <section className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Страница "Подробнее"</h2>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Meta Title</label>
            <input
              type="text"
              value={bundle.metaTitle || ""}
              onChange={(e) => setBundle({ ...bundle, metaTitle: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
              placeholder="Заголовок для поисковиков"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Meta Description</label>
            <textarea
              value={bundle.metaDescription || ""}
              onChange={(e) => setBundle({ ...bundle, metaDescription: e.target.value })}
              className="w-full h-24 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
              placeholder="Описание для поисковиков"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Полное описание</label>
            <textarea
              value={bundle.description || ""}
              onChange={(e) => setBundle({ ...bundle, description: e.target.value })}
              className="w-full h-32 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
            />
          </div>
        </section>

        {/* Lists */}
        <section className="space-y-8 p-6 rounded-2xl bg-white/5 border border-white/10">
          <ArrayField
            label="Что входит в стоимость"
            values={bundle.includes}
            onChange={(v) => setBundle({ ...bundle, includes: v })}
          />
          <ArrayField
            label="Детальные функции (для страницы подробнее)"
            values={bundle.detailedFeatures || []}
            onChange={(v) => setBundle({ ...bundle, detailedFeatures: v })}
          />
          <ArrayField
            label="Технологии"
            values={bundle.tech}
            onChange={(v) => setBundle({ ...bundle, tech: v })}
          />
          <ArrayField
            label="Видимые теги (под технологиями)"
            values={bundle.visibleTags || []}
            onChange={(v) => setBundle({ ...bundle, visibleTags: v })}
          />
          <ArrayField
            label="Мета-теги (скрытые ключевые слова)"
            values={bundle.metaKeywords || []}
            onChange={(v) => setBundle({ ...bundle, metaKeywords: v })}
          />
        </section>

        {/* Images */}
        <section className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Изображения</h2>
          <ImageUpload
            label="Фотографии"
            images={bundle.images || []}
            onChange={(v) => setBundle({ ...bundle, images: v })}
          />
        </section>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur border-t border-white/10 flex justify-end container mx-auto">
          <button
            type="submit"
            disabled={saving}
            className="px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-white/90 disabled:opacity-50"
          >
            {saving ? "Сохранение..." : "Сохранить изменения"}
          </button>
        </div>
      </form>
    </div>
  );
}
