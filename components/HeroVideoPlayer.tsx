"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FullscreenIcon, PauseIcon, PlayIcon } from "./icons";

type HeroVideoPlayerProps = {
  src: string;
  poster?: string;
  title: string;
  cinematic?: boolean;
};

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds)) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

export function HeroVideoPlayer({ src, poster, title, cinematic = false }: HeroVideoPlayerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
  }, []);

  const scheduleControlsHide = useCallback(() => {
    clearHideTimer();
    if (isPlaying) {
      hideTimerRef.current = setTimeout(() => setControlsVisible(false), 2200);
    }
  }, [clearHideTimer, isPlaying]);

  const revealControls = useCallback(() => {
    setControlsVisible(true);
    scheduleControlsHide();
  }, [scheduleControlsHide]);

  const togglePlayback = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (video.paused) {
        setHasStarted(true);
        await video.play();
      } else {
        video.pause();
      }
    } catch {
      setHasStarted(false);
      setIsPlaying(false);
      setControlsVisible(true);
    }
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    try {
      if (!document.fullscreenElement) {
        await wrapper.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      setIsFullscreen(false);
    }
  }, []);

  const handleSeek = (value: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = value;
    setCurrentTime(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    if (event.key === " " || event.key === "Spacebar" || event.code === "Space" || event.key.toLowerCase() === "k") {
      event.preventDefault();
      void togglePlayback();
    } else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const direction = event.key === "ArrowLeft" ? -5 : 5;
      handleSeek(Math.min(Math.max(video.currentTime + direction, 0), duration || 0));
    } else if (event.key.toLowerCase() === "f") {
      event.preventDefault();
      void toggleFullscreen();
    }
  };

  useEffect(() => {
    const onFullscreenChange = () => setIsFullscreen(document.fullscreenElement === wrapperRef.current);
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video && Number.isFinite(video.duration)) setDuration(video.duration);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const attemptAutoplay = () => {
      video.muted = true;
      video.defaultMuted = true;
      video.setAttribute("muted", "");
      video.setAttribute("playsinline", "");

      void video.play().catch(() => {
        if (!cancelled) setControlsVisible(true);
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      attemptAutoplay();
    } else {
      video.addEventListener("canplay", attemptAutoplay, { once: true });
    }

    return () => {
      cancelled = true;
      video.removeEventListener("canplay", attemptAutoplay);
    };
  }, [src]);

  useEffect(() => {
    scheduleControlsHide();
    return clearHideTimer;
  }, [clearHideTimer, scheduleControlsHide]);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={wrapperRef}
      className={`video-shell group relative aspect-video w-full overflow-hidden rounded-[22px] bg-[#071523] shadow-[0_26px_60px_rgba(13,52,96,0.34)] sm:rounded-[26px] ${cinematic ? "sm:aspect-[2.25/1]" : ""} ${
        controlsVisible ? "controls-visible cursor-default" : "controls-hidden cursor-none"
      }`}
      tabIndex={0}
      role="region"
      aria-label={title}
      onKeyDown={handleKeyDown}
      onPointerMove={revealControls}
      onPointerDown={revealControls}
      onPointerLeave={() => isPlaying && setControlsVisible(false)}
      onFocus={revealControls}
    >
      <video
        ref={videoRef}
        className={`absolute inset-0 block size-full ${cinematic ? "object-contain sm:object-cover" : "object-contain"}`}
        poster={poster}
        preload="auto"
        autoPlay
        loop
        muted
        playsInline
        onClick={() => void togglePlayback()}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onDurationChange={(event) => setDuration(event.currentTarget.duration)}
        onCanPlay={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
        onPlay={() => {
          setHasStarted(true);
          setIsPlaying(true);
        }}
        onPause={() => {
          setIsPlaying(false);
          setControlsVisible(true);
        }}
        onEnded={() => {
          setIsPlaying(false);
          setHasStarted(false);
          setControlsVisible(true);
          setCurrentTime(0);
        }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support HTML video.
      </video>

      {!hasStarted && poster && (
        <Image
          src={poster}
          alt=""
          fill
          preload
          sizes="(min-width: 1873px) 1760px, 94vw"
          className="pointer-events-none z-[1] object-cover"
          aria-hidden="true"
        />
      )}

      <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_top,rgba(2,11,22,0.82)_0%,rgba(2,11,22,0.08)_23%,transparent_42%)]" aria-hidden="true" />

      <div
        className="video-controls absolute inset-x-0 bottom-0 z-20 flex items-center gap-2.5 px-3 pb-3 pt-12 text-white transition-opacity duration-300 sm:gap-4 sm:px-6 sm:pb-5 lg:px-8 lg:pb-6"
        aria-hidden={!controlsVisible}
      >
        <button
          type="button"
          className="focus-ring grid size-10 shrink-0 place-items-center rounded-full transition-colors hover:bg-white/15"
          onClick={() => void togglePlayback()}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          tabIndex={controlsVisible ? 0 : -1}
        >
          {isPlaying ? <PauseIcon className="size-5" /> : <PlayIcon className="ml-0.5 size-5" />}
        </button>

        <span className="hidden min-w-[42px] text-sm font-medium tabular-nums sm:inline">{formatTime(currentTime)}</span>

        <input
          className="video-progress h-5 min-w-0 flex-1 cursor-pointer"
          type="range"
          min="0"
          max={duration || 0}
          step="0.1"
          value={Math.min(currentTime, duration || 0)}
          onChange={(event) => handleSeek(Number(event.currentTarget.value))}
          aria-label="Video progress"
          aria-valuetext={`${formatTime(currentTime)} of ${formatTime(duration)}`}
          tabIndex={controlsVisible ? 0 : -1}
          style={{ "--progress": `${progress}%` } as React.CSSProperties}
        />

        <span className="min-w-[42px] text-right text-xs font-medium tabular-nums sm:text-sm">{formatTime(duration)}</span>

        <button
          type="button"
          className="focus-ring grid size-10 shrink-0 place-items-center rounded-full transition-colors hover:bg-white/15"
          onClick={() => void toggleFullscreen()}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          tabIndex={controlsVisible ? 0 : -1}
        >
          <FullscreenIcon className="size-[22px]" />
        </button>
      </div>
    </div>
  );
}
