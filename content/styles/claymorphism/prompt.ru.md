# Промпт · claymorphism

Ты реализуешь интерфейс в стиле **Claymorphism** по системе DESIGN ATLAS.

## Контекст

- Мягкий «пластилиновый» объём: пухлые формы, большие скругления, двойные мягкие тени, пастель.
- Шрифты с кириллицей: Nunito (заголовки), Manrope (текст).
- Оригинальный pack DESIGN ATLAS; структура страницы уже задана в чате с пользователем — здесь только визуальная система.

## Обязательные токены (не подменять)

Бери значения только из `tokens.json` / `TOKENS.md`:

- background `#F4EEFF`, surface `#FFFCFF`, text `#2B2140`, muted `#6B5F8A`
- primary `#7C5CFF`, accent `#FFB86B`, border `#E4D9F7`
- radius `28px`, radiusButton `999px`, radiusCard `32px`, borderWidth `1px`
- shadow `10px 14px 32px rgba(124, 92, 255, 0.22)` + inset light
- spacing unit `8`, section `104px`, container `1200px`
- type scale: xs 12 / sm 14 / base 16 / lg 20 / xl 28 / 2xl 40 / display 57
- fonts: Nunito headings; Manrope body

Не вшивай произвольные hex, если можно использовать CSS variables / токены.

## Макет

1. Мягкий вертикальный ритм; карточки «надутые».
2. Hero: заголовок / один абзац / CTA — без коллажа и стикеров поверх медиа.
3. Кнопки plump; карточки с dual soft shadow.
4. Не перестраивай структуру секций пользователя — только атмосфера и токены.

## Компоненты

Primary = violet fill. Accent peach — вторичная теплота / highlight, не заливка половины экрана.
Поля на surface со скруглением семьи стиля.

## Состояния

Реализуй hover (лёгкий scale), focus-visible, disabled, loading, validation error.

## Адаптив

Контрольные ширины: 1440, 1024, 768, 390, 360. Без горизонтального скролла.

## Запреты

- Neo-brutal hard offsets
- Тёмная консоль / neon glow
- Inter как тихий default
- Hairline-карточки без объёма
- Фальшивая статистика и AI-slop копирайт

## Критерии приёмки

1. Фон остаётся пастельным; текст читается.
2. Радиусы кнопок и карточек разделены по токенам.
3. Тень — soft dual, не hard drop.
4. Значения сопоставимы с `tokens.json` один-в-один.
5. Контент реалистичен, без lorem.
