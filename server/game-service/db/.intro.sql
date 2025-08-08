-- DROP TABLE games;
--SELECT * FROM games;
-- SELECT * FROM games WHERE user_name = 'fbxrqzm8ucok';
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
