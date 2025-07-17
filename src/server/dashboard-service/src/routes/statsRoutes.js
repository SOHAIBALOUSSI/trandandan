import { getAllStats, getLiveDashboard } from "../controllers/statsController.js";
// import { verifyToken } from "../middleware/authWSMiddleWare.js";

export async function statsRoutes(fastify) {
    fastify.get('/live', {
        websocket: true,
        handler: getLiveDashboard
    });

    // fastify.get('/', {
    //     handler: getAllStats,
    //     preHandler: verifyToken
    // });
}