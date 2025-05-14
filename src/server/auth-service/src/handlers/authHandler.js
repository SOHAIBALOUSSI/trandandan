import bcrypt from 'bcrypt';
import { db } from '../libs/sqlite.js';
import { findUser, addUser, findUserById } from '../models/userDAO.js';
import { findToken, addToken, revokeToken } from '../models/tokenDAO.js'; 
import { verifyRT, signAT, signRT } from '../libs/jwt.js';

const hash = bcrypt.hash;
const compare = bcrypt.compare;

export async function loginHandler(payload) {
    try {
        const { username, email, password } = payload.data;
        const user = await findUser(db, username, email);
        if (!user)
            return ({ code: 404, error: 'User not found.' });
        const matched = await compare(password, user.password);
        if (!matched)
            return ({ code: 400, error: 'Invalid credentials.' });
        
        const accessToken = signAT({ id: user.id });
        const refreshToken = signRT({ id: user.id });
        
        await addToken(db, refreshToken, user.id);

        return ({ code:200, accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
        return ({ code: 500, err: 'Internal server error.', details: error });
    }
}

export async function registerHandler(payload) {
    try {
        const { email, username, password, confirmPassword} = payload.data;
        console.log("Body received from auth:", payload.data);
        if (password !== confirmPassword)
            return ({ code: 400, error: 'Passwords don\'t match.'});
        const userExist = await findUser(db, username, email);
        if (userExist)
            return ({ code: 400, error: 'Username or email already in use.' });
        
        const hashedPassword = await hash(password, 10);
        const userId = await addUser(db, username, email, hashedPassword);
        
        const accessToken = signAT({ id: userId });
        const refreshToken = signRT({ id: userId });
        
        await addToken(db, refreshToken, userId);
        return ({  code: 201, accessToken: accessToken, refreshToken: refreshToken });
        // const response = await fetch('http://profile-service:3001/profile/register', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${accessToken}`
        //     },
        //     body: JSON.stringify({
        //         username: username,
        //         email: email
        //     })

        // });


      
        // if (!response.ok) {
        //     const errorText = await response.text();
        //     await deleteUser(db, userId);
        //     await revokeToken(db, refreshToken);
        //     return ({ code: 400, err: 'Failed to create profile', error: errorText.err });
        // }
    } catch (error) {
        return ({ code: 500, err: 'Internal server error.', details: error });
    }
}

export async function logoutHandler(payload) {
    try {
        const userId = payload.user?.id;
        
        const user = await findUserById(db, userId);
        if (!user)
            return ({ code: 404, error: 'User not found.' });
        
        const { token } = payload.data;
        if (!token)
            return ({ code: 401, error: 'Token required.' });
        
        const tokenExist = await findToken(db, token);
        if (!tokenExist || tokenExist.revoke)
            return ({ code: 401, error: 'Invalid or revoked token.' });
        
        await revokeToken(db, token);
        
        return ({ code: 200, message: `User logged out.` });
    } catch (error) {
        return ({ code: 500, err: 'Internal server error.', details: error });
    }
}

export async function meHandler(payload) {
    try {
        const userId = payload.user?.id;
        
        const user = await findUserById(db, userId);
        if (!user)
            return ({ code: 404, error: 'User not found.' });
        
        return ({ code:200, id: user.id, username: user.username, email: user.email });
    } catch (error) {
        return ({ code: 500, err: 'Internal server error.', details: error });
    }
}

export async function refreshHandler(payload) {
    try {
        const { token } = payload.data;
        if (!token)
            return ({ code: 401, error: 'Refresh token required.' });
        
        const tokenExist = await findToken(db, token);
        if (!tokenExist || tokenExist.revoked)
            return ({ code: 401, error: 'Invalid or revoked token.' });

        const payload = await verifyRT(tokenExist.token);

        await revokeToken(db, token);

        const accessToken = signAT({ id: payload.id });
        const newRefreshToken = signRT({ id: payload.id });

        await addToken(db, newRefreshToken, payload.id);

        return ({ code:200, accessToken: accessToken, refreshToken: newRefreshToken });
    } catch (error) {
        return ({ code: 500, err: 'Internal server error.', details: error });
    }
}