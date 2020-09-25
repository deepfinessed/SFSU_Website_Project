#! /bin/sh

set -e
# upgrade to most recent migration
npx prisma migrate up --experimental
# update generator
npx prisma generate
# start the backend
node ./bin/www
