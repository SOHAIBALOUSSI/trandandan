export function savePlayerData(req, reply) {
  try {
    const data = req.body;
    return data;
  } catch (error) {
    console.log(error);
  }
}
