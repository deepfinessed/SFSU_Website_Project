#!/bin/sh

set -e

docker-compose exec backend bash -c "rm -rf migrations"
docker-compose exec backend bash -c "node ./utils/truncate_migrations.js"
