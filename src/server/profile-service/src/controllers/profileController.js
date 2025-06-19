import { 
    findDuplicateUsername, 
    getProfileById, 
    updateProfileById 
} from "../models/profileDAO.js";
import { createResponse } from "../utils/utils.js";

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
        
        const { username,    avatar_url, solde, rank, level } = request.body;
        
        const profile = await getProfileById(this.db, id);
        if (!profile)
            return reply.code(400).send(createResponse(400, 'PROFILE_NOT_FOUND'));
        
        const updatedFields = {};
        let dupUser;
        if (username) {
            dupUser = await findDuplicateUsername(this.db, username);
            if (dupUser)
                return reply.code(400).send(createResponse(400, 'USERNAME_EXISTS'));
            updatedFields.username = username;
            this.rabbit.produceMessage({
                id: id,
                username: username
            }, 'auth.username.updated');
        }
        // if (email) {
        //     dupUser = await findDuplicateEmail(this.db, username);
        //     if (dupUser)
        //         return reply.code(400).send(createResponse(400, 'EMAIL_EXISTS'));
        //     updatedFields.email = email;
        //     this.rabbit.produceMessage({
        //         id: id,
        //         email: email
        //     }, 'auth.email.updated');
        // } 
        if (avatar_url) updatedFields.avatar_url = avatar_url;
        if (solde !== undefined) updatedFields.solde = solde;
        if (rank !== undefined) updatedFields.rank = rank;
        if (level !== undefined) updatedFields.level = level;

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
