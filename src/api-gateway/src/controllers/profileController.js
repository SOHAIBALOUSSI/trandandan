async function createProfileController(request, reply) {
    reply.hijack();
    try {
        
        const message = {
            type: 'CREATE',
            data: request.body
        }
        
        const response = await request.server.rabbitmq.rpcMessage('profile', message);
        if (!response || !response.code)
            return reply.code(500).send({ error: 'Internal Server Error' });
        
        return (reply.code(response.code).send(response));
    } catch (error) {
        return reply.code(500).send({ error: 'Internal Server Error' })
    }
}

async function getProfileController(request, reply) {
    reply.hijack();
    try {
        
        const message = {
            type: 'GET',
            data: { id: request.params.id }
        }
        
        const response = await request.server.rabbitmq.rpcMessage('profile', message);
        if (!response || !response.code)
            return reply.code(500).send({ error: 'Internal Server Error' });
        
        return (reply.code(response.code).send(response));
    } catch (error) {
        return reply.code(500).send({ error: 'Internal Server Error' })
    }
}

async function updateProfileController(request, reply) {
    reply.hijack();
    try {
        
        const message = {
            type: 'UPDATE',
            data: { id: request.params.id, ...request.body}
        }
        
        const response = await request.server.rabbitmq.rpcMessage('profile', message);
        if (!response || !response.code)
            return reply.code(500).send({ error: 'Internal Server Error' });
        
        return (reply.code(response.code).send(response));
    } catch (error) {
        return reply.code(500).send({ error: 'Internal Server Error' })
    }
}
