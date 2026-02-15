"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

type SiteConfig = {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  url?: string;
};

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
        + Добавить ключевое слово
      </button>
    </div>
  );
}

function SingleImageUpload({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: string;
  onChange: (url: string) => void;
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
        onChange(data.url);
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
      
      {value && (
        <div className="relative h-48 w-full max-w-md overflow-hidden rounded-lg bg-black/20 border border-white/10">
          <Image src={value} alt="Preview" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 p-2 bg-black/50 rounded-full text-white/60 hover:text-white hover:bg-black/70 transition-all"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <label className="flex items-center justify-center w-full max-w-md p-4 border border-dashed border-white/20 rounded-lg hover:border-white/40 cursor-pointer transition-colors bg-white/5 gap-2">
        <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
        {uploading ? (
          <span className="text-white/40">Загрузка...</span>
        ) : (
          <>
            <svg className="w-5 h-5 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            <span className="text-white/60 text-sm">Загрузить изображение</span>
          </>
        )}
      </label>
    </div>
  );
}

export default function SeoAdminPage() {
  const router = useRouter();
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/seo")
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;

    setSaving(true);
    try {
      await fetch("/api/admin/seo", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      router.refresh();
      alert("Настройки сохранены!");
    } catch (err) {
      console.error(err);
      alert("Ошибка сохранения");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-10 text-center">Загрузка...</div>;
  if (!config) return <div className="p-10 text-center">Ошибка загрузки конфигурации</div>;

  return (
    <div className="pb-24">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/admin"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
        >
          ←
        </Link>
        <h1 className="text-3xl font-bold">Настройки SEO</h1>
      </div>

      <form onSubmit={handleSave} className="max-w-4xl space-y-8">
        {/* Main Info */}
        <section className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Основные метатеги</h2>
          
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">URL сайта</label>
            <input
              type="url"
              value={config.url || ""}
              onChange={(e) => {
                // Remove trailing slash if present to ensure clean URL concatenation
                const val = e.target.value;
                setConfig({ ...config, url: val });
              }}
              onBlur={() => {
                // Format on blur: remove trailing slash
                if (config.url && config.url.endsWith('/')) {
                   setConfig({ ...config, url: config.url.slice(0, -1) });
                }
              }}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/20 focus:border-white/30 focus:outline-none"
              placeholder="https://alpha.dev"
            />
            <p className="text-xs text-white/40">
              Укажите адрес главной страницы (домен). Остальные ссылки будут формироваться от него.
              Например: https://mysite.com
            </p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Заголовок (Title)</label>
            <input
              type="text"
              required
              value={config.title}
              onChange={(e) => setConfig({ ...config, title: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/20 focus:border-white/30 focus:outline-none"
            />
            <p className="text-xs text-white/40">Рекомендуемая длина: 50-60 символов</p>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/80">Описание (Description)</label>
            <textarea
              required
              rows={3}
              value={config.description}
              onChange={(e) => setConfig({ ...config, description: e.target.value })}
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/20 focus:border-white/30 focus:outline-none resize-none"
            />
            <p className="text-xs text-white/40">Рекомендуемая длина: 150-160 символов</p>
          </div>

          <ArrayField
            label="Ключевые слова (Keywords)"
            values={config.keywords || []}
            onChange={(v) => setConfig({ ...config, keywords: v })}
          />
        </section>

        {/* OG Image */}
        <section className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h2 className="text-xl font-semibold mb-4">Социальные сети (Open Graph)</h2>
          <SingleImageUpload
            label="Изображение для превью (OG Image)"
            value={config.ogImage}
            onChange={(v) => setConfig({ ...config, ogImage: v })}
          />
          <p className="text-xs text-white/40">Рекомендуемый размер: 1200x630px</p>
        </section>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur border-t border-white/10 flex justify-end container mx-auto z-50">
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
