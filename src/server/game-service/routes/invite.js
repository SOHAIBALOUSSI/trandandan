
const invitePlayer = async (req, reply) => {
        const { roomId, senderId, receiverId } = req.body;
    const rabbitMQ = new RabbitMGame('game'); // Queue name should match what the consumer listens to
    await rabbitMQ.connect();

    if (!roomId || !senderId || !receiverId) {
      return reply.code(400).send({ error: "Missing fields" });
    }
    try {
      const message = {
        type: "INVITE_SENT",
        data: {
          roomId,
          senderId,
          receiverId,
          sentAt: new Date().toISOString()
        }
      };
      console.log(message);
      await rabbitMQ.produceMessage(message, 'game.invite');
      return reply.code(200).send({ message: "Invite notification queued" });
    } catch (error) {
      console.error("Failed to send to RabbitMQ:", error);
      return reply.code(500).send({ error: "Failed to queue notification" });
    }
}
export default invitePlayer;
