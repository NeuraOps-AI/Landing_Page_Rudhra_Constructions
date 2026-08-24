import type { Metadata } from "next";
import Link from "next/link";
import { LineIcon } from "@/components/site/LineIcon";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = {
  title: "Jobs | Rudhra Constructions",
  description: "Explore sales and engineering opportunities with Rudhra Constructions in Hyderabad.",
};

const openings = [
  {
    icon: "people",
    title: "Junior Sales Executive",
    department: "Sales",
    experience: "0–2 years",
    type: "Full time",
    description: "Support prospective homebuyers, coordinate project visits and build lasting customer relationships.",
  },
  {
    icon: "award",
    title: "Senior Sales Executive",
    department: "Sales",
    experience: "4+ years",
    type: "Full time",
    description: "Lead residential sales conversations, manage qualified enquiries and mentor the growing sales team.",
  },
  {
    icon: "building",
    title: "Site Engineer",
    department: "Engineering",
    experience: "2–5 years",
    type: "Full time",
    description: "Coordinate on-site execution, quality checks and project reporting across Rudhra developments.",
  },
] as const;

export default function JobsPage() {
  return (
    <>
      <main className="page-section jobs-page">
        <section className="jobs-hero" aria-labelledby="jobs-title">
          <div className="section-heading centered">
            <p>Build With Rudhra</p>
            <h1 id="jobs-title">Careers shaped around<br />purpose and progress.</h1>
            <span />
            <div>Join a team committed to thoughtful construction, enduring quality and better places to live.</div>
          </div>
        </section>

        <section className="jobs-openings" aria-labelledby="openings-title">
          <div className="jobs-section-heading">
            <p>Current Openings</p>
            <h2 id="openings-title">Find your place on our team.</h2>
          </div>
          <div className="jobs-grid">
            {openings.map((job) => (
              <article key={job.title} className="job-card">
                <div className="job-card-icon"><LineIcon name={job.icon} /></div>
                <div className="job-card-copy">
                  <p>{job.department}</p>
                  <h3>{job.title}</h3>
                  <div className="job-card-meta"><span>{job.experience}</span><span>{job.type}</span><span>Hyderabad</span></div>
                  <p>{job.description}</p>
                </div>
                <a href={`mailto:sales@rudhraconstructions.com?subject=${encodeURIComponent(`Application — ${job.title}`)}`} className="job-apply-link">
                  Apply Now <LineIcon name="arrow-right" />
                </a>
              </article>
            ))}
          </div>
          <div className="jobs-contact-note">
            <span><LineIcon name="mail" /></span>
            <div><p>Don&apos;t see the right role?</p><h2>Share your profile for future opportunities.</h2></div>
            <Link href="/contact" className="primary-button">Contact Our Team <LineIcon name="arrow-right" /></Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
