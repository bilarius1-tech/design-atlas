# Промпт · blueprint-grid

Ты реализуешь интерфейс в стиле **Blueprint Grid** по системе DESIGN ATLAS.

## Контекст

- Инженерный чертёж: сине-графитовый фон, координатная сетка, cyan-маркеры.
- Шрифты: Roboto Mono (display/подписи), Oswald / Manrope (body).
- Структура страницы уже в чате пользователя — здесь только визуальная система.

## Обязательные токены

- background `#102631`, surface `#163040`, text `#E8F5F5`, muted `#8FB0B8`
- primary `#62D5FF`, accent `#FFB547`, accentSecondary `#A9E66E`, border `#2A4A58`
- radius `4px`, radiusButton `4px`, radiusCard `6px`, borderWidth `1px`
- shadow: soft dark + cyan hairline edge
- container `1120px`, display `57px`, base `16px`

Сетка и контуры — система. Не придумывай размеры и спецификации товара.

## Запреты

- Neon acid bloom
- Clay / neu / glass
- Streetwear peach + Unbounded
- Выдуманные размерные числа
- Вторая палитра «на вкус»

## Критерии приёмки

1. Graphite + grid + mono читаются сразу.
2. Контраст текста и CTA в порядке.
3. Значения = `tokens.json`.
4. Структура пользователя не переписана.
