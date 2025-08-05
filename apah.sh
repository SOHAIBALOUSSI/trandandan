#!/bin/bash

for i in $(seq 1 50); do
  username="user$i"
  email="user$i@example.com"
  password="Password123."
  confirmPassword="Password123."
  gender="M"

  curl -X POST https://localhost:9090/auth/register \
    -H "Content-Type: application/json" \
    -d "{\"username\":\"$username\", \"email\":\"$email\", \"password\":\"$password\", \"confirmPassword\":\"$confirmPassword\", \"gender\":\"$gender\"}" \
    --insecure
  echo " -> Sent user $username"
done
