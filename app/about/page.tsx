import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/site/SiteFooter";
import { LineIcon } from "@/components/site/LineIcon";

export const metadata: Metadata = { title: "About Us | Rudhra Constructions", description: "Learn about Rudhra Constructions, our purpose, values and commitment to quality." };

const values = [
  ["shield", "Built on Trust", "Honesty, transparency, and reliability form the foundation of everything we do."],
  ["building", "Quality That Endures", "We use the finest materials and follow rigorous standards to deliver lasting excellence."],
  ["bulb", "Design That Inspires", "Thoughtful architecture that blends innovation, functionality, and timeless aesthetics."],
  ["people", "Client-Centric Approach", "Our clients are at the heart of our process. We listen, collaborate, and deliver beyond expectations."],
];

export default function AboutPage() {
  return (
    <>
      <main className="page-section about-page">
        <section className="about-intro">
          <div>
            <div className="section-heading"><p>About Us</p><h1>Building More Than<br />Structures. Building Trust.</h1><span /></div>
            <p>At Rudhra Constructions, we believe architecture is more than design and construction — it’s about creating spaces that inspire, elevate, and stand the test of time.</p>
            <p>With a commitment to quality, innovation, and integrity, we transform ideas into meaningful environments that enhance the way people live, work, and connect.</p>
          </div>
          <div className="about-image"><Image src="/images/rudhra-villa-poster.png" alt="Contemporary Rudhra villa surrounded by tropical landscaping" fill priority sizes="(min-width: 900px) 55vw, 94vw" className="object-cover" /></div>
        </section>

        <section className="about-value-row" aria-label="Rudhra principles">
          {values.map(([icon, title, description]) => <article key={title}><span><LineIcon name={icon} /></span><div><h2>{title}</h2><p>{description}</p></div></article>)}
        </section>

        <section className="purpose-panel">
          <article><LineIcon name="eye" /><div><h2>Our Vision</h2><p>To be a leading name in architecture and real estate, known for creating innovative, sustainable, and impactful spaces that leave a lasting legacy.</p></div></article>
          <article><LineIcon name="bulb" /><div><h2>Our Mission</h2><p>To design and build spaces that enrich lives through quality craftsmanship, sustainable practices, and a commitment to excellence.</p></div></article>
          <article><LineIcon name="diamond" /><div><h2>Our Values</h2><p>Integrity, Quality, Innovation, Sustainability and Customer Delight drive every decision and every project we undertake.</p></div></article>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
