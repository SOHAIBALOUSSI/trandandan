import { addUserAndOAuthIdentity, deleteUser, findOauthIdentity, findUserByEmail, findUserById, linkOAuthIdentityToUser } from "../models/userDAO.js";
import { addToken, revokeToken } from "../models/tokenDAO.js";
import { createResponse, generateUsername } from "../utils/utils.js";

export async function   googleSetupHandler(request, reply) {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=profile email&access_type=offline&prompt=consent`;
    reply.redirect(url);
}

export async function googleLoginHandler(request, reply) {
    const { code } = request.query;
    if (!code)
        return reply.code(400).send(createResponse(400, 'AUTH_CODE_REQUIRED'));
    try {
        const tokens = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                code,
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                redirect_uri: process.env.REDIRECT_URI,
                grant_type: 'authorization_code'
            }).toString()
        });

        console.log('Google tokens: ', tokens);
        if (!tokens.ok)
        {
            const errorText = await tokens.text();
            console.log('Google tokens error: ', errorText);
            return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
        }

        const { access_token, refresh_token } = await tokens.json();
        const userinfo  = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            method: 'GET',
            headers: { Authorization: `Bearer ${access_token}` }
        });

        const userInfo = await userinfo.json();
        console.log('User info: ', userInfo);
        const actualInfo = {
        provider: 'google',
            sub: userInfo.sub,
            email: userInfo.email,
            accessToken: access_token,
            refreshToken: refresh_token
        }

        let isNewUser = false;
        let user;
        const oauthId = await findOauthIdentity(this.db, 'google', userInfo.sub);
        if (oauthId) {
            user = await findUserById(this.db, oauthId.user_id);
            if (user)
                console.log('Already existing user with ID:', user.id);
        } else {
            user = await findUserByEmail(this.db, userInfo.email);
            if (user) {
                console.log(`Existing user with ID : ${user.id} but not linked to google`);
                await linkOAuthIdentityToUser(this.db, user.id, actualInfo);
            }
            else {
                console.log('New User');
                isNewUser = true;
                const uniqueUserName = await generateUsername(this.db, userInfo.given_name || userInfo.email.split('@')[0]);
                const newUserId = await addUserAndOAuthIdentity(this.db, {
                    username: uniqueUserName,
                    ...actualInfo
                })
                user = await findUserById(this.db, newUserId);
            }
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
                    user_id: user.id,
                    username: user.username,  
                    email: user.email,
                    avatar_url: userInfo.picture
                })
            });

            if (!response.ok) {
                await deleteUser(this.db, newUser);
                await revokeToken(this.db, refreshToken);
                return reply.code(400).send(createResponse(400, 'PROFILE_CREATION_FAILED'));
            }
            return reply.code(201).send(createResponse(201, 'USER_REGISTERED', { accessToken: accessToken, refreshToken: refreshToken }));
        }
        else
            return reply.code(200).send(createResponse(200, 'USER_LOGGED_IN', { accessToken: accessToken, refreshToken: refreshToken }));
    } catch (error) {
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}