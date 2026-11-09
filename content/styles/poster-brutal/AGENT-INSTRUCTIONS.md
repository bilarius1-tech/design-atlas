# AGENT-INSTRUCTIONS.md · poster-brutal

## Mission

Build UI recognizable as Poster Brutal **and** matching DESIGN ATLAS tokens exactly.

## Required reading (in order)

1. `style.json`
2. `tokens.json`
3. `typography.json`
4. `rules.md`
5. `DESIGN.md`
6. `prompt.ru.md` or `prompt.en.md`

## Implementation rules

1. **Tokens first.**
2. Radius 0; border 3px; hard offset shadow only.
3. Orange accent sparingly.
4. Heavy type before decoration.
5. Accessible focus states.
6. **No fake interactivity.**

## Deliverable checklist

- [ ] Colors/fonts/spacing match `tokens.json`
- [ ] Desktop + mobile without horizontal scroll
- [ ] No soft-shadow / pastel-card bans violated
- [ ] Copy is concrete and loud without empty adjectives

## Out of scope

- Inventing a softer redesign
- Copying third-party neo-brutal packs or scraped content

## Verification

Use skill `agent-result-verification` after implementation.
