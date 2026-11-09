# Research notes · neo-brutalism

## Intent

Neo-brutal web system for DESIGN ATLAS — queue #10. Owned SSOT: dizain-prompty `neo-brutalism`. Adapted for **web landing / app shell** dual handoff. Hard black rules + offset shadows + acid flats — not poster-campaign orange, not soft-volume clay/neu.

## Traits

- Butter ground `#FFF4D6`, ink/border `#111111`
- Dual acid accents: pink `#FF5C8A`, mint `#3DDC97`
- Borders `3px solid #111`; shadow `6px 6px 0 #111` (no blur)
- Radius `0–12px` (Atlas default card/button ~6–8px)
- Type: **Unbounded** display (weight 800, caps OK); **Rubik** body; Space Grotesk as Latin fallback only
- Hover language: control shifts into its hard shadow (`translate 3–4px`)

## Differentiation vs `poster-brutal`

| Axis | Poster Brutal | Neo-brutalism |
|------|---------------|---------------|
| Ground | Paper cream `#F3F1EA` | Butter `#FFF4D6` |
| Accent | Single orange `#FF4D00` | Pink + mint dual |
| Type | Arial Black / Impact | Unbounded + Rubik |
| Mood | Sparse poster punch | Chunky playful startup cards |
| Density | sparse | balanced (air kept for offset shadows) |

## Anti-patterns

- Soft blur shadows, glass blur, neu inset stacks
- Dense-tile `gap: 0` flush mosaics (kills readable hard offsets)
- Poster-brutal orange-only drift / Arial Black as hero
- Pastel clay / hygge softness
- Thin 1px “tasteful” borders

## Token hints

| Token | Direction |
|-------|-----------|
| colors.background | `#FFF4D6` |
| colors.primary / accent | `#FF5C8A` / `#3DDC97` |
| colors.border / text | `#111111` |
| geometry.borderWidth | `3px` |
| effects.shadow | `6px 6px 0 #111111` |
| typography.heading | Unbounded |
| composition | `modular-stack` (dense optional — **not** used here) |

## Sources

1. Owned catalog — [dizain-prompty · Neo-brutalism](https://ztim2008.github.io/dizain-prompty/)
2. This note
3. WCAG AA — pink/mint CTAs need dark `#111` labels (not white-on-acid by default)
