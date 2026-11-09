# Prompt · neumorphism

Implement an interface in the **Neumorphism** style using the DESIGN ATLAS system.

## Context

- Extruded soft UI: fill ≈ background; volume only from paired soft shadows.
- Type: Manrope (Cyrillic); Inter as fallback.
- Original DESIGN ATLAS pack. Page structure comes from the user’s chat — this prompt is visual system only.

## Mandatory tokens

Use values only from `tokens.json` / `TOKENS.md`:

- background/surface `#E6EBF2`, text `#2E3440`, muted `#6B7380`
- primary/accent `#3D5AFE`, border `#D7DDE6` (near-invisible)
- radius `16px`, radiusButton `16px`, radiusCard `20px`, borderWidth `0px`
- shadow `8px 8px 16px #C3CAD5, -8px -8px 16px #FFFFFF`
- shadowInset `inset 6px 6px 12px #C3CAD5, inset -6px -6px 12px #FFFFFF`
- spacing unit `8`, section `96px`, container `1120px`
- type: base 16 / 2xl 36 / display 57; font Manrope

## Layout

1. Cards and panels match the page ground.
2. Hero without collage; accent only on CTAs.
3. Pressed/active via inset shadow.
4. Do not reshuffle the user’s sections.

## Bans

- Clay multi-pastel volume
- Neo-brutal hard offsets
- Neon / dark console drift
- Inter-only silent default
- Strong frames instead of shadows

## Acceptance

1. Fills match the ground; volume reads through shadow.
2. Accent stays on controls.
3. Values match `tokens.json` one-to-one.
4. Text and button contrast verified.
5. Realistic copy — no lorem.
