# CONTENT-REVIEW

**Запись:** `content/...` id: `<kebab-id>`  
**Статус:** draft → published?  
**Ревьюер:**  
**Дата:**

## Identity & schema

- [ ] `id` kebab-case, ASCII, совпадает с папкой
- [ ] `schemaVersion` актуален
- [ ] Zod-валидация проходит

## Editorial

- [ ] Без AI slop и воды (DESIGN_PHILOSOPHY)
- [ ] `summary` точный, ≤ 320 символов на локаль
- [ ] `title` локализации согласованы
- [ ] Факты: `sources` заполнены для published

## Technical

- [ ] `tokensRef` существует (или tracked follow-up)
- [ ] `tags` lowercase, без пробелов
- [ ] MDX frontmatter `id` совпадает с meta

## i18n

- [ ] `en` присутствует для published
- [ ] `ru` (если есть) — не машинный мусор

## Вердикт

- [ ] Approve for published
- [ ] Keep draft
- [ ] Request changes

**Комментарии:**
