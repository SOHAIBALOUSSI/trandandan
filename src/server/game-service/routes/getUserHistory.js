import sqlite3 from "sqlite3";

const db = new sqlite3.Database(
  "/app/db/.gameData.db",
  (err) => {
    if (err) {
      console.error("Error connecting to the database:", err.message);
    } else {
      console.log("Connected to the SQLite database.");
    }
  }
);

async function getUserHistory(req, reply) {
  const userId = req.query.userId;

  if (!userId) {
    return reply.status(400).send({ error: "User ID is required" });
  }

  const query = `
    SELECT * FROM games
    WHERE user_id = ?
    ORDER BY created_at DESC
  `;

  db.all(query, [userId], (err, rows) => {
    if (err) {
      console.error("Error fetching user history:", err.message);
      return reply.status(500).send({ error: "Database error" });
    }

    return reply.send(rows);
  });
}

export default getUserHistory;