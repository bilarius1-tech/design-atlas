# ADR-0003: Style rendering

- **Status:** Accepted
- **Date:** 2026-11-09

## Context / Problem

Платформа имеет собственный app shell, но должна показывать **чужие** визуальные стили без загрязнения глобальной темы.

## Options considered

1. **CSS variables scope** — класс-обёртка `.style-<id>` с переопределением variables.
2. **Shadow DOM** — изоляция стилей в web component.
3. **iframe** — полная изоляция, тяжёлый UX.

## Decision

**CSS variables scope** на контейнере preview: app shell использует `design/system/`, preview подставляет tokens из `design/styles/<id>/` под scoped class. Tailwind утилиты shell не переопределяются внутри preview без явных token mappings.

## Consequences

- **Плюсы:** производительность, SSR-friendly, экспорт в `tokens.css` с тем же механизмом.
- **Минусы:** утечки специфичности CSS при ошибках — нужен STYLE-REVIEW.
- **Действия:** компонент `StylePreviewFrame` в P3; документ DESIGN_SYSTEM.
