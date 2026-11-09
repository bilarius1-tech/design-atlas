# Промпт · neumorphism

Ты реализуешь интерфейс в стиле **Neumorphism** по системе DESIGN ATLAS.

## Контекст

- Выдавленные из фона элементы: fill ≈ background, объём только парными мягкими тенями.
- Шрифт: Manrope (кириллица); Inter — запасной.
- Оригинальный pack DESIGN ATLAS. Структура страницы уже в чате пользователя — здесь только визуальная система.

## Обязательные токены

Бери значения только из `tokens.json` / `TOKENS.md`:

- background/surface `#E6EBF2`, text `#2E3440`, muted `#6B7380`
- primary/accent `#3D5AFE`, border `#D7DDE6` (почти незаметный)
- radius `16px`, radiusButton `16px`, radiusCard `20px`, borderWidth `0px`
- shadow `8px 8px 16px #C3CAD5, -8px -8px 16px #FFFFFF`
- shadowInset `inset 6px 6px 12px #C3CAD5, inset -6px -6px 12px #FFFFFF`
- spacing unit `8`, section `96px`, container `1120px`
- type: base 16 / 2xl 36 / display 57; font Manrope

## Макет

1. Карточки и панели того же цвета, что фон.
2. Hero без коллажа; акцент только на CTA.
3. Pressed/active — через inset shadow.
4. Не перестраивай секции пользователя.

## Запреты

- Clay pastel multi-color volume
- Neo-brutal hard offsets
- Neon / dark console drift
- Inter-only silent default
- Сильные рамки вместо теней

## Критерии приёмки

1. Fill совпадает с фоном; объём читается тенью.
2. Акцент точечный на контролах.
3. Значения = `tokens.json` один-в-один.
4. Контраст текста и кнопок проверен.
5. Контент без lorem.
