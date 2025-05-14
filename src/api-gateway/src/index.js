import fastify from 'fastify';
import dotenv from 'dotenv';    
import authRoutes from './routes/authRoutes';
import profileRoutes from './routes/profileRoutes';

const server = fastify({logger: true});

dotenv.config();

await server.register(jwtPlugin, {
    accessTokenKey: process.env.AJWT_SECRET_KEY
});

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