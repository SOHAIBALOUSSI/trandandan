
export async function findOAuthUserByName(db, username) {
    return await db.get('SELECT * FROM oauth_user WHERE username = ?',
        [username]
    );
}

export async function findOAuthUserById(db, id) {
    return await db.get('SELECT * FROM oauth_user WHERE id = ?',
        [id]
    );
}

export async function findOAuthUser(db, username, email) {
    return await db.get('SELECT * FROM oauth_user WHERE username = ? OR email = ?', 
        [username, email]
    );
}

export async function addOAuthUser(db, username, email, password) {
    const result = await db.run('INSERT INTO oauth_user (username, email, password) VALUES (?, ?, ?)',
        [username, email, password]
    );
    console.log("User inserted with ID: ", result.lastID);
    return result.lastID;
}

export async function deleteOAuthUser(db, id) {
    const result = await db.run('DELETE FROM oauth_user WHERE id = ?',
        [id]
    );

    console.log("User deleted with ID: ", id);
    return result.changes;
}
