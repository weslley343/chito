#!/bin/bash

# Pull the latest changes from the Git repository
echo "Deleting Container configuration"
docker container stop chito_db_prod || { echo "Container não está em funcionamento"; exit 1; }

docker container rm chito_db_prod || { echo "Container não está em funcionamento"; exit 1; }

docker volume rm postgres_data_chito || { echo "Container não está em funcionamento"; exit 1; }