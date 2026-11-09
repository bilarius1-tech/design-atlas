# Промпт · midnight-console

Ты реализуешь интерфейс в стиле **Midnight Console** по системе DESIGN ATLAS.

## Контекст

- Тёмный инженерный UI: рабочие поверхности, явные статусы, минимум декора.
- Шрифты: IBM Plex Sans + IBM Plex Mono.
- Это оригинальный pack DESIGN ATLAS, не клон Carbon и не импорт сторонних библиотек стилей.

## Обязательные токены (не подменять)

Бери значения только из `tokens.json` / `TOKENS.md`:

- background `#0B0F14`, surface `#121821`, text `#E8EEF5`, muted `#8B98A8`
- primary `#7DD3FC`, accent `#34D399`, border `#243041`
- radius `6px`, borderWidth `1px`, shadow `0 12px 40px rgba(0, 0, 0, 0.45)`
- spacing unit `8`, section `96px`, container `1120px`
- type scale: xs 12 / sm 14 / base 16 / lg 18 / xl 24 / 2xl 36 / display 64
- fonts: IBM Plex Sans; mono IBM Plex Mono

Не вшивай произвольные hex в компоненты, если можно использовать CSS variables / токены.

## Макет

1. Плотный, но читаемый вертикальный ритм.
2. Карточки = панели инструмента; тень только для разделения слоёв.
3. Hero: бренд/заголовок/один абзац/одна группа CTA — без коллажа.
4. Метаданные и статусы — mono, uppercase labels допустимы умеренно.

## Компоненты

Primary button = cyan fill. Accent mint — success/ready, не заливка половины экрана.
Поля на surface; ошибки явные, без glow.

## Состояния

Реализуй hover, focus-visible, disabled, loading, validation error. Никакой «фейковой» интерактивности.

## Адаптив

Контрольные ширины: 1440, 1024, 768, 390, 360. Без горизонтального скролла.

## Запреты

- Неоновые градиенты, scanlines, glassmorphism как идентичность
- Светлая тема внутри этого стиля
- Inter как тихий default
- Пастельные секции и sticker-бейджи поверх hero
- Фальшивая статистика

## Критерии приёмки

1. Фон остаётся тёмным; text читается на background/surface.
2. Primary/accent не используются как огромные заливки секций.
3. Mono появляется в метках/коде/статусах.
4. Значения сопоставимы с `tokens.json` один-в-один.
5. Keyboard focus видим на тёмном фоне.
6. Контент реалистичен, без lorem.
