# Changelog

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/),
версионирование — [Semantic Versioning](https://semver.org/lang/ru/).

## [Unreleased]

### Added

- Published style pack **`y2k`** (lavender ground, chrome Unbounded, pink/cyan pills; dizain-prompty adapted).
- Published style pack **`aurora-mesh`** (night field, cyan/violet/pink mesh blooms, glass panels, white CTA; dizain-prompty adapted).
- Published style pack **`neo-brutalism`** (butter ground, Unbounded+Rubik, pink/mint, 3px rules + hard offset; dizain-prompty adapted — ≠ `poster-brutal`).
- Published style pack **`scandi-calm`** (warm white, Manrope, clay/sage/slate; InfoStyle `scandi` adapted).
- Published style pack **`industrial-power`** (graphite stage, signal yellow, dense-tile + gap 0; InfoStyle `industrial` adapted).
- Published style pack **`vintage-gold`** (aged paper, Playfair, sparing gold frames; InfoStyle `vintage` adapted — no fake seals).
- Published style pack **`eco-botanical`** (kraft paper, leaf/clay/honey; InfoStyle `eco` adapted — no greenwashing seals).
- Published style pack **`clinical-minimal`** (cool light stage, Manrope, steel/teal; InfoStyle `clinical` adapted — no medical claims).
- Published style pack **`soft-editorial`** (warm paper journal, Playfair, terracotta/sage; InfoStyle `catalog` adapted).
- Dense-tile composition + optional `spacing.gap` (`--sp-gap`); `blueprint-grid` proof with flush mosaic (not a global 0px default).
- Locked **approved style authoring queue** (14 packs) in ROADMAP; started with InfoStyle adaptations.
- Published style pack **`warm-premium`** (warm dark stage, Playfair, gold/blush/sage; InfoStyle `premium` adapted).
- Published style pack **`blueprint-grid`** (graphite stage, cyan coordinate grid, Roboto Mono; InfoStyle `blueprint` adapted).
- Published style pack **`streetwear`** (peach ground, Unbounded, coral/lime/violet; InfoStyle `market` adapted).
- Published style pack **`neon-tech`** (dark stage, lime/cyan/magenta signals, Unbounded; adapted from owned InfoStyle neon).
- Published style pack **`glassmorphism`** (frosted panels, blur, light border, navy + violet/cyan orbs).
- Published style pack **`neumorphism`** (ground-matched fills, paired soft shadows, inset pressed).
- Published style pack **`claymorphism`** (pastel soft volume, dual shadows, split radii) + research note; Studio style list uses mini layout thumbs instead of flat color squares.
- System session history: save / restore / delete tweak variants per style (sessionStorage for the browser tab).

### Changed

- Studio shell is viewport-locked: toolbar / sidebar / **Система** stay put while only the preview scrolls; System docks beside preview (Bootstrap-like token tweaks: palette, Cyrillic Google Fonts, H1–body px, separate button/card radius).
- Handoff prompt is **style-only**: no template section outline / demo block order (structure stays in the user’s agent chat; Studio template remains preview-only).

### Added

- R4 System drawer live tweaks: Accent / Font / Radius / Container → preview + composed prompt appendix; optional token fields `accentSecondary`, `shadowInset`, `blur` for Neu/Clay/Glass packs; import map from owned dizain-prompty catalog.
- R3 atmosphere polish: store vs corporate media mocks, product prices / news list styling via tokens (no new block types).
- R3 templates: `product-catalog` (store cards) + `corporate-blog` (company + news); prompt modal clarifies AI text vs ZIP files.
- Studio **prompt composer v1** (R2.7): optional product brief + assembled Role/Product/Template/Style/Checklist prompt; section chips + character count.
- Research freeze: competitive prompt landscape (DP, VibePrompt, shadcn, Shipper, UIDrop, RampStack, …) → ROADMAP **R2.7**.
- Studio UX: right **Система** drawer over preview for system summary + tweak scaffold; left sidebar stays Template|Style selection only.
- Studio UX foundation (R2.6): Template|Style sidebar tabs, prompt modal with visible text, Lucide + hints, nav/home ESSENCE copy; Style tweak scaffold (disabled until R4).
- Dual handoff: Agent + Constructor prompts (RU+EN), ADR-0011; Free pack includes constructor prompts.
- SaaS landing fidelity: typical product chrome (nav, dual CTA, token-driven media frame, email form) on `saas-landing`.
- Studio shell UX: left style sidebar + right live landing (DesignPrompts-like layout pattern; original Atlas content).
- R2 Multi-style compare: published `midnight-console` + `poster-brutal` (original packs), shared `saas-landing` preview across looks.
- R1 Template × Style Fast Path: `content/templates/saas-landing`, `/studio` (preview + copy prompts RU/EN + Free ZIP), home/nav reoriented to Studio.
- PHASE 7 Design Pack & Export Engine: `src/features/export`, Free ZIP API/CLI, internal Full pack, entitlements, ADR-0008, export skills.
- PHASE 6 Swiss International reference package (v1.0.0): research, full export docs, RU/EN prompts, STYLE-REVIEW.
- PHASE 5 Demo Landing Engine: compositions, section renderer, `/demo/[styleId]`, expanded Swiss draft landing.
- PHASE 4 Visual Playground: scoped `StylePreviewFrame`, interactive groups, `/playground/[styleId]`.
- PHASE 3 Content Engine: Zod schemas, style loader/registry/validator, `pnpm content:validate`, draft `swiss-international` fixture.
- PHASE 2 Core Design System: `design/system/tokens.json`, editorial UI primitives, layout chrome, `/design-system`.
- Bootstrap репозитория: Next.js App Router, TypeScript strict, Tailwind v4, Zod, Vitest (зависимости).
- Phase 1 документация: `docs/`, ADR `0001–0007`, шаблоны в `docs/templates/`, governance в `AGENTS.md`.
- Devlog: `docs/devlog/`.

### Changed

- **Product Direction Correction (PHASE 6.5 / R0):** Visual Style Library + Prompt Generator; Template × Style preview; No Learning Required. ADR-0009, ADR-0010. Language: UI/demo RU; prompts RU+EN; technical docs EN. Related inspiration: designprompts.dev, wangpf1129/design-prompts (not forks).
- ROADMAP rewritten to R0–R5; encyclopedia-primary UX retired.
- `swiss-international` → status `published` after Final Acceptance (2026-11-09); Style Review Score 50/50.
- Responsive accept fixes: site header wrap, playground flex-wrap/clip, display/heading overflow-wrap.
- `README.md` заменён с шаблона create-next-app на описание Design Atlas.
- Оболочка использует Source Serif 4 / Source Sans 3 вместо Geist Sans.
- `DATA_CONTRACTS.md` / `CONTENT_MODEL.md` приведены к модели `style.json` + tokens в `content/styles/<id>/`.

### Notes

- Next: **R3 Template library** (`online-store`, `portfolio`). Playwright e2e — later.

## [0.1.0] - 2026-11-09

### Added

- Начальный каркас приложения (`src/app/`) от create-next-app.

[Unreleased]: https://github.com/example/design-atlas/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/example/design-atlas/releases/tag/v0.1.0
