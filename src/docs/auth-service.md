# Auth Service 

## Overview
The `auth-service` is responsible for handling user authentication, registration, session management, and user profile retrieval.

---

## Endpoints
**Prefix: /auth**


| Method | Path               | Description                                                            | Authentication Required | Body Required                                  |
| :----: | ------------------ | ---------------------------------------------------------------------- | :----------------------: | :-------------------------------------------: |
| POST   | `/login`           | Log in a user                                                          | No                       | { username/email, password }                  |
| POST   | `/register`        | Register a new user                                                    | No                       | { username, email, password, confirmPassword }|
| GET    | `/google`          | Log in a user using Google sign in                                     | No                       | (none)                                        |
| GET    | `/42`              | Log in a user using 42 sign in                                         | No                       | (none)                                        |
| POST   | `/logout`          | Log out a logged-in user                                               | Yes                      | { token }                              |
| GET    | `/me`              | Get current user profile                                               | Yes                      | (none)                                        |
| POST   | `/refresh`         | Revokes the previous refresh token and returns a new refresh token and a new access token | Yes | { token }                                |
| POST   | `/lost-password`   | Sends a code to the email recieved (email invalid = cant update password) | No | { email }                                |
| POST   | `/verify-code`     | Verifies the code received                                             | Yes                      | { otpCode }                                   |
| POST   | `/update-password` | Updates password                                                       | Yes                      | { password, confirmPassword }                 |

**Prefix: /2fa**

| Method | Path                  | Description                                    | Authentication Required  | Body Required |
| :----: | --------------------- | ---------------------------------------------- | :----------------------: | :------------:| 
| POST   | `/app/setup`          | Set up new 2FA for authenticator app           | Yes                      | (none)        |
| POST   | `/app/verify-setup`   | Verify 2FA TOPT code for app setup             | Yes                      | { otpCode }   |
| POST   | `/app/verify-login`   | Verify TOPT code for login with 2fa using app  | Yes                      | { otpCode }   |
| POST   | `/email/setup`        | Set up new 2FA for email                       | Yes                      | (none)        |
| POST   | `/email/verify-setup` | Verify 2FA TOPT code for email setup           | Yes                      | { otpCode }   |
| POST   | `/email/verify-login` | Verify OPT code for login with 2fa using email | Yes                      | { otpCode }   |

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

- **otpCode Schema**:
  - `otpCode`: string, required

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

**Prefix: /auth**

- `/login`

```yaml

  400: {
    INVALID_CREDENTIALS
    INVALID_PASSWORD
  }
  200: USER_LOGGED_IN
  206: TWOFA_REQUIRED
  500: INTERNAL_SERVER_ERROR

```

- `/register`

```yaml

  400: {
    UNMATCHED_PASSWORDS
    PASSWORD_POLICY
    USER_EXISTS
    PROFILE_CREATION_FAILED
  }
  201: USER_REGISTERED
  500: INTERNAL_SERVER_ERROR

```

- `/google`

```yaml

  400: {
    AUTH_CODE_REQUIRED
    PROFILE_CREATION_FAILED
  }
  206: TWOFA_REQUIRED
  200: USER_LOGGED_IN
  201: USER_REGISTERED
  500: INTERNAL_SERVER_ERROR

```

- `/42`

```yaml

  400: {
    AUTH_CODE_REQUIRED
    PROFILE_CREATION_FAILED
  }
  206: TWOFA_REQUIRED
  200: USER_LOGGED_IN
  201: USER_REGISTERED
  500: INTERNAL_SERVER_ERROR

```

- `/logout`

```yaml

  401: {
    UNAUTHORIZED
    REFRESH_TOKEN_REQUIRED
    REFRESH_TOKEN_INVALID
  }
  200: USER_LOGGED_OUT
  500: INTERNAL_SERVER_ERROR

```

- `/me`

```yaml

  401: UNAUTHORIZED
  200: USER_FETCHED
  500: INTERNAL_SERVER_ERROR

```

- `/refresh`

```yaml

  401: {
    REFRESH_TOKEN_REQUIRED
    REFRESH_TOKEN_INVALID
  }
  200: TOKEN_REFRESHED
  500: INTERNAL_SERVER_ERROR

```

**Prefix: /2fa**

- `/app/setup`
```yaml

  401: UNAUTHORIZED
  400: TWOFA_ALREADY_ENABLED
  200: SCAN_QR
  500: INTERNAL_SERVER_ERROR

```

- `/app/verify-setup`
```yaml

  400: {
    TWOFA_NOT_SET
    TWOFA_ALREADY_ENABLED
  } 
  401: {
    UNAUTHORIZED
    OTP_REQUIRED
    OTP_INVALID
  }
  200: TWOFA_ENABLED
  500: INTERNAL_SERVER_ERROR

```

- `/app/verify-login`
```yaml

  400: {
    TWOFA_NOT_SET
    TWOFA_NOT_ENABLED
  }
  401: {
    UNAUTHORIZED
    OTP_REQUIRED
    OTP_INVALID
  }
  200: USER_LOGGED_IN
  500: INTERNAL_SERVER_ERROR

```

- `/email/setup`
```yaml

  401: UNAUTHORIZED
  400: TWOFA_ALREADY_ENABLED
  200: CODE_SENT
  500: INTERNAL_SERVER_ERROR

```

- `/email/verify-setup`
```yaml

  401: {
    UNAUTHORIZED
    OTP_REQUIRED
    OTP_INVALID
  }
  400: {
    TWOFA_NOT_SET
    TWOFA_ALREADY_ENABLED
  }
  200: TWOFA_ENABLED
  500: INTERNAL_SERVER_ERROR

```

- `/email/verify-login`
```yaml

  400: {
    TWOFA_NOT_SET
    TWOFA_NOT_ENABLED
  } 
  401: {
    UNAUTHORIZED
    OTP_REQUIRED
    OTP_INVALID
  }
  200: USER_LOGGED_IN
  500: INTERNAL_SERVER_ERROR

```

- `/lost-password`
```yaml

  400: {
    INVALID_EMAIL
    USER_LINKED (linked to google or 42 = no password)
  } 
  200: CODE_SENT
  500: INTERNAL_SERVER_ERROR

```

- `/verify-code`
```yaml

  400: CODE_NOT_SET
  401: {
    UNAUTHORIZED
    OTP_REQUIRED
    OTP_INVALID
  }
  200: CODE_VERIFIED
  500: INTERNAL_SERVER_ERROR

```

- `/update-password`
```yaml

  400: {
    USER_LINKED
    UNMATCHED_PASSWORDS
  } 
  401: UNAUTHORIZED
  200: USER_LOGGED_IN
  206: TWOFA_REQUIRED
  500: INTERNAL_SERVER_ERROR

```
---


## Notes
- Successful login returns a token.
- Logout clears the session or token.
- `/me` returns the current user info based on session/token.
- Setting up 2FA for email and app are basically the same, they only differ in how OTP codes are generated.

