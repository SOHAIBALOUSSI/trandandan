import { setup2FAApp, verify2FAAppLogin, verify2FAAppSetup } from "../controllers/app2FAController.js";
import { setup2FAEmail, verify2FAEmailSetup, verify2FALogin } from "../controllers/email2FAController.js";
// import { setup2FASms, verify2FASmsSetup } from "../controllers/sms2FAController.js";
import { totpCodeSchema } from "../schemas/authSchema.js";

async function twoFARoutes(fastify) {
    fastify.post('/app/setup', {
        preHandler: fastify.authenticate,
        handler: setup2FAApp
    });

    fastify.post('/app/verify-setup', {
        schema: {
            body: totpCodeSchema
        },
        preHandler: fastify.authenticate,
        handler: verify2FAAppSetup
    });

    fastify.post('/app/verify-login', {
        schema: {
            body: totpCodeSchema
        },
        preHandler: fastify.authenticate,
        handler: verify2FAAppLogin
    });
    
    fastify.post('/email/setup', {
        preHandler: fastify.authenticate,
        handler: setup2FAEmail
    });
    
    fastify.post('/email/verify-setup', {
        schema: {
            body: totpCodeSchema
        },
        preHandler: fastify.authenticate,
        handler: verify2FAEmailSetup
    });
    
    // fastify.post('/sms/setup', {
    //     preHandler: fastify.authenticate,
    //     handler: setup2FASms
    // });
    
    // fastify.post('/sms/verify-setup', {
    //     schema: {
    //         body: totpCodeSchema
    //     },
    //     preHandler: fastify.authenticate,
    //     handler: verify2FASmsSetup
    // });
    
    fastify.post('/verify-login', {
        schema: {
            body: totpCodeSchema
        },
        preHandler: fastify.authenticate,
        handler: verify2FALogin
    });

}

export default twoFARoutes;