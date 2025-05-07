"use strict";
// const fastify = require('fastify')();
import Fastify from "fastify";
import websocket from "@fastify/websocket";
import Ajv from "ajv";

const fastify = Fastify();
const ajv = new Ajv();

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
let ballSpeed = 2;
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
const rooms = {};

function gameLogic(gameState) {
  let step = 8;
  if (
    gameState.keypressd[0] === "w" &&
    gameState.playerId === 1 &&
    gameState.paddleLeftY > 0
  )
    gameState.paddleLeftY -= step;
  if (
    gameState.keypressd[0] === "s" &&
    gameState.playerId === 1 &&
    gameState.paddleLeftY < 600 - 150
  )
    gameState.paddleLeftY += step;

  if (
    gameState.keypressd[0] === "w" &&
    gameState.playerId === 2 &&
    gameState.paddelRightY > 0
  )
    gameState.paddelRightY -= step;
  if (
    gameState.keypressd[0] === "s" &&
    gameState.playerId === 2 &&
    gameState.paddelRightY < 600 - 150
  )
    gameState.paddelRightY += step;

  if (
    gameState.flagX ||
    (gameState.ballX >= 890 &&
      gameState.ballY >= gameState.paddelRightY &&
      gameState.ballY <= gameState.paddelRightY + 150)
  ) {
    if (
      gameState.ballX >= 890 &&
      gameState.ballY >= gameState.paddelRightY &&
      gameState.ballY <= gameState.paddelRightY + 150
    ) {
      gameState.hitCount++;
      if (gameState.hitCount === 2) {
        gameState.ballSpeed += 2;
        gameState.hitCount = 0;
      }
    }
    (gameState.ballX -= gameState.ballSpeed), (gameState.flagX = true);
  }
  if (
    !gameState.flagX ||
    (gameState.ballX <= 0 &&
      gameState.ballY >= gameState.paddleLeftY &&
      gameState.ballY <= gameState.paddleLeftY + 150)
  )
    (gameState.ballX += gameState.ballSpeed), (gameState.flagX = false);

  if (gameState.ballY >= 600 || gameState.flagY)
    (gameState.ballY -= gameState.ballSpeed), (gameState.flagY = true);
  if (gameState.ballY <= 0 || !gameState.flagY)
    (gameState.ballY += gameState.ballSpeed), (gameState.flagY = false);

  gameState.keypressd = [];

  if (gameState.ballX > 900 || gameState.ballX <= 0) {
    if (gameState.ballX > 900) gameState.leftPlayerScore += 1;
    if (gameState.ballX <= 0) gameState.rightPlayerScore += 1;

    gameState.paddleLeftY = 240;
    gameState.paddelRightY = 240;
    gameState.ballX = 900 / 2;
    gameState.ballY = 300;
    gameState.ballSpeed = 3;
  }
  return gameState;
}

function generateNewRoomId(params) {
  let roomId = "";

  const stringOfChar = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (let index = 0; index < 12; index++) {
    roomId += stringOfChar[Math.floor(Math.random() * stringOfChar.length)];
  }
  return roomId;
}

fastify.register(async function (fastify) {
  fastify.get("/remoteGame", { websocket: true }, (connection, req) => {
    let roomId;
    const token = req.query.token;
    let joined = false;

    for (const [id] of Object.entries(rooms)) {
      rooms[id].players.forEach((player) => {
        if (player.token == token) {
          player.connection = connection;
          rooms[id].gameState.disconnected = true; // reconnnected
          rooms[id].gameState.alive = true;
          joined = true;
          roomId = id;
          return true;
        }
      });

      if (rooms[id].players.length < 2 && !joined) {
        rooms[id].players.push({ token: token, connection: connection });
        joined = true;
        roomId = id;
        break;
      }
    }

    if (!joined) {
      roomId = generateNewRoomId();
      rooms[roomId] = {
        players: [{ token: token, connection: connection }],
        gameState: {
          playerId: 1,
          ballX: 0,
          ballY: 0,
          flagX: false,
          flagY: false,
          paddleLeftY: 240,
          paddelRightY: 240,
          keypressd: [],
          disconnected: false,
          leftPlayerScore: 0,
          rightPlayerScore: 0,
          rounds: 5,
          ballSpeed: 3,
          hitCount: 0,
          gameEnd: "",
          restart: false,
          alive: true
        },
      };
    }
    if (rooms[roomId].players.length === 2) {
      const [
        { toke1: token1, connection: player1 },
        { token2: token2, connection: player2 },
      ] = rooms[roomId].players;

      const handleMessage = (playerId) => (msg) => {
        try {
          // parse the game stat from the client
          const gameState = JSON.parse(msg);

          // stop the game after it ends
          if (gameState.restart) {
            delete rooms[roomId];
            player1.close();
            player2.close();
            return ;
          }
            // check if the client reconnected so i will not give him the startUp game stat
          if (!rooms[roomId].gameState.disconnected) {
            rooms[roomId].gameState = gameState;
          }
          rooms[roomId].gameState.keypressd = gameState.keypressd;
          rooms[roomId].gameState.playerId = playerId;

          // game logic 
          const updatedState = gameLogic(rooms[roomId].gameState);

          // check score
          if (updatedState.rightPlayerScore === updatedState.rounds) {
            updatedState.gameEnd = "You Lost";
            player1.send(JSON.stringify(updatedState));
            updatedState.gameEnd = "You Won";
            player2.send(JSON.stringify(updatedState));
            return;
          }
          if (updatedState.leftPlayerScore === updatedState.rounds) {
            updatedState.gameEnd = "You Won";
            player1.send(JSON.stringify(updatedState));
            updatedState.gameEnd = "You Lost";
            player2.send(JSON.stringify(updatedState));
            return;
          }
          player1.send(JSON.stringify(updatedState));
          player2.send(JSON.stringify(updatedState));

        } catch (error) {
          console.error("Invalid JSON format", error);
        }
      };

      // socket message event
      player1.on("message", handleMessage(1));
      player2.on("message", handleMessage(2));

      player1.on("close", () => {
        if (!rooms[roomId])
          return ;
        rooms[roomId].gameState.alive = false;
        setTimeout(() => {
            if (!rooms[roomId].gameState.alive)
            {
              player2.send("player 1 disconnected");
              delete rooms[roomId];
              player1.close();
              player2.close();
            }
          }, 5000);
          player1.removeAllListeners();
          player2.removeAllListeners();
      });

      player2.on("close", () => {
        if (!rooms[roomId])
          return ;
        rooms[roomId].gameState.alive = false;
        setTimeout(() => {
          if (!rooms[roomId].gameState.alive)
          {
            player1.send("player 2 disconnected");
            delete rooms[roomId];
            player2.close();
            player1.close();
          }

        }, 5000);

        player1.removeAllListeners();
        player2.removeAllListeners();
      });
    }
  });
});

fastify.listen({ port: 5000 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});
