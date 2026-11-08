# AGENT WORKFLOW

Стандартный цикл для любой задачи в Design Atlas.

## Фазы

```
PLAN → IMPLEMENT → TEST → REVIEW → DOCUMENT → ACCEPT
```

### PLAN

- Прочитать [AGENTS.md](../AGENTS.md), релевантные `docs/`, ADR.
- Заполнить [templates/TASK-TEMPLATE.md](templates/TASK-TEMPLATE.md) (в issue, PR или ответе).
- Явно указать **out of scope** (особенно: playground, публичный каталог в ранних фазах).
- Если нужна архитектурная новизна — стоп, ADR или вопрос человеку.

### IMPLEMENT

- Минимальный diff; контракты → Zod + docs.
- Контент: id kebab-case, localized поля.
- Код Next.js — сверка с `node_modules/next/dist/docs/`.

### TEST

Команды:

```bash
pnpm lint
pnpm exec tsc --noEmit
pnpm test   # когда настроен vitest.config
```

Добавить/обновить тесты для новой логики (см. [TESTING.md](TESTING.md)).

### REVIEW

- Self-check по [CONTRIBUTING.md](../CONTRIBUTING.md) DoD.
- UI/визуал → [templates/STYLE-REVIEW.md](templates/STYLE-REVIEW.md).
- Тексты → [templates/CONTENT-REVIEW.md](templates/CONTENT-REVIEW.md).

### DOCUMENT

- Обновить затронутые `docs/`.
- `CHANGELOG.md` → `Unreleased` при пользовательских изменениях.
- Новый ADR при архитектурном решении.
- Кратко зафиксировать работу в [devlog/](devlog/) (`YYYY-MM-DD.md`): сделано, проверки, next.

### ACCEPT

- [templates/AGENT-REPORT.md](templates/AGENT-REPORT.md): что сделано, команды, риски, follow-ups.

## Эскалация

| Ситуация | Действие |
|----------|----------|
| Нет поля в DATA_CONTRACTS | PR на схему, не silent add |
| Конфликт ADR | Новый ADR supersede |
| Нужна БД/CMS | Стоп до human approve + ADR |
| Падение CI | Fix или revert, не merge |

## Параллельные агенты

- Не редактировать одни файлы без координации.
- `content/index.json` и схемы — single-writer per PR.

## Чеклист быстрого старта

1. `pnpm install`
2. Прочитать ROADMAP текущей фазы
3. TASK-TEMPLATE
4. Work
5. AGENT-REPORT
