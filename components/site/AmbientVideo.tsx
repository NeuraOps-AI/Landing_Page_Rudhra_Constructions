"use client";

import { useEffect, useRef } from "react";
import { HOME_CAMPAIGN_DISMISSED_EVENT, HOME_CAMPAIGN_OPENED_EVENT, isHomeCampaignPending } from "@/lib/home-campaign";
import { hasStartupCompleted, STARTUP_COMPLETE_EVENT } from "@/lib/startup";

type AmbientVideoProps = {
  src: string;
  poster?: string;
  className?: string;
  waitForCampaign?: boolean;
};

export function AmbientVideo({ src, poster, className = "", waitForCampaign = false }: AmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let disposed = false;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.currentTime = 0;

    const playVideo = () => {
      if (disposed) return;
      void video.play().catch(() => {
        if (!disposed) video.addEventListener("canplay", playVideo, { once: true });
      });
    };

    const pauseVideo = () => video.pause();

    const playWhenReady = () => {
      if (waitForCampaign && isHomeCampaignPending()) {
        video.pause();
        return;
      }
      playVideo();
    };

    if (hasStartupCompleted()) playWhenReady();
    else {
      video.pause();
      window.addEventListener(STARTUP_COMPLETE_EVENT, playWhenReady, { once: true });
    }
    if (waitForCampaign) {
      window.addEventListener(HOME_CAMPAIGN_OPENED_EVENT, pauseVideo);
      window.addEventListener(HOME_CAMPAIGN_DISMISSED_EVENT, playVideo);
    }

    return () => {
      disposed = true;
      window.removeEventListener(STARTUP_COMPLETE_EVENT, playWhenReady);
      window.removeEventListener(HOME_CAMPAIGN_OPENED_EVENT, pauseVideo);
      window.removeEventListener(HOME_CAMPAIGN_DISMISSED_EVENT, playVideo);
      video.removeEventListener("canplay", playVideo);
    };
  }, [src, waitForCampaign]);

  return (
    <video ref={videoRef} className={`ambient-video ${className}`} poster={poster} loop muted playsInline preload="auto" aria-hidden="true" tabIndex={-1}>
      <source src={src} type="video/mp4" />
    </video>
  );
}
