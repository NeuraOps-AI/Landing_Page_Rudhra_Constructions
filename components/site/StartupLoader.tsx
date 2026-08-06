"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { markStartupComplete } from "@/lib/startup";

export function StartupLoader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const minimumDisplay = reduceMotion ? 350 : 1800;
    const exitDuration = reduceMotion ? 120 : 650;
    const startedAt = performance.now();
    let exitTimer: number | undefined;
    let removeTimer: number | undefined;
    let dismissalScheduled = false;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dismiss = () => {
      if (dismissalScheduled) return;
      dismissalScheduled = true;
      const elapsed = performance.now() - startedAt;
      exitTimer = window.setTimeout(() => {
        setExiting(true);
        removeTimer = window.setTimeout(() => {
          setVisible(false);
          markStartupComplete();
        }, exitDuration);
      }, Math.max(0, minimumDisplay - elapsed));
    };

    if (document.readyState === "complete") dismiss();
    else window.addEventListener("load", dismiss, { once: true });

    const fallbackTimer = window.setTimeout(dismiss, 4000);

    return () => {
      window.removeEventListener("load", dismiss);
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
      window.clearTimeout(fallbackTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`startup-loader ${exiting ? "is-exiting" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Rudhra Constructions is loading"
    >
      <div className="startup-loader-glow" aria-hidden="true" />
      <div className="startup-loader-content">
        <div className="startup-loader-emblem">
          <span className="startup-loader-orbit" aria-hidden="true" />
          <span className="startup-loader-corners" aria-hidden="true" />
          <Image
            src="/images/logo/rudhra-r-mark.png"
            alt="Rudhra Constructions R mark"
            width={620}
            height={820}
            priority
            className="startup-loader-mark"
          />
        </div>
        <div className="startup-loader-wordmark">
          <strong>Rudhra</strong>
          <span>Constructions</span>
        </div>
        <div className="startup-loader-progress" aria-hidden="true"><span /></div>
        <p>Building enduring spaces</p>
      </div>
    </div>
  );
}
