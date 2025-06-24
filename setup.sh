#!/bin/bash

# Pull the latest changes from the Git repository
echo "UPDATING..."
git pull || { echo "Git pull failed"; exit 1; }

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

# Run npm install
echo "Instaling dependencies..."
npm install || { echo "dependencies failed"; exit 1; }

# Run the uuid script
echo "Running uuid script..."
npm run uuid_setup || { echo "npm run uuid_setup failed"; exit 1; }

# Run Prisma migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy || { echo "Prisma migrate deploy failed"; exit 1; }

# Run the scales script
echo "Running scales script..."

npm run scales || { echo "npm run scales failed"; exit 1; }

npm run m_chat || { echo "npm run m_chat failed"; exit 1; }

npm run crisis_report || { echo "npm run crisis_report failed"; exit 1; }

npm run atec || { echo "npm run atec failed"; exit 1; }

npm run cars || { echo "npm run cars failed"; exit 1; }

npm run autism_behavior_checklist || { echo "npm run atec failed"; exit 1; }

# Run the hexagonRecSys setup
echo "Seting up RecSys..."



cd hexagonRecSys-main/ || { echo "open recsys_setup failed"; exit 1; }

python3 -m venv .venv || { echo "venv recsys_setup failed"; exit 1; }

pip install -r requirements.txt || { echo "pip install recsys_setup failed"; exit 1; }

fastapi dev main.py || { echo "fastapi dev recsys_setup failed"; exit 1; }

cd .. || { echo "return to root failed"; exit 1; }

# Stop the Docker containers
echo "Stopping Docker containers..."
docker compose -f compose/postgres/docker-compose.yml stop || { echo "Docker compose stop failed"; exit 1; }

echo "Setup completed successfully!"