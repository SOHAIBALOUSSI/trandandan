
export async function createOAuthUserTable(db){
    try {
        await db.exec(
            `CREATE TABLE IF NOT EXISTS oauth_user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            provider TEXT NOT NULL CHECK(provider IN ('google', '42')),
            provider_user_id INTEGER NOT NULL,
            email TEXT NOT NULL UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`
        );
        console.log("Tokens table created.");
    } catch (err) {
        console.error("Error creating table:", err.message);
    }
}
