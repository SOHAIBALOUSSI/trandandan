// Health check endpoint for production monitoring
export async function healthCheck(request, reply) {
    try {
        // Basic health check
        const healthStatus = {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            service: 'profile-service',
            version: process.env.APP_VERSION || '1.0.0',
            uptime: process.uptime(),
            memory: process.memoryUsage(),
            environment: process.env.NODE_ENV || 'development'
        };

        // Check Redis connection if available
        if (request.redis) {
            try {
                await request.redis.ping();
                healthStatus.redis = 'connected';
            } catch (error) {
                healthStatus.redis = 'disconnected';
                healthStatus.status = 'degraded';
            }
        }

        // Check RabbitMQ connection if available
        if (request.rabbitmq) {
            try {
                const connection = request.rabbitmq.connection;
                if (connection && connection.connection && connection.connection.connection) {
                    healthStatus.rabbitmq = 'connected';
                } else {
                    healthStatus.rabbitmq = 'disconnected';
                    healthStatus.status = 'degraded';
                }
            } catch (error) {
                healthStatus.rabbitmq = 'disconnected';
                healthStatus.status = 'degraded';
            }
        }

        const statusCode = healthStatus.status === 'healthy' ? 200 : 503;
        
        reply.code(statusCode).send(healthStatus);
    } catch (error) {
        reply.code(500).send({
            status: 'unhealthy',
            timestamp: new Date().toISOString(),
            service: 'profile-service',
            error: error.message
        });
    }
}
