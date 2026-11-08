---
name: component-authoring
description: Добавляет UI-компоненты Design Atlas по спекам design/components и токенам. Использовать для примитивов app shell, не для demo стилей без тикета.
---

# component-authoring

## 1. Название

`component-authoring`

## 2. Назначение

Реализовать React-компонент **после** DS-спеки, с a11y и тестами по необходимости.

## 3. Когда применять

- Новый примитив (Button, Text, Stack) в `src/`.
- Расширение API существующего примитива.

## 4. Когда НЕ применять

- Демо-лендинг стиля (скилл `demo-landing-authoring`).
- Декоративные one-off без записи в `design/components/`.

## 5. Входы

- Имя компонента, варианты, a11y-требования.
- Ссылка на спеку в `design/components/<name>.md` (создать при отсутствии).

## 6. Пошаговая процедура

1. Прочитать [docs/DESIGN_SYSTEM.md](../../../docs/DESIGN_SYSTEM.md) и `.cursor/rules/02-typescript-react.mdc`.
2. Создать/обновить спеку `design/components/<Name>.md`: anatomy, variants, tokens used, a11y.
3. Реализовать в `src/components/<name>/` (или согласованный путь проекта).
4. Стили — Tailwind + CSS variables; варианты через `cva` или data-attributes (как в существующих файлах).
5. Radix — только если нужен focus trap/listbox/dialog.
6. Экспорт barrel `index.ts` при паттерне каталога.
7. Тест RTL если есть ветвления/состояния; иначе unit на helpers.
8. `pnpm lint && pnpm typecheck && pnpm test`.

## 7. Требования к результату

- Публичный API типизирован; props documented в спеке.
- Нет hardcoded colors/spacing.

## 8. Проверки качества

- [ ] Скилл `accessibility-audit` для интерактива.
- [ ] `architecture-guard` при новых deps.

## 9. Запреты

- `any` в props.
- Фейковые disabled/loading без семантики.
- Подключение icon packs вне Lucide без обоснования.

## 10. Примеры

**Button:** variants `primary | ghost`; uses `--color-accent`; native `<button>`.

## 11. Связанная документация

- [docs/DESIGN_SYSTEM.md](../../../docs/DESIGN_SYSTEM.md)
- `.agents/skills/design-tokens/`, `.cursor/rules/07-accessibility.mdc`
