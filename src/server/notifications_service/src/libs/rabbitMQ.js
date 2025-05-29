import  amqp from 'amqplib';

class RabbitMQManager {
  constructor() {
    this.connection = null;
    this.channel = null;
  }

  async connect() {
    try {
      this.connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost:5672');
      this.channel = await this.connection.createChannel();
      
      this.connection.on('error', (err) => {
        console.error('RabbitMQ connection error:', err);
      });

      this.connection.on('close', () => {
        console.error('RabbitMQ connection closed');
        setTimeout(() => this.connect(), 5000);
      });

      console.log('Connected to RabbitMQ');
      return this.channel;
    } catch (error) {
      console.error('Failed to connect to RabbitMQ:', error);
      throw error;
    }
  }

  async publishMessage(queue, message) {
    try {
      if (!this.channel) {
        await this.connect();
      }

      const queueName = `${process.env.RABBITMQ_QUEUE_PREFIX || 'notifications'}_${queue}`;
      await this.channel.assertQueue(queueName, { durable: true });
      
      return this.channel.sendToQueue(
        queueName,
        Buffer.from(JSON.stringify(message)),
        { persistent: true }
      );
    } catch (error) {
      console.error('Error publishing message:', error);
      throw error;
    }
  }
  
  async consumeMessages(queue, callback) {
    try {
      if (!this.channel) {
        await this.connect();
      }

      const queueName = `${process.env.RABBITMQ_QUEUE_PREFIX || 'notifications'}_${queue}`;z
      await this.channel.assertQueue(queueName, { durable: true });

      this.channel.consume(queueName, (msg) => {
        if (msg !== null) {
          const content = JSON.parse(msg.content.toString());
          callback(content);
          this.channel.ack(msg);
        }
      });
    } catch (error) {
      console.error('Error consuming messages:', error);
      throw error;
    }
  }

  async close() {
    try {
      if (this.channel) {
        await this.channel.close();
      }
      if (this.connection) {
        await this.connection.close();
      }
    } catch (error) {
      console.error('Error closing RabbitMQ connection:', error);
      throw error;
    }
  }
}

module.exports = new RabbitMQManager(); 