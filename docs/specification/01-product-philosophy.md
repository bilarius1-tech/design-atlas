# Part I. Product philosophy

> **Locked essence:** [docs/ESSENCE.md](../ESSENCE.md)  
> **Canonical product:** [docs/PRODUCT.md](../PRODUCT.md)  
> **Decisions:** [ADR-0009](../decisions/ADR-0009-template-style-preview-prompt.md), [ADR-0011](../decisions/ADR-0011-dual-prompt-surfaces.md), [ADR-0010](../decisions/ADR-0010-russian-only-locale.md)  
> This file is a short pointer. Do not maintain a second conflicting philosophy here.

## Mission

Design-system library + dual prompt bridge (AI coding agents **and** page-constructor agents).  
**Not** a site constructor / Tilda clone.

Core flow: **Template × Style → Preview → Dual Prompt (Agent + Constructor, RU+EN) → Export → build elsewhere**.

## Inspiration

- [designprompts.dev](https://designprompts.dev/) — pick look → prompt → agent (reference only; no copy)
- Open agent packs (e.g. wangpf1129/design-prompts) — structure inspiration only

Design Atlas differentiator: live Template×Style preview + dual handoff + Design Pack.

## Language

| Surface | Language |
|---------|----------|
| Product UI + demo copy | Russian |
| Agent + Constructor prompts | Russian **and** English |
| Technical docs | English |
