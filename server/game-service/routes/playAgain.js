import RabbitMGame from "../tools/RabbitMGame.js";

const playAgain = async (req, reply) => {

  const { roomId, senderId, receiverId } = req.body;
  if (!roomId || !senderId || !receiverId) {
    return reply.code(400).send({ error: "Missing required fields" });
  }
  try {
    const rabbitMQ = new RabbitMGame("game");
    await rabbitMQ.connect();
    const message = {
      type: "PLAY_AGAIN",
      sender_id: receiverId,
      recipient_id: senderId,
      roomId,
    };
    await rabbitMQ.produceMessage(message, "notifications.game.playAgain");
    return reply.code(200).send({ message: "Play again notification queued" });
  } catch (error) {
    console.error("Failed to send to RabbitMQ:", error);
    return reply.code(500).send({ error: "Failed to queue notification" });
  }
};

export default playAgain;
