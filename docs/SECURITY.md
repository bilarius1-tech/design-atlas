# SECURITY

## Модель угроз (v1)

- Статический/SSR сайт без пользовательских аккаунтов.
- Контент только из доверенного Git; нет произвольной загрузки файлов пользователями.
- Риски: XSS через MDX, supply chain, утечка секретов в CI, dependency confusion.

## XSS и MDX

- MDX pipeline — с жёстким allowlist компонентов (P2).
- Не рендерить сырой HTML из контента без санитизации.
- `dangerouslySetInnerHTML` — запрещён в features контента без security review.

## Секреты

- `.env*` в `.gitignore`; не коммитить API keys.
- GitHub Actions: secrets только через repository secrets; не логировать env.
- Публичный репозиторий (если станет) — сканирование на secrets в CI (gitleaks — опционально P2).

## Зависимости

- `pnpm audit` периодически; обновления Next/React — по CHANGELOG Next security.
- Pin major versions; Renovate/Dependabot (P2).

## Headers (production)

Целевые заголовки (DEPLOYMENT):

| Header | Значение (ориентир) |
|--------|---------------------|
| Content-Security-Policy | strict после инвентаризации скриптов |
| X-Frame-Options | DENY или CSP frame-ancestors |
| Referrer-Policy | strict-origin-when-cross-origin |
| Permissions-Policy | минимизировать camera/mic/geo |

## Export CLI

Экспорт только локально/CI из проверенного контента; не выполнять произвольные шаблоны из внешних URL.

## Сообщения об уязвимостях

Внутренний репозиторий: контакт maintainer через приватный channel (указать в README при публикации).

## Агенты

- Не добавлять eval, `child_process` с user input, произвольные fetch без allowlist.
- Не отключать ESLint security rules без ADR.
