import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

export const dynamic = "force-static";

const baseUrl = "https://www.rudhraconstructions.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/projects/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/about/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/news-blog/`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/contact/`, changeFrequency: "monthly", priority: 0.7 },
  ];

  return [
    ...pages,
    ...projects.map((project) => ({
      url: `${baseUrl}/projects/${project.slug}/`,
      changeFrequency: "monthly" as const,
      priority: project.status === "Ongoing" ? 0.8 : 0.65,
    })),
  ];
}
