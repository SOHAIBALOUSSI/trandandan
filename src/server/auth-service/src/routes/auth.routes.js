import { loginHandler, registerHandler, logoutHandler, meHandler, refreshHandler } from '../controllers/auth.controller.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';


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
}

export default authRoutes;
