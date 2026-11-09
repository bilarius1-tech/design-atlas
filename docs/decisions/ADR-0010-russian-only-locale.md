# ADR-0010: Product language policy

- **Status:** Accepted
- **Date:** 2026-11-09
- **Amends:** [ADR-0006](ADR-0006-localization.md)

## Context

The product needs a clear split between user-facing language, agent prompts, and repository technical docs.

## Decision

| Surface | Language |
|---------|----------|
| Product UI (shell, labels, CTAs) | **Russian** |
| Demo / template sample copy | **Russian** |
| Prompts for agents | **Russian and English** (`prompt.ru.md` + `prompt.en.md`) |
| Prompts for constructors | **Russian and English** (`prompt.constructor.ru.md` + `prompt.constructor.en.md`) — [ADR-0011](ADR-0011-dual-prompt-surfaces.md) |
| Technical documentation (`docs/`, ADR, AGENTS engineering, specs) | **English** |

Notes:

1. Stable `id` / slug stay language-independent (ADR-0006).
2. JSON may still carry `title.en` / `title.ru` for styles; primary product UI shows Russian.
3. No English UI locale switch until a future ADR.
4. Free Design Pack includes agent **and** constructor prompt files (RU+EN).

## Consequences

- Users get RU UI + dual prompts without studying English docs.
- Maintainers and coding agents read English technical contracts.
- Supersedes “Russian everywhere” for documentation; does **not** drop EN prompts.
