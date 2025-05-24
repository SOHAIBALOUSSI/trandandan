import fastify from 'fastify';
import dotenv from 'dotenv';
import sqlitePlugin from './plugins/sqlite-plugin.js'
import profileRoutes from './routes/profileRoutes.js';
import { createProfileTable } from './database/createProfileTable.js';

const server = fastify({ logger: true });

dotenv.config();

await server.register(sqlitePlugin);

await createProfileTable(server.db);

await server.register(profileRoutes, { prefix: '/profile' });

console.log("profile service initialization is done...");

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

