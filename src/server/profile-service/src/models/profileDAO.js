export async function getProfileById(db, id) {
    return await db.get('SELECT * FROM profile WHERE userId = ?',
        [id]
    );
}

export async function getProfile(db, id, username) {
    return await db.get('SELECT * FROM profile WHERE userId = ? AND username = ?',
        [id, username]
    );
}



export async function addProfile(db, id, username) {
    const result = await db.run('INSERT INTO profile (userId, username) VALUES (?, ?)',
        [id, username]
    );

    console.log("Proile inserted with ID:", result.lastID);
    return result.lastID;
}