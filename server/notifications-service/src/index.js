import { createNotificationsTable } from "./database/initDatabase.js";
import RabbitMQClient from "./libs/rabbitMQ.js";
import { WebSocketServer, WebSocket } from 'ws';
import sqlite3 from 'sqlite3';
import dotenv from 'dotenv';
import { open } from 'sqlite';
import { addNotification, deleteNotifications, findNotification, getAllNotifications, markAsDelivered, markAsRead } from "./database/notificationsDAO.js";
import { verifyToken } from "./middleware/authMiddleware.js";
import { createClient } from 'redis';


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

let redis;
(async() => {
  try {
    redis = await createClient({
      url: 'redis://redis:6379'
    })
    .on("error", (err) => console.log("Redis Client Error", err))
    .connect();
    console.log('Redis is connected...', redis);
  } catch (error) {
    console.error('Failed to connect redis-server:', error);
    process.exit(1);
  }
})();

const users = new Map();

const wss = new WebSocketServer({ port: 3003 });

const rabbit = new RabbitMQClient(process.env.RABBITMQ_NOTIFICATION_QUEUE);

await rabbit.connect();

wss.on('connection', async (ws, request) => {
  console.log('WebSocket: Client connected.');
  await verifyToken(ws, request, redis);
  if (ws.isAuthenticated) {
    if (!users.has(ws.userId))
      users.set(ws.userId, new Set());
    users.get(ws.userId).add(ws);
    const notifications = await getAllNotifications(db, ws.userId);
    if (notifications && ws.readyState === WebSocket.OPEN) {
      for (const notification of notifications) {
        notification.notification_ids = JSON.parse(notification.notification_ids);
        console.log("On connection notification: ", notification);
        ws.send(JSON.stringify(notification));  
      }
    }
  }
  else {
    ws.close(3000, 'Unauthorized');
    return ;
  }

  ws.on('message', async(message) => {
    if (!ws.isAuthenticated) {
      ws.close(3000, 'Unauthorized');
      return ;
    }

    const payload = JSON.parse(message);
    if (payload.type === 'NOTIFICATION_READ') {
      console.log('WebSocket: payload received: ', payload);
      if (payload.notification_ids) {
        payload.notification_ids.forEach(async (notificationId) => {
          const notification = await findNotification(db, notificationId);
          if (!notification)
            return ;
          
          const isRead = await markAsRead(db, notificationId);
          if (!isRead)
            return ;
          console.log(`Notification with id ${notificationId} is marked read...`);
        })
        }
      }
    }
    
  )

  ws.on('error', (error) => {
    console.error('WebSocket: Client error:', error);
  });

  ws.on('close', () => {
    console.log('WebSocket: Client disconnected.');
    if (ws.isAuthenticated && users.has(ws.userId)) {
      users.get(ws.userId).delete(ws);
      if (users.get(ws.userId).size === 0) 
        users.delete(ws.userId);
    }
  })

});

rabbit.consumeMessages(async (notification) =>{
  if (notification.type === 'DELETE') {
    const userId = notification.userId;
    const idExist = await redis.sIsMember('userIds', `${userId}`);
    console.log('idExist value: ', idExist);
    if (!idExist)
      return ;
    await deleteNotifications(db, userId);
    users.get(userId)?.forEach((ws) => {
      ws.close(1010, 'Mandatory exit');
    });
  }
  else {
    console.log('RabbitMQ: notification received: ', notification);
    const recipient = notification.recipient_id;
    const idExist = await redis.sIsMember('userIds', `${recipient}`);
    console.log('idExist value: ', idExist);
    if (!idExist) 
      return ;
    console.log('RabbitMQ: recipient: ', recipient);
    if (recipient) {
      const notificationId = await addNotification(db, notification);
      notification.notification_id = notificationId;
      console.log('Notification before sending: ', notification);
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
  }
})

wss.on('error', (error) => {
  console.error('WebSocket: Server error:', error);
  process.exit(1);
});

const handleShutDown = async (signal) => {
    try {
        console.log(`Caught a signal or type ${signal}`);
        await rabbit.close();
        await redis.close();
        await db.close();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}
process.on('SIGINT', handleShutDown);
process.on('SIGTERM', handleShutDown);
