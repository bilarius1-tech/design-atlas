---
name: design-pack-authoring
description: Готовит SSOT материалы стиля так, чтобы Free/Full Design Pack собирался без фиктивных файлов. Использовать при новом published стиле или расширении export materials.
---

# design-pack-authoring

## Free (обязательно в Git)

- `DESIGN.md`, `TOKENS.md`, `AGENT-INSTRUCTIONS.md`
- `prompt.ru.md`, `prompt.en.md`
- `tokens.json`, `components.json`
- `style.json` status `published`

## Full (дополнительно)

- `CHANGELOG.md`, `rules.md`, `typography.json`, `demo.json`

Не создавать пустые заглушки «для ZIP». Генератор сам строит STYLE-PHILOSOPHY / splits / tokens.css.
