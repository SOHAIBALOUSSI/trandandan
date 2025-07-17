export async function createStatsTable(db){
    try {
        await db.exec(
            `CREATE TABLE IF NOT EXISTS stats (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL UNIQUE,
            level REAL NOT NULL DEFAULT 0,
            xp REAL NOT NULL DEFAULT 0,
            solde INTEGER NOT NULL DEFAULT 5,
            matches_played INTEGER NOT NULL DEFAULT 0,
            matches_won INTEGER NOT NULL DEFAULT 0,
            matches_lost INTEGER NOT NULL DEFAULT 0,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )`
        );
        console.log("Stats table created.");
    } catch (error) {
        console.error("Error creating table:", error.message);
    }
}



