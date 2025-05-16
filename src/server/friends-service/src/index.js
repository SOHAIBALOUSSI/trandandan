import fastify from 'fastify';
import dotenv from 'dotenv';
import sqlitePlugin from './plugins/sqlite-plugin.js'
import friendsRoutes from './routes/friendsRoutes.js';
import { createFriendshipTable } from './database/createFriendshipsTable.js';

const server = fastify({ logger: true });

dotenv.config();

await server.register(sqlitePlugin);

await createFriendshipTable(server.db);

await server.register(friendsRoutes, { prefix: '/friends' });

console.log("friends service initialization is done...");

const start = async () => {
    try {
        await server.listen({ host: '0.0.0.0', port: 3002 });
        server.log.info("Server is listening on port 3002");
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();

