---
name: architecture-guard
description: Проверяет изменения на соответствие архитектуре Design Atlas и ADR. Использовать перед merge-крупными PR, новыми модулями, зависимостями или слоями данных.
---

# architecture-guard

## 1. Название

`architecture-guard`

## 2. Назначение

Блокировать **архитектурный дрейф**: лишние слои, БД, дубли токенов, нарушение монолита.

## 3. Когда применять

- Новый top-level каталог в `src/`.
- Новая зависимость в `package.json`.
- Изменения `content/`, `design/`, export pipeline.
- Любое «давайте подключим CMS/Prisma».

## 4. Когда НЕ применять

- Правки внутри существующего модуля без новых границ.
- Документация-only PR по шаблонам.

## 5. Входы

- Diff или список изменённых файлов.
- Описание intent из PLAN.

## 6. Пошаговая процедура

1. Сверить с [docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md) и [AGENTS.md](../../../AGENTS.md) bans.
2. Для каждого **нового** пути — классифицировать: app | design | content | docs | test.
3. **Deps:** для каждого нового пакета — записать зачем; есть ли аналог в стеке README.
4. **Токены:** если в diff есть hex/radius/spacing в TSX — указать нарушение SSOT.
5. Если нарушение + нет ADR в `docs/decisions/` — **STOP**; список требований к ADR.
6. Иначе — чеклист «architecture OK» с оговорками.

## 7. Требования к результату

- Таблица: файл → слой → вердикт (OK / ADR required / reject).
- Явный verdict: `proceed` | `proceed with ADR` | `blocked`.

## 8. Проверки качества

- [ ] Нет DB/CMS в v1 без ADR.
- [ ] `@/*` не нарушен.
- [ ] Export читает tokens, не JSX literals.

## 9. Запреты

- Одобрять scope creep «заодно».
- Разрешать дубли токенов «временно».

## 10. Примеры

**Diff:** `src/lib/db.ts` + `prisma` → **blocked**, ADR на persistence.

**Diff:** `design/tokens/color.json` + `globals.css` → **proceed**.

## 11. Связанная документация

- [docs/ARCHITECTURE.md](../../../docs/ARCHITECTURE.md), [docs/decisions/](../../../docs/decisions/)
- [.cursor/rules/01-architecture.mdc](../../../.cursor/rules/01-architecture.mdc)
- [docs/templates/ADR-TEMPLATE.md](../../../docs/templates/ADR-TEMPLATE.md)
