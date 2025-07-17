// export async function getStatsById(db, id) {
//     return await db.get(`SELECT user_id, level, xp, solde, matches_played, matches_won, matches_lost 
//         FROM stats 
//         WHERE user_id = ?`,
//         [id]
//     );
// }


// export async function insertStats(db, userId) {
//     await db.run(`INSERT INTO stats (user_id) 
//         VALUES (?)`,
//         [userId]
//     );
// }

// export async function updateStats(db, userId, matchResult) {
//     const userStats = await getStatsById(db, userId);
//     if (!userStats)
//         return false;

//     userStats.matches_played++;
//     if (matchResult === `W`) {
//         userStats.matches_won++;
//         userStats.solde += 5;
//     } else {
//         userStats.matches_lost++;
//     }
//     userStats.xp = userStats.matches_won * 100 + userStats.matches_lost * 50;
//     userStats.level = userStats.xp / 500;
    
//     await db.run(`UPDATE stats SET 
//         level = ?, 
//         xp = ?, 
//         solde = ?, 
//         matches_played = ?, 
//         matches_won = ?, 
//         matches_lost = ? 
//         WHERE user_id = ?`,
//         [
//             userStats.level,
//             userStats.xp,
//             userStats.solde,
//             userStats.matches_played,
//             userStats.matches_won,
//             userStats.matches_lost,
//             userStats.user
//         ]
//     )
// }