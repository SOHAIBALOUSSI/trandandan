FROM node:20-slim

WORKDIR /app

# Install OpenSSL for certificate generation
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY . .

# Generate SSL certificates if they don't exist
RUN chmod +x generate-dev-ssl.sh && \
    if [ ! -f ssl/dev-cert.pem ]; then ./generate-dev-ssl.sh; fi

EXPOSE 5173

CMD ["npm", "run", "dev"]
