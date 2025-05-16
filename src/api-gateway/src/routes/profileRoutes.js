import { createProfileController, getProfileController, updateProfileController } from '..//controllers/profileController.js';
import { createProfileSchema, updateProfileSchema } from "../schemas/profileSchema.js";

async function profileRoutes(fastify) {
    fastify.post('/register', {
        schema: {
            body: createProfileSchema
        },
        preHandler: fastify.authenticate,
        handler: createProfileController
    })

    fastify.get('/:id', {
        preHandler: fastify.authenticate,
        handler: getProfileController
    })

    fastify.patch('/:id', {
        schema: {
            body: updateProfileSchema
        },
        preHandler: fastify.authenticate,
        handler: updateProfileController
    })
}

export default profileRoutes;
