# Profile Service Documentation

## Overview
The `profile-service` is responsible for managing user profile data. It handles creating, retrieving, and updating user profiles.

---

## Endpoints

| Method | Path         | Description                           | Authentication Required |
| :----: | ------------ | ------------------------------------- | :----------------------: |
| POST   | `/register`  | Register a new user profile           | Yes                      |
| PUT    | `/:id`       | Update a user profile                 | Yes                      |
| GET    | `/:id`       | Retrieve a user profile by id         | Yes                      |

---

## Schemas

- **Profile Schema**:
  - `username`: string, required


