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
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;
    
    const video = videoRef.current;
    if (!video) return;

    // Reload video when src changes
    video.load();

    // Force muted to allow autoplay on mobile
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true"); // For older iOS
    video.setAttribute("muted", "");
    
    // Attempt to play immediately
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay failed, we can try again on interaction
      });
    }
  }, [src, shouldLoad]);

  // Retry playing if paused (e.g. after low power mode suspension)
  useEffect(() => {
      if (!shouldLoad) return;

      const video = videoRef.current;
      if (!video) return;

      const handleVisibilityChange = () => {
          if (document.visibilityState === 'visible' && video.paused) {
              video.play().catch(() => {});
          }
      };

      const handleTouch = () => {
          if (video.paused) {
              video.play().catch(() => {});
          }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      document.addEventListener("touchstart", handleTouch, { passive: true });
      document.addEventListener("click", handleTouch, { passive: true });

      return () => {
          document.removeEventListener("visibilitychange", handleVisibilityChange);
          document.removeEventListener("touchstart", handleTouch);
          document.removeEventListener("click", handleTouch);
      };
  }, [shouldLoad]);

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

  const handleCanPlay = () => {
    const video = videoRef.current;
    if (video && video.paused) {
        video.muted = true;
        video.play().catch(() => {});
    }
  };

  return (
    <div 
        ref={containerRef}
        className="relative h-full w-full bg-gray-900 transform-gpu will-change-transform" 
        onClick={() => {
            const video = videoRef.current;
            if (video && video.paused) video.play().catch(() => {});
        }}
    >
        {shouldLoad && (
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
            onCanPlay={handleCanPlay}
            >
                <source src={src} type="video/mp4" />
            </video>
        )}
    </div>
  );
}
