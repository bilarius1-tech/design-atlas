---
name: design-research
description: Собирает проверяемые источники и факты о визуальном стиле перед авторингом content/styles. Использовать при новом style id или обновлении нарратива.
---

# design-research

## 1. Название

`design-research`

## 2. Назначение

Подготовить **исследовательскую базу** для стиля (история, признаки, типографика, контрпримеры) без выдумок.

## 3. Когда применять

- Создание/расширение `content/styles/<id>/`.
- Первый эталон: `swiss-international` (research only, implementation — отдельный тикет).

## 4. Когда НЕ применять

- Чисто технические правки `tokens.json`.
- Phase 1 без human-approved style ticket.

## 5. Входы

- `style id` (kebab-case).
- Язык нарратива (ru/en).
- Ограничения по объёму от редактора.

## 6. Пошаговая процедура

1. Проверить, нет ли дубликата id в `content/styles/`.
2. Собрать 5–10 **проверяемых** источников (книги, музеи, архивы, .edu) — URL + краткая цитата/факт.
3. Выписать **визуальные признаки** (сетка, шрифты, цвет, ритм) — отдельно факты vs интерпретация.
4. Контрпримеры: что **не** является стилем.
5. Связь с DS Atlas: какие токены понадобятся (черновик полей для `tokens.json`, без финального JSON).
6. Сохранить черновик в `docs/research/<id>.md` **или** в PR-описании до переноса в content.
7. Передать на `style-authoring` после human OK на источники.

## 7. Требования к результату

- Документ исследования с разделами: Sources, Traits, Anti-patterns, Token hints.
- Нулевой AI slop: нет «revolutionary», «seamless», пустых списков из 10 однотипных пунктов.

## 8. Проверки качества

- [ ] Каждый сильный claim имеет источник.
- [ ] id соответствует slug-правилам.
- [ ] Отделены historical Swiss и «swiss-inspired web UI».

## 9. Запреты

- Выдавать DesignPrompts/старый dizain-prompty за официальный форк ([docs/specification/README.md](../../../docs/specification/README.md)).
- Писать финальный `style.json` без контракта.

## 10. Примеры

**id:** `swiss-international` → traits: асимметричная сетка, Helvetica lineage, objectivity; sources: Müller-Brockmann, RIT/VFG archives.

## 11. Связанная документация

- [docs/CONTENT_MODEL.md](../../../docs/CONTENT_MODEL.md)
- [docs/specification/README.md](../../../docs/specification/README.md)
- `.agents/skills/style-authoring/`
