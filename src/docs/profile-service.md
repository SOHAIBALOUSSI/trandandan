# Profile Service Documentation

## Overview
The `profile-service` is responsible for managing user profile data. It handles creating, retrieving, and updating user profiles.

---

## Endpoints
### Prefix: /profile


| Method | Path         | Description                           | Authentication Required |
| :----: | ------------ | ------------------------------------- | :----------------------: |
| POST   | `/register`  | Register a new user profile           | Yes                      |
| PATCH  | `/:id`       | Update a user profile                 | Yes                      |
| GET    | `/:id`       | Retrieve a user profile by id         | Yes                      |

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
    PROFILE_CREATION_FAILED,
    MISSING_FIELDS,
    PROFILE_EXISTS,
    PROFILE_NOT_FOUND,
    ZERO_CHANGES
  },

  403: UNAUTHORIZED,

  200: {
    PROFILE_FETCHED,
    PROFILE_UPDATED
  },

  201: PROFILE_CREATED

  500: INTERNAL_SERVER_ERROR

```

---

## Schemas

- **Profile Schema**:
  - `username`: string, required


