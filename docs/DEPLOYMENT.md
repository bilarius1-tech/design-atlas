# DEPLOYMENT

## Целевые платформы

- **Vercel** — основной путь для Next.js (zero-config App Router).
- Альтернатива: Node hosting (`pnpm build && pnpm start`) на VPS с reverse proxy.

## Environments

| Env | Назначение |
|-----|------------|
| Preview | Каждый PR |
| Production | `main` merge |

## Переменные окружения

v1 минимальны:

| Variable | Required | Описание |
|----------|----------|----------|
| `NODE_ENV` | auto | production |
| `NEXT_PUBLIC_SITE_URL` | P2+ | Canonical base |

Секреты не требуются до появления analytics/API.

## Build

```bash
pnpm install --frozen-lockfile
pnpm build
```

- Node 20+ на CI и Vercel.
- `packageManager: pnpm@10.23.0` — включить Corepack на CI.

## GitHub Actions

- Workflow `ci.yml` — lint, typecheck, test, validate-content (см. [TESTING.md](TESTING.md)).
- Workflow `deploy` — опционально; Vercel Git integration может заменить.

## Кэш

- pnpm store cache на CI.
- Next build cache (Vercel default).

## Rollback

- Vercel: promote previous deployment.
- Git: revert commit on `main`.

## Post-deploy checks

- [templates/RELEASE-CHECKLIST.md](templates/RELEASE-CHECKLIST.md)
- HTTP 200 на `/`
- Security headers (см. [SECURITY.md](SECURITY.md)) — по мере настройки

## Content deploy

Контент в Git → деплой = деплой приложения. Отдельный CDN для статики контента не планируется в v1.
