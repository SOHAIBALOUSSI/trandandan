import Database from 'better-sqlite3';

const db = new Database('/home/ousabbar/Desktop/trandenden/gameTest/src/db/intro.db');



export function savePlayerData(req, reply) {
  try {
    const data = req.body;
    console.log(data);
    // db.prepare(`
    //   CREATE TABLE IF NOT EXISTS  (
    //     id INTEGER PRIMARY KEY AUTOINCREMENT,
    //     user_name VARCHAR(100) NOT NULL,
    //     match_id VARCHAR(100) NOT NULL,
    //     player_id INTEGER NOT NULL,
    //     left_player_score INTEGER NOT NULL,
    //     right_player_score INTEGER NOT NULL,
    //     game_duration INTEGER NOT NULL,
    //     game_end_result VARCHAR(100) NOT NULL,
    //     left_player_ball_hit INTEGER NOT NULL,
    //     right_player_ball_hit INTEGER NOT NULL,
    //     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    //   )
    //   `).run();
    //   try {
    //     db.prepare('INSERT INTO users (name) VALUES (?)').run('John');
    //   } catch (error) {
    //     console.error('Error inserting data into the database:', error);
    //   }

    // const users = db.prepare('SELECT * FROM users').all();
    // console.log(users);
    return reply.status(200).send(data);
  } catch (error) {
    return reply.status(500).send({ error: 'Server error' });
  }
}