# Prompt · swiss-international

Implement an interface in the **Swiss International Style** (International Typographic Style) using the DESIGN ATLAS system.

## Context

- Style traits: objective communication, modular grid, grotesk typography, high contrast.
- Principle sources: Müller-Brockmann (grid), Hofmann (reduction), Gerstner (systematic design).
- This is a digital interpretation for web/UI—not a museum facsimile of one poster.

## Mandatory tokens (do not invent replacements)

Use values only from `tokens.json` / `TOKENS.md`:

- background `#F2F0EA`, surface `#FFFFFF`, text `#111111`, muted `#5C5C5C`
- primary `#111111`, accent `#E30613`, border `#C9C4BA`
- radius `0px`, borderWidth `1px`, shadow `none`
- spacing unit `8`, section `112px`, container `1180px`
- type scale: xs 12 / sm 14 / base 16 / lg 20 / xl 28 / 2xl 44 / display 80
- fonts: Helvetica Neue → Helvetica → Arial; mono IBM Plex Mono

Do not hardcode arbitrary hex in components when CSS variables / tokens are available.

## Layout

1. Flush-left typography by default.
2. Modular/asymmetric grid; avoid a hero with three identical rounded cards.
3. Generous margins and predictable section rhythm.
4. Hairline dividers instead of shadows.
5. Hero budget: brand/title/one paragraph/one CTA group + one dominant visual plane (no collage).

## Components

Allowed: buttons (primary/secondary/tertiary/ghost), inputs, radio/checkbox/switch, tabs, cards (sparingly), alerts, badges, tables, FAQ.

Primary button = near-black fill. Accent is for critical action/error/signal—not large section washes.

## States

Implement hover, focus-visible, disabled, loading, validation error. No fake interactivity.

## Responsive

Check 1440, 1024, 768, 390, 360. No horizontal scroll. Preserve hierarchy on mobile.

## Bans

- Soft shadow, blur, glassmorphism, generic AI gradients
- Rounded cards everywhere
- Inter as a silent default
- Decorative stickers/badges over hero media
- Fake statistics theater
- Ornamental script fonts
- Mixing neo-brutal stickers with a Swiss grid

## Acceptance criteria

1. Interactive rectangles use radius 0 (except true circles).
2. Shadow is none unless a documented functional exception exists.
3. Accent red is not used as a full section background.
4. Typography reads as a role system, not random sizes.
5. Colors/fonts/spacing map 1:1 to `tokens.json`.
6. Keyboard focus is visible.
7. Copy is realistic—no lorem or “Click here” placeholders.
