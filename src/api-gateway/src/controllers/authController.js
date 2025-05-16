
async function loginController(request, reply) {
    reply.hijack();
    try {
        
        const message = {
            type: 'LOGIN',
            data: request.body
        }
        
        const response = await request.server.rabbitmq.rpcMessage('auth', message);
        if (!response || !response.code)
            return reply.code(500).send({ error: 'Internal Server Error' });
        
        return (reply.code(response.code).send(response));
    } catch (error) {
        return reply.code(500).send({ error: 'Internal Server Error' })   
    }
}

async function registerController(request, reply) {
    reply.hijack();
    try {
        
        const message = {
            type: 'REGISTER',
            data: request.body
        }
        
        const response = await request.server.rabbitmq.rpcMessage('auth', message);
        if (!response || !response.code)
            return reply.code(500).send({ error: 'Internal Server Error' });
        
        return (reply.code(response.code).send(response));
    } catch (error) {
        return reply.code(500).send({ error: 'Internal Server Error' })   
    }
}

async function logoutController(request, reply) {
    reply.hijack();
    try {
        
        const message = {
            type: 'LOGOUT',
            user: request.user,
            data: request.body
        }
        
        const response = await request.server.rabbitmq.rpcMessage('auth', message);
        if (!response || !response.code)
            return reply.code(500).send({ error: 'Internal Server Error' });
        
    } catch (error) {
        return reply.code(500).send({ error: 'Internal Server Error' })   
    }
    return (reply.code(response.code).send(response));
}

async function meController(request, reply) {
    reply.hijack();
    try {
        
        const message = {
            type: 'ME',
            user: request.user
        }
        
        const response = await request.server.rabbitmq.rpcMessage('auth', message);
        if (!response || !response.code)
            return reply.code(500).send({ error: 'Internal Server Error' });
        
        return (reply.code(response.code).send(response));
    } catch (error) {
        return reply.code(500).send({ error: 'Internal Server Error' })   
    }
}

async function refreshController(request, reply) {
    reply.hijack();
    try {
        
        const message = {
            type: 'LOGIN',
            data: request.body
        }
        
        const response = await request.server.rabbitmq.rpcMessage('auth', message);
        if (!response || !response.code)
            return reply.code(500).send({ error: 'Internal Server Error' });
        
        return (reply.code(response.code).send(response));
    } catch (error) {
        return reply.code(500).send({ error: 'Internal Server Error' })   
    }
}
