import type { Metadata, Viewport } from "next";
import { CrmProjectsProvider } from "@/components/site/CrmProjectsProvider";
import { FloatingContactActions } from "@/components/site/FloatingContactActions";
import { LeadCapturePopup } from "@/components/site/LeadCapturePopup";
import { ProductionAnalytics } from "@/components/site/ProductionAnalytics";
import { SiteNavbar } from "@/components/site/SiteNavbar";
import { ScrollMotion } from "@/components/site/ScrollMotion";
import { StartupLoader } from "@/components/site/StartupLoader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.rudhraconstructions.com"),
  title: "Rudhra Constructions | Built on Trust",
  description:
    "Premium homes shaped by thoughtful design, enduring quality, and more than 23 years of trust.",
  icons: {
    icon: [{ url: "/images/logo/rudhra-r-mark.png", type: "image/png" }],
    shortcut: "/images/logo/rudhra-r-mark.png",
    apple: [{ url: "/images/logo/rudhra-r-mark.png", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c407a",
};

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() ?? "";
const analyticsAllowedHosts = (
  process.env.NEXT_PUBLIC_ANALYTICS_ALLOWED_HOSTS
  ?? "rudhraconstructions.com,www.rudhraconstructions.com"
)
  .split(",")
  .map((hostname) => hostname.trim().toLowerCase())
  .filter(Boolean);

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <CrmProjectsProvider>
          <StartupLoader />
          <SiteNavbar />
          <ScrollMotion />
          {children}
          <LeadCapturePopup />
          <FloatingContactActions />
        </CrmProjectsProvider>
        {process.env.NODE_ENV === "production" && gaMeasurementId ? (
          <ProductionAnalytics
            measurementId={gaMeasurementId}
            allowedHosts={analyticsAllowedHosts}
          />
        ) : null}
      </body>
    </html>
  );
}
