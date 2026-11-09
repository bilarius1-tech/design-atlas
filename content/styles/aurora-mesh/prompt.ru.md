# Промпт · aurora-mesh

Ты реализуешь интерфейс в стиле **Aurora Mesh** по системе DESIGN ATLAS.

## Контекст

- Аврора: плавные mesh-градиенты и сияние — размытые cyan / violet / pink переливы на ночном фоне, минималистичный контент сверху.
- Структура страницы уже в чате пользователя — здесь только визуальная система.
- Это **не** glassmorphism-only и **не** neon-tech сетка.

## Обязательные токены

- background `#0B0A1F`, surface `rgba(255,255,255,0.08)`, text `#FFFFFF`, muted `rgba(255,255,255,0.72)`
- primary `#FFFFFF`, accent `#6EE7F9`, accentSecondary `#F472B6`, border `rgba(255,255,255,0.18)`
- violet `#A78BFA` — в mesh-атмосфере (radial blooms)
- radius `16px`, radiusButton `999px`, radiusCard `20px`, borderWidth `1px`
- blur `14px`; soft glow shadow; container `1120px`; display `57px`
- fonts: Manrope; Unbounded sparingly

Фон: 3–4 крупных radial пятна с сильным blur; можно лёгкий drift (уважай `prefers-reduced-motion`). Шум 3–5% допустим.

## Запреты

- Neon-tech grid / hard lime outlines
- Neo-brutal hard offset
- Dense-tile
- Низкий контраст текста на mesh
- Вторая палитра «на вкус»

## Критерии приёмки

1. Ночь + soft cyan/violet/pink mesh читаются сразу.
2. Белый CTA с тёмной подписью; стеклянные панели.
3. Значения = `tokens.json`.
4. Структура пользователя не переписана.
