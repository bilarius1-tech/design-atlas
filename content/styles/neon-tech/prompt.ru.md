# Промпт · neon-tech

Ты реализуешь интерфейс в стиле **Neon Tech** по системе DESIGN ATLAS.

## Контекст

- Тёмная техно-сцена: угольный фон, тонкая сетка, дозированное неоновое свечение.
- Шрифты: Unbounded (display), Oswald / Manrope (body), Roboto Mono (подписи).
- Структура страницы уже в чате пользователя — здесь только визуальная система.

## Обязательные токены

- background `#171A22`, surface `#222633`, text `#F4F4F8`, muted `#9AA0B2`
- primary `#B6FF00`, accent `#00D5FF`, accentSecondary `#FF4FD8`, border `#34384A`
- radius `8px`, radiusButton `8px`, radiusCard `12px`, borderWidth `1px`
- shadow: soft dark + subtle lime/cyan glow
- container `1120px`, display `57px`, base `16px`

Primary CTA: заливка lime, **тёмный** текст. Неон — контуры и маркеры, не сплошное засвечивание.

## Запреты

- Frosted glass как главный материал
- Clay / neu soft volume
- Белый текст на lime
- Выдуманные порты, логотипы, «кибер»-шум поверх контента

## Критерии приёмки

1. Тёмный stage читается; неон дозирован.
2. CTA контрастны (тёмный ink на lime).
3. Значения = `tokens.json`.
4. Структура пользователя не переписана.
