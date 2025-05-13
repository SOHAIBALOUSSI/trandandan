"use strict";

import Fastify from "fastify";
import websocket from "@fastify/websocket";
import cors from "@fastify/cors";

const fastify = Fastify();

fastify.register(cors, {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
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

fastify.listen({ port: 5000 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
