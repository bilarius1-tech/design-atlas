# Prompt · vintage-gold

Implement an interface in the **Vintage Gold** style using the DESIGN ATLAS system.

## Context

- Vintage luxury: warm aged paper, Playfair, thin gold.
- Page structure comes from the user’s chat — this prompt is visual system only.
- Do not add awards, dates, seals, or logos the user did not provide.

## Mandatory tokens

- background `#E9DDC6`, surface `#F4EBDA`, text `#352A20`, muted `#6F5E4C`
- primary `#B58A45`, accent `#8A6B4B`, accentSecondary `#6F7A58`, border `#C9B896`
- radius `6px`, radiusButton `999px`, radiusCard `10px`, borderWidth `1px`
- soft shadow; container `1080px`; display `57px`; base `16px`
- fonts: Playfair Display headings; Manrope body

Gold CTAs use dark labels. Gold is lines and frames — not a full UI wash.

## Bans

- Fake awards / seals / dates / logos
- Neon / streetwear / dense-tile
- Aging product materials
- A second “taste” palette

## Acceptance

1. Paper + Playfair + sparing gold read immediately.
2. CTA contrast holds.
3. Values match `tokens.json`.
4. User structure is not rewritten.
