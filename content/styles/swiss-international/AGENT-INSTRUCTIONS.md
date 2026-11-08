# AGENT-INSTRUCTIONS.md · swiss-international

## Mission

Build UI that a reviewer can recognize as Swiss International Style **and** that matches DESIGN ATLAS tokens exactly.

## Required reading (in order)

1. `style.json` — status, philosophy, bans context
2. `tokens.json` — SSOT for color/type/space/geometry
3. `typography.json` — roles
4. `rules.md` — do/don’t
5. `DESIGN.md` — handoff overview
6. `prompt.ru.md` **or** `prompt.en.md` — executable prompt
7. Optional: playground + demo routes for visual reference

## Implementation rules

1. **Tokens first.** No parallel palette in CSS modules.
2. **Radius 0** for rectangles; circles may be fully round.
3. **Shadow none** by default.
4. **Accent sparingly** (`#E30613`) — CTA/error/signal, not washes.
5. **Flush-left** typography; modular grid; avoid centered triple-card heroes.
6. **Accessible** focus states and AA contrast for text pairs.
7. **No fake interactivity.**

## Deliverable checklist

- [ ] Colors/fonts/spacing match `tokens.json`
- [ ] Desktop + mobile without horizontal scroll
- [ ] Primary/secondary/ghost buttons + form controls work
- [ ] No banned decoration (shadows, gradients, stickers, Inter swap)
- [ ] Copy is editorial and concrete
- [ ] If exporting code, document any font-license fallback (Arial)

## Out of scope

- Inventing a new visual concept instead of this style
- Publishing catalog-wide changes
- Claiming museum authenticity for a specific historical artifact

## Verification

Use Design Atlas skill `agent-result-verification` against this package after implementation.
