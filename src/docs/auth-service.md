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


| Method | Path                  | Description                                    | Authentication Required |
| :----: | --------------------- | ---------------------------------------------- | :----------------------: |
| POST   | `/app/setup`          | Set up new 2FA for authenticator app           | Yes                      |
| POST   | `/app/verify-setup`   | Verify 2FA TOPT code for app setup             | Yes                      |
| POST   | `/app/verify-login`   | Verify TOPT code for login with 2fa using app  | Yes                      |
| POST   | `/email/setup`        | Set up new 2FA for email                       | Yes                      |
| POST   | `/email/verify-setup` | Verify 2FA TOPT code for email setup           | Yes                      |
| POST   | `/verify-login`       | Verify OPT code for login with 2fa using email | Yes                      |

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

## Response Schema

```yaml
{
  statusCode: number,
  code: string,
  data: {
    ...
  }
}

```

## Response Codes
```yaml

  400: {
    USER_NOT_FOUND,
    UNMATCHED_PASSWORDS,
    USER_EXISTS,
    PROFILE_CREATION_FAILED
  },

  401: {
    ACCESS_TOKEN_REQUIRED,
    ACCESS_TOKEN_INVALID,
    REFRESH_TOKEN_REQUIRED,
    REFRESH_TOKEN_INVALID
  },

  200: {
    USER_LOGGED_IN,
    USER_LOGGED_OUT,
    USER_FETCHED,
    TOKEN_REFRESHED,
    SCAN_QR,
    2FA_ENABLED,
    CODE_SENT
  },

  201: USER_REGISTERED

  206: 2FA_REQUIRED,

  500: INTERNAL_SERVER_ERROR

```

---

## Notes
- Successful login returns a token.
- Logout clears the session or token.
- `/me` returns the current user info based on session/token.
- Setting up 2FA for email and app are basically the same, they only differ in how OTP codes are generated.
- `/verify-login` is a special route dedicated for validating sms/email OTP codes (sms not implemented yet).