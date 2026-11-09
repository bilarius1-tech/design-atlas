# Button radius policy (Studio)

- **Date:** 2026-11-09
- **Decision:** Pill CTAs by default (`radiusButton: 999px`); sharp only where square buttons are style DNA.

## Default

Most published styles use `geometry.radiusButton: 999px` so Studio CTAs read as one family (competitor-like predictability). Card/surface radii stay style-specific.

## Sharp exceptions

| Style | `radiusButton` |
|-------|----------------|
| `kinetic` | `0px` |
| `retro-terminal` | `0px` |
| `poster-brutal` | `0px` |
| `swiss-international` | `0px` |
| `industrial-power` | `2px` |
| `blueprint-grid` | `4px` |
| `neo-brutalism` | `6px` |

## Notes

- Height stays global in preview CSS (`min-height: unit × 10`); separate from radius.
- System drawer can still override session radius without writing Git.
