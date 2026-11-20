# Public JSON API (`/api/v1`)

Read-only, no sign-up, no payments. Anyone may call these GET endpoints for published content. There is no write API and no API keys for the public catalog.

The older ZIP export stays at `GET /api/export/[styleId]?pack=free|full` and is unchanged. Full packs remain server-gated.

`robots.txt` disallows `/api/` for crawlers. Programmatic clients (agents, MCP, curl) can still call the API.

Planned canonical host: https://design.vaybik.ru — until cutover, use the current Vercel origin.

## Endpoints

| Method | Path                            | Result                                       |
| ------ | ------------------------------- | -------------------------------------------- |
| GET    | `/api/v1/health`                | `{ ok, service }`                            |
| GET    | `/api/v1/styles`                | Published style list                         |
| GET    | `/api/v1/styles/:id`            | Style metadata                               |
| GET    | `/api/v1/styles/:id/tokens`     | Style tokens                                 |
| GET    | `/api/v1/styles/:id/guidelines` | Markdown rules and prompts                   |
| GET    | `/api/v1/shell/tokens`          | Atlas shell tokens                           |
| GET    | `/api/v1/themes`                | Theme list                                   |
| GET    | `/api/v1/themes/:id`            | Theme tokens + guidelines (`vaybik`)         |
| GET    | `/api/v1/components`            | Shell component catalog                      |
| GET    | `/api/v1/components/:name`      | One component + markdown spec                |
| GET    | `/api/v1/templates`             | Page templates                               |
| GET    | `/api/v1/templates/:id`         | Full template                                |
| GET    | `/api/v1/search?q=`             | Search styles, themes, components, templates |

Successful bodies include `schemaVersion` (`1.0.0`) and a `kind` field so shell tokens, catalog style tokens, and the `vaybik` theme are not mixed up. Errors: `{ "error": "not_found" \| "invalid_id" \| "invalid_query" \| "internal_error", "message": "..." }`.

Unpublished styles are hidden (404). Path traversal in ids is rejected (400).
