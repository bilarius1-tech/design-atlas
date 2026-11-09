# Промпт · eco-botanical

Ты реализуешь интерфейс в стиле **Eco Botanical** по системе DESIGN ATLAS.

## Контекст

- Натуральная эко-подача: крафтовая бумага, листовая зелень, глиняные акценты.
- Структура страницы уже в чате пользователя — здесь только визуальная система.
- Не добавляй эко-сертификаты, состав и «organic»-печати, которых нет у пользователя.

## Обязательные токены

- background `#EAE5D8`, surface `#F7F3EA`, text `#34372C`, muted `#6A6E5F`
- primary `#73865B`, accent `#C47A4A`, accentSecondary `#D3A84B`, border `#D4CDBB`
- radius `12px`, radiusButton `999px`, radiusCard `16px`, borderWidth `1px`
- soft shadow; container `1100px`; display `57px`; base `16px`
- fonts: Manrope headings; DM Sans body

## Запреты

- Выдуманные eco seals / ingredient claims
- Clinical / neon / streetwear drift
- Dense-tile как герой
- Вторая палитра «на вкус»

## Критерии приёмки

1. Kraft + leaf/clay + friendly type читаются сразу.
2. Контраст CTA в порядке.
3. Значения = `tokens.json`.
4. Структура пользователя не переписана.
