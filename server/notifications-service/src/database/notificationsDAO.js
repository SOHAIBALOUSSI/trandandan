export async function addNotification(db, notification) {
    const result = await db.run('INSERT INTO notifications (recipient_id, sender_id, type) VALUES (?, ?, ?)',
        [
            notification.recipient_id,
            notification.sender_id,
            notification.type
        ]
    );
    console.log(`Notification inserted with ID: ${result.lastID}`);
    return result.lastID;
}

export async function markAsRead(db, id) {
    const result = await db.run('UPDATE notifications SET read = 1 WHERE id = ?',
        [id]
    )
    if (result.changes === 0)
        return false;
    return true;
}

export async function markAsDelivered(db, id) {
    await db.run('UPDATE notifications SET delivered = 1 WHERE id = ?',
        [id]
    )
}

export async function getAllNotifications(db, recipientId) {
    const result = await db.all(`SELECT id, sender_id, type FROM notifications
        WHERE recipient_id = ? AND (read = 0 OR delivered = 0)
        ORDER BY created_at`,
        [recipientId]
    );
    // console.log('Fetching all notifications: ', result);
    return (result);
}

export async function deleteNotifications(db, id) {
    await db.run('DELETE FROM notifications WHERE recipient_id = ? OR sender_id = ?', [id, id]);
}


export async function findNotification(db, notificationId) {
    return await db.get('SELECT * FROM notifications WHERE id = ?', 
        [notificationId]
    );
}

export async function deleteFriendRequestNotification(db, senderId, recipientId) {
    const notificationId = await db.get(`SELECT id FROM notifications WHERE recipient_id = ? AND sender_id = ? AND type = 'FRIEND_REQUEST_SENT'`, [recipientId, senderId]);
    if (notificationId) 
        await db.run(`DELETE FROM notifications WHERE recipient_id = ? AND sender_id = ? AND type = 'FRIEND_REQUEST_SENT'`, [recipientId, senderId]);
    return notificationId;
}