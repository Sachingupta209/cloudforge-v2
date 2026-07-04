#!/bin/bash

set -e

echo "========================================"
echo "CloudForge Production Deployment Started"
echo "========================================"

echo ""
echo "Pulling latest Docker images..."
docker compose -f docker-compose.prod.yml pull

echo ""
echo "Starting containers..."
docker compose -f docker-compose.prod.yml up -d

echo ""
echo "Removing unused Docker images..."
docker image prune -f

echo ""
echo "Running containers:"
docker ps

echo ""
echo "========================================"
echo "Deployment Completed Successfully"
echo "========================================"