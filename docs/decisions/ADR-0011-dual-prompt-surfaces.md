# ADR-0011: Dual prompt surfaces (agent + constructor)

- **Status:** Accepted
- **Date:** 2026-11-09
- **Related:** [PRODUCT.md](../PRODUCT.md), [ADR-0009](ADR-0009-template-style-preview-prompt.md), [ADR-0010](ADR-0010-russian-only-locale.md)

## Context

Users choose a ready **design system** in DESIGN ATLAS and build the actual site elsewhere. Two common builders:

1. AI coding agents (Cursor and similar)
2. Page constructors / their agents (Tilda, LPmotor, Creatium, Kraftum, …)

Atlas is **not** a page constructor. One prompt surface is not enough if the product promise is “take this system and build elsewhere.”

## Decision

Every published style ships **two prompt surfaces**, each in **RU and EN**:

| Surface | Files | Audience |
|---------|-------|----------|
| Agent | `prompt.ru.md`, `prompt.en.md` | Coding agents implementing UI from tokens/rules |
| Constructor | `prompt.constructor.ru.md`, `prompt.constructor.en.md` | Humans / constructor agents assembling blocks in page builders |

Constructor prompts are **generic** for v1 (not a separate Tilda-only dialect). They must include: palette, type, radius, shadow, density, bans, and how to map the system onto common landing blocks (header, hero, cards, forms, buttons, FAQ).

Free Design Pack includes all four prompt files under `prompts/`.

## Consequences

- Studio exposes **Агент** and **Конструктор** handoff actions.
- Content validation treats constructor prompts as required for `published` / `review` (same bar as agent prompts).
- Product docs state dual handoff explicitly; Atlas remains a design-system library + prompt bridge, not a block editor.
