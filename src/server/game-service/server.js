
import Fastify from "fastify";
import websocket from "@fastify/websocket";
import cors from "@fastify/cors";
import redisPlugin from "./routes/redis.js";
const fastify = Fastify();

fastify.register(redisPlugin);
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
      const { token, roomId } = req.query;
  console.log("Token:", token);
  console.log("Room ID:", roomId);
    remoteGame(connection, req);
  });
});

// route to store the game stats
import savePlayerData  from "./routes/storePlayerData.js";
fastify.register(async function name(fastify) {
  fastify.post("/storePlayerData", (req, reply) => {
    savePlayerData(req, reply);
  });
});

import invitePlayer from './routes/invite.js';
fastify.register(async function name(fastify) {
  fastify.post("/invite", async (req, reply) => {
    return invitePlayer(req, reply, fastify);
  });
});

import Accept from "./routes/accept.js";
fastify.register(async function name(fastify) {
  fastify.post("/accept", async (req, reply) => {
    return Accept(req, reply, fastify);
  });
});
import getRoomId from "./routes/getRoomId.js";
fastify.register(async function name(req, reply) {
  fastify.post("/getRoomId", async (req, reply) => {
    return getRoomId(req, reply, fastify);
  });
});
import getUserHistory from "./routes/getUserHistory.js";
fastify.register(async function name(fastify) {
  fastify.get("/user-history", async (req, reply) => {
    return getUserHistory(req, reply);
  });
});
import getData  from "./routes/gethistroy.js";
fastify.register(async function name(fastify) {
  fastify.get("/getData", async (req, reply) => {
    return getData(req, reply);
  });
});
import getLastMatchByUser from "./routes/getLastMatch.js";
fastify.register(async function name(fastify) {
  fastify.get("/last-match/:userName", async (req, reply) => {
    return getLastMatchByUser(req, reply);
  });
});
import getCount from "./routes/getCount.js";
fastify.register(async function name(fastify) {
  fastify.get("/user-stats/:userName", async (req, reply) => {
    return getCount(req, reply);
  });
});
fastify.listen({ port: 5000 , host: '0.0.0.0'}, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
