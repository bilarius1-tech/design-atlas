# RELEASE-CHECKLIST

**Версия:** vX.Y.Z  
**Дата:**  
**Release captain:**

## Pre-release

- [ ] ROADMAP / scope релиза согласован
- [ ] CHANGELOG: секция для версии заполнена
- [ ] Все PR в релизе merged в `main`
- [ ] CI green на последнем commit

## Quality

- [ ] `pnpm lint`
- [ ] `pnpm typecheck` (или `tsc --noEmit`)
- [ ] `pnpm test`
- [ ] `validate-content` (если есть контент)
- [ ] Smoke: `pnpm build && pnpm start` локально

## Security & compliance

- [ ] Нет секретов в diff
- [ ] SECURITY.md действия выполнены (headers на prod — по возможности)

## Deploy

- [ ] Production deploy initiated
- [ ] Preview vs production URL проверены
- [ ] Rollback plan известен (предыдущий Vercel deployment / git revert)

## Post-release

- [ ] Git tag `vX.Y.Z` создан
- [ ] Release notes опубликованы (GitHub Releases)
- [ ] Мониторинг 24h (errors, 5xx)

## Sign-off

| Role | Name | OK |
|------|------|-----|
| Tech | | |
| Content | | |
