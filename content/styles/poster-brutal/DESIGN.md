---
id: poster-brutal
title:
  ru: Плакатный брутал
  en: Poster Brutal
version: 1.0.0
status: published
schemaVersion: 1.0.0
generatedAt: 2026-11-09T00:00:00.000Z
compositionId: editorial-split
---

# DESIGN.md · poster-brutal

## Overview

Hard poster system for DESIGN ATLAS: heavy display type, thick rules, offset shadow, one orange signal. Original Atlas interpretation for campaign and studio marketing.

Philosophy: force over polish; rules over vibes.

## Token summary

Source: `tokens.json` (also mirrored in `TOKENS.md`).

- **Ground:** `#F3F1EA` background, `#FFFFFF` surface
- **Ink:** `#0A0A0A` text/primary, `#3F3F3F` muted
- **Signal:** `#FF4D00` accent
- **Line:** `#0A0A0A` border, `3px`, radius `0`, hard offset shadow
- **Type:** Arial Black stack; display `88px`; base `18px`
- **Space:** unit `8`, section `104px`, container `1080px`

## Typography roles

See `typography.json`. Lead with weight/scale before color.

## Layout

- Composition: `editorial-split`
- Poster modules, thick frames
- Hero budget: title, one supporting sentence, one CTA group, one visual plane

## Components

See `components.json`. Primary near-black; accent orange sparingly.

## Interaction

- Real states; visible `:focus-visible`
- Honor `prefers-reduced-motion`

## Responsive

Validate at 1440 / 1024 / 768 / 390 / 360. Keep type punch on small screens.

## Anti-patterns

Soft shadows, pastel rounded cards, Inter default, sticker badges, fake stats, rainbow accents.

## Agent handoff

1. Read `AGENT-INSTRUCTIONS.md`
2. Apply `prompt.ru.md` or `prompt.en.md`
3. Keep values synchronized with `tokens.json`
4. Verify with `/playground/poster-brutal` and Studio compare

## Integrity

If Markdown token tables disagree with `tokens.json`, **JSON wins**.
