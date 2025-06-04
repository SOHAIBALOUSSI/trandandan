import fp from 'fastify-plugin'
import RabbitMQClient from '../../../notifications-service/src/libs/rabbitMQ'


async function rabbitMQPlugin(fastify, options) {
    const rabbit = new RabbitMQClient(process.env.RABBITMQ_PROFILE_QUEUE);
    fastify.decorate('rabbit', rabbit);    
}

export default fp(rabbitMQPlugin);