import { loginHandler, registerHandler, logoutHandler, meHandler, refreshHandler } from '../controllers/authController.js';
import { googleLoginHandler, googleSetupHandler } from '../controllers/googleOAuthController.js';
import { registerSchema, loginSchema, tokenSchema } from '../schemas/authSchema.js';


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
        schema: {
            body: tokenSchema
        }, 
        preHandler: fastify.authenticate,
        handler: logoutHandler
    });
    
    fastify.get('/me',{ 
        preHandler: fastify.authenticate,
        handler: meHandler
    } );

    fastify.post('/refresh',{
        schema: {
            body: tokenSchema
        },
        handler: refreshHandler
    } );

    fastify.get('/google/setup',{
        handler: googleSetupHandler
    } );

    fastify.get('/google/callback',{
        handler: googleLoginHandler
    } );
}

export default authRoutes;
