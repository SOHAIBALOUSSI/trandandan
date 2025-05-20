# Auth Service 

## Overview
The `auth-service` is responsible for handling user authentication, registration, session management, and user profile retrieval.

---

## Endpoints
**Prefix: /auth**


| Method | Path          | Description                                                           | Authentication Required |
| :----: | ------------- | --------------------------------------------------------------------- | :----------------------: |
| POST   | `/login`      | Log in a user                                                         | No                       |
| POST   | `/register`   | Register a new user                                                   | No                       |
| POST   | `/logout`     | Log out a logged-in user                                               | Yes                      |
| GET    | `/me`         | Get current user profile                                               | Yes                      |
| GET    | `/refresh`    | Revokes the previous refresh token and returns a new refresh token and a new access token | Yes |

---
**Prefix: /2fa**


| Method | Path             | Description                           | Authentication Required |
| :----: | ---------------- | ------------------------------------- | :----------------------: |
| POST   | `/setup`         | Set up new 2FA                        | Yes                      |
| POST   | `/verify-setup`  | Verify 2FA TOPT code for new 2FA      | Yes                      |
| POST   | `/verify-login`  | Verify 2FA TOPT code for existing 2FA | Yes                      |

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

- **totpCode Schema**:
  - `totpCode`: string, required


---

## Responses
**Prefix: /auth**
- `/login`: 
```yaml
  404:
    error: string
  400:
    error: string
  206:
    message: string 
    tempToken: string 
  200:
    accessToken: string 
    refreshToken: string
  500:
    error: string 
    details: string
```
- `/register`:
```yaml
  400:
    error: string
  401:
    error: string 
    details?: string
  201:
    accessToken: string 
    refreshToken: string
  500:
    error: string 
    details: string
```

- `/logout`:
```yaml
  404:
    error: string
  401:
    error: string
  200:
    message: string
  500: string 
    error: string 
    details: string
```

- `/me`:
```yaml
  404:
    error: string
  200:
    id: integer
    username: string
    email: string
  500:
    error: string 
    details: string
```

- `/refresh`:
```yaml
  401:
    error: string
  200:
    accessToken: string 
    newRefreshToken: string
  500:
    error: string 
    details: string
```

---

**Prefix: /2fa**
- `/setup` :
```yaml
  404:
    error: string
  200:
    message: string 
    qrCode: string 
  500:
    error: string 
    details: string
```

- `/verify-setup` :
```yaml
  404:
    error: string
  400:
    error: string
  401:
    error: string
  200:
    message: string
  500: string 
    error: string 
    details: string
```

- `/verify-login` :
```yaml
  404:
    error: string
  400:
    error: string
  401:
    error: string
  200:
    accessToken: string 
    refreshToken: string
  500:
    error: string 
    details: string
```

## Notes
- Successful login returns a token.
- Logout clears the session or token.
- `/me` returns the current user info based on session/token.
- `/setup` prepares user for enabling 2FA.
- `/verify-setup` verifies the received TOPT code from the setup.
- `/verify-login` verifies the code for already 2fa-enabling users

## To Add
- Authorization code & client credentials flow.


