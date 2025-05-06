
export async function createProfileTable(db){
    try {
        await db.exec(
            `CREATE TABLE IF NOT EXISTS profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL UNIQUE,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            avatar_url TEXT DEFAULT '',
            status TEXT DEFAULT 'offline',
            solde INTEGER DEFAULT 5,
            gender TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`
        );
        console.log("Profile table created.");
    } catch (err) {
        console.error("Error creating table:", err.message);
    }
}
