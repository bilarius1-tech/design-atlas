# DESIGN SYSTEM

Дизайн-система Design Atlas покрывает **app shell** (платформа) и задаёт **контракт** для style-specific токенов.

## Структура `design/`

```
design/
├── system/                 # Платформа
│   ├── tokens.json         # Базовые токены
│   └── themes/
│       ├── light.css       # CSS variables
│       └── dark.css
└── styles/
    └── <style-id>/
        └── tokens.json     # Переопределения / палитра стиля
```

## Token model (ADR-0004)

| Категория | Примеры ключей |
|-----------|----------------|
| color | `color.bg`, `color.fg`, `color.accent`, `color.border` |
| typography | `font.family.sans`, `font.size.base`, `font.lineheight.normal` |
| space | `space.1` … `space.16` (4px scale) |
| radius | `radius.sm`, `radius.md`, `radius.lg` |
| shadow | `shadow.sm`, `shadow.md` |
| motion | `motion.duration.fast`, `motion.easing.default` |

Значения: CSS-совместимые строки или числа (для ms, unitless line-height).

## Tailwind v4

- Глобальные стили: `src/app/globals.css`.
- Подключение: `@import "tailwindcss";` + `@theme` маппинг на CSS variables из `design/system/`.
- **Не** хардкодить произвольные цвета в JSX; использовать утилиты, привязанные к переменным.

Пример маппинга (целевой):

```css
@theme {
  --color-background: var(--da-color-bg);
  --color-foreground: var(--da-color-fg);
  --font-sans: var(--da-font-sans);
}
```

## Компоненты (план)

| Компонент | База | Примечание |
|-----------|------|------------|
| Button | нативный + tokens | focus ring обязателен |
| Link | Next `Link` | внешние — `rel` |
| Card | div + border token | без лишней тени |
| Dialog | Radix Dialog | focus trap |
| Navigation | семантический `nav` | skip link в layout |

Каталог компонентов появится в `src/components/ui/` на P1.

## Иконки

Lucide React; размер по `className` из шкалы `icon-*` (определить в tokens).

## Motion

Framer Motion / Motion — только для:

- смены темы (optional),
- раскрытия панелей,
- stagger списков (ограниченно).

`prefers-reduced-motion: reduce` — отключать анимации.

## Style preview (будущее)

Компонент `StylePreviewFrame` принимает `styleId`, подгружает `design/styles/<id>/tokens.json`, применяет scope class `.style-<id>` на контейнер (см. ADR-0003).

## Качество

Ревью: [templates/STYLE-REVIEW.md](templates/STYLE-REVIEW.md).

Контраст пар text/bg ≥ WCAG AA для shell; для style preview — предупреждение в UI если ниже AA.
