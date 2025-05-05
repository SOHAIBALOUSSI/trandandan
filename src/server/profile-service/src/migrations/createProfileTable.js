
export async function createTokenTable(db){
    try {
        await db.exec(
            `CREATE TABLE IF NOT EXISTS profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            bio TEXT,
            avatar_url TEXT NOT NULL`);
        console.log("Tokens table created.");
    } catch (err) {
        console.error("Error creating table:", err.message);
    }
}
