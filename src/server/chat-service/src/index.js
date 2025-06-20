import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { createChatMessagesTable } from './database/initDatabase.js';
import RabbitMQClient from './libs/rabbitMQ.js';
import { WebSocketServer, WebSocket } from 'ws';
import { verifyToken } from './middleware/authMiddleware.js';
import dotenv from 'dotenv';
import { addMessage, deleteMessages, getAllMessages, getMessageById, markAsDelivered, markAsRead } from './database/chatMessagesDAO.js';

dotenv.config();
let db;

(async () => {
  try {
    db = await open({
      filename: './messages.db.sqlite',
      driver: sqlite3.Database
    });
    console.log('Database connected.');

    await createChatMessagesTable(db);
  } catch (error) {
    console.error('Failed to connect to database or create table:', error);
    process.exit(1);
  }
})();

const users = new Map();

const wss = new WebSocketServer({ port: 3004 });

const rabbit = new RabbitMQClient(process.env.RABBITMQ_CHAT_QUEUE);

await rabbit.connect();

wss.on('connection', async (ws, request) => {
    console.log('WebSocket: Client connected.');
    ws.isAuthenticated = false;
    ws.userId = null;
    verifyToken(ws, request);
    if (ws.userId) {
        if (!users.has(ws.userId))
            users.set(ws.userId, new Set());
        users.get(ws.userId).add(ws);
        const messages = await getAllMessages(db, ws.userId);
        if (messages) {
            for (const message of messages)
                ws.send(JSON.stringify(message));
        }
    }
    else {
        ws.close(3000, 'Unauthorized');
        return ;
    }


    ws.on('message', async (message) => {
        const payload = JSON.parse(message);
        if (payload.type === 'MESSAGE_SENT') {
            if (ws.isAuthenticated) {
                console.log('WebSocket: payload received: ', payload);
                const recipient = payload.recipient_id;
                console.log('WebSocket: recipient: ', recipient);
                if (recipient) {
                    if (recipient === ws.userId) {
                        ws.close(1008, 'Malformed payload');
                        return ;   
                    }
                    const messageId = await addMessage(db, payload);
                    const connections = users.get(recipient);
                    if (connections) {
                        for (const conn of connections) {
                            if (conn.isAuthenticated && conn.readyState === WebSocket.OPEN)
                                conn.send(JSON.stringify(payload));
                        }
                        await markAsDelivered(db, messageId);
                    }
                }
            } else {
                ws.close(3000, 'Unauthorized');
                return ;
            }
        }
        else if (payload.type === 'MESSAGE_READ') {
            if (ws.isAuthenticated) {
                console.log('WebSocket: payload received: ', payload);
                if (payload.id) {
                    const msg = await getMessageById(db, payload.id)
                    if (!msg) {
                        ws.close(1008, 'Malformed payload');
                        return ;
                    }
                    await markAsRead(db, msg.id);
                } else {
                    ws.close(1008, 'Malformed payload');
                    return ;
                }
            } else {
                ws.close(3000, 'Unauthorized');
                return ;
            }
        }
        else {
            ws.close(1008, 'Malformed payload');
            return ;
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


wss.on('error', (error) => {
    console.error('WebSocket: Server error:', error);
    process.exit(1);
});


rabbit.consumeMessages(async (request) => {
    if (request.type === 'DELETE') {
        const userId = request.userId;
        await deleteMessages(db, userId);
        users.get(userId).forEach((ws) => {
            ws.close(1010, 'Mandatory exit');
        });
    }
})