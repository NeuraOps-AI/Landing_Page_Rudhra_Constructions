"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { ProjectGalleryImage } from "@/data/projectGallery";
import { GalleryNavigation } from "./GalleryNavigation";
import { GalleryPagination } from "./GalleryPagination";

type FullscreenGalleryProps = {
  open: boolean;
  image: ProjectGalleryImage;
  activeIndex: number;
  count: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
};

export function FullscreenGallery({ open, image, activeIndex, count, onClose, onPrevious, onNext, onSelect }: FullscreenGalleryProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pointerStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [open]);

  if (!open) return null;

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])") ?? []);
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[100] flex touch-pan-y items-center justify-center bg-[#020812]/98 px-3 py-16 sm:px-8 sm:py-20"
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen project gallery"
      onKeyDown={handleDialogKeyDown}
      onPointerDown={(event) => {
        pointerStartX.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (pointerStartX.current === null) return;
        const distance = event.clientX - pointerStartX.current;
        pointerStartX.current = null;
        if (Math.abs(distance) < 44) return;
        if (distance > 0) onPrevious();
        else onNext();
      }}
      onPointerCancel={() => {
        pointerStartX.current = null;
      }}
    >
      <button
        ref={closeRef}
        type="button"
        className="gallery-focus absolute right-4 top-4 z-20 grid size-11 place-items-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-7 sm:top-7 sm:size-12"
        onClick={onClose}
        aria-label="Close fullscreen gallery"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-6" aria-hidden="true">
          <path d="M5 5 19 19M19 5 5 19" />
        </svg>
      </button>

      {count > 1 && (
        <>
          <div className="absolute left-3 top-1/2 z-20 -translate-y-1/2 sm:left-8">
            <GalleryNavigation direction="previous" variant="fullscreen" onClick={onPrevious} />
          </div>
          <div className="absolute right-3 top-1/2 z-20 -translate-y-1/2 sm:right-8">
            <GalleryNavigation direction="next" variant="fullscreen" onClick={onNext} />
          </div>
        </>
      )}

      <div className="absolute inset-0">
        <Image
          key={`fullscreen-${image.id}`}
          src={image.src}
          alt={image.alt}
          fill
          priority
          sizes="100vw"
          className="gallery-image-enter object-cover"
        />
      </div>

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-5 z-20 sm:bottom-8">
          <GalleryPagination count={count} activeIndex={activeIndex} onSelect={onSelect} inverse />
        </div>
      )}
    </div>
  );
}
