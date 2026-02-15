"use client";

import { useState } from "react";
import { MediaFallback } from "./MediaFallback";
import LazyVideo from "./LazyVideo";

export function VideoPlayer({
  src,
  className,
}: {
  src: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <LazyVideo 
        src={src} 
        className="h-full w-full object-cover"
      />
    </div>
  );
}
