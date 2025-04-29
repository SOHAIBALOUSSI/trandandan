import fp from 'fastify-plugin';
import jwt from 'jsonwebtoken';


async function jwtPlugin(fastify, options) {
    const { secretKey } = options;

    fastify.decorate('jwt', {
        sign(payload, expiresIn = '1h') {
            return jwt.sign(payload, secretKey, { expiresIn });
        },

        verify(token) {
            try {
                return jwt.verify(token, secretKey);
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
            decoded = await fastify.jwt.verify(token);
            request.user = decoded;
        } catch (err) {
            return reply.status(401).send({ error: `Invalid or expired token.` });
        }
    })
};

export default fp(jwtPlugin);
