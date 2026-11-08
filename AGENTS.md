<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — управление AI-агентами

## Миссия

Design Atlas — **Knowledge Platform + Design System Library**. Агенты помогают **реализовывать и документировать** продукт по спецификациям репозитория, а не изобретать параллельную архитектуру. Принципы: **Visual first · Agent ready**.

## Источник истины

| Область | Документ |
|---------|----------|
| Продукт | [docs/PRODUCT.md](docs/PRODUCT.md) |
| Архитектура | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Контент | [docs/CONTENT_MODEL.md](docs/CONTENT_MODEL.md) |
| Контракты данных | [docs/DATA_CONTRACTS.md](docs/DATA_CONTRACTS.md) |
| Дизайн-система | [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) |
| Экспорт | [docs/EXPORT_FORMAT.md](docs/EXPORT_FORMAT.md) |
| Рабочий процесс | [docs/AGENT_WORKFLOW.md](docs/AGENT_WORKFLOW.md) |
| Решения | [docs/decisions/](docs/decisions/) |
| Дорожная карта | [docs/ROADMAP.md](docs/ROADMAP.md) |

**Запрет:** не вводить БД, CMS, микросервисы, GraphQL, отдельные репозитории контента без нового ADR и явного запроса человека.

## Архитектурные ограничения

- **Монолит модульный:** одно Next.js-приложение, логические модули в `src/`.
- **Контент в Git:** JSON, MDX, Markdown в `content/`; **нет БД в v1**.
- **Стек:** Next.js App Router, React, TS strict, Tailwind v4, CSS variables, Radix по необходимости, Lucide, Motion — экономно, Zod, Vitest; Playwright — позже; pnpm; CI — GitHub Actions.
- **Порядок:** Design System приложения **сначала**, библиотека визуальных стилей **потом**.
- **ID:** language-independent (`swiss-international`, kebab-case).
- **Phase 1:** документация и каркас; **не** реализовать публичные страницы каталога, playground, полноценную библиотеку стилей без тикета.

Перед правками Next.js — гайды в `node_modules/next/dist/docs/`.

## Правила контента

- Редакторский тон, без шаблонного «AI slop».
- Структурные данные валидировать по Zod; схемы не расходятся с [docs/DATA_CONTRACTS.md](docs/DATA_CONTRACTS.md).
- Локализация: см. ADR-0006; slug и id не переводятся.

## Правила разработки

- Минимальный diff; следовать существующим конвенциям файла.
- `@/*` → `src/*`.
- Не коммитить секреты, `.env`, артефакты сборки.
- Новые зависимости — обоснование в PR; предпочитать уже заявленный стек.
- Breaking changes в JSON-контрактах — версия поля или ADR + миграционная заметка.

## Тесты (требования)

См. [docs/TESTING.md](docs/TESTING.md).

| Уровень | Когда обязательно |
|---------|-------------------|
| Vitest | Утилиты, парсеры, Zod, export pipeline |
| RTL | React-компоненты с нетривиальной логикой |
| Playwright | Позже — критические user flows |

Перед сдачей: `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm test` (когда скрипт подключён).

## Запреты (bans)

1. Выдумывать архитектуру, не описанную в `docs/` и ADR.
2. Подключать БД, headless CMS, внешнее хранилище контента в v1.
3. Генерировать массовый контент без human/content review.
4. Дублировать design tokens вне согласованных путей (`design/`, app theme).
5. Игнорировать a11y для интерактивных UI (Radix/семантика/focus).
6. Force-push в `main`, отключение хуков без явного запроса.
7. Реализовывать playground / публичный каталог стилей в Phase 1.

## Порядок верификации изменений

1. Прочитать релевантные `docs/` и ADR.
2. PLAN — зафиксировать scope (шаблон [docs/templates/TASK-TEMPLATE.md](docs/templates/TASK-TEMPLATE.md)).
3. IMPLEMENT — код/контент по контрактам.
4. TEST — линт, типы, тесты.
5. REVIEW — self-review по CONTRIBUTING + STYLE/CONTENT при необходимости.
6. DOCUMENT — обновить docs, CHANGELOG, ADR при архитектурных сдвигах.
7. ACCEPT — отчёт [docs/templates/AGENT-REPORT.md](docs/templates/AGENT-REPORT.md).

## Роли агентов (сводка)

| Роль | Фокус |
|------|--------|
| Planner | Scope, риски, ссылки на docs/ADR |
| Implementer | Код, контент, токены по контрактам |
| Tester | Vitest, типы, будущий e2e |
| Documenter | docs/, CHANGELOG, ADR |
| Reviewer | Соответствие bans, качество, DoD из CONTRIBUTING |

Один агент может совмещать роли, но фазы PLAN→…→ACCEPT не пропускать.

## Workflow

```
PLAN → IMPLEMENT → TEST → REVIEW → DOCUMENT → ACCEPT
```

Детали: [docs/AGENT_WORKFLOW.md](docs/AGENT_WORKFLOW.md).

## Отчётность

По завершении задачи — заполнить [docs/templates/AGENT-REPORT.md](docs/templates/AGENT-REPORT.md) в теле ответа или PR.
