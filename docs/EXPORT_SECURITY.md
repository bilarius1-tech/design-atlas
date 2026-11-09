# EXPORT SECURITY

## Threats

| Угроза | Контроль |
|--------|----------|
| Path traversal / Zip Slip | `sanitizePackPath`, запрет `..`, абсолютных путей, null bytes; ZIP entries только из allowlist |
| Unpublished leak | Resolver требует `status === published` |
| Free ← Full leak | Pack Definition + validator `forbiddenPaths` |
| Secrets in archive | Banlist: `.env*`, `*.pem`, `credentials*`, `secrets*`, пути вне style dir |
| Client spoofing | Access только через `assertPackAccess` на сервере |
| Oversized ZIP | `MAX_PACK_BYTES` / `MAX_FILE_COUNT` |
| Arbitrary file include | Только resolver + generator outputs |

## Headers

ZIP response:

- `Content-Type: application/zip`
- `Content-Disposition: attachment; filename="…"`
- Не раскрывать абсолютные пути сервера в JSON ошибках.

## Лицензии ресурсов

Шрифты/изображения включаются только при явной лицензии в pack. В PHASE 7 Free/Full **не** включают бинарные font files и stock images — только токены (имена семейств) и markdown/JSON из Git SSOT.

## Rate limiting

PHASE 7: без Redis; полагаемся на платформенный edge/host. Документировать hook для будущего billing/rate layer.
