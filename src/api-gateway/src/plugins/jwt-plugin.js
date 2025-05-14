import fp from 'fastify-plugin';
import jwt from 'jsonwebtoken';


async function jwtPlugin(fastify, options) {
    const { accessTokenKey, refreshTokenKey } = options;

    fastify.decorate('jwt', {
        verifyAT(token) {
            try {
                return jwt.verify(token, accessTokenKey);
            } catch (error) {
                console.log("Error in verifying access token: ", error);
                throw error;
            }
        }
    })

    fastify.decorate('authenticate', async (request, reply) => {
        const token = request.headers['authorization']?.split(' ')[1];
        if (!token)
            return reply.code(401).send({ error: `Authorization token is required.` });
        try {
            const decoded = await fastify.jwt.verifyAT(token);
            request.user = decoded;
        } catch (error) {
            return reply.code(401).send({ error: `Invalid or expired token.` });
        }
    })
};

export default fp(jwtPlugin);
