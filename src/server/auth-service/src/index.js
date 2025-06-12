import fastify from 'fastify';
import dotenv from 'dotenv';
import sqlitePlugin from './plugins/sqlite-plugin.js'
import jwtPlugin from './plugins/jwt-plugin.js'
import nodemailerPlugin from './plugins/nodemailer-plugin.js';
import { createUserTable } from './database/createUserTable.js';
import { createTokenTable } from './database/createTokenTable.js';
import { createTwoFaTable } from './database/createTwoFaTable.js';
import authRoutes from './routes/authRoutes.js';
import twoFARoutes from './routes/2FARoutes.js';
import { createOAuthIdentityTable } from './database/createOAuthIdentityTable.js';
import rabbitmqPlugin from './plugins/rabbitmq-plugin.js';
import { updateEmailById, updateUsernameById } from './models/userDAO.js';
import { findTwoFaByUid } from './models/twoFaDAO.js';

const server = fastify({logger: true});

dotenv.config();

await server.register(sqlitePlugin);
await server.register(jwtPlugin, {
    accessTokenKey: process.env.AJWT_SECRET_KEY,
    refreshTokenKey: process.env.RJWT_SECRET_KEY,
    tempTokenKey: process.env.TJWT_SECRET_KEY
});

await createUserTable(server.db);
await createTokenTable(server.db);
await createTwoFaTable(server.db);
await createOAuthIdentityTable(server.db);

await server.register(nodemailerPlugin);
await server.register(rabbitmqPlugin);

server.rabbit.consumeMessages(async (message) => {
    const { id, username, email } = message;
    if (username)
        await updateUsernameById(server.db, username, id);
    if (email) {
        const twoFa = await findTwoFaByUid(server.db, id);
        if (twoFa)
                
        await updateEmailById(server.db, email, id);
    }
    console.log('Auth: user updated.');
});

await server.register(authRoutes, { prefix: '/auth' });
await server.register(twoFARoutes, { prefix: '/2fa' });
console.log("auth service initialization is done...");

const start = async () => {
    try {        
        await server.listen({ host: '0.0.0.0', port: 3000 });
        server.log.info("Server is listening on port 3000");
    }
    catch (err) {
        server.log.error(err);
        process.exit(1);
    }
};

start();

