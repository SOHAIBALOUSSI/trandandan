
export async function findUserByName(db, username) {
    return await db.get(
        'SELECT * FROM user WHERE username = $username', 
        {
            $username: username 
        }
    );
}

export async function findUserById(db, id) {
    return await db.get(
        'SELECT * FROM user WHERE id = $id', 
        {
            $id: id 
        }
    );
}

export async function findUser(db, username, email) {
    return await db.get(
        'SELECT * FROM user WHERE username = $username OR email = $email',
        {
            $username: username,
            $email: email
        }
    );
}

export async function addUser(db, username, email, password) {
    const result = await db.run(
        'INSERT INTO user (username, email, password) VALUES ($username, $email, $password)',
        {
            $username: username,
            $email: email,
            $password: password
        }
    );
    console.log("User inserted with ID:", result.lastID);
    return result.lastID;
}