import bcrypt from 'bcrypt';
import {
    findUser, 
    addUser, 
    findUserById, 
    deleteUser
} from '../models/userDAO.js';
import { 
    findToken,
    addToken,
    revokeToken
} from '../models/tokenDAO.js'; 
import { 
    createResponse, 
    validatePassword 
} from '../utils/utils.js'
import { storeTotpCode } from '../models/twoFaDAO.js';

const hash = bcrypt.hash;
const compare = bcrypt.compare;

export async function loginHandler(request, reply) {
    try {
        const { username, email, password } = request.body;
        const user = await findUser(this.db, username, email);
        if (!user)
            return reply.code(400).send(createResponse(400, 'INVALID_CREDENTIALS'));

        const matched = await compare(password, user.password);
        if (!matched)
            return reply.code(400).send(createResponse(400, 'INVALID_PASSWORD'));
        
        if (user.twofa_enabled)
        {
            const tempToken = this.jwt.signTT({ id: user.id });
            const totpCode = `${Math.floor(100000 + Math.random() * 900000) }`
            await storeTotpCode(this.db, totpCode, Date.now() + 60 * 60 * 1000, user.id);
            if (user.twofa_type === 'email')
            {
                const mailOptions = {
                    from: `${process.env.APP_NAME} <${process.env.APP_EMAIL}>`,
                    to: `${user.email}`,
                    subject: "Hello from M3ayz00",
                    text: `OTP CODE : <${totpCode}>`,
                }
                await this.sendMail(mailOptions);
            }
            return reply.code(206).send(createResponse(206, 'TWOFA_REQUIRED', { tempToken: tempToken }));
        }
        const accessToken = this.jwt.signAT({ id: user.id });
        const refreshToken = this.jwt.signRT({ id: user.id });
        
        await addToken(this.db, refreshToken, user.id);

        return reply.code(200).send(createResponse(200, 'USER_LOGGED_IN', { accessToken: accessToken, refreshToken: refreshToken }));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function registerHandler(request, reply) {
    try {
        const { email, username, password, confirmPassword} = request.body;
        if (password !== confirmPassword)
            return reply.code(400).send(createResponse(400, 'UNMATCHED_PASSWORDS'));
        if (!validatePassword(password))
            return reply.code(400).send(createResponse(400, 'PASSWORD_POLICY'));
        const userExist = await findUser(this.db, username, email);
        if (userExist)
            return reply.code(400).send(createResponse(400, 'USER_EXISTS'));
        
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
            body: JSON.stringify({
                username: username,
                email: email
            })
        });
      
        if (!response.ok) {
            await deleteUser(this.db, userId);
            await revokeToken(this.db, refreshToken);
            return reply.code(400).send(createResponse(400, 'PROFILE_CREATION_FAILED'));
        }
        return reply.code(201).send(createResponse(201, 'USER_REGISTERED', { accessToken: accessToken, refreshToken: refreshToken }));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function logoutHandler(request, reply) {
    try {
        const userId = request.user?.id;
        
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.code(400).send(createResponse(401, 'UNAUTHORIZED'));
        
        const { token } = request.body;
        if (!token)
            return reply.code(401).send(createResponse(401, 'REFRESH_TOKEN_REQUIRED'));
        
        const tokenExist = await findToken(this.db, token);
        if (!tokenExist || tokenExist.revoked)
            return reply.code(401).send(createResponse(401, 'REFRESH_TOKEN_INVALID'));
        
        await revokeToken(this.db, token);
        
        return reply.code(200).send(createResponse(200, 'USER_LOGGED_OUT'));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function meHandler(request, reply) {
    try {
        const userId = request.user?.id;
        
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.code(400).send(createResponse(401, 'UNAUTHORIZED'));
        
        return reply.code(200).send(createResponse(200, 'USER_FETCHED', { id: user.id, username: user.username, email: user.email }));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function refreshHandler(request, reply) {
    try {
        const { token } = request.body;
        if (!token)
            return reply.code(401).send(createResponse(401, 'REFRESH_TOKEN_REQUIRED'));
        
        const tokenExist = await findToken(this.db, token);
        if (!tokenExist || tokenExist.revoked)
            return reply.code(401).send(createResponse(401, 'REFRESH_TOKEN_INVALID'));

        const payload = await this.jwt.verifyRT(tokenExist.token);

        await revokeToken(this.db, token);

        const accessToken = this.jwt.signAT({ id: payload.id });
        const newRefreshToken = this.jwt.signRT({ id: payload.id });

        await addToken(this.db, newRefreshToken, payload.id);

        return reply.code(200).send(createResponse(200, 'TOKEN_REFRESHED', { accessToken: accessToken, refreshToken: newRefreshToken }));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

