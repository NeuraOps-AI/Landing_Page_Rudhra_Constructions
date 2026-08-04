"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { siteProjects, type SiteProject } from "@/data/site";
import { LineIcon } from "./LineIcon";

const tabs: Array<{ label: string; status: SiteProject["status"] }> = [
  { label: "Ongoing Projects", status: "Ongoing" },
  { label: "Completed Projects", status: "Completed" },
  { label: "Upcoming Projects", status: "Upcoming" },
];

export function ProjectsExplorer() {
  const [status, setStatus] = useState<SiteProject["status"]>("Ongoing");
  const projects = siteProjects.filter((project) => project.status === status);

  return (
    <>
      <div className="project-tabs" role="tablist" aria-label="Project status">
        {tabs.map((tab) => (
          <button key={tab.status} type="button" role="tab" aria-selected={status === tab.status} className={status === tab.status ? "is-active" : ""} onClick={() => setStatus(tab.status)}>
            <LineIcon name={tab.status === "Ongoing" ? "building" : tab.status === "Completed" ? "shield" : "clock"} />{tab.label}
          </button>
        ))}
      </div>
      <div className="project-card-grid">
        {projects.map((project) => (
          <Link key={project.slug} href={project.slug === "rudhra-villas" ? "/projects/rudhra-villas" : "/projects/rudhra-villas"} className="project-card">
            <Image src={project.image} alt={project.alt} fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 94vw" className="object-cover" />
            <span className="project-status">{project.status}</span>
            <div className="project-card-overlay">
              <h2>{project.name}</h2>
              <p>{project.category}</p>
              <p className="project-location"><LineIcon name="location" />{project.location}</p>
              <div className="project-progress-label"><span>Construction Progress</span><strong>{project.progress}%</strong></div>
              <span className="project-progress-track"><span style={{ width: `${project.progress}%` }} /></span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
