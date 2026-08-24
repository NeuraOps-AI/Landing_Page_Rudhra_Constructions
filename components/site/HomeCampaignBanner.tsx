"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { completeHomeCampaign, isHomeCampaignPending, openHomeCampaign } from "@/lib/home-campaign";
import { hasStartupCompleted, STARTUP_COMPLETE_EVENT } from "@/lib/startup";

const DISPLAY_TIME = 8_000;

export function HomeCampaignBanner() {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(8);

  const openBanner = useCallback((notifyVideo = false) => {
    setSecondsRemaining(8);
    setVisible(true);
    if (notifyVideo) openHomeCampaign();
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    completeHomeCampaign();
  }, []);

  useEffect(() => {
    const showBanner = () => {
      setReady(true);
      if (isHomeCampaignPending()) openBanner();
    };

    if (hasStartupCompleted()) showBanner();
    else window.addEventListener(STARTUP_COMPLETE_EVENT, showBanner, { once: true });

    return () => window.removeEventListener(STARTUP_COMPLETE_EVENT, showBanner);
  }, [openBanner]);

  useEffect(() => {
    if (!visible) return;

    const startedAt = Date.now();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const updateTimer = () => {
      const remaining = Math.max(0, DISPLAY_TIME - (Date.now() - startedAt));
      setSecondsRemaining(Math.ceil(remaining / 1000));
      if (remaining === 0) dismiss();
    };

    const interval = window.setInterval(updateTimer, 200);
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [dismiss, visible]);

  return (
    <>
      {ready && !visible ? (
        <button type="button" className="home-campaign-trigger" onClick={() => openBanner(true)} aria-label="Open CREDAI Hyderabad Property Show announcement">
          <img src="/images/project-web/Ongoing projects/Credai_show/credai-floating-mark.webp" alt="" />
        </button>
      ) : null}

      {visible ? (
        <div className="home-campaign-overlay" role="dialog" aria-modal="true" aria-label="CREDAI Hyderabad Property Show announcement">
          <div className="home-campaign-dialog" style={{ "--campaign-duration": `${DISPLAY_TIME}ms` } as CSSProperties}>
            <picture>
              <source media="(max-width: 620px)" srcSet="/images/project-web/Ongoing%20projects/Credai_show/credai-property-show-mobile.webp" />
              <img
                src="/images/project-web/Ongoing projects/Credai_show/credai-property-show-desktop.webp"
                alt="Rudhra Constructions at CREDAI Hyderabad Property Show 2026, August 28 to 30 at HITEX Exhibition Centre, Hitec City, Hyderabad"
              />
            </picture>
            <span className="home-campaign-timer" aria-live="polite">Closing in {secondsRemaining}s</span>
            <button type="button" className="home-campaign-close" onClick={dismiss} aria-label="Close announcement">&times;</button>
            <span className="home-campaign-progress" aria-hidden="true" />
          </div>
        </div>
      ) : null}
    </>
  );
}
