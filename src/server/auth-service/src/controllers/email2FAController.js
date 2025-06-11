import { addToken, findValidTokenByUid } from '../models/tokenDAO.js';
import { findTwoFaByUidAndType, makeTwoFaPrimaryByUidAndType, storeOtpCode, updateOtpCode, updateUser2FA } from '../models/twoFaDAO.js';
import { findUserById } from '../models/userDAO.js';
import { setAuthCookies } from '../utils/authCookies.js';
import { createResponse } from '../utils/utils.js';

export async function setup2FAEmail(request, reply) {
    try {
        const userId = request.user?.id;
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.code(400).send(createResponse(401, 'UNAUTHORIZED'));
        
        const otpCode = `${Math.floor(100000 + Math.random() * 900000) }`
        const twoFa = await findTwoFaByUidAndType(this.db, user.id, 'email');
        if (!twoFa)
            await storeOtpCode(this.db, otpCode, userId);
        else
        {
            if (twoFa.enabled)
                return reply.code(400).send(createResponse(400, 'TWOFA_ALREADY_ENABLED'));
            await updateOtpCode(this.db, otpCode, userId, twoFa.type);
        }

        const mailOptions = {
            from: `${process.env.APP_NAME} <${process.env.APP_EMAIL}>`,
            to: `${user.email}`,
            subject: "Hello from M3ayz00",
            text: `OTP CODE : <${otpCode}>`,
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
            return reply.code(400).send(createResponse(401, 'UNAUTHORIZED'));
        
        const twoFa = await findTwoFaByUidAndType(this.db, user.id, 'email');
        if (!twoFa)
            return reply.code(400).send(createResponse(400, 'TWOFA_NOT_SET'));
        else if (twoFa.enabled)
            return reply.code(400).send(createResponse(400, 'TWOFA_ALREADY_ENABLED'));

        const { otpCode } = request.body;
        if (!otpCode)
            return reply.code(401).send(createResponse(401, 'OTP_REQUIRED'));

        console.log(`otpCode : ${twoFa.otp} | otp_exp : ${twoFa.otp_exp}`);
        if (twoFa.otp !== otpCode || twoFa.otp_exp < Date.now())
            return reply.code(401).send(createResponse(401, 'OTP_INVALID'));

        await updateUser2FA(this.db, userId, 'email');
        await makeTwoFaPrimaryByUidAndType(this.db, userId, 'email');
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
            return reply.code(400).send(createResponse(401, 'UNAUTHORIZED'));
        
        const twoFa = await findTwoFaByUidAndType(this.db, user.id, 'email');
        if (!twoFa)
            return reply.code(400).send(createResponse(400, 'TWOFA_NOT_SET'));
        else if (!twoFa.enabled)
            return reply.code(400).send(createResponse(400, 'TWOFA_NOT_ENABLED'));
        
        const { otpCode } = request.body;
        if (!otpCode)
            return reply.code(401).send(createResponse(401, 'OTP_REQUIRED'));
        
        if (twoFa.otp !== otpCode || twoFa.otp_exp < Date.now())
            return reply.code(401).send(createResponse(401, 'OTP_INVALID'));
        
        const accessToken = this.jwt.signAT({ id: userId });
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