---
name: prompt-authoring
description: Пишет промпты для дизайнеров/агентов по стилю — структурированно, без slop. Использовать для prompts.md в content/styles или export пакетов.
---

# prompt-authoring

## 1. Название

`prompt-authoring`

## 2. Назначение

Создать **воспроизводимые промпты**, привязанные к токенам и traits стиля.

## 3. Когда применять

- Файл `content/styles/<id>/prompts.md` или секция в export.
- Обновление после смены `tokens.json`.

## 4. Когда НЕ применять

- Промпт «сделай красивый сайт» без style id.
- До завершения `design-research`.

## 5. Входы

- `style id`, traits, token summary.
- Аудитория: coding agent | human designer | image model.

## 6. Пошаговая процедура

1. Прочитать `style.json`, `overview.md`, `tokens.json`.
2. Структура файла:
   - `## Context` — что за стиль, 3–5 traits с источниками.
   - `## Constraints` — anti-patterns, banned UI.
   - `## Token summary` — вставка ключевых vars (не весь JSON).
   - `## Layout` — сетка, ритм, типографика.
   - `## Components` — список допустимых блоков.
   - `## Verification` — чеклист для `agent-result-verification`.
3. Для coding agent: явно «use CSS variables / token names, no hex in components».
4. Длина: 80–200 строк max; без повторов.
5. Прогнать `content-validation` на связанный JSON.

## 7. Требования к результату

- Промпт воспроизводим: два агента получают согласованный визуал при одинаковых tokens.
- Упоминание DESIGN.md export формата если применимо.

## 8. Проверки качества

- [ ] Нет vague adjectives без критериев.
- [ ] Есть negative constraints.
- [ ] Ссылка на `swiss-international` только если id совпадает.

## 9. Запреты

- Копипаста generic «SaaS landing».
- Требовать библиотеки вне стека без обоснования.

## 10. Примеры

```markdown
## Constraints
- No purple gradients, no glassmorphism, no fake dashboards
- Type: grotesk stack per tokens.font.sans
```

## 11. Связанная документация

- [docs/EXPORT_FORMAT.md](../../../docs/EXPORT_FORMAT.md)
- `.agents/skills/design-md-generator/`, `agent-result-verification/`
