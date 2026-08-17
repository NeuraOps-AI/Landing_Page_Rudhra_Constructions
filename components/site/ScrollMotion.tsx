"use client";

import { useEffect } from "react";
import { hasStartupCompleted, STARTUP_COMPLETE_EVENT } from "@/lib/startup";

type RevealDirection = "up" | "left" | "right" | "scale";

type RevealGroup = {
  selector: string;
  direction?: RevealDirection;
  stagger?: number;
};

const revealGroups: RevealGroup[] = [
  { selector: ".full-video-content > p, .full-video-content > h1, .full-video-content > span, .full-video-content > .primary-button", direction: "left", stagger: 90 },
  { selector: ".home-metrics-title, .home-metrics dl > div, .home-cta", stagger: 70 },
  { selector: ".section-heading > *", stagger: 65 },
  { selector: ".featured-card, .project-card", direction: "scale", stagger: 75 },
  { selector: ".lifestyle-carousel-heading > *, .lifestyle-carousel-card", stagger: 80 },
  { selector: ".news-video-heading > *, .news-video-card", stagger: 85 },
  { selector: ".project-tabs > *, .contact-detail-list > *, .benefit-item", stagger: 65 },
  { selector: ".contact-form-card, .project-enquiry-card, .about-image", direction: "right" },
  { selector: ".contact-lead, .about-intro > div:first-child > p, .about-value-row > *, .purpose-panel > *", stagger: 70 },
  { selector: ".project-detail-hero", direction: "scale" },
  { selector: ".project-detail-hero-copy > *, .detail-copy > *, .detail-stats > *", direction: "left", stagger: 65 },
  { selector: ".detail-section-title, .project-media-viewer, .detail-overview-grid > *, .detail-contact-strip > *", stagger: 70 },
  { selector: ".footer-brand-column > *, .footer-link-column, .site-footer-bottom > *", stagger: 65 },
];

export function ScrollMotion() {
  useEffect(() => {
    let started = false;
    let frame = 0;
    let observer: IntersectionObserver | undefined;
    let mutationObserver: MutationObserver | undefined;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = (element: HTMLElement) => {
      element.dataset.scrollVisible = "true";
    };

    const registerTargets = () => {
      revealGroups.forEach(({ selector, direction = "up", stagger = 0 }) => {
        document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
          if (element.dataset.scrollReveal) return;

          element.dataset.scrollReveal = direction;
          element.style.setProperty("--scroll-reveal-delay", `${Math.min(index % 5, 4) * stagger}ms`);

          if (reduceMotion) reveal(element);
          else observer?.observe(element);
        });
      });
    };

    const queueRegistration = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(registerTargets);
    };

    const start = () => {
      if (started) return;
      started = true;

      if (!reduceMotion) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return;
              const element = entry.target as HTMLElement;
              reveal(element);
              observer?.unobserve(element);
            });
          },
          { threshold: 0.12, rootMargin: "0px 0px -7%" },
        );
      }

      registerTargets();
      mutationObserver = new MutationObserver(queueRegistration);
      mutationObserver.observe(document.body, { childList: true, subtree: true });
      document.documentElement.dataset.scrollMotionReady = "true";
    };

    if (hasStartupCompleted()) start();
    else window.addEventListener(STARTUP_COMPLETE_EVENT, start, { once: true });

    return () => {
      window.removeEventListener(STARTUP_COMPLETE_EVENT, start);
      window.cancelAnimationFrame(frame);
      observer?.disconnect();
      mutationObserver?.disconnect();
    };
  }, []);

  return null;
}
