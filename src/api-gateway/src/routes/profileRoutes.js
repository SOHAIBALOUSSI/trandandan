import { createProfile, getProfile, updateProfile } from '../../../server/profile-service/src/controllers/profileController.js';
import { createProfileSchema, updateProfileSchema } from "../schemas/profileSchema.js";

async function profileRoutes(fastify) {
    fastify.post('/register', {
        schema: {
            body: createProfileSchema
        },
        preHandler: fastify.authenticate,
        handler: createProfile
    })

    fastify.get('/:id', {
        preHandler: fastify.authenticate,
        handler: getProfile
    })

    fastify.patch('/:id', {
        schema: {
            body: updateProfileSchema
        },
        preHandler: fastify.authenticate,
        handler: updateProfile
    })
}

export default profileRoutes;
