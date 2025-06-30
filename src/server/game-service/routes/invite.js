import  RabbitMGame  from "./RabbitMGame.js"

const invitePlayer = async (req, reply, fastify) => {
    const { senderId, receiverId } = req.body;
    const roomId = Math.random().toString(36).substr(2, 9);
    const rabbitMQ = new RabbitMGame('game'); // Queue name should match what the consumer listens to
    await rabbitMQ.connect();
    console.log(roomId);
    const redis = fastify.redis; // Access the Redis client from Fastify instance
    if (!redis) {
      console.error("Redis client is not available");
      return reply.code(500).send({ error: "Redis client is not available" });
    }
    redis.set(`invite:${senderId}`, roomId, 'EX', 60 * 5); // Store the invite for 5 minutes
  
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
      // console.log(message);
      await rabbitMQ.produceMessage(message, 'game.invite');
      return reply.code(200).send({ message: "Invite notification queued" });
    } catch (error) {
      console.error("Failed to send to RabbitMQ:", error);
      return reply.code(500).send({ error: "Failed to queue notification" });
    }
}
export default invitePlayer;
