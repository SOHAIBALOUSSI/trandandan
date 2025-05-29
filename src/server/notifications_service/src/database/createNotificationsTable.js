
export async function createNotificationsTable(db){
    try {
        await db.exec(
            `CREATE TABLE IF NOT EXISTS notifications (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            message TEXT NOT NULL,
            read INTEGER DEFAULT FALSE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            )`
        );
        console.log("Users table created.");
    } catch (err) {
        console.error("Error creating table:", err.message);
    }
}



