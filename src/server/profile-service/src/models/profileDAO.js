export async function getProfileById(db, id) {
    return await db.get('SELECT * FROM profile WHERE id = ?', [id]);
}

export async function getProfile(db, id, username) {
    return await db.get('SELECT * FROM profile WHERE id = ? AND username = ?', [id, username]);
}



export async function addProfile(db, id, username) {
    const result = await db.run('INSERT INTO profile (id, username) VALUES (?, ?)', [id, username]);

    console.log("User inserted with ID:", result.lastID);
    return result.lastID;
}