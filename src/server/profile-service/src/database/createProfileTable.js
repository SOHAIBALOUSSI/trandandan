
export async function createProfileTable(db){
    try {
        await db.exec(
            `CREATE TABLE IF NOT EXISTS profile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            userId INTEGER NOT NULL UNIQUE,
            username TEXT NOT NULL UNIQUE,
            email TEXT NOT NULL UNIQUE,
            gender TEXT CHECK(gender IN ('F', 'M')),
            avatar_url TEXT DEFAULT '',
            status TEXT DEFAULT 'offline',
            solde INTEGER DEFAULT 5,
            level INTEGER DEFAULT 0,
            rank INTEGER DEFAULT 0,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`
        );
        console.log("Profiles table created.");
    } catch (err) {
        console.error("Error creating table:", err.message);
    }
}
