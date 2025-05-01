'use strict';
// const fastify = require('fastify')();
import Fastify from 'fastify';
import websocket from '@fastify/websocket';
import Ajv from 'ajv';


const fastify = Fastify();
const ajv = new Ajv();

const messageSchema = {
  type: 'object',
  required: ['paddleLeftY', 'paddelRightY', 'ballX', 'ballY', 'gameStat', 'keypressd'],
  properties: {
    paddleLeftY: {type: 'number'},
    paddelRightY: {type: 'number'},
    ballX: {type: 'number'},
    ballY: {type: 'number'},
    gameStat: {type: 'number'},
    keypressd: {type: 'array', items: {type: "string"}}
  },
}
const validateMessage = ajv.compile(messageSchema);

let flagX = false;
let flagY = false;
let ballSpeed = 2;

fastify.register(websocket);

// local games
fastify.register(async function (fastify) {
  fastify.get('/ws', { websocket: true }, (connection, req) => {

    connection.on('close', () => {
      console.log('Client disconnected');
    });
    connection.on('message', (msg) => {
      let obj;

      try {
        obj = JSON.parse(msg);
      } catch (error) {
        connection.send(JSON.stringify({ error: 'Invalid JSON format' }));
        return;
      }

      if (!validateMessage(obj))
      {
        console.log(obj);
        connection.send(JSON.stringify({ error: 'Invalid JSONf format' }));
        return;
      }

      // console.log('Client says:', obj);
      
      if (obj.keypressd.includes("w"))
        obj.paddleLeftY -= 8;
      if (obj.keypressd.includes("s"))
        obj.paddleLeftY += 8;

      if (obj.keypressd.includes("ArrowDown"))
        obj.paddelRightY += 8;
      if (obj.keypressd.includes("ArrowUp"))
        obj.paddelRightY -= 8;


      
      if (flagX || (obj.ballX >= 890 && obj.ballY >= obj.paddelRightY && obj.ballY <= (obj.paddelRightY + 150)))
        obj.ballX -= ballSpeed, flagX = true;
      if (!flagX || (obj.ballX <= 0 && obj.ballY >= obj.paddleLeftY && obj.ballY <= (obj.paddleLeftY + 150)))
        obj.ballX += ballSpeed, flagX = false;
          
      if (obj.ballY >= 600 || flagY)
        obj.ballY -= ballSpeed, flagY = true;
      if (obj.ballY <= 0 || !flagY)
        obj.ballY += ballSpeed, flagY = false;
      
      obj.keypressd = [];

      if (obj.ballX > 900 || obj.ballX <= 0)
      {
        obj.paddleLeftY = 240;
        obj.paddelRightY = 240;
        obj.ballX = 900 / 2; 
        obj.ballY = 300;
      }
          
      connection.send(JSON.stringify(obj));
    });
  });
});







//-------------------------------- remote games
function gameLogic(gameState) {

  let step = 8;
  if (gameState.keypressd[0] === "w" && gameState.playerId === 1 && gameState.paddleLeftY > 0)
    gameState.paddleLeftY -= step;
  if (gameState.keypressd[0] === "s" && gameState.playerId === 1 && gameState.paddleLeftY < 600 - 150)
      gameState.paddleLeftY += step;

  if (gameState.keypressd[0] === "w" && gameState.playerId === 2 && gameState.paddelRightY > 0)
      gameState.paddelRightY -= step
  if (gameState.keypressd[0] === "s" && gameState.playerId === 2 && gameState.paddelRightY < 600 - 150)
      gameState.paddelRightY += step;

  if (flagX || (gameState.ballX >= 890 && gameState.ballY >= gameState.paddelRightY && gameState.ballY <= (gameState.paddelRightY + 150)))
    gameState.ballX -= ballSpeed, flagX = true;
  if (!flagX || (gameState.ballX <= 0 && gameState.ballY >= gameState.paddleLeftY && gameState.ballY <= (gameState.paddleLeftY + 150)))
    gameState.ballX += ballSpeed, flagX = false;

      
  if (gameState.ballY >= 600 || flagY)
    gameState.ballY -= ballSpeed, flagY = true;
  if (gameState.ballY <= 0 || !flagY)
    gameState.ballY += ballSpeed, flagY = false;
  
  gameState.keypressd = [];

  if (gameState.ballX > 900 || gameState.ballX <= 0)
  {
    gameState.paddleLeftY = 240;
    gameState.paddelRightY = 240;
    gameState.ballX = 900 / 2; 
    gameState.ballY = 300;
  }
  return gameState;
}

const rooms = {};

function generateNewRoomId(params) {
  let roomId = "";
  
  const stringOfChar = "abcdefghijklmnopqrstuvwxyz0123456789";
  
  for (let index = 0; index < 12; index++) {
    roomId += stringOfChar[Math.floor(Math.random() * stringOfChar.length)]; 
  }
  return roomId;
}



fastify.register(async function (fastify) {
  fastify.get('/remoteGame', { websocket: true }, (connection) => {
      let roomId;
      let joined = false;


      for (const [id, connections] of Object.entries(rooms)) {
          if (connections.length < 2) {
              roomId = id;
              connections.push(connection);
              joined = true;
              break;
          }
      }

      if (!joined) {
          roomId = generateNewRoomId();
          rooms[roomId] = [connection];
      }

      if (rooms[roomId].length === 2) {
          const [player1, player2] = rooms[roomId];
          
          const handleMessage = (player, playerId) => (msg) => {
              try {
                  const gameState = JSON.parse(msg);
                  gameState.playerId = playerId;
                  const updatedState = gameLogic(gameState);
                  player1.send(JSON.stringify(updatedState));
                  player2.send(JSON.stringify(updatedState));
              } catch (error) {
                  console.error('Invalid JSON format', error);
              }
          };

          player1.on('message', handleMessage(player1, 1));
          player2.on('message', handleMessage(player2, 2));

          player1.on('close', (msg) => {
            console.log('player1 disconnected');
          })
          player2.on('close', () => {
            console.log('player2 disconnected');
          })
      }
  });
});

fastify.listen({ port: 5000}, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

