# ESSENCE — Design Atlas (locked)

> **Status:** Locked product north star · 2026-11-09  
> **Change policy:** explicit human approval + ADR. Do not “softly reinterpret.”  
> **Canonical long form:** [PRODUCT.md](PRODUCT.md) · [ADR-0011](decisions/ADR-0011-dual-prompt-surfaces.md) · [ADR-0012](decisions/ADR-0012-cards-surface.md)

## Brand (product UI)

- Product name: **Дизайн Атлас**
- Marketing H1: **Анти ИИ-слоп**
- Primary surface: web design systems (Studio)
- Secondary surface on the same domain: marketplace **card** styles (`/cards`) — [ADR-0012](decisions/ADR-0012-cards-surface.md)

## One sentence

**DESIGN ATLAS is not a site constructor.** It is a library of ready **design systems**: the user picks a system, sees it on a simple landing, then takes **Agent + Constructor prompts** so **Cursor or a Tilda-class agent** builds their unique project elsewhere. A second, lighter loop exists for **product-card** visual styles → image-gen prompts → generate elsewhere ([ADR-0012](decisions/ADR-0012-cards-surface.md)); that loop must not dilute Studio.

## Pain

Page builders (Tilda, LPmotor, Creatium, Kraftum, …) give **blocks**, not a coherent ready design system. Coding agents get vague “make it nice” briefs. People need a **chosen system** they can hand off.

## Promise

1. Many design systems (light / dark / stylistic).
2. Put one on a simple landing → **see** it.
3. Optional light tweaks later (not required).
4. Leave with prompts for:
   - **AI coding agent** (Cursor, …)
   - **Constructor / constructor agent** (Tilda, LPmotor, Creatium, Kraftum, …)

## Hard bans (product)

| We are | We are not |
|--------|------------|
| Design-system library | Another Tilda / block canvas |
| Dual prompt bridge | Site hosting / final site builder |
| Preview of the system | Encyclopedia / design course |

## Loop

```
pick template → pick design system → preview → get dual prompts (+ pack) → build elsewhere
```

## Studio IA (product UI)

Studio is the handoff surface, not a site builder:

- **Left:** tabs **Шаблон** | **Стиль** — selection only (lists). Inspired by DesignPrompts Builder Template/Look, without Blocks/Layers.
- **Center:** live landing preview.
- **Right drawer «Система»:** summary + future light tweaks (accent / font / radius), opens over the preview — keeps the style catalog free when the library grows.
- **Получить промпт** opens a modal with the full prompt text visible — **visual system only** (tokens, type, radius, atmosphere). Page block order belongs to the user’s agent chat, not the Atlas prompt. Template in Studio is for preview.

## Agent reminder

If a task starts turning Atlas into an in-product page builder, stop and re-read this file.
