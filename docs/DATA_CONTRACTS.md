# DATA CONTRACTS

Контракты v1. Runtime-валидация: **Zod** (`src/core/schemas`). При расхождении с этим документом исправляются документ и схема в одном PR.

Источник контента стилей: `content/styles/<id>/` (не БД).

## Общие типы

### LocalizedString

```typescript
type LocalizedString = { ru: string; en: string };
```

### Source

```typescript
type Source = { title: string; url?: string; note?: string };
```

### StyleStatus

`draft` | `review` | `published` | `archived`

## StyleDefinition (`style.json`)

Обязательные поля:

| Поле | Тип |
|------|-----|
| `schemaVersion` | `"1.0.0"` |
| `id`, `slug` | kebab-case, **должны совпадать** и совпадать с именем папки |
| `status` | StyleStatus |
| `version` | string (версия стиля) |
| `title`, `shortDescription`, `philosophy` | LocalizedString |
| `category` | kebab-case |
| `tags` | kebab-case[] |
| `complexity` | `low` \| `medium` \| `high` |
| `visualDensity` | `sparse` \| `balanced` \| `dense` |
| `contrast` | `low` \| `medium` \| `high` |
| `bestUseCases`, `avoidFor` | string[] (min 1) |
| `relatedStyles` | style id[] |
| `fontFamilies` | string[] (min 1) |
| `author` | string |
| `updatedAt` | ISO datetime |
| `sources` | Source[] |

Инварианты:

- `published` → `sources.length >= 1`
- `relatedStyles` не содержит собственный `id`
- неизвестные `relatedStyles` — error для `published`, warning для `draft`

## StyleTokens (`tokens.json`)

Категории: `colors`, `typography`, `spacing`, `geometry`, `effects` + `meta.styleId`.

`meta.styleId` === имя папки.

## TypographyDefinition (`typography.json`)

Роли: `display`, `h1`–`h4`, `bodyLarge`, `body`, `caption`, `label`, `quote`, `code`.

Обязателен для `published` / `review`; для `draft` — optional (warning если нет).

## ComponentsDefinition (`components.json`)

Группы playground: `typography`, `buttons`, `forms`, `shapes`, `cards`, `navigation`, `feedback`, `icons`.

## DemoDefinition (`demo.json`)

Секции лендинга: `header`, `hero`, `features`, `editorial`, `showcase`, `statistics`, `testimonials`, `pricing`, `faq`, `cta`, `footer`.

## Markdown companions

Для `review` / `published` обязательны:

`rules.md`, `prompt.ru.md`, `prompt.en.md`, `DESIGN.md`, `TOKENS.md`, `AGENT-INSTRUCTIONS.md`, `CHANGELOG.md`

Для `draft` отсутствие = warning.

## Content index (`content/index.json`)

```typescript
{
  schemaVersion: "1.0.0",
  styles: [{ id: string, path: "content/styles/<id>" }],
  glossary: [{ id: string, path: string }]
}
```

Каждая папка в `content/styles/` должна быть в индексе и наоборот.

## Команды

```bash
pnpm content:validate
pnpm test
```

Реализация: `src/core/content/*`.

## Версионирование

- **schemaVersion** контента: major при удалении/переименовании обязательных полей.
- Миграции: `scripts/migrate-content-vX.ts` (будущее) + CHANGELOG.
