---
name: export-engine
description: Собирает Design Pack ZIP через src/features/export (resolver→generator→validator→zip). Использовать при изменении экспорта, API /api/export, CLI export:pack.
---

# export-engine

1. Только `published` стили из Content Engine.
2. Состав — `pack-definitions.ts` (free/full), не ad-hoc в UI.
3. Доступ — `assertPackAccess` / `DESIGN_ATLAS_ALLOW_FULL_EXPORT` (full).
4. Не копировать `src/components` приложения в ZIP.
5. Детерминизм: без `Date.now()` в артефактах; `generatedAt` = `style.updatedAt`.
6. После изменений: `pnpm test` (export-engine) + `pnpm export:pack --style swiss-international --pack free`.

Docs: [EXPORT_FORMAT.md](../../../docs/EXPORT_FORMAT.md), [ADR-0008](../../../docs/decisions/ADR-0008-design-pack-export-engine.md).
