export async function storeTempSecret(db, secret, id) {
    const result = await db.run('INSERT into twofa (type, temp_secret, user_id) VALUES (?, ?, ?)',
        ['app', secret, id]
    );

    console.log("TwoFa: inserted tempSecret in row: ", result.lastID);
    return result.lastID;
}

export async function updateTempSecret(db, secret, id) {
    const result = await db.run('UPDATE twofa SET temp_secret = ? WHERE user_id = ?)',
        [secret, id]
    );

    console.log("TwoFa: updated tempSecret in row: ", result.changes);
    return result.changes;
}

export async function updateUserSecret(db, id) {
    const result = await db.run(`UPDATE twofa SET
        secret = temp_secret,
        temp_secret = NULL,
        enabled = TRUE
        WHERE user_id = ?`,
        [id]
    );   
    console.log("TwoFa(app) updated with ID: ", result.changes);
    return result.changes;
}

export async function storeOtpCode(db, otpCode, id) {
    const result = await db.run(`INSERT into twofa (type, otp, otp_exp, user_id) VALUES (?, ?, ?, ?)`,
        ['email', otpCode, Date.now() + 60 * 60 * 1000, id]
    );
    console.log("TwoFa: inserted TOTP code in row: ", result.lastID);
    return result.lastID;
}

export async function updateOtpCode(db, otpCode, id) {
    const result = await db.run(`UPDATE twofa SET 
        otp = ?, 
        otp_exp = ? 
        WHERE user_id = ?`,
        [otpCode, Date.now() + 60 * 60 * 1000, id]
    );
    console.log("TwoFa: updated TOTP code in row: ", result.changes);
    return result.changes;
}

export async function updateUser2FA(db, id) {
    const result = await db.run(`UPDATE twofa SET
        enabled = TRUE
        WHERE user_id = ?`,
        [id]
    );
    console.log("TwoFa(email) updated with ID: ", result.changes);
    return result.changes;
}

export async function findTwoFaByUidAndType(db, id, type) {
    return await db.get('SELECT * FROM twofa WHERE user_id = ? AND type = ?',
        [id, type]
    );
}

export async function findTwoFaByUid(db, id) {
    return await db.get('SELECT * FROM twofa WHERE user_id = ?',
        [id]
    );
}