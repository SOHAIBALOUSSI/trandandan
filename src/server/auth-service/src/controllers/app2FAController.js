import QRCode from 'qrcode'
import speakeasy from 'speakeasy'
import { storeTempSecret, findUserById, updateUserSecret } from '../models/userDAO.js';
import { addToken } from '../models/tokenDAO.js';
import { createResponse } from '../utils/utils.js';

export async function setup2FAApp(request, reply) {
    try {
        const userId = request.user?.id;
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.code(400).send(createResponse(400, 'USER_NOT_FOUND'));
        
        const secret = speakeasy.generateSecret({
            name: `trandenden (${user.username})`,
            length: 32
        });

        await storeTempSecret(this.db, secret.base32, userId);
        
        const otpauthUrl = secret.otpauth_url;
        const qrCodeUrl = await QRCode.toDataURL(otpauthUrl);
        
        return reply.code(200).send(createResponse(200, 'SCAN_QR', { qrCode: qrCodeUrl }));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function verify2FAAppSetup(request, reply) {
    try {
        
        const userId = request.user?.id;
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.code(400).send(createResponse(400, 'USER_NOT_FOUND'));
        
        const { totpCode } = request.body;
        if (!totpCode)
            return reply.code(401).send(createResponse(401, 'OTP_REQUIRED'));
        
        const isValid = speakeasy.totp.verify({
            secret: user.twofa_temp_secret,
            encoding: 'base32',
            token: totpCode,
            window: 1
        })
        if (!isValid)
            return reply.code(401).send(createResponse(401, 'OTP_INVALID'));
        
        await updateUserSecret(this.db, userId);
        
        return reply.code(200).send(createResponse(200, '2FA_ENABLED'));
    } catch (error) {   
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function verify2FAAppLogin(request, reply) {
    try {
        
        const userId = request.user?.id;
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.code(400).send(createResponse(400, 'USER_NOT_FOUND'));
        
        const { totpCode } = request.body;
        if (!totpCode)
            return reply.code(401).send(createResponse(401, 'OTP_REQUIRED'));
        
        const isValid = speakeasy.totp.verify({
            secret: user.twofa_secret,
            encoding: 'base32',
            token: totpCode,
            window: 1
        })
        if (!isValid)
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