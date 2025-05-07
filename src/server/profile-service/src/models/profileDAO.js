export async function getProfileById(db, id) {
    return await db.get('SELECT * FROM profile WHERE userId = ?',
        [id]
    );
}

export async function searchProfile(db, id, username, email) {
    return await db.get('SELECT * FROM profile WHERE userId = ? OR username = ? OR email = ?',
        [id, username, email]
    );
}



export async function addProfile(db, id, username, email) {
    const result = await db.run('INSERT INTO profile (userId, username, email) VALUES (?, ?, ?)',
        [id, username, email]
    );

    console.log("Proile inserted with ID:", result.lastID);
    return result.lastID;
}