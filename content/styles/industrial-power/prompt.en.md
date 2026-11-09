# Prompt · industrial-power

Implement an interface in the **Industrial Power** style using the DESIGN ATLAS system.

## Context

- Brutal industrial system: graphite, signal yellow, flush dense-tile.
- Page structure comes from the user’s chat — this prompt is visual system only.

## Mandatory tokens

- background `#252522`, surface `#2F2F2B`, text `#F4F1E9`, muted `#A8A49A`
- primary `#FFC400`, accent `#FF6A00`, accentSecondary `#E55353`, border `#4A4A44`
- radius `0px`, radiusButton `2px`, radiusCard `0px`, borderWidth `1px`
- gap `0px` — dense-tile mosaic
- container `1140px`, display `57px`, base `16px`
- fonts: Oswald headings; Roboto body

Primary CTA: yellow fill with **dark** label. Features/stats = flush tiles with hairlines.

## Bans

- Soft volume / glass / warm editorial
- Fake safety seals
- Airy gutters instead of dense-tile
- A second “taste” palette

## Acceptance

1. Graphite + signal yellow + dense-tile read immediately.
2. CTA contrast holds (dark ink on yellow).
3. Values match `tokens.json`.
4. User structure is not rewritten.
