# Dizain-prompty → Atlas System (import map)

- **Date:** 2026-11-09
- **Source (owned):** https://ztim2008.github.io/dizain-prompty/
- **Status:** working map for R4 System + future style packs
- **Ban:** do not scrape third-party DesignPrompts; this map is from the author’s own catalog.

## What we take 100%

| Dizain-prompty surface | Atlas home |
|------------------------|------------|
| Style page: definition + when it fits | `style.json` narrative + `bestUseCases` / `avoidFor` |
| Palette + Cyrillic fonts | `tokens.json` colors + typography |
| Style rules (radius, dual shadow, inset, paste colors) | `tokens.json` geometry/effects + `rules.md` / prompts |
| Universal / Tilda / Figma prompts | Agent + Constructor prompts (RU+EN), ADR-0011 |
| Generator: niche + style + accent | Studio brief + **Система** overrides (accent/font/radius/width) |
| Live mini-preview of the *system* (not a page builder) | Studio preview + System drawer |

## What we do **not** take into Studio

- Block/layout constructor, freeform grid editor, breakpoint page builder
- Hardcoded niche landing copy as product SSOT (templates stay separate RU demos)
- One global token set for all styles

## Why System must be richer than Accent/Font/Radius

Complex looks (Neumorphism, Claymorphism, Glassmorphism) are not “another hex”:

| Style family | Token / rule needs |
|--------------|--------------------|
| Neumorphism | Same fill as background; **paired** light + dark soft shadows; optional inset pressed state; low border contrast |
| Claymorphism | Large radius (28–36px); pastel dual shadow (outer tinted + inner light); plump buttons; optional secondary accent |
| Glassmorphism | Surface alpha + **blur**; light border; soft elevation shadow |
| Swiss / brutal / industrial | Often `shadow: none` or hard offset; radius 0; strong border width |
| Editorial / magazine | Narrower or wider `spacing.container`; type scale does more work than cards |

`effects.shadow` stays a CSS `box-shadow` string (can already hold multi-layer stacks). R4 adds optional `shadowInset` / `blur` / `accentSecondary` so packs can express Neu/Clay/Glass without inventing a layout engine.

Grid and site width stay **tokens**, not a builder: `spacing.container` + spacing unit. Templates choose section *atmosphere*; styles choose how wide and soft the system feels.

## Catalog → kebab-case style ids (backlog)

| Source slug | Planned Atlas `id` | Priority |
|-------------|--------------------|----------|
| claymorphism | `claymorphism` | done |
| neumorphism | `neumorphism` | done |
| glassmorphism | `glassmorphism` | done |
| dark-tech-neon | `neon-tech` | done (Atlas id) |
| neo-brutalism | `neo-brutalism` | done #10 (≠ `poster-brutal`) |
| swiss-minimalizm | `swiss-international` | done (reference) |
| bento-grid | `bento-grid` | queue #14 (atmosphere only) |
| aurora-mesh-gradient | `aurora-mesh` | done #11 |
| y2k | `y2k` | done #12 |
| retro-terminal | `retro-terminal` | done #13 |
| journal layout | `soft-editorial` | queue #4 (InfoStyle `catalog`) |
| InfoStyle RU set | see ROADMAP queue #1–9 | locked 2026-11-09 |

**Locked authoring queue:** [docs/ROADMAP.md](../ROADMAP.md) — Approved style authoring queue.

Authoring order: research note → tokens/effects → prompts RU+EN + constructor → STYLE-REVIEW → publish.

## System drawer (R4) contract

Live overrides (session-only, not persisted to Git):

1. **Accent** — feeds `--sp-color-accent` + prompt appendix  
2. **Heading font** — feeds `--sp-font-heading` (+ body if user links them)  
3. **Radius** — feeds `--sp-radius`  
4. **Container width** — feeds `--sp-size-container`  

Overrides append a short **Система** note into the composed handoff prompt so Cursor / constructor agents see the same numbers as the preview.

## Out of scope here

- Mass-publishing all catalog styles in one PR  
- Payment / Full pack commerce (R5)  
- Changing ESSENCE (Atlas remains build-elsewhere)
