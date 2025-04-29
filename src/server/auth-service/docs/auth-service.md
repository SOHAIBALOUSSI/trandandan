# Auth Service

## Overview
The `auth-service` is responsible for handling user authentication, registration, session management, and user profile retrieval.

---

## Endpoints

| Method | Path       | Description                     | Authentication Required |
| :----: | ---------- | ------------------------------- | :----------------------: |
| POST   | `/login`    | Log in a user                    | No |
| POST   | `/register` | Register a new user              | No |
| POST   | `/logout`   | Log out a logged-in user         | Yes |
| GET    | `/me`       | Get current user profile         | Yes |

---

## Schemas

- **Login Schema**:
  - `email`: string, required
  - `password`: string, required

- **Register Schema**:
  - `username`: string, required
  - `email`: string, required
  - `password`: string, required

---

## Notes
- Successful login returns a token. 
- Logout clears the session or token. 
- `/me` returns current user info based on session/token. 

## To add
 - Authorization code & client credentials flow.
