---
name: style-authoring
description: Авторит content/styles/<id>/ — style.json, нарратив, связь с tokens. Использовать после design-research и утверждённых контрактов.
---

# style-authoring

## 1. Название

`style-authoring`

## 2. Назначение

Создать или обновить **каталог стиля** в Git по контрактам, готовый к валидации и export.

## 3. Когда применять

- Human/ticket одобрил новый `<id>`.
- Обновление метаданных/версии стиля.

## 4. Когда НЕ применять

- Нет `docs/research` или CONTENT-REVIEW для нового нарратива.
- Массовое создание стилей (banned в Phase 1).

## 5. Входы

- `id` (например `swiss-international`).
- Research doc или ссылки.
- Версия контракта [docs/DATA_CONTRACTS.md](../../../docs/DATA_CONTRACTS.md).

## 6. Пошаговая процедура

1. Создать каталог `content/styles/<id>/` если отсутствует.
2. Добавить/обновить `style.json`:
   - `id`, `version`, `title`, `summary`, `status` (`draft`|`review`|`published`)
   - `references[]` (url, label)
   - **без** локализованного id.
3. Добавить нарратив: `index.mdx` или `overview.md` — структура H2/H3, короткие абзацы.
4. Координировать `tokens.json` со скиллом `design-tokens` (не дублировать app `design/tokens/`).
5. Запустить валидацию: скилл `content-validation`.
6. Если `status: published` — STYLE-REVIEW + CONTENT-REVIEW шаблоны.

## 7. Требования к результату

- Полный минимальный набор файлов в `content/styles/<id>/`.
- JSON валиден по Zod (когда схемы в коде подключены — `pnpm test`).

## 8. Проверки качества

- [ ] Тон редакционный, без маркетингового шума.
- [ ] slug не переведён.
- [ ] Версия поля при breaking change.

## 9. Запреты

- Публиковать без review.
- Вшивать токены только в MD без `tokens.json`.

## 10. Примеры

```
content/styles/swiss-international/
  style.json
  tokens.json      # делегировать design-tokens
  overview.md
```

## 11. Связанная документация

- [docs/CONTENT_MODEL.md](../../../docs/CONTENT_MODEL.md), [docs/DATA_CONTRACTS.md](../../../docs/DATA_CONTRACTS.md)
- [docs/templates/CONTENT-REVIEW.md](../../../docs/templates/CONTENT-REVIEW.md)
- `.cursor/rules/04-style-content.mdc`
