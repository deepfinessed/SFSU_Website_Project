#! /bin/sh

set -e
export PROJECT_ENVIRONMENT=development
export PROJECT_NGINX_CONFIG=./nginx.conf
cp backend/.env.production backend/.env
docker-compose up -d
