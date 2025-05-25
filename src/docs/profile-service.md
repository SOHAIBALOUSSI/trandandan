# Profile Service Documentation

## Overview
The `profile-service` is responsible for managing user profile data. It handles creating, retrieving, and updating user profiles.

---

## Endpoints
### Prefix: /profile

| Method | Path          | Description                           | Authentication Required  | Body required                         |
| :----: | ------------  | ------------------------------------- | :----------------------: | :-----------------------------------: |
| POST   | `/register`   | Register a new user profile           | Yes                      | { username, email}                    |
| PATCH  | `/:id`        | Update a user profile                 | Yes                      | { username/email/avatar_url/solde } (one or many)|
| GET    | `/:id`        | Retrieve a user profile by id         | Yes                      | (none)                                |

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

- `/register` (called from auth service)

```yaml

  400: {
    MISSING_FIELDS,
    PROFILE_EXISTS
  },
  201: PROFILE_CREATED
  500: INTERNAL_SERVER_ERROR

```

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
    MISSING_FIELDS,
    ZERO_CHANGES
  },
  200: PROFILE_UPDATED,
  500: INTERNAL_SERVER_ERROR

```
---

## Schemas

- **Profile Schema**:
  - `username`: string, required


