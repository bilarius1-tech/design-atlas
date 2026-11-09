# Research notes · kinetic

## Intent

Motion-led / kinetic type system for DESIGN ATLAS — add-on after queue #13. **Visual direction** observed from designprompts.dev/kinetic (product reference only — no copy of DP fonts, copy, graphics, or CSS). Atlas-original tokens, prompts, and RU demo.

## Traits

- Near-black ground (`#0A0A0B`), white ink, single hot orange signal
- Giant **uppercase** display; tight grotesk (Inter / Unbounded)
- Radius `0`; hard rectangular color blocks; type as the image
- Motion grammar: marquee strip, block wipe / slide — pause under `prefers-reduced-motion`
- Body stays still; only display / strips move

## Differentiation

| Axis | Poster Brutal | Neon Tech | Kinetic |
|------|---------------|-----------|---------|
| Ground | Paper cream | Charcoal + grid | Pure black stage |
| Accent | Orange on paper | Multi-acid | One orange block signal |
| Type | Arial Black punch | Unbounded tech | Stacked Inter grotesk |
| Motion | Static offset | Static glow | Marquee / kinetic type |

## Anti-patterns

- Soft clay / glass / aurora blooms
- Animating long body paragraphs
- Multi-neon palette drift
- Ignoring reduced-motion

## Token hints

| Token | Direction |
|-------|-----------|
| colors.background | `#0A0A0B` |
| colors.primary | `#FF5E00` |
| typography.heading | Inter / Unbounded |
| geometry.radius | `0px` |
| composition | `modular-stack` |

## Sources

1. Visual direction reference: designprompts.dev/kinetic (traits only; not a clone)
2. Kinetic / motion-type industry patterns (marquees, stacked display, reduced-motion)
3. This note + WCAG AA for orange/black/white pairs
