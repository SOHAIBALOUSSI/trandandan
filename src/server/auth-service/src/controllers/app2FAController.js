import QRCode from 'qrcode'
import speakeasy from 'speakeasy'
import { storeTempSecret, findUserById, updateUserSecret } from '../models/userDAO.js';
import { addToken } from '../models/tokenDAO.js';

export async function setup2FAApp(request, reply) {
    try {
        const userId = request.user?.id;
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.code(404).send({ error: 'User not found.' });
        
        const secret = speakeasy.generateSecret({
            name: `trandenden (${user.username})`,
            length: 32
        });

        await storeTempSecret(this.db, secret.base32, userId);
        
        const otpauthUrl = secret.otpauth_url;
        const qrCodeUrl = await QRCode.toDataURL(otpauthUrl);
        
        return reply.code(200).send({ message: 'Scan the QR Code with your authenticator App', qrCode: qrCodeUrl })
    } catch (error) {
        return reply.code(500).send({ error: 'Internal server error.', details: error.message});
    }
}

export async function verify2FAAppSetup(request, reply) {
    try {
        
        const userId = request.user?.id;
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.code(404).send({ error: 'User not found.' });
        
        const { totpCode } = request.body;
        if (!totpCode)
            return reply.code(400).send({ error: 'TOTP code is required' })
        
        const isValid = speakeasy.totp.verify({
            secret: user.twofa_temp_secret,
            encoding: 'base32',
            token: totpCode,
            window: 1
        })
        if (!isValid)
            return reply.code(401).send({ error: 'Invalid TOTP code.' });
        
        await updateUserSecret(this.db, userId);
        
        return reply.code(200).send({ message: '2FA successfully enabled' });
    } catch (error) {   
        return reply.code(500).send({ error: 'Internal server error.', details: error.message});
    }
}

export async function verify2FAAppLogin(request, reply) {
    try {
        
        const userId = request.user?.id;
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.code(404).send({ error: 'User not found.' });
        
        const { totpCode } = request.body;
        if (!totpCode)
            return reply.code(400).send({ error: 'TOTP code is required' })
        
        const isValid = speakeasy.totp.verify({
            secret: user.twofa_secret,
            encoding: 'base32',
            token: totpCode,
            window: 1
        })
        if (!isValid)
            return reply.code(401).send({ error: 'Invalid TOTP code.' });
        
        const accessToken = this.jwt.signAT({ id: userId });
        const refreshToken = this.jwt.signRT({ id: userId });
        
        await addToken(this.db, refreshToken, userId);
        
        return reply.code(200).send({ accessToken: accessToken, refreshToken: refreshToken });
    } catch (error) {
        return reply.code(500).send({ error: 'Internal server error.', details: error.message});
    }
}