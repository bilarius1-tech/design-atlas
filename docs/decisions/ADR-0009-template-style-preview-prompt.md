# ADR-0009: Template / Style / Preview / Prompt / Export separation

- **Status:** Accepted
- **Date:** 2026-11-09
- **Related:** [PRODUCT.md](../PRODUCT.md), [ADR-0003](ADR-0003-style-rendering.md), [ADR-0008](ADR-0008-design-pack-export-engine.md), [ADR-0010](ADR-0010-russian-only-locale.md)

## Context

The product moves from a “design encyclopedia” to a DesignPrompts-like flow: pick a **page template** and a **visual style**, preview the style on that template, then get prompts and a file pack. Page structure must not be mixed into style tokens, and every template×style pair must not be hand-built.

## Options considered

1. Keep `demo.json` inside each style — duplicates content; blocks Same Content, Different Looks.
2. **Split Template and Style**; a renderer builds preview from the id pair.
3. Static HTML per pair — does not scale.

## Decision

| Entity | Responsibility | Location |
|--------|----------------|----------|
| Page Template | Sections, order, neutral RU demo copy | `content/templates/<id>/` |
| Visual Style | Tokens, rules, prompts, DESIGN.md | `content/styles/<id>/` (existing) |
| Style Renderer | Template + Style → DOM | evolve demo-landing + StylePreviewFrame |
| Prompt (agent) | Coding-agent instructions | `prompt.ru.md` **and** `prompt.en.md` |
| Prompt (constructor) | Page-builder / constructor-agent instructions | `prompt.constructor.ru.md` **and** `prompt.constructor.en.md` ([ADR-0011](ADR-0011-dual-prompt-surfaces.md)) |
| Design Pack | ZIP | `src/features/export` |

Initial template ids: `saas-landing`, `online-store`, `portfolio`.

Rule: **do not** ship a separately hand-built site for every template×style pair.

Migration: `content/styles/*/demo.json` is interim until content moves into templates (R1/R3).

## Future (not R0/R1)

Optional packaging of style references as an **Agent Skill** (installable skill + `references/`), similar in spirit to open projects like wangpf1129/design-prompts — without copying their content. Live Template×Style preview remains the product differentiator.

## Consequences

- Pros: compare styles on one template; clear UX; reusable renderer.
- Cons: new template schema + demo migration.
- PHASE 6.5 / R0 is docs-only; no code rewrite in this phase.
