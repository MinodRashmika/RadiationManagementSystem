#!/bin/bash
#Reference https://chatgpt.com
# Set the Docker image version
IMAGE_VERSION=adhityaa/radiationmanagementv3.0

# Stop and remove existing containers if they are running
docker stop db backend frontend
docker rm db backend frontend

# Create the Docker network
docker network create app-network

# Create a Docker volume named Radiation_project_MySQL for MySQL data persistence
docker volume create Radiation_project_MySQL

# Run the database container with the volume mounted
docker run -d --name db --network app-network -e MYSQL_ROOT_PASSWORD=student123 -v Radiation_project_MySQL:/var/lib/mysql $IMAGE_VERSION:db

# Wait for 20 seconds to allow the database container to start
sleep 20

# Run the backend container
docker run -d --name backend --network app-network -e DB_HOST=db -e DB_PORT=3306 -e DB_USER=root -e DB_PASSWORD=student123 -p 8070:8070 $IMAGE_VERSION:backend

# Run the frontend container
docker run -d --name frontend --network app-network -p 3000:3000 $IMAGE_VERSION:frontend

# Verify the setup
echo "Containers are running. Verifying the setup..."

# List running containers
docker ps

# Inspect the network
docker network inspect app-network

# Function to ask user if they want to stop the containers
ask_stop() {
    read -p "Do you want to stop the containers? (y/n): " stop_containers
    if [[ "$stop_containers" == "y" ]]; then
        docker stop db backend frontend
        docker rm db backend frontend
        echo "Containers stopped and removed."
    elif [[ "$stop_containers" == "n" ]]; then
        echo "Containers are still running."
    else
        echo "Please enter only 'y' or 'n'."
        ask_stop
    fi
}

# Ask the user if they want to stop the containers
ask_stop