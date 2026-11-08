# ADR-0001: Project architecture

- **Status:** Accepted
- **Date:** 2026-11-09

## Context / Problem

Нужна платформа знаний о визуальных стилях с живой демонстрацией и экспортом для разработчиков и AI-агентов. Команда мала; продукт должен версионироваться в Git, быть предсказуемым для автоматизации и не требовать ops БД на старте.

## Options considered

1. **Modular monolith (Next.js)** — один репозиторий, App Router, контент из FS/Git.
2. **Split:** CMS + SPA — headless CMS (Sanity/Contentful) + отдельный фронт.
3. **Microservices** — API сервис контента + web + export worker.

## Decision

Принять **вариант 1**: модульный монолит на Next.js (App Router), TypeScript strict, контент и дизайн-артефакты в репозитории (`content/`, `design/`), валидация Zod, CI на GitHub Actions.

## Consequences

- **Плюсы:** простой деплой, единый PR для контента и кода, агенты читают один repo.
- **Минусы:** масштабирование контента упирается в Git workflow; позже может понадобиться индекс/search.
- **Действия:** модули в `src/features/`; ADR для любого выноса сервисов или БД.
