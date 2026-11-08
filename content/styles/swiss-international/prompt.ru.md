# Промпт · swiss-international

Ты реализуешь интерфейс в **Swiss International Style** (International Typographic Style) по системе DESIGN ATLAS.

## Контекст

- Стиль: объективная коммуникация, модульная сетка, гротескная типографика, высокий контраст.
- Источники принципов: Müller-Brockmann (grid), Hofmann (reduction), Gerstner (systematic design).
- Это цифровая интерпретация для web/UI, не музейная копия одного плаката.

## Обязательные токены (не подменять)

Бери значения только из `tokens.json` / `TOKENS.md`:

- background `#F2F0EA`, surface `#FFFFFF`, text `#111111`, muted `#5C5C5C`
- primary `#111111`, accent `#E30613`, border `#C9C4BA`
- radius `0px`, borderWidth `1px`, shadow `none`
- spacing unit `8`, section `112px`, container `1180px`
- type scale: xs 12 / sm 14 / base 16 / lg 20 / xl 28 / 2xl 44 / display 80
- fonts: Helvetica Neue → Helvetica → Arial; mono IBM Plex Mono

Не вшивай произвольные hex в компоненты, если можно использовать CSS variables / токены.

## Макет

1. Flush-left типографика.
2. Асимметричная или модульная сетка; избегай тройки одинаковых карточек в hero.
3. Крупные поля и предсказуемый вертикальный ритм секций.
4. Hairline-разделители вместо теней.
5. Hero: бренд/заголовок/один абзац/одна группа CTA + одна доминирующая визуальная плоскость (не коллаж).

## Компоненты

Разрешены: кнопки (primary/secondary/tertiary/ghost), поля, radio/checkbox/switch, tabs, cards (умеренно), alerts, badges, tables, FAQ.

Primary button = near-black fill. Accent — для критичного действия/ошибки/сигнала, не для заливки половины экрана.

## Состояния

Реализуй hover, focus-visible, disabled, loading, validation error. Никакой «фейковой» интерактивности.

## Адаптив

Контрольные ширины: 1440, 1024, 768, 390, 360. Без горизонтального скролла. На мобиле сохраняй иерархию, не уменьшай всё равномерно «в кашу».

## Запреты

- Soft shadow, blur, glassmorphism, градиентные «AI» фоны
- Rounded cards everywhere
- Inter как тихий default
- Декоративные стикеры/бейджи поверх hero
- Фальшивая статистика
- Ornamental script fonts
- Смешение neo-brutal stickers с Swiss grid

## Критерии приёмки

1. Радиус интерактивных прямоугольников = 0 (кроме кругов).
2. Тень отсутствует, если не доказана функциональная необходимость (по умолчанию none).
3. Акцентный красный не используется как общий фон секций.
4. Типографика читается как система ролей, а не набор случайных размеров.
5. Можно сопоставить цвета/шрифты/отступы с `tokens.json` один-в-один.
6. Keyboard focus видим.
7. Контент реалистичен, без lorem и placeholder-кнопок «Click here».
