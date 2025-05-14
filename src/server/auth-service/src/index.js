import dotenv from 'dotenv';
import { db } from './libs/sqlite.js'
import { createUserTable } from './database/createUserTable.js';
import RabbitMQClient from './libs/rabbitmq.js';
import { loginHandler, logoutHandler, meHandler, refreshHandler, registerHandler } from './handlers/authHandler.js';

dotenv.config();

await createUserTable(db);

const authQueue = new RabbitMQClient('auth');

await authQueue.connect();
await authQueue.consumeMessage(handleMessage);

const handleMessage = async (payload) => {
    switch (payload.type)
    {
        case 'REGISTER' : return registerHandler(payload);
        case 'LOGIN' : return loginHandler(payload);
        case 'LOGOUT' : return logoutHandler(payload);
        case 'ME' : return meHandler(payload);
        case 'REFRESH' : return refreshHandler(payload);
    }
}

