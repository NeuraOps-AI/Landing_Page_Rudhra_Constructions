from __future__ import annotations

import argparse
from pathlib import Path

from PIL import Image, ImageOps


# Supplied architectural TIFF renders can exceed Pillow's default pixel guard.
# They are immediately downscaled to the web-safe dimensions below.
Image.MAX_IMAGE_PIXELS = None


IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp"}


def optimized_path(source: Path, source_root: Path, output_root: Path) -> Path:
    return (output_root / source.relative_to(source_root)).with_suffix(".webp")


def convert_image(source: Path, destination: Path) -> None:
    destination.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        image.thumbnail((2400, 2400), Image.Resampling.LANCZOS)
        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGBA" if "transparency" in image.info else "RGB")
        image.save(destination, "WEBP", quality=82, method=6)


def verify_image(path: Path) -> None:
    with Image.open(path) as image:
        image.verify()


def main() -> None:
    parser = argparse.ArgumentParser(description="Optimize completed-project images safely.")
    parser.add_argument("--delete-originals", action="store_true")
    args = parser.parse_args()

    public_images = Path(__file__).resolve().parents[1] / "public" / "images"
    source_root = (public_images / "Completed Projects").resolve()
    output_root = (public_images / "project-web" / "Completed Projects").resolve()
    if source_root.parent != public_images.resolve() or output_root.parent.parent != public_images.resolve():
        raise RuntimeError("Completed-project paths resolved outside public/images")

    sources = sorted(
        path for path in source_root.rglob("*")
        if path.is_file() and path.suffix.lower() in IMAGE_EXTENSIONS
    )
    created: list[Path] = []
    for source in sources:
        destination = optimized_path(source, source_root, output_root)
        if not destination.exists():
            convert_image(source, destination)
            created.append(destination)

    missing = [
        source for source in sources
        if not optimized_path(source, source_root, output_root).exists()
    ]
    if missing:
        raise RuntimeError(f"Missing optimized counterparts: {missing}")

    destinations = sorted({optimized_path(source, source_root, output_root) for source in sources})
    for destination in destinations:
        verify_image(destination)

    if args.delete_originals:
        for source in sources:
            source.unlink()
        for directory in sorted(source_root.rglob("*"), reverse=True):
            if directory.is_dir() and not any(directory.iterdir()):
                directory.rmdir()

    print(f"Source images checked: {len(sources)}")
    print(f"New WebP images created: {len(created)}")
    print(f"Optimized images verified: {len(destinations)}")
    print(f"Original images deleted: {len(sources) if args.delete_originals else 0}")


if __name__ == "__main__":
    main()
