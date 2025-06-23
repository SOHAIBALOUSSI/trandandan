# Profile Service Documentation

## Overview
The `profile-service` is responsible for managing user profile data. It handles creating, retrieving, and updating user profiles.

---

## Endpoints
### Prefix: /profile


| Method | Path          | Description                           | Authentication Required  | Body required                         |
| :----: | ------------  | ------------------------------------- | :----------------------: | :-----------------------------------: |
| POST   | `/register`   | Register a new user profile           | Yes                      | { username, email}                    |
| PATCH  | `/:id`        | Update a user profile                 | Yes                      | { username/avatar_url/solde/level/rank } (one or many)|
| GET    | `/:id`        | Retrieve a user profile by id         | Yes                      | (none)                                |
| POST   | `/upload`     | Updates a user's avatar               | Yes                      | image as formData                     |

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

- `/:id` (GET)
```yaml

  403: UNAUTHORIZED,
  400: PROFILE_NOT_FOUND,
  200: PROFILE_FETCHED,
  500: INTERNAL_SERVER_ERROR

```

- `/:id` (PATCH)
```yaml

  403: UNAUTHORIZED,
  400: {
    PROFILE_NOT_FOUND,
    USERNAME_EXISTS,
    MISSING_FIELDS,
    ZERO_CHANGES
  },
  200: PROFILE_UPDATED,
  500: INTERNAL_SERVER_ERROR

```

- `/upload` 
```yaml
  400: FILE_REQUIRED,
  200: AVATAR_UPLOADED,
  500: INTERNAL_SERVER_ERROR

```
---

## Schemas

- **Profile Schema**:
  - `username`: string, required


