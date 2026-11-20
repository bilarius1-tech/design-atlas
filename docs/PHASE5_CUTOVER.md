# Phase 5 checklist — `design.vaybik.ru`

Цель: публичный бесплатный сервис на https://design.vaybik.ru как отдельное приложение (репозиторий `bilarius1-tech/design-atlas`), не внутри `vaybik-hub`.

**Прод теперь на основном VPS**, за Traefik, как chat.vaybik.ru. Подробности и команды: [DEPLOY.md](DEPLOY.md).

Запасной адрес на Vercel (проект не удаляем): https://design-atlas-wine.vercel.app  
Проект Vercel: `design-atlas` (team `bill` / `bill-2f6c`).

DNS-запись для `design` не нужна: wildcard `*.vaybik.ru` уже указывает на `199.189.250.208`.

## Что сделать

1. Задеплоить на VPS командой `./scripts/deploy.sh` (пользователь `deploy`, каталог `/opt/apps/design-atlas`). См. [DEPLOY.md](DEPLOY.md).
2. Проверить:
   - [ ] `https://design.vaybik.ru/` — H1 «Анти ИИ-слоп», бренд «Дизайн Атлас», действующий сертификат Let's Encrypt
   - [ ] `/studio`, `/cards`, `/design-system` — 200
   - [ ] `/api/v1/health` — JSON `ok`
   - [ ] `/api/v1/themes/vaybik` — токены темы
   - [ ] `/api/export/swiss-international?pack=free` — ZIP
   - [ ] `/sitemap.xml`, `/robots.txt`, `/llms.txt` с хостом `design.vaybik.ru`
   - [ ] канонические / OG URL на новый домен
   - [ ] `https://vaybik.ru/`, `https://chat.vaybik.ru/`, `https://region.vaybik.ru/` по-прежнему 200
3. Обновить «Current production» в [DOMAIN_CUTOVER.md](DOMAIN_CUTOVER.md) и [DEPLOYMENT.md](DEPLOYMENT.md), если таблица ещё не обновлена.
4. В MCP-конфигах агентов оставить `DESIGN_ATLAS_API_BASE=https://design.vaybik.ru` (это значение по умолчанию в пакете MCP).

## Что не делать

- Не переносить код в `vaybik-hub` или `vaybik-chat`.
- Не включать оплату / R5.
- Не править конфиг Traefik (`/opt/proxy`), `acme.json`, firewall, sshd, VPN.
- Не трогать контейнеры region, hub и chat.
- Не удалять проект Vercel; запасной `*.vercel.app` можно оставить. Чтобы потом убрать кастомный домен из Vercel: Project → Settings → Domains → remove `design.vaybik.ru` (если он был добавлен).
