import dotenv from 'dotenv';
import { db } from './libs/sqlite.js'
import { createUserTable } from './database/createUserTable.js';
import RabbitMQClient from './libs/rabbitmq.js';
import { loginHandler, logoutHandler, meHandler, refreshHandler, registerHandler } from './handlers/authHandler.js';

dotenv.config();

await createUserTable(db);

const authQueue = new RabbitMQClient('auth');

await authQueue.connect();

const context = { db };

const handleMessage = async (payload) => {
    switch (payload.type)
    {
        case 'REGISTER' : return registerHandler(context, payload, authQueue);
        case 'LOGIN' : return loginHandler(context, payload);
        case 'LOGOUT' : return logoutHandler(context, payload);
        case 'ME' : return meHandler(context, payload);
        case 'REFRESH' : return refreshHandler(context, payload);
        default: return { code: 400, error: 'Unknown message type.' };
    }
}

await authQueue.consumeMessage(handleMessage);
