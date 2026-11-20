# Domain cutover checklist

Целевой домен: **https://design.vaybik.ru**. Сервис остаётся бесплатным и публичным. Подробный человеческий чеклист (Git auto-deploy, DNS, проверки API): [PHASE5_CUTOVER.md](PHASE5_CUTOVER.md).

Use this when the domain is ready to point at Design Atlas on Vercel.

## Current production (until cutover)

| Item                    | Value                                                                |
| ----------------------- | -------------------------------------------------------------------- |
| Host                    | Vercel team `bill` (`bill-2f6c`)                                     |
| Project                 | `design-atlas` (`prj_Zn11scK3DYfHcbR7pyAaGTuDZeqs`)                  |
| Production URL          | https://design-atlas-wine.vercel.app                                 |
| GitHub                  | https://github.com/bilarius1-tech/design-atlas                       |
| Auto-deploy from GitHub | **Not connected yet** — connect in Vercel → Project → Settings → Git |

## When you have the domain

1. **DNS**
   - In Vercel: Project → **Domains** → Add `design.vaybik.ru` (этот адрес согласован; не класть приложение на корень `vaybik.ru`).
   - At the registrar: set the records Vercel shows (usually `A`/`CNAME` or nameservers).
   - Wait until domain status is **Valid**.

2. **Canonical URL**
   - Update env `NEXT_PUBLIC_SITE_URL` for **Production** (and Preview if desired) to `https://design.vaybik.ru` (no trailing slash).
   - Redeploy production (`vercel deploy --prod` or Git push after Git is linked).

3. **SEO / AI maps**
   - Confirm `https://design.vaybik.ru/sitemap.xml` and `/robots.txt` use the new host.
   - Confirm `/llms.txt` loads.
   - Optionally submit sitemap in Search Console / Yandex Webmaster.

4. **Redirects**
   - Prefer primary host (`apex` or `www`); let Vercel redirect the other.
   - Keep `*.vercel.app` as fallback alias (optional) or leave as secondary.

5. **Smoke**
   - [ ] `/` — H1 «Анти ИИ-слоп», brand «Дизайн Атлас»
   - [ ] `/studio` — 200
   - [ ] `/cards` — 200
   - [ ] `/api/export/swiss-international?pack=free` — ZIP OK
   - [ ] OG/canonical in page source show the new domain

6. **Docs after cutover**
   - Update this file’s “Current production” table.
   - Update [DEPLOYMENT.md](DEPLOYMENT.md) production URL.
   - Note in CHANGELOG / short devlog entry.

## Out of scope here

- Buying/registering the domain (human).
- R5 payments / entitlements.
- Separate subdomain for `/cards` (same domain by ADR-0012).
