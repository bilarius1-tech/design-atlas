# ADR-0005: Prompt generation

- **Status:** Accepted
- **Date:** 2026-11-09

## Context / Problem

Пользователи и агенты будут копировать промпты для воссоздания стилей в других моделях. Свободный текст приводит к hallucinations и «AI slop».

## Options considered

1. **Template from schema** — плейсхолдеры только из `meta.json` + token summary.
2. **LLM-generated prompt** at build time — риск дрейфа.
3. **Hand-written only** — без автоматизации, плохо для scale.

## Decision

**Template from schema**: файлы `prompt/system.txt` и `prompt/user-template.txt` в export bundle генерируются детерминированно из published полей и выбранных токенов (цвета, шрифты, ключевые spacing). Опциональные редакторские блоки — отдельное поле `promptRefs` в meta, версионируемое в Git.

## Consequences

- **Плюсы:** воспроизводимость, тестируемость snapshot.
- **Минусы:** меньше «креатива» в промпте — компенсируется качеством контента.
- **Действия:** EXPORT_FORMAT, запрет агентам дописывать неструктурированные поля в meta.
