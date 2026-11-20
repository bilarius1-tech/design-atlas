# Design Atlas

**Design Atlas** («Анти ИИ-слоп · Дизайн Атлас») — библиотека визуальных стилей и мост к промптам. Принципы: **Visual first · Agent ready**. Шаблон × стиль → живое превью → промпт (агент и конструктор, RU/EN) + ZIP-пак. Сайт за клиента Atlas сам не собирает: сборка идёт снаружи (Cursor / конструктор). Контент и контракты живут в Git; в v1 базы данных нет.

Сервис **бесплатный** и публичный: без регистрации и без оплаты.

- Сейчас: https://design-atlas-wine.vercel.app
- Планируемый адрес: https://design.vaybik.ru (отдельное приложение, не внутри vaybik-hub). Чеклист переноса домена: [docs/DOMAIN_CUTOVER.md](docs/DOMAIN_CUTOVER.md) и [docs/PHASE5_CUTOVER.md](docs/PHASE5_CUTOVER.md).

Документация для людей и AI-агентов: [docs/](docs/). Точка входа для агентов — [AGENTS.md](AGENTS.md). Публичный JSON API (только чтение): [docs/API.md](docs/API.md).

## Требования

- Node.js **22+** (рекомендуется 22 LTS; Vitest 5 не работает на Node 20)
- [pnpm](https://pnpm.io/) 10.x (см. `packageManager` в `package.json`)

## Установка

```bash
pnpm install
```

## Скрипты

| Команда                             | Назначение                                         |
| ----------------------------------- | -------------------------------------------------- |
| `pnpm dev`                          | Локальный dev-сервер Next.js (App Router)          |
| `pnpm build`                        | Production-сборка                                  |
| `pnpm start`                        | Запуск собранного приложения                       |
| `pnpm lint`                         | ESLint                                             |
| `pnpm typecheck`                    | TypeScript (`tsc --noEmit`)                        |
| `pnpm test`                         | Unit-тесты (Vitest)                                |
| `pnpm content:validate`             | Валидация `content/` по Zod-контрактам             |
| `pnpm format` / `pnpm format:check` | Prettier                                           |
| `pnpm ci`                           | lint + typecheck + test + content:validate + build |

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

Краткий обзор — [docs/ROADMAP.md](docs/ROADMAP.md). Дальше: доводка оболочки дизайн-системы, тема `vaybik` для агентов студии, публичный JSON API и MCP, затем домен `design.vaybik.ru`.

## Лицензия

Публичный исходный код на GitHub. Отдельного SPDX-файла в репозитории пока нет.
