import { addProfile, getProfileById, searchProfile } from "../models/profileDAO.js";

export async function createProfile(request, reply) {
    try {
        const id = request.user?.id;
        const { username, email } = request.body;
        const profileExists = await searchProfile(this.db, id, username, email);
        if (profileExists)
            return reply.code(400).send({ error: 'Profile already exists' });
        
        await addProfile(this.db, id, username, email);

        return reply.code(201).send({ message: 'Profile created successfully' })
    } catch (error) {
        return reply.code(500).send({ err: 'Internal server error', details: error.message });
    }
}

export async function getProfile(request, reply) {
    try {
        
        const { id } = request.params;
        
        const profile = await getProfileById(this.db, id);
        if (!profile)
            return reply.code(404).send({ error: 'Profile not found' });
        
        return reply.code(200).send({ profile })
    } catch (error) {
        return reply.code(500).send({ err: 'Internal server error', details: error.message });
    }
}