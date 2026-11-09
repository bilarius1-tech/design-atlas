# Промпт · vintage-gold

Ты реализуешь интерфейс в стиле **Vintage Gold** по системе DESIGN ATLAS.

## Контекст

- Винтажный люкс: тёплая старая бумага, Playfair, тонкое золото.
- Структура страницы уже в чате пользователя — здесь только визуальная система.
- Не добавляй награды, даты, печати и логотипы, которых нет у пользователя.

## Обязательные токены

- background `#E9DDC6`, surface `#F4EBDA`, text `#352A20`, muted `#6F5E4C`
- primary `#B58A45`, accent `#8A6B4B`, accentSecondary `#6F7A58`, border `#C9B896`
- radius `6px`, radiusButton `999px`, radiusCard `10px`, borderWidth `1px`
- soft shadow; container `1080px`; display `57px`; base `16px`
- fonts: Playfair Display headings; Manrope body

На золотых CTA — тёмный текст. Золото — линии и рамки, не сплошная заливка всего UI.

## Запреты

- Фейковые awards / seals / даты / логотипы
- Neon / streetwear / dense-tile
- Состаривание материалов товара
- Вторая палитра «на вкус»

## Критерии приёмки

1. Paper + Playfair + sparingly gold читаются сразу.
2. Контраст CTA в порядке.
3. Значения = `tokens.json`.
4. Структура пользователя не переписана.
