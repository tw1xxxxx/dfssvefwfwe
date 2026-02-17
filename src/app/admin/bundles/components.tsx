"use client";

import { useState } from "react";
import { Reorder } from "framer-motion";
import Image from "next/image";

export function ArrayField({
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

export function ImageUpload({
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
