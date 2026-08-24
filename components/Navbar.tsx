"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About Us", href: "/about" },
  { label: "News & Blog", href: "/news-blog" },
  { label: "Jobs", href: "/jobs" },
  { label: "Contact Us", href: "/contact" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [atPageTop, setAtPageTop] = useState(true);
  const [galleryInView, setGalleryInView] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      window.requestAnimationFrame(() => {
        const currentScrollY = Math.max(window.scrollY, 0);
        setAtPageTop(currentScrollY <= 16);
        setMenuOpen(false);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const gallery = document.getElementById("projects");
    if (!gallery) return;

    const observer = new IntersectionObserver(([entry]) => setGalleryInView(entry.isIntersecting), {
      rootMargin: "-8% 0px -82% 0px",
      threshold: 0,
    });
    observer.observe(gallery);
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] border-b transition-[background,backdrop-filter,box-shadow,border-color] duration-300 ease-out ${
        atPageTop
          ? "border-transparent bg-transparent shadow-none backdrop-blur-none"
          : "border-white/10 bg-[linear-gradient(180deg,rgba(20,67,120,0.84)_0%,rgba(31,87,145,0.66)_72%,rgba(38,101,160,0.48)_100%)] shadow-[0_8px_28px_rgba(7,42,80,0.1)] backdrop-blur-[5px]"
      }`}
    >
      <div className="relative mx-auto w-[94vw] max-w-[1450px] py-3 sm:py-4">
        <nav className="grid h-[68px] grid-cols-[1fr_auto] items-center lg:grid-cols-[1fr_2fr_1fr]" aria-label="Primary navigation">
        <a href="#home" className="focus-ring block w-fit rounded-sm" aria-label="Rudhra Constructions home">
          <Image
            src="/images/logo/logo-rcpl-navbar-transparent.png"
            alt="Rudhra Constructions"
            width={623}
            height={250}
            priority
            className="h-14 w-auto object-contain sm:h-[58px]"
          />
        </a>

        <ul className="hidden items-center justify-center gap-8 xl:gap-11 lg:flex">
          {navigation.map((item, index) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`nav-link focus-ring relative block rounded-sm py-3 text-[12px] font-medium uppercase tracking-[0.08em] text-white/95 ${
                  (galleryInView && item.href === "#projects") || (!galleryInView && index === 0) ? "is-active" : ""
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex justify-end">
          <button
            type="button"
            className="focus-ring menu-button group grid size-[52px] place-items-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/10 sm:size-[56px]"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="relative block h-[16px] w-[22px]">
              <span className={`absolute left-0 top-0 h-px w-full bg-current transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`absolute left-0 top-[7px] h-px w-full bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 top-[14px] h-px w-full bg-current transition-transform ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
        </nav>

        <div
          id="mobile-navigation"
          aria-hidden={!menuOpen}
          className={`mobile-nav-panel absolute right-0 top-[84px] w-full max-w-[340px] overflow-hidden rounded-2xl border border-white/20 bg-[#0b3768]/95 shadow-2xl backdrop-blur-md transition-[opacity,transform,visibility] duration-300 sm:top-[92px] lg:hidden ${
            menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
          }`}
        >
          <ul className="p-3">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="focus-ring block rounded-xl px-5 py-3.5 text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-white/10"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
