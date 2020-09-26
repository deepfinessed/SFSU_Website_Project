#! /bin/sh

set -e
# upgrade to most recent migration
npx prisma migrate up --experimental
# update generator
npx prisma generate
# run tests
npm test
# start the backend
node ./bin/www
