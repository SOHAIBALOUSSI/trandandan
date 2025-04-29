import fastify from 'fastify';
import dotenv from 'dotenv';
import sqlitePlugin from './plugins/sqlite-plugin.js'
import jwtPlugin from './plugins/jwt-plugin.js'
import { createUserTable } from './migrations/createUserTable.js';
import authRoutes from './routes/auth.routes.js';

const server = fastify();

dotenv.config();

await server.register(sqlitePlugin);
await server.register(jwtPlugin, { secretKey: process.env.JWT_SECRET_KEY });

await createUserTable(server.db);

await server.register(authRoutes, { prefix: '/auth' });

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

