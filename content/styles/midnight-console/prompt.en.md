# Prompt · midnight-console

Implement an interface in the **Midnight Console** style using the DESIGN ATLAS system.

## Context

- Dark engineering UI: working surfaces, explicit status, minimal decoration.
- Type: IBM Plex Sans + IBM Plex Mono.
- Original DESIGN ATLAS pack — not a Carbon clone and not an import of third-party style libraries.

## Mandatory tokens (do not invent replacements)

Use values only from `tokens.json` / `TOKENS.md`:

- background `#0B0F14`, surface `#121821`, text `#E8EEF5`, muted `#8B98A8`
- primary `#7DD3FC`, accent `#34D399`, border `#243041`
- radius `6px`, borderWidth `1px`, shadow `0 12px 40px rgba(0, 0, 0, 0.45)`
- spacing unit `8`, section `96px`, container `1120px`
- type scale: xs 12 / sm 14 / base 16 / lg 18 / xl 24 / 2xl 36 / display 64
- fonts: IBM Plex Sans; mono IBM Plex Mono

Do not hardcode arbitrary hex when CSS variables / tokens are available.

## Layout

1. Dense but readable vertical rhythm.
2. Cards = tool panels; shadow separates layers only.
3. Hero budget: brand/title/one paragraph/one CTA group — no collage.
4. Metadata and status use mono; uppercase labels sparingly.

## Components

Primary button = cyan fill. Accent mint = success/ready — not large section washes.
Fields on surface; explicit errors without glow.

## States

Implement hover, focus-visible, disabled, loading, validation error. No fake interactivity.

## Responsive

Check 1440, 1024, 768, 390, 360. No horizontal scroll.

## Bans

- Neon gradients, scanlines, glassmorphism as identity
- Light theme inside this style
- Inter as a silent default
- Pastel section washes and sticker badges over hero
- Fake statistics theater

## Acceptance criteria

1. Page stays dark; text remains readable on background/surface.
2. Primary/accent are not used as huge section fills.
3. Mono appears in labels/code/status.
4. Values map 1:1 to `tokens.json`.
5. Keyboard focus is visible on dark ground.
6. Copy is realistic — no lorem.
