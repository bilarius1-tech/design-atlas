# ARCHITECTURE

## Обзор

Design Atlas — **модульный монолит** на Next.js (App Router). Рендеринг: React Server Components там, где это снижает JS; клиентские острова для интерактива. Данные читаются из файловой системы репозитория на build/request time (стратегия уточняется при появлении роутов; v1 — без публичных страниц контента).

```
┌─────────────────────────────────────────────────────────┐
│                    Next.js App (src/)                   │
│  app/ routes · components/ · lib/ · features/           │
└───────────────┬─────────────────────┬───────────────────┘
                │                     │
        ┌───────▼───────┐     ┌───────▼───────┐
        │   content/    │     │    design/    │
        │ JSON MDX MD   │     │ tokens themes │
        └───────────────┘     └───────────────┘
                │
        ┌───────▼───────────────────────────┐
        │  Zod validation · content loaders │
        └───────────────────────────────────┘
```

## Слои

| Слой | Путь | Ответственность |
|------|------|-----------------|
| Routes | `src/app/` | Маршруты, layouts, metadata |
| UI | `src/components/` (будущее) | Презентация, без бизнес-правил |
| Features | `src/features/` (будущее) | Сценарии: каталог, export, search |
| Lib | `src/lib/` (будущее) | Парсинг, пути, общие утилиты |
| Content | `content/` | Источник истины сущностей |
| Design assets | `design/` | Токены платформы и стилей |

**Запрещено:** прямой импорт сырого JSON в компоненты без прохождения слоя валидации.

## Модульные границы (целевые)

- `features/styles` — чтение и отображение Style (после P2+).
- `features/export` — сборка bundle по [EXPORT_FORMAT.md](EXPORT_FORMAT.md).
- `features/i18n` — локализация UI и привязка к полям контента (ADR-0006).

Между feature-модулями — только публичные `index.ts` или явные API; не тянуть внутренние файлы соседа.

## Контент и рендеринг

- Структура: [CONTENT_MODEL.md](CONTENT_MODEL.md).
- Хранение: Git, без БД ([ADR-0002](decisions/ADR-0002-content-storage.md)).
- MDX: для длинных статей; frontmatter + body; id в frontmatter совпадает с JSON-записью или ссылается через `contentRef`.

## Стили и темы

- Платформа: CSS variables + Tailwind v4 `@theme` ([DESIGN_SYSTEM.md](DESIGN_SYSTEM.md), [ADR-0003](decisions/ADR-0003-style-rendering.md), [ADR-0004](decisions/ADR-0004-design-token-model.md)).
- Стиль каталога: отдельный token set; переключение — позже (playground), не в Phase 1.

## Валидация и типы

- Runtime: Zod-схемы, сгенерированные или hand-written в `src/lib/schemas/`.
- Compile-time: `satisfies` + inferred types из Zod где возможно.
- CI: `validate-content` job (планируется P1) — обход `content/**/*.json`.

## Тестирование

См. [TESTING.md](TESTING.md). Vitest для pure logic; Playwright — после появления критических flows.

## Безопасность и деплой

[SECURITY.md](SECURITY.md), [DEPLOYMENT.md](DEPLOYMENT.md).

## Эволюция

Любое из нижеперечисленного требует ADR:

- БД или внешний CMS.
- Отдельный BFF/API сервис.
- Edge-only хранение контента без Git.
- Изменение export contract major version.
