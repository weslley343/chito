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

#install postgres UUID extension
source .env

psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME <<EOF
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOF

if [ $? -eq 0 ]; then
  echo "Extensão 'uuid-ossp' instalada com sucesso!"
else
  echo "Erro ao instalar a extensão 'uuid-ossp'."
fi

export PGPASSWORD=$DB_PASSWORD

psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME <<EOF
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
EOF

if [ $? -eq 0 ]; then
  echo "Extensão 'uuid-ossp' instalada com sucesso!"
else
  echo "Erro ao instalar a extensão 'uuid-ossp'."
fi


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