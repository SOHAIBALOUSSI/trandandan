import { createNotificationsTable } from "./database/initDatabase.js";
import RabbitMQClient from "./libs/rabbitMQ.js";
import { WebSocketServer, WebSocket } from 'ws';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';


let db;

(async () => {
  try {
    db = await open({
      filename: './notifications.db.sqlite',
      driver: sqlite3.Database
    });
    console.log('Database connected.');

    await createNotificationsTable(db);
  } catch (error) {
    console.error('Failed to connect to database or create table:', error);
    process.exit(1);
  }
})();

const users = new Map();

const wss = new WebSocketServer({ port: 3003 });

const rabbit = new RabbitMQClient(process.env.RABBITMQ_QUEUE_NAME);

await rabbit.connect();

wss.on('connection', (ws, req) => {
  console.log('WebSocket: Client connected.');
  //JWT authentication
  if (!users.has(message.userId))
    users.set(message.userId, new Set());
  users.get(message.userId).add(ws);
  ws.userId = message.userId;
  //fetch unread + undelivered notifications and send them

  ws.on('error', (error) => {
    console.error('WebSocket: Client error:', error);
  });

  ws.on('close', () => {
    console.log('WebSocket: Client disconnected.');
    if (ws.userId && users.has(ws.userId)) {
      users.get(ws.userId).delete(ws);
      if (users.get(ws.userId).size === 0) 
        users.delete(ws.userId);
    }
  })

});

rabbit.consumeMessages(async (payload) =>{
  console.log('RabbitMQ: payload received: ', payload);
  const userId = payload.userId;
  if (userId) {
    const connections = users.get(userId);
    if (connections) {
      const message = JSON.stringify(payload);
      for (const conn of connections) {
        if (conn.readyState === WebSocket.OPEN)
          conn.send(message);
      }
      //store messafe in database as in delivered but not read
    }
    //else
    //store message in database as in not read and not delivered
  }
})

wss.on('error', (error) => {
  console.error('WebSocket: Server error:', error);
  process.exit(1);
});