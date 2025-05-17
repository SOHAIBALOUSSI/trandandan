# Auth Service 

## Overview
The `auth-service` is responsible for handling user authentication, registration, session management, and user profile retrieval.

---

## Endpoints
### Prefix: /auth


| Method | Path         | Description                                                           | Authentication Required |
| :----: | ------------ | --------------------------------------------------------------------- | :----------------------: |
| POST   | `/login`     | Log in a user                                                         | No                       |
| POST   | `/register`  | Register a new user                                                   | No                       |
| POST   | `/logout`    | Log out a logged-in user                                               | Yes                      |
| GET    | `/me`        | Get current user profile                                               | Yes                      |
| GET    | `/refresh`   | Revokes the previous refresh token and returns a new refresh token and a new access token | Yes |

---

## Schemas

- **Login Schema**:
  - `email`: string, required
  - `password`: string, required

- **Register Schema**:
  - `username`: string, required
  - `email`: string, required
  - `password`: string, required

- **Token Schema**:
  - `token`: string, required

---

## Notes
- Successful login returns a token.
- Logout clears the session or token.
- `/me` returns the current user info based on session/token.

## To Add
- Authorization code & client credentials flow.
