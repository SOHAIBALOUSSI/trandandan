import { fortyTwoLoginHandler, fortyTwoSetupHandler } from '../controllers/42OAuthController.js';
import { 
    loginHandler, 
    registerHandler, 
    logoutHandler, 
    meHandler, 
    refreshHandler, 
    verifyCodeHandler, 
    lostPasswordHandler, 
    updatePasswordHandler 
} from '../controllers/authController.js';
import { 
    googleLoginHandler, 
    googleSetupHandler 
} from '../controllers/googleOAuthController.js';
import { 
    registerSchema, 
    loginSchema,
    tokenSchema, 
    otpCodeSchema, 
    emailSchema,
    passwordSchema 
} from '../schemas/authSchema.js';


async function authRoutes(fastify) {
    fastify.post('/login',  {
        schema: {
            body: loginSchema
        },
        handler: loginHandler
    });

    fastify.post('/register', {
        schema: {
            body: registerSchema
        },
        handler: registerHandler
    });

    fastify.post('/logout', {
        preHandler: fastify.authenticate,
        handler: logoutHandler
    });
    
    fastify.get('/me',{ 
        preHandler: fastify.authenticate,
        handler: meHandler
    } );

    fastify.post('/refresh',{
        handler: refreshHandler
    } );

    fastify.get('/google',{
        handler: googleSetupHandler
    } );

    fastify.get('/google/callback',{
        handler: googleLoginHandler
    } );

    fastify.get('/42',{
        handler: fortyTwoSetupHandler
    } );

    fastify.get('/42/callback',{
        handler: fortyTwoLoginHandler
    } );

    fastify.post('/lost-password', {
        schema: {
            body: emailSchema
        }, 
        handler: lostPasswordHandler
    });

    fastify.post('/verify-code', {
        schema: {
            body: otpCodeSchema
        }, 
        preHandler: fastify.authenticate,
        handler: verifyCodeHandler
    });

    fastify.post('/update-password', {
        schema: {
            body: passwordSchema
        }, 
        preHandler: fastify.authenticate,
        handler: updatePasswordHandler
    });
}

export default authRoutes;
