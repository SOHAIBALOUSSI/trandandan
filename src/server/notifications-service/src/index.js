import RabbitMQClient from "./libs/rabbitMQ.js";
import { WebSocketServer } from 'ws';

const clients = new Set();

const wss = new WebSocketServer({ port: 3003 });
const rabbit = new RabbitMQClient('notifications');
await rabbit.connect();

wss.on('connection', (ws) => {
  ws.on('error', console.error);

  ws.on('open', () => {
    clients.add(ws);
  });

  ws.on('message', (data) => {
    console.log('received: %s', data);
    ws.send('something');
  });

  ws.on('close', () => {
    clients.delete(ws);
  })

});

rabbit.consumeMessages((payload) => console.log('payload: ', payload));