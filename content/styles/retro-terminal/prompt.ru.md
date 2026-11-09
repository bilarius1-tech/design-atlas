# Промпт · retro-terminal

Ты реализуешь интерфейс в стиле **Retro Terminal** по системе DESIGN ATLAS.

## Контекст

- CRT/CLI: чёрный экран, фосфорный mono, scanlines, мигающий курсор, кнопки в `[ скобках ]`.
- Структура страницы уже в чате пользователя — здесь только визуальная система.
- Это **не** midnight-console (SaaS) и **не** neon-tech.

## Обязательные токены

- background `#0A0F0A`, surface `#0F160F`, text `#33FF66`, muted `#2A9944`
- primary `#33FF66`, accent `#FFB000`, accentSecondary `#1C2A1C`, border `#1C2A1C`
- radius `0px` everywhere; borderWidth `1px`
- soft phosphor glow shadow; container `1040px`; display `57px`
- fonts: JetBrains Mono (all roles)

Scanlines обязательны. Курсор-blink выключай при `prefers-reduced-motion`.

## Запреты

- Sans display как герой (midnight drift)
- Neon-tech multi-acid grid
- Glass / aurora / Y2K
- Dense-tile industrial flush
- Вторая палитра «на вкус»

## Критерии приёмки

1. CRT black + phosphor mono + scanlines читаются сразу.
2. Amber CTA в скобках; radius 0.
3. Значения = `tokens.json`.
4. Структура пользователя не переписана.
