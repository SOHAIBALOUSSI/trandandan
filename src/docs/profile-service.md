# Profile Service Documentation

## Overview
The `profile-service` is responsible for managing user profile data. It handles creating, retrieving, and updating user profiles.

---

## Endpoints
### Prefix: /profile


| Method | Path          | Description                           | Authentication Required  | Body required                         |
| :----: | ------------  | ------------------------------------- | :----------------------: | :-----------------------------------: |
| POST   | `/register`   | Register a new user profile           | Yes                      | { username, email}                    |
| PATCH  | `/user/:id`   | Update a user profile                 | Yes                      | { username/avatar_url/solde/level/rank } (one or many)|
| GET    | `/user/:id`   | Retrieve a user profile by id         | Yes                      | (none)                                |
| POST   | `/upload`     | Updates a user's avatar               | Yes                      | image as formData                     |
| GET   | `/avatar/:fileName`| Fetches a user's avatar           | Yes                      | (none)                     |
| GET   | `/all`         | Fetches all users                     | Yes                      | (none)                     |

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

- `/user/:id` (GET)
```yaml

  403: UNAUTHORIZED,
  400: PROFILE_NOT_FOUND,
  200: PROFILE_FETCHED,
  500: INTERNAL_SERVER_ERROR

```

- `/user/:id` (PATCH)
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
  401: UNAUTHORIZED,
  400: FILE_REQUIRED,
  200: AVATAR_UPLOADED,
  500: INTERNAL_SERVER_ERROR

```

- `/avatar/:fileName` 
```yaml
  401: UNAUTHORIZED,
  400: FILE_NAME_REQUIRED
  404: FILE_NOT_FOUND
  200: AVATAR_UPLOADED,
  500: INTERNAL_SERVER_ERROR

```

---

## Schemas

- **Profile Schema**:
  - `username`: string, required


