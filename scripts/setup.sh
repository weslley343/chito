#!/bin/bash

# Pull the latest changes from the Git repository
echo "Pulling latest changes from Git..."
git pull || { echo "Git pull failed"; exit 1; }

# Install npm dependencies
echo "Installing npm dependencies..."
npm install || { echo "npm install failed"; exit 1; }

# Start the Docker containers
echo "Starting Docker containers..."
docker compose -f compose/postgres/docker-compose.yml up -d || { echo "Docker compose up failed"; exit 1; }

# Run the scales script
echo "Running uuid script..."
npm run uuid_setup || { echo "npm run uuid_setup failed"; exit 1; }

# Run Prisma migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy || { echo "Prisma migrate deploy failed"; exit 1; }

# Run the scales script
echo "Running scales script..."
npm run scales || { echo "npm run scales failed"; exit 1; }

# Stop the Docker containers
echo "Stopping Docker containers..."
docker compose -f compose/postgres/docker-compose.yml stop || { echo "Docker compose stop failed"; exit 1; }

echo "Setup completed successfully!"