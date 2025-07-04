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
| POST   | `/update-credentials`| Updates either email or password or both OR sends OTP code if 2fa enabled| Yes                      | { email or  (oldPassword, newPassword, confirmPassword) or both }                 |
| POST   | `/verify-update-credentials`| Verifies the OTP code then updates email or password or both if it's valid| Yes                      | { otpCode }                 |
| DELETE | `/delete`          | Deletes all data related to userId permanently across all services     | Yes                      | (none)                 |

**Prefix: /2fa**

| Method | Path                  | Description                                    | Authentication Required  | Body Required |
| :----: | --------------------- | ---------------------------------------------- | :----------------------: | :------------:| 
| POST   | `/app/setup`          | Set up new 2FA for authenticator app           | Yes                      | (none)        |
| POST   | `/app/verify-setup`   | Verify 2FA TOPT code for app setup             | Yes                      | { otpCode }   |
| POST   | `/app/verify-login`   | Verify TOPT code for login with 2fa using app  | Yes                      | { otpCode }   |
| POST   | `/email/setup`        | Set up new 2FA for email                       | Yes                      | (none)        |
| POST   | `/email/verify-setup` | Verify 2FA TOPT code for email setup           | Yes                      | { otpCode }   |
| POST   | `/email/verify-login` | Verify OPT code for login with 2fa using email | Yes                      | { otpCode }   |
| GET    | `/`                   | Get informations about the user's twoFa methods| Yes                      | (none)        |
| POST   | `/enable`             | Enables the 2FA method received in body        | Yes                      | { method }    |
| POST   | `/disable`            | Disables the 2FA method received in body       | Yes                      | { method }    |
| POST   | `/primary`            | Makes the 2FA method received in body primary  | Yes                      | { method }    |

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

- **methodType Schema**
  - `method`: string, required
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

**Token Error Codes**
```yaml
  401: {
    TOKEN_REQUIRED
    TEMP_TOKEN_EXPIRED
    TEMP_TOKEN_INVALID
    ACCESS_TOKEN_EXPIRED
    ACCESS_TOKEN_INVALID
  }
  500: INTERNAL_SERVER_ERROR
```

**Prefix: /auth**

- `/delete`

```yaml

  401: UNAUTHORIZED
  200: USER_DATA_DELETED
  500: INTERNAL_SERVER_ERROR

```

- `/login`

```yaml

  400: {
    INVALID_CREDENTIALS
    USER_ALREADY_LINKED
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
  }
  201: USER_REGISTERED
  500: INTERNAL_SERVER_ERROR

```

- `/google`

```yaml

  400: AUTH_CODE_REQUIRED
  200: USER_LOGGED_IN
  201: USER_REGISTERED
  500: INTERNAL_SERVER_ERROR

```

- `/42`

```yaml

  400: AUTH_CODE_REQUIRED
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
    REFRESH_TOKEN_EXPIRED
  }
  200: TOKEN_REFRESHED
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

- `/update-credentials`
```yaml

  400: {
    PASSWORDS_REQUIRED
    INVALID_PASSWORD
    UNMATCHED_PASSWORDS
    PASSWORD_POLICY
    EMAIL_EXISTS
  } 
  401: UNAUTHORIZED
  200: CREDENTIALS_UPDATED
  206: TWOFA_REQUIRED
  500: INTERNAL_SERVER_ERROR

```

- `/verify-update-credentials`
```yaml

  400: {
    NO PENDING_CREDENTIALS
    TWOFA_NOT_SET
    TWOFA_NOT_ENABLED
    EMAIL_EXISTS
  } 
  401: {
    UNAUTHORIZED
    OTP_REQUIRED
    OTP_INVALID
  }
  200: CREDENTIALS_UPDATED
  500: INTERNAL_SERVER_ERROR

```

**Prefix: /2fa**

- `/app/setup`
```yaml

  401: UNAUTHORIZED
  400: TWOFA_ALREADY_ENABLED
  400: TWOFA_ALREADY_PENDING
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

- `/`
```yaml

  401: UNAUTHORIZED
  404: NO_METHODS_FOUND
  200: METHODS_FETCHED
  500: INTERNAL_SERVER_ERROR

```

- `/disable`
```yaml

  401: UNAUTHORIZED
  400: METHODS_NOT_ENABLED
  200: METHOD_DISABLED
  500: INTERNAL_SERVER_ERROR

```

- `/enable`
```yaml

  401: UNAUTHORIZED
  400: METHODS_NOT_ENABLED
  200: METHOD_DISABLED
  500: INTERNAL_SERVER_ERROR

```

- `/primary`
```yaml

  401: UNAUTHORIZED
  400: METHODS_NOT_ENABLED
  200: PRIMARY_METHOD_UPDATED
  500: INTERNAL_SERVER_ERROR

```
---


## Notes
- Successful login returns a token.
- Logout clears the session or token.
- `/me` returns the current user info based on session/token.
- Setting up 2FA for email and app are basically the same, they only differ in how OTP codes are generated.

