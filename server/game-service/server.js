
import Fastify from "fastify";
import websocket from "@fastify/websocket";
// import cors from "@fastify/cors";
import redisPlugin from "./routes/redis.js";
import { verifyToken, verifyWSToken } from "./routes/authMiddleware.js";

const fastify = Fastify();

fastify.register(redisPlugin);
// fastify.register(cors, {
//   origin: "*", // Allow all origins
//   methods: ["GET", "POST", "DELETE"], // Allow specific HTTP methods
//   allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
// });

fastify.register(websocket);

// local games
import { localGame } from "./routes/localGameRoute.js";
fastify.register(async function (fastify) {
  fastify.get("/game/ws", { websocket: true }, (connection, req) => {
    localGame(connection)
  });
});



// remote games route
import { remoteGame } from "./routes/remoteGameRoute.js";
// ...existing code...
fastify.register(async function (fastify) {
  fastify.get("/game/remoteGame", { websocket: true }, async (socket, req) => {
    try {
      console.log("WebSocket connection attempt - verifying token...");
      
      socket.userId = null; // Initialize userId
      socket.isAuthenticated = false; // Initialize authentication status
      // Verify the token first
      await verifyWSToken(socket, req, fastify.redis);
            
      // Check if the socket is still open after verification
      if (socket.readyState !== socket.OPEN) {
        console.log("Socket closed during verification");
        return;
      }
      remoteGame(socket, req);
      
    } catch (error) {
      console.error("Error in WebSocket route:", error);
      if (socket.readyState === socket.OPEN) {
        socket.close(3000, 'Authentication failed');
      }
    }
  });
});
// ...existing code...
// route to store the game stats
import savePlayerData  from "./routes/storePlayerData.js";
fastify.register(async function name(fastify) {
  fastify.post("/game/storePlayerData", { preHandler: [verifyToken] },(req, reply) => {
    savePlayerData(req, reply);
  });
});

import invitePlayer from './routes/invite.js';
fastify.register(async function name(fastify) {
  fastify.post("/game/invite", { preHandler: [verifyToken] }, async (req, reply) => {
    return invitePlayer(req, reply, fastify);
  });
});

import Accept from "./routes/accept.js";
fastify.register(async function name(fastify) {
  fastify.post("/game/accept", { preHandler: [verifyToken] }, async (req, reply) => {
    return Accept(req, reply, fastify);
  });
});

import getRoomId from "./routes/getRoomId.js";
fastify.register(async function name(req, reply) {
  fastify.post("/game/getRoomId", { preHandler: [verifyToken] }, async (req, reply) => {
    return getRoomId(req, reply, fastify);
  });
});

import getUserHistory from "./routes/getUserHistory.js";
fastify.register(async function name(fastify) {
  fastify.post("/game/user-history", { preHandler: [verifyToken] },async (req, reply) => {
    return getUserHistory(req, reply);
  });
});

import getData  from "./routes/gethistroy.js";
fastify.register(async function name(fastify) {
  fastify.get("/game/getData", { preHandler: [verifyToken] },async (req, reply) => {
    return getData(req, reply);
  });
});

import getLastMatchByUser from "./routes/getLastMatch.js";
fastify.register(async function name(fastify) {
  fastify.get("/game/last-match/:userName", { preHandler: [verifyToken] }, async (req, reply) => {
    return getLastMatchByUser(req, reply);
  });
});

import getCount from "./routes/getCount.js";
fastify.register(async function name(fastify) {
  fastify.get("/game/user-stats/:userName", { preHandler: [verifyToken] },async (req, reply) => {
    return getCount(req, reply);
  });
});
import recentAtivity from "./routes/recentActivity.js";
fastify.register(async function (fastify) {
  fastify.get("/game/recent-activity", { websocket: true }, (connection, req) => {
     recentAtivity(connection, req);
  });
});
fastify.listen({ port: 5000 , host: '0.0.0.0'}, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
