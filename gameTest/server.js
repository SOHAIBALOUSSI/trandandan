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

fastify.register(websocket);

fastify.register(async function (fastify) {
  fastify.get('/ws', { websocket: true }, (connection, req) => {


    console.log('Client connected');
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

      console.log('Client says:', obj);
      
      if (obj.keypressd.includes("w"))
        obj.paddleLeftY -= 8;
      if (obj.keypressd.includes("s"))
        obj.paddleLeftY += 8;

      if (obj.keypressd.includes("ArrowDown"))
        obj.paddelRightY += 8;
      if (obj.keypressd.includes("ArrowUp"))
        obj.paddelRightY -= 8;


      let ballSpeed = 8;
      if (flagX || (obj.ballX >= 800 && obj.ballY >= obj.paddelRightY && obj.ballY <= (obj.paddelRightY + 150)))
        obj.ballX -= ballSpeed, flagX = true;
      if (!flagX || (obj.ballX <= 0 && obj.ballY >= obj.paddleLeftY && obj.ballY <= (obj.paddleLeftY + 150)))
        obj.ballX += ballSpeed, flagX = false;
          
      if (obj.ballY >= 600 || flagY)
        obj.ballY -= ballSpeed, flagY = true;
      if (obj.ballY <= 0 || !flagY)
        obj.ballY += ballSpeed, flagY = false;
      
      obj.keypressd = [];

      if (obj.ballX > 800 || obj.ballX <= 0)
      {
        obj.paddleLeftY = 240;
        obj.paddelRightY = 240;
        obj.ballX = 400; 
        obj.ballY = 300;
      }
          
      connection.send(JSON.stringify(obj));
    });
  });
});

fastify.listen({ port: 5000, host: '0.0.0.0' }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

