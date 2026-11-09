# Research notes · neumorphism

## Intent

Soft extruded UI for DESIGN ATLAS — second soft-volume proof after `claymorphism`. Owned catalog SSOT: [dizain-prompty neumorphism](https://ztim2008.github.io/dizain-prompty/stil/neumorphism/). Not a DesignPrompts clone.

## Traits

- Element fill ≈ page background (`#E6EBF2`)
- Volume only from paired light + dark soft shadows
- Pressed state via inset dual shadow
- Accent (`#3D5AFE`) on active controls only — not large washes
- Cyrillic-capable Manrope (Inter as optional fallback)

## Anti-patterns

- Clay pastel multi-color inflated cards
- Hard neo-brutal offsets
- Glass blur as identity
- Strong borders that break the “same-as-ground” fill

## Token hints

| Token | Direction |
|-------|-----------|
| colors.background / surface | `#E6EBF2` (same family) |
| colors.primary / accent | `#3D5AFE` |
| colors.text | `#2E3440` |
| effects.shadow | `8px 8px 16px #C3CAD5, -8px -8px 16px #fff` |
| effects.shadowInset | inset pressed pair |

## Sources

1. https://ztim2008.github.io/dizain-prompty/stil/neumorphism/
2. docs/research/neumorphism.md (this note)
3. WCAG AA — accent buttons must keep readable label contrast
