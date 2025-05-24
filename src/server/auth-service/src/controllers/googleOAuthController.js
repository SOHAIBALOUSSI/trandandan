
export async function googleSetupHandler(request, reply) {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=profile email`;
    reply.redirect(url);
}

export async function googleLoginHandler(request, reply) {
    const { code } = request.query;
    try {
        const data = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                code,
                client_id: process.env.CLIENT_ID,
                client_secret: process.env.CLIENT_SECRET,
                redirect_uri: process.env.REDIRECT_URI,
                grant_type: 'authorization_code'
            }).toString()
        });

        const { access_token, id_token } = await data.json();
        const userinfo  = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
          });
        const apah = await userinfo.json();
        console.log(apah);
    } catch (error) {
        console.log(error);
    }
}