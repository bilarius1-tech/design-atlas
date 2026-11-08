# ADR-0002: Content storage

- **Status:** Accepted
- **Date:** 2026-11-09

## Context / Problem

Контент должен быть reviewable, diffable, совместимым с агентами и без operational overhead БД в v1.

## Options considered

1. **Git files** — JSON + MDX/Markdown в `content/`.
2. **SQLite** в репо — один файл, SQL схема.
3. **Remote CMS** — API как source of truth.

## Decision

**Git files** как единственный source of truth в v1. Реестр в `content/index.json`. Структурные поля в JSON; длинный текст в MDX.

## Consequences

- **Плюсы:** история, blame, PR-review, offline clone.
- **Минусы:** нет realtime collab; сложные запросы требуют build-time индекса.
- **Действия:** CI `validate-content`; запрет БД в AGENTS.md до нового ADR.
