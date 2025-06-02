export async function getProfileById(db, id) {
    console.log('fetching profile by id...');
    return await db.get('SELECT * FROM profile WHERE userId = ?',
        [id]
    );
}

export async function searchProfile(db, id, username, email) {
    console.log('fetching profile...');
    return await db.get('SELECT * FROM profile WHERE userId = ? OR username = ? OR email = ?',
        [id, username, email]
    );
}

export async function addProfile(db, id, username, email, avatar_url, gender) {
    let result;
    if (avatar_url) {
        result = await db.run('INSERT INTO profile (userId, username, email, gender, avatar_url) VALUES (?, ?, ?, ?, ?)',
            [id, username, email, gender, avatar_url]
        );
    }
    else {
        result = await db.run('INSERT INTO profile (userId, username, email, gender) VALUES (?, ?, ?, ?)',
            [id, username, email, gender]
        );
    }

    console.log("Proile inserted with ID:", result.lastID);
    return result.lastID;
}

export async function updateProfileById(db, id, updatedFields) {
    const setStatments = []
    const values = []

    for (const field in updatedFields)
    {
        if (updatedFields.hasOwnProperty(field))
        {
            setStatments.push(`${field} = ?`);
            values.push(updatedFields[field]);
        }
    }

    const sql = `UPDATE profile SET ${setStatments.join(', ')}, updated_at = DATETIME('now') WHERE userId = ?`;
    values.push(id);

    const result = await db.run(sql, values);

    return result.changes;    
}