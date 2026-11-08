# Changelog

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/),
версионирование — [Semantic Versioning](https://semver.org/lang/ru/).

## [Unreleased]

### Added

- PHASE 6 Swiss International reference package (`review` v1.0.0): research, full export docs, RU/EN prompts, STYLE-REVIEW.
- PHASE 5 Demo Landing Engine: compositions, section renderer, `/demo/[styleId]`, expanded Swiss draft landing.
- PHASE 4 Visual Playground: scoped `StylePreviewFrame`, interactive groups, `/playground/[styleId]`.
- PHASE 3 Content Engine: Zod schemas, style loader/registry/validator, `pnpm content:validate`, draft `swiss-international` fixture.
- PHASE 2 Core Design System: `design/system/tokens.json`, editorial UI primitives, layout chrome, `/design-system`.
- Bootstrap репозитория: Next.js App Router, TypeScript strict, Tailwind v4, Zod, Vitest (зависимости).
- Phase 1 документация: `docs/`, ADR `0001–0007`, шаблоны в `docs/templates/`, governance в `AGENTS.md`.
- Devlog: `docs/devlog/`.

### Changed

- `README.md` заменён с шаблона create-next-app на описание Design Atlas.
- Оболочка использует Source Serif 4 / Source Sans 3 вместо Geist Sans.
- `DATA_CONTRACTS.md` / `CONTENT_MODEL.md` приведены к модели `style.json` + tokens в `content/styles/<id>/`.

### Notes

- Playground и demo landing engine — следующий шаг (PHASE 4–5). `swiss-international` остаётся draft до PHASE 6.

## [0.1.0] - 2026-11-09

### Added

- Начальный каркас приложения (`src/app/`) от create-next-app.

[Unreleased]: https://github.com/example/design-atlas/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/example/design-atlas/releases/tag/v0.1.0
