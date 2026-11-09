# Research notes · dense-tile / spacing.gap

## Intent

Support Taptop-like **flush tile mosaics** (`gap ≈ 0`, hairline between cells) without forcing that language onto every Atlas style.

Reference vibe: industrial corporate sites (e.g. kmprom.ru / Taptop dense templates) — tiles meet edge-to-edge; structure comes from borders, not whitespace.

## Decision

| Layer | Role |
|-------|------|
| Optional `spacing.gap` | Style token → `--sp-gap`. Omit = default `unit * 4`. Use `0px` only when the style is flush by nature. |
| Composition `dense-tile` | Preview atmosphere for features/stats mosaics (hairline grid). Not a page builder / freeform grid editor. |
| Style pick | First proof: `blueprint-grid`. Later: `industrial-power`, `bento-grid`, neo-brutal where appropriate. |

## Do not

- Set `gap: 0` on clay / neu / glass / warm-premium / soft-editorial by default
- Add a Studio System knob that applies 0 gap to all styles
- Build a Taptop-class block grid editor inside Atlas

## Sources

1. Product discussion 2026-11-09 (user + agent)
2. https://kmprom.ru/ — dense industrial mosaic reference (atmosphere only)
3. ROADMAP approved queue — industrial / bento later
