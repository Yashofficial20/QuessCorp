#!/bin/sh
# wait-for-db.sh

echo "Waiting for PostgreSQL..."

while ! pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME; do
  sleep 1
done

echo "PostgreSQL started"
