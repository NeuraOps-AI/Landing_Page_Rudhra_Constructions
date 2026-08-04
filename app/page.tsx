import Image from "next/image";
import Link from "next/link";
import { AmbientVideo } from "@/components/site/AmbientVideo";
import { ContactScreen } from "@/components/site/ContactScreen";
import { SiteFooter } from "@/components/site/SiteFooter";
import { LineIcon } from "@/components/site/LineIcon";
import { LifestyleCarousel } from "@/components/site/LifestyleCarousel";
import { ProjectsExplorer } from "@/components/site/ProjectsExplorer";
import { siteProjects } from "@/data/site";

const metrics = [
  ["building", "25+", "Years of Excellence"],
  ["home", "150+", "Homes Delivered"],
  ["award", "12+", "Premium Projects"],
  ["people", "350+", "Happy Families"],
];

export default function HomePage() {
  return (
    <>
      <main>
        <section className="full-video-hero" aria-labelledby="home-title">
          <AmbientVideo src="/video/rudhra-showcase.mp4" poster="/images/rudhra-villa-poster.png" />
          <div className="full-video-scrim" aria-hidden="true" />
          <div className="full-video-content">
            <p>Rudhra Constructions</p>
            <h1 id="home-title">Building spaces that become lasting legacies.</h1>
            <span>Thoughtful architecture. Enduring quality. Homes created around the way you live.</span>
            <Link href="/projects" className="primary-button">Explore Our Projects <strong>↗</strong></Link>
          </div>
          <a href="#why-rudhra" className="video-scroll-cue" aria-label="Scroll to discover more"><span />Discover</a>
        </section>

        <section id="why-rudhra" className="home-trust-section">
          <div className="home-metrics">
            <div className="home-metrics-title"><span />Built on Trust. Driven by Purpose.<span /></div>
            <dl>
              {metrics.map(([icon, value, label]) => (
                <div key={label}><LineIcon name={icon} /><div><dt>{value}</dt><dd>{label}</dd></div></div>
              ))}
            </dl>
            <Link href="/projects" className="primary-button home-cta">Explore Rudhra <span>↗</span></Link>
          </div>
        </section>

        <section className="content-section featured-projects" aria-labelledby="featured-title">
          <div className="section-heading centered">
            <p>Featured Projects</p>
            <h2 id="featured-title">Spaces designed for the way you live.</h2>
            <span />
          </div>
          <div className="featured-grid">
            {siteProjects.slice(0, 3).map((project) => (
              <Link key={project.slug} href="/projects/rudhra-villas" className="featured-card">
                <Image src={project.image} alt={project.alt} fill sizes="(min-width: 900px) 33vw, 94vw" className="object-cover" />
                <div><small>{project.category}</small><h3>{project.name}</h3><p>{project.location}</p></div>
              </Link>
            ))}
          </div>
        </section>

        <LifestyleCarousel />

        <section className="home-projects-screen" aria-labelledby="home-projects-title">
          <div className="home-projects-inner">
            <div className="section-heading centered projects-heading">
              <p>Our Projects</p>
              <h2 id="home-projects-title">Spaces We&apos;re Building.<br />Legacies We&apos;re Creating.</h2>
              <span />
              <div>Explore our ongoing, completed, and upcoming projects<br className="hidden sm:block" /> crafted with purpose and precision.</div>
            </div>
            <ProjectsExplorer />
          </div>
        </section>

        <section className="home-contact-screen" aria-labelledby="home-contact-title">
          <ContactScreen headingLevel="h2" headingId="home-contact-title" />
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
