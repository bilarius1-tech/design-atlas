# Phase 5 checklist — `design.vaybik.ru`

Чеклист только. **Этот шаг не выполняется в коде фаз 0–4.** Домен, DNS и автодеплой Vercel делает человек, когда будет доступ к кабинету Vercel.

Цель: публичный бесплатный сервис на https://design.vaybik.ru как отдельное приложение (репозиторий `bilarius1-tech/design-atlas`), не внутри `vaybik-hub`.

Текущий прод до переноса: https://design-atlas-wine.vercel.app  
Проект Vercel: `design-atlas` (team `bill` / `bill-2f6c`).  
Автодеплой из GitHub на момент подготовки чеклиста **не подключён** (в репозитории нет Vercel Git integration, webhooks и deployment environments; пуш в `main` запускает только GitHub Actions CI).

## Что сделать человеку

1. В Vercel → Project `design-atlas` → Settings → Git: подключить `bilarius1-tech/design-atlas`, деплой production с ветки `main`.
2. Vercel → Domains: добавить `design.vaybik.ru`.
3. В DNS домена `vaybik.ru` поставить запись, которую покажет Vercel (обычно `CNAME` на `cname.vercel-dns.com` или аналог). Дождаться статуса **Valid**.
4. Выставить env `NEXT_PUBLIC_SITE_URL=https://design.vaybik.ru` для Production (без слэша в конце).
5. Передеплоить production (после подключения Git — пуш или Deploy).
6. Проверить:
   - [ ] `https://design.vaybik.ru/` — H1 «Анти ИИ-слоп», бренд «Дизайн Атлас»
   - [ ] `/studio`, `/cards`, `/design-system` — 200
   - [ ] `/api/v1/health` — JSON `ok`
   - [ ] `/api/v1/themes/vaybik` — токены темы
   - [ ] `/api/export/swiss-international?pack=free` — ZIP
   - [ ] `/sitemap.xml`, `/robots.txt`, `/llms.txt` с хостом `design.vaybik.ru`
   - [ ] канонические / OG URL на новый домен
7. Обновить «Current production» в [DOMAIN_CUTOVER.md](DOMAIN_CUTOVER.md) и [DEPLOYMENT.md](DEPLOYMENT.md). Старый `*.vercel.app` можно оставить запасным адресом.
8. В MCP-конфигах агентов оставить `DESIGN_ATLAS_API_BASE=https://design.vaybik.ru` (это значение по умолчанию в пакете MCP).

## Что не делать

- Не переносить код в `vaybik-hub` или `vaybik-chat`.
- Не включать оплату / R5.
- Не править Traefik на основном VPS, пока нет отдельного решения уйти с Vercel.
- Не включать Vercel Authentication на production (сервис публичный и бесплатный).
