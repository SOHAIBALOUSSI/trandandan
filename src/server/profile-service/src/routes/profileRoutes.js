import { createProfile, getProfile } from "../controllers/profileController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createProfileSchema } from "../schemas/profileSchema.js";

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

    // fastify.put('/:id', {
    //     schema: {
    //         body: updateProfileSchema
    //     },
    //     preHandler: verifyToken,
    //     handler: updateProfile
    // })
}

export default profileRoutes;
