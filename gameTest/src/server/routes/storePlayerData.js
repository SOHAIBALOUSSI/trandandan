import Database from 'better-sqlite3';

const db = new Database('/home/oussama/Desktop/tran/server/db/intro.db');



export function savePlayerData(req, reply) {
  try {
    const data = req.body;
    db.prepare(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name VARCHAR(100) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `).run();
      try {
        db.prepare('INSERT INTO users (name) VALUES (?)').run('John');
      } catch (error) {
        console.error('Error inserting data into the database:', error);
      }

    const users = db.prepare('SELECT * FROM users').all();
    console.log(users);
    return reply.status(200).send(data);
  } catch (error) {
    return reply.status(500).send({ error: 'Server error' });
  }
}
