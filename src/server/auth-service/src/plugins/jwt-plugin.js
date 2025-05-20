import fp from 'fastify-plugin';
import jwt from 'jsonwebtoken';


async function jwtPlugin(fastify, options) {
    const { accessTokenKey, refreshTokenKey } = options;

    fastify.decorate('jwt', {
        //AT = Access Token (15 minutes) \ RT = Refresh Token (7 days) \ TT = Temporary Token (5 minutes)
        signTT(payload, expiresIn = '5m') {
            try {
                return jwt.sign(payload, accessTokenKey, { expiresIn });
            } catch (error) {
                console.log("Error in signing access token: ", error);
                throw error;
            }
        },

        signAT(payload, expiresIn = '15m') {
            try {
                return jwt.sign(payload, accessTokenKey, { expiresIn });
            } catch (error) {
                console.log("Error in signing access token: ", error);
                throw error;
            }
        },

        signRT(payload, expiresIn = '7d') {
            try {
                delete payload.exp;
                return jwt.sign(payload, refreshTokenKey, { expiresIn });
            } catch (error) {
                console.log("Error in signing refresh token: ", error);
                throw error;
            }
        },

        verifyAT(token) {
            try {
                return jwt.verify(token, accessTokenKey);
            } catch (error) {
                console.log("Error in verifying access token: ", error);
                throw error;
            }
        },

        verifyRT(token) {
            try {
                return jwt.verify(token, refreshTokenKey);
            } catch (error) {
                console.log("Error in verifying refresh token: ", error);
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
