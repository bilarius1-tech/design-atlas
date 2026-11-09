# Prompt · claymorphism

Implement an interface in the **Claymorphism** style using the DESIGN ATLAS system.

## Context

- Soft clay volume: plump shapes, large radii, dual soft shadows, pastel ground.
- Cyrillic-capable type: Nunito (headings), Manrope (body).
- Original DESIGN ATLAS pack; page structure comes from the user’s chat — this prompt is visual system only.

## Mandatory tokens (do not invent replacements)

Use values only from `tokens.json` / `TOKENS.md`:

- background `#F4EEFF`, surface `#FFFCFF`, text `#2B2140`, muted `#6B5F8A`
- primary `#7C5CFF`, accent `#FFB86B`, border `#E4D9F7`
- radius `28px`, radiusButton `999px`, radiusCard `32px`, borderWidth `1px`
- shadow `10px 14px 32px rgba(124, 92, 255, 0.22)` + inset light
- spacing unit `8`, section `104px`, container `1200px`
- type scale: xs 12 / sm 14 / base 16 / lg 20 / xl 28 / 2xl 40 / display 57
- fonts: Nunito headings; Manrope body

Do not hardcode arbitrary hex when CSS variables / tokens are available.

## Layout

1. Soft vertical rhythm; cards feel inflated.
2. Hero budget: title / one paragraph / CTA — no collage or stickers on media.
3. Plump buttons; dual soft shadow on cards.
4. Do not reshape the user’s section outline — atmosphere and tokens only.

## Components

Primary = violet fill. Peach accent = secondary warmth / highlight — not large washes.
Fields on surface with the style’s radius family.

## States

Implement hover (light scale), focus-visible, disabled, loading, validation error.

## Responsive

Check 1440, 1024, 768, 390, 360. No horizontal scroll.

## Bans

- Neo-brutal hard offsets
- Dark console / neon glow
- Inter as a silent default
- Hairline cards without volume
- Fake metrics and AI-slop copy

## Acceptance

1. Ground stays pastel; text remains readable.
2. Button vs card radii follow tokens.
3. Shadow is soft dual, not a hard drop.
4. Values match `tokens.json` one-to-one.
5. Copy is realistic — no lorem.
