import twofactor from 'node-2fa'
import { storeTempSecret, findUserById } from '../models/userDAO.js';


//generate random code (6 digits) + expiration date(1h) + store them in db to compare with incoming code

export async function setup2FAEmail(request, reply) {
    try {
        const userId = request.user?.id;
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.code(404).send({ error: 'User not found.' });
        
        // const secret = twofactor.generateSecret({ name: `trandenden (${user.username})` });

        // const totpCode = twofactor.generateToken(secret.secret);
        //to add : save token 
        await storeTempSecret(this.db, secret.secret, userId);
        const mailOptions = {
            from: `${process.env.APP_NAME} <${process.env.APP_EMAIL}>`,
            to: `${user.email}`,
            subject: "Hello from M3ayz00",
            // text: `OTP CODE : <${totpCode.token}>`,
        }
        await this.sendMail(mailOptions);

        return reply.code(200).send({ message: 'Code is sent.' });
    } catch (error) {
        return reply.code(500).send({ error: 'Internal server error.', details: error.message});
    }
}

export async function verify2FAEmailSetup(request, reply) {
    try {
        
        const userId = request.user?.id;
        const user = await findUserById(this.db, userId);
        if (!user)
            return reply.code(404).send({ error: 'User not found.' });
        
        const { totpCode } = request.body;
        if (!totpCode)
            return reply.code(400).send({ error: 'TOTP code is required' })
        
        // const isValid = twofactor.verifyToken(user.twofa_temp_secret, totpCode);
        // if (!isValid || isValid.delta != 0)
        //     return reply.code(401).send({ error: 'Invalid or expired TOTP code.' });
        
        //update user in db    

        return reply.code(200).send({ message: '2FA successfully enabled' });
    } catch (error) {   
        return reply.code(500).send({ error: 'Internal server error.', details: error.message});
    }
}
