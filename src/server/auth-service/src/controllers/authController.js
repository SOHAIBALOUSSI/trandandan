import bcrypt from 'bcrypt';
import {
    findUser, 
    addUser, 
    findUserById, 
    findUserByEmail,
    updateUser
} from '../models/userDAO.js';
import { 
    findToken,
    addToken,
    revokeToken,
    findValidTokenByUid
} from '../models/tokenDAO.js'; 
import { 
    createResponse, 
    validatePassword 
} from '../utils/utils.js'
import { 
    findPrimaryTwoFaByUid, 
    storeOtpCode, 
    updateOtpCode 
} from '../models/twoFaDAO.js';
import { 
    clearAuthCookies, 
    getAuthCookies, 
    setAuthCookies, 
    setTempAuthToken 
} from '../utils/authCookies.js';

const hash = bcrypt.hash;
const compare = bcrypt.compare;

export async function lostPasswordHandler(request, reply) {
    try {
        
        const { email } = request.body;
        
        const user = await findUserByEmail(this.db, email);
        if (!user)
            return reply.code(400).send(createResponse(400, 'INVALID_EMAIL'));
        if (!user.password)
            return reply.code(400).send(createResponse(400, 'USER_LINKED'));

        const tempToken = this.jwt.signTT({ id: user.id });
        const otpCode = `${Math.floor(100000 + Math.random() * 900000) }`
        
        const twoFa = await findPrimaryTwoFaByUid(this.db, user.id);
        if (twoFa)
            await updateOtpCode(this.db, otpCode, twoFa.id, twoFa.type);
        else    
            await storeOtpCode(this.db, otpCode, user.id);
        const mailOptions = {
            from: `${process.env.APP_NAME} <${process.env.APP_EMAIL}>`,
            to: `${user.email}`,
            subject: "Hello from M3ayz00",
            text: `OTP CODE : <${otpCode}>`,
        }
        await this.sendMail(mailOptions);
        return reply.code(200).send(createResponse(200, 'CODE_SENT', { tempToken }));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function verifyCodeHandler(request, reply) {
    try {
        const userId = request.user?.id;
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.code(401).send(createResponse(401, 'UNAUTHORIZED'));
        
        const twoFa = await findPrimaryTwoFaByUid(this.db, user.id);
        if (!twoFa)
            return reply.code(400).send(createResponse(400, 'CODE_NOT_SET'));

        const { otpCode } = request.body;
        if (!otpCode)
            return reply.code(401).send(createResponse(401, 'OTP_REQUIRED'));

        if (twoFa.otp !== otpCode || twoFa.otp_exp < Date.now())
            return reply.code(401).send(createResponse(401, 'OTP_INVALID'));

        return reply.code(200).send(createResponse(200, 'CODE_VERIFIED'));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function updatePasswordHandler(request, reply) {
    try {
        
        const userId = request.user?.id;
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.code(401).send(createResponse(401, 'UNAUTHORIZED'));

        if (!user.password)
            return reply.code(400).send(createResponse(400, 'USER_LINKED'));

        const { password, confirmPassword } = request.body;

        if (password !== confirmPassword)
            return reply.code(400).send(createResponse(400, 'UNMATCHED_PASSWORDS'));
        if (!validatePassword(password))
            return reply.code(400).send(createResponse(400, 'PASSWORD_POLICY'));

        const hashedPassword = await hash(password, 10);
        await updateUser(this.db, user.id, hashedPassword);

        const twoFa = await findPrimaryTwoFaByUid(this.db, user.id);
        if (twoFa && twoFa.enabled)
        {
            const tempToken = this.jwt.signTT({ id: user.id });
            if (twoFa.type === 'email')
            {
                const otpCode = `${Math.floor(100000 + Math.random() * 900000) }`
                await updateOtpCode(this.db, otpCode, twoFa.id, twoFa.type);
                const mailOptions = {
                    from: `${process.env.APP_NAME} <${process.env.APP_EMAIL}>`,
                    to: `${user.email}`,
                    subject: "Hello from M3ayz00",
                    text: `OTP CODE : <${otpCode}>`,
                }
                await this.sendMail(mailOptions);
            }
            clearAuthCookies(reply);
            setTempAuthToken(reply, tempToken);
            return reply.code(206).send(createResponse(206, 'TWOFA_REQUIRED', { twoFaType: twoFa.type  }));
        }
        const accessToken = this.jwt.signAT({ id: user.id });
        const tokenExist = await findValidTokenByUid(this.db, user.id);
        let refreshToken;
        if (tokenExist) {
            refreshToken = tokenExist.token;
        } else{
            refreshToken = this.jwt.signRT({ id: user.id });
            await addToken(this.db, refreshToken, user.id);
        }
        setAuthCookies(reply, accessToken, refreshToken);
        return reply.code(200).send(createResponse(200, 'USER_LOGGED_IN'));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function loginHandler(request, reply) {
    try {
        const { username, email, password } = request.body;
        const user = await findUser(this.db, username, email);
        if (!user)
            return reply.code(400).send(createResponse(400, 'INVALID_CREDENTIALS'));

        if (!user.password)
            return reply.code(400).send(createResponse(400, 'USER_ALREADY_LINKED'));
        const matched = await compare(password, user.password);
        if (!matched)
            return reply.code(400).send(createResponse(400, 'INVALID_PASSWORD'));
        
        const twoFa = await findPrimaryTwoFaByUid(this.db, user.id);
        if (twoFa && twoFa.enabled)
        {
            const tempToken = this.jwt.signTT({ id: user.id });
            if (twoFa.type === 'email')
            {
                const otpCode = `${Math.floor(100000 + Math.random() * 900000) }`
                await updateOtpCode(this.db, otpCode, twoFa.id, 'email');
                const mailOptions = {
                    from: `${process.env.APP_NAME} <${process.env.APP_EMAIL}>`,
                    to: `${user.email}`,
                    subject: "Hello from M3ayz00",
                    text: `OTP CODE : <${otpCode}>`,
                }
                await this.sendMail(mailOptions);
            }
            clearAuthCookies(reply);
            setTempAuthToken(reply, tempToken);
            return reply.code(206).send(createResponse(206, 'TWOFA_REQUIRED', { twoFaType: twoFa.type  }));
        }
        const accessToken = this.jwt.signAT({ id: user.id });
        const tokenExist = await findValidTokenByUid(this.db, user.id);
        let refreshToken;
        if (tokenExist) {
            refreshToken = tokenExist.token;
        } else {
            refreshToken = this.jwt.signRT({ id: user.id });
            await addToken(this.db, refreshToken, user.id);
        }

        setAuthCookies(reply, accessToken, refreshToken);
        return reply.code(200).send(createResponse(200, 'USER_LOGGED_IN'));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function registerHandler(request, reply) {
    try {
        const { email, username, password, confirmPassword, gender} = request.body;
        if (password !== confirmPassword)
            return reply.code(400).send(createResponse(400, 'UNMATCHED_PASSWORDS'));
        if (!validatePassword(password))
            return reply.code(400).send(createResponse(400, 'PASSWORD_POLICY'));
        const userExist = await findUser(this.db, username, email);
        if (userExist)
            return reply.code(400).send(createResponse(400, 'USER_EXISTS'));
        
        const hashedPassword = await hash(password, 10);
        const userId = await addUser(this.db, username, email, hashedPassword);
                
        this.rabbit.produceMessage({
            userId: userId,
            username: username,
            email: email,
            gender: gender
        },
        'profile.user.created'
    );
        
        return reply.code(201).send(createResponse(201, 'USER_REGISTERED'));
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
            return reply.code(401).send(createResponse(401, 'UNAUTHORIZED'));
        
        const tokens = getAuthCookies(request);        
        if (!tokens.refreshToken)
            return reply.code(401).send(createResponse(401, 'REFRESH_TOKEN_REQUIRED'));
        
        const tokenExist = await findToken(this.db, tokens.refreshToken);
        if (!tokenExist || tokenExist.revoked)
            return reply.code(401).send(createResponse(401, 'REFRESH_TOKEN_INVALID'));
        
        await revokeToken(this.db, tokens.refreshToken);
        clearAuthCookies(reply);
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
            return reply.code(401).send(createResponse(401, 'UNAUTHORIZED'));
        
        return reply.code(200).send(createResponse(200, 'USER_FETCHED', { id: user.id, username: user.username, email: user.email }));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function refreshHandler(request, reply) {
    try {
        const tokens = getAuthCookies(request);
        if (!tokens.refreshToken)
            return reply.code(401).send(createResponse(401, 'REFRESH_TOKEN_REQUIRED'));
        
        const tokenExist = await findToken(this.db, tokens.refreshToken);
        if (!tokenExist || tokenExist.revoked)
            return reply.code(401).send(createResponse(401, 'REFRESH_TOKEN_INVALID'));

        const payload = await this.jwt.verifyRT(tokenExist.token);

        await revokeToken(this.db, tokenExist.token);

        const accessToken = this.jwt.signAT({ id: payload.id });
        const newRefreshToken = this.jwt.signRT({ id: payload.id });

        await addToken(this.db, newRefreshToken, payload.id);
        setAuthCookies(reply, accessToken, newRefreshToken);
        return reply.code(200).send(createResponse(200, 'TOKEN_REFRESHED'));
    } catch (error) {
        if (error.name === 'TokenExpiredError')
            return reply.code(401).send(createResponse(401, 'REFRESH_TOKEN_EXPIRED'));

        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

