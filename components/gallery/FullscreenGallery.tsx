"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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
  const pointerStartY = useRef<number | null>(null);
  const activePointers = useRef(new Set<number>());
  const multiTouchGesture = useRef(false);

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

  const overlay = (
    <div
      ref={dialogRef}
      className="gallery-fullscreen-overlay fixed inset-0 z-[400] flex items-center justify-center bg-[#020812]/98 px-3 py-16 sm:px-8 sm:py-20"
      role="dialog"
      aria-modal="true"
      aria-label="Fullscreen project gallery"
      onKeyDown={handleDialogKeyDown}
      onPointerDown={(event) => {
        activePointers.current.add(event.pointerId);
        if (activePointers.current.size > 1) {
          multiTouchGesture.current = true;
          pointerStartX.current = null;
          pointerStartY.current = null;
          return;
        }
        pointerStartX.current = event.clientX;
        pointerStartY.current = event.clientY;
      }}
      onPointerMove={() => {
        if (activePointers.current.size > 1) multiTouchGesture.current = true;
      }}
      onPointerUp={(event) => {
        activePointers.current.delete(event.pointerId);
        if (multiTouchGesture.current) {
          pointerStartX.current = null;
          pointerStartY.current = null;
          if (activePointers.current.size === 0) multiTouchGesture.current = false;
          return;
        }
        if (pointerStartX.current === null || pointerStartY.current === null) return;
        const distanceX = event.clientX - pointerStartX.current;
        const distanceY = event.clientY - pointerStartY.current;
        pointerStartX.current = null;
        pointerStartY.current = null;
        if (Math.abs(distanceX) < 54 || Math.abs(distanceX) <= Math.abs(distanceY) * 1.25) return;
        if (distanceX > 0) onPrevious();
        else onNext();
      }}
      onPointerCancel={(event) => {
        activePointers.current.delete(event.pointerId);
        pointerStartX.current = null;
        pointerStartY.current = null;
        if (activePointers.current.size === 0) multiTouchGesture.current = false;
      }}
    >
      <button
        ref={closeRef}
        type="button"
        className="gallery-fullscreen-close gallery-focus absolute z-50 grid size-11 place-items-center rounded-full border border-white/30 bg-[#071a31]/85 text-white shadow-[0_10px_26px_rgba(0,0,0,.35)] backdrop-blur-md transition-colors hover:bg-[#164f88] sm:size-12"
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
          className="gallery-image-enter object-contain"
        />
      </div>

      {count > 1 && (
        <div className="absolute inset-x-0 bottom-5 z-20 sm:bottom-8">
          <GalleryPagination count={count} activeIndex={activeIndex} onSelect={onSelect} inverse />
        </div>
      )}
    </div>
  );

  return createPortal(overlay, document.body);
}
