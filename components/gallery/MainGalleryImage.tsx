"use client";

import Image from "next/image";
import { useRef } from "react";
import type { ProjectGalleryImage } from "@/data/projectGallery";

type MainGalleryImageProps = {
  image: ProjectGalleryImage;
  activeIndex: number;
  count: number;
  onPrevious: () => void;
  onNext: () => void;
  onOpenFullscreen: () => void;
};

export function MainGalleryImage({ image, activeIndex, count, onPrevious, onNext, onOpenFullscreen }: MainGalleryImageProps) {
  const pointerStartX = useRef<number | null>(null);
  const swipedRef = useRef(false);

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    pointerStartX.current = event.clientX;
    swipedRef.current = false;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    if (pointerStartX.current === null) return;
    const distance = event.clientX - pointerStartX.current;
    pointerStartX.current = null;
    if (Math.abs(distance) < 44) return;
    swipedRef.current = true;
    if (distance > 0) onPrevious();
    else onNext();
  };

  return (
    <figure
      className="gallery-main-frame relative m-0 aspect-video w-full touch-pan-y overflow-hidden bg-[#071523] lg:min-h-0 lg:flex-1 lg:aspect-auto"
      role="group"
      aria-label={`Gallery image ${activeIndex + 1} of ${count}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        pointerStartX.current = null;
      }}
    >
      <button
        type="button"
        className="gallery-focus absolute inset-0 cursor-zoom-in"
        onClick={() => {
          if (swipedRef.current) {
            swipedRef.current = false;
            return;
          }
          onOpenFullscreen();
        }}
        aria-label={`Open image ${activeIndex + 1} of ${count} in fullscreen`}
      >
        <Image
          key={image.id}
          src={image.src}
          alt={image.alt}
          fill
          priority={activeIndex === 0}
          sizes="(min-width: 1024px) 95vw, 94vw"
          className="gallery-image-enter object-cover"
        />
      </button>

      <div className="pointer-events-none absolute left-4 top-4 z-10 rounded-full border border-[#143a66]/10 bg-[#d6e0ef]/80 px-4 py-2 text-[12px] font-medium tracking-[0.12em] text-[#173b64] shadow-sm backdrop-blur-[2px] sm:left-7 sm:top-7 sm:px-5 sm:py-2.5 sm:text-[13px]">
        {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
      </div>
    </figure>
  );
}
