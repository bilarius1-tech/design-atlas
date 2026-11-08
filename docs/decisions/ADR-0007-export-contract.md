# ADR-0007: Export contract

- **Status:** Accepted
- **Date:** 2026-11-09

## Context / Problem

Разработчики и агенты должны переносить стиль в другие проекты предсказуемым bundle без ручного копипаста.

## Options considered

1. **Zip directory** — manifest + meta + tokens + css + prompts (+ README).
2. **NPM package** per style — версионирование пакетов.
3. **Single JSON** — всё в одном файле.

## Decision

**Zip directory** layout `exportVersion` **1.0.0** как в [EXPORT_FORMAT.md](../EXPORT_FORMAT.md). CLI в монорепо генерирует bundle; checksums optional P2.

## Consequences

- **Плюсы:** человекочитаемо, git-friendly при распаковке; тестируемо.
- **Минусы:** больше файлов, чем single JSON — приемлемо.
- **Действия:** major bump exportVersion при breaking layout; Zod ExportManifest.
