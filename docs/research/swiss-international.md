# Research · swiss-international

**Status:** accepted for PHASE 6 reference authoring  
**Date:** 2026-11-09  
**Scope:** historical International Typographic Style (Swiss Style) → web UI interpretation for Design Atlas

## Facts vs interpretation

| Claim | Type | Note |
|-------|------|------|
| Emerged mid-20th c. in Switzerland / related schools | Fact | Common design-history consensus |
| Associated with objectivity, clarity, grid systems | Fact | Documented in primary manuals |
| Helvetica (1957) became a hallmark face of the movement’s later reception | Fact | Type history; not the only face used historically |
| Web UI with 0 radius + red accent “is authentic Swiss 1950s” | Interpretation | Atlas adaptation for digital interfaces |
| Every Swiss poster used the same 12-column CSS grid | False | Do not claim |

## Sources

1. **Josef Müller-Brockmann — *Grid Systems in Graphic Design***  
   Grid as communication structure; modular order; asymmetry with balance.
2. **Armin Hofmann — *Graphic Design Manual***  
   Point, line, plane; reduction; photographic objectivity.
3. **Karl Gerstner — *Designing Programmes***  
   Systematic / programmatic approach to visual decisions.
4. **Neue Grafik / New Graphic Design** (magazine, late 1950s–1960s)  
   Period discourse of the International Typographic Style.
5. **Max Miedinger with Eduard Hoffmann — Helvetica (1957)**  
   Type lineage often paired with the style’s later global image (use with license-aware fallbacks on the web).

## Visual traits (for tokens)

- Flush-left typography, strong scale jumps
- Modular / asymmetric grids, generous margins
- Limited palette: near-black, paper white, signal red (or equivalent functional accent)
- Geometry: sharp corners; hairline rules; minimal or no shadow
- Photography: documentary, high contrast; not lifestyle collage
- Icons: functional, geometric; not decorative illustration packs

## Anti-patterns

- Soft neumorphism / heavy blur shadows
- Centered “AI SaaS hero” with three equal rounded cards
- Rainbow gradients, glassmorphism, playful stickers
- Inter-as-default without rationale (for this style prefer grotesk lineage)
- Fake statistics strips as decoration
- Mixing ornamental script with Swiss grid without documented reason

## Token hints

- `geometry.radius: 0px`
- `effects.shadow: none`
- Accent reserved for CTA / error / signal, not large fills
- Spacing unit 4–8px modular scale; wide section rhythm

## Web adaptation note

Design Atlas delivers a **digital interpretation** suitable for coding agents. It is not a museum facsimile of a specific poster. Historical manuals inform rules; UI components are contemporary HTML patterns styled under those rules.
