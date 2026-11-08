---
id: swiss-international
title:
  ru: Швейцарский интернациональный стиль
  en: Swiss International Style
version: 1.0.0
status: review
schemaVersion: 1.0.0
generatedAt: 2026-11-09T02:00:00.000Z
compositionId: swiss-editorial-grid
---

# DESIGN.md · swiss-international

## Overview

Swiss International Style (International Typographic Style) for DESIGN ATLAS: objective grid, grotesk hierarchy, limited palette, sharp geometry. Digital interpretation for humans and AI agents.

Philosophy: communication over ornament; content drives structure; rules must be verifiable.

## Token summary

Source: `tokens.json` (also mirrored in `TOKENS.md`).

- **Ground:** `#F2F0EA` background, `#FFFFFF` surface
- **Ink:** `#111111` text/primary, `#5C5C5C` muted
- **Signal:** `#E30613` accent
- **Line:** `#C9C4BA` border, `1px`, radius `0`, shadow `none`
- **Type:** Helvetica Neue stack; display `80px`; base `16px`
- **Space:** unit `8`, section `112px`, container `1180px`

## Typography roles

See `typography.json` for full role table (display → code). Rules:

- flush-left default
- hierarchy via scale/weight before color
- no script/novelty faces

## Layout

- Composition: `swiss-editorial-grid`
- Asymmetric modules, hairline separators
- Hero budget: title, one supporting sentence, one CTA group, one dominant visual plane
- Cards only when a unit of meaning needs a container

## Components

Mandatory playground groups are listed in `components.json`: typography, buttons, forms, shapes, cards, navigation, feedback, icons.

Primary button = near-black. Accent = critical action/status only.

## Interaction

- Real hover/focus/disabled/loading/validation states
- Visible `:focus-visible`
- Honor `prefers-reduced-motion`

## Responsive

Validate at 1440 / 1024 / 768 / 390 / 360. No horizontal overflow.

## Anti-patterns

Soft shadows, glassmorphism, AI gradient washes, rounded-card hero templates, Inter-as-default, fake stats, stickers on media, ornamental scripts, style mixing without cause.

## Agent handoff

1. Read `AGENT-INSTRUCTIONS.md`
2. Apply `prompt.ru.md` or `prompt.en.md`
3. Keep visual values synchronized with `tokens.json`
4. Verify with playground `/playground/swiss-international` and demo `/demo/swiss-international`

## Integrity

If Markdown token tables disagree with `tokens.json`, **JSON wins**. Regenerate Markdown after token edits.
