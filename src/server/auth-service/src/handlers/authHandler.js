import bcrypt from 'bcrypt';
import { findUser, addUser, findUserById } from '../models/userDAO.js';
import { findToken, addToken, revokeToken } from '../models/tokenDAO.js'; 
import { verifyRT, signAT, signRT } from '../libs/jwt.js';


const hash = bcrypt.hash;
const compare = bcrypt.compare;

export async function loginHandler(context, payload) {
    try {
        const { username, email, password } = payload.data;
        const user = await findUser(context.db, username, email);
        if (!user)
            return ({ code: 404, error: 'User not found.' });
        const matched = await compare(password, user.password);
        if (!matched)
            return ({ code: 400, error: 'Invalid credentials.' });
        
        const accessToken = signAT({ id: user.id });
        const refreshToken = signRT({ id: user.id });
        
        await addToken(context.db, refreshToken, user.id);

        return ({ code:200, accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
        console.log(error);
        return ({ code: 500, error: 'Internal server error.' });
    }
}

export async function registerHandler(context, payload, authQueue) {
    try {
        const { email, username, password, confirmPassword} = payload.data;
        console.log("Body received from auth:", payload.data);
        if (password !== confirmPassword)
            return ({ code: 400, error: 'Passwords don\'t match.'});
        const userExist = await findUser(context.db, username, email);
        if (userExist)
            return ({ code: 400, error: 'Username or email already in use.' });
        
        const hashedPassword = await hash(password, 10);
        const userId = await addUser(context.db, username, email, hashedPassword);
        
        const accessToken = signAT({ id: userId });
        const refreshToken = signRT({ id: userId });
        
        await addToken(context.db, refreshToken, userId);
        const message = {
            id: userId,
            username: username,
            email: email
        };
        const response = await authQueue.rpcMessage('profile', { type: 'CREATE', data: message });
        if (response.code != 201)
        {
            await deleteUser(context.db, userId);
            await revokeToken(context.db, refreshToken);
            return ({ code: 400, error: 'Failed to create profile', error: errorText.err });
        }
        return ({  code: 201, accessToken: accessToken, refreshToken: refreshToken }); 
    } catch (error) {
        console.log(error);
        return ({ code: 500, error: 'Internal server error.' });
    }
}

export async function logoutHandler(context, payload) {
    try {
        const userId = payload.user?.id;
        
        const user = await findUserById(context.db, userId);
        if (!user)
            return ({ code: 404, error: 'User not found.' });
        
        const { token } = payload.data;
        if (!token)
            return ({ code: 401, error: 'Token required.' });
        
        const tokenExist = await findToken(context.db, token);
        if (!tokenExist || tokenExist.revoked)
            return ({ code: 401, error: 'Invalid or revoked token.' });
        
        await revokeToken(context.db, token);
        
        return ({ code: 200, message: `User logged out.` });
    } catch (error) {
        console.log(error);
        return ({ code: 500, error: 'Internal server error.' });
    }
}

export async function meHandler(context, payload) {
    try {
        const userId = payload.user?.id;
        
        const user = await findUserById(context.db, userId);
        if (!user)
            return ({ code: 404, error: 'User not found.' });
        
        return ({ code:200, id: user.id, username: user.username, email: user.email });
    } catch (error) {
        console.log(error);
        return ({ code: 500, error: 'Internal server error.' });
    }
}

export async function refreshHandler(context, payload) {
    try {
        const { token } = payload.data;
        if (!token)
            return ({ code: 401, error: 'Refresh token required.' });

        const tokenExist = await findToken(context.db, token);
        if (!tokenExist || tokenExist.revoked)
            return ({ code: 401, error: 'Invalid or revoked token.' });

        const userPayload = verifyRT(tokenExist.token);

        await revokeToken(context.db, token);

        const accessToken = signAT({ id: userPayload.id });
        const newRefreshToken = signRT({ id: userPayload.id });

        await addToken(context.db, newRefreshToken, userPayload.id);

        return ({ code:200, accessToken: accessToken, refreshToken: newRefreshToken });
    } catch (error) {
        console.log(error);
        return ({ code: 500, error: 'Internal server error.' });
    }
}