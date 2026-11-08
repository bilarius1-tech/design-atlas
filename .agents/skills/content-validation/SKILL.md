---
name: content-validation
description: Валидирует content/ и design JSON по контрактам Zod. Использовать после правок style.json, tokens.json и каталогов стилей.
---

# content-validation

## 1. Название

`content-validation`

## 2. Назначение

Механически подтвердить, что **структурный контент** соответствует [docs/DATA_CONTRACTS.md](../../../docs/DATA_CONTRACTS.md).

## 3. Когда применять

- Любое изменение `content/styles/**`.
- Перед `design-md-generator` и publish status.

## 4. Когда НЕ применять

- Только орфография в MD без JSON (использовать CONTENT-REVIEW).

## 5. Входы

- Пути файлов или `style id`.
- Версия схем (из кода или docs).

## 6. Пошаговая процедура

1. Перечислить JSON в scope: `style.json`, `tokens.json`, иные по CONTENT_MODEL.
2. Если в `src/` есть Zod-схемы — импортировать и `.parse()` каждый файл (написать временный script в `tests/` если нет CLI).
3. Иначе — ручная сверка полей с [docs/DATA_CONTRACTS.md](../../../docs/DATA_CONTRACTS.md) + `pnpm exec node -e` JSON.parse sanity.
4. Проверить id/slug: kebab-case, совпадает с именем папки.
5. Проверить locale: переводимые поля не в id.
6. Запустить `pnpm test` (тесты контрактов when present).
7. Вывести отчёт: file → OK / errors[].

## 7. Требования к результату

- Нулевые ошибки схемы для merge.
- Warnings (deprecated fields) перечислены явно.

## 8. Проверки качества

- [ ] tokens.json не пустой для `published`.
- [ ] version semver в style.json.

## 9. Запреты

- Пропускать валидацию «потому что маленький PR».
- Править контракт в коде без обновления docs.

## 10. Примеры

```bash
pnpm test
# или точечно: vitest content contract когда появится
```

**Error:** folder `Swiss_International` → rename to `swiss-international`.

## 11. Связанная документация

- [docs/CONTENT_MODEL.md](../../../docs/CONTENT_MODEL.md), [docs/DATA_CONTRACTS.md](../../../docs/DATA_CONTRACTS.md)
- `.cursor/rules/04-style-content.mdc`
