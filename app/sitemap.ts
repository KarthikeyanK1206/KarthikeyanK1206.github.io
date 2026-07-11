import type { MetadataRoute } from "next";

import { docs } from "@/lib/data/documents";
import { profile } from "@/lib/data/profile";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-07-10T00:00:00.000Z");
  const staticRoutes = ["", "/work", "/experience", "/about", "/resume"].map((path) => ({
    url: `${profile.siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  const projectRoutes = docs.map((doc) => ({
    url: `${profile.siteUrl}/work/${doc.slug}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.85,
  }));
  return [...staticRoutes, ...projectRoutes];
}
