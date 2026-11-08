---
name: design-tokens
description: Ведёт SSOT токенов в design/tokens и content/styles/<id>/tokens.json, синхронизирует CSS variables и export. Использовать при темах, стилях и DESIGN.md export.
---

# design-tokens

## 1. Название

`design-tokens`

## 2. Назначение

Единый **источник истины** для design tokens приложения и стилей библиотеки; запрет дублирования в UI.

## 3. Когда применять

- Новая тема/цвет/spacing в `design/tokens/`.
- `content/styles/<id>/tokens.json` для визуального стиля.
- Подготовка export ([docs/EXPORT_FORMAT.md](../../../docs/EXPORT_FORMAT.md)).

## 4. Когда НЕ применять

- Одноразовый прототип вне Git (не коммитить).
- Замена всей темы без ADR при breaking rename.

## 5. Входы

- Область: `app` | `style:<id>`.
- Семантика токенов (color.text.primary, space.4, …).
- Целевые потребители: `globals.css`, Tailwind theme, export.

## 6. Пошаговая процедура

1. Определить SSOT-файл:
   - App → `design/tokens/**/*.json` (или согласованная структура из [docs/DESIGN_SYSTEM.md](../../../docs/DESIGN_SYSTEM.md)).
   - Style → `content/styles/<id>/tokens.json`.
2. Именование: dot-path, kebab в CSS var: `--color-text-primary`.
3. Прописать значения; **не** копировать в `src/**/*.tsx`.
4. Обновить `src/app/globals.css` / `@theme` только как **проекция** токенов app.
5. Если export pipeline есть — прогнать генерацию; иначе проверить вручную соответствие ключей [docs/EXPORT_FORMAT.md](../../../docs/EXPORT_FORMAT.md).
6. Добавить/обновить Zod-схему токенов + тест парсинга.
7. `pnpm typecheck && pnpm test`.

## 7. Требования к результату

- Токены читаются из JSON; UI ссылается на semantic classes/vars.
- Style tokens изолированы от app theme.

## 8. Проверки качества

- [ ] Grep: нет новых `#RRGGBB` в TSX кроме stories/fixtures.
- [ ] Контраст пары text/surface документирован.
- [ ] Export воспроизводим из JSON.

## 9. Запреты

- Второй SSOT в README/комментариях.
- Смешивать style и app tokens в одном файле без ADR.

## 10. Примеры

**App:** `design/tokens/color.json` → `--color-surface-base` в `globals.css`.

**Style:** `content/styles/swiss-international/tokens.json` → export DESIGN.md section `Tokens`.

## 11. Связанная документация

- [docs/DESIGN_SYSTEM.md](../../../docs/DESIGN_SYSTEM.md), [docs/EXPORT_FORMAT.md](../../../docs/EXPORT_FORMAT.md)
- `.cursor/rules/05-design-system.mdc`
