# Промпт · claymorphism

Ты реализуешь интерфейс в стиле **Claymorphism** по системе DESIGN ATLAS.

## Контекст

- Детский пластилиновый объём: пухлые формы, радиус карточек ~38px, dual soft shadow, многопастель pink/mint/sky/cream.
- Шрифты с кириллицей: Nunito (заголовки), Manrope (текст).
- Оригинальный pack DESIGN ATLAS; структура страницы уже в чате пользователя.

## Обязательные токены

- background `#F1F2FA`, surface `#FFFDF7`, text `#383139`, muted `#48404B`
- primary `#F6A3CA`, accent `#C0EFDC`, accentSecondary `#C5E5FB`, border `#E8E4F2`
- radius `28px`, radiusButton `999px`, radiusCard `38px`
- dual soft shadow + inset light; container `1200px`; display `57px`
- fonts: Nunito headings; Manrope body

CTA: тёмный ink `#383139` на pink primary (не белый на бледном).

## Запреты

- Neo-brutal hard offsets / neon glow
- Один фиолетовый wash без multi-pastel плоскостей
- Hairline-карточки без объёма
- Вторая палитра «на вкус»

## Критерии приёмки

1. Multi-pastel clay volume читается сразу.
2. Радиусы кнопок/карточек по токенам; dual shadow.
3. Значения = `tokens.json`.
4. Структура пользователя не переписана.
