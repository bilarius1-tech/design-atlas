---
name: design-md-generator
description: Генерирует DESIGN.md и согласованные export-артефакты из tokens и style metadata. Использовать перед handoff coding agent или релизом стиля.
---

# design-md-generator

## 1. Название

`design-md-generator`

## 2. Назначение

Собрать **DESIGN.md** строго из SSOT (`tokens.json`, `style.json`), не из скриншотов или JSX.

## 3. Когда применять

- Export стиля по [docs/EXPORT_FORMAT.md](../../../docs/EXPORT_FORMAT.md).
- Handoff в `agent-result-verification`.

## 4. Когда НЕ применять

- Tokens не валидны.
- Черновик без `version` в `style.json`.

## 5. Входы

- Путь `content/styles/<id>/`.
- Целевой формат версии export.
- Опционально: `prompts.md` для appendix.

## 6. Пошаговая процедура

1. Валидировать JSON — скилл `content-validation`.
2. Прочитать [docs/EXPORT_FORMAT.md](../../../docs/EXPORT_FORMAT.md) — обязательные секции.
3. Сгенерировать `DESIGN.md` в `content/styles/<id>/exports/DESIGN.md` (или путь из контракта):
   - Frontmatter: `id`, `version`, `generatedAt` (ISO), `sourceCommit` если доступен git.
   - Sections: Overview, Tokens (tabular), Typography, Color, Spacing, Components guidance, Anti-patterns, Prompt appendix.
4. Таблица токенов — **копия значений из JSON**, без ручных правок в MD.
5. Если есть скрипт генерации в репо — предпочесть его; иначе шаблон из `docs/templates/`.
6. Хеш: записать checksum tokens в конец файла для verification.
7. Добавить тест snapshot/hash при наличии pipeline.

## 7. Требования к результату

- Повторный запуск с теми же JSON даёт идентичный DESIGN.md (deterministic sort keys).
- DESIGN.md самодостаточен для coding agent без доступа к repo.

## 8. Проверки качества

- [ ] Нет hex в MD, отсутствующих в JSON.
- [ ] Version bump при breaking token rename.

## 9. Запреты

- Редактировать DESIGN.md вручную без regeneration.
- Включать copyrighted assets без license note.

## 10. Примеры

```
content/styles/swiss-international/exports/DESIGN.md
checksum: sha256:...
```

## 11. Связанная документация

- [docs/EXPORT_FORMAT.md](../../../docs/EXPORT_FORMAT.md), [docs/DATA_CONTRACTS.md](../../../docs/DATA_CONTRACTS.md)
- `.agents/skills/design-tokens/`, `agent-result-verification/`
