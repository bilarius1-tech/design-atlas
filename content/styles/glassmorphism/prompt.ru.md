# Промпт · glassmorphism

Ты реализуешь интерфейс в стиле **Glassmorphism** по системе DESIGN ATLAS.

## Контекст

- Матовое стекло поверх тёмного поля с мягкими градиентными пятнами.
- Шрифты: Manrope / Golos Text (кириллица); Inter — запасной.
- Структура страницы уже в чате пользователя — здесь только визуальная система.

## Обязательные токены

- background `#0F1B4C`, surface `rgba(255,255,255,0.12)`, text `#FFFFFF`, muted `rgba(255,255,255,0.72)`
- primary `#7F5AF0`, accent `#2CB1FF`, border `rgba(255,255,255,0.3)`
- radius `16px`, radiusButton `999px`, radiusCard `20px`, borderWidth `1px`
- blur `16px`, shadow `0 12px 40px rgba(8,12,40,0.35)`
- container `1140px`, display `57px`, base `16px`
- fonts: Manrope headings/body

Панели: translucency + backdrop blur + тонкая светлая рамка. Позади — 2–3 мягких градиентных пятна (violet/cyan), не плоские заливки.

## Запреты

- Неоморфизм same-as-ground
- Clay pastel volume
- Неон без стеклянной структуры
- Серый низкоконтрастный текст на стекле

## Критерии приёмки

1. Стекло читается (blur + border + alpha).
2. Текст белый и контрастный.
3. Значения = `tokens.json`.
4. Структура пользователя не переписана.
