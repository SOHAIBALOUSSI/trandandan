import { createProfile, getProfile, updateProfile } from "../controllers/profileController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createProfileSchema, updateProfileSchema } from "../schemas/profileSchema.js";

async function profileRoutes(fastify) {
    fastify.post('/register', {
        schema: {
            body: createProfileSchema
        },
        preHandler: verifyToken,
        handler: createProfile
    })

    fastify.get('/:id', {
        preHandler: verifyToken,
        handler: getProfile
    })

    fastify.patch('/:id', {
        schema: {
            body: updateProfileSchema
        },
        preHandler: verifyToken,
        handler: updateProfile
    })
}

export default profileRoutes;
