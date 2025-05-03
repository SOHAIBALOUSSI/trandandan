import bcrypt from 'bcrypt';
import { findUser, addUser, findUserById } from '../models/auth.userModel.js';
import { findToken, findTokenById, addToken, revokeToken, findTokenByUid } from '../models/auth.tokenModel.js'; 

const hash = bcrypt.hash;
const compare = bcrypt.compare;

export async function loginHandler(request, reply) {
    try {
        const { username, email, password } = request.body;
        const user = await findUser(this.db, username, email);
        if (!user)
            return reply.status(404).send({ error: 'User not found.' });
        const matched = await compare(password, user.password);
        if (!matched)
            return reply.status(400).send({ error: 'Invalid credentials.' });
        
        const accessToken = this.jwt.signAT({ id: user.id });
        const refreshToken = this.jwt.signRT({ id: user.id });
        await addToken(this.db, refreshToken, user.id);

        return reply.status(200).send({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
        return reply.status(500).send({ error: 'Internal server error.' });
    }
}

export async function registerHandler(request, reply) {
    try {
        const { email, username, password, confirmPassword } = request.body;
        if (password !== confirmPassword)
            return reply.status(400).send({ error: 'Passwords don\'t match.'});
        const userExist = await findUser(this.db, username, email);
        if (userExist)
            return reply.status(400).send({ error: 'Username or email already in use.' });
        
        const hashedPassword = await hash(password, 10);
        const userId = await addUser(this.db, username, email, hashedPassword);
        
        const payload = { id: userId }
        const accessToken = this.jwt.signAT(payload);
        const refreshToken = this.jwt.signRT(payload);
        
        await addToken(this.db, refreshToken, userId);
        
        return reply.status(200).send({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
        return reply.status(500).send({ error: 'Internal server error.' });
    }
}

export async function logoutHandler(request, reply) {
    try {
        const userId = request.user?.id;
        
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.status(404).send({ error: 'User not found.' });
        
        const { token } = request.body;
        if (!token)
            return reply.status(401).send({ error: 'Token required.' });
        
        const tokenExist = await findToken(this.db, token);
        if (!tokenExist)
            return reply.status(401).send({ error: 'Invalid token.' });

        if (tokenExist.revoked)
            return reply.status(403).send({ error: 'Token revoked.' });
        
        await revokeToken(this.db, token);
        
        return reply.status(200).send({ message: `User logged out.` });
    } catch (error) {
        return reply.status(500).send({ error: 'Internal server error.' });
    }
}

export async function meHandler(request, reply) {
    try {
        const userId = request.user;
        
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.status(404).send({ error: 'User not found.' });
        
        return reply.status(200).send({ id: user.id, username: user.username, email: user.email });
    } catch (error) {
        return reply.status(500).send({ error: 'Internal server error.' });
    }
}

export async function refreshHandler(request, reply) {
    try {
        const { refreshToken } = request.body;
        if (!refreshToken)
            return reply.status(401).send({ error: 'Refresh token required.' });
        
        const tokenExist = await findToken(this.db, refreshToken);
        if (!tokenExist)
            return reply.status(401).send({ error: 'Invalid token.' });
        
        if (tokenExist.revoked)
            return reply.status(403).send({ error: 'Token revoked.' });

        const payload = await this.jwt.verifyRT(tokenExist.token);

        await revokeToken(this.db, refreshToken);
        
        const accessToken = this.jwt.signAT({ id: payload.id });
        const newRefreshToken = this.jwt.signRT({ id: payload.id });
        
        await addToken(this.db, newRefreshToken, payload.id);

        return reply.status(200).send({ accessToken: accessToken, refreshToken: newRefreshToken });
    } catch (error) {
        return reply.status(500).send({ error: 'Internal server error.' });
    }
}