export function savePlayerData(req, reply, db) {
  try {
    const data = req.body;

    // Create the table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS games (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_name VARCHAR(100) NOT NULL,
        match_id VARCHAR(100) NOT NULL,
        player_id INTEGER NOT NULL,
        left_player_score INTEGER NOT NULL,
        right_player_score INTEGER NOT NULL,
        game_duration INTEGER NOT NULL,
        game_end_result VARCHAR(100) NOT NULL,
        left_player_ball_hit INTEGER NOT NULL,
        right_player_ball_hit INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(match_id, player_id)
      )
    `;
    db.run(createTableQuery, (err) => {
      if (err) {
        console.error("Error creating table:", err.message);
        return reply.status(500).send({ error: "Database error" });
      }

      // Insert data into the table
      const insertQuery = `
        INSERT INTO games (
          user_name,
          match_id,
          player_id,
          left_player_score,
          right_player_score,
          game_duration,
          game_end_result,
          left_player_ball_hit,
          right_player_ball_hit
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.run(
        insertQuery,
        [
          data.userName,
          data.matchId,
          data.playerId,
          data.leftPlayerScore,
          data.rightPlayerScore,
          data.gameDuration,
          data.gameEndResult,
          data.leftPlayerBallHit,
          data.rightPlayerBallHit,
        ],
        function (err) {
          if (err) {
            console.error("Error inserting data:", err.message);
            return reply.status(500).send({ error: "Database error" });
          }

          console.log("Data inserted successfully with ID:", this.lastID);
          return reply
            .status(200)
            .send({ message: "Player data saved successfully" });
        }
      );
    });
  } catch (error) {
    console.error("Error saving player data:", error);
    return reply.status(500).send({ error: "Server error" });
  }
}
