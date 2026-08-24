"use client";

import Image from "next/image";
import { type TouchEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { webProjectImage, type ProjectMedia } from "@/data/projects";

type ProjectMediaGalleryProps = {
  images: ProjectMedia[];
  label: string;
  contain?: boolean;
};

const isFormControl = (target: EventTarget | null) => {
  const element = target as HTMLElement | null;
  return Boolean(element?.closest("input, textarea, select, [contenteditable='true']"));
};

export function ProjectMediaGallery({ images, label, contain = false }: ProjectMediaGalleryProps) {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const touchGestureIsPinch = useRef(false);

  const previous = () => setActive((value) => (value - 1 + images.length) % images.length);
  const next = () => setActive((value) => (value + 1) % images.length);

  useEffect(() => {
    if (!fullscreen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [fullscreen]);

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (isFormControl(event.target)) return;
      if (event.key === "Escape" && fullscreen) setFullscreen(false);
      if (event.key === "ArrowLeft" && fullscreen) previous();
      if (event.key === "ArrowRight" && fullscreen) next();
    };
    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  });

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    if (event.touches.length > 1) {
      touchGestureIsPinch.current = true;
      touchStart.current = null;
      return;
    }
    const touch = event.touches[0];
    touchStart.current = touch ? { x: touch.clientX, y: touch.clientY } : null;
  };

  const handleTouchMove = (event: TouchEvent<HTMLElement>) => {
    if (event.touches.length > 1) {
      touchGestureIsPinch.current = true;
      touchStart.current = null;
    }
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchGestureIsPinch.current) {
      touchStart.current = null;
      if (event.touches.length === 0) touchGestureIsPinch.current = false;
      return;
    }
    if (event.touches.length > 0 || touchStart.current === null) return;
    const touch = event.changedTouches[0];
    if (!touch) return;
    const distanceX = touch.clientX - touchStart.current.x;
    const distanceY = touch.clientY - touchStart.current.y;
    touchStart.current = null;
    if (Math.abs(distanceX) < 54 || Math.abs(distanceX) <= Math.abs(distanceY) * 1.25) return;
    if (distanceX > 0) previous();
    else next();
  };

  if (!images.length) return null;

  const current = images[active];
  const imageClass = contain ? "object-contain" : "object-cover";

  return (
    <>
      <div
        className={`project-media-viewer ${contain ? "is-plan-viewer" : ""}`}
        tabIndex={0}
        aria-label={`${label} image viewer`}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            previous();
          }
          if (event.key === "ArrowRight") {
            event.preventDefault();
            next();
          }
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="project-media-stage">
          <button type="button" className="project-media-open" onClick={() => setFullscreen(true)} aria-label={`Open ${current.alt} in fullscreen`}>
            <Image src={webProjectImage(current.src)} alt={current.alt} fill sizes="(min-width: 1200px) 82vw, 94vw" className={imageClass} priority={active === 0} />
          </button>
          <span className="project-media-counter" aria-live="polite">{String(active + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
          {images.length > 1 && (
            <>
              <button type="button" className="project-media-arrow left" onClick={previous} aria-label={`Previous ${label} image`}>‹</button>
              <button type="button" className="project-media-arrow right" onClick={next} aria-label={`Next ${label} image`}>›</button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="project-media-thumbnails" role="list" aria-label={`${label} thumbnails`}>
            {images.map((image, index) => (
              <button
                key={`${image.src}-${index}`}
                type="button"
                role="listitem"
                className={index === active ? "is-active" : ""}
                aria-label={`Show ${image.alt}`}
                aria-current={index === active ? "true" : undefined}
                onClick={() => setActive(index)}
              >
                <Image src={webProjectImage(image.src)} alt="" fill sizes="150px" className={contain ? "object-contain" : "object-cover"} />
                <span className="sr-only">{image.alt}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {fullscreen ? createPortal(
        <div
          className="project-media-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${label} fullscreen viewer`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="project-media-lightbox-image">
            <Image src={webProjectImage(current.src)} alt={current.alt} fill sizes="100vw" className="object-contain" priority />
          </div>
          <span className="project-media-lightbox-count">{active + 1} / {images.length}</span>
          <button type="button" className="project-media-close" onClick={() => setFullscreen(false)} aria-label="Close fullscreen viewer">×</button>
          {images.length > 1 && (
            <>
              <button type="button" className="project-media-lightbox-arrow left" onClick={previous} aria-label="Previous image">‹</button>
              <button type="button" className="project-media-lightbox-arrow right" onClick={next} aria-label="Next image">›</button>
            </>
          )}
        </div>,
        document.body,
      ) : null}
    </>
  );
}
