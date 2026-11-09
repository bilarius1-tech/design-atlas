# Rules · kinetic

## Do

1. Near-black ground `#0A0A0B`, white ink, one orange `#FF5E00`.
2. Inter 800 uppercase stacked display; body stays still.
3. Radius `0`; rectangular signal blocks.
4. Motion: marquee strip or wipe on headlines only.
5. Pause all motion under `prefers-reduced-motion`.

## Don’t

1. Don’t soft-round into clay / glass / aurora.
2. Don’t animate long body copy.
3. Don’t add multi-neon accents.
4. Don’t use poster-paper cream as the stage.
5. Don’t invent a second palette outside `tokens.json`.

## Composition

- Default: `modular-stack`
- Structure from user chat; Atlas = visual system only
- Preview CSS may run a slow marquee band

## Accessibility

- White on black ≥ AA; black labels on orange CTAs
- No flashing > 3/sec
- Complete static alternative when reduced-motion is set
