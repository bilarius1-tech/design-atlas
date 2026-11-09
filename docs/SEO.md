# SEO & AI discovery

Design Atlas is a **content + tool** product. SEO and AI crawler discovery use Next.js App Router metadata, a generated sitemap, robots rules, JSON-LD, and an `llms.txt` map.

## Brand strings (RU)

| Surface | Value |
|---------|--------|
| Product name | Дизайн Атлас |
| Marketing H1 | Анти ИИ-слоп |
| Title default | Анти ИИ-слоп · Дизайн Атлас |

## Technical stack

| Asset | Implementation |
|-------|----------------|
| Canonical base | `metadataBase` from `NEXT_PUBLIC_SITE_URL` ([src/lib/site-url.ts](../src/lib/site-url.ts)) |
| Per-route metadata | `metadata` / `generateMetadata` |
| Sitemap | [src/app/sitemap.ts](../src/app/sitemap.ts) → `/sitemap.xml` |
| Robots | [src/app/robots.ts](../src/app/robots.ts) → `/robots.txt` |
| Open Graph / Twitter | Root layout + key pages |
| JSON-LD | `WebSite` + `Organization` on home; `SoftwareApplication` / `CollectionPage` where useful |
| AI map | [public/llms.txt](../public/llms.txt) — human/AI-readable site map of surfaces |

## Indexable routes (v1)

- `/` — brand + dual CTAs
- `/studio` — primary product
- `/cards` — card styles library
- `/demo`, `/demo/[styleId]` — style demos
- `/playground`, `/playground/[styleId]` — QA (lower priority; still listed)
- `/design-system` — app shell docs surface

Do **not** index private APIs (`/api/*`) or thin duplicate query variants beyond canonical Studio URL.

## Environment

```bash
NEXT_PUBLIC_SITE_URL=https://design-atlas-wine.vercel.app
```

Required for correct canonicals and sitemap absolute URLs in production. After custom domain: update to `https://your-domain` and redeploy — see [DOMAIN_CUTOVER.md](DOMAIN_CUTOVER.md).

**Live maps:** `/sitemap.xml`, `/robots.txt`, `/llms.txt` on the production host.

## Anti-patterns

- Thin pages per every filter combination
- Keyword stuffing in style summaries
- Hidden text for bots
- Putting card prompts under web style URLs

## Checklist before public launch

- [ ] `NEXT_PUBLIC_SITE_URL` set on host
- [ ] `/sitemap.xml` and `/robots.txt` return 200
- [ ] `/llms.txt` lists Studio + Cards accurately
- [ ] Home OG title/description match brand
- [ ] No `noindex` on primary surfaces unless intentional
