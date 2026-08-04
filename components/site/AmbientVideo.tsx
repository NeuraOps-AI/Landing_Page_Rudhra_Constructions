"use client";

import { useEffect, useRef } from "react";

type AmbientVideoProps = {
  src: string;
  poster?: string;
  className?: string;
};

export function AmbientVideo({ src, poster, className = "" }: AmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    void video.play().catch(() => undefined);
  }, [src]);

  return (
    <video ref={videoRef} className={`ambient-video ${className}`} poster={poster} autoPlay loop muted playsInline preload="auto" aria-hidden="true" tabIndex={-1}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
