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
  // Use a ref to track visibility so we can access it in event handlers
  // without needing to recreate listeners or effects
  const isVisibleRef = useRef(priority);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // If priority is true, try to play immediately
    if (priority) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Auto-play was prevented or video not ready
        });
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Update visibility ref
          isVisibleRef.current = entry.isIntersecting;

          if (entry.isIntersecting) {
            // Load the source if not already loaded
            // We can call this repeatedly; React bails out if value hasn't changed
            setIsLoaded(true);

            // Try to play immediately (works if already loaded)
            video.play().catch(() => {
              // Expected error if src is not yet loaded
            });
          } else {
            // Pause when out of view
            video.pause();
          }
        });
      },
      {
        threshold: 0.1, // Reduced threshold to ensure it triggers earlier
        rootMargin: "200px 0px", // Preload/Start before it enters viewport
      }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [priority]); // Empty dependency array ensures stable observer

  // Effect to handle initial play after source is loaded
  useEffect(() => {
    if (isLoaded && isVisibleRef.current && videoRef.current) {
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

  // Vital: Play when data is loaded IF the video is currently visible
  const handleLoadedData = () => {
    if (isVisibleRef.current && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
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
