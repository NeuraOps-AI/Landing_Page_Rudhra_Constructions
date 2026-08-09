import type { Metadata } from "next";
import { ProjectsExplorer } from "@/components/site/ProjectsExplorer";
import { SiteFooter } from "@/components/site/SiteFooter";

export const metadata: Metadata = { title: "Projects | Rudhra Constructions", description: "Explore ongoing, completed and upcoming Rudhra Constructions developments." };

export default function ProjectsPage() {
  return (
    <>
      <main id="projects" className="page-section projects-page">
        <div className="section-heading centered projects-heading">
          <p>Our Projects</p>
          <h1>Spaces We’re Building.<br />Legacies We’re Creating.</h1>
          <span />
          <div>Explore our ongoing, completed, and upcoming projects<br className="hidden sm:block" /> crafted with purpose and precision.</div>
        </div>
        <ProjectsExplorer />
      </main>
      <SiteFooter />
    </>
  );
}
