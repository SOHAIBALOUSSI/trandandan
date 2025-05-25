export async function storeTempSecret(db, secret, id) {
    const result = await db.run('INSERT into twofa (temp_secret, user_id) VALUES (?, ?)',
        [secret, id]
    );

    console.log("TwoFa: inserted tempSecret in row: ", result.lastID);
    return result.lastID;
}

export async function updateTempSecret(db, secret, id) {
    const result = await db.run('UPDATE twofa SET temp_secret = ? WHERE user_id = ?)',
        [secret, id]
    );

    console.log("TwoFa: updated tempSecret in row: ", result.lastID);
    return result.lastID;
}

export async function updateUserSecret(db, id) {
    const result = await db.run(`UPDATE twofa SET
        type = 'app',
        secret = temp_secret,
        temp_secret = NULL,
        enabled = TRUE
        WHERE user_id = ?`,
        [id]
    );   
    console.log("TwoFa(app) updated with ID: ", result.lastID);
    return result.lastID;
}

export async function storeTotpCode(db, totpCode, id) {
    const result = await db.run(`INSERT into twofa (totp, totp_exp, user_id) VALUES (?, ?, ?)`,
        [totpCode, Date.now() + 60 * 60 * 1000, id]
    );
    console.log("TwoFa: inserted TOTP code in row: ", result.lastID);
    return result.lastID;
}

export async function updateTotpCode(db, totpCode, id) {
    const result = await db.run(`UPDATE twofa SET 
        totp = ?, 
        totp_exp = ? 
        WHERE user_id = ?`,
        [totpCode, Date.now() + 60 * 60 * 1000, id]
    );
    console.log("TwoFa: updated TOTP code in row: ", result.lastID);
    return result.lastID;
}

export async function updateUser2FA(db, id) {
    const result = await db.run(`UPDATE twofa SET
        type = 'email',
        enabled = TRUE
        WHERE user_id = ?`,
        [id]
    );
    console.log("TwoFa(email) updated with ID: ", result.lastID);
    return result.lastID;
}

export async function findTwoFaByUID(db, id) {
    return await db.get('SELECT * FROM twofa WHERE user_id = ?',
        [id]
    );
}