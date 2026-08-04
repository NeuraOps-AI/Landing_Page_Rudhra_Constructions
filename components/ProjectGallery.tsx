"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { projectGalleryImages } from "@/data/projectGallery";
import { FullscreenGallery } from "./gallery/FullscreenGallery";
import { MainGalleryImage } from "./gallery/MainGalleryImage";
import { ThumbnailCarousel } from "./gallery/ThumbnailCarousel";

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  return target.matches("input, textarea, select, [contenteditable='true']") || Boolean(target.closest("input, textarea, select, [contenteditable='true']"));
};

export function ProjectGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const fullscreenOpenRef = useRef(false);
  const galleryInViewRef = useRef(false);
  const imageCount = projectGalleryImages.length;

  const selectImage = useCallback(
    (index: number) => {
      if (imageCount === 0) return;
      setActiveIndex(((index % imageCount) + imageCount) % imageCount);
    },
    [imageCount],
  );

  const showPrevious = useCallback(() => selectImage(activeIndex - 1), [activeIndex, selectImage]);
  const showNext = useCallback(() => selectImage(activeIndex + 1), [activeIndex, selectImage]);

  const openFullscreen = useCallback(() => {
    fullscreenOpenRef.current = true;
    setFullscreenOpen(true);
  }, []);

  const closeFullscreen = useCallback(() => {
    fullscreenOpenRef.current = false;
    setFullscreenOpen(false);
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => undefined);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      galleryInViewRef.current = entry.isIntersecting;
    }, { threshold: 0.08 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && fullscreenOpenRef.current) {
        fullscreenOpenRef.current = false;
        setFullscreenOpen(false);
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditableTarget(event.target)) return;
      if (!fullscreenOpenRef.current && !galleryInViewRef.current) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
      } else if (event.key === "Escape" && fullscreenOpenRef.current) {
        event.preventDefault();
        closeFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeFullscreen, showNext, showPrevious]);

  if (imageCount === 0) return null;
  const activeImage = projectGalleryImages[activeIndex];

  return (
    <section ref={sectionRef} id="projects" className="project-gallery-section relative overflow-hidden" aria-labelledby="project-gallery-heading">
      <h2 id="project-gallery-heading" className="sr-only">
        Rudhra project gallery
      </h2>
      <div className="gallery-stage relative z-10 mx-auto w-[94vw] max-w-[1480px] pb-5 pt-[112px] sm:pb-6 sm:pt-[120px] lg:flex lg:h-svh lg:w-[95vw] lg:max-w-none lg:flex-col lg:py-4">
        <div className="gallery-card flex min-h-0 w-full flex-col overflow-hidden rounded-[20px] bg-[#f7fbff] sm:rounded-[26px] lg:flex-1">
          <MainGalleryImage
            image={activeImage}
            activeIndex={activeIndex}
            count={imageCount}
            onPrevious={showPrevious}
            onNext={showNext}
            onOpenFullscreen={openFullscreen}
          />
          <ThumbnailCarousel
            images={projectGalleryImages}
            activeImage={activeImage}
            activeIndex={activeIndex}
            onSelect={selectImage}
            onPrevious={showPrevious}
            onNext={showNext}
            onOpenFullscreen={openFullscreen}
          />
        </div>
      </div>

      <FullscreenGallery
        open={fullscreenOpen}
        image={activeImage}
        activeIndex={activeIndex}
        count={imageCount}
        onClose={closeFullscreen}
        onPrevious={showPrevious}
        onNext={showNext}
        onSelect={selectImage}
      />
    </section>
  );
}
