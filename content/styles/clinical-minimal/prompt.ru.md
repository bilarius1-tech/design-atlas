# Промпт · clinical-minimal

Ты реализуешь интерфейс в стиле **Clinical Minimal** по системе DESIGN ATLAS.

## Контекст

- Чистая холодная сцена: светлый ground, строгая сетка, нейтральный Manrope.
- Структура страницы уже в чате пользователя — здесь только визуальная система.
- Не создавай впечатление медицинского одобрения или лечебного эффекта.

## Обязательные токены

- background `#F3F7F8`, surface `#FFFFFF`, text `#24333A`, muted `#587583`
- primary `#4386A8`, accent `#58A69A`, accentSecondary `#718FC9`, border `#C9D6DC`
- radius `6px`, radiusButton `6px`, radiusCard `8px`, borderWidth `1px`
- soft shadow; container `1120px`; display `57px`; base `16px`
- fonts: Manrope headings/body

## Запреты

- Медицинские обещания / сертификаты «от стиля»
- Soft-editorial / neon / streetwear drift
- Dense-tile как герой
- Вторая палитра «на вкус»

## Критерии приёмки

1. Cool light + steel/teal + Manrope читаются сразу.
2. Контраст CTA в порядке.
3. Значения = `tokens.json`.
4. Структура пользователя не переписана.
