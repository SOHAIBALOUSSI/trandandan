import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const db = await open({
  filename: '/home/oussama/Desktop/tran/server/db/intro.db',
  driver: sqlite3.Database
});

export async function savePlayerData(req, reply) {
  try {
    const data = req.body;

    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await db.run('INSERT INTO users (name) VALUES (?)', 'John');

    const users = await db.all('SELECT * FROM users');
    console.log(users);

    return reply.status(200).send({ success: true, users });
  } catch (error) {
    console.error('Error:', error);
    return reply.status(500).send({ error: 'Server error' });
  }
}