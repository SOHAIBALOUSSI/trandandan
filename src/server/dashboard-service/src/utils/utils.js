// export function createResponse(status, code, data) {
//     return ({
//         statusCode: status,
//         code: code,
//         data: data
//     });
// }
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
    if (idKeys && idKeys[0]) {
        players = await redis.sendCommand([
            'JSON.MGET',
            ...idKeys,
            '$'
        ])
        players = players.map(jsonPlayer => {
            const player = JSON.parse(jsonPlayer)
            return player[0];
        }).filter(player => player !== null);
        players.sort(sortPlayers);
        console.log("Players from dashboard-service", players);
    }
    return players;
}

function sortPlayers(player1, player2) {
    if (player1.level !== player2.level)
        return player2.level - player1.level

    if (player1.xp !== player2.xp)
        return player2.xp - player1.xp;

    if (player1.matches_won !== player2.matches_won)
        return player2.matches_won - player1.matches_won;

    if (player1.matches_played !== player2.matches_played)
        return player2.matches_played - player1.matches_played;
    
    return (1);
}

export async function displayDashBoard(redis, socket) {
    const players = await getPlayersData(redis);
    
    // if (socket.readyState === WebSocket.OPEN)
    socket.send(JSON.stringify(players));
} 