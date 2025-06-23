import fastify from 'fastify';
import dotenv from 'dotenv';
import sqlitePlugin from './plugins/sqlite-plugin.js'
import friendsRoutes from './routes/friendsRoutes.js';
import { createFriendshipTable } from './database/createFriendshipsTable.js';
import rabbitmqPlugin from './plugins/rabbitmq-plugin.js';
import { deleteFriendships } from './models/friendshipDAO.js';
import { createBlockTable } from './database/createBlockTable.js';
import blockRoutes from './routes/blockRoutes.js';
import redisPlugin from './plugins/redis-plugin.js';

const server = fastify({ logger: true });

dotenv.config();

await server.register(sqlitePlugin);
await createFriendshipTable(server.db);
await createBlockTable(server.db);

await server.register(rabbitmqPlugin);
server.rabbit.consumeMessages(async (request) => {
    if (request.type === 'DELETE') {
        const userId = request.userId;
        const idExist = await redis.sIsMember('userIds', `${userId}`);
        console.log('idExist value: ', idExist);
        if (idExist)
            await deleteFriendships(server.db, userId);
    }
})

await server.register(redisPlugin);

await server.register(friendsRoutes, { prefix: '/friends' });
await server.register(blockRoutes, { prefix: '/block' });

console.log("relationships service initialization is done...");

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

