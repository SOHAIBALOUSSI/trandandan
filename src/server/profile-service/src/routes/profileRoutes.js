import { createProfile, getProfile } from "../controllers/profileController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { profileSchema } from "../schemas/profileSchema.js";

async function profileRoutes(fastify) {
    fastify.post('/register', {
        schema: {
            body: profileSchema
        },
        preHandler: verifyToken,
        handler: createProfile
    })

    fastify.get('/:id', {
        preHandler: verifyToken,
        handler: getProfile
    })
}

export default profileRoutes;
