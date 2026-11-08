---
name: responsive-audit
description: Проверяет адаптивность вёрстки на breakpoints и переполнения. Использовать после UI-изменений и demo landing.
---

# responsive-audit

## 1. Название

`responsive-audit`

## 2. Назначение

Выявить поломки layout на **320 / 768 / 1280** (минимум) без субъективного «вроде норм».

## 3. Когда применять

- Новые страницы/секции в `src/`.
- После `demo-landing-authoring`.

## 4. Когда НЕ применять

- Изменения только в JSON content без UI.

## 5. Входы

- URL path или компонент для проверки.
- Список breakpoints из `design/tokens/breakpoint.json` (или defaults ниже).

## 6. Пошаговая процедура

1. Запустить `pnpm dev` (или `pnpm build && pnpm start` для prod check).
2. Для каждой ширины **320, 768, 1280, 1536**:
   - Проверить горизонтальный scroll (`document.documentElement.scrollWidth <= innerWidth`).
   - Проверить перенос заголовков, min tap target 44px для кнопок.
   - Проверить images `max-width: 100%`.
3. Проверить `prefers-reduced-motion` — анимации не обязательны для чтения.
4. Зафиксировать findings: screenshot optional, обязательны **селектор + breakpoint + fix**.
5. Критичные — исправить до ACCEPT; minor — в backlog с ссылкой.

## 7. Требования к результату

- Отчёт markdown: Passed / Failed per breakpoint.
- Failed — с конкретным CSS/классом для правки.

## 8. Проверки качества

- [ ] Нет фиксированных `width: 1200px` без media.
- [ ] Контейнеры используют token spacing.

## 9. Запреты

- Закрывать audit без проверки 320px.
- «Исправлено на глаз» без повторного прогона.

## 10. Примеры

**Fail:** hero `grid-cols-3` на 320 → **Fix:** `grid-cols-1 md:grid-cols-3`.

## 11. Связанная документация

- [docs/ACCESSIBILITY.md](../../../docs/ACCESSIBILITY.md)
- `.cursor/rules/03-visual-quality.mdc`
