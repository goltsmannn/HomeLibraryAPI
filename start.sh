#!/bin/bash

npx prisma migrate reset
npm run start
echo "PostgreSQL is healthy, starting the app..."
exec "$@"