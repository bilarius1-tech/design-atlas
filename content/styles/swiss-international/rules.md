# Rules · swiss-international

## Do

1. Build layouts on a modular grid with clear margins and uneven column spans when content allows.
2. Keep typography flush-left by default; use scale and weight for hierarchy.
3. Limit color: paper ground, near-black ink, signal red for action/status.
4. Prefer hairline rules and open modules over shadowed cards.
5. Treat photography as documentary material that sits inside the grid.
6. Write UI copy that is concrete; avoid empty marketing adjectives.

## Don’t

1. Don’t introduce soft shadows, blurs, or glassmorphism.
2. Don’t round rectangles “to feel modern.”
3. Don’t center a giant hero with three identical rounded feature cards.
4. Don’t use gradients as identity.
5. Don’t default to Inter or ornamental scripts for this style.
6. Don’t invent historical claims; separate Atlas interpretation from design history.
7. Don’t place floating badges/stickers on top of hero media.
8. Don’t mix unrelated styles (neo-brutal stickers + Swiss grid) in one composition.

## Composition

- Default composition id: `swiss-editorial-grid`
- Playground proves tokens; demo landing proves composition
- Export files must mirror `tokens.json` — never hand-edit hex in Markdown

## Accessibility

- Maintain WCAG AA contrast for text/background pairs in the token set
- Visible focus rings required on all interactive controls
- Respect `prefers-reduced-motion`

## Sources

See `style.json` → `sources` and `docs/research/swiss-international.md`.
