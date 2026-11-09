# Research notes · aurora-mesh

## Intent

Aurora / mesh-gradient system for DESIGN ATLAS — queue #11. Owned SSOT: dizain-prompty `aurora-mesh`. Adapted for **web landing / app shell** dual handoff. Soft multi-color radial blooms like northern lights — not glass-only frosted panels, not neon-tech grids.

## Traits

- Night ground `#0B0A1F` (light stage optional in prompts; Atlas default = dark for stronger aurora)
- Mesh accents: cyan `#6EE7F9`, violet `#A78BFA`, pink `#F472B6`
- 3–4 large radial blooms; CSS `blur` 40–80px; optional slow drift (respect `prefers-reduced-motion`)
- Translucent cards + light border; white pill CTA with dark ink
- Type: **Manrope** body; **Unbounded** optional display punch; Inter as Latin fallback
- Subtle noise 3–5% for depth (preview CSS)

## Differentiation

| Axis | Glassmorphism | Neon Tech | Aurora Mesh |
|------|---------------|-----------|-------------|
| Stage | Deep blue glass field | Dark + lime/cyan grid | Night + multi-hue aurora |
| Accents | Violet / cyan pair | Lime / cyan / magenta hard | Cyan / violet / pink soft blooms |
| Panels | Frosted glass hero | Solid dark cards | Soft glass over mesh |
| Motion | Static orbs | Static grid | Soft drift (optional) |

## Anti-patterns

- Hard neon outlines / streetwear acid blocks
- Neo-brutal 3px black rules + hard offset
- Flat single-hue purple SaaS defaults without mesh depth
- Dense-tile flush mosaics
- Ignoring reduced-motion when animating blooms

## Token hints

| Token | Direction |
|-------|-----------|
| colors.background | `#0B0A1F` |
| colors.primary | `#FFFFFF` (CTA) |
| colors.accent / accentSecondary | `#6EE7F9` / `#F472B6` (+ violet in atmosphere) |
| effects.blur | `12–16px` (cards) |
| typography | Manrope + Unbounded |
| composition | `modular-stack` |

## Sources

1. Owned catalog — [dizain-prompty · Aurora / Mesh](https://ztim2008.github.io/dizain-prompty/)
2. This note
3. WCAG AA — white text on night; dark `#0B0A1F` labels on white CTAs
