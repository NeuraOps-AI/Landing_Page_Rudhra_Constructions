import type { Metadata } from "next";
import Link from "next/link";
import { AmbientVideo } from "@/components/site/AmbientVideo";
import { ProjectEnquiryForm } from "@/components/site/ProjectEnquiryForm";
import { ProjectGalleryStrip } from "@/components/site/ProjectGalleryStrip";
import { SiteFooter } from "@/components/site/SiteFooter";
import { LineIcon } from "@/components/site/LineIcon";
import { amenities } from "@/data/site";

export const metadata: Metadata = { title: "Rudhra Villas | Rudhra Constructions", description: "Premium villas in Kokapet, Hyderabad with spacious layouts and landscaped community amenities." };

const stats = [
  ["building", "25", "Luxury Villas"],
  ["home", "4 & 5 BHK", "Spacious Layouts"],
  ["leaf", "20,000 sft+", "Landscape Area"],
  ["clock", "2025", "Estimated Completion"],
];

const overview = [
  ["Project Type", "Premium Villas"], ["Total Villas", "25 Units"], ["Configurations", "4 & 5 BHK"],
  ["Plot Sizes", "400 – 600 Sq. Yds."], ["Built-up Area", "4500 – 7500 Sft."], ["RERA Number", "P02400012345"], ["Possession", "Q4 2025 (Tentative)"],
];

const highlights = [
  "Thoughtfully planned layouts with maximum natural light and ventilation",
  "Premium construction with high-quality materials and finishes",
  "Large private gardens and sit-out decks",
  "Low-density community for enhanced privacy",
  "Excellent connectivity to Financial District, Gachibowli, and ORR",
];

export default function RudhraVillasPage() {
  return (
    <>
      <main className="page-section project-detail-page">
        <section className="detail-video">
          <AmbientVideo src="/video/rudhra-showcase.mp4" poster="/images/rudhra-villa-poster.png" />
        </section>

        <section className="detail-intro-layout">
          <div className="detail-copy">
            <Link href="/projects" className="back-link">← &nbsp; Back to Projects</Link>
            <h1><span>Rudhra</span> Villas</h1>
            <p className="detail-kicker">Premium Villas</p>
            <p className="detail-location"><LineIcon name="location" />Kokapet, Hyderabad</p>
            <p className="detail-description">Rudhra Villas is an exclusive collection of premium villas designed for those who value space, elegance, and tranquility. Each villa is crafted with contemporary architecture, thoughtful layouts, and world-class amenities to elevate your lifestyle.</p>
            <div className="detail-stats">
              {stats.map(([icon, value, label]) => <article key={label}><LineIcon name={icon} /><div><strong>{value}</strong><span>{label}</span></div></article>)}
            </div>
            <div className="detail-quote"><LineIcon name="home" /><p>Spacious living. Timeless design.<br />A legacy for generations.</p></div>
          </div>
          <ProjectEnquiryForm />
        </section>

        <section id="gallery" className="detail-section">
          <div className="detail-section-title"><h2>Gallery</h2><span /></div>
          <ProjectGalleryStrip />
        </section>

        <section className="detail-section">
          <div className="detail-section-title"><h2>Amenities</h2><span /></div>
          <div className="amenities-grid">
            {amenities.map(([icon, label]) => <article key={label}><LineIcon name={icon} /><span>{label}</span></article>)}
          </div>
        </section>

        <section className="detail-overview-grid">
          <article>
            <div className="detail-section-title"><h2>Project Overview</h2><span /></div>
            <dl>{overview.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
          </article>
          <article>
            <div className="detail-section-title"><h2>Key Highlights</h2><span /></div>
            <ul>{highlights.map((item) => <li key={item}>✓ <span>{item}</span></li>)}</ul>
          </article>
          <article className="map-card">
            <div className="map-grid" aria-hidden="true" />
            <LineIcon name="location" />
            <strong>Kokapet, Hyderabad</strong>
            <a href="https://maps.google.com/?q=Kokapet,Hyderabad">Get Directions ↗</a>
          </article>
        </section>

        <section className="detail-contact-strip">
          <a href="tel:+919100012345"><LineIcon name="phone" /><span>+91 91000 12345<small>Call Us</small></span></a>
          <a href="mailto:info@rudhraconstructions.com"><LineIcon name="mail" /><span>info@rudhraconstructions.com<small>Email Us</small></span></a>
          <a href="https://wa.me/919100012345"><strong>WA</strong><span>Chat on WhatsApp</span></a>
        </section>
      </main>
      <SiteFooter showBenefits={false} />
    </>
  );
}
