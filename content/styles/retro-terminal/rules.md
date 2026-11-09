# Rules · retro-terminal

## Do

1. CRT black `#0A0F0A`, phosphor text `#33FF66`, amber `#FFB000`.
2. All type monospace — JetBrains Mono / PT Mono.
3. Scanlines + soft phosphor glow (`text-shadow 0 0 6px`).
4. Radius `0`; dashed frames; headings as `> commands`.
5. Buttons as `[ label ]`; blink cursor only if motion is allowed.

## Don’t

1. Don’t drift into midnight-console sans product UI.
2. Don’t multi-neon like neon-tech (lime/magenta grid).
3. Don’t add soft glass / aurora blooms.
4. Don’t use Y2K chrome or neo-brutal cream posters.
5. Don’t invent a second palette outside `tokens.json`.

## Composition

- Default: `modular-stack`
- Structure from user chat; Atlas = visual system only
- Preview CSS may add scanlines + caret blink

## Accessibility

- Phosphor on black ≥ AA
- Amber CTAs: dark ground or verified contrast
- Disable cursor blink under `prefers-reduced-motion`
