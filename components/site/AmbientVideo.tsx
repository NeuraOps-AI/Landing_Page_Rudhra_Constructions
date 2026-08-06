"use client";

import { useEffect, useRef } from "react";
import { hasStartupCompleted, STARTUP_COMPLETE_EVENT } from "@/lib/startup";

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
    let disposed = false;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");

    const playVideo = () => {
      if (disposed) return;
      video.currentTime = 0;
      void video.play().catch(() => {
        if (!disposed) video.addEventListener("canplay", playVideo, { once: true });
      });
    };

    if (hasStartupCompleted()) playVideo();
    else {
      video.pause();
      window.addEventListener(STARTUP_COMPLETE_EVENT, playVideo, { once: true });
    }

    return () => {
      disposed = true;
      window.removeEventListener(STARTUP_COMPLETE_EVENT, playVideo);
      video.removeEventListener("canplay", playVideo);
    };
  }, [src]);

  return (
    <video ref={videoRef} className={`ambient-video ${className}`} poster={poster} loop muted playsInline preload="auto" aria-hidden="true" tabIndex={-1}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
