# Prompt · claymorphism

Implement an interface in the **Claymorphism** style using the DESIGN ATLAS system.

## Context

- Kid-friendly clay volume: plump shapes, ~38px card radius, dual soft shadow, multi-pastel pink/mint/sky/cream.
- Cyrillic-ready fonts: Nunito (headings), Manrope (body).
- Original DESIGN ATLAS pack; page structure comes from the user’s chat.

## Mandatory tokens

- background `#F1F2FA`, surface `#FFFDF7`, text `#383139`, muted `#48404B`
- primary `#F6A3CA`, accent `#C0EFDC`, accentSecondary `#C5E5FB`, border `#E8E4F2`
- radius `28px`, radiusButton `999px`, radiusCard `38px`
- dual soft shadow + inset light; container `1200px`; display `57px`
- fonts: Nunito headings; Manrope body

CTA: dark ink `#383139` on pink primary (not white on pale pink).

## Bans

- Neo-brutal hard offsets / neon glow
- Single violet wash without multi-pastel planes
- Hairline cards without volume
- A second “taste” palette

## Acceptance

1. Multi-pastel clay volume reads immediately.
2. Button/card radii match tokens; dual shadow.
3. Values match `tokens.json`.
4. User structure is not rewritten.
