type GalleryNavigationProps = {
  direction: "previous" | "next";
  onClick: () => void;
  variant?: "image" | "rail" | "fullscreen";
};

function Chevron({ direction }: { direction: "previous" | "next" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`size-5 sm:size-6 ${direction === "next" ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path d="m15 5-7 7 7 7" />
    </svg>
  );
}

export function GalleryNavigation({ direction, onClick, variant = "image" }: GalleryNavigationProps) {
  const variantClass =
    variant === "rail"
      ? "size-11 border border-[#6da2df]/70 bg-[#eef6ff] text-[#246bc1] shadow-[0_6px_16px_rgba(34,91,156,0.2)] hover:bg-white sm:size-12"
      : variant === "fullscreen"
        ? "size-11 border border-white/20 bg-black/45 text-white hover:bg-black/65 sm:size-14"
        : "size-11 border border-white/10 bg-[#071523]/55 text-white shadow-[0_5px_18px_rgba(0,0,0,0.22)] hover:bg-[#071523]/75 sm:size-[52px]";

  return (
    <button
      type="button"
      className={`gallery-focus grid shrink-0 place-items-center rounded-full transition-[background-color,transform,box-shadow] duration-200 hover:scale-[1.04] ${variantClass}`}
      onClick={onClick}
      aria-label={`${direction === "previous" ? "Previous" : "Next"} gallery image`}
    >
      <Chevron direction={direction} />
    </button>
  );
}
