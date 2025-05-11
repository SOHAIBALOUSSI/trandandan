"use strict";
// const fastify = require('fastify')();
import Fastify from "fastify";
import websocket from "@fastify/websocket";
import Ajv from "ajv";
import cors from "@fastify/cors"; 


const fastify = Fastify();
const ajv = new Ajv();


fastify.register(cors, {
  origin: "*", // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
});



// local game
const messageSchema = {
  type: "object",
  required: [
    "paddleLeftY",
    "paddelRightY",
    "ballX",
    "ballY",
    "gameStat",
    "keypressd",
  ],
  properties: {
    paddleLeftY: { type: "number" },
    paddelRightY: { type: "number" },
    ballX: { type: "number" },
    ballY: { type: "number" },
    gameStat: { type: "number" },
    keypressd: { type: "array", items: { type: "string" } },
    rightPlayerScore: { type: "number" },
    rightPlayerScore: { type: "number" },
  },
};
const validateMessage = ajv.compile(messageSchema);

let flagX = false;
let flagY = false;
let ballSpeed = 5;
let count = 0;

fastify.register(websocket);

// local games
fastify.register(async function (fastify) {
  fastify.get("/ws", { websocket: true }, (connection, req) => {
    connection.on("close", () => {
      console.log("Client disconnected");
    });
    connection.on("message", (msg) => {
      let obj;

      try {
        obj = JSON.parse(msg);
      } catch (error) {
        connection.send(JSON.stringify({ error: "Invalid JSON format" }));
        return;
      }

      if (!validateMessage(obj)) {
        console.log(obj);
        connection.send(JSON.stringify({ error: "Invalid JSONf format" }));
        return;
      }

      // console.log('Client says:', obj);
      let step = 10;
      if (obj.keypressd.includes("w")) obj.paddleLeftY -= step;
      if (obj.keypressd.includes("s")) obj.paddleLeftY += step;

      if (obj.keypressd.includes("ArrowDown")) obj.paddelRightY += step;
      if (obj.keypressd.includes("ArrowUp")) obj.paddelRightY -= step;

      if (
        flagX ||
        (obj.ballX >= 890 &&
          obj.ballY >= obj.paddelRightY &&
          obj.ballY <= obj.paddelRightY + 150)
      ) {
        if (
          obj.ballX >= 890 &&
          obj.ballY >= obj.paddelRightY &&
          obj.ballY <= obj.paddelRightY + 150
        ) {
          count++;
          if (count === 2) {
            ballSpeed += 2;
            count = 0;
          }
        }
        (obj.ballX -= ballSpeed), (flagX = true);
      }
      if (
        !flagX ||
        (obj.ballX <= 0 &&
          obj.ballY >= obj.paddleLeftY &&
          obj.ballY <= obj.paddleLeftY + 150)
      ) {
        (obj.ballX += ballSpeed), (flagX = false);
      }

      if (obj.ballY >= 600 || flagY) (obj.ballY -= ballSpeed), (flagY = true);
      if (obj.ballY <= 0 || !flagY) (obj.ballY += ballSpeed), (flagY = false);

      obj.keypressd = [];

      if (obj.ballX > 900 || obj.ballX <= 0) {
        if (obj.ballX > 900) obj.leftPlayerScore += 1;
        if (obj.ballX <= 0) obj.rightPlayerScore += 1;
        obj.paddleLeftY = 240;
        obj.paddelRightY = 240;
        obj.ballX = 900 / 2;
        obj.ballY = 300;
        ballSpeed = 5;
      }
      connection.send(JSON.stringify(obj));
    });
  });
});

//-------------------------------- remote games





// remote games route
import { remoteGame } from "./routes/remoteGameRoute.js";
fastify.register(async function (fastify) {
  fastify.get("/remoteGame", { websocket: true }, (connection, req) => {
    remoteGame(connection, req);
  });
});

// route to store the game stats

import { savePlayerData } from "./routes/storePlayerData.js";
import Database from 'better-sqlite3';

const db = new Database('/home/ousabbar/Desktop/trandenden/gameTest/db/.gameData.db');
fastify.register(async function name(fastify) {
  fastify.post('/storePlayerData', (req, reply) => {
    return savePlayerData(req, reply, db);
  })  
})

fastify.listen({ port: 5000 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
