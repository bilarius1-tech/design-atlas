# Design Atlas MCP

Основной способ подключения — удалённый MCP по Streamable HTTP, без клонирования этого пакета:

```json
{
  "mcpServers": {
    "design-atlas": {
      "url": "https://design.vaybik.ru/mcp"
    }
  }
}
```

```bash
claude mcp add --transport http design-atlas https://design.vaybik.ru/mcp
```

На сайте: https://design.vaybik.ru/#mcp (кнопка «Добавить в Cursor»). Те же инструменты, что и у этого stdio-сервера, включая `get_design_spec`. Ключ не нужен.

Ниже — запасной локальный stdio-сервер над публичным JSON API `/api/v1`. Своих данных нет: все инструменты делают GET. База API по умолчанию — **https://design.vaybik.ru**. При необходимости её можно переопределить переменной `DESIGN_ATLAS_API_BASE`.

## Инструменты

| Tool                                | Что делает                                       |
| ----------------------------------- | ------------------------------------------------ |
| `list_styles`                       | Список опубликованных стилей                     |
| `get_style`                         | Метаданные стиля (`id`)                          |
| `get_tokens`                        | Токены: `styleId` или `themeId` или `shell=true` |
| `list_components` / `get_component` | Каталог оболочки                                 |
| `search_guidelines`                 | Поиск (`q`)                                      |
| `get_prompt`                        | Правила и исходные markdown-файлы стиля (`styleId`) |
| `get_design_spec`                   | Самодостаточная спецификация: markdown + JSON токенов (`styleId`, необязательно `lang`, `surface`) |
| `get_template`                      | Шаблон страницы (`id`)                           |
| `get_theme`                         | Тема проекта, например `vaybik`                  |

Как пользоваться агенту: вызовите `get_design_spec` для нужного стиля и внедрите полученный текст в текущий проект. При необходимости сначала `list_styles`. Не выдумывайте палитру и не путайте оболочку Atlas с темой `vaybik`. Не подключайте Google Fonts и внешние CDN.

## Запуск из репозитория

Нужны Node 22+ и pnpm (tsx уже есть в корневом devDependency).

```bash
pnpm mcp
```

По умолчанию запросы идут на `https://design.vaybik.ru`.

## Локальный Cursor (stdio)

Нужен только если удалённый `https://design.vaybik.ru/mcp` по какой-то причине недоступен. Скопируйте [mcp.json.example](./mcp.json.example) в `.cursor/mcp.json` после `pnpm install` в клоне. Секретов в примере нет.
