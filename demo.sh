#!/bin/bash

# Start the Docker containers
echo "Starting Docker containers..."
docker compose -f compose/postgres/docker-compose.yml up -d || { echo "Docker compose up failed"; exit 1; }

# Wait for the database to be ready
echo "Waiting for the database to be ready..."
DB_HOST="localhost"  # Replace with your database host if different
DB_PORT="5432"       # Replace with your database port if different
MAX_RETRIES=30
RETRY_INTERVAL=2

for i in $(seq 1 $MAX_RETRIES); do
  if nc -z $DB_HOST $DB_PORT; then
    echo "Database is up!"
    break
  else
    echo "Database not ready yet, retrying in $RETRY_INTERVAL seconds..."
    sleep $RETRY_INTERVAL
  fi

  if [ $i -eq $MAX_RETRIES ]; then
    echo "Failed to connect to the database after $MAX_RETRIES attempts. Exiting."
    exit 1
  fi
done



# Run the demo scripts
echo "Running scales script..."

npm run demoAtec || { echo "npm run demoAtec failed"; exit 1; }
npm run demoCrisisReport || { echo "npm run demoCrisisReport failed"; exit 1; }
npm run demoMChat || { echo "npm run demoMChat failed"; exit 1; }
npm run demoAutismBehaviorChecklist || { echo "npm run demoAutismBehaviorChecklist failed"; exit 1; }
npm run demoCars || { echo "npm run demoAutismBehaviorChecklist failed"; exit 1; }


# Stop the Docker containers
echo "Stopping Docker containers..."
docker compose -f compose/postgres/docker-compose.yml stop || { echo "Docker compose stop failed"; exit 1; }

echo "Setup completed successfully!"