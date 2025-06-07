import fp from 'fastify-plugin'
import RabbitMQClient from '../libs/RabbitMQClient.js'

async function rabbitMQPlugin(fastify, options) {
    const rabbit = new RabbitMQClient(process.env.RABBITMQ_NOTIFICATION_QUEUE);
    fastify.decorate('rabbit', rabbit);
}

export default fp(rabbitMQPlugin);