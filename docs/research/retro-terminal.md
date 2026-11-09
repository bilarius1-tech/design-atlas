# Research notes · retro-terminal

## Intent

CRT / CLI retro-terminal system for DESIGN ATLAS — queue #13. Owned SSOT: dizain-prompty `retro-terminal`. Adapted for **web landing / app shell** dual handoff. Phosphor mono on black, scanlines, blink cursor — not midnight-console product SaaS, not neon-tech multi-acid grids.

## Traits

- Black CRT ground `#0A0F0A`, phosphor `#33FF66`, amber `#FFB000`, line `#1C2A1C`
- **All mono:** JetBrains Mono + PT Mono
- Scanlines via `repeating-linear-gradient`; soft phosphor `text-shadow`
- Radius `0`; dashed borders; headings as CLI prompts (`> …`); buttons as `[ label ]`
- Blinking cursor (respect `prefers-reduced-motion`)

## Differentiation

| Axis | Midnight Console | Neon Tech | Retro Terminal |
|------|------------------|-----------|----------------|
| Type | IBM Plex Sans + mono labels | Unbounded / Oswald | All mono |
| Color | Cyan/mint product signals | Lime/cyan/magenta hard | Phosphor + amber only |
| Chrome | Soft dark SaaS cards | Glow grid | Scanlines + dashed CLI frames |
| Mood | Working product console | Night gadget | 80s CRT / shell |

## Anti-patterns

- Soft glass / aurora mesh blooms
- Y2K chrome + lavender glitter
- Neo-brutal thick black offsets on cream
- Mixing sans display fonts as the hero system
- Ignoring reduced-motion for cursor blink

## Token hints

| Token | Direction |
|-------|-----------|
| colors.background | `#0A0F0A` |
| colors.primary / accent | `#33FF66` / `#FFB000` |
| colors.border | `#1C2A1C` |
| geometry.radius | `0px` |
| typography.* | JetBrains Mono |
| composition | `modular-stack` |

## Sources

1. Owned catalog — [dizain-prompty · Retro Terminal](https://ztim2008.github.io/dizain-prompty/)
2. This note
3. WCAG AA — phosphor on black is strong; amber CTAs need verified pairs
