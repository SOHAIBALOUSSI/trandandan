
export async function createOAuthUserTable(db){
    try {
        await db.exec(
            `CREATE TABLE IF NOT EXISTS oauth_user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            provider TEXT NOT NULL CHECK(provider IN ('google', '42')),
            provider_sub INTEGER NOT NULL,
            email TEXT NOT NULL UNIQUE,
            access_token TEXT NOT NULL UNIQUE,
            refresh_token TEXT NOT NULL UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`
        );
        console.log("OAuthUser table created.");
    } catch (err) {
        console.error("Error creating table:", err.message);
    }
}
