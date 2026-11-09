# Prompt · kinetic

Implement an interface in the **Kinetic** style using the DESIGN ATLAS system.

## Context

- Kinetic: black stage, giant uppercase Inter, one orange signal, type as motion.
- Page structure comes from the user’s chat — this prompt is visual system only.

## Mandatory tokens

- background `#0A0A0B`, surface `#121214`, text `#F4F5F6`, muted `#8A8D93`
- primary/accent `#FF5E00`, accentSecondary `#FFFFFF`, border `#26282C`
- radius `0px` everywhere; borderWidth `1px`; shadow `none`
- container `1200px`; display `57px`; fonts: Inter (+ Unbounded optional)

Motion: marquee / wipe on display only; do not animate body. Respect `prefers-reduced-motion`.

## Bans

- Soft clay / glass / aurora
- Multi-neon
- Animating long paragraphs
- A second “taste” palette

## Acceptance

1. Black + orange block + uppercase grotesk read immediately.
2. Radius 0; body still.
3. Values match `tokens.json`.
4. User structure is not rewritten.
