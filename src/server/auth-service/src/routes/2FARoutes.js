import { setup2FAHandler, verify2FASetupHandler, verifyLogin2FAHandler } from "../controllers/2FAController.js";
import { totpCodeSchema } from "../schemas/authSchema.js";

async function twoFARoutes(fastify) {
    fastify.post('/setup', {
        preHandler: fastify.authenticate,
        handler: setup2FAHandler
    });

    fastify.post('/verif-setup', {
        schema: {
            body: totpCodeSchema
        },
        preHandler: fastify.authenticate,
        handler: verify2FASetupHandler
    });

    fastify.post('/verify-login', {
        schema: {
            body: totpCodeSchema
        },
        preHandler: fastify.authenticate,
        handler: verifyLogin2FAHandler
    })
}

export default twoFARoutes;