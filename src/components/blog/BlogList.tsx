"use client";

import { useState } from "react";
import Link from "next/link";
import { Post } from "@/lib/posts-db";
import { cn } from "@/lib/utils";

type SortOption = "date" | "views";

export function BlogList({ initialPosts }: { initialPosts: Post[] }) {
  const [sort, setSort] = useState<SortOption>("date");

  const sortedPosts = [...initialPosts].sort((a, b) => {
    if (sort === "date") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return (b.views || 0) - (a.views || 0);
    }
  });

  return (
    <>
      <div className="mt-8 mb-6 flex gap-4">
        <button
          onClick={() => setSort("views")}
          className={cn(
            "text-sm font-medium transition-colors",
            sort === "views" ? "text-white" : "text-white/40 hover:text-white/70"
          )}
        >
          По популярности
        </button>
        <button
          onClick={() => setSort("date")}
          className={cn(
            "text-sm font-medium transition-colors",
            sort === "date" ? "text-white" : "text-white/40 hover:text-white/70"
          )}
        >
          По дате выхода
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sortedPosts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group rounded-3xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
          >
            <div className="flex items-center justify-between">
                <div className="text-xs text-white/50">{p.date}</div>
                {/* Show views if > 0 */}
                {(p.views || 0) > 0 && (
                     <div className="flex items-center gap-1.5 text-xs text-white/50" title="Просмотры">
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      <span>{p.views}</span>
                    </div>
                )}
            </div>
            
            <div className="mt-3 text-xl font-semibold leading-snug">
              {p.title}
            </div>
            <div className="mt-3 text-sm leading-7 text-white/65">
              {p.excerpt}
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between text-sm text-white/65">
              <span className="group-hover:text-white">Открыть</span>
              <span>→</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
