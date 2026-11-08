---
name: visual-quality-audit
description: Ревью визуального качества на anti-slop, иерархию и соответствие стилю/tokens. Использовать для UI, демо и маркетинговых секций.
---

# visual-quality-audit

## 1. Название

`visual-quality-audit`

## 2. Назначение

Отсечь **generic AI UI** и расхождения с токенами/референс-стилем.

## 3. Когда применять

- Перед PR с визуальными изменениями.
- После `demo-landing-authoring`.
- Ревью контентных иллюстраций/mdx.

## 4. Когда НЕ применять

- Чисто backend/utility без UI.

## 5. Входы

- Скриншоты или dev URL.
- `style id` или app DS.
- `tokens.json` / theme reference.

## 6. Пошаговая процедура

1. Открыть [docs/templates/STYLE-REVIEW.md](../../../docs/templates/STYLE-REVIEW.md) чеклист.
2. **Anti-slop scan:** gradient hero, 3 identical cards, meaningless icons, Inter+purple default.
3. **Иерархия:** один dominant H1 per view; spacing scale из tokens.
4. **Согласованность:** радиусы/тени — не больше 2 уровней.
5. **Стиль:** если `swiss-international` — objectivity, grid, restrained palette (не обязательна historical accuracy в Phase 1).
6. Сравнить computed styles ключевых блоков с token names (DevTools).
7. Вердикт + список правок с приоритетом.

## 7. Требования к результату

- Минимум 5 проверенных критериев с pass/fail.
- Fail items actionable (класс/token to change).

## 8. Проверки качества

- [ ] Нет новых цветов вне tokens.
- [ ] Текст не lorem-marketing.

## 9. Запреты

- Одобрять «красиво» без критериев.
- Добавлять украшения вместо исправления иерархии.

## 10. Примеры

**Fail:** shadow-2xl на каждой карточке → reduce to token `shadow.sm`.

## 11. Связанная документация

- `.cursor/rules/03-visual-quality.mdc`
- [docs/DESIGN_SYSTEM.md](../../../docs/DESIGN_SYSTEM.md)
