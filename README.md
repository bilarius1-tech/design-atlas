# Design Atlas

**Design Atlas** — платформа знаний о визуальных стилях и дизайне плюс библиотека дизайн-системы для их представления. Принципы: **Visual first · Agent ready**. Контент и контракты живут в Git; в v1 базы данных нет.

Документация для людей и AI-агентов: [docs/](docs/). Точка входа для агентов — [AGENTS.md](AGENTS.md).

## Требования

- Node.js **22+** (рекомендуется 22 LTS; Vitest 5 не работает на Node 20)
- [pnpm](https://pnpm.io/) 10.x (см. `packageManager` в `package.json`)

## Установка

```bash
pnpm install
```

## Скрипты

| Команда | Назначение |
|---------|------------|
| `pnpm dev` | Локальный dev-сервер Next.js (App Router) |
| `pnpm build` | Production-сборка |
| `pnpm start` | Запуск собранного приложения |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | TypeScript (`tsc --noEmit`) |
| `pnpm test` | Unit-тесты (Vitest) |
| `pnpm content:validate` | Валидация `content/` по Zod-контрактам |
| `pnpm format` / `pnpm format:check` | Prettier |
| `pnpm ci` | lint + typecheck + test + content:validate + build |

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

**Порядок реализации:** сначала дизайн-система приложения, затем библиотека визуальных стилей. Публичные страницы, playground и каталог стилей в Phase 1 **не** реализуются — только документация и фундамент.

## Фазы

Краткий обзор — [docs/ROADMAP.md](docs/ROADMAP.md).

## Лицензия

Приватный репозиторий (`private: true`).
