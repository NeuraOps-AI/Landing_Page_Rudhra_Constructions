"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useSyncExternalStore } from "react";
import { trackAnalyticsEvent } from "@/lib/analytics";

type ProductionAnalyticsProps = {
  measurementId: string;
  allowedHosts: string[];
};

const placementFor = (element: Element) => {
  const explicitPlacement = (element as HTMLElement).dataset.analyticsPlacement;
  if (explicitPlacement) return explicitPlacement;
  if (element.closest("header, nav")) return "navigation";
  if (element.closest("footer")) return "footer";
  if (element.closest("aside")) return "floating_actions";
  if (element.closest("form")) return "form";
  return "content";
};

const linkLabel = (link: HTMLAnchorElement) =>
  link.dataset.analyticsLabel
  || link.getAttribute("aria-label")
  || link.textContent?.replace(/\s+/g, " ").trim().slice(0, 100)
  || undefined;

const subscribeToRuntime = () => () => undefined;

export function ProductionAnalytics({
  measurementId,
  allowedHosts,
}: ProductionAnalyticsProps) {
  const enabled = useSyncExternalStore(
    subscribeToRuntime,
    () => {
      const hostname = window.location.hostname.toLowerCase();
      return (
        process.env.NODE_ENV === "production"
        && /^G-[A-Z0-9]+$/i.test(measurementId)
        && allowedHosts.includes(hostname)
      );
    },
    () => false,
  );

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.dataset.analyticsEnabled = "true";

    const trackClick = (event: MouseEvent) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a");
      if (!(link instanceof HTMLAnchorElement)) return;

      const label = linkLabel(link);
      const placement = placementFor(link);
      const rawHref = link.getAttribute("href") ?? "";

      if (rawHref === "#enquire") {
        trackAnalyticsEvent("form_start", {
          form_name: "lead_popup",
          link_text: label,
          link_placement: placement,
        });
        return;
      }

      if (rawHref.startsWith("tel:")) {
        trackAnalyticsEvent("click_to_call", {
          link_text: label,
          link_placement: placement,
        });
        return;
      }

      if (rawHref.startsWith("mailto:")) {
        trackAnalyticsEvent("click_to_email", {
          link_text: label,
          link_placement: placement,
        });
        return;
      }

      let destination: URL;
      try {
        destination = new URL(link.href, window.location.href);
      } catch {
        return;
      }

      if (["wa.me", "api.whatsapp.com", "web.whatsapp.com"].includes(destination.hostname)) {
        trackAnalyticsEvent("whatsapp_click", {
          link_text: label,
          link_placement: placement,
        });
        return;
      }

      if (destination.hostname.includes("maps.google.")) {
        trackAnalyticsEvent("get_directions", {
          link_text: label,
          link_placement: placement,
        });
        return;
      }

      if (destination.hostname === "instagram.com" || destination.hostname.endsWith(".instagram.com")) {
        trackAnalyticsEvent("social_click", {
          social_network: "instagram",
          link_text: label,
          link_placement: placement,
        });
        return;
      }

      if (destination.origin === window.location.origin) {
        const projectMatch = destination.pathname.match(/^\/projects\/([^/]+)\/?$/);
        if (projectMatch) {
          trackAnalyticsEvent("select_content", {
            content_type: "project",
            item_id: decodeURIComponent(projectMatch[1]),
            link_text: label,
            link_placement: placement,
          });
        }
      }
    };

    document.addEventListener("click", trackClick, true);
    return () => {
      document.removeEventListener("click", trackClick, true);
      delete document.documentElement.dataset.analyticsEnabled;
    };
  }, [enabled]);

  return enabled ? <GoogleAnalytics gaId={measurementId} /> : null;
}
