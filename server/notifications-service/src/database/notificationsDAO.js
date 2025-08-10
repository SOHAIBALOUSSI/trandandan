export async function addNotification(db, notification) {
  const result = await db.run(
    "INSERT INTO notifications (recipient_id, sender_id, type) VALUES (?, ?, ?)",
    [notification.recipient_id, notification.sender_id, notification.type]
  );
  console.log(`Notification inserted with ID: ${result.lastID}`);
  return result.lastID;
}

export async function markAsRead(db, id) {
  const result = await db.run(
    "UPDATE notifications SET read = 1 WHERE id = ?",
    [id]
  );
  if (result.changes === 0) return false;
  return true;
}

export async function markAsDelivered(db, id) {
  await db.run("UPDATE notifications SET delivered = 1 WHERE id = ?", [id]);
}

// Get all unread notifications grouped by sender and type
export async function getAllNotifications(db, recipientId) {
  const result = await db.all(
    `
        SELECT 
            id, 
            sender_id, 
            type, 
            created_at,
            read,
            delivered
        FROM notifications
        WHERE recipient_id = ? AND read = 0
        ORDER BY created_at DESC`,
    [recipientId]
  );

  // Group notifications by sender_id and type
  const grouped = {};
  const individual = [];

  result.forEach((notif) => {
    const key = `${notif.sender_id}_${notif.type}`;
    if (notif.type === "MESSAGE_RECEIVED") {
      if (!grouped[key]) {
        grouped[key] = {
          type: notif.type,
          sender_id: notif.sender_id,
          recipient_id: recipientId,
          notifications_count: 0,
          notification_ids: [],
          last_notification_at: notif.created_at,
        };
      }
      grouped[key].notifications_count++;
      grouped[key].notification_ids.push(notif.id);
      if (notif.created_at > grouped[key].last_notification_at) {
        grouped[key].last_notification_at = notif.created_at;
      }
    } else {
      // Individual notifications for non-message types
      individual.push({
        notification_id: notif.id,
        sender_id: notif.sender_id,
        recipient_id: recipientId,
        type: notif.type,
        created_at: notif.created_at,
      });
    }
  });

  return [...Object.values(grouped), ...individual];
}

export async function deleteNotifications(db, id) {
  await db.run(
    "DELETE FROM notifications WHERE recipient_id = ? OR sender_id = ?",
    [id, id]
  );
}

export async function findNotification(db, notificationId) {
  return await db.get("SELECT * FROM notifications WHERE id = ?", [
    notificationId,
  ]);
}

export async function deleteFriendRequestNotification(
  db,
  senderId,
  recipientId
) {
  const notificationId = await db.get(
    `SELECT id FROM notifications WHERE recipient_id = ? AND sender_id = ? AND type = 'FRIEND_REQUEST_SENT'`,
    [recipientId, senderId]
  );
  if (notificationId)
    await db.run(
      `DELETE FROM notifications WHERE recipient_id = ? AND sender_id = ? AND type = 'FRIEND_REQUEST_SENT'`,
      [recipientId, senderId]
    );
  return notificationId;
}

// Get count of unread notifications
export async function getUnreadCount(db, recipientId) {
  const result = await db.all(
    `
        SELECT id 
        FROM notifications 
        WHERE recipient_id = ? AND read = 0`,
    [recipientId]
  );

  const count = result.length;
  const ids = result.map((notif) => notif.id);

  return { count, ids }; // Return both count and IDs
}
