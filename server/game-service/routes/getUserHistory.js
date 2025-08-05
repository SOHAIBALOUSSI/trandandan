function getUserHistory(req, reply, db) {
  //
  const userId = req.body.userId;

  console.log("Fetching history for user ID:", userId);

  if (!userId) {
    return reply.status(400).send({ error: "User ID is required" });
  }

  const query = `
    SELECT * FROM games
    WHERE player_id = ?
    ORDER BY created_at DESC
  `;

  // Use a Promise to wait for thisdb.all() properly
  try {
    const rows = new Promise((resolve, reject) => {
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
