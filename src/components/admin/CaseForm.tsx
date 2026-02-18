"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CaseStudy } from "@/lib/cases-db";
import { ArrayField, ImageUpload, ResultArrayField } from "./FormComponents";

export function CaseForm({ initialData, isNew = false }: { initialData?: CaseStudy, isNew?: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CaseStudy>(
    initialData || {
      slug: "",
      client: "",
      industry: "",
      serviceType: "web",
      title: "",
      challenge: "",
      solution: "",
      result: [],
      tech: [],
      price: "",
      duration: "",
      tags: [],
      imageUrl: "",
      gallery: [],
      videoUrl: "",
      fullDescription: "",
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isNew ? "/api/admin/cases" : `/api/admin/cases/${initialData?.slug}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to save");

      router.push("/admin/cases");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Ошибка сохранения");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Вы уверены, что хотите удалить этот кейс?")) return;
    setLoading(true);
    try {
      await fetch(`/api/admin/cases/${initialData?.slug}`, { method: "DELETE" });
      router.push("/admin/cases");
      router.refresh();
    } catch (err) {
      alert("Ошибка удаления");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-8">
      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold">Основная информация</h2>
        
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Slug (URL)</label>
            <input
              required
              type="text"
              value={data.slug}
              onChange={(e) => setData({ ...data, slug: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
              placeholder="my-case-study"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Тип услуги</label>
            <select
              value={data.serviceType}
              onChange={(e) => setData({ ...data, serviceType: e.target.value as any })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
            >
              <option value="web">Web Development</option>
              <option value="mobile">Mobile App</option>
              <option value="crm">CRM System</option>
              <option value="automation">Business Automation</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Заголовок кейса</label>
          <input
            required
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Клиент</label>
            <input
              required
              type="text"
              value={data.client}
              onChange={(e) => setData({ ...data, client: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Индустрия</label>
            <input
              required
              type="text"
              value={data.industry}
              onChange={(e) => setData({ ...data, industry: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Бюджет (от)</label>
            <input
              required
              type="text"
              value={data.price}
              onChange={(e) => setData({ ...data, price: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Сроки</label>
            <input
              required
              type="text"
              value={data.duration}
              onChange={(e) => setData({ ...data, duration: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold">Описание и Контент</h2>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Проблема (Challenge)</label>
          <textarea
            required
            rows={3}
            value={data.challenge}
            onChange={(e) => setData({ ...data, challenge: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Решение (Solution)</label>
          <textarea
            required
            rows={3}
            value={data.solution}
            onChange={(e) => setData({ ...data, solution: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Полное описание (опционально)</label>
          <textarea
            rows={5}
            value={data.fullDescription || ""}
            onChange={(e) => setData({ ...data, fullDescription: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold">Списки и Теги</h2>
        <ResultArrayField
          label="Результаты (Results)"
          values={data.result}
          onChange={(val) => setData({ ...data, result: val })}
        />
        <ArrayField
          label="Технологии (Tech Stack)"
          values={data.tech}
          onChange={(val) => setData({ ...data, tech: val })}
        />
        <ArrayField
          label="Теги (Tags)"
          values={data.tags}
          onChange={(val) => setData({ ...data, tags: val })}
        />
      </div>

      <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
        <h2 className="text-xl font-semibold">Медиа</h2>
        
        <ImageUpload
          label="Главное изображение"
          images={data.imageUrl ? [data.imageUrl] : []}
          onChange={(urls) => setData({ ...data, imageUrl: urls[0] || "" })}
          multiple={false}
        />

        <ImageUpload
          label="Галерея (дополнительные фото)"
          images={data.gallery || []}
          onChange={(urls) => setData({ ...data, gallery: urls })}
          multiple={true}
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Ссылка на видео (опционально)</label>
          <input
            type="text"
            value={data.videoUrl || ""}
            onChange={(e) => setData({ ...data, videoUrl: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
            placeholder="https://..."
          />
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
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
            placeholder="Заголовок для поисковиков"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white/80">Meta Description</label>
          <textarea
            value={data.metaDescription || ""}
            onChange={(e) => setData({ ...data, metaDescription: e.target.value })}
            className="h-24 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-white/30 focus:outline-none"
            placeholder="Описание для поисковиков"
          />
        </div>
        <ArrayField
          label="Meta Keywords"
          values={data.metaKeywords || []}
          onChange={(val) => setData({ ...data, metaKeywords: val })}
        />
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
