import fastify from 'fastify';
import dotenv from 'dotenv';
import sqlitePlugin from './plugins/sqlite-plugin.js'
import profileRoutes from './routes/profileRoutes.js';
import { createProfileTable } from './database/createProfileTable.js';
import rabbitmqPlugin from './plugins/rabbitmq-plugin.js';
import { addProfile, deleteProfile, updateProfileEmailById } from './models/profileDAO.js';
import redisPlugin from './plugins/redis-plugin.js';
import multipart from '@fastify/multipart'


const server = fastify({ logger: true });
await server.register(multipart, {
    limits: {      
        fileSize: 1000000,  
        files: 1
    }
});

dotenv.config();

await server.register(sqlitePlugin);
await server.register(rabbitmqPlugin);

await createProfileTable(server.db);

await server.register(profileRoutes, { prefix: '/profile' });

await server.register(redisPlugin);

console.log("profile service initialization is done...");

const start = async () => {
    try {
        await server.listen({ host: `${process.env.HOST_NAME}`, port: 3001 });
        server.log.info("Server is listening on port 3001");
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

server.rabbit.consumeMessages(async(request) => {
    console.log("Body received from profile:", request);
    const idExist = await server.redis.sIsMember('userIds', `${request.userId}`);
    console.log('idExist value: ', idExist);
    if (!idExist) 
        return;
    if (request.type === 'UPDATE') {
        const { userId, email } = request;
        await updateProfileEmailById(server.db, userId, email);
    } else if (request.type === 'INSERT') {
        const { userId, username, email, avatar_url, gender } = request;
        await addProfile(server.db, userId, username, email, avatar_url, gender);
    } else if (request.type === 'DELETE') {
        const userId = request.userId;
        await deleteProfile(server.db, userId);
    }
})

start();

