#! /bin/sh

set -e
export PROJECT_ENVIRONMENT=development
export PROJECT_NGINX_CONFIG=./nginx.conf
docker-compose up -d
