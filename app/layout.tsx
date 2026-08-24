import type { Metadata, Viewport } from "next";
import { CrmProjectsProvider } from "@/components/site/CrmProjectsProvider";
import { FloatingContactActions } from "@/components/site/FloatingContactActions";
import { LeadCapturePopup } from "@/components/site/LeadCapturePopup";
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
      </body>
    </html>
  );
}
