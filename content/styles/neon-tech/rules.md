# Rules · neon-tech

## Do

1. Keep charcoal ground `#171A22` with slight radial lift; optional fine grid.
2. Use lime `#B6FF00` for primary CTAs with **dark** label color.
3. Cyan `#00D5FF` and magenta `#FF4FD8` as secondary signals only.
4. Unbounded for display; Oswald/Manrope body; Roboto Mono captions.
5. Soft edge glow on panels — controlled, not full-bleed bloom.

## Don’t

1. Don’t flood the page with neon so type disappears.
2. Don’t switch to frosted glass as the main material (that’s glassmorphism).
3. Don’t use white text on lime buttons.
4. Don’t invent device ports/logos in handoff prompts.
5. Don’t invent a second palette outside `tokens.json`.

## Composition

- Default: `modular-stack`
- Structure from user chat; Atlas = visual system only
- Preview may add radial lift + fine grid via scoped CSS

## Accessibility

- Lime CTAs → dark ink
- Body on charcoal ≥ AA
- Respect `prefers-reduced-motion` for glow animations
