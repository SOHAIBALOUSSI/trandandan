import fastify from "fastify";
import dotenv from 'dotenv';
import websocket from "@fastify/websocket";
import sqlitePlugin from './plugins/sqlite-plugin.js'
import { createStatsTable } from "./src/database/initDataBase.js";
import redisPlugin from "./src/plugins/redis-plugin.js";
import rabbitmqPlugin from "./src/plugins/rabbitmq-plugin.js";
import { statsRoutes } from "./src/routes/statsRoutes.js";

const server = fastify({logger: true});

dotenv.config();

await server.register(sqlitePlugin);
await server.register(redisPlugin);
await server.register(rabbitmqPlugin);
await server.register(websocket);

await createStatsTable(server.db);

await server.register(statsRoutes, { prefix: '/stats' });

const start = async () => {
    try {
        await server.listen({ host: `${process.env.HOST_NAME}`, port: 3005 });
        server.log.info("Server is listening on port 3005");
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();