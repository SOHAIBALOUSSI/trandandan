// import sqlite3 from "sqlite3";

// const db = new sqlite3.Database("/app/db/game.db.sqlite", (err) => {
//   if (err) console.error("DB Error:", err.message);
//   else console.log("Connected to SQLite.");
// });

const connectedClients = [];
let lastSentGameId = 0; // replaces lastMatchId

async function pollForNewMatches(db) {
  // Get the latest game row
  await db.get(
    `SELECT match_id FROM games ORDER BY id DESC LIMIT 1`,
    [],
    async (err, latestRow) => {
      if (err) return console.error("DB Error:", err.message);
      if (!latestRow) return;

      const latestMatchId = latestRow.match_id;

      // Get last two games with that match_id
      await db.all(
        `SELECT id, enemy_id, user_id, left_player_score, right_player_score, player_id, game_end_result
         FROM games
         WHERE match_id = ?
         ORDER BY id DESC LIMIT 2`,
        [latestMatchId],
        (err, rows) => {
          if (err) return console.error("DB Query Error:", err.message);
          if (!rows || rows.length === 0) return;

          // Check if the most recent game was already sent
          const maxGameId = rows[0].id;
          if (maxGameId <= lastSentGameId) return;

          lastSentGameId = maxGameId; // update tracker

          const payload = rows.map((row) => ({
            enemyId: row.enemy_id,
            userId: row.user_id,
            leftPlayerScore: row.left_player_score,
            rightPlayerScore: row.right_player_score,
            playerId: row.player_id,
            gameEndResult: row.game_end_result,
          }));

          for (const client of connectedClients) {
            try {
              client.send(JSON.stringify(payload));
            } catch (err) {
              console.error("WebSocket send error:", err.message);
            }
          }
        }
      );
    }
  );
}


// This is the function you will import
export default function recentActivity(connection, req, db) {
	connectedClients.push(connection);
	
	console.log("Recent activity client connected");
	
	connection.on("message", (msg) => {
		console.log("Message from client:", msg.toString());
	});
	
	connection.on("close", () => {
		console.log("Recent activity client disconnected");
		const idx = connectedClients.indexOf(connection);
		if (idx !== -1) connectedClients.splice(idx, 1);
	});
	setInterval(pollForNewMatches, 2000, db);

  connection.on("error", (err) => {
    console.error("Webconnection error:", err);
  });
}
