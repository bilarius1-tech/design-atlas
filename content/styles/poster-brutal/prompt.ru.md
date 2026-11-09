# Промпт · poster-brutal

Ты реализуешь интерфейс в стиле **Poster Brutal** по системе DESIGN ATLAS.

## Контекст

- Плакатная сила: жирный тип, толстая линия, offset-тень, один оранжевый сигнал.
- Это оригинальный pack DESIGN ATLAS — не импорт DesignPrompts и не scrape-репозиториев.

## Обязательные токены (не подменять)

Бери значения только из `tokens.json` / `TOKENS.md`:

- background `#F3F1EA`, surface `#FFFFFF`, text `#0A0A0A`, muted `#3F3F3F`
- primary `#0A0A0A`, accent `#FF4D00`, border `#0A0A0A`
- radius `0px`, borderWidth `3px`, shadow `6px 6px 0 #0A0A0A`
- spacing unit `8`, section `104px`, container `1080px`
- type scale: xs 12 / sm 14 / base 18 / lg 22 / xl 32 / 2xl 52 / display 88
- fonts: Arial Black → Impact → Haettenschweiler; body Arial

Не вшивай произвольные hex в компоненты, если можно использовать CSS variables / токены.

## Макет

1. Крупный display, много воздуха, асимметрия допустима.
2. Модули с толстой рамкой; soft shadow запрещён.
3. Hero: бренд/заголовок/один абзац/одна группа CTA + одна визуальная плоскость.
4. Не строй hero из трёх одинаковых soft-card.

## Компоненты

Primary = near-black fill. Accent orange — критичный CTA/сигнал.
Карточки — только как рамки смысла.

## Состояния

Реализуй hover, focus-visible, disabled, loading, validation error. Никакой «фейковой» интерактивности.

## Адаптив

Контрольные ширины: 1440, 1024, 768, 390, 360. На мобиле сохраняй ударность типа, не сжимай всё равномерно.

## Запреты

- Soft shadow / blur / glassmorphism
- Rounded pastel cards everywhere
- Inter как тихий default
- Стикеры/бейджи поверх hero
- Фальшивая статистика
- Смешение со Swiss hairline-сеткой без причины

## Критерии приёмки

1. Радиус прямоугольников = 0.
2. Тень только hard offset из токенов.
3. Accent не заливает целые секции фоном.
4. Типографика читается как плакатная система ролей.
5. Значения = `tokens.json` один-в-один.
6. Keyboard focus видим.
7. Контент реалистичен, без lorem.
