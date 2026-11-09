import { listStyleIdsFromDisk } from "@/core/content/registry";
import { getSiteUrl } from "@/lib/site-url";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/studio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${base}/cards`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${base}/demo`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${base}/playground`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${base}/design-system`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/llms.txt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  const styleRoutes: MetadataRoute.Sitemap = listStyleIdsFromDisk().flatMap((id) => [
    {
      url: `${base}/demo/${id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.55,
    },
    {
      url: `${base}/playground/${id}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.35,
    },
  ]);

  return [...staticRoutes, ...styleRoutes];
}
