#!/bin/bash
# Generate SSL certificates for Vite development server

mkdir -p ssl

# Generate private key
openssl genrsa -out ssl/dev-key.pem 2048

# Generate certificate signing request
openssl req -new -key ssl/dev-key.pem -out ssl/dev-csr.pem -subj "/C=US/ST=State/L=City/O=Dev/OU=Dev/CN=localhost"

# Generate self-signed certificate
openssl x509 -req -in ssl/dev-csr.pem -signkey ssl/dev-key.pem -out ssl/dev-cert.pem -days 365

# Clean up CSR
rm ssl/dev-csr.pem

echo "✅ SSL certificates generated for Vite development server"
echo "📁 Certificates location: ssl/"
echo "🔑 Private key: ssl/dev-key.pem"
echo "📜 Certificate: ssl/dev-cert.pem"
