// import speakeasy from 'speakeasy'
// import { storeTempSecret, findUserById } from '../models/userDAO.js';

// export async function setup2FASms(request, reply) {
//     try {
//         const userId = request.user?.id;
//         const user = await findUserById(this.db, userId);
//         if (!user)
//             return reply.code(404).send({ error: 'User not found.' });
        
//         // const secret = speakeasy.generateSecret({
//         //     name: `trandenden (${user.username})`,
//         //     length: 32
//         // });

//         await storeTempSecret(this.db, secret.base32, userId);
        
//         //generate code + save i ndb
        
//     } catch (error) {
//         return reply.code(500).send({ error: 'Internal server error.', details: error.message});
//     }
// }

// export async function verify2FASmsSetup(request, reply) {
//     try {
        
//         const userId = request.user?.id;
//         const user = await findUserById(this.db, userId);
//         if (!user)
//             return reply.code(404).send({ error: 'User not found.' });
        
//         const { totpCode } = request.body;
//         if (!totpCode)
//             return reply.code(400).send({ error: 'TOTP code is required' })
        
//         //compare code with the one in db

        
//         // const isValid = speakeasy.totp.verify({
//         //     secret: user.twofa_temp_secret,
//         //     encoding: 'base32',
//         //     token: totpCode,
//         //     window: 1
//         // })
//         // if (!isValid)
//         //     return reply.code(401).send({ error: 'Invalid TOTP code.' });
        
//         //update user in db    

//         return reply.code(200).send({ message: '2FA successfully enabled' });
//     } catch (error) {   
//         return reply.code(500).send({ error: 'Internal server error.', details: error.message});
//     }
// }
