# Rules · neumorphism

## Do

1. Keep fills the same color as the page ground (`#E6EBF2`).
2. Create volume with paired soft shadows: dark `#C3CAD5` + light `#FFFFFF`.
3. Use inset dual shadow for pressed / recessed controls.
4. Limit indigo `#3D5AFE` to active buttons and key signals.
5. Prefer Manrope; keep Cyrillic coverage.

## Don’t

1. Don’t outline cards with strong borders that break the soft fill.
2. Don’t drift into clay multi-pastel or neo-brutal hard offsets.
3. Don’t wash large sections in accent blue.
4. Don’t sacrifice text contrast for softer shadows.
5. Don’t invent a second palette outside `tokens.json`.

## Composition

- Default composition id: `modular-stack`
- Atmosphere only — page structure comes from the user’s agent chat
- Token tables in markdown must mirror `tokens.json`

## Accessibility

- Body text `#2E3440` on `#E6EBF2` must stay AA
- Accent buttons need readable label contrast
- Visible `:focus-visible` even when borders are `0`
