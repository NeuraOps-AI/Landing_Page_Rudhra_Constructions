"""Create web-sized WebP copies for every image referenced by data/projects.ts."""

from __future__ import annotations

import re
from pathlib import Path

from PIL import Image, ImageOps


ROOT = Path(__file__).resolve().parents[1]
DATA_FILE = ROOT / "data" / "projects.ts"
PUBLIC = ROOT / "public"
DESTINATION = PUBLIC / "images" / "project-web"
IMAGE_PATTERN = re.compile(r'"(/images/(?:Ongoing projects|Completed Projects|Upcomming projects)/[^"\n]+\.(?:jpg|jpeg|png|tif|tiff))"', re.IGNORECASE)


def optimize(source_url: str) -> tuple[Path, Path]:
    source = PUBLIC / source_url.removeprefix("/")
    relative = source.relative_to(PUBLIC / "images")
    destination = (DESTINATION / relative).with_suffix(".webp")
    destination.parent.mkdir(parents=True, exist_ok=True)

    if destination.exists() and destination.stat().st_size > 0 and destination.stat().st_mtime >= source.stat().st_mtime:
        return source, destination

    Image.MAX_IMAGE_PIXELS = None
    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)
        max_dimension = 3200 if re.search(r"floor|plan|layout|east|west", source.name, re.IGNORECASE) else 2560
        image.thumbnail((max_dimension, max_dimension), Image.Resampling.LANCZOS)
        if image.mode not in {"RGB", "RGBA"}:
            image = image.convert("RGBA" if "transparency" in image.info else "RGB")
        image.save(destination, "WEBP", quality=86, method=4)

    return source, destination


def main() -> None:
    source_text = DATA_FILE.read_text(encoding="utf-8")
    source_urls = sorted(set(IMAGE_PATTERN.findall(source_text)))
    for source_url in source_urls:
        source, destination = optimize(source_url)
        print(f"{source.relative_to(ROOT)} -> {destination.relative_to(ROOT)}")
    print(f"Optimized {len(source_urls)} project images.")


if __name__ == "__main__":
    main()
