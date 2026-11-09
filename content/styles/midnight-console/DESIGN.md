---
id: midnight-console
title:
  ru: Полуночная консоль
  en: Midnight Console
version: 1.0.0
status: published
schemaVersion: 1.0.0
generatedAt: 2026-11-09T00:00:00.000Z
compositionId: modular-stack
---

# DESIGN.md · midnight-console

## Overview

Dark engineering UI for DESIGN ATLAS: calm surfaces, cyan/mint signal colors, IBM Plex Sans/Mono. Built for product and tooling interfaces — original Atlas interpretation.

Philosophy: UI as a working console; color is state signal, not mood.

## Token summary

Source: `tokens.json` (also mirrored in `TOKENS.md`).

- **Ground:** `#0B0F14` background, `#121821` surface
- **Ink:** `#E8EEF5` text, `#8B98A8` muted
- **Signal:** `#7DD3FC` primary, `#34D399` accent
- **Line:** `#243041` border, `1px`, radius `6px`, deep shadow
- **Type:** IBM Plex Sans + Mono; display `64px`; base `16px`
- **Space:** unit `8`, section `96px`, container `1120px`

## Typography roles

See `typography.json`. Prefer mono for metadata/status.

## Layout

- Composition: `modular-stack`
- Dense product rhythm; cards as panels
- Hero budget: title, one supporting sentence, one CTA group

## Components

See `components.json`. Primary = cyan; accent = success/ready.

## Interaction

- Real states; visible `:focus-visible` on dark ground
- Honor `prefers-reduced-motion`

## Responsive

Validate at 1440 / 1024 / 768 / 390 / 360. No horizontal overflow.

## Anti-patterns

Neon sci-fi identity, glassmorphism, light-theme drift, Inter default, sticker badges, fake stats.

## Agent handoff

1. Read `AGENT-INSTRUCTIONS.md`
2. Apply `prompt.ru.md` or `prompt.en.md`
3. Keep values synchronized with `tokens.json`
4. Verify with `/playground/midnight-console` and Studio compare

## Integrity

If Markdown token tables disagree with `tokens.json`, **JSON wins**.
