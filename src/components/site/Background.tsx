"use client";

import { useEffect, useState } from "react";

export function Background() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#05070b]">
      {/* Dynamic Mesh */}
      <div className="alpha-mesh opacity-60" />
      
      {/* Animated Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Vignette & Depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#05070b]/20 to-[#05070b]" />
    </div>
  );
}
