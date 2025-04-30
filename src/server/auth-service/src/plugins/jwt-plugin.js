import fp from 'fastify-plugin';
import jwt from 'jsonwebtoken';


async function jwtPlugin(fastify, options) {
    const { accessTokenKey, refreshTokenKey } = options;

    fastify.decorate('jwt', {
        //sign Access Token
        signAT(payload, expiresIn = '15m') {
            return jwt.sign(payload, accessTokenKey, { expiresIn });
        },

        //sign Refresh Token
        signRT(payload, expiresIn = '7d') {
            return jwt.sign(payload, refreshTokenKey, { expiresIn });
        },

        //verify Access Token
        verifyAT(token) {
            try {
                return jwt.verify(token, accessTokenKey);
            } catch (err) {
                throw err;
            }
        },

        //verify Refresh Token
        verifyRT(token) {
            try {
                return jwt.verify(token, refreshTokenKey);
            } catch (err) {
                throw err;
            }
        }
    })

    fastify.decorate('authenticate', async (request, reply) => {
        const token = request.headers['authorization']?.split(' ')[1];
        if (!token)
            return reply.status(401).send({ error: `Authorization token is required.` });
        try {
            const decoded = await fastify.jwt.verifyAT(token);
            request.user = decoded;
        } catch (err) {
            return reply.status(401).send({ error: `Invalid or expired token.` });
        }
    })
};

export default fp(jwtPlugin);
