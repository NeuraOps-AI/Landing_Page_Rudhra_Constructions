"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { projectGalleryImages } from "@/data/projectGallery";
import { FullscreenGallery } from "@/components/gallery/FullscreenGallery";

function CarouselArrow({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d={direction === "previous" ? "m15 5-7 7 7 7" : "m9 5 7 7-7 7"} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LifestyleCarousel() {
  const [activeIndex, setActiveIndex] = useState(Math.min(3, projectGalleryImages.length - 1));
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const swipeStart = useRef<number | null>(null);
  const count = projectGalleryImages.length;

  const selectImage = useCallback((index: number) => {
    setActiveIndex(((index % count) + count) % count);
  }, [count]);

  const previous = useCallback(() => selectImage(activeIndex - 1), [activeIndex, selectImage]);
  const next = useCallback(() => selectImage(activeIndex + 1), [activeIndex, selectImage]);

  useEffect(() => {
    if (!fullscreenOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullscreenOpen(false);
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullscreenOpen, next, previous]);

  const thumbnailOrder = useMemo(
    () => Array.from({ length: count }, (_, offset) => (activeIndex - 3 + offset + count) % count),
    [activeIndex, count],
  );

  if (count === 0) return null;
  const activeImage = projectGalleryImages[activeIndex];

  return (
    <section className="lifestyle-carousel-section" aria-labelledby="lifestyle-carousel-title">
      <div className="lifestyle-carousel-heading">
        <div>
          <p>Life, in perfect balance</p>
          <h2 id="lifestyle-carousel-title">A closer look at life with Rudhra.</h2>
        </div>
        <div className="lifestyle-heading-controls" aria-label="Carousel controls">
          <button type="button" onClick={previous} aria-label="Previous project image"><CarouselArrow direction="previous" /></button>
          <button type="button" onClick={next} aria-label="Next project image"><CarouselArrow direction="next" /></button>
        </div>
      </div>

      <div
        className="lifestyle-carousel-card"
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") { event.preventDefault(); previous(); }
          if (event.key === "ArrowRight") { event.preventDefault(); next(); }
        }}
      >
        <button
          type="button"
          className="lifestyle-carousel-main"
          onClick={() => setFullscreenOpen(true)}
          onPointerDown={(event) => { swipeStart.current = event.clientX; }}
          onPointerUp={(event) => {
            if (swipeStart.current === null) return;
            const distance = event.clientX - swipeStart.current;
            swipeStart.current = null;
            if (Math.abs(distance) < 48) return;
            if (distance > 0) previous();
            else next();
          }}
          onPointerCancel={() => { swipeStart.current = null; }}
          aria-label={`Open ${activeImage.title} image in fullscreen`}
        >
          <Image
            key={activeImage.id}
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            sizes="(min-width: 1280px) 1180px, 92vw"
            className="lifestyle-main-image"
          />
          <span className="lifestyle-image-counter" aria-label={`Image ${activeIndex + 1} of ${count}`}>
            {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
        </button>

        <div className="lifestyle-carousel-footer">
          <div className="lifestyle-project-copy" aria-live="polite">
            <p>{activeImage.kicker}</p>
            <h3>{activeImage.title}</h3>
            <span>{activeImage.description}</span>
          </div>

          <div className="lifestyle-thumbnail-area">
            <button type="button" className="lifestyle-rail-arrow" onClick={previous} aria-label="Previous project image">
              <CarouselArrow direction="previous" />
            </button>
            <div className="lifestyle-thumbnail-deck" role="list" aria-label="Project images">
              {thumbnailOrder.map((imageIndex) => {
                const image = projectGalleryImages[imageIndex];
                const isActive = imageIndex === activeIndex;
                return (
                  <button
                    key={image.id}
                    type="button"
                    role="listitem"
                    className={`lifestyle-thumbnail ${isActive ? "is-active" : ""}`}
                    onClick={() => isActive ? setFullscreenOpen(true) : selectImage(imageIndex)}
                    aria-current={isActive ? "true" : undefined}
                    aria-label={isActive ? `Open ${image.title} in fullscreen` : `Show ${image.title}`}
                  >
                    <Image src={image.src} alt="" fill sizes="150px" className="object-cover" />
                  </button>
                );
              })}
            </div>
            <button type="button" className="lifestyle-rail-arrow" onClick={next} aria-label="Next project image">
              <CarouselArrow direction="next" />
            </button>
          </div>
        </div>
      </div>

      <FullscreenGallery
        open={fullscreenOpen}
        image={activeImage}
        activeIndex={activeIndex}
        count={count}
        onClose={() => setFullscreenOpen(false)}
        onPrevious={previous}
        onNext={next}
        onSelect={selectImage}
      />
    </section>
  );
}
