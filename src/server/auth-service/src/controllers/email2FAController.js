import { addToken } from '../models/tokenDAO.js';
import { findTwoFaByUID, storeTotpCode, updateTotpCode, updateUser2FA } from '../models/twoFaDAO.js';
import { findUserById } from '../models/userDAO.js';
import { createResponse } from '../utils/utils.js';

export async function setup2FAEmail(request, reply) {
    try {
        const userId = request.user?.id;
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.code(400).send(createResponse(400, 'USER_NOT_FOUND'));
        
        const totpCode = `${Math.floor(100000 + Math.random() * 900000) }`
        const twoFa = await findTwoFaByUID(this.db, user.id);
        if (!twoFa)
            await storeTotpCode(this.db, totpCode, userId);
        else
        {
            if (twoFa.enabled)
                return reply.code(400).send(createResponse(400, 'TWOFA_ALREADY_ENABLED'));
            await updateTotpCode(this.db, totpCode, userId);
        }

        const mailOptions = {
            from: `${process.env.APP_NAME} <${process.env.APP_EMAIL}>`,
            to: `${user.email}`,
            subject: "Hello from M3ayz00",
            text: `OTP CODE : <${totpCode}>`,
        }
        await this.sendMail(mailOptions);

        return reply.code(200).send(createResponse(200, 'CODE_SENT'));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function verify2FAEmailSetup(request, reply) {
    try {
        
        const userId = request.user?.id;
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.code(400).send(createResponse(400, 'USER_NOT_FOUND'));
        
        const twoFa = await findTwoFaByUID(this.db, user.id);
        if (!twoFa)
            return reply.code(400).send(createResponse(400, 'TWOFA_NOT_SET'));
        else if (twoFa.enabled)
            return reply.code(400).send(createResponse(400, 'TWOFA_ALREADY_ENABLED'));

        const { totpCode } = request.body;
        if (!totpCode)
            return reply.code(401).send(createResponse(401, 'OTP_REQUIRED'));

        console.log(`totpCode : ${twoFa.totp} | totp_exp : ${twoFa.totp_exp}`);
        if (twoFa.totp !== totpCode || twoFa.totp_exp < Date.now())
            return reply.code(401).send(createResponse(401, 'OTP_INVALID'));

        await updateUser2FA(this.db, userId);

        return reply.code(200).send(createResponse(200, 'TWOFA_ENABLED'));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function verify2FALogin(request, reply) {
    try {
        
        const userId = request.user?.id;
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.code(400).send(createResponse(400, 'USER_NOT_FOUND'));
        
        const twoFa = await findTwoFaByUID(this.db, user.id);
        if (!twoFa)
            return reply.code(400).send(createResponse(400, 'TWOFA_NOT_SET'));
        else if (!twoFa.enabled)
            return reply.code(400).send(createResponse(400, 'TWOFA_NOT_ENABLED'));
        
        const { totpCode } = request.body;
        if (!totpCode)
            return reply.code(401).send(createResponse(401, 'OTP_REQUIRED'));
        
        if (twoFa.totp !== totpCode || twoFa.totp_exp < Date.now())
            return reply.code(401).send(createResponse(401, 'OTP_INVALID'));
        
        const accessToken = this.jwt.signAT({ id: userId });
        const refreshToken = this.jwt.signRT({ id: userId });
        
        await addToken(this.db, refreshToken, userId);
        
        return reply.code(200).send(createResponse(200, 'USER_LOGGED_IN', { accessToken: accessToken, refreshToken: refreshToken }));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}