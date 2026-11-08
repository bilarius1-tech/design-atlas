# ADR-0006: Localization

- **Status:** Accepted
- **Date:** 2026-11-09

## Context / Problem

Аудитория русско- и англоязычная. URL и ids должны оставаться стабильными при смене языка UI.

## Options considered

1. **Localized fields in JSON** — `title: { en, ru }`, один URL `/styles/[id]`.
2. **Locale path prefix** — `/en/...`, `/ru/...` с тем же id.
3. **Separate content files per locale** — `meta.en.json`, `meta.ru.json`.

## Decision

**Localized fields in JSON** как primary; UI shell локализуется на P4 (`en`, `ru`). **id и путь не локализуются.** Опционально позже — prefix routes + `hreflang` без смены id (follow-up ADR допустим).

## Consequences

- **Плюсы:** один файл meta на стиль; проще для агентов.
- **Минусы:** большие JSON при многих локалях — тогда split по ADR.
- **Действия:** LocalizedString в DATA_CONTRACTS; `lang` на `<html>` при переключении UI.
