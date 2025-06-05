import { createNotificationsTable } from "./database/initDatabase.js";
import RabbitMQClient from "./libs/rabbitMQ.js";
import { WebSocketServer, WebSocket } from 'ws';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
import { open } from 'sqlite';
import { addNotification, getAllNotifications, markAsDelivered } from "./database/notificationsDAO.js";
import { verifyToken } from "./middleware/authMiddleware.js";


dotenv.config();

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

wss.on('connection', (ws) => {
  console.log('WebSocket: Client connected.');

  ws.on('message', async (message) => {
    const payload = JSON.parse(message);
    if (payload.type === 'AUTHENTICATION') {
      console.log(`WebSocker: Received this message:`, payload);
      verifyToken(ws, payload.token);
      if (ws.userId) {

        if (!users.has(ws.userId))
          users.set(ws.userId, new Set());
        users.get(ws.userId).add(ws);
        const notifications = await getAllNotifications(db, ws.userId);
        if (notifications) {
          for (const notification of notifications)
            ws.send(JSON.stringify(notification));  
        }
      }
      else 
        ws.close(1008, 'Unauthorized');
    }
  })

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

rabbit.consumeMessages(async (notification) =>{
  console.log('RabbitMQ: notification received: ', notification);
  const recipient = notification.to;
  console.log('RabbitMQ: recipient: ', recipient);
  if (recipient) {
    const notificationId = await addNotification(db, notification);
    const connections = users.get(recipient);
    if (connections) {
      const message = JSON.stringify(notification);
      for (const conn of connections) {
        if (conn.isAuthenticated && conn.readyState === WebSocket.OPEN)
          conn.send(message);
      }
      await markAsDelivered(db, notificationId);
    }
  }
})

wss.on('error', (error) => {
  console.error('WebSocket: Server error:', error);
  process.exit(1);
});