# Участие в разработке

Спасибо за вклад в Design Atlas. Репозиторий — **источник истины**: архитектуру и контракты не выдумываем в PR, а сверяем с [docs/](docs/) и [docs/decisions/](docs/decisions/).

## Перед началом

1. Прочитайте [AGENTS.md](AGENTS.md) (или эквивалентные правила, если вы человек).
2. Ознакомьтесь с [docs/PRODUCT.md](docs/PRODUCT.md) и [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).
3. Для контента — [docs/CONTENT_MODEL.md](docs/CONTENT_MODEL.md) и [docs/DATA_CONTRACTS.md](docs/DATA_CONTRACTS.md).

## Ветки и коммиты

- Базовая ветка: `main`.
- Ветки: `feat/<кратко>`, `fix/<кратко>`, `docs/<кратко>`, `chore/<кратко>`.
- Коммиты: повелительное наклонение, английский или русский — единообразно в рамках PR (предпочтительно английский для `git log`, русский допустим в теле PR).
- Один логический change set на PR.

## Код

- TypeScript `strict`, без `any` без обоснования в комментарии или ADR.
- Импорты: алиас `@/*` → `src/*`.
- Стили: Tailwind v4 + CSS variables; не дублировать токены вне `design/` и согласованных слоёв (см. [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md)).
- UI: Radix только при реальной need accessibility/поведения; иконки — Lucide.
- Валидация данных: Zod-схемы рядом с контрактами в коде, зеркалят [docs/DATA_CONTRACTS.md](docs/DATA_CONTRACTS.md).

## Контент

- ID сущностей — **языконезависимые** slug'и: `swiss-international`, не `швейцарский-стиль`.
- Редакторское качество: без «AI slop», факты проверяемы, тон — как у хорошего редакционного издания.
- Форматы: JSON (структура), Markdown/MDX (нарратив). Новые поля — через обновление контракта + ADR при breaking change.
- Шаблон ревью контента: [docs/templates/CONTENT-REVIEW.md](docs/templates/CONTENT-REVIEW.md).

## Стиль и визуал

- Ревью по [docs/templates/STYLE-REVIEW.md](docs/templates/STYLE-REVIEW.md).
- Сначала оболочка приложения (design system), потом библиотека стилей — не наоборот.

## Pull Request

1. **Scope:** только запрошенная задача; без «заодно» рефакторинга.
2. **Описание:** что, зачем, ссылки на issue/ADR/док.
3. **Чеклист** (в теле PR):
   - [ ] `pnpm lint`
   - [ ] `pnpm exec tsc --noEmit`
   - [ ] Тесты (если есть затронутый код): `pnpm test`
   - [ ] Документация обновлена, если менялись контракты или поведение
   - [ ] CHANGELOG: секция `Unreleased` при user-visible изменениях
4. **Запрещено в Phase 1+ без явного тикета:** публичный каталог стилей, playground, массовое наполнение `content/` без ревью.

## Definition of Done

Задача считается выполненной, когда:

| Критерий | Проверка |
|----------|----------|
| Соответствие архитектуре | Нет новых слоёв/БД без ADR |
| Типы и линт | `tsc --noEmit`, `eslint` без ошибок |
| Тесты | Новая логика покрыта Vitest; критические пути — по [docs/TESTING.md](docs/TESTING.md) |
| A11y / SEO / Security | Затронутые области сверены с [docs/ACCESSIBILITY.md](docs/ACCESSIBILITY.md), [docs/SEO.md](docs/SEO.md), [docs/SECURITY.md](docs/SECURITY.md) |
| Документация | Обновлены релевантные файлы в `docs/` |
| Ревью | Минимум один approve; контент — CONTENT-REVIEW при необходимости |

## ADR

Архитектурные решения — [docs/decisions/](docs/decisions/). Новое решение: копировать [docs/templates/ADR-TEMPLATE.md](docs/templates/ADR-TEMPLATE.md), номер по порядку.

## Вопросы

Неясность по продукту → issue с ссылкой на ROADMAP и PRODUCT. Не гадайте в коде.
