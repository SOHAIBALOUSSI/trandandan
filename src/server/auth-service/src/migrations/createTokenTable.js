
export async function createTokenTable(db){
    try {
        await db.exec(
            `CREATE TABLE IF NOT EXISTS token (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            token TEXT NOT NULL UNIQUE,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            expires_at DATETIME NOT NULL,
            revoked INTEGER DEFAULT 0,
            user_id INTEGER NOT NULL,
            FOREIGN KEY (user_id) REFERENCES user(id))`);
        console.log("Tokens table created.");
    } catch (err) {
        console.error("Error creating table:", err.message);
    }
}

/*
{
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ2MDM0ODkwLCJleHAiOjE3NDYwMzU3OTB9.AxxMApuQar-bWhsMl3cdSX_U8GAIgdJb-IjHL2dQR2E",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ2MDM0ODkwLCJleHAiOjE3NDY2Mzk2OTB9.tpn_XogiruBtNY92XCVQPI0xMrfG-cDmB8FsbBvyQag"
}
*/