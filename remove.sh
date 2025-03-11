#!/bin/bash

# Pull the latest changes from the Git repository
echo "Deleting Container configuration"
docker container stop chito_db_prod || { echo ">> Container não está em funcionamento"; exit 1; }

docker compose -f compose/postgres/docker-compose.yml down --volumes --remove-orphans || { echo "Docker compose down failed"; exit 1; }
