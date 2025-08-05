
export default async function savePlayerData(req, reply, db) {
  try {
    const data = req.body;
    
    // Create the table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_name VARCHAR(100) NOT NULL,
        match_id VARCHAR(100) NOT NULL,
        player_id INTEGER NOT NULL,
        enemy_id INTEGER NOT NULL,
        user_id INTEGER NOT NULL,
        left_player_score INTEGER NOT NULL,
        right_player_score INTEGER NOT NULL,
        game_duration INTEGER NOT NULL,
        game_end_result VARCHAR(100) NOT NULL,
        left_player_ball_hit INTEGER NOT NULL,
        right_player_ball_hit INTEGER NOT NULL,
        level REAL NOT NULL DEFAULT 0,
        matchPlayed INTEGER NOT NULL,
        matchWon INTEGER NOT NULL,
        matchLost INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(created_at, player_id)
      )
    `;
    
    await db.run(createTableQuery, async (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
        return reply.status(500).send({ error: "Database error" });
      }

      // Insert data into the table - Fixed parameter count
      const insertQuery = `
        INSERT INTO games (
          user_name,
          match_id,
          player_id,
          enemy_id,
          user_id,
          left_player_score,
          right_player_score,
          game_duration,
          game_end_result,
          left_player_ball_hit,
          right_player_ball_hit,
          level,
          matchPlayed,
          matchWon,
          matchLost
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const values = [
        data.userName,
        data.matchId,
        data.playerId,
        data.enemyId,
        data.userId,
        data.leftPlayerScore,
        data.rightPlayerScore,
        data.gameDuration,
        data.gameEndResult,
        data.leftPlayerBallHit,
        data.rightPlayerBallHit,
        data.level,
        data.matchPlayed,
        data.matchWon,
        data.matchLost
      ];

      // console.log("Inserting values:", values); // Debug log

      await db.run(insertQuery, values, function (err) {
        return reply.status(200).send({ 
          message: "Player data saved successfully",
          id: this.lastID 
        });
      });
    });
  } catch (error) {
    console.error("Error saving player data:", error);
    return reply.status(500).send({ error: "Server error" });
  }
}