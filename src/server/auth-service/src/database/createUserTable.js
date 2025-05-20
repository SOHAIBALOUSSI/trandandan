
export async function createUserTable(db){
    try {
        await db.exec(
            `CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            twofa_enabled INTEGER DEFAULT FALSE,
            twofa_secret TEXT DEFAULT NULL,
            twofa_temp_secret TEXT DEFAULT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`
        );
        console.log("Users table created.");
    } catch (err) {
        console.error("Error creating table:", err.message);
    }
}