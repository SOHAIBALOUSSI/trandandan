import { verifyToken } from "../middleware/authMiddleware.js"
import { blockHandler, unblockHandler } from '../controllers/blockController.js'
import { blockSchema } from "../schemas/blockSchema.js";

async function blockRoutes(fastify) {
    fastify.post('/:id', {
        schema: {
            params: blockSchema
        },
        preHandler: verifyToken,
        handler: blockHandler,
    })
    
    fastify.delete('/:id', {
        schema: {
            params: blockSchema
        },
        preHandler: verifyToken,
        handler: unblockHandler,
    })
}

export default blockRoutes;