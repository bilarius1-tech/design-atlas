# ARCHITECTURE

## Overview

Design Atlas is a **modular monolith** on Next.js (App Router). Product pipeline:

```
Template content + Visual Style tokens + Template structure
  → Style Renderer → Live Preview → Prompt (RU+EN) / Design Pack Export
```

Data is read from Git (filesystem) at build/request time. No DB in v1 ([ADR-0002](decisions/ADR-0002-content-storage.md)).

```
┌─────────────────────────────────────────────────────────┐
│                 Next.js App (src/)                      │
│  routes · components (shell) · features                 │
└───────────┬───────────────────────────┬─────────────────┘
            │                           │
    ┌───────▼────────┐          ┌───────▼────────┐
    │ content/       │          │ design/        │
    │ styles/        │          │ system tokens  │
    │ templates/     │          │ (app shell)    │
    └───────┬────────┘          └────────────────┘
            │
    ┌───────▼───────────────────────────┐
    │ Zod · Content Engine · Export     │
    └───────────────────────────────────┘
```

## Layers

| Layer | Path | Responsibility |
|-------|------|----------------|
| Routes | `src/app/` | Routes, metadata |
| UI shell | `src/components/` | Product chrome (not Visual Style) |
| Features | `src/features/` | preview, export, (later) templates UI |
| Core | `src/core/` | Zod schemas, content loaders, generators |
| Content | `content/styles/`, `content/templates/` | SSOT for styles and templates |
| Design | `design/` | App-shell tokens |

**Forbidden:** importing raw JSON into UI without validation.

## Feature boundaries (target)

| Feature | Role |
|---------|------|
| `demo-landing` / future style-renderer | Template × Style → preview |
| `style-playground` | Component QA matrix (not primary UX) |
| `export` | Design Pack ZIP ([ADR-0008](decisions/ADR-0008-design-pack-export-engine.md)) |
| (later) `templates` | Template catalog and pair selection |

See [ADR-0009](decisions/ADR-0009-template-style-preview-prompt.md).

## Style rendering

Scoped CSS variables on the preview container ([ADR-0003](decisions/ADR-0003-style-rendering.md)): shell uses `design/system`; catalog styles use `--sp-*` (export `--da-*`).

## Language

UI and demo copy: **Russian**. Agent prompts: **RU + EN**. Technical docs: **English**. ([ADR-0010](decisions/ADR-0010-russian-only-locale.md)).

## Evolution (requires ADR)

- DB / CMS / microservices
- Payments and auth
- Export format major bump
- English product UI locale
