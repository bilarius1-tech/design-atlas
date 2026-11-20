import { getSiteUrl } from "@/lib/site-url";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/mcp"],
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ["/api/", "/mcp"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
