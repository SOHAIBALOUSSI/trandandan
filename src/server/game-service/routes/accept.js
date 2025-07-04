
const Accept = async (req, reply, fastify) => {
    const {roomId, senderId, receiverId } = req.body;
    try{
        const redis = fastify.redis; // Access the Redis client from Fastify instance
        if (!redis) {
          console.error("Redis client is not available");
          return reply.code(500).send({ error: "Redis client is not available" });
        }
        redis.set(`invite:${receiverId}`, roomId, 'EX', 60 * 5); // Store the invite for 5 minutes
    
        console.log("Invite retrieved from Redis:", roomId);
        if (!roomId || !receiverId) {
          return reply.code(400).send({ error: "Missing fields" });
        }
        return reply.code(200).send({ message: "Invite accepted", roomId, receiverId });
    } catch (error) {
        console.error("Error accepting invite:", error);
        return reply.code(500).send({ error: "Internal server error" });
    }
}
export default Accept;