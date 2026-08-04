"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Brand } from "./Brand";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About Us", href: "/about" },
  { label: "Why Rudhra", href: "/#why-rudhra" },
  { label: "Contact Us", href: "/contact" },
];

export function SiteNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18);
      setMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`site-navbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="site-navbar-inner">
        <nav className="site-navbar-grid" aria-label="Primary navigation">
          <Brand />
          <ul className="site-nav-links">
            {navItems.map((item) => {
              const active = item.href === "/" ? pathname === "/" : item.href.startsWith("/#") ? false : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} className={`site-nav-link focus-ring ${active ? "is-active" : ""}`}>{item.label}</Link>
                </li>
              );
            })}
          </ul>
          <div className="flex justify-end">
            <button type="button" className="focus-ring menu-orb" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-controls="site-mobile-menu" aria-label={menuOpen ? "Close menu" : "Open menu"}>
              <span className="relative block h-4 w-6" aria-hidden="true">
                <span className={`absolute left-0 top-0 h-px w-full bg-current transition-transform ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
                <span className={`absolute left-0 top-[7px] h-px w-full bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`absolute left-0 top-[14px] h-px w-full bg-current transition-transform ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </nav>

        <div id="site-mobile-menu" className={`site-mobile-menu ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
          {navItems.map((item) => <Link key={item.href} href={item.href} className="focus-ring" onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
        </div>
      </div>
    </header>
  );
}
