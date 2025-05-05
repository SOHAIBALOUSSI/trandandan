import fastify from 'fastify';
import dotenv from 'dotenv';
import sqlitePlugin from './plugins/sqlite-plugin.js'
import jwtPlugin from './plugins/jwt-plugin.js'
import profileRoutes from './routes/profile.routes.js';

const server = fastify({ logger: true });

dotenv.config();

await server.register(sqlitePlugin);
await server.register(jwtPlugin, {
    accessTokenKey: process.env.AJWT_SECRET_KEY,
    refreshTokenKey: process.env.RJWT_SECRET_KEY
});

await server.register(profileRoutes, { prefix: '/profile' });
console.log("server initialization is done...");

const start = async () => {
    try {
        await server.listen({ host: '0.0.0.0', port: 3001 });
        server.log.info("Server is listening on port 3001");
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();

