import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LineIcon } from "@/components/site/LineIcon";
import { ProjectEnquiryForm } from "@/components/site/ProjectEnquiryForm";
import { ProjectMediaGallery } from "@/components/site/ProjectMediaGallery";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getProjectBySlug, projects, webProjectImage } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found | Rudhra Constructions" };

  return {
    title: `${project.name} | Rudhra Constructions`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const mapUrl = `https://maps.google.com/?q=${encodeURIComponent(project.location)}`;

  return (
    <>
      <main className="page-section project-detail-page">
        <Link href="/projects#projects" className="project-top-back" aria-label="Back to projects">
          <span aria-hidden="true">←</span> Back to Projects
        </Link>
        <section className="project-detail-hero" aria-labelledby="project-title">
          <Image src={webProjectImage(project.image)} alt={project.alt} fill sizes="(min-width: 1440px) 1320px, 94vw" className="object-cover" priority />
          <div className="project-detail-hero-shade" />
          <div className="project-detail-hero-copy">
            <span>{project.status} Project</span>
            <h1 id="project-title">{project.name}</h1>
            <p><LineIcon name="location" />{project.location}</p>
          </div>
        </section>

        <section className="detail-intro-layout">
          <div className="detail-copy">
            <p className="detail-eyebrow">{project.status} Portfolio</p>
            <h2>{project.name}</h2>
            <p className="detail-kicker">{project.category}</p>
            <p className="detail-location"><LineIcon name="location" />{project.location}</p>
            <p className="detail-description">{project.description}</p>
            <div className={`detail-stats detail-stats-${project.facts.length}`}>
              {project.facts.map((fact) => (
                <article key={`${fact.label}-${fact.value}`}>
                  <LineIcon name={fact.icon} />
                  <div><strong>{fact.value}</strong><span>{fact.label}</span></div>
                </article>
              ))}
            </div>
            <div className="detail-quote"><LineIcon name="building" /><p>Explore the project through its supplied architectural imagery and planning details.</p></div>
          </div>
          <ProjectEnquiryForm projectName={project.name} />
        </section>

        <section id="gallery" className="detail-section" aria-labelledby="gallery-title">
          <div className="detail-section-title">
            <p>Project imagery</p>
            <h2 id="gallery-title">Gallery</h2>
            <span />
          </div>
          <ProjectMediaGallery images={project.gallery} label={`${project.name} gallery`} />
        </section>

        {project.floorPlans.length > 0 && (
          <section id="floor-plans" className="detail-section" aria-labelledby="floor-plan-title">
            <div className="detail-section-title">
              <p>Plans &amp; elevations</p>
              <h2 id="floor-plan-title">Floor Plans</h2>
              <span />
            </div>
            <ProjectMediaGallery images={project.floorPlans} label={`${project.name} floor plans`} contain />
          </section>
        )}

        <section className="detail-overview-grid" aria-label={`${project.name} project information`}>
          <article>
            <div className="detail-section-title"><h2>Project Overview</h2><span /></div>
            <dl>{project.overview.map(([term, value]) => <div key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl>
          </article>
          <article>
            <div className="detail-section-title"><h2>Key Highlights</h2><span /></div>
            <ul>{project.highlights.map((item) => <li key={item}><strong aria-hidden="true">✓</strong><span>{item}</span></li>)}</ul>
          </article>
          <article className="map-card">
            <div className="map-grid" aria-hidden="true" />
            <LineIcon name="location" />
            <strong>{project.location}</strong>
            {project.location !== "Location to be announced" && <a href={mapUrl} target="_blank" rel="noreferrer">Get Directions ↗</a>}
          </article>
        </section>

        <section className="detail-contact-strip" aria-label="Contact Rudhra Constructions">
          <a href="tel:+918309475836"><LineIcon name="phone" /><span>+91 83094 75836<small>Call Us</small></span></a>
          <a href="mailto:sales@rudhraconstructions.com"><LineIcon name="mail" /><span>sales@rudhraconstructions.com<small>Email Us</small></span></a>
          <a href="https://wa.me/918309475836"><strong>WA</strong><span>Chat on WhatsApp</span></a>
        </section>
      </main>
      <SiteFooter showBenefits={false} />
    </>
  );
}
