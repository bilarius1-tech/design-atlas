# ADR-0008: Design Pack & Export Engine

- **Status:** Accepted
- **Date:** 2026-11-09
- **Supersedes (layout):** расширяет [ADR-0007](ADR-0007-export-contract.md); formatVersion пакета **1.0**

## Context / Problem

После публикации эталона нужен безопасный, детерминированный Design Pack (ZIP) из Git SSOT: полезный Free Export для людей и AI-агентов (сценарий «прочитал промпт → собрал UI»), плюс внутренний Full Pack без платежей.

## Options considered

1. **Только legacy layout ADR-0007** (плоский tokens + prompt/*.txt) — недостаточно agent-ready.
2. **Копии файлов только для ZIP** — дубли SSOT, дрейф.
3. **Генерация из Content Engine + pack definitions** — один источник, режимы free/full, entitlements.

## Decision

Реализовать `src/features/export/`:

| Компонент | Роль |
|-----------|------|
| Pack Definition | Состав free/full, обязательные файлы, exclusions |
| Export Resolver | Только published bundle + markdown из `content/styles/<id>/` |
| Generator | Детерминированные артефакты (split tokens, CSS, README, derived MD) |
| Validator | Обязательные файлы, JSON, secrets banlist, path safety |
| Entitlements | Централизованный доступ: free=public, full=internal (PHASE 7) |
| ZIP Builder | `fflate`, относительные пути, sorted entries, Zip Slip guard |

**Manifest** `format: design-atlas-pack`, `formatVersion: "1.0"`, per-file SHA-256.

**Не делать в PHASE 7:** billing, auth, fake checkout, Redis/workers, копирование `src/components` приложения.

## Consequences

- **Плюсы:** полезный free pack (DESIGN/TOKENS/AGENT/prompts/tokens); тесты; безопасность путей.
- **Минусы:** новая dep `fflate`; Full Pack не публичный до коммерческой фазы.
- **Действия:** обновить [EXPORT_FORMAT.md](../EXPORT_FORMAT.md), [PRODUCT_ENTITLEMENTS.md](../PRODUCT_ENTITLEMENTS.md), [EXPORT_SECURITY.md](../EXPORT_SECURITY.md).
