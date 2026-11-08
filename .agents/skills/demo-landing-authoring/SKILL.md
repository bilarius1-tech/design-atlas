---
name: demo-landing-authoring
description: Создаёт демо-лендинг визуального стиля по tokens и style content. Использовать только с тикетом вне Phase 1 default ban.
---

# demo-landing-authoring

## 1. Название

`demo-landing-authoring`

## 2. Назначение

Собрать **демонстрационную страницу**, показывающую визуальный язык стиля, а не функции Atlas.

## 3. Когда применять

- Явный тикет после Phase 1 / исключение в ADR.
- Есть `content/styles/<id>/tokens.json` + approved нарратив.

## 4. Когда НЕ применять

- Phase 1 default ([AGENTS.md](../../../AGENTS.md) ban #7).
- Нет валидных токенов или research.

## 5. Входы

- `style id`.
- Макет-секции (hero, typographic scale, color, components showcase).
- Ограничения performance/a11y.

## 6. Пошаговая процедура

1. CONFIRM ticket/phase — иначе **STOP**.
2. Загрузить `tokens.json`; подключить через theme scope (CSS vars на контейнере `[data-style="<id>"]`).
3. Маршрут: только согласованный в [docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md) (например `src/app/styles/[id]/page.tsx` когда разрешено).
4. Секции:
   - Типографическая шкала (реальные тексты из `overview.md`, не lorem маркетинг).
   - Цветовые пары с контрастом.
   - 2–4 компонентных примера без fake checkout/wizard.
5. **Без** псевдо-форм, fake API, carousel ради carousel.
6. `responsive-audit` + `visual-quality-audit` + `accessibility-audit`.
7. `pnpm build` — страница собирается.

## 7. Требования к результату

- Страница читается без JS (контент виден).
- Все визуальные константы из tokens.

## 8. Проверки качества

- [ ] Нет CTA «Sign up» без backend.
- [ ] Нет stock gradient hero slop.
- [ ] data-style изолирует theme.

## 9. Запреты

- Переиспользовать app marketing copy.
- Интерактив без клавиатуры.

## 10. Примеры

**swiss-international:** asymmetric grid demo, Helvetica stack, single accent red, editorial copy.

## 11. Связанная документация

- [docs/CONTENT_MODEL.md](../../../docs/CONTENT_MODEL.md)
- `.agents/skills/design-tokens/`, `responsive-audit`, `visual-quality-audit`
