"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getProjectsByStatus, webProjectImage, type ProjectStatus } from "@/data/projects";
import { LineIcon } from "./LineIcon";

const tabs: Array<{ label: string; status: ProjectStatus }> = [
  { label: "Ongoing Projects", status: "Ongoing" },
  { label: "Completed Projects", status: "Completed" },
  { label: "Upcoming Projects", status: "Upcoming" },
];

export function ProjectsExplorer() {
  const [status, setStatus] = useState<ProjectStatus>("Ongoing");
  const visibleProjects = getProjectsByStatus(status);

  return (
    <>
      <div className="project-tabs" role="tablist" aria-label="Project status">
        {tabs.map((tab) => (
          <button key={tab.status} type="button" role="tab" aria-selected={status === tab.status} className={status === tab.status ? "is-active" : ""} onClick={() => setStatus(tab.status)}>
            <LineIcon name={tab.status === "Ongoing" ? "building" : tab.status === "Completed" ? "shield" : "clock"} />
            <span>{tab.label}</span>
            <small>{getProjectsByStatus(tab.status).length}</small>
          </button>
        ))}
      </div>
      <div className="project-card-grid" role="tabpanel">
        {visibleProjects.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className="project-card" aria-label={`View ${project.name} project details`}>
            <Image src={webProjectImage(project.image)} alt={project.alt} fill sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 94vw" className="object-cover" />
            <span className="project-status">{project.status}</span>
            <div className="project-card-overlay">
              <h2>{project.name}</h2>
              <p>{project.category}</p>
              <p className="project-location"><LineIcon name="location" />{project.location}</p>
              <div className="project-card-state">
                <span>{project.status === "Ongoing" ? "In progress" : project.status === "Completed" ? "Delivered" : "Coming soon"}</span>
                <strong>View project <span aria-hidden="true">↗</span></strong>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
