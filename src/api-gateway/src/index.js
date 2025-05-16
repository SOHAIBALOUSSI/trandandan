import fastify from 'fastify';
import dotenv from 'dotenv';    
import authRoutes from './routes/authRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import jwtPlugin from './plugins/jwt-plugin.js';
import rabbitmqPlugin from './plugins/rabbitmq-plugin.js';

dotenv.config();

const server = fastify({logger: true});


await server.register(jwtPlugin, {
    accessTokenKey: process.env.AJWT_SECRET_KEY
});

await server.register(rabbitmqPlugin);

await server.register(authRoutes, { prefix: '/auth' });
await server.register(profileRoutes, { prefix: '/profile' });

const start = async () => {
    try {
        await server.listen({ host: '0.0.0.0', port: 3000 });
        server.log.info("Server is listening on port 3000");
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();