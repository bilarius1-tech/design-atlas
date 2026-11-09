---
name: export-validation
description: Проверяет Design Pack перед/после ZIP — required paths, checksums, free leak, secrets banlist, Zip Slip. Использовать после правок validator или pack definition.
---

# export-validation

1. Запустить unit tests `tests/unit/export-engine.test.ts`.
2. Распаковать ZIP: пути относительные, под `design-atlas-<slug>-v<ver>-<kind>/`.
3. Сверить `manifest.files[].sha256` с содержимым (кроме самого manifest).
4. Free не содержит CHANGELOG / demo-landing / LAYOUT-RULES.
5. Full без флага entitlement → 403.

Docs: [EXPORT_SECURITY.md](../../../docs/EXPORT_SECURITY.md).
