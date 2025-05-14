import dotenv from 'dotenv';
import { db } from './plugins/sqlite-plugin.js'
import { createProfileTable } from './database/createProfileTable.js';

const server = fastify({ logger: true });

dotenv.config();

await server.register(sqlitePlugin);

await createProfileTable(db);


