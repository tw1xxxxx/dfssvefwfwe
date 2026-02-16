"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

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
  priority = false,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Use framer-motion's useInView for robust visibility detection
  const isInView = useInView(videoRef, { 
    once: true, 
    margin: "200px" // Start loading before it enters viewport
  });
  
  const [isLoaded, setIsLoaded] = useState(priority);

  // Trigger load when in view
  useEffect(() => {
    if (isInView || priority) {
      setIsLoaded(true);
    }
  }, [isInView, priority]);

  // Handle play logic when loaded
  useEffect(() => {
    if (isLoaded && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented or video not ready
        });
      }
    }
  }, [isLoaded]);

  // Handle trimming logic
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || trimEnd <= 0) return;

    if (video.duration && video.currentTime > video.duration - trimEnd) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleLoadedData = () => {
    if (onLoad) onLoad();
  };

  const handleError = () => {
    if (onLoad) onLoad();
  };

  return (
    <video
      ref={videoRef}
      src={isLoaded ? src : undefined}
      poster={poster}
      className={className}
      muted
      loop
      playsInline
      onTimeUpdate={handleTimeUpdate}
      onLoadedData={handleLoadedData}
      onError={handleError}
      preload={isLoaded ? "auto" : "none"}
    />
  );
}
