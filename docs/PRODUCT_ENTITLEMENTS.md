# PRODUCT ENTITLEMENTS

Внутренняя модель прав доступа к материалам Design Atlas. **Не** является биллингом.

## Tiers

| Tier | Назначение | PHASE 7 |
|------|------------|---------|
| `free` | Публичный просмотр + Free Design Pack | Доступен для `published` стилей |
| `pack` | Конкретный платный Design Pack | Зарезервирован; UI: «в разработке» |
| `pro` | Библиотека / Pro | Зарезервирован |

## Pack kinds

| Kind | Entitlement | Серверное решение |
|------|-------------|-------------------|
| `free` | `free` | Всегда для published |
| `full` | `pack` / internal | Только если `DESIGN_ATLAS_ALLOW_FULL_EXPORT=1` (CI/dev) |

Клиент **не** передаёт доверенный `access` / `isPremium`. Route Handler вызывает `assertPackAccess(packKind)`.

## Правила

1. Публичный контент (playground, demo, docs) не исчезает при появлении packs.
2. Full/Pro материалы не попадают в Free Export (pack definition exclusions).
3. Скрытие кнопки ≠ защита: сервер отказывает с 403.
4. Unpublished стили не экспортируются.

См. [ADR-0008](decisions/ADR-0008-design-pack-export-engine.md), [EXPORT_SECURITY.md](EXPORT_SECURITY.md).
