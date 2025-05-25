import { createResponse } from "../utils/utils";

export async function googleSetupHandler(request, reply) {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=profile email&access_type=offline&prompt=consent`;
    reply.redirect(url);
}

export async function googleLoginHandler(request, reply) {
    const { code } = request.query;
    if (!code)
        return reply.code(400).send(createResponse(400, AUTH_CODE_REQUIRED));
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

        if (!tokens.ok)
        {
            const errorText = await tokens.text();
            console.log('Google tokens error: ', errorText);
            return reply.code(500, INTERNAL_SERVER_ERROR);
        }

        const { access_token, id_token } = await tokens.json();
        const userinfo  = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            method: 'GET',
            headers: { Authorization: `Bearer ${access_token}` }
          });

        const userInfo = await userinfo.json();
        console.log('User info: ', userInfo);
        //check if user exists (match by email) ? assign jwt : register new user + send data & picture to profile
    } catch (error) {
        console.log(error);
    }
}