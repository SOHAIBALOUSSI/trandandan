import { addProfile, getProfileById, searchProfile, updateProfileById } from "../models/profileDAO.js";
import { createResponse } from "../utils/utils.js";

export async function createProfile(request, reply) {
    try {
        const id = request.user?.id;
        const { username, email } = request.body;
        console.log("Body received from profile:", request.body);
        this.log.info(`username: ${username}, email: ${email}`);
        if (!username || !email)
            return reply.code(400).send(createResponse(400, 'MISSING_FIELDS'));

        const profileExists = await searchProfile(this.db, id, username, email);
        if (profileExists)
            return reply.code(400).send(createResponse(400, 'PROFILE_EXISTS'));
        
        await addProfile(this.db, id, username, email);

        return reply.code(201).send(createResponse(201, 'PROFILE_CREATED'));
    } catch (error) {
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function getProfile(request, reply) {
    try {
        const { id } = request.params;
        const tokenId = request.user?.id;
        if (tokenId != id)
            return reply.code(403).send(createResponse(403, 'UNAUTHORIZED'));
        
        const profile = await getProfileById(this.db, id);
        if (!profile)
            return reply.code(400).send(createResponse(400, 'PROFILE_NOT_FOUND'));
        
        return reply.code(200).send(createResponse(200, 'PROFILE_FETCHED', { profile: profile }));
    } catch (error) {
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function updateProfile(request, reply) {
    try {
        const { id } = request.params;
        const tokenId = request.user?.id;
        if (tokenId != id)
            return reply.code(403).send(createResponse(403, 'UNAUTHORIZED'));
        
        const { username, email, avatar_url, solde } = request.body;
        
        const profile = await getProfileById(this.db, id);
        if (!profile)
            return reply.code(400).send(createResponse(400, 'PROFILE_NOT_FOUND'));
        
        const updatedFields = {};
        if (username) updatedFields.username = username;
        if (email) updatedFields.email = email;
        if (avatar_url) updatedFields.avatar_url = avatar_url;
        if (solde !== undefined) updatedFields.solde = solde;

        if (Object.keys(updatedFields).length === 0)
            return reply.code(400).send(createResponse(400, 'MISSING_FIELDS'));
        
        const changes = await updateProfileById(this.db, id, updatedFields);
        if (changes === 0)
            return reply.code(400).send(createResponse(400, 'ZERO_CHANGES'));
        const updatedProfile = await getProfileById(this.db, id);

        return reply.code(200).send(createResponse(200, 'PROFILE_UPDATED', { profile: updatedProfile }));
    } catch (error) {
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}