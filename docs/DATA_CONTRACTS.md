# DATA CONTRACTS

Контракты v1. Runtime-валидация: **Zod**. При расхождении с этим документом исправляется документ и схема в одном PR.

## Общие типы

### LocalizedString

```typescript
type LocalizedString = {
  en: string;
  ru?: string;
  [locale: string]: string | undefined;
};
```

Минимум `en` для `published` записей.

### Source

```typescript
type Source = {
  title: string;
  url?: string;
  note?: string;
};
```

## StyleMeta (`content/styles/<id>/meta.json`)

```typescript
const StyleMeta = z.object({
  id: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  schemaVersion: z.string(), // e.g. "1.0.0"
  status: z.enum(["draft", "published", "archived"]),
  title: LocalizedStringSchema,
  summary: LocalizedStringSchema,
  tags: z.array(z.string().regex(/^[a-z0-9-]+$/)).default([]),
  era: z
    .object({
      start: z.number().int().optional(),
      end: z.number().int().optional(),
      label: z.string().optional(),
    })
    .optional(),
  tokensRef: z.string().startsWith("design/"),
  promptRefs: z
    .record(z.string(), z.string())
    .optional(),
  related: z.array(z.string()).optional(),
  sources: z.array(SourceSchema).default([]),
});
```

### Инварианты

- `id` === имя родительской папки.
- `tokensRef` указывает на существующий файл (проверка в CI, P1+).
- `published` требует: `summary.en`, `sources.length >= 1`, валидный `tokensRef`.

## Content index (`content/index.json`)

```typescript
const ContentIndex = z.object({
  schemaVersion: z.string(),
  styles: z.array(
    z.object({
      id: z.string(),
      path: z.string(), // e.g. "content/styles/swiss-international"
    }),
  ),
  glossary: z
    .array(z.object({ id: z.string(), path: z.string() }))
    .default([]),
});
```

## Design tokens (`design/**/tokens.json`)

См. [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) и ADR-0004. Минимальный контракт:

```typescript
const TokenFile = z.object({
  schemaVersion: z.string(),
  meta: z.object({
    name: z.string(),
    styleId: z.string().optional(), // для style-specific
  }),
  tokens: z.record(z.string(), z.union([z.string(), z.number()])),
});
```

Ключи токенов: dot-notation, lowercase (`color.background`, `font.family.sans`).

## Export manifest (фрагмент)

Полный bundle — [EXPORT_FORMAT.md](EXPORT_FORMAT.md).

```typescript
const ExportManifest = z.object({
  exportVersion: z.string(),
  generatedAt: z.string().datetime(),
  styleId: z.string(),
  includes: z.array(z.enum(["tokens", "css", "prompt", "meta"])),
  checksums: z.record(z.string(), z.string()).optional(),
});
```

## Версионирование

- **schemaVersion** (контент): major при удалении/переименовании обязательных полей.
- **exportVersion** (экспорт): major при несовместимом layout bundle.

Миграции: скрипт в `scripts/migrate-content-vX.ts` (будущее) + запись в CHANGELOG.

## Пример валидной записи (фрагмент)

```json
{
  "id": "swiss-international",
  "schemaVersion": "1.0.0",
  "status": "draft",
  "title": { "en": "Swiss International Style", "ru": "Швейцарский интернациональный стиль" },
  "summary": { "en": "Grid-based modernism rooted in Helvetica and objective photography." },
  "tags": ["modernism", "typography", "grid"],
  "tokensRef": "design/styles/swiss-international/tokens.json",
  "sources": [{ "title": "Müller-Brockmann, Grid Systems", "note": "canonical reference" }]
}
```

Файл в Phase 1 **не обязателен** — пример для авторов и агентов.
