# Промпт · bento-grid

Ты реализуешь интерфейс в стиле **Bento Grid** по системе DESIGN ATLAS.

## Контекст
- Бенто-атмосфера: плитки с gap 16px и radius 24px. Не редактор сетки.
- Структура страницы уже в чате пользователя.

## Токены
- background `#F5F5F7`, surface `#FFFFFF`, text `#1D1D1F`, muted `#6E6E73`
- primary `#0A84FF`, accent `#FFD60A`, accentSecondary `#34C759`, border `#E5E5EA`
- gap `16px`, radiusCard `24px`, radiusButton `999px`
- fonts: Inter + Manrope; display `57px`; container `1120px`

## Запреты
- Dense-tile gap 0 / Studio grid editor / neo-brutal / вторая палитра

## Приёмка
1. Светло-серый stage + soft tiles читаются сразу.
2. Значения = tokens.json. 3. Структура пользователя не переписана.