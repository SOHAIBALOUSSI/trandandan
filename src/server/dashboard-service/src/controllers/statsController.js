import { getStatsById } from "../database/statsDAO.js";
// import { verifyWSToken } from "../middleware/authRESTMiddleWare.js";
import { createResponse, displayDashBoard } from "../utils/utils.js";

export async function getAllStats(request, reply) {
    try {
        const userId = request.user.id;

        const userStats = await getStatsById(this.db, userId);
        if (!userStats)
            return reply.code(404).send(createResponse(404, 'STATS_NOT_FOUND'));

        return reply.code(200).send(createResponse(200, 'STATS_FETCHED', { stats: userStats }));

    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

const users = new Map();

export async function getLiveDashboard(socket, request) {
    try {
        // socket.userId = null;
        // socket.isAuthenticated = false;

        // await verifyWSToken(socket, request, this.redis);

        // if (socket.isAuthenticated) {
        //     if (!users.has(socket.userId))
        //         users.set(socket.userId, new Set());
        //     users.get(socket.userId).add(socket);
        // } else {
        //     socket.close(3000, 'Unauthorized');
        //     return ;
        // }
        setInterval(displayDashBoard, 1000, this.redis, socket)

        // socket.on('message', (message) => {

        // });

        socket.on('error', (error) => {
            console.error('FastifyWebSocket: Client error:', error);
        });

        socket.on('close', () => {
            console.log('FastifyWebSocket: Client disconnected.');
            // if (socket.isAuthenticated && users.has(socket.userId)) {
            //     users.get(socket.userId).delete(socket);
            // if (users.get(socket.userId).size === 0) 
            //     users.delete(socket.userId);
            // }
        })
    } catch (error) {
        console.log(error);
        socket.close(1008, 'Malformed payload');
    }    
}