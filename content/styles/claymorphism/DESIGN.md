---
id: claymorphism
title:
  ru: Клейморфизм
  en: Claymorphism
version: 1.0.0
status: published
schemaVersion: 1.0.0
generatedAt: 2026-11-09T12:00:00.000Z
compositionId: modular-stack
---

# DESIGN.md · claymorphism

## Overview

Soft clay / plasticine volume for DESIGN ATLAS: pastel lavender ground, plump radii, dual soft shadows, Nunito + Manrope with Cyrillic. Friendly consumer services — original Atlas pack.

Philosophy: volume from shadow and radius, not hard frames.

## Token summary

Source: `tokens.json` (also mirrored in `TOKENS.md`).

- **Ground:** `#F4EEFF` background, `#FFFCFF` surface
- **Ink:** `#2B2140` text, `#6B5F8A` muted
- **Signal:** `#7C5CFF` primary, `#FFB86B` accent
- **Line:** `#E4D9F7` border, `1px`
- **Shape:** radius `28px`, button `999px`, card `32px`
- **Shadow:** soft violet outer + light inset
- **Type:** Nunito + Manrope; display `57px`; base `16px`
- **Space:** unit `8`, section `104px`, container `1200px`

## Typography roles

See `typography.json`. Heavy Nunito on headings; Manrope for reading text.

## Layout

- Composition: `modular-stack`
- Soft product rhythm; cards as plump panels
- Hero budget: title, one supporting sentence, one CTA group

## Bans

- Neo-brutal hard offsets
- Dark console identity
- Inter silent default
- Hairline flat cards without volume

## Handoff

Agent + Constructor prompts (RU/EN). Structure of the user’s page comes from their chat — do not force demo section order.
