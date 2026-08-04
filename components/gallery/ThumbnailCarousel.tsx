"use client";

import Image from "next/image";
import type { ProjectGalleryImage } from "@/data/projectGallery";

type ThumbnailCarouselProps = {
  images: ProjectGalleryImage[];
  activeImage: ProjectGalleryImage;
  activeIndex: number;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  onOpenFullscreen: () => void;
};

function ArrowIcon({ next = false }: { next?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={`size-5 ${next ? "rotate-180" : ""}`} aria-hidden="true">
      <path d="m15 5-7 7 7 7" />
    </svg>
  );
}

export function ThumbnailCarousel({ images, activeImage, activeIndex, onSelect, onPrevious, onNext, onOpenFullscreen }: ThumbnailCarouselProps) {
  if (images.length === 0) return null;

  return (
    <div className="gallery-information-panel grid shrink-0 bg-[#f8fbfe] lg:h-[190px] lg:grid-cols-[38%_62%] 2xl:h-[205px]">
      <article className="border-b border-[#143a66]/10 px-5 py-5 text-[#153b65] sm:px-8 sm:py-6 lg:flex lg:flex-col lg:justify-center lg:border-b-0 lg:border-r lg:px-9 lg:py-5 2xl:px-11">
        <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-[#2e6e9d] sm:text-[10px]">{activeImage.kicker}</p>
        <h3 className="mt-2 text-[22px] font-semibold leading-tight tracking-[-0.025em] sm:text-[25px] 2xl:text-[28px]">{activeImage.title}</h3>
        <p className="mt-1.5 text-[12px] font-semibold text-[#397296] sm:text-[13px]">{activeImage.location}</p>
        <p className="mt-3 max-w-[470px] text-[12px] leading-5 text-[#315f7d] sm:text-[13px] 2xl:text-[14px] 2xl:leading-6">{activeImage.description}</p>
      </article>

      <div className="relative flex min-h-[176px] items-center px-14 py-4 sm:px-[72px] lg:min-h-0 lg:px-[78px] lg:py-3 2xl:px-[90px]" aria-label="Gallery thumbnails">
        {images.length > 1 && (
          <>
            <button type="button" className="gallery-focus absolute left-3 top-1/2 z-30 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-[#7ca7d1]/25 bg-[#f7fbff] text-[#173b64] shadow-[0_7px_22px_rgba(25,70,111,0.11)] transition-colors hover:bg-white sm:left-5 sm:size-12 lg:left-4 2xl:left-6" onClick={onPrevious} aria-label="Previous gallery image">
              <ArrowIcon />
            </button>
            <button type="button" className="gallery-focus absolute right-3 top-1/2 z-30 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-[#7ca7d1]/25 bg-[#f7fbff] text-[#173b64] shadow-[0_7px_22px_rgba(25,70,111,0.11)] transition-colors hover:bg-white sm:right-5 sm:size-12 lg:right-4 2xl:right-6" onClick={onNext} aria-label="Next gallery image">
              <ArrowIcon next />
            </button>
          </>
        )}

        <ul className="mx-auto grid w-full max-w-[620px] list-none grid-cols-3 gap-2 sm:gap-3 lg:flex lg:max-w-none lg:items-center lg:justify-center lg:gap-0">
          {images.map((image, index) => {
            const active = index === activeIndex;
            return (
              <li key={image.id} className={`relative min-w-0 transition-transform duration-200 lg:shrink-0 ${active ? "z-20 lg:w-[168px] xl:w-[180px] 2xl:w-[194px]" : "z-10 lg:-mx-2 lg:w-[106px] xl:w-[118px] 2xl:w-[128px]"}`}>
                <button
                  type="button"
                  className={`gallery-focus relative block aspect-video w-full overflow-hidden bg-[#9db9d7] transition-[border-color,box-shadow,filter,opacity] duration-200 ${
                    active
                      ? "rounded-[12px] border-[3px] border-[#d8e9fb] opacity-100 shadow-[0_10px_26px_rgba(25,67,108,0.28),0_0_0_1px_#2d72b7] lg:h-[126px] lg:aspect-auto 2xl:h-[140px]"
                      : "rounded-[9px] border border-white/40 opacity-90 hover:opacity-100 lg:h-[82px] lg:aspect-auto 2xl:h-[92px]"
                  }`}
                  onClick={() => {
                    onSelect(index);
                    onOpenFullscreen();
                  }}
                  aria-label={`Open image ${index + 1} in fullscreen: ${image.alt}`}
                  aria-current={active ? "true" : undefined}
                >
                  <Image src={image.src} alt="" fill sizes="(min-width: 1024px) 194px, 30vw" className="object-cover" aria-hidden="true" />
                  <span className="sr-only">{active ? "Current image; open fullscreen" : "Open fullscreen"}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
