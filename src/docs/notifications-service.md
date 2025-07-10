# Notifications Service

## Overview
The `notifications-service` is responsible for sending notifications to authenticated users via websocket.

## How does it work
- This service is utilizing `RabbitMQ` to create a single queue with a purpose of receiving messages from other services.
- a `RabbitMQClient` class is used across all notification-sending services and placed under the libs folder.
- A message received from a service is a notification following the schema down below :

```yaml
{
    type: TYPE_OF_NOTIFICATION,
    sender_id: senderId, 
    recipient_id: recipientId,
    data: {
        ... 
    }
}
```

- The `data` property is used for special cases (might discard it later).
- A user is verified and authenticated after connecting, if not valid the connection is closed immediately.
- To Authenticate a user the first message from the client should follow the schema down below : (for development only, will use cookies in production)

```yaml
{
    type: AUTHENTICATION,
    token: ACCESS_TOKEN
}
```

- After authentication a user is mapped to all his current connections `Map(id, Set())`.
- If there are some stored unread/undelivered notifications for the current connect user, they're all sent right after authentication.
- Whenever a message(notification) is consumed by my rabbitMQClient these steps follow:
    - Extract recipient ID from message.
    - Insert notification in database.
    - If recipient is connected, send notification to all the recipient's connections and mark it as delivered.


## Friends notifications

There are 4 types of friends notifications, 3 of them have the same message schema that consist of `type`, `sender_id` and `recipient_id` :
- `FRIEND_REQUEST_SENT` 
- `FRIEND_REQUEST_ACCEPTED`
- `FRIEND_REQUEST_REJECTED` 

except for `FRIEND_REMOVED` :

```yaml
{
    type: FRIEND_REMOVED,
    recipient_id: recipientId,
    data: {
        exFriendId: exfriendId
    }
}
```


