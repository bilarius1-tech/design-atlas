# Часть III. Модель каталога и визуальные демонстрации

## 1. Каталог стилей

Каждый стиль — постоянный ID и отдельная папка:

```text
content/styles/<id>/
  style.json
  tokens.json
  typography.json
  components.json
  demo.json
  rules.md
  prompt.ru.md
  prompt.en.md
  DESIGN.md
  TOKENS.md
  AGENT-INSTRUCTIONS.md
  CHANGELOG.md
  assets/
```

## 2. Обязательные метаданные

`id`, `slug`, `title.ru/en`, `shortDescription.ru/en`, `philosophy.ru/en`, `category`, `tags`, `complexity`, `visualDensity`, `contrast`, `bestUseCases`, `avoidFor`, `relatedStyles`, `fontFamilies`, `status`, `version`, `author`, `updatedAt`.

Статусы: `draft` | `review` | `published` | `archived`.

## 3. tokens.json

Категории: colors, typography, spacing, geometry, effects. Значения у каждого стиля собственные и обоснованные. Один набор токенов на все стили запрещён.

## 4. Typography

Описать heading/body/mono, веса, размеры, line-height, letter-spacing, сочетания, ограничения, fallback. Показать Display, H1–H4, Body Large/Body, Caption, Label, Quote, Code. Только шрифты с проверенной лицензией.

## 5. Единая матрица демонстрации

Обязательные группы: Typography, Buttons, Forms, Shapes & Geometry, Cards, Navigation, Feedback, Icons — со всеми перечисленными в ТЗ вариантами и состояниями.

## 6. Style Playground

Интерактивная демонстрация на странице стиля. Все контролы реально работают. Фальшивая интерактивность запрещена. Light/dark — если стиль поддерживает.

## 7. Demo Landing

Полноценный лендинг со зонами: Header, Hero, Features, Editorial, Showcase, Statistics/альтернатива, Testimonials, Pricing/альтернатива, FAQ, CTA, Footer. Порядок и композиция адаптируются под философию стиля.

Запрещено делать 30 стилей заменой цветов/шрифтов в одном шаблоне.

## 8–9. Визуальные и responsive требования

Контрольные ширины: 1440, 1024, 768, 390, 360. Без горизонтального скролла и заглушек.

## 10. Демонстрационная честность

Отделять факты стиля, авторскую интерпретацию, рекомендации и технические решения конкретной демо.

## 11. Минимум для публикации

Философия, токены, типографика, все группы компонентов, уникальный demo, RU/EN промпты, DESIGN.md, AGENT-INSTRUCTIONS.md, адаптив и контентная проверка.
