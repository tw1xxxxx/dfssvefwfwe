"use client";

import { useEffect, useState } from "react";

export function ViewCounter({ slug, initialViews = 0 }: { slug: string; initialViews?: number }) {
  const [views, setViews] = useState(initialViews || 0);
  const [hasViewed, setHasViewed] = useState(false);

  useEffect(() => {
    if (initialViews) {
      setViews(initialViews);
    }
  }, [initialViews]);

  useEffect(() => {
    // Check if user has already viewed this post in this session
    const viewedKey = `viewed-${slug}`;
    if (sessionStorage.getItem(viewedKey)) {
      setHasViewed(true);
      return;
    }

    // Increment view count
    fetch(`/api/posts/${slug}/view`, { method: "POST" })
      .then((res) => {
        if (res.ok) {
          sessionStorage.setItem(viewedKey, "true");
          setHasViewed(true);
          return res.json();
        }
      })
      .then((data) => {
        if (data && typeof data.views === "number") {
          setViews(data.views);
        }
      })
      .catch((err) => console.error("Error updating views:", err));
  }, [slug]);

  return (
    <div className="flex items-center gap-1.5 text-xs text-white/50" title="Просмотры">
      <svg
        className="h-4 w-4"
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
      <span>{views}</span>
    </div>
  );
}
