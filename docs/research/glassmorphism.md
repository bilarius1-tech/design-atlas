# Research notes · glassmorphism

## Intent

Frosted-glass panels over a deep gradient field — third soft/atmosphere proof after clay + neu. SSOT: [dizain-prompty glassmorphism](https://ztim2008.github.io/dizain-prompty/stil/glassmorphism/).

## Traits

- Dark navy ground `#0F1B4C` with blurred color orbs (`#7F5AF0`, `#2CB1FF`)
- Panels: translucent white fill + `backdrop-filter` blur (~16px)
- Thin light border `rgba(255,255,255,.3)`, radius ~20px
- White text; accent orbs / CTA use violet + cyan
- Cyrillic: Inter / Manrope / Golos Text

## Anti-patterns

- Opaque solid cards with no blur
- Neumorphic same-as-ground extrusion
- Clay pastel plasticine volume
- Low-contrast gray text on glass

## Token hints

| Token | Direction |
|-------|-----------|
| colors.background | `#0F1B4C` (+ CSS orbs) |
| colors.surface | `rgba(255,255,255,0.12)` |
| colors.primary / accent | `#7F5AF0` / `#2CB1FF` |
| effects.blur | `16px` |
| geometry.radiusCard | `20px` |

## Sources

1. https://ztim2008.github.io/dizain-prompty/stil/glassmorphism/
2. This note
3. WCAG AA — white text on navy/glass must stay verifiable
