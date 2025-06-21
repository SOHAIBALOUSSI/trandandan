export async function addNotification(db, notification) {
    const result = await db.run('INSERT INTO notifications (recipient_id, sender_id, type) VALUES (?, ?, ?)',
        [
            notification.to,
            notification.from,
            notification.type
        ]
    );
    console.log(`Notification inserted with ID: ${result.lastID}`);
    return result.lastID;
}

export async function markAsRead(db, id) {
    await db.run('UPDATE notifications SET read = 1 WHERE id = ?',
        [id]
    )
}

export async function markAsDelivered(db, id) {
    await db.run('UPDATE notifications SET delivered = 1 WHERE id = ?',
        [id]
    )
}

export async function getAllNotifications(db, recipientId) {
    const result = await db.all('SELECT recipient_id, sender_id, type FROM notifications WHERE recipient_id = ? AND (read = 0 OR delivered = 0) ORDER BY created_at',
        [recipientId]
    );
    console.log('Fetching all notifications: ', result);
    return (result);
}