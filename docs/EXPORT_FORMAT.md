# EXPORT FORMAT

Экспорт позволяет забрать стиль в другой проект или скормить агенту **детерминированный** набор артефактов.

## Версия контракта

`exportVersion`: **1.0.0** (см. ADR-0007).

## Bundle layout

Имя архива: `design-atlas-<styleId>-<exportVersion>.zip` (или директория с тем же корнем).

```
design-atlas-swiss-international-1.0.0/
├── manifest.json           # ExportManifest
├── meta.json               # Копия StyleMeta (published fields only)
├── tokens.json             # Design tokens
├── tokens.css              # :root { --token: value; }
├── prompt/
│   ├── system.txt          # Опционально
│   └── user-template.txt   # Плейсхолдеры {{title}}, {{tokens_summary}}
└── README.md               # Инструкция по применению
```

## manifest.json

| Поле | Описание |
|------|----------|
| `exportVersion` | Semver формата экспорта |
| `generatedAt` | ISO 8601 UTC |
| `styleId` | Канонический id |
| `includes` | Список включённых секций |
| `checksums` | SHA-256 по файлам (optional P2) |

## tokens.css

Генерация:

1. Для каждого ключа `a.b.c` → CSS variable `--da-a-b-c` (kebab).
2. Значения — как в JSON (строки).
3. Корневой селектор `:root` или `.style-<styleId>` если `scoped: true` в опциях экспорта.

## Промпты

Генерация по ADR-0005:

- Только поля из `meta.json` и сводка токенов (ключевые цвета/шрифты).
- Запрет включать непроверенные источники.
- `user-template.txt` — с явными секциями: Context, Visual rules, Tokens, Constraints.

## API (будущее)

CLI: `pnpm exec design-atlas export --style swiss-international --out ./dist`

Реализация в `src/features/export/` (P3).

## Валидация

Перед упаковкой:

1. Zod `StyleMeta` + `TokenFile`.
2. `status === published` или флаг `--allow-draft` для внутреннего use.

## Совместимость

| exportVersion | Изменения |
|---------------|-----------|
| 1.0.0 | Начальный layout |

Major bump при переименовании обязательных файлов или смене семантики `tokens.css`.
