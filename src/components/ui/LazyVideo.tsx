"use client";

import { useEffect, useRef, useState } from "react";

interface LazyVideoProps {
  src: string;
  className?: string;
  trimEnd?: number;
  poster?: string;
  onLoad?: () => void;
  priority?: boolean;
}

export default function LazyVideo({
  src,
  className,
  trimEnd = 0,
  poster,
  onLoad,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Reload video when src changes
    video.load();

    // Force muted to allow autoplay
    video.muted = true;
    
    // Attempt to play immediately
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Autoplay might be blocked, but we don't need to log it to user
        // console.error("Auto-play failed:", err);
      });
    }
  }, [src]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || trimEnd <= 0) return;

    if (video.duration - video.currentTime <= trimEnd) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleError = (e: any) => {
      // Silent error handling for now
  };

  const handleLoadedMetadata = () => {
      if (onLoad) onLoad();
  };

  return (
    <div className="relative h-full w-full bg-gray-900">
        <video
        ref={videoRef}
        className={className}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onError={handleError}
        onLoadedMetadata={handleLoadedMetadata}
        >
            <source src={src} type="video/mp4" />
        </video>
    </div>
  );
}
