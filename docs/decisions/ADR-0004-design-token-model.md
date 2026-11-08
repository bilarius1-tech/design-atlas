# ADR-0004: Design token model

- **Status:** Accepted
- **Date:** 2026-11-09

## Context / Problem

Нужен единый формат токенов для app shell, style library и export без привязки к одному вендору (Figma/Tokens Studio).

## Options considered

1. **Flat JSON** — `dot.key` → string|number в `tokens.json`.
2. **W3C Design Tokens Community Group** — nested `$type`, `$value`.
3. **Только CSS** — без JSON, ручное дублирование.

## Decision

**Flat JSON** с dot-notation и `schemaVersion` + `meta` (см. DATA_CONTRACTS). Генерация CSS variables `--da-<kebab-path>`. При необходимости маппинг в W3C формат в export pipeline, не в source.

## Consequences

- **Плюсы:** простота для агентов и Zod; лёгкий diff.
- **Минусы:** нет типизированных token types в source; семантика в naming convention.
- **Действия:** документ DESIGN_SYSTEM; категории color/typography/space/motion/radius/shadow.
