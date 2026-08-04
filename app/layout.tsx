import type { Metadata, Viewport } from "next";
import { SiteNavbar } from "@/components/site/SiteNavbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rudhra Constructions | Built on Trust",
  description:
    "Premium homes shaped by thoughtful design, enduring quality, and more than 25 years of trust.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c407a",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <SiteNavbar />
        {children}
      </body>
    </html>
  );
}
