import type { Metadata } from "next";
import { NewsVideoSection } from "@/components/site/NewsVideoSection";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "News & Blog | Rudhra Constructions",
  description: "Watch the latest stories, updates and featured videos from Rudhra Constructions.",
};

export default function NewsBlogPage() {
  return (
    <>
      <main className="news-blog-page">
        <NewsVideoSection />
      </main>
      <SiteFooter />
    </>
  );
}
