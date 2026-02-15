"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

export function InView({
  children,
  className = "",
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        className,
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        "transition-all duration-700 ease-out motion-reduce:transition-none"
      ].join(" ")}
      style={isVisible ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}

