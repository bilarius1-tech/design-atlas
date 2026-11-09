# Prompt · poster-brutal

Implement an interface in the **Poster Brutal** style using the DESIGN ATLAS system.

## Context

- Poster force: heavy type, thick line, offset shadow, one orange signal.
- Original DESIGN ATLAS pack — not a DesignPrompts import and not a scraped repository dump.

## Mandatory tokens (do not invent replacements)

Use values only from `tokens.json` / `TOKENS.md`:

- background `#F3F1EA`, surface `#FFFFFF`, text `#0A0A0A`, muted `#3F3F3F`
- primary `#0A0A0A`, accent `#FF4D00`, border `#0A0A0A`
- radius `0px`, borderWidth `3px`, shadow `6px 6px 0 #0A0A0A`
- spacing unit `8`, section `104px`, container `1080px`
- type scale: xs 12 / sm 14 / base 18 / lg 22 / xl 32 / 2xl 52 / display 88
- fonts: Arial Black → Impact → Haettenschweiler; body Arial

Do not hardcode arbitrary hex when CSS variables / tokens are available.

## Layout

1. Oversized display, generous space, asymmetry allowed.
2. Thick-framed modules; soft shadow banned.
3. Hero budget: brand/title/one paragraph/one CTA group + one visual plane.
4. Do not build the hero from three identical soft cards.

## Components

Primary = near-black fill. Accent orange = critical CTA/signal.
Cards only as framed meaning units.

## States

Implement hover, focus-visible, disabled, loading, validation error. No fake interactivity.

## Responsive

Check 1440, 1024, 768, 390, 360. Keep type punch on mobile; do not shrink everything evenly.

## Bans

- Soft shadow / blur / glassmorphism
- Rounded pastel cards everywhere
- Inter as a silent default
- Stickers/badges over hero
- Fake statistics theater
- Mixing with Swiss hairline grids without cause

## Acceptance criteria

1. Rectangle radius = 0.
2. Shadow is only the hard offset from tokens.
3. Accent is not used as full section washes.
4. Typography reads as a poster role system.
5. Values map 1:1 to `tokens.json`.
6. Keyboard focus is visible.
7. Copy is realistic — no lorem.
