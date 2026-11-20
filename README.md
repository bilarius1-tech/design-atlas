# Design Atlas

**Design Atlas** («Анти ИИ-слоп · Дизайн Атлас») — библиотека визуальных стилей и мост к промптам. Принципы: **Visual first · Agent ready**. Шаблон × стиль → живое превью → промпт (агент и конструктор, RU/EN) + ZIP-пак. Сайт за клиента Atlas сам не собирает: сборка идёт снаружи (Cursor / конструктор). Контент и контракты живут в Git; в v1 базы данных нет.

Сервис **бесплатный** и публичный: без регистрации и без оплаты.

- Прод: https://design.vaybik.ru (отдельное приложение на VPS Вайбика, не внутри vaybik-hub). Деплой: [docs/DEPLOY.md](docs/DEPLOY.md).

Документация для людей и AI-агентов: [docs/](docs/). Точка входа для агентов — [AGENTS.md](AGENTS.md). Публичный JSON API (только чтение): [docs/API.md](docs/API.md).

## Требования

- Node.js **22+** (рекомендуется 22 LTS; Vitest 5 не работает на Node 20)
- [pnpm](https://pnpm.io/) 10.x (см. `packageManager` в `package.json`)

## Установка

```bash
pnpm install
```

## Скрипты

| Команда                             | Назначение                                                                 |
| ----------------------------------- | -------------------------------------------------------------------------- |
| `pnpm dev`                          | Локальный dev-сервер Next.js (App Router)                                  |
| `pnpm build`                        | Production-сборка                                                          |
| `pnpm start`                        | Запуск собранного приложения                                               |
| `pnpm lint`                         | ESLint                                                                     |
| `pnpm typecheck`                    | TypeScript (`tsc --noEmit`)                                                |
| `pnpm test`                         | Unit-тесты (Vitest)                                                        |
| `pnpm content:validate`             | Валидация `content/` по Zod-контрактам                                     |
| `pnpm format` / `pnpm format:check` | Prettier                                                                   |
| `pnpm ci`                           | lint + typecheck + test + content:validate + build                         |
| `pnpm mcp`                          | Stdio MCP-сервер поверх `/api/v1` ([packages/mcp](packages/mcp/README.md)) |

Спецификация: [docs/specification/](docs/specification/). Тесты: [docs/TESTING.md](docs/TESTING.md).

## Стек (целевой)

Next.js App Router, React, TypeScript (strict), Tailwind CSS v4, CSS variables, Radix UI при необходимости, Lucide, Motion — умеренно, Zod, Vitest, Playwright (позже), pnpm, GitHub Actions.

## Структура репозитория

```
design-atlas/
├── AGENTS.md              # Правила для AI-агентов
├── CONTRIBUTING.md        # Участие в разработке
├── CHANGELOG.md
├── docs/                  # Продукт, архитектура, ADR, шаблоны
├── content/               # JSON / MDX / Markdown (источник истины контента)
├── design/                # Токены, темы, артефакты дизайн-системы
├── src/
│   └── app/               # Next.js App Router (оболочка приложения)
├── package.json
└── ...
```

**Что уже сделано:** публичные страницы Studio, Cards, Demo, Playground и `/design-system`; **24** опубликованных стиля, **8** стилей карточек, **3** шаблона страниц; ZIP-экспорт `GET /api/export/[styleId]`. Репозиторий публичный (`bilarius1-tech/design-atlas`). Поле `private` в `package.json` означает только «не публиковать пакет в npm».

## Фазы

Краткий обзор — [docs/ROADMAP.md](docs/ROADMAP.md). Прод на https://design.vaybik.ru. Дальше: доводка оболочки дизайн-системы и темы `vaybik` для агентов студии.


## Подключить MCP в Cursor

Один самодостаточный инструмент — `get_design_spec` (стиль → полный текст спецификации + JSON токенов).

1. Нужны Node.js 22+ и pnpm. Склонируйте этот репозиторий и выполните `pnpm install`.
2. Скопируйте конфиг в `.cursor/mcp.json` проекта (или в пользовательский MCP-конфиг Cursor):

```json
{
  "mcpServers": {
    "design-atlas": {
      "command": "pnpm",
      "args": ["exec", "tsx", "packages/mcp/src/index.ts"],
      "env": {
        "DESIGN_ATLAS_API_BASE": "https://design.vaybik.ru"
      }
    }
  }
}
```

Либо запуск из корня репозитория: `pnpm mcp`. Секреты не нужны: API только для чтения и бесплатное. Подробности — [packages/mcp/README.md](packages/mcp/README.md).

## Лицензия

Публичный исходный код на GitHub. Отдельного SPDX-файла в репозитории пока нет.
