"use client";

import { useState } from "react";
import Image from "next/image";
import { MediaFallback } from "./MediaFallback";
import LazyVideo from "./LazyVideo";

export function ImageCarousel({
  images,
  videoTrimEnd,
}: {
  images: string[];
  videoTrimEnd?: number;
}) {
  const [current, setCurrent] = useState(0);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});

  const next = () => setCurrent((p) => (p + 1) % images.length);
  const prev = () => setCurrent((p) => (p - 1 + images.length) % images.length);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10">
        <MediaFallback />
      </div>
    );
  }

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-white/5 ring-1 ring-white/10">
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, idx) => (
          <div key={idx} className="h-full w-full flex-none relative">
            {src.endsWith(".mp4") ? (
              <>
                {!loaded[idx] && <MediaFallback className="absolute inset-0 z-10" />}
                <LazyVideo
                  src={src}
                  trimEnd={videoTrimEnd}
                  className="h-full w-full object-cover"
                  onLoad={() => setLoaded((prev) => ({ ...prev, [idx]: true }))}
                  priority={idx === 0}
                />
              </>
            ) : src.startsWith("gradient-") ? (
              <div className={`h-full w-full ${getGradient(src)}`} />
            ) : (
              <div className="relative h-full w-full">
                {!loaded[idx] && <MediaFallback className="absolute inset-0 z-10" />}
                <Image
                  src={src}
                  alt=""
                  fill
                  priority={idx === 0}
                  loading={idx === 0 ? "eager" : "lazy"}
                  className={`object-cover transition-opacity duration-300 ${
                    loaded[idx] ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setLoaded((prev) => ({ ...prev, [idx]: true }))}
                  onError={() => setLoaded((prev) => ({ ...prev, [idx]: true }))}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white/80 backdrop-blur transition-all hover:bg-black/60 hover:text-white active:scale-95 flex items-center justify-center"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-3 text-white/80 backdrop-blur transition-all hover:bg-black/60 hover:text-white active:scale-95 flex items-center justify-center"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-black/20 p-1.5 backdrop-blur-sm">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  current === idx ? "w-6 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function getGradient(id: string) {
  const num = id.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const gradients = [
    "bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500",
    "bg-gradient-to-br from-emerald-400 via-cyan-500 to-blue-500",
    "bg-gradient-to-br from-orange-400 via-rose-500 to-purple-600",
    "bg-gradient-to-br from-blue-600 via-indigo-500 to-violet-500",
    "bg-gradient-to-br from-teal-400 via-emerald-500 to-green-600",
  ];
  return gradients[num % gradients.length];
}
