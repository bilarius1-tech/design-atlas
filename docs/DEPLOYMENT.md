# DEPLOYMENT

## Целевые платформы

- **Основной VPS Вайбика** (`199.189.250.208`) за Traefik — текущий прод. Команды и откат: [DEPLOY.md](DEPLOY.md).
- **Vercel** — запасной адрес, проект не удаляем.
- **GitHub Pages** — не подходит (нужен Node для Studio / `/api/export`).

## Current production

| Item          | Value                                                                          |
| ------------- | ------------------------------------------------------------------------------ |
| Host          | FirstVDS VPS `199.189.250.208`, checkout `/opt/apps/design-atlas`              |
| URL           | https://design.vaybik.ru                                                       |
| Health        | https://design.vaybik.ru/api/v1/health                                         |
| Repo          | https://github.com/bilarius1-tech/design-atlas                                 |
| Deploy        | `./scripts/deploy.sh` or `make deploy` as user `deploy` — see [DEPLOY.md](DEPLOY.md) |
| Access        | Public and free: no sign-up, no payments                                       |
| Spare         | https://design-atlas-wine.vercel.app (Vercel team `bill` / `bill-2f6c`)        |

## Environments

| Env        | Назначение                                        |
| ---------- | ------------------------------------------------- |
| Local      | `pnpm dev` — `http://localhost:3000`              |
| Production | `https://design.vaybik.ru` on the VPS             |
| Spare      | Vercel alias `design-atlas-wine.vercel.app`       |

## Переменные окружения

| Variable               | Required        | Описание                                                                                          |
| ---------------------- | --------------- | ------------------------------------------------------------------------------------------------- |
| `NODE_ENV`             | auto            | production                                                                                        |
| `NEXT_PUBLIC_SITE_URL` | **yes on prod** | Canonical base (no trailing slash). Production: `https://design.vaybik.ru`. Inlined at image build. |

Secrets not required until analytics/API. Compose also uses `APP_NAME`, `APP_HOST`, `APP_PORT`, `COMPOSE_PROJECT_NAME` — see [DEPLOY.md](DEPLOY.md).

## Build

Local:

```bash
pnpm install --frozen-lockfile
pnpm build
```

On the VPS the image is a multi-stage Dockerfile (`output: "standalone"`). Build one image at a time with `NODE_OPTIONS=--max-old-space-size=2048`. Node 22+, `packageManager: pnpm@10.23.0`.

## GitHub Actions

- Workflow `ci.yml` — lint, typecheck, test, validate-content, build (см. [TESTING.md](TESTING.md)).
- A push to `main` does **not** auto-deploy to the VPS. After CI is green, run `./scripts/deploy.sh` on the server.

## Кэш

- pnpm store cache на CI.
- Docker layer cache on the VPS for `deps` / `builder` stages.

## Rollback

- VPS: `make rollback` or the `docker tag design-atlas:prev-<sha> …` command printed by the deploy script. See [DEPLOY.md](DEPLOY.md).
- Git: revert commit on `main`, redeploy.

## Post-deploy checks

- [templates/RELEASE-CHECKLIST.md](templates/RELEASE-CHECKLIST.md)
- HTTP 200: `/`, `/studio`, `/cards`, `/sitemap.xml`, `/robots.txt`, `/llms.txt`
- Brand: H1 «Анти ИИ-слоп», product «Дизайн Атлас»
- Neighbours still up: vaybik.ru, chat.vaybik.ru, region.vaybik.ru
- Security headers — по мере настройки ([SECURITY.md](SECURITY.md))

## Content deploy

Контент в Git → деплой = деплой приложения. Отдельный CDN для статики контента не планируется в v1.

## Domain

Cutover and leftover Vercel notes: [DOMAIN_CUTOVER.md](DOMAIN_CUTOVER.md) and [PHASE5_CUTOVER.md](PHASE5_CUTOVER.md).
