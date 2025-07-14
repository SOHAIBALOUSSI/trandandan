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
  //
  const userId = req.body.userId;

  if (!userId) {
    return reply.status(400).send({ error: "User ID is required" });
  }

  const query = `
    SELECT * FROM games
    WHERE player_id = ?
    ORDER BY created_at DESC
  `;

  // Use a Promise to wait for db.all() properly
  try {
    const rows = await new Promise((resolve, reject) => {
      db.all(query, [userId], (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });

    return reply.send(rows);
  } catch (err) {
    console.error("Error fetching user history:", err.message);
    return reply.status(500).send({ error: "Database error" });
  }
}


export default getUserHistory;