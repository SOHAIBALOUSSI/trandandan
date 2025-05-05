import fastify from 'fastify';
import dotenv from 'dotenv';
import sqlitePlugin from './plugins/sqlite-plugin.js'
import jwtPlugin from './plugins/jwt-plugin.js'
import { createUserTable } from './migrations/createUserTable.js';
import { createTokenTable } from './migrations/createTokenTable.js';
import authRoutes from './routes/auth.routes.js';

const server = fastify({logger: true});

dotenv.config();

await server.register(sqlitePlugin);
await server.register(jwtPlugin, {
    accessTokenKey: process.env.AJWT_SECRET_KEY,
    refreshTokenKey: process.env.RJWT_SECRET_KEY
});

await createUserTable(server.db);
await createTokenTable(server.db);

await server.register(authRoutes, { prefix: '/auth' });
console.log("server initialization is done...");

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

