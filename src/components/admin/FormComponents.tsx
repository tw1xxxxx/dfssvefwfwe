"use client";

import { useState } from "react";
import { CaseResult } from "@/lib/cases-db";

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

export function ResultArrayField({
  label,
  values,
  onChange,
}: {
  label: string;
  values: CaseResult[];
  onChange: (newValues: CaseResult[]) => void;
}) {
  const add = () => onChange([...values, { value: "", description: "" }]);
  const remove = (idx: number) => onChange(values.filter((_, i) => i !== idx));
  const update = (idx: number, field: keyof CaseResult, val: string) => {
    const newValues = [...values];
    newValues[idx] = { ...newValues[idx], [field]: val };
    onChange(newValues);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white/80">{label}</label>
      {values.map((val, idx) => (
        <div key={idx} className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            value={val.value}
            onChange={(e) => update(idx, "value", e.target.value)}
            className="w-full sm:w-1/3 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/20 focus:border-white/30 focus:outline-none"
            placeholder="Значение (35%)"
          />
          <input
            type="text"
            value={val.description}
            onChange={(e) => update(idx, "description", e.target.value)}
            className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder-white/20 focus:border-white/30 focus:outline-none"
            placeholder="Описание (Рост продаж)"
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
        + Добавить результат
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
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white/80">{label}</label>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {images.map((img, idx) => (
          <div key={idx} className="relative aspect-video group">
            <img src={img} alt="" className="h-full w-full rounded-lg object-cover" />
            <button
              type="button"
              onClick={() => remove(idx)}
              className="absolute right-2 top-2 hidden rounded-full bg-red-500 p-1 text-white shadow-lg group-hover:block hover:bg-red-600"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ))}
        
        <label className="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-white/20 bg-white/5 hover:bg-white/10">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
          />
          {uploading ? (
            <span className="text-xs text-white/50">Загрузка...</span>
          ) : (
            <>
              <span className="text-2xl text-white/30">+</span>
              <span className="mt-2 text-xs text-white/50">Загрузить</span>
            </>
          )}
        </label>
      </div>
    </div>
  );
}
