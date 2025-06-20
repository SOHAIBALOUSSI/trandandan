# Relationships Service

## Overview
The relationships-service handles all operations related to friend management, including sending, accepting, and rejecting friend requests, listing friends, and removing friends.

---

## Endpoints
### Prefix: /friends

| Method | Path         | Description                                                           | Authentication Required  | Body Required    |  
| :----: | ------------ | --------------------------------------------------------------------- | :----------------------: | :--------------: |
| POST   | `/request`   | Send a friend request                                                 | Yes                      | { addresseeId }  |
| POST   | `/accept`    | Accept a friend request                                               | Yes                      | { requesterId }  |
| POST   | `/reject`    | Reject a friend request                                               | Yes                      | { requesterId }  |
| DELETE | `/:friendId` | Remove a friend by ID                                                 | Yes                      | (none)           |
| GET    | `/`          | List all accepted friends of user                                     | Yes                      | (none)           |
| GET    | `/requests`  | List all pending friend requests for user                             | Yes                      | (none)           |

---

### Prefix: /block

| Method | Path         | Description                                                           | Authentication Required  | Body Required    |  
| :----: | ------------ | --------------------------------------------------------------------- | :----------------------: | :--------------: |
| POST   | `/:blockedId`| Blockes a user                                                        | Yes                      | { blockedId }    |
| DELETE | `/:blockedId`| Unblock a user                                                        | Yes                      | { blockedId }    |

---

## Schemas

- **Friend Request Schema**:
  - `addresseeId`: string, required

- **Friend Decision Schema**:
  - `requesterId`: string, required

- **Delete Friend Schema**:
  - `friendId`: string, required

- **Block/Unblock Schema**:
  - `blockedId`: string, required
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

**Prefix: /friends**
- `/request`
```yaml

  400: {
    ADDRESSEE_REQUIRED,
    ADDRESSEE_INVALID
  },
  200: FRIEND_REQUEST_SENT,
  500: INTERNAL_SERVER_ERROR

```

- `/accept`
```yaml

  400: REQUESTER_REQUIRED,
  200: FRIEND_REQUEST_ACCEPTED,
  500: INTERNAL_SERVER_ERROR

```

- `/reject`
```yaml

  400: REQUESTER_REQUIRED,
  200: FRIEND_REQUEST_REJECTED,
  500: INTERNAL_SERVER_ERROR

```

- `/:friendId` (DELETE)
```yaml

  400: FRIEND_REQUIRED,
  200: FRIEND_REMOVED,
  500: INTERNAL_SERVER_ERROR

```

- `/` (GET)
```yaml

  200: FRIENDS_LISTED,
  500: INTERNAL_SERVER_ERROR

```

- `/requests`
```yaml

  200: REQUESTS_LISTED,
  500: INTERNAL_SERVER_ERROR

```

**Prefix: /block**

- `/:blockedId` (POST)
```yaml
  400: BLOCKED_REQUIRED
  400: BLOCKED_INVALID
  400: BLOCKED_EXISTS
  200: BLOCK_SUCCESS
  500: INTERNAL_SERVER_ERROR
```

- `/:blockedId` (DELETE)
```yaml
  400: BLOCKED_REQUIRED
  400: BLOCKED_INVALID
  400: BLOCKED_NOT_FOUND
  200: UNBLOCK_SUCCESS
  500: INTERNAL_SERVER_ERROR
```

---

## Notes
- Only authenticated users can manage friend operations.
- Accepting or rejecting requests updates the friendship status.
- Friends list includes only accepted friends.