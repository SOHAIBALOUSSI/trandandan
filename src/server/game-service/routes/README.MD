# Game Service Routes Documentation

## `/invite`

### Description
This route is used to send an invitation to another player to join a game room.

### Request
- **Method:** POST
- **URL:** `/invite`
- **Body:**
  ```json
  {
    "senderId": "<string>",
    "receiverId": "<string>"
  }
  ```

### Response
- **Success:**
  ```json
  {
    "message": "Invite notification queued"
  }
  ```
- **Error:**
  - `500`: Redis client is not available
  - `400`: Missing fields
  - `500`: Failed to queue notification

### Notes
- The `roomId` is generated automatically and stored in Redis for 5 minutes.
- RabbitMQ is used to queue the invite notification.

---

## `/accept`

### Description
This route is used to accept an invitation and confirm the game room.

### Request
- **Method:** POST
- **URL:** `/accept`
- **Body:**
  ```json
  {
    "roomId": "<string>",
    "senderId": "<string>",
    "receiverId": "<string>"
  }
  ```

### Response
- **Success:**
  ```json
  {
    "message": "Invite accepted",
    "roomId": "<string>",
    "receiverId": "<string>"
  }
  ```
- **Error:**
  - `500`: Redis client is not available
  - `400`: Missing fields
  - `500`: Internal server error

### Notes
- The `roomId` is stored in Redis for 5 minutes.
- Ensure all required fields are provided in the request body.