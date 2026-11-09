# Промпт · kinetic

Ты реализуешь интерфейс в стиле **Kinetic** по системе DESIGN ATLAS.

## Контекст

- Кинетик: чёрная сцена, гигантский uppercase Inter, один оранжевый сигнал, тип как движение.
- Структура страницы уже в чате пользователя — здесь только визуальная система.

## Обязательные токены

- background `#0A0A0B`, surface `#121214`, text `#F4F5F6`, muted `#8A8D93`
- primary/accent `#FF5E00`, accentSecondary `#FFFFFF`, border `#26282C`
- radius `0px` everywhere; borderWidth `1px`; shadow `none`
- container `1200px`; display `57px`; fonts: Inter (+ Unbounded optional)

Motion: marquee / wipe только на display; body не анимировать. Уважай `prefers-reduced-motion`.

## Запреты

- Soft clay / glass / aurora
- Multi-neon
- Анимация длинных абзацев
- Вторая палитра «на вкус»

## Критерии приёмки

1. Black + orange block + uppercase grotesk читаются сразу.
2. Radius 0; body still.
3. Значения = `tokens.json`.
4. Структура пользователя не переписана.
