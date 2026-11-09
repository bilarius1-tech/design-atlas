# Rules · midnight-console

## Do

1. Keep backgrounds near `#0B0F14` / `#121821`; separate layers with border before glow.
2. Use cyan (`primary`) for primary actions; mint (`accent`) for success/ready signals.
3. Put IDs, statuses, and technical captions in IBM Plex Mono.
4. Prefer dense section rhythm suitable for product pages and tooling marketing.
5. Maintain AA contrast for body text on dark surfaces.

## Don’t

1. Don’t invent neon gradients, scanlines, or “hacker green terminal” as identity.
2. Don’t brighten the whole page into a light theme.
3. Don’t default to Inter or playful rounded sticker UI.
4. Don’t use soft pastel fills on large sections.
5. Don’t claim this pack is IBM Carbon or any third-party library.

## Composition

- Default composition id: `modular-stack`
- Studio compare uses the same template content across styles
- Markdown token tables must mirror `tokens.json`

## Accessibility

- Verify text/background pairs on dark ground
- Visible `:focus-visible` on interactive controls
- Respect `prefers-reduced-motion`
