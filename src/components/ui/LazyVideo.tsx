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
        console.error("Auto-play failed:", err);
        setDebugInfo(prev => prev + `\nAutoplay err: ${err.message}`);
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
      const video = videoRef.current;
      const err = video?.error;
      const errorMsg = `Error: ${err?.message || "Unknown error"} (Code: ${err?.code})`;
      console.error("Video Error:", errorMsg, "Src:", src);
      // setError(errorMsg); // Silently fail in production or log only
  };

  const handleLoadedMetadata = () => {
      const video = videoRef.current;
      // setDebugInfo(prev => prev + `\nLoaded: ${video?.videoWidth}x${video?.videoHeight}, Dur: ${video?.duration}`);
      if (onLoad) onLoad();
  };

  return (
    <div className="relative h-full w-full bg-gray-900">
        <video
        ref={videoRef}
        className={`${className} pointer-events-none`}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={false}
        onTimeUpdate={handleTimeUpdate}
        onError={handleError}
        onLoadedMetadata={handleLoadedMetadata}
        style={{ backgroundColor: "#222" }} 
        >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>
  );
}
