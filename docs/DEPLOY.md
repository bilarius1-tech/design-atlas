# Deploy on the Vaybik VPS

Production for Design Atlas is the main VPS, not Vercel.

| Item | Value |
| --- | --- |
| Host | FirstVDS, `199.189.250.208` (`bilariuss.hlab.kz`) |
| Public URL | https://design.vaybik.ru |
| Health | https://design.vaybik.ru/api/v1/health |
| Checkout | `/opt/apps/design-atlas` (user `deploy`, branch `main`) |
| Compose project | `design-atlas` |
| Image | `design-atlas:latest` (rollback tags `design-atlas:prev-<sha>`) |
| Container memory | 512 MiB |
| DNS | already covered by the wildcard `*.vaybik.ru` A record — no extra DNS record |

The app is a separate Docker Compose project. It only adds Traefik labels on its own container and joins the existing external network `proxy`. It does not change Traefik config, `acme.json`, the firewall, or other apps (hub, chat, region, main site).

Vercel (`https://design-atlas-wine.vercel.app`) stays as a spare until we decide to turn it off. Do not delete that project from this cutover.

## First install

On the VPS, as `deploy`:

```bash
./scripts/deploy.sh
```

The script clones the public repo into `/opt/apps/design-atlas` if needed, writes a no-secrets `.env`, checks that no other Docker build is running and that enough memory is free, builds **one** image with `NODE_OPTIONS=--max-old-space-size=2048`, starts the container, and checks `/api/v1/health`.

From this bot's box (SSH as root, then switch to `deploy`):

```bash
ssh root@199.189.250.208 'su - deploy -c "cd /opt/apps/design-atlas && ./scripts/deploy.sh"'
```

On a brand-new server, copy `scripts/deploy.sh` from this repo first, or:

```bash
ssh root@199.189.250.208 'su - deploy -c "git clone https://github.com/bilarius1-tech/design-atlas.git /opt/apps/design-atlas && cd /opt/apps/design-atlas && ./scripts/deploy.sh"'
```

## Redeploy

After a reviewed push to `main`:

```bash
# on the VPS as deploy
cd /opt/apps/design-atlas && make deploy
# or
./scripts/deploy.sh
```

`make rollback` restores the most recent `design-atlas:prev-*` image and recreates the container without a build.

`./scripts/deploy.sh --dry-run` only shows the commits that would go out.

## Environment

`/opt/apps/design-atlas/.env` (not in git):

```text
APP_NAME=design-atlas
APP_HOST=design.vaybik.ru
APP_PORT=3000
COMPOSE_PROJECT_NAME=design-atlas
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://design.vaybik.ru
```

`NEXT_PUBLIC_SITE_URL` is also passed as a Docker **build** arg, because Next inlines public env vars at build time. There are no production secrets in v1.

## Traefik labels (do not edit `/opt/proxy`)

Same convention as chat and the server project template:

- network: `proxy`
- entrypoints: `websecure` (HTTPS) and `web` (HTTP → `to-https@docker`)
- certresolver: `le`
- rule: `Host(design.vaybik.ru)`
- container port: `3000`

Let's Encrypt is issued automatically once the container is up. If the certificate is delayed, wait for the existing `acme-retry` timer. Do not restart Traefik.

## Post-deploy checks

- [ ] `https://design.vaybik.ru/` — 200, valid certificate, H1 «Анти ИИ-слоп», brand «Дизайн Атлас»
- [ ] `/studio`, `/cards`, `/design-system` — 200
- [ ] `/api/v1/health` — JSON with `"ok": true`
- [ ] `/api/v1/themes/vaybik` — theme tokens
- [ ] `/sitemap.xml`, `/robots.txt`, `/llms.txt` use host `design.vaybik.ru`
- [ ] Neighbours still 200: `https://vaybik.ru/`, `https://chat.vaybik.ru/`, `https://region.vaybik.ru/`

## Build rules on the VPS

- Only one image build at a time.
- Builder heap: `NODE_OPTIONS=--max-old-space-size=2048`.
- Runtime memory limit: 512 MiB.
- If a build is already running, or free memory is too low, the script exits without starting another.

## Rollback

The script prints the exact command, in the form:

```bash
docker tag design-atlas:prev-<previous-sha> design-atlas:latest
cd /opt/apps/design-atlas && docker compose up -d --no-build --force-recreate
```

Or `make rollback` for the latest `prev-*` tag.

## Vercel (leave in place)

The project `design-atlas` on team `bill` / `bill-2f6c` is not deleted by this cutover. The spare URL is https://design-atlas-wine.vercel.app.

To drop the custom domain from Vercel later (only after confirming `design.vaybik.ru` is served from the VPS): Vercel → Project `design-atlas` → Settings → Domains → remove `design.vaybik.ru` if it was added. Do not delete the project unless we explicitly decide to retire the spare.
