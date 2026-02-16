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
  priority = false,
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(priority);

  useEffect(() => {
    if (priority) {
      setIsLoaded(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "200px", // Load when within 200px of viewport
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  // Handle play logic when loaded
  useEffect(() => {
    if (isLoaded && videoRef.current) {
      const video = videoRef.current;
      // We need to wait a tick or ensure element is ready
      const attemptPlay = async () => {
        try {
          if (video.paused) {
            await video.play();
          }
        } catch (error) {
          // Auto-play was prevented or video not ready
        }
      };
      attemptPlay();
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
