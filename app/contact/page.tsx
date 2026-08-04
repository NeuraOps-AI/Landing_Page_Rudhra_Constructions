import type { Metadata } from "next";
import { ContactScreen } from "@/components/site/ContactScreen";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Contact Us | Rudhra Constructions",
  description: "Contact Rudhra Constructions about villas, apartments, commercial spaces and construction services.",
};

export default function ContactPage() {
  return (
    <>
      <main className="page-section contact-page">
        <ContactScreen />
      </main>
      <SiteFooter />
    </>
  );
}
