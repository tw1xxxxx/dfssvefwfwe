"use client";

import { useState } from "react";
import { Reorder } from "framer-motion";

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
  multiple = true,
}: {
  label: string;
  images: string[];
  onChange: (newImages: string[]) => void;
  multiple?: boolean;
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
        if (multiple) {
          onChange([...images, data.url]);
        } else {
          onChange([data.url]);
        }
      }
    } catch (err) {
      console.error(err);
      alert("Ошибка загрузки");
    } finally {
      setUploading(false);
    }
  };

  const remove = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-white/80">{label}</label>
      
      {images.length > 0 && (
        <Reorder.Group
          axis="y"
          values={images}
          onReorder={onChange}
          className="space-y-2"
        >
          {images.map((img, idx) => (
            <Reorder.Item key={img} value={img}>
              <div className="group relative flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-2 pr-4">
                <div className="flex h-8 w-8 cursor-move items-center justify-center text-white/20 hover:text-white">
                  ☰
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img}
                  alt=""
                  className="h-16 w-24 rounded-lg object-cover"
                />
                <div className="flex-1 truncate text-xs text-white/40">{img}</div>
                {idx === 0 && (
                  <span className="rounded bg-blue-500/20 px-2 py-0.5 text-[10px] font-bold uppercase text-blue-400">
                    Main
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="rounded p-2 text-white/20 hover:bg-white/10 hover:text-red-400"
                >
                  ✕
                </button>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}

      {(!multiple && images.length >= 1) ? null : (
        <div className="flex items-center gap-4">
          <label className="cursor-pointer rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium hover:bg-white/10">
            {uploading ? "Загрузка..." : "Загрузить изображение"}
            <input
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      )}
    </div>
  );
}
