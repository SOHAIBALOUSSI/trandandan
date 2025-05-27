
export async function createUserTable(db){
    try {
        await db.exec(
            `CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            provider TEXT NOT NULL CHECK(provider IN ('google', '42', 'local')),
            email TEXT NOT NULL UNIQUE,
            password TEXT,
            access_token TEXT UNIQUE DEFAULT NULL,
            refresh_token TEXT UNIQUE DEFAULT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`
        );
        console.log("Users table created.");
    } catch (err) {
        console.error("Error creating table:", err.message);
    }
}