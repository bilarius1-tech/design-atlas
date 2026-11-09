# Prompt · aurora-mesh

Implement an interface in the **Aurora Mesh** style using the DESIGN ATLAS system.

## Context

- Aurora: smooth mesh gradients and glow — blurred cyan / violet / pink blooms on a night field, minimal content on top.
- Page structure comes from the user’s chat — this prompt is visual system only.
- This is **not** glassmorphism-only and **not** a neon-tech grid.

## Mandatory tokens

- background `#0B0A1F`, surface `rgba(255,255,255,0.08)`, text `#FFFFFF`, muted `rgba(255,255,255,0.72)`
- primary `#FFFFFF`, accent `#6EE7F9`, accentSecondary `#F472B6`, border `rgba(255,255,255,0.18)`
- violet `#A78BFA` — in the mesh atmosphere (radial blooms)
- radius `16px`, radiusButton `999px`, radiusCard `20px`, borderWidth `1px`
- blur `14px`; soft glow shadow; container `1120px`; display `57px`
- fonts: Manrope; Unbounded sparingly

Background: 3–4 large radial blooms with strong blur; light drift OK if `prefers-reduced-motion` is respected. Noise 3–5% is fine.

## Bans

- Neon-tech grid / hard lime outlines
- Neo-brutal hard offset
- Dense-tile
- Low-contrast type on mesh
- A second “taste” palette

## Acceptance

1. Night + soft cyan/violet/pink mesh read immediately.
2. White CTA with dark label; glass panels.
3. Values match `tokens.json`.
4. User structure is not rewritten.
