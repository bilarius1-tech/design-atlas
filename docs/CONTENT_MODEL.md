# CONTENT MODEL

## Принципы

- Стабильный `id` (kebab-case, ASCII, language-independent).
- Названия — в localized полях / Markdown, не в id.
- Данные стиля не содержат React/JSX.
- Токены стиля живут рядом с метаданными: `content/styles/<id>/tokens.json`.

## Дерево

```
content/
├── index.json
├── styles/
│   └── <id>/
│       ├── style.json              # обязательно
│       ├── tokens.json             # обязательно
│       ├── typography.json         # обязательно для review/published
│       ├── components.json         # обязательно для review/published
│       ├── demo.json               # обязательно для review/published
│       ├── rules.md
│       ├── prompt.ru.md
│       ├── prompt.en.md
│       ├── DESIGN.md
│       ├── TOKENS.md
│       ├── AGENT-INSTRUCTIONS.md
│       ├── CHANGELOG.md
│       └── assets/
├── glossary/
└── categories/ | collections/      # позже
```

## Жизненный цикл

1. `draft` — минимально `style.json` + `tokens.json`; прочие файлы warning.
2. `review` — полный набор JSON + markdown; готовность к аудиту.
3. `published` — проходит `pnpm content:validate` без error; публичный каталог.
4. `archived` — остаётся в Git, скрыт из публичного индекса (UI — позже).

## Связи

```
content/index.json ──► content/styles/<id>/
style.json.id === folder name === tokens.meta.styleId
style.relatedStyles[] ──► другие style id
```

## Правила для агентов

- Не создавать параллельные id одной сущности.
- Не переводить id/slug.
- Новый стиль: папка + запись в `content/index.json` + `pnpm content:validate`.
- Эталон `swiss-international` до PHASE 6 остаётся `draft` (не published).
- `demo.json.compositionId` выбирает раскладку; движок **не** подменяет порядок секций — он берётся из массива `sections`.

Детали полей: [DATA_CONTRACTS.md](DATA_CONTRACTS.md).
