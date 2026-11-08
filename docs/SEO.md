# SEO

Design Atlas — преимущественно **контентный** продукт; SEO строится на качестве, структуре и метаданных.

## Технические основы (Next.js App Router)

- `metadata` / `generateMetadata` на маршрутах (P2+).
- Canonical URL через `metadataBase` в root layout.
- `robots.txt` / `sitemap.xml` — статическая или generated (P3+).
- Open Graph: `title`, `description`, `images` (preview стиля ≥ 1200×630 когда доступно).

## Контент

- Уникальный `title` и `description` на стиль (из `meta.json` localized).
- ЧПУ: `/styles/[id]` где `id` — kebab-case (не локализованный slug).
- Структурированные данные (JSON-LD): `Article` или `CreativeWork` для страниц стилей (P3).

## Производительность (косвенный SEO)

- RSC для статического контента.
- Оптимизация изображений `next/image`.
- Шрифты: `next/font`, subset.

## i18n и SEO

- Локализованные маршруты: `/ru/styles/...` vs `?lang=` — решение за ADR-0006; до решения — один URL, localized контент в data layer.
- `hreflang` — после выбора URL-стратегии.

## Anti-patterns

- Дублирование тысяч thin pages.
- Keyword stuffing в `summary`.
- Скрытый текст для роботов.

## Чеклист перед publish стиля

- [ ] `published` в meta
- [ ] `summary.en` уникален
- [ ] sources заполнены
- [ ] OG image (когда pipeline готов)
