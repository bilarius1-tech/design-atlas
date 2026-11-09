# DEPLOYMENT

## Целевые платформы

- **Vercel** — основной путь для Next.js (zero-config App Router). **In use.**
- Альтернатива: Node hosting (`pnpm build && pnpm start`) на VPS с reverse proxy.
- **GitHub Pages** — не подходит (нужен Node для Studio / `/api/export`).

## Current production

| Item | Value |
|------|--------|
| Team | `bill` (`bill-2f6c`) |
| Project | `design-atlas` |
| URL | https://design-atlas-wine.vercel.app |
| Repo | https://github.com/bilarius1-tech/design-atlas |
| Custom domain | pending — see [DOMAIN_CUTOVER.md](DOMAIN_CUTOVER.md) |

CLI (local, authenticated as `bilarius1-tech`):

```bash
vercel whoami
vercel link --yes --project design-atlas --scope bill-2f6c
vercel deploy --prod --yes --scope bill-2f6c
```

## Environments

| Env | Назначение |
|-----|------------|
| Preview | PR / preview URLs (SSO protection may apply) |
| Production | Current prod alias `design-atlas-wine.vercel.app` |

## Переменные окружения

| Variable | Required | Описание |
|----------|----------|----------|
| `NODE_ENV` | auto | production |
| `NEXT_PUBLIC_SITE_URL` | **yes on prod** | Canonical base (no trailing slash). Now: `https://design-atlas-wine.vercel.app`. After domain: set to `https://your-domain`. |

Set via:

```bash
vercel env add NEXT_PUBLIC_SITE_URL production --scope bill-2f6c
```

Secrets not required until analytics/API.

## Build

```bash
pnpm install --frozen-lockfile
pnpm build
```

- Node 22+ locally / CI; Vercel project may show a newer Node — keep `engines.node` in `package.json` aligned.
- `packageManager: pnpm@10.23.0` — Corepack on CI.

## GitHub Actions

- Workflow `ci.yml` — lint, typecheck, test, validate-content, build (см. [TESTING.md](TESTING.md)).
- **Git → Vercel auto-deploy:** not connected yet. Connect in dashboard (Settings → Git) so `main` pushes deploy without CLI.

## Deployment protection

- Production public (SSO limited to **preview**).
- Do not re-enable Vercel Authentication on production unless intentional.

## Кэш

- pnpm store cache на CI.
- Next build cache (Vercel default).

## Rollback

- Vercel: promote previous deployment in dashboard / CLI.
- Git: revert commit on `main`, redeploy.

## Post-deploy checks

- [templates/RELEASE-CHECKLIST.md](templates/RELEASE-CHECKLIST.md)
- HTTP 200: `/`, `/studio`, `/cards`, `/sitemap.xml`, `/robots.txt`, `/llms.txt`
- Brand: H1 «Анти ИИ-слоп», product «Дизайн Атлас»
- Security headers — по мере настройки ([SECURITY.md](SECURITY.md))

## Content deploy

Контент в Git → деплой = деплой приложения. Отдельный CDN для статики контента не планируется в v1.

## Domain

When a custom domain is ready: follow [DOMAIN_CUTOVER.md](DOMAIN_CUTOVER.md).
