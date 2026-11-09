# Rules · neo-brutalism

## Do

1. Butter ground `#FFF4D6`, ink/border `#111111`.
2. Pink `#FF5C8A` primary CTA; mint `#3DDC97` secondary plane; lemon `#FFD84D` sparingly.
3. Unbounded display (800, caps OK); Rubik body.
4. Borders `3px solid #111`; shadow `6px 6px 0 #111` — no blur.
5. Radius 6–8px; hover may shift control into its hard shadow.

## Don’t

1. Don’t drift into poster-brutal orange + Arial Black.
2. Don’t use soft blur / glass / neu inset stacks.
3. Don’t apply dense-tile `gap: 0` (offsets need air).
4. Don’t use white labels on pink/mint by default — prefer `#111`.
5. Don’t invent a second palette outside `tokens.json`.

## Composition

- Default: `modular-stack`
- Dense-tile optional in family — **not** this pack
- Structure from user chat; Atlas = visual system only

## Accessibility

- `#111` on butter / white / pink / mint ≥ AA where used as text
- Respect `prefers-reduced-motion` (skip translate hover if reduced)
