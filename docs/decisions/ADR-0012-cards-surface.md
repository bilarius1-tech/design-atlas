# ADR-0012: Cards surface under Design Atlas umbrella

- **Status:** Accepted
- **Date:** 2026-11-09
- **Related:** [ESSENCE.md](../ESSENCE.md), [PRODUCT.md](../PRODUCT.md), [ADR-0002](ADR-0002-content-storage.md), [ADR-0011](ADR-0011-dual-prompt-surfaces.md)

## Context

Design Atlas ships web design systems (Studio: Template × Style → dual Agent/Constructor prompts → build elsewhere). A separate prototype (`stil`) ships **marketplace product-card** visual styles with image-generation prompts (RU+EN) for external generators.

Both share “pick a visual language → preview → copy prompt → build elsewhere,” but **prompt audiences and content models differ**. Merging card prompts into `content/styles/` would corrupt the web SSOT and Studio contracts.

Product brand on the marketing surface: **Анти ИИ-слоп** (H1) under the product name **Дизайн Атлас**. Sites/Studio remain the primary funnel; cards are secondary on the **same domain**.

## Decision

1. **Umbrella:** One Next.js app / one domain. Product name **Дизайн Атлас**; homepage H1 **Анти ИИ-слоп**.
2. **Surface A (primary):** Web design systems → `/studio` + `content/styles/<id>/` — ESSENCE loop unchanged.
3. **Surface B (secondary):** Marketplace card styles → **`/cards`** + **`content/card-styles/<id>/`** (Git SSOT, Zod-validated). Image-gen prompts RU+EN; generation happens **outside** Atlas.
4. **IDs:** Card style ids are kebab-case and **namespaced** (`card-blueprint`, …). They are not aliases of web style ids.
5. **Bans:** Do not store card image-gen prompts in `content/styles/`. Do not turn Atlas into a card image generator, marketplace publisher, or site/card constructor. No separate subdomain/repo for v1.

## Consequences

- Nav and homepage expose Studio as primary CTA and `/cards` as secondary.
- Content validation covers both style lanes.
- Monetization for either surface still requires its own ADR (R5 frozen until money model).
