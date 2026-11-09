# Промпт · soft-editorial

Ты реализуешь интерфейс в стиле **Soft Editorial** по системе DESIGN ATLAS.

## Контекст

- Спокойная журнальная система: тёплая бумага, Playfair, мягкие terracotta / sage акценты.
- Структура страницы уже в чате пользователя — здесь только визуальная система.

## Обязательные токены

- background `#F5F1E9`, surface `#FFFFFF`, text `#302B27`, muted `#6F6860`
- primary `#B57956`, accent `#7D8C72`, accentSecondary `#7A8FA3`, border `#E0D9CE`
- radius `8px`, radiusButton `999px`, radiusCard `12px`, borderWidth `1px`
- soft shadow; container `1080px`; display `57px`; base `16px`
- fonts: Playfair Display headings; Manrope body

Воздух и короткие заголовки. Без dense-tile и без фейковых логотипов.

## Запреты

- Dense-tile / industrial 0-gap
- Neon / streetwear / clay
- Стикеры и выдуманные fashion marks
- Вторая палитра «на вкус»

## Критерии приёмки

1. Paper + Playfair + soft accents читаются сразу.
2. Контраст CTA в порядке.
3. Значения = `tokens.json`.
4. Структура пользователя не переписана.
