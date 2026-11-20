# Production helpers for /opt/apps/design-atlas on the main VPS.
# Local development stays `pnpm dev` / `pnpm ci`.

.PHONY: help deploy rollback logs ps smoke

help:
	@grep -E '^[a-z-]+:.*?## ' $(MAKEFILE_LIST) | sed 's/:.*## /\t/'

deploy: ## pull origin/main, build one image, start, health-check
	./scripts/deploy.sh

rollback: ## restore the previous image tag and recreate the container
	@test -n "$$(docker images -q design-atlas:prev-$$(git rev-parse --short HEAD) 2>/dev/null)$$(docker images -q --filter=reference='design-atlas:prev-*')" || { echo "No prev image found"; exit 1; }
	@prev=$$(docker images --format '{{.Repository}}:{{.Tag}}' design-atlas | grep '^design-atlas:prev-' | head -1); 	  echo "Rolling back to $$prev"; 	  docker tag "$$prev" design-atlas:latest; 	  docker compose up -d --no-build --force-recreate

logs: ## follow container logs
	docker compose logs --tail 100 -f

ps: ## container status
	docker compose ps

smoke: ## check https://design.vaybik.ru/api/v1/health
	@code=$$(curl -sS -o /tmp/design-atlas-smoke.json -w '%{http_code}' --max-time 15 https://design.vaybik.ru/api/v1/health); 	  echo "https://design.vaybik.ru/api/v1/health -> $$code"; 	  cat /tmp/design-atlas-smoke.json 2>/dev/null; echo; 	  [ "$$code" = 200 ]
