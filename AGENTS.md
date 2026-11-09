<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — AI agent governance

## Mission

Design Atlas is a **design-system library + dual prompt bridge** (AI coding agents **and** page-constructor agents). It is **not** a site constructor. Coding agents in this repo implement Atlas from specs — they do not invent a parallel architecture.

**Locked essence:** [docs/ESSENCE.md](docs/ESSENCE.md)  
Core flow: **Template × Style → Preview → Dual Prompt (Agent + Constructor, RU+EN) → Export → build elsewhere**. Principles: **Visual first · Build elsewhere · Dual handoff · No Learning Required**.

## Source of truth

| Area | Document |
|------|----------|
| Essence (locked) | [docs/ESSENCE.md](docs/ESSENCE.md) |
| Product | [docs/PRODUCT.md](docs/PRODUCT.md) |
| Architecture | [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) |
| Content | [docs/CONTENT_MODEL.md](docs/CONTENT_MODEL.md) |
| Data contracts | [docs/DATA_CONTRACTS.md](docs/DATA_CONTRACTS.md) |
| Design system | [docs/DESIGN_SYSTEM.md](docs/DESIGN_SYSTEM.md) |
| Export | [docs/EXPORT_FORMAT.md](docs/EXPORT_FORMAT.md), [docs/PRODUCT_ENTITLEMENTS.md](docs/PRODUCT_ENTITLEMENTS.md), [docs/EXPORT_SECURITY.md](docs/EXPORT_SECURITY.md) |
| Workflow | [docs/AGENT_WORKFLOW.md](docs/AGENT_WORKFLOW.md) |
| Decisions | [docs/decisions/](docs/decisions/) |
| Roadmap | [docs/ROADMAP.md](docs/ROADMAP.md) |
| Devlog | [docs/devlog/](docs/devlog/) |

**Ban:** no DB, CMS, microservices, GraphQL, or separate content repos without a new ADR and explicit human request.

## Architecture constraints

- **Modular monolith:** one Next.js app, logical modules under `src/`.
- **Content in Git:** JSON/MDX/Markdown in `content/`; **no DB in v1**.
- **Stack:** Next.js App Router, React, TS strict, Tailwind v4, CSS variables, Radix as needed, Lucide, Motion sparingly, Zod, Vitest; Playwright later; pnpm; CI GitHub Actions.
- **IDs:** language-independent (`swiss-international`, kebab-case).
- **Primary UX:** template + style preview + prompts/export — not an encyclopedia study path.
- **Playground component matrix:** secondary QA, not the main funnel.
- **PHASE 7 commerce expansion:** frozen until ROADMAP R1.

Before Next.js edits — guides in `node_modules/next/dist/docs/`.

## Language policy

- Product UI + demo/template copy: **Russian**
- Agent prompts: **Russian and English**
- Technical documentation: **English**
- See [ADR-0010](docs/decisions/ADR-0010-russian-only-locale.md)

## Content rules

- No template “AI slop”.
- Validate structured data with Zod; schemas stay aligned with [docs/DATA_CONTRACTS.md](docs/DATA_CONTRACTS.md).
- Slug and id are never translated (ADR-0006).

## Правила разработки

- Минимальный diff; следовать существующим конвенциям файла.
- `@/*` → `src/*`.
- Не коммитить секреты, `.env`, артефакты сборки.
- Новые зависимости — обоснование в PR; предпочитать уже заявленный стек.
- Breaking changes в JSON-контрактах — версия поля или ADR + миграционная заметка.

## Тесты (требования)

See [docs/TESTING.md](docs/TESTING.md).

| Level | When required |
|-------|----------------|
| Vitest | Utils, parsers, Zod, export pipeline |
| RTL | React components with non-trivial logic |
| Playwright | Later — critical user flows |

Before handoff: `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm test` (when script exists).

## Bans

1. Invent architecture not described in `docs/` and ADR.
2. Add DB, headless CMS, or external content store in v1.
3. Mass-generate content without human/content review.
4. Duplicate design tokens outside agreed paths (`design/`, app theme).
5. Ignore a11y for interactive UI.
6. Force-push `main` or disable hooks without explicit request.
7. Build encyclopedia / mandatory “learn design” UX as the primary product path.
8. Drop EN prompts from packs, or force English-only product UI, without ADR.
9. Copy DesignPrompts or third-party packs (code, texts, style names, graphics) without rights — product reference only; build an original library.

## Verification order

1. Read relevant `docs/` and ADR.
2. PLAN — scope via [docs/templates/TASK-TEMPLATE.md](docs/templates/TASK-TEMPLATE.md).
3. IMPLEMENT — code/content per contracts.
4. TEST — lint, types, tests.
5. REVIEW — CONTRIBUTING + STYLE/CONTENT as needed.
6. DOCUMENT — docs, CHANGELOG, ADR on architecture shifts.
7. ACCEPT — [docs/templates/AGENT-REPORT.md](docs/templates/AGENT-REPORT.md).

## Agent roles

| Role | Focus |
|------|--------|
| Planner | Scope, risks, docs/ADR links |
| Implementer | Code, content, tokens |
| Tester | Vitest, types, future e2e |
| Documenter | docs/, CHANGELOG, ADR |
| Reviewer | Bans, quality, DoD |

Phases PLAN→…→ACCEPT are mandatory.

## Workflow

```
PLAN → IMPLEMENT → TEST → REVIEW → DOCUMENT → ACCEPT
```

Details: [docs/AGENT_WORKFLOW.md](docs/AGENT_WORKFLOW.md).

## Reporting

On task completion — fill [docs/templates/AGENT-REPORT.md](docs/templates/AGENT-REPORT.md) in the reply or PR.
