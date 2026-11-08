# TESTING

## Стратегия

| Слой | Инструмент | Статус |
|------|------------|--------|
| Unit / integration | Vitest 5 + jsdom | Зависимости установлены; config — P1 |
| React components | Testing Library | Готово к подключению |
| E2E | Playwright | P4+ |
| Content validation | Node script + Zod | P1 CI job |

## Целевой `vitest.config.ts`

- Environment: `jsdom` для компонентов, `node` для парсеров контента.
- Alias `@` → `./src`.
- Setup: `@testing-library/jest-dom`.

## package.json scripts (целевые)

```json
{
  "typecheck": "tsc --noEmit",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

Добавление — отдельный PR на P1.

## Что тестировать обязательно

1. Zod-схемы: valid/invalid fixtures из `content/__fixtures__/` (будущее).
2. Token → CSS generator (export).
3. Утилиты путей контента (`resolveStylePath`).
4. Критические UI: Button, Dialog a11y props.

## Что не тестировать

- Снимки всего layout без причины.
- Детали Tailwind классов — предпочитать поведение/DOM.

## CI (GitHub Actions, целевой)

```yaml
# .github/workflows/ci.yml — P1
jobs:
  verify:
    steps:
      - pnpm install --frozen-lockfile
      - pnpm lint
      - pnpm typecheck
      - pnpm test
      - pnpm exec tsx scripts/validate-content.ts
```

## Playwright (позже)

- Smoke: home, один style page, export CLI happy path.
- axe-core вложенные проверки на shell.

## Локальный прогон перед PR

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm test
```
