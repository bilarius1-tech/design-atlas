# Промпт · industrial-power

Ты реализуешь интерфейс в стиле **Industrial Power** по системе DESIGN ATLAS.

## Контекст

- Брутальная промышленная система: графит, сигнальный жёлтый, dense-tile встык.
- Структура страницы уже в чате пользователя — здесь только визуальная система.

## Обязательные токены

- background `#252522`, surface `#2F2F2B`, text `#F4F1E9`, muted `#A8A49A`
- primary `#FFC400`, accent `#FF6A00`, accentSecondary `#E55353`, border `#4A4A44`
- radius `0px`, radiusButton `2px`, radiusCard `0px`, borderWidth `1px`
- gap `0px` — dense-tile mosaic
- container `1140px`, display `57px`, base `16px`
- fonts: Oswald headings; Roboto body

Primary CTA: жёлтая заливка, **тёмный** текст. Features/stats — плитки встык с hairline.

## Запреты

- Soft volume / glass / warm editorial
- Фейковые safety seals
- Воздушные gutters вместо dense-tile
- Вторая палитра «на вкус»

## Критерии приёмки

1. Graphite + signal yellow + dense-tile читаются сразу.
2. Контраст CTA в порядке (тёмный ink на жёлтом).
3. Значения = `tokens.json`.
4. Структура пользователя не переписана.
