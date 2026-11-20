# Changelog

Формат основан на [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/),
версионирование — [Semantic Versioning](https://semver.org/lang/ru/).

## [Unreleased]

### Added

- Self-contained design spec: Studio copy, ZIP (`DESIGN-SPEC.ru.md` / `.en.md`, same text as the prompt files), `GET /api/v1/styles/:id/design-spec`, and MCP tool `get_design_spec` share one generator. The text tells the agent to apply the system to the current project and create local token files; no extra DESIGN.md / pack / site reading is required.
- Token alignment check (`pnpm content:align`, also part of `pnpm content:validate`) so typography sizes in markdown stay in sync with `tokens.json`.
- Open Graph image `/og.png`; Yandex rule in `robots.txt`; optional `NEXT_PUBLIC_YANDEX_VERIFICATION`.
- Meaningful `alt` text on Cards gallery images.

### Changed

- Studio handoff prompts now include full tokens, typography, components, do/don't, and a ban on Google Fonts / external CDNs.
- Nav labels: «Дизайн-система», «Песочница», «Примеры». Removed leftover «PHASE 4/5» eyebrow text.
- README, `llms.txt`, MCP docs, and API docs point only at https://design.vaybik.ru and document MCP setup.

- Self-host on the Vaybik VPS at https://design.vaybik.ru: production Dockerfile (Next standalone), Compose with Traefik labels, `scripts/deploy.sh` / `make deploy`. See [docs/DEPLOY.md](docs/DEPLOY.md).

- Stdio MCP server `packages/mcp` over `/api/v1` (default base `https://design.vaybik.ru`, override `DESIGN_ATLAS_API_BASE`). Example Cursor config: `packages/mcp/mcp.json.example` and `.cursor/mcp.json.example`.
- Public read-only JSON API `/api/v1` (styles, shell tokens, theme `vaybik`, components, templates, search). ZIP `/api/export` is unchanged.
- Project theme `vaybik` (`design/themes/vaybik/`) from the live vaybik.ru homepage CSS (20 Nov 2026 MSK), with source notes and a swatch on `/design-system`. Not applied to the Atlas shell.
- Shell design system: icon size tokens; full states for existing primitives; Link, Checkbox, Radio, Switch, Select, Tabs, Tooltip; component specs and `design/components/catalog.json`; expanded `/design-system` gallery.
- Docs: сервис бесплатный и публичный; целевой домен `design.vaybik.ru`; чеклист фазы 5 в `docs/PHASE5_CUTOVER.md`. README и витрина `/design-system` больше не утверждают, что каталог и публичные страницы «ещё не сделаны».
- Spare Vercel URL: https://design-atlas-wine.vercel.app (team `bill`). Current production is the VPS; see [docs/DEPLOY.md](docs/DEPLOY.md).
- Brand home: H1 **Анти ИИ-слоп**, product name **Дизайн Атлас**; dual CTAs Studio (primary) + Cards.
- Cards surface `/cards` + `content/card-styles/` (8 styles from stil) with live preview and RU/EN image-gen prompts ([ADR-0012](docs/decisions/ADR-0012-cards-surface.md)).
- SEO / AI discovery: `sitemap.xml`, `robots.txt`, root `metadataBase` + OG/Twitter, JSON-LD on `/` and `/cards`, `public/llms.txt` ([docs/SEO.md](docs/SEO.md)).
- Published style pack **`bento-grid`** (light-gray tiles, gap 16px, blue/yellow accents; atmosphere only — no Studio grid editor).
- Published style pack **`material-design-3`** (Material You tonal surfaces, primary seed `#6750A4`, Roboto).
- Published style pack **`apple-materials`** (HIG-like gray stage, system blue `#0071E3`, Inter as SF stand-in).
- Published style pack **`kinetic`** (black stage, Inter uppercase, orange signal, marquee grammar; Atlas-original, DP visual direction only).
- Published style pack **`retro-terminal`** (CRT black, phosphor mono, amber CTAs, scanlines; dizain-prompty adapted).

### Changed

- Production host is the VPS behind Traefik; Vercel (`design-atlas-wine.vercel.app`) is kept only as a spare.

- Studio preview buttons denser: `min-height` `unit × 7` (56px at unit 8) instead of `× 10`.
- `pnpm typecheck` runs `next typegen` first so CI gets `LayoutProps` / route types without a prior build.
- **Button radius policy:** pill `999px` by default across styles; sharp exceptions only for kinetic / retro-terminal / neo-brutal / poster-brutal / swiss / industrial / blueprint (`docs/research/button-radius-policy.md`).
- **`claymorphism` v1.1.0** — multi-pastel kid clay (pink/mint/sky/cream), card radius 38px, dual-shadow preview polish.
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
