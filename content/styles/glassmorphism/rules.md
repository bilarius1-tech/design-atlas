# Rules · glassmorphism

## Do

1. Keep a deep navy ground (`#0F1B4C`) with soft violet/cyan orbs behind content.
2. Panels: translucent white fill + `backdrop-filter` blur ~16px + light border.
3. White text; violet primary CTAs; cyan as secondary signal.
4. Card radius ~20px; plump/pill buttons ok.
5. Prefer Manrope / Golos Text with Cyrillic.

## Don’t

1. Don’t make panels opaque solid cards.
2. Don’t switch to neu same-as-ground extrusion or clay pastel plastic.
3. Don’t wash huge sections in neon without glass structure.
4. Don’t use low-contrast gray body on glass.
5. Don’t invent a second palette outside `tokens.json`.

## Composition

- Default: `modular-stack`
- Structure from user chat; Atlas = visual system only
- Preview may add soft gradient orbs via scoped CSS for atmosphere

## Accessibility

- White on navy/glass ≥ AA
- Focus-visible on translucent controls
- Respect `prefers-reduced-motion` for blur-heavy motion
