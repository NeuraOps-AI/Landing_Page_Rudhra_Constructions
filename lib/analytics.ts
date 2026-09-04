"use client";

import { sendGAEvent } from "@next/third-parties/google";

export type AnalyticsParameters = Record<
  string,
  string | number | boolean | null | undefined
>;

const cleanParameters = (parameters: AnalyticsParameters) =>
  Object.fromEntries(
    Object.entries(parameters).filter(
      ([, value]) => value !== undefined && value !== null && value !== "",
    ),
  );

/**
 * Sends a GA4 event only after production analytics has been enabled for the
 * current hostname. Do not pass personal information in event parameters.
 */
export function trackAnalyticsEvent(
  eventName: string,
  parameters: AnalyticsParameters = {},
) {
  if (
    typeof window === "undefined"
    || document.documentElement.dataset.analyticsEnabled !== "true"
    || !window.dataLayer
  ) {
    return;
  }

  sendGAEvent("event", eventName, cleanParameters(parameters));
}

export function trackLead(formName: string, projectName?: string) {
  trackAnalyticsEvent("generate_lead", {
    form_name: formName,
    project_name: projectName,
  });
}
