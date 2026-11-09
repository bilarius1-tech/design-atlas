# AGENT-INSTRUCTIONS.md · midnight-console

## Mission

Build UI recognizable as Midnight Console **and** matching DESIGN ATLAS tokens exactly.

## Required reading (in order)

1. `style.json`
2. `tokens.json`
3. `typography.json`
4. `rules.md`
5. `DESIGN.md`
6. `prompt.ru.md` or `prompt.en.md`

## Implementation rules

1. **Tokens first.** No parallel palette.
2. Stay dark — no light-theme drift.
3. Cyan = primary action; mint = success/ready — sparingly.
4. Mono for IDs/status/captions.
5. Accessible focus on dark ground.
6. **No fake interactivity.**

## Deliverable checklist

- [ ] Colors/fonts/spacing match `tokens.json`
- [ ] Desktop + mobile without horizontal scroll
- [ ] Buttons/forms work with real states
- [ ] No neon/glass/Inter bans violated
- [ ] Copy is concrete

## Out of scope

- Inventing a different visual concept
- Claiming this is IBM Carbon or a scraped third-party pack

## Verification

Use skill `agent-result-verification` after implementation.
