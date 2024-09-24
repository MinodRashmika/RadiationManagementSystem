@echo off

REM Reference https://chatgpt.com/

REM Set the Docker image version
set IMAGE_VERSION=adhityaa/radiationmanagementv3.0

REM Stop and remove existing containers if they are running
docker stop db backend frontend
docker rm db backend frontend

REM Create the Docker network
docker network create app-network

REM Create a Docker volume for MySQL data persistence
docker volume create Radiation_project_MySQL

REM Run the database container with volume mounted
docker run -d --name db --network app-network -e MYSQL_ROOT_PASSWORD=student123 -v Radiation_project_MySQL:/var/lib/mysql %IMAGE_VERSION%:db

REM Wait for 20 seconds to allow the database container to start
timeout /T 20 /NOBREAK

REM Run the backend container
docker run -d --name backend --network app-network -e DB_HOST=db -e DB_PORT=3306 -e DB_USER=root -e DB_PASSWORD=student123 -p 8070:8070 %IMAGE_VERSION%:backend

REM Run the frontend container
docker run -d --name frontend --network app-network -p 3000:3000 %IMAGE_VERSION%:frontend

REM Verify the setup
echo Containers are running. Verifying the setup...

REM List running containers
docker ps

REM Inspect the network
docker network inspect app-network

:ask_stop
set /p stop_containers="Do you want to stop the containers? (y/n): "
if /i "%stop_containers%"=="y" (
    docker stop db backend frontend
    docker rm db backend frontend
    echo Containers stopped and removed.
) else if /i "%stop_containers%"=="n" (
    echo Containers are still running.
) else (
    echo Please enter only 'y' or 'n'.
    goto ask_stop
)

pause