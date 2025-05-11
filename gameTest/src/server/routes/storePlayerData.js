export function savePlayerData(req, reply, db) {
  try {
    const data = req.body;
    // console.log(data);
    db.prepare(
      `
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
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `
    ).run();

    const games = db.prepare(`SELECT * FROM games WHERE match_id = ${data.matchId}`).all();
    if (games.length <= 0)
    {
      db.prepare(
        `
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
        `
      ).run(
        data.userName,
        data.matchId,
        data.playerId,
        data.leftPlayerScore,
        data.rightPlayerScore,
        data.gameDuration,
        data.gameEndResult,
        data.leftPlayerBallHit,
        data.rightPlayerBallHit
      );
    }


    // console.log(games);
    // console.log('--------------')
    return reply.status(200);
  } catch (error) {
    return reply.status(500).send({ error: "Server error" });
  }
}
