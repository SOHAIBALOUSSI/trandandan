import amqp from 'amqplib'
import { rejects } from 'assert';
import { randomUUID } from 'crypto'

class RabbitMQClient {
    constructor(queue) {
        this.queueName = queue;
        this.channel = null;
        this.connection = null;
    }

    async connect() {
        try {
            this.connection = await amqp.connect('amqp://localhost');
            this.channel = await this.connection.createChannel();
        } catch (error) {
            console.log('Failed to connect to RabbitMQ: ', error);
        }
    }

    async produceMessage(queue, message, correlationId = null) {
        try {

            if (!this.channel)
                await this.connect();

            await this.channel.assertQueue(queue, { durable: true });

            const options = {
                persistent: true
            }

            if (correlationId)
                options.correlationId = correlationId;

            this.channel.sendToQueue(queue,
                Buffer.from(JSON.stringify(message)),
                options
            );
        } catch (error) {
            console.log('Error producing messages.', error);
            throw error;
        }
    }

    async rpcMessage(message, timeout = 5000) {
        return new Promise(async (resolve, reject) => {
        try {
                if (!this.channel)
                    await this.connect();
                const tempQueue = await this.channel.assertQueue('', { exclusive: true });
                
                const correlationId = randomUUID();
                
                const timer = setTimeout(() => {
                    reject(new Error('RPC request timed out'));
                }, timeout);

                this.channel.consume(tempQueue, (msg) => {
                    if (msg.properties.correlationId == correlationId) {
                        clearTimeout(timer);
                        const content = JSON.parse(msg.content.toString());
                        resolve(content);
                    }
                }, { noAck: true })
                
                this.channel.sendToQueue(tempQueue,
                    Buffer.from(JSON.stringify(message)),
                    {
                        correlationId,
                        replyTo: tempQueue,
                        persistent: true
                    }
                );
            } catch (error) {
                reject(error)
            }
        });
    }

    async consumeMessage(handleMessage) {
        try {
            
            if (!this.channel)
                await this.connect();

            await this.channel.assertQueue(this.queueName, { durable: true });
            this.channel.consume(this.queueName, async (msg) => {
                if (msg !== null)
                {
                    const payload = JSON.parse(msg.content.toString())
                    const replyTo = msg.properties.replyTo
                    const correlationId = msg.properties.correlationId

                    try {
                        const result = await handleMessage(payload)
                        if (replyTo)
                        {
                            this.channel.sendToQueue(replyTo,
                                Buffer.from(JSON.stringify(result)),
                                { correlationId: correlationId }
                            );
                            this.channel.ack(msg);
                        }

                    } catch (error) {
                        if (replyTo)
                        {
                            this.channel.sendToQueue(replyTo,
                                Buffer.from(JSON.stringify({error: error.message})),
                                { correlationId: correlationId }
                            );
                            this.channel.ack(msg);
                        }
                    }
                }
            })

        } catch (error) {
            console.log('Error consuming messages.');
            throw error;
        }
    }

    async close() {
        if (this.channel)
            await this.channel.close();
        if (this.connection)
            await this.connection.close();
    }
}

export default RabbitMQClient;