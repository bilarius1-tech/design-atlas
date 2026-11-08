---
name: release-check
description: Pre-release чеклист Design Atlas — ci, docs, changelog, security. Использовать перед тегом версии или фазовой приёмкой.
---

# release-check

## 1. Название

`release-check`

## 2. Назначение

Гарантировать **воспроизводимую** готовность релиза/фазы по CONTRIBUTING DoD.

## 3. Когда применять

- Перед git tag / GitHub Release.
- Приёмка Phase (0, 1, …) по [docs/ROADMAP.md](../../../docs/ROADMAP.md).

## 4. Когда НЕ применять

- WIP ветка без запроса релиза.

## 5. Входы

- Целевая версия semver.
- Scope релиза (функции/доки).

## 6. Пошаговая процедура

1. `git status --porcelain` — чисто или осознанные изменения.
2. `pnpm ci` (lint + typecheck + test + build).
3. Проверить [CHANGELOG.md](../../../CHANGELOG.md) секция `Unreleased` заполнена для user-visible changes.
4. Docs: ссылки из README/AGENTS не битые (проверить существование файлов в `docs/`).
5. Security: нет `.env` в индексе; `content-validation` на затронутые styles.
6. Architecture: `architecture-guard` на diff since last tag.
7. Заполнить [docs/templates/AGENT-REPORT.md](../../../docs/templates/AGENT-REPORT.md) для приёмки.
8. Только после human approval — предложить tag команду (не выполнять без запроса).

## 7. Требования к результату

- CI green log приложен к отчёту.
- Явный список known issues / deferred.

## 8. Проверки качества

- [ ] Version в package.json согласована с CHANGELOG.
- [ ] Нет Phase 1 banned features в diff.

## 9. Запреты

- Force-push main.
- Релиз с failing tests.

## 10. Примеры

```bash
pnpm ci
git tag v0.2.0  # только по запросу человека
```

## 11. Связанная документация

- [CONTRIBUTING.md](../../../CONTRIBUTING.md), [CHANGELOG.md](../../../CHANGELOG.md)
- [docs/SECURITY.md](../../../docs/SECURITY.md), [docs/TESTING.md](../../../docs/TESTING.md)
