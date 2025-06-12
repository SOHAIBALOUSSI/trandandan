export async function storeTempSecret(db, secret, id) {
    const result = await db.run('INSERT into twofa (type, temp_secret, user_id) VALUES (?, ?, ?)',
        ['app', secret, id]
    );

    console.log("TwoFa: inserted tempSecret in row: ", result.lastID);
    return result.lastID;
}

export async function updateTempSecret(db, secret, id) {
    const result = await db.run('UPDATE twofa SET temp_secret = ? WHERE user_id = ? AND type = ?',
        [secret, id, 'app']
    );

    console.log("TwoFa: updated tempSecret in row: ", result.changes);
    return result.changes;
}

export async function updateUserSecret(db, id) {
    const result = await db.run(`UPDATE twofa SET
        secret = temp_secret,
        temp_secret = NULL,
        enabled = TRUE
        WHERE user_id = ? AND type = ?`,
        [id, 'app']
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

export async function updateOtpCode(db, otpCode, id, type) {
    const result = await db.run(`UPDATE twofa SET 
        otp = ?, 
        otp_exp = ? 
        WHERE user_id = ? AND type = ?`,
        [otpCode, Date.now() + 60 * 60 * 1000, id, type]
    );
    console.log("TwoFa: updated TOTP code in row: ", result.changes);
    return result.changes;
}

export async function updateUser2FA(db, id, type) {
    const result = await db.run(`UPDATE twofa SET
        enabled = TRUE
        WHERE user_id = ? AND type = ?`,
        [id, type]
    );
    console.log(`TwoFa(${type}) updated with ID: `, result.changes);
    return result.changes;
}

export async function findTwoFaByUidAndType(db, id, type) {
    console.log('Fetching twoFa by ID and type...');
    return await db.get('SELECT * FROM twofa WHERE user_id = ? AND type = ?',
        [id, type]
    );
}

export async function findTwoFaByUidAndNotType(db, id, type) {
    console.log('Fetching twoFa by ID and other type...');
    return await db.get('SELECT * FROM twofa WHERE user_id = ? AND type != ?',
        [id, type]
    );
}

export async function findTwoFaByUid(db, id) {
    console.log('Fetching twoFa by ID');
    return await db.get('SELECT * FROM twofa WHERE id = ?',
        [id]
    );
}

export async function findPrimaryTwoFaByUid(db, id) {
    console.log('Fetching primary TwoFa by ID');
    return await db.get('SELECT * FROM twofa WHERE user_id = ? AND is_primary = TRUE',
        [id]
    );
}

export async function getAllTwoFaMethodsByUid(db, id) {
    console.log('Fetching all twoFa methods by UID');
    return await db.all('SELECT enabled, is_primary, type FROM twofa WHERE user_id = ?',
        [id]
    );
}

export async function disableTwoFaByUidAndType(db, id, type) {
    console.log('Disabling twoFa by UID and type');
    await db.run('UPDATE twofa SET enabled = FALSE WHERE user_id = ? AND type = ?',
        [id, type]
    );
}

export async function enableTwoFaByUidAndType(db, id, type) {
    console.log('Enabling twoFa by UID and type');
    return await db.run('UPDATE twofa SET enabled = TRUE WHERE user_id = ? AND type = ?',
        [id, type]
    );
}

export async function makeTwoFaPrimaryByUidAndType(db, id, type) {
    console.log('Making twoFa method primary by UID and type');
    await db.run('UPDATE twofa SET is_primary = FALSE WHERE user_id = ?',
        [id]
    );

    await db.run('UPDATE twofa SET is_primary = TRUE WHERE user_id = ? AND type = ?',
        [id, type]
    );
}
