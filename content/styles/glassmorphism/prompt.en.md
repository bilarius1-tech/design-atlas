# Prompt · glassmorphism

Implement an interface in the **Glassmorphism** style using the DESIGN ATLAS system.

## Context

- Frosted glass over a deep field with soft gradient orbs.
- Type: Manrope / Golos Text (Cyrillic); Inter fallback.
- Page structure comes from the user’s chat — this prompt is visual system only.

## Mandatory tokens

- background `#0F1B4C`, surface `rgba(255,255,255,0.12)`, text `#FFFFFF`, muted `rgba(255,255,255,0.72)`
- primary `#7F5AF0`, accent `#2CB1FF`, border `rgba(255,255,255,0.3)`
- radius `16px`, radiusButton `999px`, radiusCard `20px`, borderWidth `1px`
- blur `16px`, shadow `0 12px 40px rgba(8,12,40,0.35)`
- container `1140px`, display `57px`, base `16px`
- fonts: Manrope headings/body

Panels: translucency + backdrop blur + thin light border. Behind: 2–3 soft gradient orbs (violet/cyan), not flat washes.

## Bans

- Neumorphic same-as-ground fills
- Clay pastel volume
- Neon without glass structure
- Low-contrast gray text on glass

## Acceptance

1. Glass reads clearly (blur + border + alpha).
2. White text stays contrast-safe.
3. Values match `tokens.json`.
4. User structure is not rewritten.
