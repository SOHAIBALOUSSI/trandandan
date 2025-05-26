
export async function findOAuthUser(db, email) {
    return await db.get('SELECT * FROM oauth_user WHERE email = ?',
        [email]
    );
}

export async function findOAuthUserById(db, id) {
    return await db.get('SELECT * FROM oauth_user WHERE id = ?',
        [id]
    );
}

export async function addOAuthUser(db, userInfo) {
    const result = await db.run('INSERT INTO oauth_user (provider, provider_sub, email, access_token, refresh_token) VALUES (?, ?, ?, ?, ?)',
        [
            userInfo.provider,
            userInfo.sub,
            userInfo.email,
            userInfo.accessToken,
            userInfo.refreshToken
        ]
    );
    console.log("OAuth user inserted with ID: ", result.lastID);
    return result.lastID;
}

export async function deleteOAuthUser(db, id) {
    const result = await db.run('DELETE FROM oauth_user WHERE id = ?',
        [id]
    );

    console.log("OAuth user deleted with ID: ", id);
    return result.changes;
}
