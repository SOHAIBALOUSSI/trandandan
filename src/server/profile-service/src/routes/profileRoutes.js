import { getAvatarUrl, getProfile, updateProfile, uploadAvatarUrl } from "../controllers/profileController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
import { updateProfileSchema } from "../schemas/profileSchema.js";

async function profileRoutes(fastify) {

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

    fastify.post('/upload', {
        preHandler: verifyToken,
        handler: uploadAvatarUrl
    })

    fastify.get('/avatar/:fileName', {
        preHandler: verifyToken,
        handler: getAvatarUrl
    })
}

export default profileRoutes;
