---
name: project-context
description: Загружает контекст Design Atlas (docs, фазы, пути, bans) перед задачей. Использовать в начале любой нетривиальной работы в репозитории design-atlas.
---

# project-context

## 1. Название

`project-context`

## 2. Назначение

Собрать **единый контекст** из репозитория, чтобы агент не выдумывал архитектуру и соблюдал Design System First.

## 3. Когда применять

- Старт задачи в `design-atlas` без явного brief.
- Смена области (код ↔ контент ↔ design tokens).
- Перед PLAN в workflow PLAN→ACCEPT.

## 4. Когда НЕ применять

- Однострочный typo fix вне продуктовых путей.
- Пользователь дал полный scope со ссылками на конкретные ADR и файлы.

## 5. Входы

- Задача пользователя (текст).
- Опционально: пути файлов, issue, фаза (Phase 1).

## 6. Пошаговая процедура

1. Прочитать [AGENTS.md](../../../AGENTS.md) — bans и источники истины.
2. Прочитать [docs/specification/README.md](../../../docs/specification/README.md) — порядок DS → стили.
3. Открыть релевантные доки из таблицы AGENTS (минимум `ARCHITECTURE`, `DESIGN_SYSTEM` при коде).
4. Проверить фазу: Phase 1 — **без** каталога/playground/массового `content/`.
5. Зафиксировать пути:
   - App: `src/`
   - DS: `design/`
   - Стили: `content/styles/<id>/`
6. Сформулировать 3–5 bullet scope + явные **вне scope**.

## 7. Требования к результату

- Краткий контекст-резюме (≤15 строк) со ссылками на `docs/`.
- Явное «вне scope» для Phase 1 при риске scope creep.
- Референс-стиль `swiss-international` — только как будущий эталон, не задача реализации без тикета.

## 8. Проверки качества

- [ ] Нет предложений БД/CMS/microservices без ADR.
- [ ] Упомянут порядок Design System First.
- [ ] ID/slug — kebab-case, language-independent.

## 9. Запреты

- Менять философию продукта в резюме.
- Игнорировать `docs/` в пользу «типичного Next-проекта».
- Подменять `content/styles/` произвольной структурой.

## 10. Примеры

**Задача:** «Добавить кнопку в layout»  
**Выход:** scope = примитив в `design/components/` → `src/`; токены из `design/tokens/`; тест при логике; без новых deps.

**Задача:** «Наполнить 20 стилей»  
**Выход:** отказ Phase 1; предложить один стиль + CONTENT-REVIEW.

## 11. Связанная документация

- [AGENTS.md](../../../AGENTS.md), [CONTRIBUTING.md](../../../CONTRIBUTING.md)
- [docs/PRODUCT.md](../../../docs/PRODUCT.md), [docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md)
- [.cursor/rules/00-project-philosophy.mdc](../../../.cursor/rules/00-project-philosophy.mdc)
