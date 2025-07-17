export function createResponse(status, code, data) {
    return ({
        statusCode: status,
        code: code,
        data: data
    });
}
    // for (const id of playersIds) {
    //     const player = await redis.json.get(`player:${id}`, { path: "$" });
    //     if (!player)
    //         continue ;

    //     players.push(player);
    // }

async function getPlayersData(redis) {
    let players = [];

    const playersIds = await redis.sMembers('userIds');
    const idKeys = playersIds.map(id => `player:${id}`);
    if (idKeys) {

        players = await redis.sendCommand([
            'JSON.MGET',
            ...idKeys,
            '$'
        ])
        console.log("Players from dashboard-service", players);
        players.sort(sortPlayers);
    }
    return players;
}

function sortPlayers(player1, player2) {
    if (player1.level !== player2.level)
        return player1.level - player2.level

    if (player1.xp !== player2.xp)
        return player1.xp - player2.xp;

    if (player1.games_won !== player2.games_won)
        return player1.games_won - player2.games_won;

    if (player1.games_played !== player2.games_played)
        return player1.games_played - player2.games_played;
    
    return (1);
}

export async function displayDashBoard(redis, socket) {
    const players = await getPlayersData(redis);
    
    if (socket.isAuthenticated && socket.readyState === WebSocket.OPEN)
        socket.send(JSON.stringify(players));
} 