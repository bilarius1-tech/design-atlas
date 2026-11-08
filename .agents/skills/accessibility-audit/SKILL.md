---
name: accessibility-audit
description: Аудит a11y интерактивного UI — семантика, keyboard, ARIA, контраст. Использовать перед merge UI и после demo landing.
---

# accessibility-audit

## 1. Название

`accessibility-audit`

## 2. Назначение

Систематически проверить **WCAG-oriented** качество без подмены автотестом здравого смысла.

## 3. Когда применять

- Новые интерактивные компоненты.
- Demo landing с навигацией/кнопками.
- Изменения focus styles.

## 4. Когда НЕ применять

- Статический JSON/Markdown без UI.

## 5. Входы

- Страница или story URL.
- Список интерактивных элементов.

## 6. Пошаговая процедура

1. Прочитать [docs/ACCESSIBILITY.md](../../../docs/ACCESSIBILITY.md).
2. **Keyboard:** Tab order логичен; видимый focus; Esc закрывает overlays (если есть).
3. **Semantics:** роли элементов соответствуют поведению; headings не пропускают уровни на странице.
4. **Images/icons:** alt / `aria-hidden` для декоративных.
5. **Contrast:** пары text/surface из tokens — минимум 4.5:1 body, 3:1 large (оценка по вычисленным значениям или DevTools).
6. **Motion:** respect `prefers-reduced-motion`.
7. Зафиксировать issues: Severity A/B/C + элемент + рекомендация.
8. A-критичные — блок merge.

## 7. Требования к результату

- Таблица findings; явный verdict `pass` | `conditional` | `fail`.
- Для `conditional` — список отложенных с тикетом.

## 8. Проверки качества

- [ ] Нет div-button anti-pattern.
- [ ] Focus не снят глобально в CSS.

## 9. Запреты

- Псевдо-tabs без `tablist`/`aria-selected`.
- Скрытый контент только hover без focus path.

## 10. Примеры

**Fail:** icon-only button без `aria-label` → add label «Close dialog».

## 11. Связанная документация

- [docs/ACCESSIBILITY.md](../../../docs/ACCESSIBILITY.md)
- `.cursor/rules/07-accessibility.mdc`, `.agents/skills/component-authoring/`
