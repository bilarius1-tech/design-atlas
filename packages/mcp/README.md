# Design Atlas MCP

Тонкий stdio MCP-сервер над публичным JSON API `/api/v1`. Своих данных нет: все инструменты делают GET.

Сервис бесплатный, ключ не нужен. По умолчанию база API — **https://design.vaybik.ru**. Пока домен не навешан, задайте текущий адрес Vercel в `DESIGN_ATLAS_API_BASE`.

## Инструменты

| Tool                                | Что делает                                       |
| ----------------------------------- | ------------------------------------------------ |
| `list_styles`                       | Список опубликованных стилей                     |
| `get_style`                         | Метаданные стиля (`id`)                          |
| `get_tokens`                        | Токены: `styleId` или `themeId` или `shell=true` |
| `list_components` / `get_component` | Каталог оболочки                                 |
| `search_guidelines`                 | Поиск (`q`)                                      |
| `get_prompt`                        | Правила и промпты стиля (`styleId`)              |
| `get_template`                      | Шаблон страницы (`id`)                           |
| `get_theme`                         | Тема проекта, например `vaybik`                  |

Как пользоваться агенту: сначала запросите тему или стиль и токены, затем верстайте. Не выдумывайте палитру и не путайте оболочку Atlas с темой `vaybik`.

## Запуск из репозитория

Нужны Node 22+ и pnpm (tsx уже есть в корневом devDependency).

```bash
DESIGN_ATLAS_API_BASE=https://design-atlas-wine.vercel.app pnpm exec tsx packages/mcp/src/index.ts
```

После переноса домена переменную можно не ставить — по умолчанию будет `https://design.vaybik.ru`.

## Cursor

Скопируйте [mcp.json.example](./mcp.json.example) в `.cursor/mcp.json` проекта или в пользовательский MCP-конфиг. Секретов в примере нет.

Пока `design.vaybik.ru` не указывает на этот сервис, в `env` укажите:

```json
"DESIGN_ATLAS_API_BASE": "https://design-atlas-wine.vercel.app"
```
