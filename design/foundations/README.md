# Foundations — DESIGN ATLAS Shell

Нейтральная редакционная система продукта.

## Принципы

1. Оболочка **не** имитирует каталожный стиль.
2. Типографика и сетка важнее декора.
3. Карточки — только для самостоятельных единиц контента.
4. Токены в `design/system/tokens.json` — SSOT; CSS theme — производное.
5. Каталожные стили позже получают собственные токены в `content/styles/<id>/`.

## Шрифты

| Роль | Семейство |
| --- | --- |
| Display / headings | Source Serif 4 |
| UI / body | Source Sans 3 |
| Code | Geist Mono |

Inter не используется как default оболочки.

## Сетка

- Container: 1120px (wide 1280, narrow 720)
- Base spacing unit: 4px
- Section vertical rhythm: 48–96px
