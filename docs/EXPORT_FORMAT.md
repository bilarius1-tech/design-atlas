# EXPORT FORMAT

Экспорт превращает **published** стиль в Design Pack (ZIP) из Git SSOT.

См. [ADR-0008](decisions/ADR-0008-design-pack-export-engine.md). Legacy плоский layout ADR-0007 сохранён как исторический контракт; актуальный — **Design Pack format 1.0**.

## Версии

| Поле | Значение |
|------|----------|
| `format` | `design-atlas-pack` |
| `formatVersion` | `1.0` |
| `generatorVersion` | SemVer генератора (`src/features/export`) |
| Style version | из `style.json` |

Имя архива: `design-atlas-<slug>-v<styleVersion>-<packKind>.zip`  
Корень внутри: `design-atlas-<slug>-v<styleVersion>-<packKind>/`

## Режимы

### Free Export (`packKind: free`)

Полезный agent-ready набор (сценарий DesignPrompts: промпт + правила → UI):

- `README.md`, `manifest.json`
- `design-system/DESIGN.md`, `TOKENS.md`, `AGENT-INSTRUCTIONS.md`, `STYLE-PHILOSOPHY.md`
- `prompts/prompt.ru.md`, `prompt.en.md` (coding agent)
- `prompts/prompt.constructor.ru.md`, `prompt.constructor.en.md` (page constructor / constructor agent)
- `tokens/*` (json splits + `tokens.css` + `tokens.json`)
- `components/index.json`

### Full Design Pack (`packKind: full`)

Всё из Free плюс (если есть в SSOT):

- `CHANGELOG.md`
- `design-system/LAYOUT-RULES.md`, `TYPOGRAPHY.md`, `COMPONENT-GUIDELINES.md`
- `tokens/typography-roles.json` (из `typography.json`)
- `examples/demo-landing/demo.json`

PHASE 7: Full доступен только internal (`DESIGN_ATLAS_ALLOW_FULL_EXPORT=1`). Публичный UI честно помечает «в разработке».

## manifest.json

Zod: `ExportManifestSchema` в `src/core/schemas/export-manifest.ts`.

Каждый файл в `files[]`: `path`, `bytes`, `sha256`, опционально `contentType`.

Генерация **детерминирована**: без wall-clock в содержимом файлов (кроме явного `generatedAt` только в manifest — фиксируемый в тестах через inject). По умолчанию `generatedAt` стабилен от version+generator+style hash или опускается из checksums body — в PHASE 7 `generatedAt` = ISO от style `updatedAt` (не Date.now).

## API

- `GET /api/export/[styleId]?pack=free|full` → ZIP
- CLI: `pnpm export:pack --style <id> --pack free|full --out <dir>`

## Валидация

Перед ZIP: entitlements → resolver → generator → validator (обязательные пути, banlist, JSON parse).

## Совместимость

| formatVersion | Изменения |
|---------------|-----------|
| 1.0 | Design Pack layout PHASE 7 |
