/**
 * Canonical site origin for metadata, sitemap, robots, and JSON-LD.
 * Prefer NEXT_PUBLIC_SITE_URL in production; fall back to localhost for local/CI.
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    return raw.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "http://localhost:3000";
}

export function absoluteUrl(pathname = "/"): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${getSiteUrl()}${path === "/" ? "" : path}`;
}

/** Default share image (1200×630). Pages that override `openGraph` must include this, or Next.js will drop the layout image. */
export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Дизайн Атлас — готовые визуальные системы, design.vaybik.ru",
} as const;
