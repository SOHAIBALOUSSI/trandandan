import { getAllStats, getLiveDashboard } from "../controllers/statsController";
import { verifyToken } from "../middleware/authWSMiddleWare";

export async function statsRoutes(fastify) {
    fastify.get('/live', {
        websocket: true,
        handler: getLiveDashboard
    });

    fastify.get('/', {
        handler: getAllStats,
        preHandler: verifyToken
    });
}