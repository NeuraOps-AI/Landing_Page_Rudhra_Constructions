"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { projectGallery } from "@/data/site";

export function ProjectGalleryStrip() {
  const [active, setActive] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (!fullscreen) return;
    const prior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullscreen(false);
      if (event.key === "ArrowLeft") setActive((value) => (value - 1 + projectGallery.length) % projectGallery.length);
      if (event.key === "ArrowRight") setActive((value) => (value + 1) % projectGallery.length);
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = prior;
      window.removeEventListener("keydown", key);
    };
  }, [fullscreen]);

  const previous = () => setActive((value) => (value - 1 + projectGallery.length) % projectGallery.length);
  const next = () => setActive((value) => (value + 1) % projectGallery.length);

  return (
    <>
      <div className="project-gallery-strip">
        <button className="gallery-side-arrow left" type="button" onClick={previous} aria-label="Previous gallery image">‹</button>
        <div className="project-gallery-grid">
          {projectGallery.slice(0, 5).map((image, index) => (
            <button key={image.src} type="button" className={`project-gallery-thumb ${active === index ? "is-active" : ""}`} onClick={() => { setActive(index); setFullscreen(true); }} aria-label={`Open ${image.alt} in fullscreen`}>
              <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 20vw, 45vw" className="object-cover" />
            </button>
          ))}
        </div>
        <button className="gallery-side-arrow right" type="button" onClick={next} aria-label="Next gallery image">›</button>
      </div>
      {fullscreen && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Project image fullscreen viewer">
          <Image src={projectGallery[active].src} alt={projectGallery[active].alt} fill sizes="100vw" className="object-contain" priority />
          <button type="button" className="lightbox-close" onClick={() => setFullscreen(false)} aria-label="Close fullscreen viewer">×</button>
          <button type="button" className="lightbox-arrow left" onClick={previous} aria-label="Previous image">‹</button>
          <button type="button" className="lightbox-arrow right" onClick={next} aria-label="Next image">›</button>
        </div>
      )}
    </>
  );
}
