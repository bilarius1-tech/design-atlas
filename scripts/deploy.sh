#!/usr/bin/env bash
# Deploy https://design.vaybik.ru on the main VPS.
#
#   scripts/deploy.sh            # pull origin/main, build, up, health
#   scripts/deploy.sh --dry-run  # show what would change
#
# Run as user `deploy` in /opt/apps/design-atlas (or it will clone there).
# Does not touch Traefik, acme.json, firewall, region, hub, or chat.
set -euo pipefail

PROD_DIR="${PROD_DIR:-/opt/apps/design-atlas}"
IMAGE="${IMAGE:-design-atlas}"
HEALTH_URL="${HEALTH_URL:-https://design.vaybik.ru/api/v1/health}"
REPO_URL="${REPO_URL:-https://github.com/bilarius1-tech/design-atlas.git}"
KEEP_PREV="${KEEP_PREV:-3}"
MIN_AVAIL_MB="${MIN_AVAIL_MB:-1500}"

DRY=0
for a in "$@"; do
  case "$a" in
    --dry-run) DRY=1 ;;
    -h|--help) sed -n '2,12p' "$0"; exit 0 ;;
    *) echo "Unknown argument: $a" >&2; exit 2 ;;
  esac
done

say()  { printf '\n\033[1;33m▶ %s\033[0m\n' "$*"; }
fail() { printf '\n\033[1;31m✖ %s\033[0m\n' "$*" >&2; exit 1; }

[ "$(id -un)" = "deploy" ] || fail "Run as user deploy (now: $(id -un))."

# One build at a time: refuse if another docker/compose build is already running.
if pgrep -af 'docker( |\-)build|compose build|buildx' | grep -Ev "pgrep|scripts/deploy.sh|$$" >/dev/null; then
  pgrep -af 'docker( |\-)build|compose build|buildx' || true
  fail "Another Docker build is already running. Wait and retry."
fi

avail="$(awk '/MemAvailable:/ {print int($2/1024)}' /proc/meminfo)"
[ "$avail" -ge "$MIN_AVAIL_MB" ] || fail "Not enough free memory: ${avail} MiB available, need ≥ ${MIN_AVAIL_MB}."

if [ ! -d "$PROD_DIR/.git" ]; then
  say "First install: clone into $PROD_DIR"
  [ "$DRY" = 1 ] && { echo "Would: git clone $REPO_URL $PROD_DIR"; exit 0; }
  git clone "$REPO_URL" "$PROD_DIR"
fi

cd "$PROD_DIR"
export GIT_CONFIG_COUNT=1
export GIT_CONFIG_KEY_0=safe.directory
export GIT_CONFIG_VALUE_0="$PROD_DIR"

if [ ! -f .env ]; then
  say "Writing $PROD_DIR/.env (no secrets)"
  umask 077
  cat > .env <<'EOF'
APP_NAME=design-atlas
APP_HOST=design.vaybik.ru
APP_PORT=3000
COMPOSE_PROJECT_NAME=design-atlas
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://design.vaybik.ru
EOF
  chmod 600 .env
fi

grep -q '^COMPOSE_PROJECT_NAME=design-atlas' .env || fail "$PROD_DIR/.env must set COMPOSE_PROJECT_NAME=design-atlas."

git fetch -q origin main
CUR="$(git rev-parse --short HEAD)"
NEW="$(git rev-parse --short origin/main)"
git merge-base --is-ancestor HEAD origin/main || fail "origin/main does not continue the current checkout ($CUR)."

say "Now: $CUR → will be: $NEW"
if [ "$CUR" = "$NEW" ]; then
  echo "No new commits — will rebuild the current HEAD."
else
  git log --oneline "HEAD..origin/main"
fi

if [ "$DRY" = 1 ]; then
  say "Dry run: nothing changed."
  echo "Rollback after a real deploy: docker tag $IMAGE:prev-$CUR $IMAGE:latest && docker compose up -d --no-build --force-recreate"
  exit 0
fi

if docker image inspect "$IMAGE:latest" >/dev/null 2>&1; then
  docker tag "$IMAGE:latest" "$IMAGE:prev-$CUR"
  echo "Saved rollback image $IMAGE:prev-$CUR"
fi

git checkout -q main
git pull --ff-only origin main
NEW="$(git rev-parse --short HEAD)"

say "Building $IMAGE (NODE_OPTIONS=--max-old-space-size=2048), one image only"
export NODE_OPTIONS=--max-old-space-size=2048
docker compose build app
docker compose up -d --no-build --force-recreate app

say "Waiting for $HEALTH_URL"
ok=0
for i in $(seq 1 30); do
  if curl -fsS -o /tmp/design-atlas-health.json --max-time 10 "$HEALTH_URL"; then
    if grep -q '"ok"' /tmp/design-atlas-health.json 2>/dev/null || grep -qi 'ok' /tmp/design-atlas-health.json; then
      cat /tmp/design-atlas-health.json; echo
      ok=1
      break
    fi
  fi
  sleep 2
done
[ "$ok" = 1 ] || fail "Health check failed after deploy. Rollback: docker tag $IMAGE:prev-$CUR $IMAGE:latest && cd $PROD_DIR && docker compose up -d --no-build --force-recreate"

# Keep a few previous image tags.
mapfile -t prevs < <(docker images --format '{{.Repository}}:{{.Tag}}' "$IMAGE" | grep "^$IMAGE:prev-" | sort -r || true)
if [ "${#prevs[@]}" -gt "$KEEP_PREV" ]; then
  for img in "${prevs[@]:$KEEP_PREV}"; do
    docker image rm "$img" >/dev/null 2>&1 || true
  done
fi

say "Deployed $NEW"
echo "URL:    https://design.vaybik.ru"
echo "Health: $HEALTH_URL"
echo "Rollback: docker tag $IMAGE:prev-$CUR $IMAGE:latest && cd $PROD_DIR && docker compose up -d --no-build --force-recreate"
