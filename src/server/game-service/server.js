
import Fastify from "fastify";
import websocket from "@fastify/websocket";
import cors from "@fastify/cors";
import { getUserCookies } from "./routes/cookies.js";
import  RabbitMGame  from "./routes/RabbitMGame.js"

const fastify = Fastify();

fastify.register(cors, {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "DELETE"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
});

fastify.register(websocket);

// local games
import { localGame } from "./routes/localGameRoute.js";
fastify.register(async function (fastify) {
  fastify.get("/ws", { websocket: true }, (connection, req) => {
    localGame(connection)
  });
});



// remote games route
import { remoteGame } from "./routes/remoteGameRoute.js";
fastify.register(async function (fastify) {
  fastify.get("/remoteGame", { websocket: true }, (connection, req) => {
    console.log("here")
    console.log(getUserCookies(req))
    remoteGame(connection, req);
  });
});

// route to store the game stats
import { savePlayerData } from "./routes/storePlayerData.js";
fastify.register(async function name(fastify) {
  fastify.post("/storePlayerData", (req, reply) => {
    savePlayerData(req, reply);
  });
});

fastify.register(async function name(fastify) {
  fastify.post("/invite", async (req, reply) => {
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
  });
});


fastify.listen({ port: 5000 , host: '0.0.0.0'}, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
