import fp from 'fastify-plugin'
import RabbitMQClient from '../libs/rabbitmq.js'

async function rabbitmqPlugin(fastify) {
    const rabbit = new RabbitMQClient('gateway');
    await rabbit.connect();

    fastify.decorate('rabbitmq', rabbit);

    fastify.addHook('onClose', async () => {
        await rabbit.close();
    });
}

export default fp(rabbitmqPlugin);
