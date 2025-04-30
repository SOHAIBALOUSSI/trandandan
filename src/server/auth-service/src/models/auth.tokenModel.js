
export async function findTokenById(db, id) {
    return await db.get(
        'SELECT * FROM Token WHERE id = $id', 
        {
            $id: id 
        }
    );
}

export async function findToken(db, token) {
    return await db.get(
        'SELECT * FROM Token WHERE token = $token',
        {
            $token: token
        }
    );
}

export async function addToken(db, token, userId) {
    const result = await db.run(
        'INSERT INTO token (token, expires_at, user_id) VALUES ($token, DATETIME(\'now\', \'+7 days\'), $id)',
        {
            $token: token,
            $id: userId
        }
    );
    console.log("Token inserted with ID:", result.lastID);
    return result.lastID;
}

export async function revokeToken(db, token) {
    const result = await db.run(
        'UPDATE token SET revoked = 1 where token = $token',
        {
            $token: token
        }
    );
    console.log("Token revoked: affected rows =>", result.changes);
    return result.lastID;
}
