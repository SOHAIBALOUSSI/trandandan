import jwt from 'jsonwebtoken';

export function signAT(payload, expiresIn = '15m') {
    try {
        return jwt.sign(payload, accessTokenKey, { expiresIn });
    } catch (error) {
        console.log("Error in signing access token: ", error);
        throw error;
    }
}

export function signRT(payload, expiresIn = '7d') {
    try {
        delete payload.exp;
        return jwt.sign(payload, refreshTokenKey, { expiresIn });
    } catch (error) {
        console.log("Error in signing refresh token: ", error);
        throw error;
    }
}

export function verifyRT(token) {
    try {
        return jwt.verify(token, refreshTokenKey);
    } catch (error) {
        console.log("Error in verifying refresh token: ", error);
        throw error;
    }
}

// export async function authenticate(request, reply) {
//     const token = request.headers['authorization']?.split(' ')[1];
//     if (!token)
//         return reply.code(401).send({ error: `Authorization token is required.` });
//     try {
//         const decoded = await fastify.jwt.verifyAT(token);
//         request.user = decoded;
//     } catch (error) {
//         return reply.code(401).send({ error: `Invalid or expired token.` });
//     }
// }

