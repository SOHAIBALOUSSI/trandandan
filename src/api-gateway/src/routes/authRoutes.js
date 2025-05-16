import { registerSchema, loginSchema, tokenSchema } from '../schemas/authSchema.js';


async function authRoutes(fastify) {
    fastify.post('/login',  {
        schema: {
            body: loginSchema
        },
        handler: loginController
    });

    fastify.post('/register', {
        schema: {
            body: registerSchema
        },
        handler: registerController
    });

    fastify.post('/logout', {
        schema: {
            body: tokenSchema
        }, 
        preHandler: fastify.authenticate,
        handler: logoutController
    });
    
    fastify.get('/me',{ 
        preHandler: fastify.authenticate,
        handler: meController
    } );

    fastify.post('/refresh',{
        schema: {
            body: tokenSchema
        },
        handler: refreshController
    } );
}

export default authRoutes;
