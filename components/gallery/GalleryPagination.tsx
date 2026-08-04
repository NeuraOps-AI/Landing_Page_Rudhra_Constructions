type GalleryPaginationProps = {
  count: number;
  activeIndex: number;
  onSelect: (index: number) => void;
  inverse?: boolean;
};

export function GalleryPagination({ count, activeIndex, onSelect, inverse = false }: GalleryPaginationProps) {
  return (
    <div className="flex items-center justify-center gap-2" role="group" aria-label="Choose gallery image">
      {Array.from({ length: count }, (_, index) => (
        <button
          key={index}
          type="button"
          className={`gallery-focus size-2.5 rounded-full border transition-[background-color,border-color,transform] duration-200 hover:scale-125 ${
            index === activeIndex
              ? "border-[#2b80e5] bg-[#2b80e5]"
              : inverse
                ? "border-white/65 bg-white/60 hover:bg-white"
                : "border-white/75 bg-white/70 hover:bg-white"
          }`}
          onClick={() => onSelect(index)}
          aria-label={`Show image ${index + 1}`}
          aria-current={index === activeIndex ? "true" : undefined}
        />
      ))}
    </div>
  );
}
