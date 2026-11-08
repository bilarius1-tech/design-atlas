# ACCESSIBILITY

Цель: WCAG 2.2 **уровень AA** для app shell; для style preview — минимум AA для текста платформы, предупреждение если preview-стиль ниже порога.

## Обязательства

- Семантический HTML: `main`, `nav`, `header`, `footer`, один `h1` на страницу.
- **Skip link** «Перейти к содержимому» — первый focusable в layout (P1).
- Все интерактивные элементы — keyboard reachable, visible **focus** (`:focus-visible`).
- Изображения: `alt` осмысленный; декоративные — `alt=""`.
- Формы: связка `label` + `id`; ошибки — `aria-describedby`.
- Цвет не единственный носитель смысла (иконка, текст, паттерн).

## Radix

При использовании Dialog, Menu, Tabs:

- Не переопределять поведение focus trap.
- `DialogTitle` / `Description` обязательны.

## Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Тестирование

| Метод | Когда |
|-------|--------|
| eslint-plugin-jsx-a11y | P1 в ESLint |
| axe в Vitest/RTL | Компоненты с forms/dialogs |
| Manual keyboard | Каждый новый flow |
| Playwright + axe | P4+ critical paths |

## Контент

- Заголовки MDX — иерархия без пропусков.
- Язык страницы: `lang` на `<html>`; переключение локали обновляет `lang`.

## Style library caveat

Демонстрация исторического стиля может использовать низкий контраст **внутри** preview frame; рамка и UI платформы остаются доступными.
