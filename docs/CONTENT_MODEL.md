# CONTENT MODEL

## Принципы

- Каждая сущность имеет стабильный `id` (kebab-case, ASCII, language-independent).
- Человекочитаемые названия — в localized полях или в Markdown, не в id.
- Одна каноническая JSON-запись на сущность; нарратив — опционально в MD/MDX.

## Дерево каталогов (целевое)

```
content/
├── styles/                 # Визуальные стили
│   └── <id>/
│       ├── meta.json       # Обязательно
│       ├── article.mdx     # Опционально
│       └── references.json # Опционально
├── movements/              # Движения/школы (опционально v2)
├── glossary/               # Термины
└── index.json              # Реестр id → путь, версия схемы
```

Phase 1: каталоги пустые; структура фиксируется документацией.

## Сущность: Style

Минимальный каркас (детали — [DATA_CONTRACTS.md](DATA_CONTRACTS.md)):

| Поле | Тип | Примечание |
|------|-----|------------|
| `id` | string | `swiss-international` |
| `schemaVersion` | string | Semver схемы |
| `status` | enum | `draft` \| `published` \| `archived` |
| `title` | localized object | `{ "en": "...", "ru": "..." }` |
| `summary` | localized object | Кратко, ≤ 320 символов на локаль |
| `tags` | string[] | lowercase, без пробелов |
| `era` | object? | `{ start?: number, end?: number, label?: string }` |
| `tokensRef` | string | Путь от корня репо, напр. `design/styles/swiss-international/tokens.json` |
| `promptRefs` | object? | Ключи по [ADR-0005](decisions/ADR-0005-prompt-generation.md) |
| `sources` | array | `{ title, url?, note? }` |

## Сущность: GlossaryTerm

| Поле | Тип |
|------|-----|
| `id` | string |
| `term` | localized |
| `definition` | localized |
| `relatedStyles` | string[] (style ids) |

## MDX frontmatter

```yaml
---
id: swiss-international
contentType: style-article
locale: ru
---
```

`id` должен совпадать с `meta.json` в той же папке.

## Связи

```
Style ──tokensRef──► design/styles/<id>/tokens.json
Style ──promptRefs──► content/styles/<id>/prompts/*.json (будущее)
Style ──related──► Style[] (ids)
GlossaryTerm ──► Style[]
```

## Жизненный цикл

1. `draft` — валидация в CI может быть warning-only до P1.
2. `published` — обязательны title, summary, tokensRef, минимум один source.
3. `archived` — не показывать в индексе; экспорт с флагом `deprecated`.

## Правила для агентов

- Не создавать параллельные id (`swiss`, `swiss-style`) для одной сущности.
- Не переводить id; переводить только localized поля.
- Новые сущности — сначала обновить DATA_CONTRACTS + PR на схему, потом JSON.
