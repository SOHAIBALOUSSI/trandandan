import dotenv from 'dotenv';
import { db } from './plugins/sqlite-plugin.js'
import { createProfileTable } from './database/createProfileTable.js';
import RabbitMQClient from './libs/rabbitmq.js';
import { createProfile, getProfile, updateProfile } from './handlers/profileHandler.js';

dotenv.config();

await createProfileTable(db);

const profileQueue = new RabbitMQClient('profile');

await profileQueue.connect();

const context = { db };

const handleMessage = async (payload) => {
    switch (payload.type)
    {
        case 'CREATE' : return createProfile(context, payload);
        case 'UPDATE' : return updateProfile(context, payload);
        case 'GET' : return getProfile(context, payload);
        default: return { code: 400, error: 'Unknown message type.' };
    }
}

await profileQueue.consumeMessage(handleMessage);