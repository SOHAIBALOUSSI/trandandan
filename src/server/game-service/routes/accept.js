
const Accept = async (req, reply, fastify) => {
  try{
      const {roomId, senderId, receiverId } = req.body;
      if (!roomId || !senderId || !receiverId)
        return reply.code(400).send({ error: "Missing fields" });

      const redis = fastify.redis; // Access the Redis client from Fastify instance
      if (!redis) {
        console.error("Redis client is not available");
        return reply.code(500).send({ error: "Redis client is not available" });
      }

      let isBlocked = redis.sIsMember(`blocker:${senderId}`, `${receiverId}`) // Check is there is a block relationship between users first
      if (!isBlocked)
        isBlocked = redis.sIsMember(`blocker:${receiverId}`, `${senderId}`)
      if (isBlocked)
        return reply.code(400).send({ error: "Block exists" });

      redis.set(`invite:${receiverId}`, roomId, 'EX', 60 * 5); // Store the invite for 5 minutes
  
      console.log("Invite retrieved from Redis:", roomId);
      return reply.code(200).send({ message: "Invite accepted", roomId, receiverId });
    } catch (error) {
        console.error("Error accepting invite:", error);
        return reply.code(500).send({ error: "Internal server error" });
    }
}
export default Accept;