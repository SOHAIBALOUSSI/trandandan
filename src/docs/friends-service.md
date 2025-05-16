# Friends Service

## Overview
The friends-service handles all operations related to friend management, including sending, accepting, and rejecting friend requests, listing friends, and removing friends.

---

## Endpoints
### Prefix: /friends

| Method | Path         | Description                                                           | Authentication Required |
| :----: | ------------ | --------------------------------------------------------------------- | :----------------------: |
| POST   | `/request`   | Send a friend request                                                 | Yes                      |
| POST   | `/accept`    | Accept a friend request                                               | Yes                      |
| POST   | `/reject`    | Reject a friend request                                               | Yes                      |
| DELETE | `/:friendId` | Remove a friend by ID                                                 | Yes                      |
| GET    | `/`          | List all accepted friends of user                                     | Yes                      |
| GET    | `/requests`  | List all pending friend requests for user                             | Yes                      |

---

## Schemas

- **Friend Request Schema**:
  - `addresseeId`: string, required

- **Friend Decision Schema**:
  - `requesterId`: string, required

- **Delete Friend Schema**:
  - `friendId`: string, required

---

## Notes
- Only authenticated users can manage friend operations.
- Accepting or rejecting requests updates the friendship status.
- Friends list includes only accepted friends.

## To Add
- Real-time notifications via WebSocket or rabbitMQ
