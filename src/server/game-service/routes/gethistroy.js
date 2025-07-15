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

export default function getData(req, reply) {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM games ORDER BY id DESC LIMIT 10"; // Added ORDER BY

    db.all(query, [], (err, rows) => {
      if (err) {
        console.error("Error fetching data:", err.message);
        reply.status(500).send({ error: "Database error" });
        return reject(err);
      }
      resolve(rows); // Now the route will return this
    });
  });
}