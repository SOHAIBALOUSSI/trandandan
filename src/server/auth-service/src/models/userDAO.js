
export async function findUserByName(db, username) {
    return await db.get('SELECT * FROM user WHERE username = ?',
        [username]
    );
}

export async function findUserById(db, id) {
    return await db.get('SELECT * FROM user WHERE id = ?',
        [id]
    );
}


export async function findUser(db, username, email) {
    return await db.get('SELECT * FROM user WHERE username = ? OR email = ?', 
        [username, email]
    );
}

export async function addUser(db, username, email, password) {
    const result = await db.run('INSERT INTO user (username, email, password) VALUES (?, ?, ?)',
        [username, email, password]
    );
    console.log("User inserted with ID: ", result.lastID);
    return result.lastID;
}

export async function deleteUser(db, id) {
    const result = await db.run('DELETE FROM user WHERE id = ?',
        [id]
    );

    console.log("User deleted with ID: ", id);
    return result.changes;
}

export async function findOAuthUser(db, email) {
    const result = await db.get('SELECT * FROM user WHERE email = ?',
        [email]
    );

    console.log('OAuthUser fetched: ', result);
    return result;
}

export async function addOAuthUser(db, userInfo) {
    const result = await db.run('INSERT INTO user (provider, email, access_token, refresh_token) VALUES (?, ?, ?, ?)',
        [
            userInfo.provider,
            userInfo.email,
            userInfo.accessToken,
            userInfo.refreshToken
        ]
    );
    console.log("OAuth user inserted with ID: ", result.lastID);
    return result.lastID;
}