# Research notes · y2k

## Intent

Y2K / early-2000s web system for DESIGN ATLAS — queue #12. Owned SSOT: dizain-prompty `y2k`. Adapted for **web landing / app shell** dual handoff. Chrome display, acid pink/cyan, glitter dots — not neon-tech dark grids, not streetwear peach campaigns.

## Traits

- Lavender ground `#FDE7FF`, ink `#2A0A3A`
- Accents: hot pink `#FF4FD8`, sky cyan `#3DD6FF`, chrome `#C0C0C0`
- Chrome headline via `linear-gradient` + `background-clip: text` + thin pink stroke
- Pill / blob radii; double outline (white + pink/cyan); soft glitter dots
- Type: **Unbounded** display, **Nunito** body; Russo One as optional display punch
- Playful sticker energy without emoji spam in product UI

## Differentiation

| Axis | Streetwear | Neon Tech | Y2K |
|------|------------|-----------|-----|
| Ground | Peach `#FFF3E8` | Charcoal dark | Lavender `#FDE7FF` |
| Accents | Coral / lime / violet | Lime / cyan / magenta hard | Pink / cyan + chrome |
| Type | Unbounded campaign | Unbounded + Oswald | Unbounded chrome + Nunito |
| Mood | Street poster | Night tech | Early-2000s playful |

## Anti-patterns

- Dark neon-tech grid shells as the default stage
- Neo-brutal 3px black hard offsets
- Soft scandi / clinical calm
- Dense-tile industrial mosaics
- Overloading every surface with stickers until hierarchy dies

## Token hints

| Token | Direction |
|-------|-----------|
| colors.background | `#FDE7FF` |
| colors.primary / accent | `#FF4FD8` / `#3DD6FF` |
| colors.accentSecondary | `#C0C0C0` |
| geometry.radius* | large pills / blobs |
| typography.heading | Unbounded |
| composition | `modular-stack` |

## Sources

1. Owned catalog — [dizain-prompty · Y2K](https://ztim2008.github.io/dizain-prompty/)
2. This note
3. WCAG AA — pink CTAs need dark or white labels that verify; chrome text needs stroke/contrast support
