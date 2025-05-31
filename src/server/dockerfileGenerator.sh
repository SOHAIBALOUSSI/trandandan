#!/bin/bash

if [ $# -ne 2 ]; then
    echo Usage: $0 "[service_name]_service" 
    exit 1
fi

SERVICE_NAME=$1
DOCKERFILE_PATH="./$SERVICE_NAME/Dockerfile"

mkdir -p $SERVICE_NAME/src

cat > $DOCKERFILE_PATH << EOL
FROM node:slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --production

COPY . .

CMD ["node", "src/index.js"]
EOL

echo $SERVICE_NAME\'s Dockerfile is created.
