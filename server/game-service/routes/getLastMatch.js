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

export default function getLastMatchByUser(req, reply){
  return new Promise((resolve, reject) => {
    const userName = req.params.userName; // Assuming playerId is passed as a parameter
    const query = `
        SELECT * FROM games
        WHERE user_name = ?
        ORDER BY created_at DESC
        LIMIT 1
    `; // Added ORDER BY

    db.all(query, [userName], (err, rows) => {
      if (err) {
        console.error("Error fetching data:", err.message);
        reply.status(500).send({ error: "Database error" });
        return reject(err);
      }
      console.log(rows);
      resolve(rows); // Now the route will return this
    });
  });
 }