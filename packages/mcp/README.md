# Design Atlas MCP

Тонкий stdio MCP-сервер над публичным JSON API `/api/v1`. Своих данных нет: все инструменты делают GET.

Сервис бесплатный, ключ не нужен. База API по умолчанию — **https://design.vaybik.ru**. При необходимости её можно переопределить переменной `DESIGN_ATLAS_API_BASE`.

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

## Cursor

Скопируйте [mcp.json.example](./mcp.json.example) в `.cursor/mcp.json` проекта или в пользовательский MCP-конфиг. Секретов в примере нет.

Адрес API уже указан в примере: `https://design.vaybik.ru`.
