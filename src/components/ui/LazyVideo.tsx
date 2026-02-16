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
      setError(errorMsg);
  };

  const handleLoadedMetadata = () => {
      const video = videoRef.current;
      setDebugInfo(prev => prev + `\nLoaded: ${video?.videoWidth}x${video?.videoHeight}, Dur: ${video?.duration}`);
      if (onLoad) onLoad();
  };

  return (
    <div className="relative h-full w-full bg-gray-900">
        {error && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-900 text-white p-4 text-center">
                <div className="text-xs">
                    <p className="text-red-400 mb-2">Video Load Error</p>
                    <p className="opacity-50">{error}</p>
                    <p className="mt-2 text-[10px] break-all">{src}</p>
                </div>
            </div>
        )}
        {!error && (
            <div className="absolute bottom-0 left-0 z-50 bg-black/50 text-white text-[10px] p-1 w-full break-all pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
                {debugInfo}
            </div>
        )}
        <video
        ref={videoRef}
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
        >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
        </video>
    </div>
  );
}
