import fastify from 'fastify';
import dotenv from 'dotenv';
import sqlitePlugin from './plugins/sqlite-plugin.js'
import profileRoutes from './routes/profileRoutes.js';
import { createProfileTable } from './database/createProfileTable.js';
import rabbitmqPlugin from './plugins/rabbitmq-plugin.js';
import { addProfile, updateProfileById, updateProfileEmailById } from './models/profileDAO.js';

const server = fastify({ logger: true });

dotenv.config();

await server.register(sqlitePlugin);
await server.register(rabbitmqPlugin);

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

server.rabbit.consumeMessages(async(request) => {
    console.log("Body received from profile:", request);
    if (request.type === 'UPDATE') {
        const { userId, email } = request;
        await updateProfileEmailById(server.db, userId, email);
    } else if (request.type === 'INSERT') {
        const { userId, username, email, avatar_url, gender } = request;
        await addProfile(server.db, userId, username, email, avatar_url, gender);
    }
})

start();

