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
  }, []);

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
      setError(`Error: ${err?.message || "Unknown error"} (Code: ${err?.code})`);
  };

  const handleLoadedMetadata = () => {
      const video = videoRef.current;
      setDebugInfo(prev => prev + `\nLoaded: ${video?.videoWidth}x${video?.videoHeight}, Dur: ${video?.duration}`);
      if (onLoad) onLoad();
  };

  return (
    <div className="relative h-full w-full">
        {error && (
            <div className="absolute top-0 left-0 z-50 bg-red-500/80 text-white text-[10px] p-1 w-full break-all">
                {error}
            </div>
        )}
        <div className="absolute bottom-0 left-0 z-50 bg-black/50 text-white text-[10px] p-1 w-full break-all pointer-events-none">
            {debugInfo}
        </div>
        <video
        ref={videoRef}
        src={src}
        poster={poster}
        className={className}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        controls={true} 
        onTimeUpdate={handleTimeUpdate}
        onError={handleError}
        onLoadedMetadata={handleLoadedMetadata}
        style={{ backgroundColor: "#222" }} 
        />
    </div>
  );
}
