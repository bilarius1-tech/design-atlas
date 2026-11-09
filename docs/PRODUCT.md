# PRODUCT — Design Atlas

## 0. Essence (locked)

**Short lock:** [ESSENCE.md](ESSENCE.md)

DESIGN ATLAS is **not** a site constructor. Users pick a ready **design system**, preview it on a simple landing, then take **Agent + Constructor** prompts so **Cursor or a Tilda-class agent** builds the unique project **elsewhere**.

## 1. What we build

**DESIGN ATLAS** is a **visual design-system library** and **dual prompt generator**.

The product helps users pick a ready design system, preview it on a simple page template (SaaS landing, later store/portfolio), then hand precise instructions to **whoever builds the real project elsewhere**:

- an **AI coding agent** (Cursor and similar), and/or
- a **page constructor / constructor agent** (Tilda, LPmotor, Creatium, Kraftum, and similar).

Atlas does **not** assemble the final site. It selects and explains the system; the builder (agent or constructor) applies it to the user’s unique project.

### Language policy

| Surface | Language |
|---------|----------|
| Product UI | Russian |
| Demo / template copy | Russian |
| Agent prompts | **Russian and English** |
| Constructor prompts | **Russian and English** |
| Technical docs (`docs/`, ADR) | **English** |

See [ADR-0010](decisions/ADR-0010-russian-only-locale.md), [ADR-0011](decisions/ADR-0011-dual-prompt-surfaces.md).

## 2. What we do NOT build

DESIGN ATLAS is not:

- another Tilda / LPmotor / Creatium / Kraftum (no block canvas, no site hosting);
- an educational platform or UX/UI course;
- a design encyclopedia users must study;
- a full visual editor or design-system constructor UI;
- a site-audit tool;
- a marketplace of finished sites.

Users must not need to “learn design” to get a result.

## 3. Core scenario

```
SELECT TEMPLATE → SELECT STYLE → PREVIEW → OPTIONAL CUSTOMIZE → GET PROMPT(S) → BUILD ELSEWHERE
```

Target time: a few minutes. Live preview proves the look before handoff.

## 3.1 One product concept

Everything serves this loop:

**see a visual design system on a typical landing → get Agent + Constructor prompts (+ files) → build the unique project in another tool.**

Playground, docs, export, tokens, and research exist only to support that path.

## 3.2 Pain we solve

Page constructors give **blocks**, not a coherent ready **design system**. Users waste time reinventing palette, type, radius, and component rules inside Tilda-class tools or rewriting vague prompts for agents.

Atlas ships many ready systems (light/dark/stylistic). The user picks one, sees it on a simple landing, optionally tweaks basics later, and leaves with prompts that another agent or constructor can follow.

## 3.3 Product reference (no copying)

[designprompts.dev](https://designprompts.dev/) is a **product reference** for selection → preview → prompt flow only.

We **do not** copy without rights: code, marketing/prompt texts, style names, graphics, or assets. DESIGN ATLAS builds an **original** library.

**Differentiator:** live Template × Style preview + **dual handoff** (agent + constructor, RU+EN) + Free Design Pack. Not a CSS framework or drop-in UI kit.

## 4. Core value

Fast visual direction + accurate dual prompts so the built UI matches the chosen system — whether the builder is Cursor or a constructor agent.

## 5. Product principles

1. **Visual First** — see first, then choose.
2. **Fast Selection** — minimal steps to a result.
3. **Same Content, Different Looks** — one template, many systems on the same content.
4. **Build Elsewhere** — Atlas selects the system; construction happens outside.
5. **Dual Handoff** — Agent prompt + Constructor prompt (RU + EN each).
6. **Prompt Quality** — concrete instructions, not vague vibes.
7. **Optional Customization** — basic tweaks allowed, never required.
8. **No Learning Required** — no mandatory lessons.
9. **Commercial Ready** — architecture ready for Style Packs (payments later).

## 6. Main modules

| Module | Role |
|--------|------|
| Page Templates | Simple page types (SaaS, store, portfolio…) as system showcases |
| Visual Styles | Design-systems library |
| Live Preview | Template × Style → live landing |
| Style Customizer | Optional basics (later) |
| Prompt Generator | Agent + Constructor prompts (RU + EN) |
| Design Pack Export | ZIP of style materials |

## 7. Primary content unit

**Visual Style** — a design system (tokens, type, composition, components, agent + constructor prompts, DESIGN.md, preview).

**Page Template** — page structure + neutral demo copy (Russian). Not a style.

## 8. Architecture principle

```
CONTENT DATA + STYLE TOKENS + TEMPLATE STRUCTURE
  → STYLE RENDERER → VISUAL PREVIEW → PROMPT / EXPORT
```

Do not hand-build a unique site for every template×style pair.

Details: [ADR-0009](decisions/ADR-0009-template-style-preview-prompt.md), [ADR-0011](decisions/ADR-0011-dual-prompt-surfaces.md), [ARCHITECTURE.md](ARCHITECTURE.md).

## 9. Commercial direction

**Now:** free library, previews, dual prompts (RU+EN), Free Design Pack.

**Later:** paid Style Packs, full systems, Premium Gallery, Agent Skills, MCP.

No payment system until a dedicated product decision.

## 10. Quality bar

A user must be able to:

1. open the product;
2. pick a template;
3. pick a design system;
4. see it on a recognizable landing;
5. copy Agent and/or Constructor prompts (RU + EN);
6. give them to Cursor **or** a constructor agent;
7. get an implementation that matches the preview.

If the UI forces long design study, dozens of knobs, or building the final site inside Atlas — the product has drifted.

## Glossary

| Term | Meaning |
|------|---------|
| Visual Style / Design system | System in `content/styles/<id>/` |
| Page Template | Page type in `content/templates/<id>/` |
| Preview | Live render of template in a style |
| Agent prompt | Instructions for coding agents |
| Constructor prompt | Instructions for page-builder / constructor agents |
| Design Pack | ZIP export of style materials |
| App shell | Product chrome (not catalog style) |
