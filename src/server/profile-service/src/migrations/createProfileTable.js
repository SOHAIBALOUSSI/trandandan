
export async function createProfileTable(db){
    try {
        await db.exec(
            `CREATE TABLE IF NOT EXISTS profile (
            id INTEGER PRIMARY KEY,
            username TEXT NOT NULL UNIQUE,
            display_name TEXT DEFAULT '',
            avatar_url TEXT DEFAULT '',
            bio TEXT DEFAULT '',
            status TEXT DEFAULT 'offline',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`
        );
        console.log("Profile table created.");
    } catch (err) {
        console.error("Error creating table:", err.message);
    }
}
