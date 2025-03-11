#!/bin/bash

# Function to stop the Docker containers
stop_containers() {
  echo "Stopping Docker containers..."
  docker compose -f compose/postgres/docker-compose.yml stop
}

# Trap to ensure cleanup on script exit
trap stop_containers EXIT

# Start the Docker containers
echo "Starting Docker containers..."
docker compose -f compose/postgres/docker-compose.yml up -d || {
  echo "Docker compose up failed"
  exit 1
}

# Run the application using npm
echo "Starting the application..."
npm run start || {
  echo "Failed to start the application"
  exit 1
}

# If the script reaches this point, it means the application exited normally
echo "Application stopped. Docker containers will be stopped automatically."