import type { Metadata, Viewport } from "next";
import { FloatingContactActions } from "@/components/site/FloatingContactActions";
import { LeadCapturePopup } from "@/components/site/LeadCapturePopup";
import { SiteNavbar } from "@/components/site/SiteNavbar";
import { ScrollMotion } from "@/components/site/ScrollMotion";
import { StartupLoader } from "@/components/site/StartupLoader";
import { getProjectsByStatus } from "@/data/projects";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rudhra Constructions | Built on Trust",
  description:
    "Premium homes shaped by thoughtful design, enduring quality, and more than 25 years of trust.",
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
  const leadProjects = [
    ...getProjectsByStatus("Ongoing").map(({ name }) => ({ name, status: "Ongoing" as const })),
    ...getProjectsByStatus("Upcoming").map(({ name }) => ({ name, status: "Upcoming" as const })),
  ];

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <StartupLoader />
        <SiteNavbar />
        <ScrollMotion />
        {children}
        <LeadCapturePopup projects={leadProjects} />
        <FloatingContactActions />
      </body>
    </html>
  );
}
