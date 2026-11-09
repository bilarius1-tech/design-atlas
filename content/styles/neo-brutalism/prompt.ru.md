# Промпт · neo-brutalism

Ты реализуешь интерфейс в стиле **Neo-brutalism** по системе DESIGN ATLAS.

## Контекст

- Необрутал: масляный фон, толстые чёрные рамки, жёсткий offset без blur, pink/mint плоскости, Unbounded + Rubik.
- Структура страницы уже в чате пользователя — здесь только визуальная система.
- Это **не** `poster-brutal` (оранжевый + Arial Black).

## Обязательные токены

- background `#FFF4D6`, surface `#FFFFFF`, text `#111111`, muted `#4A4A4A`
- primary `#FF5C8A`, accent `#3DDC97`, accentSecondary `#FFD84D`, border `#111111`
- radius `8px`, radiusButton `6px`, radiusCard `8px`, borderWidth `3px`
- shadow `6px 6px 0 #111111`; container `1080px`; display `57px`; base `16px`
- fonts: Unbounded headings, Rubik body

Воздух вокруг карточек обязателен — иначе hard offset не читается. Не dense-tile.

## Запреты

- Poster-brutal orange / Impact drift
- Soft blur, glass, neu inset
- Dense-tile / industrial flush
- Белый текст на pink/mint по умолчанию
- Вторая палитра «на вкус»

## Критерии приёмки

1. Butter + 3px black + hard offset + pink/mint читаются сразу.
2. Unbounded display, Rubik body.
3. Значения = `tokens.json`.
4. Структура пользователя не переписана.
