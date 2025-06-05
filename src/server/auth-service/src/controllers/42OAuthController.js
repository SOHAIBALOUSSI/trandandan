import { addUserAndOAuthIdentity, deleteUser, findOauthIdentity, findUserByEmail, findUserById, linkOAuthIdentityToUser } from "../models/userDAO.js";
import { addToken, revokeToken } from "../models/tokenDAO.js";
import { createResponse, generateUsername } from "../utils/utils.js";
import { findTwoFaByUid, storeOtpCode } from "../models/twoFaDAO.js";

export async function   fortyTwoSetupHandler(request, reply) {
    const url = `https://api.intra.42.fr/oauth/authorize?client_id=${process.env.FORTY_TWO_ID}&redirect_uri=${process.env.FORTY_TWO_REDIRECT_URI}&response_type=code&prompt=consent`;
    reply.redirect(url);
}

export async function fortyTwoLoginHandler(request, reply) {
    const { code } = request.query;
    if (!code)
        return reply.code(400).send(createResponse(400, 'AUTH_CODE_REQUIRED'));
    try {
        const tokens = await fetch('https://api.intra.42.fr/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: process.env.FORTY_TWO_ID,
                client_secret: process.env.FORTY_TWO_SECRET,
                redirect_uri: process.env.FORTY_TWO_REDIRECT_URI,
                grant_type: 'authorization_code'
            }).toString()
        });

        console.log('42 tokens: ', tokens);
        if (!tokens.ok)
        {
            const errorText = await tokens.text();
            console.log('42 tokens error: ', errorText);
            return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
        }

        const { access_token } = await tokens.json();
        const userinfo  = await fetch('https://api.intra.42.fr/v2/me', {
            method: 'GET',
            headers: { Authorization: `Bearer ${access_token}` }
        });

        console.log('User info: ', userinfo);
        const userInfo = await userinfo.json();
        console.log('User Info: ', userInfo);
        const actualInfo = {
            provider: '42',
            sub: userInfo.id,
            email: userInfo.email,
            accessToken: access_token,
            refreshToken: null
        }

        let isNewUser = false;
        let user;
        const oauthId = await findOauthIdentity(this.db, '42', userInfo.id);
        if (oauthId) {
            user = await findUserById(this.db, oauthId.user_id);
            if (user)
                console.log('Already existing user with ID:', user.id);
        } else {
            user = await findUserByEmail(this.db, userInfo.email);
            if (user) {
                console.log(`Existing user with ID : ${user.id} but not linked to 42`);
                await linkOAuthIdentityToUser(this.db, user.id, actualInfo);
            }
            else {
                console.log('New User');
                isNewUser = true;
                const uniqueUserName = await generateUsername(this.db, userInfo.login || userInfo.email.split('@')[0]);
                const newUserId = await addUserAndOAuthIdentity(this.db, {
                    username: uniqueUserName,
                    ...actualInfo
                })
                user = await findUserById(this.db, newUserId);
            }
        }
        
        const twoFa = await findTwoFaByUid(this.db, user.id);
        if (twoFa && twoFa.enabled) {
            const tempToken = this.jwt.signTT({ id: user.id });
            if (twoFa.type === 'email')
            {
                const totpCode = `${Math.floor(100000 + Math.random() * 900000) }`
                await storeOtpCode(this.db, user.id);
                const mailOptions = {
                    from: `${process.env.APP_NAME} <${process.env.APP_EMAIL}>`,
                    to: `${user.email}`,
                    subject: "Hello from M3ayz00",
                    text: `OTP CODE : <${totpCode}>`,
                }
                await this.sendMail(mailOptions);
            }
            return reply.code(206).send(createResponse(206, 'TWOFA_REQUIRED', { tempToken: tempToken, twoFaType: twoFa.type  }));
        }
        const accessToken = this.jwt.signAT({ id: user.id });
        const refreshToken = this.jwt.signRT({ id: user.id });
        await addToken(this.db, refreshToken, user.id);
        
        if (isNewUser) {
            const response = await fetch('http://profile-service:3001/profile/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    username: user.username,
                    email: user.email,
                    avatar_url: userInfo.image.link
                })
            });

            if (!response.ok) {
                await deleteUser(this.db, user.id);
                await revokeToken(this.db, refreshToken);
                return reply.code(400).send(createResponse(400, 'PROFILE_CREATION_FAILED'));
            }
            return reply.code(201).send(createResponse(201, 'USER_REGISTERED', { accessToken: accessToken, refreshToken: refreshToken }));
        }
        else
            return reply.code(200).send(createResponse(200, 'USER_LOGGED_IN', { accessToken: accessToken, refreshToken: refreshToken }));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function makePrimaryHandler(request, reply) {
    
}