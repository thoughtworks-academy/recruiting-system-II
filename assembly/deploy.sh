#!/usr/bin/env bash

set -e

docker-compose kill
docker-compose rm -f
docker-compose up -d

docker exec -it assembly_mysql_1 /tmp/create-db.sh