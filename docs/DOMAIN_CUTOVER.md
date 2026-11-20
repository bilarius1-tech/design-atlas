# Domain cutover checklist

Целевой домен: **https://design.vaybik.ru**. Сервис остаётся бесплатным и публичным. Деплой на VPS: [DEPLOY.md](DEPLOY.md). Чеклист проверок: [PHASE5_CUTOVER.md](PHASE5_CUTOVER.md).

## Current production

| Item                    | Value                                                                |
| ----------------------- | -------------------------------------------------------------------- |
| Host                    | Main VPS `199.189.250.208`, `/opt/apps/design-atlas`                 |
| Production URL          | https://design.vaybik.ru                                             |
| DNS                     | Wildcard `*.vaybik.ru` already points at the VPS — no extra record    |
| GitHub                  | https://github.com/bilarius1-tech/design-atlas                       |
| Deploy                  | `./scripts/deploy.sh` as `deploy`                                    |
| Spare                   | https://design-atlas-wine.vercel.app (Vercel project `design-atlas`) |

## After the VPS is live

1. **Canonical URL**
   - Production image is built with `NEXT_PUBLIC_SITE_URL=https://design.vaybik.ru` (no trailing slash).
2. **SEO / AI maps**
   - Confirm `https://design.vaybik.ru/sitemap.xml` and `/robots.txt` use the new host.
   - Confirm `/llms.txt` loads.
   - Optionally submit sitemap in Search Console / Yandex Webmaster.
3. **Smoke**
   - [ ] `/` — H1 «Анти ИИ-слоп», brand «Дизайн Атлас»
   - [ ] `/studio` — 200
   - [ ] `/cards` — 200
   - [ ] `/api/v1/health` — JSON `ok`
   - [ ] `/api/export/swiss-international?pack=free` — ZIP OK
   - [ ] OG/canonical in page source show the new domain
   - [ ] `https://vaybik.ru/`, `https://chat.vaybik.ru/`, `https://region.vaybik.ru/` still 200
4. **Vercel (leave running for now)**
   - Keep `*.vercel.app` as a spare.
   - Do not delete the Vercel project.
   - Later, to remove the custom domain only: Vercel → Project `design-atlas` → Settings → Domains → remove `design.vaybik.ru` if it was added.

## Out of scope here

- R5 payments / entitlements.
- Separate subdomain for `/cards` (same domain by ADR-0012).
- Editing Traefik, DNS wildcard, or other VPS apps.
