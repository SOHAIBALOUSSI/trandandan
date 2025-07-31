#!/bin/bash

if [ $# -ne 1 ]; then
    echo Usage: $0 "[service_name]-service" 
    exit 1
fi

SERVICE_NAME=$1
DOCKERFILE_PATH="./$SERVICE_NAME/Dockerfile"

mkdir -p $SERVICE_NAME/src

cat > $DOCKERFILE_PATH << EOL
FROM node:slim

RUN apt update && apt upgrade -y && apt install -y sqlite3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

CMD ["node", "src/index.js"]
EOL

echo $SERVICE_NAME\'s Dockerfile is created.
