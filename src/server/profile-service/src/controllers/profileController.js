import { 
    findDuplicateUsername, 
    getProfileById, 
    updateAvatarUrlById, 
    updateProfileById 
} from "../models/profileDAO.js";
import { createResponse } from "../utils/utils.js";
import fs from 'node:fs';
import { pipeline } from 'node:stream/promises';
import path from 'node:path';

export async function getProfile(request, reply) {
    try {
        const { id } = request.params;
        const tokenId = request.user?.id;
        if (tokenId !== id)
            return reply.code(403).send(createResponse(403, 'UNAUTHORIZED'));
        
        const profile = await getProfileById(this.db, id);
        if (!profile)
            return reply.code(400).send(createResponse(400, 'PROFILE_NOT_FOUND'));
        
        return reply.code(200).send(createResponse(200, 'PROFILE_FETCHED', { profile: profile }));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function updateProfile(request, reply) {
    try {
        const { id } = request.params;
        const tokenId = request.user?.id;
        if (tokenId !== id)
            return reply.code(403).send(createResponse(403, 'UNAUTHORIZED'));
        
        const { username, solde, rank, level, matches_played } = request.body;
        
        const profile = await getProfileById(this.db, id);
        if (!profile)
            return reply.code(400).send(createResponse(400, 'PROFILE_NOT_FOUND'));
        
        const updatedFields = {};
        if (username) {
            const dupUser = await findDuplicateUsername(this.db, username);
            if (dupUser)
                return reply.code(400).send(createResponse(400, 'USERNAME_EXISTS'));
            updatedFields.username = username;
            this.rabbit.produceMessage({
                id: id,
                username: username
            }, 'auth.username.updated');
        }

        if (solde !== undefined) updatedFields.solde = solde;
        if (rank !== undefined) updatedFields.rank = rank;
        if (level !== undefined) updatedFields.level = level;
        if (matches_played !== undefined) updatedFields.matches_played = matches_played;

        if (Object.keys(updatedFields).length === 0)
            return reply.code(400).send(createResponse(400, 'MISSING_FIELDS'));
        
        const changes = await updateProfileById(this.db, id, updatedFields);
        if (changes === 0)
            return reply.code(400).send(createResponse(400, 'ZERO_CHANGES'));
        const updatedProfile = await getProfileById(this.db, id);

        return reply.code(200).send(createResponse(200, 'PROFILE_UPDATED', { profile: updatedProfile }));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}

export async function uploadAvatarUrl(request, reply) {
    try {
        const userId = request.user?.id;
        const data = await request.file();
        console.log('DATA received: ', data);
        if (!data)
            return reply.code(400).send(createResponse(400, 'FILE_REQUIRED'));
        
        const ext = path.extname(data.filename);
        const uploadPath = path.join(process.cwd(), 'uploads', 'avatars', `${userId}_${Date.now()}${ext}`);
        console.log("Upload path: ", uploadPath);
        fs.mkdirSync(path.dirname(uploadPath), { recursive: true });

        await pipeline(data.file, fs.createWriteStream(uploadPath));
        
        await updateAvatarUrlById(this.db, userId, uploadPath);
        return reply.code(200).send(createResponse(200, 'AVATAR_UPLOADED', { avatar_url: uploadPath }));
    } catch (error) {
        console.log(error);
        return reply.code(500).send(createResponse(500, 'INTERNAL_SERVER_ERROR'));
    }
}