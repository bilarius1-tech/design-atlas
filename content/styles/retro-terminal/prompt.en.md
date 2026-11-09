# Prompt · retro-terminal

Implement an interface in the **Retro Terminal** style using the DESIGN ATLAS system.

## Context

- CRT/CLI: black screen, phosphor mono, scanlines, blinking cursor, buttons in `[ brackets ]`.
- Page structure comes from the user’s chat — this prompt is visual system only.
- This is **not** midnight-console (SaaS) and **not** neon-tech.

## Mandatory tokens

- background `#0A0F0A`, surface `#0F160F`, text `#33FF66`, muted `#2A9944`
- primary `#33FF66`, accent `#FFB000`, accentSecondary `#1C2A1C`, border `#1C2A1C`
- radius `0px` everywhere; borderWidth `1px`
- soft phosphor glow shadow; container `1040px`; display `57px`
- fonts: JetBrains Mono (all roles)

Scanlines required. Disable cursor blink under `prefers-reduced-motion`.

## Bans

- Sans display as the hero (midnight drift)
- Neon-tech multi-acid grid
- Glass / aurora / Y2K
- Dense-tile industrial flush
- A second “taste” palette

## Acceptance

1. CRT black + phosphor mono + scanlines read immediately.
2. Amber CTA in brackets; radius 0.
3. Values match `tokens.json`.
4. User structure is not rewritten.
