# DESIGN SYSTEM

Дизайн-система Design Atlas покрывает **app shell** (платформа) и задаёт **контракт** для style-specific токенов.

## Структура `design/`

```
design/
├── system/
│   ├── tokens.json         # SSOT токенов оболочки
│   └── themes/
│       └── light.css       # CSS variables (--da-*)
├── foundations/            # принципы сетки и типографики
├── components/             # спеки примитивов
└── tokens/                 # reserved / legacy placeholder
```

Каталожные стили (позже): `content/styles/<id>/tokens.json`.

## Token model (ADR-0004)

Источник: [`design/system/tokens.json`](../design/system/tokens.json).

| Категория | Примеры |
|-----------|---------|
| color | `bg`, `surface`, `fg`, `accent`, `border`, `danger` |
| font | `family.sans/serif/mono`, `size.*`, `lineHeight.*` |
| space | `1`…`24` (4px scale) |
| size | `container`, `header`, `controlMd` |
| radius / shadow / motion / zIndex | shell geometry and motion |

CSS prefix: `--da-...`. Tailwind mapping: `src/app/globals.css` (`@theme inline`).

## Реализованные компоненты

| Компонент | Путь |
|-----------|------|
| Button | `src/components/ui/button.tsx` |
| Input / Textarea / Label | `src/components/ui/` |
| Badge / Alert / Divider | `src/components/ui/` |
| Card / Table / EmptyState | `src/components/ui/` |
| Container / Stack / Section | `src/components/layout/` |
| SiteHeader / SiteFooter / SkipLink | `src/components/layout/` |

Gallery: `/design-system`.

## Иконки

Lucide React. Размер через `className` (`size-4` и т.п.).

## Motion

Пока только CSS transitions на controls. `prefers-reduced-motion` обнуляет duration в theme.

## Style preview / Playground / Demo

- `StylePreviewFrame` + `StylePlayground` — `src/features/style-playground/`
- `DemoLandingEngine` — `src/features/demo-landing/` (композиции, секции из `demo.json`)
- Токены стиля → scoped CSS vars `--sp-*` (не смешиваются с shell `--da-*`)
- Маршруты: `/playground`, `/playground/<styleId>`, `/demo`, `/demo/<styleId>`


## Качество

- Контраст shell ≥ WCAG AA для текста.
- Focus-visible обязателен.
- Ревью: [templates/STYLE-REVIEW.md](templates/STYLE-REVIEW.md).
