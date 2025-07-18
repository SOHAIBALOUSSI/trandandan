import fastify from "fastify";
import dotenv from 'dotenv';
import websocket from "@fastify/websocket";
import redisPlugin from "./plugins/redis-plugin.js";
import rabbitmqPlugin from "./plugins/rabbitmq-plugin.js";
import { statsRoutes } from "./routes/statsRoutes.js";

const server = fastify({ logger: true });

dotenv.config();

await server.register(redisPlugin);
await server.register(rabbitmqPlugin);
await server.register(websocket);

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