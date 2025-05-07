import bcrypt from 'bcrypt';
import { findUser, addUser, findUserById } from '../models/userDAO.js';
import { findToken, addToken, revokeToken } from '../models/tokenDAO.js'; 

const hash = bcrypt.hash;
const compare = bcrypt.compare;

export async function loginHandler(request, reply) {
    try {
        const { username, email, password } = request.body;
        const user = await findUser(this.db, username, email);
        if (!user)
            return reply.code(404).send({ error: 'User not found.' });
        const matched = await compare(password, user.password);
        if (!matched)
            return reply.code(400).send({ error: 'Invalid credentials.' });
        
        const accessToken = this.jwt.signAT({ id: user.id });
        const refreshToken = this.jwt.signRT({ id: user.id });
        
        await addToken(this.db, refreshToken, user.id);

        return reply.code(200).send({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
        return reply.code(500).send({ err: 'Internal server error.', details: error });
    }
}

export async function registerHandler(request, reply) {
    try {
        const { email, username, password, confirmPassword} = request.body;
        if (password !== confirmPassword)
            return reply.code(400).send({ error: 'Passwords don\'t match.'});
        const userExist = await findUser(this.db, username, email);
        if (userExist)
            return reply.code(400).send({ error: 'Username or email already in use.' });
        
        const hashedPassword = await hash(password, 10);
        const userId = await addUser(this.db, username, email, hashedPassword);
        
        const accessToken = this.jwt.signAT({ id: userId });
        const refreshToken = this.jwt.signRT({ id: userId });
        
        await addToken(this.db, refreshToken, userId);
        const response = await fetch('http://profile-service:3001/profile/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify( { username, email })
        });
      
        if (!response.ok) {
        const errorText = await response.text()
        console.error('Failed to create profile:', errorText);
        }
        return reply.code(201).send({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
        return reply.code(500).send({ err: 'Internal server error.', details: error });
    }
}

export async function logoutHandler(request, reply) {
    try {
        const userId = request.user?.id;
        
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.code(404).send({ error: 'User not found.' });
        
        const { token } = request.body;
        if (!token)
            return reply.code(401).send({ error: 'Token required.' });
        
        const tokenExist = await findToken(this.db, token);
        if (!tokenExist || tokenExist.revoke)
            return reply.code(401).send({ error: 'Invalid or revoked token.' });
        
        await revokeToken(this.db, token);
        
        return reply.code(200).send({ message: `User logged out.` });
    } catch (error) {
        return reply.code(500).send({ err: 'Internal server error.', details: error });
    }
}

export async function meHandler(request, reply) {
    try {
        const userId = request.user?.id;
        
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.code(404).send({ error: 'User not found.' });
        
        return reply.code(200).send({ id: user.id, username: user.username, email: user.email });
    } catch (error) {
        return reply.code(500).send({ err: 'Internal server error.', details: error });
    }
}

export async function refreshHandler(request, reply) {
    try {
        const { token } = request.body;
        if (!token)
            return reply.code(401).send({ error: 'Refresh token required.' });
        
        const tokenExist = await findToken(this.db, token);
        if (!tokenExist || tokenExist.revoked)
            return reply.code(401).send({ error: 'Invalid or revoked token.' });

        const payload = await this.jwt.verifyRT(tokenExist.token);

        await revokeToken(this.db, token);

        const accessToken = this.jwt.signAT({ id: payload.id });
        const newRefreshToken = this.jwt.signRT({ id: payload.id });

        await addToken(this.db, newRefreshToken, payload.id);

        return reply.code(200).send({ accessToken: accessToken, refreshToken: newRefreshToken });
    } catch (error) {
        return reply.code(500).send({ err: 'Internal server error.', details: error });
    }
}