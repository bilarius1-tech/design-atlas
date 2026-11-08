---
name: agent-result-verification
description: Проверяет fidelity реализации coding agent относительно экспортированного DESIGN.md и design system tokens. Использовать после handoff DESIGN.md → код/UI.
---

# agent-result-verification

## 1. Название

`agent-result-verification`

## 2. Назначение

Убедиться, что **результат coding agent** соответствует DESIGN.md и SSOT tokens, а не «похожему» generic UI.

## 3. Когда применять

- После имплементации по `content/styles/<id>/exports/DESIGN.md`.
- Ревью PR, где автор ссылался на DESIGN.md/prompts.

## 4. Когда НЕ применять

- PR без design handoff.
- DESIGN.md сгенерирован вручную, не из JSON (сначала `design-md-generator`).

## 5. Входы

- Путь к `DESIGN.md` + исходные `tokens.json`.
- Артефакт агента: branch, URL, или список файлов.
- Опционально: промпт из `prompt-authoring`.

## 6. Пошаговая процедура

1. Загрузить DESIGN.md; извлечь checksum/version если есть.
2. Повторно сгенерировать expected token set из `tokens.json` (`design-md-generator` или diff JSON).
3. **Token fidelity:** grep UI/CSS на hex/radius — каждый должен мапиться на token из DESIGN.md (допустимы только CSS var aliases).
4. **Structure fidelity:** секции из DESIGN.md (type scale, color roles) присутствуют в UI; нет лишних marketing блоков не из spec.
5. **Anti-patterns:** сверить Constraints из prompts/DESIGN — violations = fail.
6. Запустить `visual-quality-audit`, `accessibility-audit`, `responsive-audit` на результат.
7. Сводная матрица:

   | Критерий | DESIGN.md ref | Implementation | Pass |
   |----------|---------------|----------------|------|

8. Verdict: `accepted` | `rework` | `reject`; для `rework` — минимальный список правок.

## 7. Требования к результату

- Отчёт пригоден для ACCEPT фазы workflow.
- Расхождения количественно: N token mismatches, M banned patterns.

## 8. Проверки качества

- [ ] DESIGN.md не редактировался post-hoc без regen.
- [ ] Coding agent не добавил deps вне стека без guard OK.

## 9. Запреты

- Принимать «close enough» визуал.
- Игнорировать banned fake interactivity.

## 10. Примеры

**Handoff:** передать coding agent только `exports/DESIGN.md` + instruction «implement static demo».

**Fail:** impl uses `#6366f1` not in tokens → **rework** map to `--color-accent`.

## 11. Связанная документация

- [docs/EXPORT_FORMAT.md](../../../docs/EXPORT_FORMAT.md), [docs/AGENT_WORKFLOW.md](../../../docs/AGENT_WORKFLOW.md)
- `.agents/skills/design-md-generator/`, `prompt-authoring/`, `visual-quality-audit/`
