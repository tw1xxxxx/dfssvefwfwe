"use client";

import { useEffect, useRef } from "react";

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

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Force muted to allow autoplay
    video.muted = true;
    
    // Attempt to play immediately
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.error("Auto-play failed:", error);
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

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={className}
      autoPlay
      muted
      loop
      playsInline
      controls={true} // Added controls for debugging
      onTimeUpdate={handleTimeUpdate}
      style={{ backgroundColor: "#000" }} // Black background to see if element exists
    />
  );
}
